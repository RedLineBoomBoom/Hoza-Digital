"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, animate } from "framer-motion";
import {
  Terminal,
  Activity,
  Globe,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Bot,
  Gauge,
  Layers,
  Sparkles,
  Clock,
  Play,
  GripHorizontal,
} from "lucide-react";
import { soundEffects } from "@/components/ui/SoundEffects";
import { SmoothHeading } from "@/components/ui/SmoothHeading";

// Dynamically import Three.js Canvas
const HeroCoreCanvas = dynamic(
  () =>
    import("@/components/3d/HeroCoreCanvas").then((mod) => mod.HeroCoreCanvas),
  { ssr: false }
);

interface HeroProps {
  onOpenProjectModal: (service?: string) => void;
  onOpenEstimator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenProjectModal,
  onOpenEstimator,
}) => {
  const [jakartaTime, setJakartaTime] = useState("");
  const [singaporeTime, setSingaporeTime] = useState("");
  const [liveLatency, setLiveLatency] = useState(12);

  // Draggable Interactive Terminal State
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isDisplaced, setIsDisplaced] = useState(false);
  const [dragBounds, setDragBounds] = useState({
    left: -90,
    right: 90,
    top: -70,
    bottom: 70,
  });

  useEffect(() => {
    const updateBounds = () => {
      const isMobile = window.innerWidth < 640;
      const isWidescreen = window.innerWidth > 1600;
      setDragBounds({
        left: isMobile ? -35 : isWidescreen ? -140 : -90,
        right: isMobile ? 35 : isWidescreen ? 140 : 90,
        top: isMobile ? -40 : -70,
        bottom: isMobile ? 40 : 70,
      });
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const resetTerminalPosition = () => {
    animate(dragX, 0, { type: "spring", stiffness: 220, damping: 22 });
    animate(dragY, 0, { type: "spring", stiffness: 220, damping: 22 });
    setIsDisplaced(false);
  };

  const scheduleIdleReset = (delay = 1800) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      resetTerminalPosition();
    }, delay);
  };

  const handleTerminalDragStart = () => {
    soundEffects.playClick?.();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsDisplaced(true);
  };

  const handleTerminalDrag = () => {
    scheduleIdleReset(1800);
  };

  const handleTerminalDragEnd = () => {
    scheduleIdleReset(1800);
  };

  // Interactive Live Engineering Console State
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "INITIALIZING HOZA KERNEL v3.4_STABLE...",
    "CORE READY. EDGE NETWORK: 12 GLOBAL NODES LINKED.",
    "STATUS: AWAITING COMMAND INPUT OR PRESET EXECUTION.",
  ]);
  const [activePreset, setActivePreset] = useState<string | null>(null);

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

  const runCommandPreset = (cmd: string) => {
    soundEffects.playClick?.();
    setActivePreset(cmd);

    let newLogs: string[] = [];
    if (cmd === "test-speed") {
      newLogs = [
        "$ hoza audit-speed --target=global-cdn",
        "> SYN Flood Test: 0.00ms Drop Rate",
        "> LCP Benchmark: 0.38s (Grade: 100/100)",
        "> TBT: 0ms | CLS: 0.000 | Speed Index: 0.4s",
        "✓ RESULT: OPTIMAL SUB-SECOND VELOCITY CONFIRMED",
      ];
    } else if (cmd === "trigger-ai") {
      newLogs = [
        "$ hoza agent-dispatch --mesh=whatsapp-crm",
        "> Autonomous Agent: Model Gemini-Pro/Claude-3.5",
        "> Parsing Inbound Lead: 'Enterprise Multi-Region ERP'",
        "> Verification Score: 98.4% Qualified",
        "✓ RESULT: SYNCED TO SLACK & CALENDAR INVITE DISPATCHED (0.6s)",
      ];
    } else {
      newLogs = [
        "$ hoza edge-ping --regions=[jkt,sin,tyo,sfo,ldn]",
        `> Jakarta HQ: ${liveLatency}ms [TLS 1.3 Established]`,
        `> Singapore Node: ${liveLatency + 4}ms [Edge Cache Hot]`,
        `> Tokyo Hub: ${liveLatency + 32}ms | San Francisco: 135ms`,
        "✓ RESULT: ZERO-PACKET LOSS ACROSS GLOBAL BACKBONE",
      ];
    }

    setConsoleLogs((prev) => [...prev.slice(-2), ...newLogs]);
  };

  return (
    <section className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 lg:pt-28 pb-10 px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-28 w-full select-none overflow-hidden">
      {/* 3D WebGL Background Quantum Core Canvas - Golden ratio offset to the right behind CLI terminal */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 sm:left-[56%] md:left-[58%] lg:left-[60%] xl:left-[62%] 2xl:left-[64%] 3xl:left-[65%] w-full max-w-[700px] sm:max-w-[850px] lg:max-w-[1050px] xl:max-w-[1200px] 2xl:max-w-[1350px] h-[580px] sm:h-[680px] lg:h-[820px] xl:h-[920px] 2xl:h-[1000px] z-0 flex items-center justify-center opacity-75 lg:opacity-90 pointer-events-none">
        <HeroCoreCanvas className="w-full h-full" />
      </div>

      {/* Cyber Grid Background Matrix & Wide Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(139,92,255,0.14),rgba(0,240,255,0.03),transparent)] z-0" />

      {/* Top Telemetry Flight Deck */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-hoza-muted border-b border-hoza-violet/40 pb-4 w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-hoza-surface border border-[#00F0FF]/40 text-[#00F0FF] rounded-sm text-[11px] shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>CYBER-SPATIAL OS</span>
          </div>
          <span className="hidden sm:inline-block text-hoza-darkMuted">/</span>
          <span className="hidden sm:inline-block text-hoza-lavender">
            JAKARTA HQ & SINGAPORE REGIONAL
          </span>
        </div>

        {/* Real-time clocks & Latency */}
        <div className="flex items-center gap-4 sm:gap-6 text-[11px]">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-[#00F0FF]" />
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
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{liveLatency}ms</span>
          </div>
        </div>
      </div>

      {/* Center Layout: Left Asymmetrical Headline, Right Live Engineering Console */}
      <div className="relative z-10 my-auto py-6 sm:py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 2xl:gap-24 items-center w-full">
        {/* Left Column (7 cols on lg, 6 cols on xl+): Bold Re-architected Cyber Typography */}
        <div className="lg:col-span-7 xl:col-span-6 2xl:col-span-6 min-w-0 w-full flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#0D0718] border border-hoza-violet text-hoza-lavender font-mono text-xs shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[#00F0FF] font-bold">NEXT-GEN IT PROTOCOL</span>
            <span className="text-hoza-darkMuted">// 2026 EDITION</span>
          </div>

          <SmoothHeading as="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[4.25rem] 2xl:text-[5rem] 3xl:text-[5.5rem] leading-[1.02] tracking-tight">
            ARCHITECTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hoza-white via-hoza-lavender to-[#8B5CFF]">
              HIGH-IMPACT
            </span>{" "}
            <br />
            <span className="relative inline-block max-w-full text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white">
              DIGITAL SYSTEMS.
              {/* Cyan Laser Glow Line */}
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[#00F0FF] via-[#8B5CFF] to-transparent shadow-[0_0_15px_#00F0FF]" />
            </span>
          </SmoothHeading>

          <p className="text-base sm:text-lg lg:text-xl text-hoza-muted max-w-2xl xl:max-w-3xl font-normal leading-relaxed pt-1">
            Hoza builds mission-critical websites, scalable cloud platforms, native
            mobile products, and autonomous AI pipelines in rapid 14-day engineering sprints.
          </p>

          {/* Action CTAs - Bulkhead Tactical Dual-Box Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundEffects.playClick?.();
                onOpenProjectModal();
              }}
              onMouseEnter={() => soundEffects.playHover?.()}
              className="btn-tactical btn-tactical-cyan"
            >
              <span className="btn-box-left">
                <Zap className="w-3.5 h-3.5 text-[#08050D]" />
              </span>
              <span className="btn-label font-black tracking-wider">
                Initiate Sprint
              </span>
              <span className="btn-box-right">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#08050D]" />
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
              className="btn-tactical hover:border-[#00F0FF]"
            >
              <span className="btn-box-left">
                <Gauge className="w-3.5 h-3.5 text-[#00F0FF]" />
              </span>
              <span className="btn-label font-bold tracking-wider text-white">
                Scope & Speed Calculator
              </span>
              <span className="btn-box-right">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF]" />
              </span>
            </button>
          </div>

          {/* Telemetry Proof Metrics (Fills lower-left area with high-value proof badges) */}
          <div className="pt-6 grid grid-cols-3 gap-6 sm:gap-8 border-t border-white/10 w-full max-w-xl xl:max-w-2xl text-hoza-muted font-mono">
            <div>
              <div className="text-lg sm:text-xl xl:text-2xl font-bold text-hoza-white font-display">14 DAYS</div>
              <div className="text-[10px] text-hoza-muted uppercase mt-0.5">SPRINT VELOCITY</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl xl:text-2xl font-bold text-[#00F0FF] font-display">100 / 100</div>
              <div className="text-[10px] text-hoza-muted uppercase mt-0.5">LIGHTHOUSE SPEED</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl xl:text-2xl font-bold text-emerald-400 font-display">100% IP</div>
              <div className="text-[10px] text-hoza-muted uppercase mt-0.5">CODE TRANSFER</div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols on lg, 6 cols on xl+): Interactive Live Engineering Console */}
        <div className="lg:col-span-5 xl:col-span-6 2xl:col-span-6 min-w-0 w-full relative flex justify-center lg:justify-end">
          <motion.div
            style={{ x: dragX, y: dragY }}
            drag
            dragConstraints={dragBounds}
            dragElastic={0.15}
            onDragStart={handleTerminalDragStart}
            onDrag={handleTerminalDrag}
            onDragEnd={handleTerminalDragEnd}
            whileDrag={{
              scale: 1.02,
              boxShadow: "0 0 50px rgba(0, 240, 255, 0.35)",
            }}
            onDoubleClick={resetTerminalPosition}
            title="Click and drag freely to move terminal / Automatically returns to original position when idle"
            className="cursor-grab active:cursor-grabbing bg-[#0A0710]/95 border border-white/10 hover:border-[#00F0FF]/60 transition-colors p-4 sm:p-5 lg:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative rounded-2xl backdrop-blur-md touch-none select-none w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-hoza-violet/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-mono text-xs text-hoza-white font-bold tracking-wider">
                  HOZA_ENGINE_CLI
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#120A21] border border-[#8B5CFF]/30 text-[#00F0FF] hidden sm:inline-flex items-center gap-1.5">
                  <GripHorizontal className="w-3 h-3 text-[#00F0FF]" />
                  <span>{isDisplaced ? "AUTO-RESTORES ON IDLE" : "DRAGGABLE"}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            {/* Presets Bar */}
            <div className="mb-4">
              <span className="font-mono text-[10px] text-hoza-muted uppercase block mb-2">
                EXECUTE LIVE ARCHITECTURE PRESET:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => runCommandPreset("test-speed")}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseEnter={() => soundEffects.playHover?.()}
                  className="px-2.5 py-1 bg-hoza-surface hover:bg-hoza-surfaceHover border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-[10px] uppercase rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <Zap className="w-3 h-3" />
                  <span>$ test-speed</span>
                </button>

                <button
                  onClick={() => runCommandPreset("trigger-ai")}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseEnter={() => soundEffects.playHover?.()}
                  className="px-2.5 py-1 bg-hoza-surface hover:bg-hoza-surfaceHover border border-[#8B5CFF]/50 text-[#C8B7FF] font-mono text-[10px] uppercase rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <Bot className="w-3 h-3" />
                  <span>$ trigger-ai</span>
                </button>

                <button
                  onClick={() => runCommandPreset("edge-ping")}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseEnter={() => soundEffects.playHover?.()}
                  className="px-2.5 py-1 bg-hoza-surface hover:bg-hoza-surfaceHover border border-hoza-violet text-hoza-muted hover:text-hoza-white font-mono text-[10px] uppercase rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <Globe className="w-3 h-3" />
                  <span>$ edge-ping</span>
                </button>
              </div>
            </div>

            {/* Terminal Live Output Box */}
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="bg-[#050308] border border-hoza-violet/80 p-4 rounded-xl font-mono text-xs text-hoza-muted min-h-[160px] max-h-[220px] overflow-y-auto space-y-1.5 select-text"
            >
              {consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.startsWith("✓")
                      ? "text-[#00F0FF] font-bold"
                      : log.startsWith("$")
                      ? "text-hoza-white font-bold"
                      : log.includes("OPTIMAL") || log.includes("Established")
                      ? "text-emerald-400"
                      : "text-hoza-muted"
                  }`}
                >
                  {log}
                </div>
              ))}
              <div className="flex items-center gap-1 text-[#00F0FF] pt-1">
                <span>&gt;</span>
                <span className="w-2 h-4 bg-[#00F0FF] animate-pulse" />
              </div>
            </div>

            {/* Terminal Bottom Metrics */}
            <div className="mt-4 pt-3 border-t border-hoza-violet/60 flex items-center justify-between font-mono text-[10px] text-hoza-muted">
              <span>CORE ARCHITECTURE: NEXT.JS 14</span>
              <span className="text-[#00F0FF]">DETERMINISTIC // ACTIVE</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Interface Readout */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-hoza-violet/40 pt-4 font-mono text-xs text-hoza-muted">
        <div className="flex items-center gap-3">
          <span className="text-hoza-white font-bold tracking-wider">HOZA DIGITAL</span>
          <span className="text-hoza-darkMuted">•</span>
          <span className="text-[#00F0FF]">ZERO TECHNICAL DEBT</span>
          <span className="text-hoza-darkMuted">•</span>
          <span>100% PRODUCTION OWNERSHIP</span>
        </div>

        <div className="flex items-center gap-2 text-hoza-lavender">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>ENTERPRISE SLA SPECIFICATION</span>
        </div>
      </div>
    </section>
  );
};
