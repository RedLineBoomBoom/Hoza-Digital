"use client";

import React, { useState, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ExternalLink,
  Cpu,
  Database,
  Network,
  Activity,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  Radio,
  Server,
  Bot,
  BrainCircuit,
  Lock,
} from "lucide-react";
import { PROJECTS, Project } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SmoothHeading } from "@/components/ui/SmoothHeading";
import { soundEffects } from "@/components/ui/SoundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ArchitectureMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
}

interface ProjectArchitecture {
  topologyTitle: string;
  protocolBadge: string;
  nodes: ArchitectureNode[];
  metrics: ArchitectureMetric[];
  telemetryLog: string;
  telemetryStatus: string;
}

const PROJECT_ARCHITECTURES: Record<string, ProjectArchitecture> = {
  "project-01": {
    topologyTitle: "MULTI-REGION SSR EDGE TOPOLOGY",
    protocolBadge: "TLS 1.3 // ZERO-COLD-START",
    nodes: [
      { label: "EDGE CLIENT", sublabel: "Global Anycast", icon: Cpu },
      { label: "NEXT.JS 15", sublabel: "Edge Compute", icon: Layers },
      { label: "UPSTASH REDIS", sublabel: "Sub-5ms Cache", icon: Zap },
      { label: "POSTGRES RLS", sublabel: "Encrypted Vault", icon: Database },
    ],
    metrics: [
      { label: "LIGHTHOUSE", before: "42", after: "99", delta: "+57 pts Lift" },
      { label: "RENDER LCP", before: "3.9s", after: "0.42s", delta: "-89% Speed" },
      { label: "EDGE TTFB", before: "840ms", after: "28ms", delta: "-97% Latency" },
    ],
    telemetryLog: "[TELEMETRY] 200 OK • GET /api/v2/deal-flow/institutional • latency=14ms • SLA=100%",
    telemetryStatus: "OPTIMAL",
  },
  "project-02": {
    topologyTitle: "EVENT-DRIVEN TELEMATICS STREAM",
    protocolBadge: "MQTT + WSS // SUB-100MS STREAM",
    nodes: [
      { label: "FLEET IOT", sublabel: "OBD-II Sensors", icon: Radio },
      { label: "APACHE KAFKA", sublabel: "12k evt/s Ingest", icon: Network },
      { label: "GO WORKERS", sublabel: "Geospatial Mesh", icon: Server },
      { label: "TIMESCALEDB", sublabel: "PostGIS Cluster", icon: Database },
    ],
    metrics: [
      { label: "DISPATCH TIME", before: "45m", after: "1.2m", delta: "37x Faster" },
      { label: "FLEET SCALE", before: "250", after: "4,800+", delta: "+1,820% Cap" },
      { label: "PACKET LOSS", before: "14.2%", after: "0.02%", delta: "99.98% Reliable" },
    ],
    telemetryLog: "[TELEMETRY] 101 UPGRADE • WSS /fleet/telematics/live • 4,820 units active • loss=0.00%",
    telemetryStatus: "STREAMING",
  },
  "project-03": {
    topologyTitle: "DISTRIBUTED PAYMENT MICRO-LEDGER",
    protocolBadge: "PCI-DSS L1 // ISO-8583 COMPLIANT",
    nodes: [
      { label: "OFFLINE APP", sublabel: "SQLite Cache", icon: ShieldCheck },
      { label: "ENVOY GATEWAY", sublabel: "mTLS Auth Mesh", icon: Lock },
      { label: "RUST SERVICE", sublabel: "QRIS Engine", icon: Zap },
      { label: "COCKROACHDB", sublabel: "Distributed ACID", icon: Database },
    ],
    metrics: [
      { label: "QRIS SETTLE", before: "4.8s", after: "0.65s", delta: "-86% Latency" },
      { label: "OFFLINE PASS", before: "0%", after: "100%", delta: "Zero Dropout" },
      { label: "PEAK TPS", before: "180", after: "6,500+", delta: "+3,500% Scale" },
    ],
    telemetryLog: "[TELEMETRY] 201 CREATED • POST /v1/qris/settle • id=tx_9f82d • latency=58ms",
    telemetryStatus: "ACID OK",
  },
  "project-04": {
    topologyTitle: "MULTI-AGENT COGNITIVE SWARM",
    protocolBadge: "SOC2 TYPE II // GUARDRAILED PII",
    nodes: [
      { label: "OMNICHANNEL", sublabel: "WhatsApp / Hook", icon: Network },
      { label: "AGENT MESH", sublabel: "LangGraph Core", icon: Layers },
      { label: "PINECONE DB", sublabel: "Vector Memory", icon: BrainCircuit },
      { label: "HYBRID LLM", sublabel: "Reasoning Fallback", icon: Bot },
    ],
    metrics: [
      { label: "FIRST RESPONSE", before: "48m", after: "1.4s", delta: "2,057x Faster" },
      { label: "AUTO-RESOLVE", before: "28%", after: "84.6%", delta: "+56.6 pts Auto" },
      { label: "TOKEN SPEND", before: "2.4k", after: "480", delta: "-80% Compute Cost" },
    ],
    telemetryLog: "[TELEMETRY] 200 OK • POST /agents/swarm/execute • tokens=482 • latency=1.24s",
    telemetryStatus: "OPTIMAL",
  },
};

