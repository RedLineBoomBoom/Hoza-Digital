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

            {/* Official Social Media Networks */}
            <div className="pt-2 max-w-sm space-y-2">
              <div className="text-[10px] text-[#00F0FF] uppercase tracking-widest font-mono font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse" />
                <span>// OFFICIAL NETWORKS</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* GitHub */}
                <a
                  href="https://github.com/hozadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hoza Digital on GitHub"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 bg-[#0C0C0C] border border-white/15 hover:border-[#8B5CFF] hover:bg-white/[0.04] text-neutral-300 hover:text-white rounded-xl transition-all duration-200 group text-xs font-mono"
                >
                  <svg className="w-3.5 h-3.5 text-white group-hover:text-[#00F0FF] transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="font-semibold text-[11px]">GitHub</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/hozadigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hoza Digital on Instagram"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 bg-[#0C0C0C] border border-white/15 hover:border-[#E1306C] hover:bg-white/[0.04] text-neutral-300 hover:text-white rounded-xl transition-all duration-200 group text-xs font-mono"
                >
                  <svg className="w-3.5 h-3.5 text-white group-hover:text-[#E1306C] transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-semibold text-[11px]">Instagram</span>
                </a>

                {/* X */}
                <a
                  href="https://x.com/hozadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hoza Digital on X"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2 bg-[#0C0C0C] border border-white/15 hover:border-[#00F0FF] hover:bg-white/[0.04] text-neutral-300 hover:text-white rounded-xl transition-all duration-200 group text-xs font-mono"
                >
                  <svg className="w-3.5 h-3.5 text-white group-hover:text-[#00F0FF] transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="font-semibold text-[11px]">X</span>
                </a>
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
        <div className="border-t border-hoza-violet/80 mt-12 pt-8 flex flex-col gap-6 text-[11px] text-hoza-darkMuted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-hoza-muted">
              <span className="text-[#00F0FF] text-[10px] font-bold tracking-widest">// NETWORKS:</span>
              <a
                href="https://github.com/hozadigital"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00F0FF] transition-colors flex items-center gap-1.5"
              >
                <span>github.com/hozadigital</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href="https://www.instagram.com/hozadigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E1306C] transition-colors flex items-center gap-1.5"
              >
                <span>instagram.com/hozadigital</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href="https://x.com/hozadigital"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00F0FF] transition-colors flex items-center gap-1.5"
              >
                <span>x.com/hozadigital</span>
              </a>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <span className="hidden md:inline">FAST FORWARD // SYSTEM_VERIFIED</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-hoza-muted hover:text-hoza-white transition-colors cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/5 pt-4 text-hoza-darkMuted text-[10.5px]">
            <div>
              © {new Date().getFullYear()} HOZA STUDIO. ALL RIGHTS RESERVED. BUILT IN INDONESIA. READY FOR ANYWHERE.
            </div>
            <div className="text-center sm:text-right tracking-wider">
              ENTERPRISE SPRINT ARCHITECTURE // SUB-SECOND PERFORMANCE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

