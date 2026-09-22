"use client";

import React from "react";

export const TacticalFrame: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none hidden lg:block overflow-hidden"
      aria-hidden="true"
    >
      {/* ── LEFT TACTICAL RULER & RETICLE ───────────────────────────────────── */}
      <div className="absolute left-3 xl:left-5 top-28 bottom-20 flex flex-col justify-between items-center opacity-60">
        {/* Top Crosshair Target */}
        <div className="flex flex-col items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="6.5" stroke="#00F0FF" strokeWidth="0.75" strokeDasharray="2 2" />
            <circle cx="9" cy="9" r="2" fill="#00F0FF" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="#00F0FF" strokeWidth="0.5" />
            <line x1="9" y1="1" x2="9" y2="17" stroke="#00F0FF" strokeWidth="0.5" />
          </svg>
          <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase">
            TARGET // HOZA_HUB_JKT
          </span>
        </div>

        {/* Center Vertical Metric Ruler Marks */}
        <div className="flex flex-col items-center space-y-3 py-4">
          <div className="w-2.5 h-[2px] bg-[#00F0FF]" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2 h-[1px] bg-[#8B5CFF]/60" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2.5 h-[2px] bg-[#F30000]" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2 h-[1px] bg-[#8B5CFF]/60" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2.5 h-[2px] bg-[#00F0FF]" />
        </div>

        {/* Bottom Coordinates */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[8px] text-white/30 tracking-wider [writing-mode:vertical-lr] rotate-180">
            06°12&apos;S 106°49&apos;E
          </span>
          <div className="w-2 h-2 border border-[#00F0FF]/40 flex items-center justify-center">
            <span className="w-1 h-1 bg-[#00F0FF] animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── RIGHT TACTICAL RULER & RETICLE ──────────────────────────────────── */}
      <div className="absolute right-3 xl:right-5 top-28 bottom-20 flex flex-col justify-between items-center opacity-60">
        {/* Top Status */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-2 h-2 border border-[#F30000]/60 flex items-center justify-center">
            <span className="w-1 h-1 bg-[#F30000]" />
          </div>
          <span className="font-mono text-[8px] text-[#F30000] tracking-widest [writing-mode:vertical-lr] uppercase">
            SEC_LEVEL // OPTIMAL
          </span>
        </div>

        {/* Center Vertical Metric Ruler Marks */}
        <div className="flex flex-col items-center space-y-3 py-4">
          <div className="w-2.5 h-[2px] bg-[#F30000]" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2 h-[1px] bg-[#8B5CFF]/60" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2.5 h-[2px] bg-[#00F0FF]" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2 h-[1px] bg-[#8B5CFF]/60" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-1.5 h-[1px] bg-white/20" />
          <div className="w-2.5 h-[2px] bg-[#00F0FF]" />
        </div>

        {/* Bottom Reticle */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[8px] text-white/30 tracking-wider [writing-mode:vertical-lr]">
            EDGE_MESH_v3.4
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="14" height="14" stroke="#8B5CFF" strokeWidth="0.75" />
            <circle cx="9" cy="9" r="1.5" fill="#00F0FF" />
          </svg>
        </div>
      </div>
    </div>
  );
};
