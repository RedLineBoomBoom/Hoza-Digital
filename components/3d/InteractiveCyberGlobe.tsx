"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HubCoordinate {
  city: string;
  country: string;
  lat: number;
  lon: number;
  ping: string;
  isHQ?: boolean;
}

const HUBS_DATA: HubCoordinate[] = [
  { city: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, ping: "12ms", isHQ: true },
  { city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, ping: "18ms" },
  { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, ping: "45ms" },
  { city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194, ping: "138ms" },
  { city: "London", country: "UK", lat: 51.5074, lon: -0.1278, ping: "162ms" },
  { city: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, ping: "92ms" },
];

// Helper to convert lat/long to 3D Cartesian coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Helper to find shortest circular angular distance
function shortestAngle(target: number, current: number): number {
  let diff = (target - current) % (2 * Math.PI);
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;
  return diff;
}

// Approximate landmass regions to populate authentic continent points
const CONTINENT_REGIONS = [
  // North America
  { minLat: 22, maxLat: 72, minLon: -168, maxLon: -52 },
  // Central America
  { minLat: 8, maxLat: 22, minLon: -105, maxLon: -75 },
  // South America
  { minLat: -55, maxLat: 12, minLon: -82, maxLon: -34 },
  // Europe
  { minLat: 36, maxLat: 71, minLon: -11, maxLon: 42 },
  // UK & Ireland
  { minLat: 50, maxLat: 59, minLon: -10, maxLon: 2 },
  // Africa
  { minLat: -35, maxLat: 37, minLon: -18, maxLon: 52 },
  // Asia (Mainland, Siberia, East Asia, India)
  { minLat: 6, maxLat: 76, minLon: 42, maxLon: 152 },
  // Japan
  { minLat: 30, maxLat: 46, minLon: 129, maxLon: 146 },
  // Indonesia & Maritime SE Asia
  { minLat: -11, maxLat: 7, minLon: 95, maxLon: 142 },
  // Australia & New Zealand
  { minLat: -47, maxLat: -10, minLon: 112, maxLon: 178 },
];

function isLand(lat: number, lon: number): boolean {
  return CONTINENT_REGIONS.some(
    (r) => lat >= r.minLat && lat <= r.maxLat && lon >= r.minLon && lon <= r.maxLon
  );
}

interface InteractiveCyberGlobeProps {
  selectedHub: string;
  onSelectHub: (city: string) => void;
  className?: string;
}

interface ProjectedPin {
  city: string;
  ping: string;
  x: number;
  y: number;
  isActive: boolean;
  visible: boolean;
}

