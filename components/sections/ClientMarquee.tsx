"use client";

import React from "react";
import { PARTNERS_MARQUEE } from "@/lib/constants";
import { soundEffects } from "@/components/ui/SoundEffects";

export const ClientMarquee: React.FC = () => {
  return (
    <section className="relative w-full py-8 bg-[#09090B] border-y border-[#D4FF00]/20 overflow-hidden select-none">
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(212,255,0,0.04),transparent)] pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-28 mb-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-hoza-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00] animate-pulse" />
          <span className="tracking-wider uppercase text-[11px] font-bold text-hoza-white">
            // TRUSTED ECOSYSTEM PLATFORMS & CLIENT PARTNERS
          </span>
        </div>
        <div className="text-[10px] text-hoza-muted/70 font-mono">
          <span>LATENCY &lt; 20MS // PRODUCTION DEPLOYMENTS</span>
        </div>
      </div>

      {/* Infinite Seamless Ticker (Clean Rounded Badges) */}
      <div className="group relative w-full overflow-hidden flex items-center select-none">
        {/* Left & Right Edge Vignette Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#09090B] via-[#09090B]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#09090B] via-[#09090B]/90 to-transparent z-10 pointer-events-none" />

        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4 whitespace-nowrap animate-ticker-left">
          {[...PARTNERS_MARQUEE, ...PARTNERS_MARQUEE].map((partner, idx) => (
            <div
              key={`track1-${idx}`}
              onMouseEnter={() => soundEffects.playHover?.()}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#121216]/90 border border-white/10 hover:border-[#D4FF00]/60 hover:bg-[#16161C] hover:shadow-[0_0_15px_rgba(212,255,0,0.2)] rounded-full transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_6px_#D4FF00] hover:scale-125 transition-transform" />
              <span className="font-mono font-bold text-xs sm:text-sm text-hoza-white hover:text-[#D4FF00] tracking-tight uppercase">
                {partner.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-hoza-muted hover:text-white transition-colors uppercase">
                {partner.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Exact Duplicate Clone for 100% Seamless Infinite Loop) */}
        <div
          className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4 whitespace-nowrap animate-ticker-left"
          aria-hidden="true"
        >
          {[...PARTNERS_MARQUEE, ...PARTNERS_MARQUEE].map((partner, idx) => (
            <div
              key={`track2-${idx}`}
              onMouseEnter={() => soundEffects.playHover?.()}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#121216]/90 border border-white/10 hover:border-[#D4FF00]/60 hover:bg-[#16161C] hover:shadow-[0_0_15px_rgba(212,255,0,0.2)] rounded-full transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_6px_#D4FF00] hover:scale-125 transition-transform" />
              <span className="font-mono font-bold text-xs sm:text-sm text-hoza-white hover:text-[#D4FF00] tracking-tight uppercase">
                {partner.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-hoza-muted hover:text-white transition-colors uppercase">
                {partner.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
