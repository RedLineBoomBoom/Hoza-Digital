"use client";

import React, { useMemo } from "react";
import { motion, MotionValue } from "framer-motion";
import {
  Terminal,
  Zap,
  Cpu,
  ShieldCheck,
  Code,
  Globe,
  Activity,
  Compass,
  Crosshair,
  Layers,
  Bot,
  Sparkles,
  Flame,
  Radio,
  Gauge,
  Database,
  Lock,
  Binary,
} from "lucide-react";

interface ConcentricRadarRingsProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

interface GlyphItem {
  angle: number; // in degrees
  Icon: React.ElementType;
}

interface RingDef {
  id: string;
  diameter: number; // in pixels
  type: "solid" | "dashed";
  dashArray?: string;
  opacity: number;
  ringClass: string;
  counterClass: string;
  glyphs: GlyphItem[];
}

export const ConcentricRadarRings: React.FC<ConcentricRadarRingsProps> = ({
  mouseX,
  mouseY,
}) => {
  // 6 Concentric Rings matching the Climate Catastrophe Pack cadence:
  // Alternating DASHED -> SOLID -> DASHED -> SOLID -> DASHED -> SOLID
  const rings: RingDef[] = useMemo(
    () => [
      {
        id: "ring-1",
        diameter: 440,
        type: "dashed",
        dashArray: "8 8",
        opacity: 0.38,
        ringClass: "animate-orbit-ring-1",
        counterClass: "animate-badge-counter-1",
        glyphs: [
          { angle: 30, Icon: Zap },
          { angle: 150, Icon: Terminal },
          { angle: 270, Icon: Code },
        ],
      },
      {
        id: "ring-2",
        diameter: 640,
        type: "solid",
        opacity: 0.32,
        ringClass: "animate-orbit-ring-2",
        counterClass: "animate-badge-counter-2",
        glyphs: [
          { angle: 15, Icon: Cpu },
          { angle: 105, Icon: ShieldCheck },
          { angle: 195, Icon: Flame },
          { angle: 285, Icon: Radio },
        ],
      },
      {
        id: "ring-3",
        diameter: 860,
        type: "dashed",
        dashArray: "10 10",
        opacity: 0.35,
        ringClass: "animate-orbit-ring-3",
        counterClass: "animate-badge-counter-3",
        glyphs: [
          { angle: 40, Icon: Globe },
          { angle: 110, Icon: Bot },
          { angle: 180, Icon: Activity },
          { angle: 250, Icon: Crosshair },
          { angle: 320, Icon: Database },
        ],
      },
      {
        id: "ring-4",
        diameter: 1080,
        type: "solid",
        opacity: 0.30,
        ringClass: "animate-orbit-ring-4",
        counterClass: "animate-badge-counter-4",
        glyphs: [
          { angle: 20, Icon: Compass },
          { angle: 80, Icon: Layers },
          { angle: 140, Icon: Sparkles },
          { angle: 200, Icon: Terminal },
          { angle: 260, Icon: Lock },
          { angle: 320, Icon: Gauge },
        ],
      },
      {
        id: "ring-5",
        diameter: 1320,
        type: "dashed",
        dashArray: "12 12",
        opacity: 0.28,
        ringClass: "animate-orbit-ring-5",
        counterClass: "animate-badge-counter-5",
        glyphs: [
          { angle: 10, Icon: Binary },
          { angle: 60, Icon: Zap },
          { angle: 115, Icon: Cpu },
          { angle: 165, Icon: Code },
          { angle: 220, Icon: ShieldCheck },
          { angle: 270, Icon: Globe },
          { angle: 320, Icon: Flame },
        ],
      },
      {
        id: "ring-6",
        diameter: 1580,
        type: "solid",
        opacity: 0.25,
        ringClass: "animate-orbit-ring-6",
        counterClass: "animate-badge-counter-6",
        glyphs: [
          { angle: 0, Icon: Crosshair },
          { angle: 45, Icon: Activity },
          { angle: 90, Icon: Bot },
          { angle: 135, Icon: Terminal },
          { angle: 180, Icon: Layers },
          { angle: 225, Icon: Compass },
          { angle: 270, Icon: Sparkles },
          { angle: 315, Icon: Radio },
        ],
      },
    ],
    []
  );

  return (
    <motion.div
      style={{
        x: mouseX || 0,
        y: mouseY || 0,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Central Soft Ambient Glow */}
      <div className="absolute w-[480px] h-[480px] rounded-full bg-[#D4FF00]/12 blur-[150px] pointer-events-none" />

      {/* 6 Concentric Rings */}
      {rings.map((ring, idx) => {
        const radius = ring.diameter / 2;

        return (
          <motion.div
            key={ring.id}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.08 * idx,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute ${ring.ringClass}`}
            style={{
              width: `${ring.diameter}px`,
              height: `${ring.diameter}px`,
              left: "50%",
              top: "50%",
              marginLeft: `-${radius}px`,
              marginTop: `-${radius}px`,
              willChange: "transform",
            }}
          >
            {/* Crisp SVG Ring Line (1.5px width) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${ring.diameter} ${ring.diameter}`}
              fill="none"
              style={{
                filter: "drop-shadow(0 0 3px rgba(212, 255, 0, 0.2))",
              }}
            >
              <circle
                cx={radius}
                cy={radius}
                r={radius - 1}
                stroke="#D4FF00"
                strokeWidth="1.5"
                strokeDasharray={ring.type === "dashed" ? ring.dashArray : undefined}
                strokeOpacity={ring.opacity}
              />
            </svg>

            {/* Pinned Cyber Badges along the circumference */}
            {ring.glyphs.map((g, gIdx) => {
              const rad = (g.angle * Math.PI) / 180;
              // Precise polar positioning on the circumference
              const x = radius + (radius - 1) * Math.cos(rad);
              const y = radius + (radius - 1) * Math.sin(rad);

              const { Icon } = g;

              return (
                <div
                  key={`${ring.id}-badge-${gIdx}`}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* The badge counter-rotates at the exact same speed so the icon always stays upright! */}
                  <div
                    className={`${ring.counterClass} group/badge flex items-center justify-center w-5 h-5 sm:w-5.5 sm:h-5.5 bg-[#09090B]/90 border border-[#D4FF00]/50 rounded-sm text-[#D4FF00]/80 shadow-[0_0_8px_rgba(212,255,0,0.2)] hover:scale-135 hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#121216] hover:shadow-[0_0_16px_#D4FF00] transition-all duration-200 cursor-pointer`}
                    title="Hoza Node Sentinel"
                  >
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4FF00]/80 group-hover/badge:text-[#E6FF4D] transition-colors" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