export const InteractiveCyberGlobe: React.FC<InteractiveCyberGlobeProps> = ({
  selectedHub,
  onSelectHub,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateToHubFnRef = useRef<((city: string) => void) | null>(null);
  const selectedHubRef = useRef<string>(selectedHub);
  const onSelectHubRef = useRef<(city: string) => void>(onSelectHub);

  const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([]);

  // Keep references fresh
  useEffect(() => {
    selectedHubRef.current = selectedHub;
  }, [selectedHub]);

  useEffect(() => {
    onSelectHubRef.current = onSelectHub;
  }, [onSelectHub]);

  // Trigger smooth rotation without remounting the Three.js scene
  useEffect(() => {
    if (rotateToHubFnRef.current && selectedHub) {
      rotateToHubFnRef.current(selectedHub);
    }
  }, [selectedHub]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 450;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 6.6;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const globeGroup = new THREE.Group();
      // Crucial: Set Euler order to "XYZ" for exact mathematical lat/lon projection
      // In XYZ order: Ry (longitude) applies first, then Rx (latitude) tilts directly to camera (+Z)
      globeGroup.rotation.order = "XYZ";
      scene.add(globeGroup);

      const GLOBE_RADIUS = 2.2;

      // 1. Opaque Core Sphere (Black Zinc Obsidian)
      const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.995, 36, 24);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x09090b,
        transparent: true,
        opacity: 0.96,
      });
      const innerSphere = new THREE.Mesh(innerGeo, innerMat);
      globeGroup.add(innerSphere);

      // 2. Translucent Cyber Wireframe Sphere
      const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 36, 24);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xd4ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const wireSphere = new THREE.Mesh(wireGeo, wireMat);
      globeGroup.add(wireSphere);

      // 3. Glowing Equator & Latitudinal Rings
      const equatorGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.002, GLOBE_RADIUS * 1.008, 64);
      const equatorMat = new THREE.MeshBasicMaterial({
        color: 0xd4ff00,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const equator = new THREE.Mesh(equatorGeo, equatorMat);
      equator.rotation.x = Math.PI / 2;
      globeGroup.add(equator);

      // 4. Continent Landmass Points Field
      const landPoints: THREE.Vector3[] = [];
      const landColors: number[] = [];
      const cVolt = new THREE.Color(0xd4ff00);
      const cCyan = new THREE.Color(0xd4ff00);
      const cBright = new THREE.Color(0xe6ff4d);

      for (let lat = -75; lat <= 75; lat += 3.8) {
        for (let lon = -180; lon <= 180; lon += 3.8) {
          if (isLand(lat, lon)) {
            const pos = latLonToVector3(lat, lon, GLOBE_RADIUS);
            landPoints.push(pos);
            const rand = Math.random();
            const col = rand > 0.85 ? cCyan : rand > 0.4 ? cVolt : cBright;
            landColors.push(col.r, col.g, col.b);
          }
        }
      }

      const pointGeo = new THREE.BufferGeometry().setFromPoints(landPoints);
      pointGeo.setAttribute("color", new THREE.Float32BufferAttribute(landColors, 3));

      const pointMat = new THREE.PointsMaterial({
        size: 0.042,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
      });
      const pointCloud = new THREE.Points(pointGeo, pointMat);
      globeGroup.add(pointCloud);

      // 5. Node Beacons
      const nodeMeshes: { mesh: THREE.Mesh; hub: HubCoordinate; pos: THREE.Vector3 }[] = [];
      const nodeRings: { mesh: THREE.Mesh; hub: HubCoordinate }[] = [];
      const jakPos = latLonToVector3(-6.2088, 106.8456, GLOBE_RADIUS);

      HUBS_DATA.forEach((hub) => {
        const pos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS);
        const isHQ = hub.isHQ;

        // Core Beacon Dot
        const bGeo = new THREE.SphereGeometry(isHQ ? 0.08 : 0.06, 16, 16);
        const bMat = new THREE.MeshBasicMaterial({
          color: isHQ ? 0xd4ff00 : 0xd4ff00,
        });
        const beacon = new THREE.Mesh(bGeo, bMat);
        beacon.position.copy(pos);
        globeGroup.add(beacon);
        nodeMeshes.push({ mesh: beacon, hub, pos });

        // Outer Pulsing Ring
        const rGeo = new THREE.RingGeometry(isHQ ? 0.1 : 0.075, isHQ ? 0.14 : 0.1, 32);
        const rMat = new THREE.MeshBasicMaterial({
          color: isHQ ? 0xd4ff00 : 0xd4ff00,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.position.copy(pos.clone().multiplyScalar(1.002));
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ring);
        nodeRings.push({ mesh: ring, hub });

        // Vertical Laser Beacon
        const cylinderGeo = new THREE.CylinderGeometry(0.012, 0.012, isHQ ? 0.45 : 0.25, 8);
        const cylinderMat = new THREE.MeshBasicMaterial({
          color: isHQ ? 0xd4ff00 : 0xd4ff00,
          transparent: true,
          opacity: isHQ ? 0.75 : 0.45,
        });
        const beam = new THREE.Mesh(cylinderGeo, cylinderMat);
        beam.position.copy(pos.clone().multiplyScalar(isHQ ? 1.09 : 1.05));
        beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
        globeGroup.add(beam);
      });

      // 6. Great-Circle Cyber Fiber Arcs from Jakarta to Remote Hubs
      const pulseParticles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];

      HUBS_DATA.filter((h) => !h.isHQ).forEach((hub) => {
        const destPos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS);

        const midPoint = new THREE.Vector3()
          .addVectors(jakPos, destPos)
          .multiplyScalar(0.5);
        const dist = jakPos.distanceTo(destPos);
        const altitude = GLOBE_RADIUS + Math.min(1.1, Math.max(0.4, dist * 0.35));
        midPoint.normalize().multiplyScalar(altitude);

        const curve = new THREE.QuadraticBezierCurve3(jakPos, midPoint, destPos);
        const points = curve.getPoints(45);

        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0xd4ff00,
          transparent: true,
          opacity: 0.35,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        globeGroup.add(arcLine);

        const pulseGeo = new THREE.SphereGeometry(0.04, 8, 8);
        const pulseMat = new THREE.MeshBasicMaterial({ color: 0xd4ff00 });
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        globeGroup.add(pulseMesh);

        pulseParticles.push({
          mesh: pulseMesh,
          curve,
          progress: Math.random(),
          speed: 0.007 + Math.random() * 0.004,
        });
      });

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const cyanPoint = new THREE.PointLight(0xd4ff00, 3.5, 25);
      cyanPoint.position.set(5, 3, 5);
      scene.add(cyanPoint);

      const voltPoint = new THREE.PointLight(0xd4ff00, 3, 25);
      voltPoint.position.set(-5, -3, 3);
      scene.add(voltPoint);

      // Rotation & Physics States
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let dragDistance = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let curRotX = 0;
      let curRotY = 0;
      let lastInteractionTime = Date.now();

      // Mathematically exact function to face any city directly to the camera (+Z)
      // In Three.js "XYZ" Euler order:
      // rotX = lat * (Math.PI / 180)
      // rotY = -Math.PI / 2 - lon * (Math.PI / 180)
      const rotateToCity = (cityName: string) => {
        const hub = HUBS_DATA.find((h) => h.city.toLowerCase() === cityName.toLowerCase());
        if (!hub) return;

        const exactX = hub.lat * (Math.PI / 180);
        const exactY = -Math.PI / 2 - hub.lon * (Math.PI / 180);

        // Find the shortest circular angular path
        targetRotY = curRotY + shortestAngle(exactY, curRotY);
        targetRotX = exactX;

        lastInteractionTime = Date.now();
      };

      rotateToHubFnRef.current = rotateToCity;

      // Initial focus on selected hub or Jakarta
      const initialHub = selectedHubRef.current || "Jakarta";
      const initialData = HUBS_DATA.find((h) => h.city.toLowerCase() === initialHub.toLowerCase()) || HUBS_DATA[0];
      targetRotX = initialData.lat * (Math.PI / 180);
      targetRotY = -Math.PI / 2 - initialData.lon * (Math.PI / 180);
      curRotX = targetRotX;
      curRotY = targetRotY;
      globeGroup.rotation.x = curRotX;
      globeGroup.rotation.y = curRotY;

      // Pointer event handlers for free 3D drag
      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        dragDistance = 0;
        lastInteractionTime = Date.now();
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) {
          // Check hover on node meshes
          const rect = container.getBoundingClientRect();
          const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
          );
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);

          const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
          if (intersects.length > 0) {
            container.style.cursor = "pointer";
          } else {
            container.style.cursor = "grab";
          }
          return;
        }

        lastInteractionTime = Date.now();
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.007;
        targetRotX = Math.max(-1.15, Math.min(1.15, targetRotX)); // Clamp tilt
      };

      const onPointerUp = (e: PointerEvent) => {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = "grab";

        // If movement was minimal, consider it an intentional click
        if (dragDistance < 6) {
          const rect = container.getBoundingClientRect();
          const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
          );
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);

          const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
          if (intersects.length > 0) {
            const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
            if (hit) {
              onSelectHubRef.current(hit.hub.city);
              rotateToCity(hit.hub.city);
            }
          }
        }
      };

      container.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();

      // Render Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Slow idle auto-spin only after 8 seconds of inactivity
        const timeSinceAction = Date.now() - lastInteractionTime;
        if (!isDragging && timeSinceAction > 8000) {
          targetRotY += 0.001;
        }

        // Smooth physics damping toward target orientation
        curRotX += (targetRotX - curRotX) * 0.07;
        curRotY += (targetRotY - curRotY) * 0.07;
        globeGroup.rotation.x = curRotX;
        globeGroup.rotation.y = curRotY;

        const currentActiveCity = selectedHubRef.current;

        // Animate pulsing rings
        nodeRings.forEach(({ mesh, hub }) => {
          const isSelected = hub.city.toLowerCase() === currentActiveCity.toLowerCase();
          const scale = isSelected
            ? 1 + Math.sin(elapsed * 5) * 0.3
            : 1 + Math.sin(elapsed * 2.5) * 0.1;
          mesh.scale.set(scale, scale, 1);
        });

        // Animate moving data pulses along arcs
        pulseParticles.forEach((p) => {
          p.progress = (p.progress + p.speed) % 1;
          const pos = p.curve.getPoint(p.progress);
          p.mesh.position.copy(pos);
        });

        // Calculate screen-space positions for hubs
        globeGroup.updateMatrixWorld();
        const w = container.clientWidth;
        const h = container.clientHeight;

        const newPins: ProjectedPin[] = [];
        nodeMeshes.forEach((node) => {
          const worldPos = node.pos.clone().applyMatrix4(globeGroup.matrixWorld);
          // Check if node is on the hemisphere facing camera (+Z)
          const isFrontFacing = worldPos.z > 0.15;
          const isActive = node.hub.city.toLowerCase() === currentActiveCity.toLowerCase();

          if (isFrontFacing) {
            worldPos.project(camera);
            const screenX = (worldPos.x * 0.5 + 0.5) * w;
            const screenY = (-(worldPos.y * 0.5) + 0.5) * h;

            newPins.push({
              city: node.hub.city,
              ping: node.hub.ping,
              x: screenX,
              y: screenY,
              isActive,
              visible: true,
            });
          }
        });

        setProjectedPins(newPins);

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("resize", handleResize);
        if (renderer && renderer.domElement && container) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn("Globe WebGL initialization skipped:", err);
    }
  }, []); // Run ONCE on mount; updates happen reactively via refs

  const activePin = projectedPins.find((p) => p.isActive);
  const passivePins = projectedPins.filter((p) => !p.isActive);

  return (
    <div
      className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden ${
        className || ""
      }`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing"
      />

      {/* Passive Front-Facing City Tags */}
      {passivePins.map((pin) => (
        <div
          key={pin.city}
          className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 transition-opacity duration-150"
          style={{
            left: `${pin.x}px`,
            top: `${pin.y}px`,
          }}
        >
          <div className="px-1.5 py-0.5 rounded bg-[#0E0E12]/85 border border-[#D4FF00]/40 backdrop-blur-xs font-mono text-[9px] text-white whitespace-nowrap opacity-85">
            {pin.city.toUpperCase()}
          </div>
        </div>
      ))}

      {/* Active City Prominent Cyber Badge */}
      {activePin && activePin.visible && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${activePin.x}px`,
            top: `${activePin.y}px`,
          }}
        >
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="px-2.5 py-1 rounded-full bg-[#09090B]/95 border border-[#D4FF00] shadow-[0_0_16px_rgba(212,255,0,0.7)] backdrop-blur-md font-mono text-[10px] text-white flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
              <span className="font-bold text-[#D4FF00] uppercase">
                {activePin.city}
              </span>
              <span className="text-emerald-400 font-bold">
                {activePin.ping}
              </span>
            </div>
            {/* Triangular pointer pin */}
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#D4FF00]" />
          </div>
        </div>
      )}
    </div>
  );
};
