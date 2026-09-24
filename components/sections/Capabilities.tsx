"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Bot,
  Smartphone,
  Cpu,
  Layout,
  Boxes,
  Newspaper,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Activity,
  Zap,
} from "lucide-react";
import { soundEffects } from "@/components/ui/SoundEffects";
import { SmoothHeading } from "@/components/ui/SmoothHeading";
import { cn } from "@/lib/utils";

interface CapabilitiesProps {
  onSelectService?: (service: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({
  onSelectService,
}) => {
  // Page state: [currentPage, direction]
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  React.useEffect(() => {
    const checkPointer = () => {
      setIsDesktopPointer(
        window.innerWidth >= 768 &&
        window.matchMedia("(pointer: fine)").matches
      );
    };
    checkPointer();
    window.addEventListener("resize", checkPointer);
    return () => window.removeEventListener("resize", checkPointer);
  }, []);

  // Module 1 Interactive Viewport State (Lighthouse toggle)
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");

  // Module 2 Interactive AI Query State
  const [aiResponse, setAiResponse] = useState<string>(
    "Agent initialized. Monitoring inbound enterprise requests 24/7."
  );
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const simulateAiQuery = () => {
    soundEffects.playClick?.();
    setIsAiProcessing(true);
    setAiResponse("Parsing customer request & syncing with WhatsApp API...");
    setTimeout(() => {
      setAiResponse(
        "✓ Intent: High-Value Enterprise Lead. Synced to CRM & WhatsApp alert dispatched in 0.4s."
      );
      setIsAiProcessing(false);
    }, 900);
  };

  // 9 Specialized Capabilities from Hoza (Divided cleanly into 3 Cohorts of 3)
  const capabilities = [
    // Cohort 1: Digital Flagships & AI (01 - 03)
    {
      id: "MOD_01",
      tag: "LIVE RUNTIME",
      category: "DIGITAL FLAGSHIPS",
      title: "WEBSITES & APPS",
      serviceName: "Websites",
      desc: "Fast-loading, SEO-dominant digital flagships engineered for market credibility and high-ticket institutional lead generation.",
      icon: Globe,
      type: "lighthouse",
    },
    {
      id: "MOD_02",
      tag: "AUTONOMOUS AI",
      category: "INTELLIGENT AGENTS",
      title: "AUTONOMOUS AI",
      serviceName: "Automation & AI Agents",
      desc: "Self-governing AI workflows routing leads, qualifying prospects, and automating repetitive back-office operations 24/7.",
      icon: Bot,
      type: "ai_agent",
    },
    {
      id: "MOD_03",
      tag: "120 FPS NATIVE",
      category: "MOBILE ARCHITECTURE",
      title: "MOBILE PRODUCTS",
      serviceName: "Mobile Applications",
      desc: "Fluid gesture ergonomics, offline-first data sync, and 1-tap biometric auth built natively for iOS and Android devices.",
      icon: Smartphone,
      type: "mobile",
    },

    // Cohort 2: Growth & Automation Engines (04 - 06)
    {
      id: "MOD_04",
      tag: "0% LOSS PIPELINE",
      category: "BACKEND AUTOMATION",
      title: "WORKFLOW ENGINES",
      serviceName: "Automation",
      desc: "Seamless inter-system connectivity eliminating hundreds of wasted manual hours every month with resilient webhooks.",
      icon: Cpu,
      type: "automation",
    },
    {
      id: "MOD_05",
      tag: "+42% PROVEN CVR",
      category: "CONVERSION ENGINES",
      title: "LANDING PAGES",
      serviceName: "Landing Pages",
      desc: "Laser-focused narrative funnels engineered to convert paid traffic into verified recurring enterprise revenue.",
      icon: Layout,
      type: "landing",
    },
    {
      id: "MOD_06",
      tag: "DISTRIBUTED CLOUD",
      category: "SCALABLE SYSTEMS",
      title: "CUSTOM SOFTWARE",
      serviceName: "Custom Software",
      desc: "Tailor-made backend engines and distributed systems for mission-critical requirements off-the-shelf tools cannot solve.",
      icon: Boxes,
      type: "software",
    },

    // Cohort 3: Communications & Bespoke Systems (07 - 09)
    {
      id: "MOD_07",
      tag: "MEDIA READY",
      category: "COMMUNICATIONS",
      title: "PRESS RELEASES",
      serviceName: "Press Release",
      desc: "Digital press hubs and official company announcements structured for Tier-1 technology journalists and stakeholders.",
      icon: Newspaper,
      type: "press",
    },
    {
      id: "MOD_08",
      tag: "PRINT + DIGITAL",
      category: "PUBLICATION DESIGN",
      title: "EDITORIAL DESIGN",
      serviceName: "Magazine & Tabloid Design",
      desc: "Editorial spreads, magazines, and digital publication architectures with pristine vector typography and art direction.",
      icon: BookOpen,
      type: "editorial",
    },
    {
      id: "MOD_09",
      tag: "RAPID 24H SPRINT",
      category: "BESPOKE ARCHITECTURE",
      title: "CUSTOM PROTOTYPING",
      serviceName: "Custom Software",
      desc: "Zero-latency rapid prototyping and bespoke engineering for ambitious technical founders. Go from spec to working software in days.",
      icon: Zap,
      type: "bespoke",
    },
  ];

  // Exactly 3 Cohorts of 3 Highlights Each
  const cohorts = [
    {
      page: 0,
      label: "01",
      name: "FLAGSHIPS & AI",
      range: "01-03",
      items: capabilities.slice(0, 3),
    },
    {
      page: 1,
      label: "02",
      name: "ENGINES & SCALE",
      range: "04-06",
      items: capabilities.slice(3, 6),
    },
    {
      page: 2,
      label: "03",
      name: "MEDIA & BESPOKE",
      range: "07-09",
      items: capabilities.slice(6, 9),
    },
  ];

  const paginate = (newDirection: number) => {
    soundEffects.playClick?.();
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < cohorts.length) {
      setPage([newPage, newDirection]);
    }
  };

  const jumpToPage = (targetPage: number) => {
    if (targetPage === page) return;
    soundEffects.playClick?.();
    const dir = targetPage > page ? 1 : -1;
    setPage([targetPage, dir]);
  };

  // Framer Motion slide variants with smooth physics
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.18 },
      },
    }),
  };

  return (
    <section
      id="capabilities"
      className="relative py-24 sm:py-28 w-full select-none overflow-hidden"
    >
      {/* Background Ambience: Subtle Volt Spotlight (Single unified global grid from layout.tsx) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4FF00]/5 opacity-40 blur-3xl pointer-events-none" />

      {/* Header Bar matching Hoza Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 text-center relative z-10">
        {/* Top Centered Pill: • 3 HIGHLIGHTS PER VIEW */}
        <div className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF00] mb-4 bg-[#121216] border border-[#D4FF00]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(212,255,0,0.15)]">
          <span className="w-1.5 h-1.5 bg-[#D4FF00] rounded-full animate-pulse shadow-[0_0_8px_#D4FF00]" />
          <span>FOCUSED 3-CARD COHORTS // BATCH 0{page + 1} OF 03</span>
        </div>

        {/* Massive Display Title in Hoza Signature Volt-Cyan Gradient */}
        <div className="flex justify-center">
          <SmoothHeading
            title="OUR"
            highlight="CAPABILITIES."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <p className="mt-4 max-w-xl mx-auto font-mono text-xs sm:text-sm text-hoza-muted leading-relaxed">
          Nine specialized engineering disciplines organized into focused sets of three. Drag horizontally or click any capability to inspect architecture details.
        </p>

        {/* Carousel Navigation Toolbar (Hoza Obsidian & Electric Palette) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className="w-10 h-10 bg-[#121216] border border-[#27272A] hover:border-[#D4FF00] hover:bg-[#D4FF00]/15 disabled:opacity-20 disabled:hover:border-[#27272A] disabled:hover:bg-[#121216] text-white flex items-center justify-center rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(212,255,0,0.2)]"
            aria-label="Previous 3 capabilities"
          >
            <ChevronLeft className="w-4 h-4 text-[#D4FF00]" />
          </button>

          {/* 3 Interactive Cohort Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0E0E12] border border-[#27272A] p-1 rounded-xl">
            {cohorts.map((cohort) => {
              const isCurrent = page === cohort.page;
              return (
                <button
                  key={cohort.page}
                  onClick={() => jumpToPage(cohort.page)}
                  className={cn(
                    "px-3 py-1.5 font-mono text-xs transition-all flex items-center gap-1.5 sm:gap-2 rounded-lg cursor-pointer",
                    isCurrent
                      ? "bg-[#D4FF00] text-[#09090B] font-bold border border-[#D4FF00] shadow-[0_0_16px_rgba(212,255,0,0.5)]"
                      : "text-hoza-muted hover:text-white hover:bg-[#D4FF00]/15 border border-transparent"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 transition-colors rounded-full",
                      isCurrent
                        ? "bg-[#09090B] shadow-[0_0_6px_#09090B]"
                        : "bg-[#D4FF00]/40"
                    )}
                  />
                  <span>[{cohort.label}]</span>
                  <span className="hidden md:inline text-[10px] tracking-wider">
                    {cohort.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => paginate(1)}
            disabled={page === cohorts.length - 1}
            className="w-10 h-10 bg-[#121216] border border-[#27272A] hover:border-[#D4FF00] hover:bg-[#D4FF00]/15 disabled:opacity-20 disabled:hover:border-[#27272A] disabled:hover:bg-[#121216] text-white flex items-center justify-center rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(212,255,0,0.2)]"
            aria-label="Next 3 capabilities"
          >
            <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
          </button>
        </div>
      </div>

      {/* Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
          HOZA THEMED 3-CARD DISPLAY AREA (MAX 3 CARDS ON SCREEN)
          Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={isDesktopPointer ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(e, { offset, velocity }) => {
              if (!isDesktopPointer) return;
              if (offset.x < -60 || velocity.x < -250) {
                if (page < cohorts.length - 1) paginate(1);
              } else if (offset.x > 60 || velocity.x > 250) {
                if (page > 0) paginate(-1);
              }
            }}
            className={cn(
              "w-full flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar",
              isDesktopPointer && "cursor-grab active:cursor-grabbing"
            )}
          >
            {cohorts[page].items.map((cap) => {
              const Icon = cap.icon;

              return (
                <div
                  key={cap.id}
                  onClick={() => onSelectService?.(cap.serviceName)}
                  onMouseEnter={() => soundEffects.playHover?.()}
                  className={cn(
                    "capability-card shrink-0 w-[84vw] max-w-[340px] sm:w-auto snap-center min-h-[500px] sm:min-h-[540px] p-4 min-[380px]:p-6 sm:p-7 relative flex flex-col justify-between transition-all duration-300 select-none group border rounded-2xl overflow-hidden",
                    "bg-[#121216]/90 backdrop-blur-md text-hoza-white border-[#27272A] hover:border-[#D4FF00] hover:bg-[#16161C] hover:shadow-[0_0_35px_rgba(212,255,0,0.2),inset_0_1px_0_rgba(212,255,0,0.1)] hover:-translate-y-2 cursor-pointer"
                  )}
                >
                  {/* 4 GLOWING CYBERNETIC CORNER RIVETS (Hoza Volt/Cyan Accent) */}
                  <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:shadow-[0_0_8px_#D4FF00] transition-all block" />
                  <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:shadow-[0_0_8px_#D4FF00] transition-all block" />
                  <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:shadow-[0_0_8px_#D4FF00] transition-all block" />
                  <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:shadow-[0_0_8px_#D4FF00] transition-all block" />

                  {/* Top Section: Stencil Tag & Status */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold tracking-widest text-white/80 mb-4 px-1 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_6px_#D4FF00] inline-block" />
                        <span className="text-[#D4FF00]">[{cap.id}]</span>
                      </div>
                      <span className="text-hoza-muted">{cap.tag}</span>
                    </div>

                    {/* 16:9 Dark Cyber Media Box */}
                    <div
                      onClick={(e) => {
                        // Allow clicking inside widgets without triggering parent navigation
                        e.stopPropagation();
                      }}
                      className="w-full h-44 bg-[#0E0E12] border border-[#27272A] group-hover:border-[#D4FF00]/40 p-3.5 relative overflow-hidden flex flex-col justify-between text-white rounded-xl transition-colors"
                    >
                      {/* Top Bar inside Media Box */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#D4FF00]" />
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4FF00]/70">
                            {cap.category}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-[#D4FF00] flex items-center gap-1">
                          <Activity className="w-3 h-3 text-emerald-400" />
                          <span>LIVE</span>
                        </span>
                      </div>

                      {/* Interactive Widget Content */}
                      <div className="my-auto">
                        {cap.type === "lighthouse" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between font-mono text-[9px]">
                              <span className="text-emerald-400">LIGHTHOUSE 100</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setViewportMode("desktop")}
                                  className={cn(
                                    "px-1.5 py-0.5 border text-[8px] rounded-md cursor-pointer transition-all",
                                    viewportMode === "desktop"
                                      ? "border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/15 shadow-[0_0_8px_rgba(212,255,0,0.3)]"
                                      : "border-white/20 text-white/60 hover:text-white"
                                  )}
                                >
                                  DSK
                                </button>
                                <button
                                  onClick={() => setViewportMode("mobile")}
                                  className={cn(
                                    "px-1.5 py-0.5 border text-[8px] rounded-md cursor-pointer transition-all",
                                    viewportMode === "mobile"
                                      ? "border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/15 shadow-[0_0_8px_rgba(212,255,0,0.3)]"
                                      : "border-white/20 text-white/60 hover:text-white"
                                  )}
                                >
                                  MOB
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-1 text-center font-mono">
                              <div className="p-1 bg-[#18181D] border border-white/10 rounded-lg">
                                <span className="text-emerald-400 font-bold text-xs block">100</span>
                                <span className="text-[7px] text-hoza-muted">PERF</span>
                              </div>
                              <div className="p-1 bg-[#18181D] border border-white/10 rounded-lg">
                                <span className="text-emerald-400 font-bold text-xs block">0.38s</span>
                                <span className="text-[7px] text-hoza-muted">LCP</span>
                              </div>
                              <div className="p-1 bg-[#18181D] border border-white/10 rounded-lg">
                                <span className="text-emerald-400 font-bold text-xs block">100</span>
                                <span className="text-[7px] text-hoza-muted">SEO</span>
                              </div>
                              <div className="p-1 bg-[#18181D] border border-white/10 rounded-lg">
                                <span className="text-[#D4FF00] font-bold text-xs block">0ms</span>
                                <span className="text-[7px] text-hoza-muted">TBT</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {cap.type === "ai_agent" && (
                          <div className="space-y-1.5 font-mono">
                            <p className="text-[10px] text-white/90 truncate bg-black/60 p-1.5 border border-[#27272A] rounded-md">
                              {aiResponse}
                            </p>
                            <button
                              onClick={simulateAiQuery}
                              disabled={isAiProcessing}
                              className="w-full py-1 bg-[#D4FF00]/20 hover:bg-[#D4FF00] border border-[#D4FF00]/50 hover:border-[#D4FF00] text-[#D4FF00] hover:text-[#09090B] text-[9px] uppercase font-bold rounded-lg transition-all cursor-pointer shadow-[0_0_12px_rgba(212,255,0,0.15)]"
                            >
                              {isAiProcessing ? "DISPATCHING..." : "$ RUN AGENT QUERY"}
                            </button>
                          </div>
                        )}

                        {cap.type === "mobile" && (
                          <div className="space-y-1.5 font-mono text-[10px]">
                            <div className="flex justify-between border-b border-white/10 pb-1">
                              <span className="text-hoza-muted">FRAME BUDGET</span>
                              <span className="text-emerald-400 font-bold">8.3ms (120fps)</span>
                            </div>
                            <div className="flex justify-between pt-0.5">
                              <span className="text-hoza-muted">NATIVE TARGET</span>
                              <span className="text-[#D4FF00]">iOS & Android</span>
                            </div>
                          </div>
                        )}

                        {cap.type === "automation" && (
                          <div className="space-y-1 font-mono text-[9px]">
                            <div className="text-[#D4FF00] truncate">&gt; WA Cloud API: LINKED</div>
                            <div className="text-emerald-400 truncate">&gt; Event Latency: 0.14s</div>
                            <div className="text-[#D4FF00]/80 truncate">&gt; CRM Sync: 100% OK</div>
                          </div>
                        )}

                        {cap.type === "landing" && (
                          <div className="flex items-center justify-between font-mono">
                            <div>
                              <span className="text-[8px] text-hoza-muted block">A/B TESTED CVR</span>
                              <span className="text-emerald-400 font-black text-sm">+42% PROVEN</span>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold rounded-md">
                              MAX CONVERSION
                            </span>
                          </div>
                        )}

                        {cap.type === "software" && (
                          <div className="space-y-1 font-mono text-[9px]">
                            <div className="text-hoza-muted">MICROSERVICES MESH</div>
                            <div className="text-white font-bold text-[10px]">Go / Node.js Distributed</div>
                            <div className="text-emerald-400">Zero Single Point of Failure</div>
                          </div>
                        )}

                        {cap.type === "press" && (
                          <div className="space-y-1 font-mono text-[9px]">
                            <div className="text-hoza-muted">MEDIA WIRE SYNDICATION</div>
                            <div className="text-[#D4FF00] font-bold text-[10px]">Tier-1 Tech Journalism Hub</div>
                            <div className="text-white/70">PR Newswire • Bloomberg</div>
                          </div>
                        )}

                        {cap.type === "editorial" && (
                          <div className="space-y-1 font-mono text-[9px]">
                            <div className="text-hoza-muted">TYPOGRAPHY ARCHITECTURE</div>
                            <div className="text-[#D4FF00]/70 font-bold text-[10px]">Art-Directed Covers & Layouts</div>
                            <div className="text-white/70">Pristine Vector Resolution</div>
                          </div>
                        )}

                        {cap.type === "bespoke" && (
                          <div className="space-y-1 font-mono text-[9px]">
                            <div className="text-[#D4FF00]">FIRST SPRINT BUILD: 24-48H</div>
                            <div className="text-emerald-400 font-bold text-[10px]">Zero Agency Bloat • Direct Dev</div>
                            <div className="text-[#D4FF00]/80">Slack & WhatsApp Realtime Link</div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Micro Status */}
                      <div className="font-mono text-[8px] text-hoza-muted/60 border-t border-white/10 pt-1 flex justify-between">
                        <span>SEC_LEVEL // OPTIMAL</span>
                        <span>BUFFER 100%</span>
                      </div>
                    </div>

                    {/* TACTICAL MORSE CODE DIVIDER (Hoza Volt/Cyan Laser Gradients) */}
                    <div className="flex items-center justify-center gap-1.5 my-5 px-4" aria-hidden="true">
                      <span className="w-2 h-0.5 bg-[#D4FF00] block shadow-[0_0_5px_#D4FF00]" />
                      <span className="w-1 h-0.5 bg-[#D4FF00] block shadow-[0_0_5px_#D4FF00]" />
                      <span className="w-10 h-0.5 bg-gradient-to-r from-[#D4FF00] to-[#E6FF4D] block" />
                      <span className="w-1 h-0.5 bg-[#D4FF00] block shadow-[0_0_5px_#D4FF00]" />
                      <span className="w-6 h-0.5 bg-[#D4FF00] block shadow-[0_0_5px_#D4FF00]" />
                      <span className="w-14 h-0.5 bg-gradient-to-r from-[#D4FF00] to-[#D4FF00] block" />
                      <span className="w-2 h-0.5 bg-[#D4FF00] block shadow-[0_0_5px_#D4FF00]" />
                    </div>

                    {/* Massive Heavy Condensed Title in Hoza White */}
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-hoza-white text-center uppercase tracking-tight leading-none mb-3 px-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#D4FF00] group-hover:to-[#D4FF00] transition-all duration-300">
                      {cap.title}
                    </h3>

                    {/* Description in Hoza Muted Lavender */}
                    <p className="font-sans text-xs sm:text-[13px] text-hoza-muted text-center leading-relaxed px-3 mb-6 group-hover:text-white/85 transition-colors">
                      {cap.desc}
                    </p>
                  </div>

                  {/* BOTTOM DUAL-BOX TACTICAL BUTTON (Hoza Electric Cyber Button) */}
                  <div className="pt-3 border-t border-[#27272A] flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService?.(cap.serviceName);
                      }}
                      className="inline-flex items-stretch border border-[#D4FF00]/40 bg-[#16161C]/80 group/btn hover:bg-[#D4FF00] hover:border-[#D4FF00] hover:shadow-[0_0_20px_rgba(212,255,0,0.35)] rounded-xl overflow-hidden transition-all cursor-pointer"
                    >
                      {/* Left Box: Dot + Text */}
                      <span className="px-4 py-2 bg-transparent text-white group-hover/btn:text-[#09090B] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors">
                        <span className="w-1.5 h-1.5 bg-[#D4FF00] group-hover/btn:bg-[#09090B] shadow-[0_0_6px_#D4FF00] transition-colors" />
                        <span>VIEW CAPABILITY</span>
                      </span>

                      {/* Right Box: Arrow */}
                      <span className="px-2.5 py-2 border-l border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] group-hover/btn:text-[#09090B] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Progress Tracker & Page Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 sm:mt-12 pt-6 border-t border-[#27272A] font-mono text-xs text-hoza-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00] rounded-full animate-pulse shadow-[0_0_8px_#D4FF00]" />
            <span className="text-hoza-white">
              HIGHLIGHTS {cohorts[page].range} // TOTAL 09 DISCIPLINES
            </span>
          </div>

          {/* Segmented Progress Bars */}
          <div className="flex items-center gap-2">
            {cohorts.map((c, i) => (
              <button
                key={i}
                onClick={() => jumpToPage(i)}
                className="group py-2 cursor-pointer"
                aria-label={`Jump to batch ${i + 1}`}
              >
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === page
                      ? "w-12 bg-[#D4FF00] shadow-[0_0_12px_#D4FF00]"
                      : "w-6 bg-[#27272A] hover:bg-[#D4FF00]/40"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="text-right">
            <span className="text-hoza-muted hidden sm:inline">SWIPE OR CLICK TABS TO EXPLORE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
