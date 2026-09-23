"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Zap,
  ArrowUpRight,
  Gauge,
  Clock,
  Sparkles,
  FileDown,
  Activity,
} from "lucide-react";
import { soundEffects } from "@/components/ui/SoundEffects";
import { ConcentricRadarRings } from "@/components/ui/ConcentricRadarRings";
import { cn } from "@/lib/utils";

interface HeroProps {
  onOpenProjectModal: (service?: string) => void;
  onOpenEstimator?: () => void;
  onOpenSystemHealth?: () => void;
  onOpenStudioDeck?: () => void;
}

interface KineticWordProps {
  text: string;
  defaultColor?: string;
  hoverColor?: string;
  dotColor?: string;
  className?: string;
}

const KineticWord: React.FC<KineticWordProps> = ({
  text,
  defaultColor = "text-white",
  hoverColor = "hover:text-[#D4FF00]",
  dotColor,
  className = "",
}) => {
  const chars = text.split("");
  const slantCycle: ("left" | "right" | "none")[] = [
    "left",
    "right",
    "none",
    "left",
    "right",
  ];

  return (
    <span className={cn("inline-flex whitespace-nowrap", className)}>
      {chars.map((c, i) => {
        const slant = slantCycle[i % slantCycle.length];
        const skewAngle = slant === "left" ? -12 : slant === "right" ? 12 : -8;
        const isDot = c === ".";
        const charDefaultColor = isDot && dotColor ? dotColor : defaultColor;

        return (
          <motion.span
            key={i}
            className={cn(
              "inline-block cursor-pointer select-none transition-colors duration-200 will-change-transform",
              charDefaultColor,
              hoverColor
            )}
            whileHover={{
              scale: 1.15,
              y: -10,
              skewX: skewAngle,
              rotate: slant === "left" ? -3.5 : slant === "right" ? 3.5 : 0,
              zIndex: 20,
              transition: { type: "spring", stiffness: 450, damping: 14 },
            }}
            whileTap={{ scale: 0.94 }}
            onMouseEnter={() => soundEffects.playHover?.()}
          >
            {c}
          </motion.span>
        );
      })}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({
  onOpenProjectModal,
  onOpenEstimator,
  onOpenSystemHealth,
  onOpenStudioDeck,
}) => {
  const [jakartaTime, setJakartaTime] = useState("");
  const [singaporeTime, setSingaporeTime] = useState("");
  const [liveLatency, setLiveLatency] = useState(12);

  // Smooth mouse parallax physics for radar concentric rings
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springConfig = { stiffness: 45, damping: 25 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      rawMouseX.set(offsetX * 20);
      rawMouseY.set(offsetY * 20);
    },
    [rawMouseX, rawMouseY]
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setJakartaTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setSingaporeTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Singapore",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const pingInt = setInterval(() => {
      setLiveLatency(Math.floor(9 + Math.random() * 6));
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInt);
    };
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-8 lg:px-14 xl:px-20 w-full select-none overflow-hidden bg-[#09090B]"
    >
      {/* 6 Concentric Rotating Orbital Radar Rings (Dashed & Solid with Counter-Rotating Upright Badges) */}
      <ConcentricRadarRings mouseX={smoothMouseX} mouseY={smoothMouseY} />

      {/* Soft-Focus Blur & Depth Scrim (Buram & Samar agar teks terbaca jelas tanpa tumpang tindih) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.60) 45%, rgba(9,9,11,0.2) 75%, transparent 100%)",
          backdropFilter: "blur(2.5px)",
          WebkitBackdropFilter: "blur(2.5px)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, rgba(0,0,0,0.6) 60%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, rgba(0,0,0,0.6) 60%, transparent 95%)",
        }}
      />

      {/* Top Telemetry Flight Deck Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-hoza-muted border-b border-white/10 pb-4 w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-hoza-surface border border-[#D4FF00]/40 text-[#D4FF00] rounded-sm text-[11px] shadow-[0_0_12px_rgba(212,255,0,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            <span>CYBER-SPATIAL OS</span>
          </div>
          <span className="hidden sm:inline-block text-hoza-darkMuted">/</span>
          <span className="hidden sm:inline-block text-hoza-white">
            JAKARTA HQ & SINGAPORE REGIONAL
          </span>
        </div>

        {/* Center/Interactive System Health & Scarcity HUD */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playClick?.();
            onOpenSystemHealth?.();
          }}
          className="group flex items-center gap-2 px-3 py-1 bg-[#121216]/90 hover:bg-[#181820] border border-[#D4FF00]/30 hover:border-[#D4FF00] rounded-full text-[11px] transition-all cursor-pointer shadow-[0_0_12px_rgba(212,255,0,0.1)] active:scale-98"
          title="Click to view full System Telemetry & Sprint Availability"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-medium">OCTOBER SPRINT:</span>
          <span className="text-[#D4FF00] font-bold">1 SLOT OPEN</span>
          <span className="text-neutral-500 group-hover:text-white transition-colors hidden md:inline">
            &bull; 99.98% SLA
          </span>
        </button>

        {/* Real-time clocks & Latency */}
        <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-[#D4FF00]" />
            <span className="text-hoza-white font-semibold">
              JKT {jakartaTime || "12:00"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-hoza-darkMuted">|</span>
            <span className="text-hoza-white font-semibold">
              SIN {singaporeTime || "13:00"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D4FF00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-ping" />
            <span>{liveLatency}ms</span>
          </div>
        </div>
      </div>

      {/* Centered Brutalist Headline & Core Content */}
      <div className="relative z-20 my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full px-2">
        {/* Eyebrow Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121216]/90 border border-[#D4FF00]/40 text-[#D4FF00] font-mono text-[11px] uppercase tracking-[0.2em] shadow-[0_0_16px_rgba(212,255,0,0.2)] mb-5 sm:mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4FF00] animate-pulse" />
          <span>HOZA DIGITAL STUDIO // PRODUCTION ENGINE</span>
        </motion.div>

        {/* Massive Clean Brutalist Stacked Headline with Kinetic Hover Slants */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.75rem] leading-[0.88] tracking-[-0.04em] uppercase select-none space-y-1 sm:space-y-2"
        >
          {/* Line 1: WE BUILD */}
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            <KineticWord text="WE" />
            <KineticWord text="BUILD" />
          </div>

          {/* Line 2: DIGITAL THINGS. */}
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            <KineticWord text="DIGITAL" />
            <KineticWord text="THINGS." dotColor="text-[#D4FF00]" />
          </div>

          {/* Line 3: FAST. (Glowing Acid Volt Core) */}
          <div className="flex items-center justify-center drop-shadow-[0_0_35px_rgba(212,255,0,0.55)]">
            <KineticWord
              text="FAST."
              defaultColor="text-[#D4FF00]"
              hoverColor="hover:text-white"
              dotColor="text-white"
              className="drop-shadow-[0_0_25px_rgba(212,255,0,0.65)]"
            />
          </div>
        </motion.div>

        {/* Narrative Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed text-center px-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          Hoza builds mission-critical websites, scalable cloud platforms, native
          mobile products, and autonomous AI pipelines in rapid 14-day engineering sprints.
        </motion.p>

        {/* Action CTAs - Dual Tactical Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-7 sm:mt-9"
        >
          <button
            onClick={() => {
              soundEffects.playClick?.();
              onOpenProjectModal();
            }}
            onMouseEnter={() => soundEffects.playHover?.()}
            className="btn-tactical btn-tactical-volt shadow-[0_0_25px_rgba(212,255,0,0.35)]"
          >
            <span className="btn-box-left">
              <Zap className="w-3.5 h-3.5 text-[#09090B]" />
            </span>
            <span className="btn-label font-black tracking-wider">
              Initiate Sprint
            </span>
            <span className="btn-box-right">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#09090B]" />
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick?.();
              const el = document.getElementById("estimator");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else if (onOpenEstimator) onOpenEstimator();
            }}
            onMouseEnter={() => soundEffects.playHover?.()}
            className="btn-tactical hover:border-[#D4FF00]"
          >
            <span className="btn-box-left">
              <Gauge className="w-3.5 h-3.5 text-[#D4FF00]" />
            </span>
            <span className="btn-label font-bold tracking-wider text-white">
              Scope & Speed Calculator
            </span>
            <span className="btn-box-right">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4FF00]" />
            </span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick?.();
              onOpenStudioDeck?.();
            }}
            onMouseEnter={() => soundEffects.playHover?.()}
            className="btn-tactical hover:border-[#D4FF00] bg-white/[0.04]"
          >
            <span className="btn-box-left">
              <FileDown className="w-3.5 h-3.5 text-[#D4FF00]" />
            </span>
            <span className="btn-label font-bold tracking-wider text-white">
              Studio Deck [PDF]
            </span>
            <span className="btn-box-right">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4FF00]" />
            </span>
          </button>
        </motion.div>

        {/* Telemetry Proof Metrics (Centered 3-column stats) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-2xl grid grid-cols-3 gap-4 sm:gap-8 text-center font-mono"
        >
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-hoza-white font-display">
              14 DAYS
            </div>
            <div className="text-[10px] text-hoza-muted uppercase mt-1 tracking-wider">
              SPRINT VELOCITY
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#D4FF00] font-display">
              100 / 100
            </div>
            <div className="text-[10px] text-hoza-muted uppercase mt-1 tracking-wider">
              LIGHTHOUSE SPEED
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-hoza-white font-display">
              100% IP
            </div>
            <div className="text-[10px] text-hoza-muted uppercase mt-1 tracking-wider">
              CODE TRANSFER
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Sub-Telemetry Notice */}
      <div className="relative z-20 flex items-center justify-between font-mono text-[10px] text-hoza-muted border-t border-white/5 pt-3 w-full">
        <span>ARCH: DETERMINISTIC REACT &bull; ZERO RUNTIME BLOAT</span>
        <span className="hidden sm:inline-block text-[#D4FF00]">
          HOZA CYBER PLATFORM v4.0
        </span>
        <span>LATENCY OPTIMIZED</span>
      </div>
    </section>
  );
};
