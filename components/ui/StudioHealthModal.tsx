"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Server,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { soundEffects } from "@/components/ui/SoundEffects";

interface StudioHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal?: () => void;
}

export const StudioHealthModal: React.FC<StudioHealthModalProps> = ({
  isOpen,
  onClose,
  onOpenProjectModal,
}) => {
  const regions = [
    {
      name: "Jakarta Primary Edge",
      region: "ap-southeast-3",
      uptime: "100.0%",
      latency: "12ms",
      status: "OPTIMAL",
    },
    {
      name: "Singapore Core Hub",
      region: "ap-southeast-1",
      uptime: "100.0%",
      latency: "16ms",
      status: "OPTIMAL",
    },
    {
      name: "Tokyo North Asia Gateway",
      region: "ap-northeast-1",
      uptime: "99.99%",
      latency: "62ms",
      status: "OPTIMAL",
    },
    {
      name: "US-East Global CDN Mesh",
      region: "us-east-1",
      uptime: "99.98%",
      latency: "178ms",
      status: "OPTIMAL",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 min-[400px]:p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#0E0E12] border border-[#D4FF00]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,255,0,0.15)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 min-[400px]:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#121216]">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_8px_#D4FF00]" />
                <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                  HOZA SYSTEM HEALTH & SPRINT TELEMETRY
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 min-[400px]:p-6 overflow-y-auto space-y-5 sm:space-y-6">
              {/* Highlight Card: Sprint Availability Scarcity */}
              <div className="p-5 rounded-xl bg-[#14141A] border border-[#D4FF00]/40 relative overflow-hidden shadow-[0_0_20px_rgba(212,255,0,0.1)]">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#D4FF00] text-black font-mono text-[10px] font-bold tracking-wider uppercase rounded-bl-lg">
                  SCARCITY STATUS
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF00] mb-2 uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>OCTOBER 2026 SPRINT COHORT</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                  2 of 3 Engineering Sprints Allocated
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
                  To protect engineering velocity, sub-second SLAs, and zero-defect output, Hoza strictly caps concurrent client onboarding to 3 production sprints per calendar month.
                </p>

                {/* Visual Capacity Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-neutral-300">Studio Bandwidth Utilization</span>
                    <span className="text-[#D4FF00] font-bold">66.7% Allocated (1 Slot Left)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                    <div className="h-full bg-neutral-500 w-[33.3%]" title="Sprint 1: Active" />
                    <div className="h-full bg-neutral-400 w-[33.4%] border-l border-black/40" title="Sprint 2: Active" />
                    <div className="h-full bg-[#D4FF00] w-[33.3%] border-l border-black/40 animate-pulse" title="Sprint 3: Open" />
                  </div>
                </div>

                {/* Direct Action */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProjectModal?.();
                    }}
                    className="px-4 py-2 bg-[#D4FF00] hover:bg-[#E6FF4D] text-black font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(212,255,0,0.3)] cursor-pointer"
                  >
                    <span>Reserve Final October Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-neutral-400 font-mono text-[11px]">
                    Next intake window: November 2026
                  </span>
                </div>
              </div>

              {/* Edge Cluster Telemetry Grid */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
                  <Server className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Global Edge Cluster Status</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {regions.map((reg) => (
                    <div
                      key={reg.region}
                      className="p-3.5 rounded-xl bg-[#121216] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{reg.name}</span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                          {reg.region} &bull; Uptime: {reg.uptime}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-bold text-[#D4FF00]">
                          {reg.latency}
                        </div>
                        <div className="text-[9px] font-mono text-emerald-400 uppercase">
                          {reg.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Engine SLAs */}
              <div className="p-4 rounded-xl bg-[#121216] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold font-mono text-[#D4FF00]">100%</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">
                    Code & IP Transfer
                  </div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l sm:border-r border-white/10 pt-3 sm:pt-0">
                  <div className="text-2xl font-bold font-mono text-white">&lt; 24h</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">
                    Engineering Response SLA
                  </div>
                </div>
                <div className="border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                  <div className="text-2xl font-bold font-mono text-emerald-400">99.98%</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">
                    Contractual Uptime SLA
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#09090B] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>MONITORED REAL-TIME BY HOZA SYNTHETICS</span>
              </span>
              <span className="text-neutral-500">REFRESHED EVERY 60S</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
