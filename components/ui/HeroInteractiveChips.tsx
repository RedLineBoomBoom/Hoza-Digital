"use client";

import React from "react";
import { motion } from "framer-motion";
import { soundEffects } from "./SoundEffects";
import {
  Sparkles,
  Zap,
  Bot,
  Gauge,
  MessageSquare,
  ShieldCheck,
  Layers,
  Cpu,
} from "lucide-react";

interface ChipData {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  accent: string;
  initialPos: { x: number; y: number; rotate: number };
}

const CHIPS: ChipData[] = [
  {
    id: "chip-1",
    label: "Next.js 14 & Edge Core",
    sub: "Sub-Second LCP",
    icon: <Zap className="w-3.5 h-3.5 text-[#8B5CFF]" />,
    accent: "border-[#8B5CFF]/60 hover:border-[#8B5CFF]",
    initialPos: { x: -8, y: 0, rotate: -2 },
  },
  {
    id: "chip-2",
    label: "Autonomous AI Agents",
    sub: "24/7 Operations",
    icon: <Bot className="w-3.5 h-3.5 text-[#00F0FF]" />,
    accent: "border-[#00F0FF]/50 hover:border-[#00F0FF]",
    initialPos: { x: 5, y: -4, rotate: 1.5 },
  },
  {
    id: "chip-3",
    label: "WhatsApp Cloud Sync",
    sub: "0ms Lead Routing",
    icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />,
    accent: "border-emerald-500/40 hover:border-emerald-400",
    initialPos: { x: -12, y: 6, rotate: -1 },
  },
  {
    id: "chip-4",
    label: "120fps Gesture Motion",
    sub: "iOS & Android",
    icon: <Layers className="w-3.5 h-3.5 text-[#C8B7FF]" />,
    accent: "border-[#C8B7FF]/40 hover:border-[#C8B7FF]",
    initialPos: { x: 10, y: 4, rotate: 2 },
  },
  {
    id: "chip-5",
    label: "Zero Agency Fluff",
    sub: "Direct Senior Devs",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />,
    accent: "border-amber-500/40 hover:border-amber-400",
    initialPos: { x: -4, y: -8, rotate: -2.5 },
  },
  {
    id: "chip-6",
    label: "Supabase & Postgres Mesh",
    sub: "Realtime Data",
    icon: <Cpu className="w-3.5 h-3.5 text-fuchsia-400" />,
    accent: "border-fuchsia-500/40 hover:border-fuchsia-400",
    initialPos: { x: 8, y: -2, rotate: 1 },
  },
];

export const HeroInteractiveChips: React.FC = () => {
  return (
    <div className="relative w-full py-4 mt-6">
      <div className="text-center font-mono text-[10px] text-hoza-muted uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-hoza-electric animate-pulse" />
        <span>INTERACTIVE SYSTEM CAPABILITIES • DRAG TO EXPLORE</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto px-4">
        {CHIPS.map((chip) => (
          <motion.div
            key={chip.id}
            drag
            dragConstraints={{ left: -60, right: 60, top: -30, bottom: 30 }}
            dragElastic={0.25}
            initial={{ opacity: 0, y: 15, rotate: chip.initialPos.rotate }}
            animate={{ opacity: 1, y: 0, rotate: chip.initialPos.rotate }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.06, zIndex: 30 }}
            whileDrag={{ scale: 1.12, zIndex: 40, cursor: "grabbing" }}
            onHoverStart={() => soundEffects.playHover?.()}
            onDragStart={() => soundEffects.playClick?.()}
            className={`cursor-grab select-none px-3.5 py-2 rounded-full bg-[#0D0718]/90 border backdrop-blur-md shadow-lg transition-colors flex items-center gap-2.5 ${chip.accent}`}
          >
            <span className="p-1 rounded-full bg-white/5">{chip.icon}</span>
            <div className="flex flex-col text-left">
              <span className="font-mono text-xs font-semibold text-hoza-white leading-tight">
                {chip.label}
              </span>
              <span className="font-mono text-[9px] text-hoza-muted leading-tight">
                {chip.sub}
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-hoza-electric/60 ml-0.5 animate-ping" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
