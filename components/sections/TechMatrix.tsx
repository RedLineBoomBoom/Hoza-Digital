"use client";

import React, { useState } from "react";
import { TECH_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, ShieldCheck, Cpu, Sparkles, Layers } from "lucide-react";
import { SmoothHeading } from "@/components/ui/SmoothHeading";
import { soundEffects } from "@/components/ui/SoundEffects";
import { motion, AnimatePresence } from "framer-motion";

export const TechMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Frontend");

  const currentCategory =
    TECH_CATEGORIES.find((c) => c.category === selectedCategory) ||
    TECH_CATEGORIES[0];

  const handleSelectCategory = (catName: string) => {
    soundEffects.playClick?.();
    setSelectedCategory(catName);
  };

  return (
    <section id="tech" className="relative py-24 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#D4FF00]/10 blur-[120px] pointer-events-none rounded-full" />

      {/* â”€â”€ SECTION HEADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="border-b border-[#D4FF00]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_8px_#D4FF00]" />
            <span>// 06 TECHNOLOGY MATRIX</span>
          </div>
          <SmoothHeading
            title="THE RIGHT TOOL"
            highlight="FOR THE JOB."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Hoza selects technology based on business needs, scalability and
            maintainability. We never impose a tool just because it is trending.
          </p>
        </div>
      </div>

      {/* â”€â”€ KINETIC INFINITE TICKER (Subtle & Elegant) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="group mb-12 overflow-hidden border-y border-white/10 py-3 bg-[#0E0E12]/60 backdrop-blur-sm relative rounded-xl z-10 flex items-center select-none">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap animate-ticker-left">
          {TECH_CATEGORIES.flatMap((c) => c.tools).map((tool, idx) => (
            <div
              key={`tech-track1-${idx}`}
              className="inline-flex items-center gap-3 font-mono text-xs tracking-wider text-hoza-muted hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]/60 shadow-[0_0_6px_rgba(212,255,0,0.4)]" />
              <span>{tool}</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Exact Duplicate Clone for 100% Seamless Infinite Loop) */}
        <div
          className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap animate-ticker-left"
          aria-hidden="true"
        >
          {TECH_CATEGORIES.flatMap((c) => c.tools).map((tool, idx) => (
            <div
              key={`tech-track2-${idx}`}
              className="inline-flex items-center gap-3 font-mono text-xs tracking-wider text-hoza-muted hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]/60 shadow-[0_0_6px_rgba(212,255,0,0.4)]" />
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ INTERACTIVE CATEGORY SELECTOR & DETAILS (Clean 2-Column) â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
        {/* Category List Sidebar (4 cols) */}
        <div className="lg:col-span-4 p-2 bg-[#121216]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl space-y-1.5">
          <div className="px-3 pt-2 pb-2 font-mono text-[10px] text-hoza-muted uppercase tracking-wider">
            Select Architecture Domain
          </div>
          {TECH_CATEGORIES.map((cat) => {
            const isSelected = cat.category === selectedCategory;
            return (
              <button
                key={cat.category}
                onClick={() => handleSelectCategory(cat.category)}
                onMouseEnter={() => soundEffects.playHover?.()}
                className={cn(
                  "w-full p-3.5 sm:p-4 text-left rounded-xl transition-colors duration-200 flex items-center justify-between select-none cursor-pointer group relative overflow-hidden",
                  isSelected
                    ? "text-white font-bold"
                    : "text-hoza-muted hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTechDomainPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4FF00]/25 to-[#D4FF00]/10 border border-[#D4FF00]/50 shadow-[0_0_15px_rgba(212,255,0,0.2)] pointer-events-none"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <div className="flex items-center gap-3 relative z-10">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      isSelected
                        ? "bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]"
                        : "bg-white/20 group-hover:bg-white/40"
                    )}
                  />
                  <span className="text-sm font-sans tracking-wide">
                    {cat.category}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors relative z-10",
                    isSelected
                      ? "bg-[#D4FF00]/30 text-[#D4FF00] border border-[#D4FF00]/40"
                      : "bg-white/5 text-hoza-muted group-hover:text-white"
                  )}
                >
                  {cat.tools.length} modules
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Details Card (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 bg-[#121216]/80 backdrop-blur-md shadow-2xl relative min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.category}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between flex-1"
            >
              <div>
                {/* Header of Details Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <span className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest block mb-1 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span>// ARCHITECTURE FOCUS</span>
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                      {currentCategory.category}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-full w-fit shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ENTERPRISE VERIFIED</span>
                  </div>
                </div>

                {/* Business Rationale Description */}
                <p className="text-sm sm:text-base text-hoza-white/80 mb-8 leading-relaxed font-sans">
                  {currentCategory.desc} Every dependency is audited for zero CVE
                  vulnerabilities, LTS stability, and high developer velocity.
                </p>

                {/* Component Stack Grid */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-mono text-xs text-hoza-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_6px_#D4FF00]" />
                    <span>Verified Production Component Stack</span>
                  </h4>
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.025,
                        },
                      },
                    }}
                  >
                    {currentCategory.tools.map((tool, tIdx) => (
                      <motion.div
                        key={`${currentCategory.category}-${tool}-${tIdx}`}
                        variants={{
                          hidden: { opacity: 0, y: 8, scale: 0.96 },
                          show: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.2, ease: "easeOut" },
                          },
                        }}
                        className="p-3.5 bg-[#18181D]/80 hover:bg-[#1E1E24] border border-white/10 hover:border-[#D4FF00]/60 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-sm hover:shadow-[0_0_15px_rgba(212,255,0,0.25)] hover:-translate-y-0.5 cursor-default"
                      >
                        <span className="text-white text-xs sm:text-sm font-sans font-medium group-hover:text-[#D4FF00] transition-colors">
                          {tool}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-white/5 group-hover:bg-[#D4FF00]/15 flex items-center justify-center transition-colors">
                          <Check className="w-3 h-3 text-[#D4FF00] opacity-70 group-hover:opacity-100" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Philosophy Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-hoza-muted">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>PHILOSOPHY: BUSINESS OUTCOME &gt; HYPE</span>
                </div>
                <span className="text-[#D4FF00] font-semibold">
                  ZERO RUNTIME BLOAT
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
