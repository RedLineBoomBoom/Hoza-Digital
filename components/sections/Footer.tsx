"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Globe, Shield, Terminal, MessageCircle, ArrowUpRight, Mail } from "lucide-react";
import { HOZA_STATEMENTS } from "@/lib/constants";
import { HozaLogo } from "@/components/ui/HozaLogo";

export const Footer: React.FC<{ onOpenProjectModal: () => void }> = ({
  onOpenProjectModal,
}) => {
  const [timeJakarta, setTimeJakarta] = useState("");
  const [timeSingapore, setTimeSingapore] = useState("");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeJakarta(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setTimeSingapore(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Singapore",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050308] border-t border-hoza-violet mt-24 text-hoza-muted font-mono text-xs select-none">
      {/* Upper High-Impact Statement Ticker */}
      <div className="group border-b border-hoza-violet/60 py-3 overflow-hidden bg-hoza-surface/30 relative flex select-none">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-12 pr-12 whitespace-nowrap animate-ticker-left group-hover:[animation-play-state:paused]">
          {[...HOZA_STATEMENTS, ...HOZA_STATEMENTS].map((st, i) => (
            <div key={`foot-track1-${i}`} className="flex items-center gap-4 text-hoza-lavender">
              <span className="w-1.5 h-1.5 bg-hoza-electric" />
              <span className="tracking-widest uppercase">{st}</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Exact Duplicate Clone for 100% Seamless Infinite Loop) */}
        <div
          className="flex shrink-0 items-center gap-12 pr-12 whitespace-nowrap animate-ticker-left group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[...HOZA_STATEMENTS, ...HOZA_STATEMENTS].map((st, i) => (
            <div key={`foot-track2-${i}`} className="flex items-center gap-4 text-hoza-lavender">
              <span className="w-1.5 h-1.5 bg-hoza-electric" />
              <span className="tracking-widest uppercase">{st}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-32 sm:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Studio Identity & Clocks (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <HozaLogo height={28} glow className="h-7 w-auto text-tactical-offwhite" />
            </div>

            <p className="text-sm text-hoza-muted max-w-sm leading-relaxed font-sans">
              Digital product studio building high-converting websites, web apps,
              mobile platforms, and automation systems for businesses ready to
              move forward.
            </p>

            {/* Regional Studio Live Clocks */}
            <div className="grid grid-cols-2 gap-3 max-w-sm pt-2">
              <div className="p-3 bg-[#0C0C0C] border border-white/15 rounded-xl">
                <div className="text-[10px] text-hoza-muted">JAKARTA (WIB)</div>
                <div className="text-sm text-hoza-white font-bold mt-0.5">
                  {timeJakarta || "14:20:00"}
                </div>
              </div>
              <div className="p-3 bg-[#0C0C0C] border border-white/15 rounded-xl">
                <div className="text-[10px] text-hoza-muted">SINGAPORE (SGT)</div>
                <div className="text-sm text-hoza-white font-bold mt-0.5">
                  {timeSingapore || "15:20:00"}
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Index (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-hoza-white font-bold tracking-wider uppercase mb-2">
              // Studio Index
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#capabilities"
                  className="hover:text-hoza-white transition-colors"
                >
                  Capabilities & Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="hover:text-hoza-white transition-colors"
                >
                  Selected Work
                </a>
              </li>
              <li>
                <a
                  href="#why-hoza"
                  className="hover:text-hoza-white transition-colors"
                >
                  The Hoza Advantage
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="hover:text-hoza-white transition-colors"
                >
                  Execution Protocol
                </a>
              </li>
              <li>
                <a
                  href="#network"
                  className="hover:text-hoza-white transition-colors"
                >
                  Regional Network
                </a>
              </li>
              <li>
                <a
                  href="#tech"
                  className="hover:text-hoza-white transition-colors"
                >
                  Technology Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Studio Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-hoza-white font-bold tracking-wider uppercase mb-2">
              // Direct Inquiries
            </div>
            <p className="text-xs text-hoza-muted leading-relaxed font-sans">
              Engage directly with our partner engineering team. We prioritize
              active founder and enterprise briefs.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="mailto:hello@hoza.studio"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#141414] border border-white/15 hover:border-[#8B5CFF] text-[#C8B7FF] hover:text-white font-mono text-xs font-semibold tracking-wider rounded-xl transition-all duration-200 group"
              >
                <Mail className="w-3.5 h-3.5 text-[#8B5CFF] group-hover:scale-110 transition-transform" />
                <span>hello@hoza.studio</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://wa.me/6285111505115?text=Hi%20Hoza%20Digital%2C%20I%20would%20like%20to%20discuss%20a%20new%20digital%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#141414] border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-mono text-xs font-semibold tracking-wider rounded-xl transition-all duration-200 group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenProjectModal}
                className="btn-tactical btn-tactical-cyan rounded-xl overflow-hidden"
              >
                <span className="btn-box-left">
                  <span className="w-1.5 h-1.5 bg-[#08050D]" />
                </span>
                <span className="btn-label font-black">
                  Initiate Project Brief
                </span>
                <span className="btn-box-right">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#08050D]" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon & Scroll to Top */}
        <div className="border-t border-hoza-violet/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-hoza-darkMuted">
          <div>
            © {new Date().getFullYear()} HOZA STUDIO. ALL RIGHTS RESERVED.
            BUILT IN INDONESIA. READY FOR ANYWHERE.
          </div>

          <div className="flex items-center gap-6">
            <span>FAST FORWARD // SYSTEM_VERIFIED</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-hoza-muted hover:text-hoza-white transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
