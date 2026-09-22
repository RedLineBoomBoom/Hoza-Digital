"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

interface Shockwave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch / coarse pointer devices immediately
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window
    ) {
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let prevMouseX = -200;
    let prevMouseY = -200;

    let ringX = -200;
    let ringY = -200;

    let spotX = -200;
    let spotY = -200;

    let lastTrailX = -200;
    let lastTrailY = -200;

    let currentAngle = 0;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let isHiddenZone = false;
    let animId: number;

    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    // Canvas setup
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const spawnSparks = (x: number, y: number) => {
      // Radiant tactical micro-sparks on click
      const sparkCount = 12;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (i * (Math.PI * 2)) / sparkCount + (Math.random() - 0.5) * 0.25;
        const speed = 2.0 + Math.random() * 3.0;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1.2,
          color: i % 2 === 0 ? "#00F0FF" : "#C4B5FD",
          alpha: 1,
          decay: 0.04 + Math.random() * 0.02,
        });
      }

      // Expanding tactical shockwave ring
      shockwaves.push({
        x,
        y,
        r: 8,
        maxR: 52,
        alpha: 0.9,
        color: isHovering ? "#00F0FF" : "#A78BFA",
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if cursor should be hidden (e.g. over an area with custom arrow cursor)
      const target = e.target as HTMLElement | null;
      const inHideZone = !!(
        target &&
        (target.closest('[data-custom-cursor="hide"]') ||
          target.closest(".hide-custom-cursor"))
      );

      if (inHideZone) {
        isHiddenZone = true;
        if (dotRef.current) dotRef.current.style.opacity = "0";
        if (ringRef.current) ringRef.current.style.opacity = "0";
        if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
        return;
      }

      if (isHiddenZone) {
        isHiddenZone = false;
      }

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        spotX = mouseX;
        spotY = mouseY;
        lastTrailX = mouseX;
        lastTrailY = mouseY;
      }

      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0.75";

      // Detect interactive targets
      if (target) {
        isHovering = !!(
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer")
        );
      }

      // Spawn trail stardust particle when moving
      const dist = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);
      if (dist > 12 && !isHiddenZone) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 4,
          y: mouseY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 0.8,
          color: Math.random() > 0.45 ? "#00F0FF" : "#A78BFA",
          alpha: 0.6,
          decay: 0.03,
        });
        lastTrailX = mouseX;
        lastTrailY = mouseY;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      if (!isHiddenZone && isVisible) {
        spawnSparks(mouseX, mouseY);
      }
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    };

    // 120fps hardware-accelerated render loop
    const render = () => {
      // 1. Follower calculations
      ringX += (mouseX - ringX) * 0.3;
      ringY += (mouseY - ringY) * 0.3;

      spotX += (mouseX - spotX) * 0.12;
      spotY += (mouseY - spotY) * 0.12;

      const vx = mouseX - prevMouseX;
      const vy = mouseY - prevMouseY;
      const moveDistance = Math.hypot(vx, vy);
      const speed = Math.min(moveDistance * 0.008, 0.14);

      // Aerodynamic banking tilt based on horizontal velocity (max 14 deg)
      const targetBank = Math.max(-14, Math.min(14, vx * 0.6));
      currentAngle += (targetBank - currentAngle) * 0.18;

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // 2. Center dot (1:1 Instant translation)
      if (dotRef.current && isVisible && !isHiddenZone) {
        const dotScale = isClicking ? 0.6 : isHovering ? 1.4 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${dotScale})`;
      }

      // 3. Follower Round Hoza Emblem (Lerped with subtle velocity stretch & glow)
      if (ringRef.current && isVisible && !isHiddenZone) {
        const baseScale = isHovering ? 1.35 : isClicking ? 0.86 : 1;
        const stretchX = baseScale * (1 + speed);
        const stretchY = baseScale * (1 - speed * 0.35);

        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${currentAngle}deg) scale(${stretchX}, ${stretchY})`;
        ringRef.current.style.color = isHovering ? "#00F0FF" : "#8B5CFF";
        ringRef.current.style.filter = isHovering
          ? "drop-shadow(0 0 16px rgba(0, 240, 255, 0.85)) drop-shadow(0 0 6px rgba(0, 240, 255, 0.95))"
          : "drop-shadow(0 0 10px rgba(139, 92, 255, 0.65)) drop-shadow(0 0 4px rgba(139, 92, 255, 0.75))";
      }

      // 4. Ambient Spotlight
      if (spotlightRef.current && isVisible && !isHiddenZone) {
        spotlightRef.current.style.transform = `translate3d(${spotX}px, ${spotY}px, 0)`;
      }

      // 5. Canvas Particles & Shockwaves
      if (ctx && canvas) {
        if (particles.length > 0 || shockwaves.length > 0) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

          // Render shockwaves
          for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i];
            ctx.save();
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
            ctx.strokeStyle = sw.color;
            ctx.globalAlpha = Math.max(0, sw.alpha);
            ctx.lineWidth = 1.5;
            ctx.shadowColor = sw.color;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.restore();

            sw.r += (sw.maxR - sw.r) * 0.22 + 0.6;
            sw.alpha -= 0.045;

            if (sw.alpha <= 0 || sw.r >= sw.maxR) {
              shockwaves.splice(i, 1);
            }
          }

          // Render micro trail particles
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.alpha), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();

            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
              particles.splice(i, 1);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 1. Ambient Background Spotlight (Smoothly glides over dark grid lines) */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 pointer-events-none z-20 will-change-transform opacity-0 transition-opacity duration-300"
        style={{
          width: "380px",
          height: "380px",
          marginLeft: "-190px",
          marginTop: "-190px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 92, 255, 0.14) 0%, rgba(0, 240, 255, 0.05) 35%, transparent 70%)",
          transformOrigin: "center center",
        }}
      />

      {/* 2. Fullscreen GPU Particle Canvas for Trail Stardust & Click Shockwaves */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
      />

      {/* 3. Follower Official Round Hoza Emblem Cursor */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-40 will-change-transform opacity-0 text-[#8B5CFF]"
        style={{
          width: "42px",
          height: "42px",
          marginLeft: "-21px",
          marginTop: "-21px",
          transformOrigin: "center center",
          transition: "opacity 0.2s ease, color 0.25s ease, filter 0.25s ease",
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer cyber rotating dashed ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="opacity-45 animate-[spin_10s_linear_infinite]"
            style={{ transformOrigin: "50px 50px" }}
          />

          {/* Outer cyan precision ring */}
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="#00F0FF"
            strokeWidth="1.2"
            className="opacity-35"
          />

          {/* Octagonal "O" from official Hoza Emblem */}
          <path
            fillRule="evenodd"
            d="M 30,18 H 70 L 84,32 V 68 L 70,82 H 30 L 16,68 V 32 Z M 38,32 H 62 L 68,38 V 62 L 62,68 H 38 L 32,62 V 38 Z"
            fill="currentColor"
          />

          {/* Center cyan pulse halo */}
          <circle
            cx="50"
            cy="50"
            r="6.5"
            fill="#00F0FF"
            className="opacity-40 animate-pulse"
          />
        </svg>
      </div>

      {/* 4. Instant 1:1 Sharp Laser Dot with White-Hot Core */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform opacity-0"
        style={{
          width: "5px",
          height: "5px",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffffff 45%, #00F0FF 100%)",
          boxShadow:
            "0 0 5px #00F0FF, 0 0 10px rgba(0, 240, 255, 0.9), 0 0 18px rgba(139, 92, 255, 0.6)",
          transformOrigin: "center center",
          transition: "opacity 0.15s ease",
        }}
      />
    </>
  );
};
