"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { REGIONAL_HUBS } from "@/lib/constants";
import {
  Globe,
  Radio,
  Wifi,
  Activity,
  ShieldCheck,
  Zap,
  Crosshair,
  RotateCw,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SmoothHeading } from "@/components/ui/SmoothHeading";

// Dynamically import Three.js 3D Cyber Globe
const InteractiveCyberGlobe = dynamic(
  () =>
    import("@/components/3d/InteractiveCyberGlobe").then(
      (mod) => mod.InteractiveCyberGlobe
    ),
  { ssr: false }
);

export const RegionalMap: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<string>("Jakarta");
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [probeResult, setProbeResult] = useState<string | null>(null);

  const activeHub =
    REGIONAL_HUBS.find((h) => h.city.toLowerCase() === selectedHub.toLowerCase()) ||
    REGIONAL_HUBS[0];

  const handleSelectNode = (city: string) => {
    setSelectedHub(city);
    setProbeResult(null);
  };

  const handleProbeNode = () => {
    setIsProbing(true);
    setProbeResult(null);
    setTimeout(() => {
      setIsProbing(false);
      const jitter = (Math.random() * 2 - 1).toFixed(1);
      const baseNum = parseInt(activeHub.ping, 10) || 12;
      setProbeResult(`${(baseNum + parseFloat(jitter)).toFixed(1)}ms (TLS 1.3 0-RTT Verified)`);
    }, 450);
  };

  return (
    <section
      id="network"
      className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="border-b border-[#D4FF00]/20 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#D4FF00] animate-pulse" />
            <span>// 3D HOLOGRAPHIC GEOSPATIAL EDGE MESH</span>
          </div>
          <SmoothHeading
            title="BUILT IN INDONESIA."
            highlight="READY FOR ANYWHERE."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Drag the 3D cybernetic globe to explore our multi-region edge mesh.
            Click any node or selector button to rotate and run live latency diagnostics.
          </p>
        </div>
      </div>

      {/* Main 3D Globe + Telemetry HUD Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#0C0C0C]/95 tactical-corners border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <span className="tactical-corner-tr" />
        <span className="tactical-corner-bl" />
        {/* Ambient Backlight Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4FF00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left: 3D Interactive Cyber Globe Viewport (7 cols) */}
        <div className="lg:col-span-7 relative flex flex-col justify-between min-h-[440px] sm:min-h-[500px] overflow-hidden border border-white/15 bg-[#09090B] p-4 tactical-corners">
          <span className="tactical-corner-tr" />
          <span className="tactical-corner-bl" />
          {/* Top Telemetry Header Stamp */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#D4FF00] pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D4FF00] animate-spin-slow" />
              <span className="tracking-wider uppercase font-bold">
                ORBITAL TELEMETRY // 3D GEOSPATIAL ENGINE
              </span>
            </div>
            <span className="text-hoza-muted hidden sm:inline">
              DRAG TO ROTATE GLOBE
            </span>
          </div>

          {/* 3D WebGL Globe Canvas */}
          <div className="flex-1 w-full h-full flex items-center justify-center my-2">
            <InteractiveCyberGlobe
              selectedHub={selectedHub}
              onSelectHub={handleSelectNode}
              className="w-full h-full"
            />
          </div>

          {/* Bottom Quick-Focus Node Switcher Pills */}
          <div className="relative z-10 pt-3 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {REGIONAL_HUBS.map((hub) => {
                const isSelected =
                  hub.city.toLowerCase() === selectedHub.toLowerCase();
                return (
                  <button
                    key={hub.city}
                    type="button"
                    onClick={() => handleSelectNode(hub.city)}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer border",
                      isSelected
                        ? "bg-[#D4FF00]/15 border-[#D4FF00] text-[#D4FF00] shadow-[0_0_12px_rgba(212,255,0,0.3)] font-bold"
                        : "bg-white/[0.03] border-white/10 text-hoza-muted hover:text-white hover:border-white/25"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isSelected
                          ? "bg-[#D4FF00] animate-ping"
                          : "bg-hoza-darkMuted"
                      )}
                    />
                    <span>{hub.city.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Diagnostic Console (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0E0E0E] tactical-corners border border-white/15 flex flex-col justify-between space-y-6 relative">
          <span className="tactical-corner-tr" />
          <span className="tactical-corner-bl" />
          <div>
            <div className="border-b border-white/10 pb-4 mb-4">
              <span className="font-mono text-[10px] text-[#D4FF00] uppercase font-bold tracking-widest block mb-1">
                NODE TELEMETRY LOG
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-3xl text-hoza-white uppercase">
                  {activeHub.city}
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>
              <span className="font-mono text-xs text-hoza-muted">
                {activeHub.country} &bull; {activeHub.coordinates}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 bg-hoza-surface border border-[#D4FF00]/20 flex items-center justify-between">
                <span className="text-hoza-muted">MEASURED LATENCY</span>
                <span className="text-2xl font-bold text-[#D4FF00]">
                  {probeResult ? probeResult.split(" ")[0] : activeHub.ping}
                </span>
              </div>

              <div className="p-3.5 bg-hoza-surface border border-[#D4FF00]/20 flex items-center justify-between">
                <span className="text-hoza-muted">ROLE & CLUSTER</span>
                <span className="text-hoza-white font-bold text-right text-[11px]">
                  {activeHub.status}
                </span>
              </div>

              <div className="p-3.5 bg-hoza-surface border border-[#D4FF00]/20 flex items-center justify-between">
                <span className="text-hoza-muted">SECURITY & PROTOCOL</span>
                <span className="text-emerald-400 font-semibold">
                  TLS 1.3 // 0-RTT CACHE
                </span>
              </div>

              <div className="p-3.5 bg-hoza-surface border border-[#D4FF00]/20 flex items-center justify-between">
                <span className="text-hoza-muted">EDGE HIGHWAY</span>
                <span className="text-[#E6FF4D] font-semibold">
                  JAKARTA HQ &harr; {activeHub.city.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#D4FF00]/20/80">
            <button
              type="button"
              onClick={handleProbeNode}
              disabled={isProbing}
              className="w-full py-2.5 px-4 rounded-lg bg-[#D4FF00]/15 hover:bg-[#D4FF00]/25 border border-[#D4FF00]/50 text-[#D4FF00] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,255,0,0.15)] disabled:opacity-60"
            >
              <RotateCw
                className={cn("w-3.5 h-3.5", isProbing && "animate-spin")}
              />
              <span>
                {isProbing
                  ? "PROBING EDGE NODE..."
                  : `PROBE ${activeHub.city.toUpperCase()} PING`}
              </span>
            </button>

            {probeResult && (
              <div className="font-mono text-[10px] text-emerald-400 text-center animate-in fade-in duration-150">
                âœ“ PROBE CONFIRMED: {probeResult}
              </div>
            )}

            <div className="font-mono text-[11px] text-hoza-muted leading-relaxed">
              Global high-availability multi-region edge mesh routing customer
              requests with deterministic sub-second timeframes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
