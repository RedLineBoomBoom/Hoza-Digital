"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Layers,
  Users,
  MessageCircle,
  ArrowUp,
  Sliders,
  HelpCircle,
  Newspaper,
  Command,
} from "lucide-react";

interface FloatingCyberDockProps {
  onOpenCommandPalette?: () => void;
}

export const FloatingCyberDock: React.FC<FloatingCyberDockProps> = ({
  onOpenCommandPalette,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Quick Actions Dock" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 sm:px-4 max-w-[calc(100vw-24px)] select-none">
      <div className="flex items-center gap-1.5 sm:gap-3 px-3 sm:px-5 py-2 bg-[#0C0C0C]/95 tactical-corners border border-white/20 hover:border-[#D4FF00]/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_16px_rgba(212,255,0,0.15)] transition-all duration-300">
        <span className="tactical-corner-tr" />
        <span className="tactical-corner-bl" />

        {/* Quick Jumps - Hidden on mobile, visible on md+ */}
        <button
          onClick={() => scrollTo("capabilities")}
          className="hidden md:flex font-mono text-[11px] text-hoza-muted hover:text-[#D4FF00] px-2 py-1 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>BENTO</span>
        </button>

        <button
          onClick={() => scrollTo("about")}
          className="hidden md:flex font-mono text-[11px] text-hoza-muted hover:text-[#D4FF00] px-2 py-1 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>ABOUT</span>
        </button>

        {/* Estimator - Visible on all devices */}
        <button
          onClick={() => scrollTo("estimator")}
          className="font-mono text-[11px] text-hoza-muted hover:text-[#D4FF00] px-2 py-1 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>ESTIMATOR</span>
        </button>

        <button
          onClick={() => scrollTo("why-hoza")}
          className="hidden md:flex font-mono text-[11px] text-hoza-muted hover:text-[#D4FF00] px-2 py-1 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>VELOCITY</span>
        </button>

        <button
          onClick={() => scrollTo("faq")}
          className="hidden md:flex font-mono text-[11px] text-hoza-muted hover:text-[#D4FF00] px-2 py-1 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#D4FF00]/70" />
          <span>FAQ</span>
        </button>

        <button
          onClick={() => scrollTo("articles")}
          className="hidden md:flex font-mono text-[11px] text-hoza-muted hover:text-[#D4FF00] px-2 py-1 transition-colors items-center gap-1.5 cursor-pointer"
        >
          <Newspaper className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>ARTICLES</span>
        </button>

        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            title="Open Command Palette (Ctrl+K)"
            className="hidden md:flex font-mono text-[11px] text-[#D4FF00] hover:text-white px-2 py-1 transition-colors items-center gap-1 cursor-pointer bg-white/5 rounded border border-[#D4FF00]/30 hover:border-[#D4FF00]"
          >
            <Command className="w-3 h-3 text-[#D4FF00]" />
            <span className="text-[10px]">⌘K</span>
          </button>
        )}

        <span className="w-px h-4 bg-white/20 mx-0.5 sm:mx-1" />

        {/* 1-Tap WhatsApp Direct */}
        <a
          href="https://wa.me/6285111505115?text=Hi%20Hoza%20Digital%2C%20I%20would%20like%20to%20discuss%20a%20new%20digital%20project."
          target="_blank"
          rel="noreferrer"
          className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-[#09090B] font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-[#09090B]" />
          <span>CHAT</span>
        </a>

        {/* Scroll To Top */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          title="Scroll To Top"
          className="p-1 sm:p-1.5 text-hoza-muted hover:text-white transition-colors shrink-0"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
