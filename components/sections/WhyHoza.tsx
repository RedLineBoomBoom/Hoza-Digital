"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Zap,
  Sliders,
  ShieldAlert,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SmoothHeading } from "@/components/ui/SmoothHeading";

export const WhyHoza: React.FC = () => {
  const [complexityLevel, setComplexityLevel] = useState<number>(0); // 0: MVP, 1: Growth, 2: Enterprise
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState<number>(0); // 0 to 100
  const trackRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      id: 0,
      label: "STARTUP MVP",
      tag: "SPEED TO MARKET",
      scope: "High-impact landing page or initial mobile prototype",
      agencyTime: "60 - 90 Days",
      agencyWeeks: 12,
      hozaTime: "7 - 14 Days",
      hozaWeeks: 2,
      costSavings: "58% Saved",
      efficiency: "5.5x Faster",
      timelinePercent: 17, // 2 / 12
    },
    {
      id: 1,
      label: "GROWTH PLATFORM",
      tag: "SCALE & CONVERSION",
      scope: "Full-scale corporate web system, customer portal, & WhatsApp bot",
      agencyTime: "120 - 180 Days",
      agencyWeeks: 24,
      hozaTime: "14 - 28 Days",
      hozaWeeks: 4,
      costSavings: "65% Saved",
      efficiency: "6.0x Faster",
      timelinePercent: 17, // 4 / 24
    },
    {
      id: 2,
      label: "ENTERPRISE ECOSYSTEM",
      tag: "HIGH COMPLEXITY",
      scope: "Multi-region edge cluster, autonomous AI agent mesh, & internal ERP",
      agencyTime: "240+ Days",
      agencyWeeks: 36,
      hozaTime: "30 - 45 Days",
      hozaWeeks: 6,
      costSavings: "72% Saved",
      efficiency: "6.5x Faster",
      timelinePercent: 17, // 6 / 36
    },
  ];

  const currentStage = stages[complexityLevel];

  // Calculate percentage along track: 0 -> 0%, 1 -> 50%, 2 -> 100%
  const currentPercentage = isDragging ? dragPercent : complexityLevel * 50;

  // Dynamic offset to prevent tooltip from clipping on outer edges (0% and 100%)
  const tooltipTranslateX =
    currentPercentage > 65
      ? -50 - ((currentPercentage - 65) / 35) * 42 // smoothly shifts from -50% to -92%
      : currentPercentage < 35
      ? -50 + ((35 - currentPercentage) / 35) * 42 // smoothly shifts from -50% to -8%
      : -50;

  const updatePositionFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const rawPercent = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setDragPercent(rawPercent);

    // Smoothly set active stage dynamically based on thresholds
    if (rawPercent < 25) {
      setComplexityLevel(0);
    } else if (rawPercent < 75) {
      setComplexityLevel(1);
    } else {
      setComplexityLevel(2);
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture release fails
    }

    // Snap smoothly to closest step
    if (dragPercent < 25) {
      setComplexityLevel(0);
    } else if (dragPercent < 75) {
      setComplexityLevel(1);
    } else {
      setComplexityLevel(2);
    }
  };

  const selectStage = (index: number) => {
    setIsDragging(false);
    setComplexityLevel(index);
  };

  return (
    <section
      id="why-hoza"
      className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="border-b border-[#D4FF00]/20 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// VELOCITY BENCHMARK ACCELERATOR</span>
          </div>
          <SmoothHeading
            title="LESS TALK."
            highlight="MORE SHIPPED."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Drag the benchmark slider below to observe how eliminating agency
            bureaucracy accelerates time-to-market and cuts wasted commercial
            expenditure.
          </p>
        </div>
      </div>

      {/* Interactive Velocity Benchmark Simulator Card */}
      <div className="p-6 sm:p-10 bg-[#0C0C0C]/95 tactical-corners border border-white/15 shadow-2xl relative overflow-hidden">
        <span className="tactical-corner-tr" />
        <span className="tactical-corner-bl" />
        {/* Ambient Backlight Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4FF00]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Step Header */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[#D4FF00] uppercase font-bold tracking-wider block flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#D4FF00]" />
                <span>STEP 1: SELECT YOUR INITIATIVE COMPLEXITY</span>
              </span>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-hoza-white uppercase tracking-tight">
                  {currentStage.label}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4FF00]/15 border border-[#D4FF00]/40 text-[#D4FF00] font-mono text-[10px] font-bold tracking-wider">
                  {currentStage.tag}
                </span>
              </div>
            </div>

            {/* Scope Specification Banner - Generous space, clean typography, no crowded wrapping */}
            <AnimatePresence mode="wait">
              <motion.div
                key={complexityLevel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-2.5 rounded-xl bg-[#121216] border border-[#D4FF00]/30 max-w-lg flex items-center gap-2.5 font-mono text-xs shadow-inner"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse shrink-0" />
                <span className="text-[#D4FF00] font-bold shrink-0">// SPEC:</span>
                <span className="text-hoza-white font-medium">{currentStage.scope}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Ultra-Smooth Custom Cyber Slider with generous vertical clearance */}
          <div className="space-y-6 pt-6 sm:pt-8 px-2 sm:px-4">
            {/* Slider Rail with Draggable Puck */}
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-8 flex items-center cursor-pointer group touch-none select-none"
            >
              {/* Background Outer Groove */}
              <div className="w-full h-3 rounded-full bg-[#18181D] border border-[#D4FF00]/20 relative overflow-visible shadow-inner">
                {/* Glowing Laser Progress Fill */}
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#D4FF00] via-[#E6FF4D] to-[#D4FF00] shadow-[0_0_16px_rgba(212,255,0,0.5)]"
                  style={{
                    width: `${currentPercentage}%`,
                    transition: isDragging
                      ? "none"
                      : "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                {/* Tick Notch Markers at 0%, 50%, 100% */}
                {[0, 50, 100].map((tick, idx) => {
                  const isActive = currentPercentage >= tick - 2;
                  return (
                    <div
                      key={tick}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectStage(idx);
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer z-10"
                      style={{ left: `${tick}%` }}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          isActive
                            ? "bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]"
                            : "bg-[#27272A] border border-white/20"
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Draggable Cyber Beacon Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-grab active:cursor-grabbing pointer-events-none"
                style={{
                  left: `${currentPercentage}%`,
                  transition: isDragging
                    ? "none"
                    : "left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Floating Tooltip Indicator with dynamic edge-clamping translation */}
                <div
                  className="absolute -top-10 px-3 py-1 rounded-full bg-[#09090B] border border-[#D4FF00] shadow-[0_0_16px_rgba(212,255,0,0.5)] whitespace-nowrap font-mono text-[10px] font-bold text-[#D4FF00] flex items-center gap-1.5 pointer-events-none transition-transform duration-75"
                  style={{
                    left: "50%",
                    transform: `translateX(${tooltipTranslateX}%)`,
                  }}
                >
                  <Zap className="w-2.5 h-2.5 fill-[#D4FF00]" />
                  <span>{currentStage.hozaTime}</span>
                </div>

                {/* Orbiting Beacon Rings */}
                <div className="relative w-7 h-7 rounded-full bg-[#09090B] border-2 border-[#D4FF00] shadow-[0_0_20px_#D4FF00,inset_0_0_8px_#D4FF00] flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Interactive Step Buttons Below Rail */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {stages.map((stage, idx) => {
                const isCurrent = complexityLevel === idx;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => selectStage(idx)}
                    className={cn(
                      "font-mono text-[11px] sm:text-xs py-2 px-3 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-left cursor-pointer",
                      isCurrent
                        ? "border-[#D4FF00]/60 bg-[#D4FF00]/10 text-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.15)] font-bold"
                        : "border-transparent text-hoza-muted hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    <span>
                      0{idx + 1} {stage.label}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] sm:text-[11px] transition-colors",
                        isCurrent ? "text-emerald-400 font-bold" : "text-hoza-darkMuted"
                      )}
                    >
                      {stage.hozaTime}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Graphical Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Agency Card */}
          <div className="p-6 sm:p-8 bg-[#0E0E0E] tactical-corners tactical-corners-red border border-red-500/40 flex flex-col justify-between space-y-6">
            <span className="tactical-corner-tr border-red-500!" />
            <span className="tactical-corner-bl border-red-500!" />
            <div>
              <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-4">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>TRADITIONAL AGENCY ROUTE</span>
                </div>
                <span className="font-mono text-xs text-hoza-muted">WATERFALL</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={complexityLevel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="font-mono text-[10px] text-hoza-muted uppercase block">
                      ESTIMATED TIME TO DEPLOY
                    </span>
                    <span className="font-display font-black text-3xl sm:text-4xl text-red-400">
                      {currentStage.agencyTime}
                    </span>
                  </div>

                  {/* Simulated Timeline Bar */}
                  <div className="space-y-1">
                    <div className="h-3 w-full bg-hoza-surface rounded-full overflow-hidden flex">
                      <div className="h-full bg-red-500/60 w-full" />
                    </div>
                    <span className="font-mono text-[10px] text-hoza-muted block text-right">
                      ~{currentStage.agencyWeeks} WEEKS OF MEETINGS & HANDOFFS
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-mono text-hoza-muted">
                    <div className="flex items-center gap-2">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Multiple account managers who do not write code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Design mockups that break when converted to code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Endless hourly scope creep & surprise change orders</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-red-500/20 font-mono text-xs text-red-400/80 flex items-center justify-between">
              <span>BUREAUCRATIC WATERFALL</span>
              <span className="text-red-400 font-bold">DELAYED LAUNCH</span>
            </div>
          </div>

          {/* Hoza Digital Fast-Forward Card */}
          <div className="p-6 sm:p-8 bg-[#0E0E0E] tactical-corners border border-[#D4FF00]/40 flex flex-col justify-between space-y-6 shadow-[0_0_30px_rgba(212,255,0,0.1)] relative overflow-hidden">
            <span className="tactical-corner-tr" />
            <span className="tactical-corner-bl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4FF00]/8 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-[#D4FF00]/20 pb-4 mb-4">
                <div className="flex items-center gap-2 text-[#D4FF00] font-mono text-xs uppercase font-bold">
                  <Zap className="w-4 h-4" />
                  <span>HOZA DIGITAL SPRINTS</span>
                </div>
                <span className="px-2 py-0.5 bg-[#D4FF00]/15 text-[#D4FF00] font-mono text-[10px] font-bold border border-[#D4FF00]/40 rounded">
                  {currentStage.efficiency}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={complexityLevel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="font-mono text-[10px] text-hoza-muted uppercase block">
                      PRODUCTION RELEASE TIME
                    </span>
                    <span className="font-display font-black text-3xl sm:text-4xl text-[#D4FF00]">
                      {currentStage.hozaTime}
                    </span>
                  </div>

                  {/* Simulated Dynamic Timeline Bar */}
                  <div className="space-y-1">
                    <div className="h-3 w-full bg-hoza-surface rounded-full overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.round(
                            (currentStage.hozaWeeks / currentStage.agencyWeeks) * 100
                          )}%`,
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-[#D4FF00] to-[#E6FF4D] shadow-[0_0_12px_#D4FF00] rounded-full"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#D4FF00] block text-right font-bold">
                      WORKING SOFTWARE IN PRODUCTION IN ~{currentStage.hozaWeeks} WEEKS
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-mono text-hoza-white">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                      <span>Direct line to senior full-stack engineers & designers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                      <span>Pixel-perfect 1:1 code fidelity with sub-second LCP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                      <span>Fixed milestone pricing with upfront deliverables</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-[#D4FF00]/20 flex items-center justify-between font-mono text-xs">
              <span className="text-hoza-muted">COMMERCIAL EFFICIENCY:</span>
              <span className="text-emerald-400 font-bold">{currentStage.costSavings}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
