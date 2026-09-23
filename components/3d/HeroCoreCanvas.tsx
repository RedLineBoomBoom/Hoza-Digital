"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const HeroCoreCanvas: React.FC<{ className?: string }> = ({
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        1000
      );
      camera.position.z = 7.5;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // 1. Central Holographic Torus Knot (Quantum Core)
      const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.28, 120, 20, 2, 3);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xd4ff00,
        wireframe: true,
        emissive: 0x384500,
        roughness: 0.1,
        metalness: 0.9,
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      rootGroup.add(knotMesh);

      // 2. Electric Glow Orbit Ring 1
      const laserRingGeo1 = new THREE.TorusGeometry(2.6, 0.02, 16, 120);
      const laserRingMat1 = new THREE.MeshBasicMaterial({
        color: 0xe6ff4d,
        transparent: true,
        opacity: 0.85,
      });
      const laserRing1 = new THREE.Mesh(laserRingGeo1, laserRingMat1);
      laserRing1.rotation.x = Math.PI / 2.8;
      rootGroup.add(laserRing1);

      // 3. Acid Volt Orbit Ring 2
      const laserRingGeo2 = new THREE.TorusGeometry(3.0, 0.015, 16, 120);
      const laserRingMat2 = new THREE.MeshBasicMaterial({
        color: 0xd4ff00,
        transparent: true,
        opacity: 0.7,
      });
      const laserRing2 = new THREE.Mesh(laserRingGeo2, laserRingMat2);
      laserRing2.rotation.y = Math.PI / 3;
      laserRing2.rotation.x = -Math.PI / 5;
      rootGroup.add(laserRing2);

      // 4. Outer Volt Scanner Ring 3
      const laserRingGeo3 = new THREE.TorusGeometry(3.4, 0.012, 16, 120);
      const laserRingMat3 = new THREE.MeshBasicMaterial({
        color: 0xa3c900,
        transparent: true,
        opacity: 0.45,
      });
      const laserRing3 = new THREE.Mesh(laserRingGeo3, laserRingMat3);
      laserRing3.rotation.z = Math.PI / 4;
      laserRing3.rotation.y = -Math.PI / 6;
      rootGroup.add(laserRing3);

      // 5. Surrounding Cyber Particle Swarm
      const particleCount = 280;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorVolt = new THREE.Color(0xd4ff00);
      const colorElectric = new THREE.Color(0xe6ff4d);
      const colorWhite = new THREE.Color(0xffffff);

      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 2.4 + Math.random() * 3.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        // Mix volt, electric glow, and white particles
        const rand = Math.random();
        const chosenColor =
          rand < 0.55 ? colorVolt : rand < 0.82 ? colorElectric : colorWhite;
        colors[i] = chosenColor.r;
        colors[i + 1] = chosenColor.g;
        colors[i + 2] = chosenColor.b;
      }

      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.038,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });

      const particleMesh = new THREE.Points(particleGeo, particleMat);
      rootGroup.add(particleMesh);

      // Lighting: Acid Volt directional/point lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const voltPointLight2 = new THREE.PointLight(0xe6ff4d, 5, 20);
      voltPointLight2.position.set(4, 3, 4);
      scene.add(voltPointLight2);

      const voltPointLight = new THREE.PointLight(0xd4ff00, 5, 20);
      voltPointLight.position.set(-4, -3, 3);
      scene.add(voltPointLight);

      // Cursor physics tracking
      let targetX = 0;
      let targetY = 0;
      let curX = 0;
      let curY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
        const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
        targetX = ndcX * 0.7;
        targetY = -ndcY * 0.5;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Damped mouse rotation
        curX += (targetX - curX) * 0.05;
        curY += (targetY - curY) * 0.05;

        // Core rotation
        knotMesh.rotation.x = elapsedTime * 0.25 + curY;
        knotMesh.rotation.y = elapsedTime * 0.35 + curX;

        // Laser rings counter-rotation
        laserRing1.rotation.z = elapsedTime * 0.35;
        laserRing2.rotation.y = -elapsedTime * 0.28;
        laserRing3.rotation.x = elapsedTime * 0.2;

        // Swarm subtle pulse
        particleMesh.rotation.y = elapsedTime * 0.05;
        particleMesh.rotation.x = elapsedTime * 0.03;

        rootGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.15;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        if (renderer && renderer.domElement && container) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (e) {
      console.warn("WebGL initialization skipped:", e);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    />
  );
};