export const SelectedWork: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"live" | "architecture">("live");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null
  );
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const currentProject = PROJECTS[currentIndex];
  const currentArch =
    PROJECT_ARCHITECTURES[currentProject.id] ||
    PROJECT_ARCHITECTURES["project-01"];
  const activeModalArch = activeModalProject
    ? PROJECT_ARCHITECTURES[activeModalProject.id] ||
      PROJECT_ARCHITECTURES["project-01"]
    : null;

  const handleNext = () => {
    soundEffects.playClick?.();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEffects.playClick?.();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleSelectProject = (idx: number) => {
    if (idx === currentIndex) return;
    soundEffects.playClick?.();
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveredRight(true);
    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHoveredRight(false);
    setIsMouseDown(false);
  };

  // Stacked typography title lines like Bulkhead "HEART OF / THE MIDLANDS"
  const getTitleLines = (project: Project) => {
    switch (project.id) {
      case "project-01":
        return ["KINETIX", "GLOBAL"];
      case "project-02":
        return ["APEX", "LOGISTICS OS"];
      case "project-03":
        return ["PULSE", "MOBILITY"];
      case "project-04":
        return ["AURA", "COMMERCE"];
      default:
        return [project.title.split(" ")[0], project.title.split(" ").slice(1).join(" ")];
    }
  };

  const [titleLine1, titleLine2] = getTitleLines(currentProject);

  return (
    <section
      id="work"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D4FF00]/8 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4FF00]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="border-b border-[#D4FF00]/20 pb-6 mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
            <span>// 02 SELECTED PRODUCTION WORK</span>
          </div>
          <SmoothHeading
            title="BUILT TO WORK."
            highlight="DESIGNED TO IMPRESS."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Real products built for real businesses. Every project is engineered
            to generate measurable commercial return and elevate market authority.
          </p>
        </div>
      </div>

      <div className="relative w-full rounded-3xl border border-white/15 bg-[#09090B] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[540px] lg:min-h-[580px]">
        <div className="relative bg-[#0E0E12] flex flex-col justify-between p-4 min-[380px]:p-5 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Top Live Production Header with Interactive View Mode Switcher */}
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00] shrink-0" />
              <span className="font-mono text-xs font-bold text-hoza-white tracking-wide uppercase truncate">
                {currentProject.client}
              </span>
              <span className="text-[10px] font-mono text-hoza-muted hidden xl:inline truncate shrink-0">
                // {viewMode === "live" ? "SIMULATION" : "ARCHITECTURE"}
              </span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick?.();
                  setViewMode("live");
                }}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap",
                  viewMode === "live"
                    ? "bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                LIVE PREVIEW
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick?.();
                  setViewMode("architecture");
                }}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap",
                  viewMode === "architecture"
                    ? "bg-[#D4FF00] text-black font-bold shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                <span>ARCHITECTURE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Center: Dynamic Project Live Simulation Mockup or Architecture Inspector */}
          <div className="relative z-10 py-5 sm:py-6 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {viewMode === "architecture" ? (
                <motion.div
                  key={`arch-${currentProject.id}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full space-y-3 py-1 font-mono"
                >
                  {/* Visual Pipeline Data Flow Diagram */}
                  <div className="bg-[#121216] border border-[#D4FF00]/40 p-4 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="flex items-center justify-between text-[10px] text-hoza-muted mb-3 border-b border-white/10 pb-2">
                      <span className="flex items-center gap-1.5 text-[#D4FF00] font-bold">
                        <Network className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[200px] sm:max-w-none">{currentArch.topologyTitle}</span>
                      </span>
                      <span className="text-emerald-400 text-[10px] font-bold shrink-0">{currentArch.protocolBadge}</span>
                    </div>

                    {/* Node Flow (2 cols on mobile, 4 on sm+) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                      {currentArch.nodes.map((node, nIdx) => {
                        const NodeIcon = node.icon;
                        return (
                          <div
                            key={nIdx}
                            className="p-2 rounded-lg bg-black/50 border border-white/10 flex flex-col items-center justify-center hover:border-[#D4FF00]/40 transition-colors"
                          >
                            <NodeIcon className="w-3.5 h-3.5 text-[#D4FF00] mb-1 shrink-0" />
                            <span className="text-white font-bold truncate max-w-full text-[10px]">{node.label}</span>
                            <span className="text-[8px] text-neutral-400 truncate max-w-full">{node.sublabel}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Audit-Verified Performance Delta */}
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-2 text-center">
                    {currentArch.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-[#121216] border border-white/10 p-2.5 sm:p-3 rounded-xl">
                        <div className="text-[10px] text-neutral-400 mb-1 truncate">{metric.label}</div>
                        <div className="text-xs sm:text-base font-bold text-white flex items-center justify-center gap-1">
                          <span className="text-neutral-500 line-through text-[11px] sm:text-xs">{metric.before}</span>
                          <span className="text-[#D4FF00]">&rarr; {metric.after}</span>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-mono">{metric.delta}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live Telemetry Log Line */}
                  <div className="p-3 bg-[#070709] border border-white/10 rounded-xl text-[10px] text-neutral-400 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <Terminal className="w-3.5 h-3.5 text-[#D4FF00] shrink-0" />
                      <span className="text-neutral-300 truncate font-mono text-[10px]">
                        {currentArch.telemetryLog}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-mono shrink-0 pl-2 font-bold">{currentArch.telemetryStatus}</span>
                  </div>
                </motion.div>
              ) : (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: direction * 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 35 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* PROJECT 01: KINETIX GLOBAL */}
                {currentProject.id === "project-01" && (
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center bg-[#121216]/90 border border-[#D4FF00]/30 p-4 rounded-xl shadow-lg">
                      <div>
                        <div className="font-mono text-[10px] text-hoza-muted">
                          INSTITUTIONAL PIPELINE
                        </div>
                        <div className="font-display font-black text-2xl sm:text-3xl text-hoza-white mt-0.5">
                          $84,200,000 ARR
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 rounded-lg font-mono text-xs font-bold">
                        +340% SURGE
                      </span>
                    </div>

                    <div className="h-28 bg-[#121216]/60 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between backdrop-blur-md">
                      <div className="flex justify-between font-mono text-[11px] text-hoza-muted">
                        <span>GLOBAL REACH (SG / ID / US)</span>
                        <span className="text-[#D4FF00] font-bold">0.42s LCP</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div className="bg-gradient-to-r from-[#D4FF00] via-[#E6FF4D] to-[#D4FF00] h-full rounded-full w-[88%]" />
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-hoza-muted">
                        <span>SSR CACHE HIT: 99.8%</span>
                        <span className="text-emerald-400 font-semibold">TTFB: 28ms</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 02: APEX LOGISTICS OS */}
                {currentProject.id === "project-02" && (
                  <div className="space-y-3.5 font-mono text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#121216]/90 p-3.5 rounded-xl border border-white/10">
                        <span className="text-[10px] text-hoza-muted block">
                          MANUAL HOURS SAVED
                        </span>
                        <div className="font-display font-black text-xl sm:text-2xl text-hoza-white mt-1">
                          920 hrs/mo
                        </div>
                      </div>
                      <div className="bg-[#121216]/90 p-3.5 rounded-xl border border-white/10">
                        <span className="text-[10px] text-hoza-muted block">
                          DISPATCH VELOCITY
                        </span>
                        <div className="font-display font-black text-xl sm:text-2xl text-[#D4FF00] mt-1">
                          6.8x FASTER
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#121216]/60 border border-white/10 rounded-xl text-[11px] space-y-1.5">
                      <div className="flex justify-between text-[#D4FF00]/70 font-semibold">
                        <span>Ã¢—Â FLEET CONSIGNMENT #4829</span>
                        <span className="text-emerald-400">EN ROUTE</span>
                      </div>
                      <div className="flex justify-between text-hoza-muted text-[10px]">
                        <span>DRIVER: EKO P. (SURABAYA)</span>
                        <span className="text-white">ETA: 14:20 WIB</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 03: PULSE PAY & MOBILITY */}
                {currentProject.id === "project-03" && (
                  <div className="flex items-center justify-center py-2">
                    <div className="w-full max-w-sm bg-[#121216]/90 p-4 rounded-2xl border border-white/10 shadow-2xl space-y-3.5">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-mono text-xs text-hoza-white font-bold">
                          PULSE PASS // TRANSIT &amp; QRIS
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">
                          450K DAU
                        </span>
                      </div>
                      <div className="bg-[#09090B] p-3 rounded-xl border border-white/10 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-[9px] text-hoza-muted">
                            INSTANT BALANCE
                          </div>
                          <div className="font-display font-black text-lg sm:text-xl text-hoza-white">
                            Rp 4.250.000
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-[#D4FF00] rounded-md text-[10px] font-mono font-bold text-[#09090B] shadow-[0_0_10px_rgba(212,255,0,0.4)]">
                          SCAN
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-hoza-muted flex justify-between">
                        <span>AVG PAYMENT TIME</span>
                        <span className="text-[#D4FF00] font-bold">0.8 SECONDS</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 04: AURA AUTONOMOUS AI MESH */}
                {currentProject.id === "project-04" && (
                  <div className="space-y-3.5 font-mono text-xs">
                    <div className="flex justify-between items-center bg-[#121216]/90 p-3.5 rounded-xl border border-white/10">
                      <div>
                        <div className="text-[10px] text-hoza-muted">
                          AUTONOMOUS AI INFERENCE MESH
                        </div>
                        <div className="font-display font-black text-lg sm:text-xl text-hoza-white flex items-center gap-2 mt-0.5">
                          <span>84.6% AUTO-RESOLVED</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 rounded-md text-[10px] font-bold">
                        1.4s MEDIAN
                      </span>
                    </div>

                    <div className="p-3 bg-[#09090B] rounded-xl border border-white/10 text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between text-[#D4FF00] text-[10px] border-b border-white/10 pb-1.5">
                        <span>Ã¢—Â INBOUND PIPELINE: WHATSAPP + REST</span>
                        <span className="text-emerald-400">ZERO HUMAN WAIT</span>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between text-hoza-muted">
                          <span className="text-[#D4FF00]">&gt; INGEST:</span>
                          <span className="text-white">Order #8921-AURA (RMA Approved)</span>
                        </div>
                        <div className="flex justify-between text-hoza-muted">
                          <span className="text-[#D4FF00]">&gt; DISPATCH:</span>
                          <span className="text-emerald-400">Warehouse Webhook Fired (0.4s)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Bottom Controls Bar with Bulkhead-style [[ 01 // 04 ]] Indicator */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            {/* Bulkhead Counter: [[ 03 // 03 ]] style */}
            <div className="text-hoza-muted font-bold tracking-wider">
              [[ 0{currentIndex + 1} // 0{PROJECTS.length} ]]
            </div>

            <div className="flex items-center gap-3">
              {/* Expand Full Case Study Spec Modal */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEffects.playClick?.();
                  setActiveModalProject(currentProject);
                }}
                className="group/btn inline-flex items-center gap-1.5 text-[11px] font-mono text-[#D4FF00] hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                <span>EXPAND SPEC</span>
                <Maximize2 className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
              </button>

              {/* Prev / Next Arrows for accessibility */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#D4FF00] text-hoza-muted hover:text-[#09090B] border border-white/10 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#D4FF00] text-hoza-muted hover:text-[#09090B] border border-white/10 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={rightContainerRef}
          data-custom-cursor="hide"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          onClick={handleNext}
          className="relative bg-[#0E0E12] text-white p-5 min-[380px]:p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden cursor-none group select-none transition-colors border-t lg:border-t-0 border-[#D4FF00]/20"
        >
          {/* Subtle Cyber Grid & Ambient Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4FF000A_1px,transparent_1px),linear-gradient(to_bottom,#D4FF000A_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4FF00]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D4FF00]/8 rounded-full blur-[100px] pointer-events-none" />

          {/* Tactical Top Right Cyan Corner Bracket */}
          <div
            className="absolute top-6 right-6 flex items-start pointer-events-none"
            aria-hidden="true"
          >
            <span className="w-4 h-0.5 bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
            <span className="w-0.5 h-4 bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
          </div>

          {/* Tactical Bottom Left Purple & Cyan Corner Mark */}
          <div
            className="absolute bottom-6 left-6 flex items-end gap-1 pointer-events-none z-10"
            aria-hidden="true"
          >
            <span className="w-0.5 h-4 bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
            <span className="w-4 h-0.5 bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
            <span className="w-2.5 h-0.5 bg-[#D4FF00] ml-1 shadow-[0_0_6px_#D4FF00]" />
          </div>

          {/* Top Label & Description */}
          <div className="relative z-10">
            <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#D4FF00] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_6px_#D4FF00] animate-pulse" />
              <span>
                {currentProject.category.toUpperCase()} ___ HOZA DIGITAL
              </span>
            </div>

            {/* Description paragraph */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={currentProject.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-5 sm:mt-6 font-sans text-sm sm:text-base md:text-lg text-hoza-muted leading-relaxed max-w-lg font-normal"
              >
                {currentProject.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CENTER: RESTING ARROW BUTTON */}
          <div className="my-6 sm:my-8 flex items-center justify-center relative pointer-events-none">
            <div
              className={cn(
                "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#E6FF4D] border-2 border-[#09090B] text-white flex items-center justify-center shadow-[0_0_30px_rgba(212,255,0,0.45)] transition-all duration-300",
                isHoveredRight ? "opacity-0 scale-75" : "opacity-100 scale-100 animate-pulse"
              )}
              aria-hidden="true"
            >
              <ArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-[#09090B] stroke-[2.5]" />
            </div>
          </div>

          {/* Bottom Headline: Massive Brutalist Stacked Typography (Hoza Palette) */}
          <div className="relative z-10 pt-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={currentProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="font-black text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] uppercase tracking-tighter text-white leading-[0.9] sm:leading-[0.88] select-none"
              >
                <span className="text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  {titleLine1}
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E6FF4D] to-[#D4FF00]">
                  {titleLine2}
                </span>
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Replaces the standard/custom cursor when mouse is inside the card area */}
      <div
        ref={followerRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-50 will-change-transform transition-opacity duration-150 ease-out hidden sm:block",
          isHoveredRight ? "opacity-100" : "opacity-0"
        )}
        style={{
          transform: "translate3d(-500px, -500px, 0) translate(-50%, -50%)",
        }}
        aria-hidden="true"
      >
        <div
          className={cn(
            "w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#E6FF4D] border-2 border-[#09090B] text-white flex items-center justify-center shadow-[0_0_35px_rgba(212,255,0,0.7)] transition-transform duration-100 ease-out",
            isMouseDown ? "scale-90" : "scale-100"
          )}
        >
          <ArrowRight className="w-8 h-8 sm:w-9 sm:h-9 text-[#09090B] stroke-[2.5]" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {PROJECTS.map((proj, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(idx)}
              className={cn(
                "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2",
                isActive
                  ? "bg-[#D4FF00] text-[#09090B] shadow-[0_0_15px_rgba(212,255,0,0.4)] border border-[#D4FF00]"
                  : "bg-[#121216]/80 text-hoza-muted hover:text-white border border-white/10 hover:border-white/20"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  isActive ? "bg-[#09090B]" : "bg-white/30"
                )}
              />
              <span className="hidden sm:inline">0{idx + 1} // {proj.title}</span>
              <span className="sm:hidden">0{idx + 1} // {proj.title.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {activeModalProject && (
        <div
          onClick={() => setActiveModalProject(null)}
          className="fixed inset-0 z-50 bg-[#09090B]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0C0C0C] rounded-2xl border border-white/20 max-w-3xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl cursor-default"
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-lg border border-white/20 text-hoza-muted hover:text-white hover:border-[#D4FF00] bg-[#141418] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-mono text-xs text-[#D4FF00] uppercase mb-2 font-bold">
              {activeModalProject.tag} // {activeModalProject.category}
            </div>

            <h3 className="font-display font-black text-3xl sm:text-4xl text-hoza-white uppercase">
              {activeModalProject.title}
            </h3>

            <p className="mt-2 text-sm text-hoza-muted">
              Client: {activeModalProject.client} • {activeModalProject.region} •{" "}
              {activeModalProject.year}
            </p>

            <div className="mt-6 border-t border-white/10 pt-6 space-y-6">
              <div>
                <h4 className="font-mono text-xs text-hoza-muted uppercase tracking-wider mb-2">
                  // THE CHALLENGE
                </h4>
                <p className="text-sm text-hoza-white/90 leading-relaxed">
                  {activeModalProject.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-hoza-muted uppercase tracking-wider mb-2">
                  // THE HOZA SOLUTION
                </h4>
                <p className="text-sm text-hoza-white/90 leading-relaxed">
                  {activeModalProject.solution}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-hoza-muted uppercase tracking-wider mb-2">
                  // PRODUCTION DELIVERABLES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.services.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-md border border-white/10 font-mono text-xs text-hoza-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-hoza-muted uppercase tracking-wider mb-2">
                  // MEASURABLE IMPACT
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {activeModalProject.impactStats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="font-display font-black text-xl text-[#D4FF00]">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[9px] text-hoza-muted uppercase mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalArch && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono text-xs text-hoza-muted uppercase tracking-wider">
                      // SYSTEM ARCHITECTURE &amp; TOPOLOGY
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      {activeModalArch.protocolBadge}
                    </span>
                  </div>
                  <div className="bg-[#121216] border border-white/10 p-4 rounded-xl font-mono space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span>{activeModalArch.topologyTitle}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                      {activeModalArch.nodes.map((n, i) => {
                        const Icon = n.icon;
                        return (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex flex-col items-center justify-center"
                          >
                            <Icon className="w-3.5 h-3.5 text-[#D4FF00] mb-1" />
                            <span className="text-white font-bold truncate max-w-full">{n.label}</span>
                            <span className="text-[8px] text-neutral-400 truncate max-w-full">{n.sublabel}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400">
                      <div className="flex items-center gap-1.5 truncate">
                        <Terminal className="w-3 h-3 text-[#D4FF00] shrink-0" />
                        <span className="truncate">{activeModalArch.telemetryLog}</span>
                      </div>
                      <span className="text-emerald-400 font-bold shrink-0 pl-2">{activeModalArch.telemetryStatus}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-xs text-hoza-muted">
                CONFIDENTIAL CLIENT BRIEFING
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveModalProject(null)}
              >
                Close Spec
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

