"use client";

import React, { useRef, useState, useEffect } from "react";
import { MessageCircle, Calendar, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SmoothHeading } from "@/components/ui/SmoothHeading";

interface FinalCTAProps {
  onOpenProjectModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenProjectModal }) => {
  const [wordmarkOffset, setWordmarkOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const resetToCenter = () => {
    setWordmarkOffset({ x: 0, y: 0 });
  };

  const scheduleIdleReset = (delay = 1800) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      resetToCenter();
    }, delay);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = {
      x: e.clientX - wordmarkOffset.x,
      y: e.clientY - wordmarkOffset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = Math.max(-120, Math.min(120, e.clientX - dragStart.current.x));
    const newY = Math.max(-60, Math.min(60, e.clientY - dragStart.current.y));
    setWordmarkOffset({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
    // Automatically return to initial position after 1.8 seconds of inactivity
    scheduleIdleReset(1800);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    scheduleIdleReset(1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] flex flex-col justify-between py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none overflow-hidden"
    >
      {/* Large Interactive Draggable / Distortable Background Brand Logo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing z-0 opacity-20 hover:opacity-35 transition-opacity px-6 touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDoubleClick={resetToCenter}
        title="Click and drag to displace logo / Automatically returns to center when idle"
      >
        <div
          className="w-full max-w-5xl flex items-center justify-center will-change-transform select-none"
          style={{
            transform: `translate3d(${wordmarkOffset.x}px, ${wordmarkOffset.y}px, 0) skew(${wordmarkOffset.x * 0.05}deg)`,
            transition: isDragging
              ? "none"
              : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <svg
            className="w-full h-auto text-[#8B5CFF]/25 hover:text-[#8B5CFF]/40 transition-colors drop-shadow-[0_0_60px_rgba(139,92,255,0.2)]"
            viewBox="0 0 448 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="0,0 22,0 22,32 62,32 62,0 84,0 84,82 62,82 62,51 22,51 22,82 0,82"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              d="M 118,0 H 176 L 197,21 V 61 L 176,82 H 118 L 97,61 V 21 Z M 129,21 H 165 L 175,31 V 51 L 165,61 H 129 L 119,51 V 31 Z"
              fill="currentColor"
            />
            <circle
              cx="147"
              cy="41"
              r="6"
              fill="#00F0FF"
              className="animate-pulse shadow-[0_0_20px_#00F0FF]"
              opacity="0.8"
            />
            <polygon
              points="215,0 319,0 319,20 256,63 319,63 319,82 215,82 215,63 278,19 215,19"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              d="M 375,0 H 403 L 448,82 H 423 L 412,65 H 366 L 355,82 H 330 Z M 389,21.5 L 404,50 H 374 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Top telemetry notice */}
      <div className="relative z-10 flex items-center justify-between border-b border-hoza-violet/80 pb-4 font-mono text-xs text-hoza-muted">
        <span className="text-hoza-electric font-bold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          // INITIATE ENGAGEMENT
        </span>
        <span className="hidden sm:inline-block text-[11px] text-hoza-lavender">
          ESTIMATED SPRINT TURNAROUND: 14 DAYS
        </span>
      </div>

      {/* Center Headline & Actions */}
      <div className="relative z-10 my-auto py-12 max-w-4xl">
        <SmoothHeading
          title="HAVE SOMETHING"
          highlight="TO BUILD?"
          highlightGradient="from-hoza-white via-hoza-lavender to-hoza-electric"
          className="text-5xl sm:text-7xl lg:text-8xl leading-[0.92]"
        />

        <p className="mt-8 text-base sm:text-xl text-hoza-muted max-w-2xl leading-relaxed">
          Tell us what you are trying to create, improve or automate. We will
          help you determine the best way to move forward—with clear milestones,
          no agency fluff, and working code.
        </p>

        {/* Primary and Secondary CTA Buttons - Bulkhead Tactical Style */}
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenProjectModal}
            className="btn-tactical btn-tactical-cyan text-sm"
          >
            <span className="btn-box-left">
              <Sparkles className="w-4 h-4 text-[#08050D]" />
            </span>
            <span className="btn-label font-black tracking-wider py-3.5">
              Start Your Project
            </span>
            <span className="btn-box-right">
              <ArrowUpRight className="w-4 h-4 text-[#08050D]" />
            </span>
          </button>

          <a
            href="https://wa.me/6285111505115?text=Hello%20Hoza%20Studio%2C%20I%20have%20a%20project%20I%20would%20like%20to%20build."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactical hover:border-emerald-400 hover:text-emerald-400 text-sm"
          >
            <span className="btn-box-left">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="btn-label font-bold tracking-wider py-3.5">
              Chat on WhatsApp
            </span>
            <span className="btn-box-right">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </span>
          </a>
        </div>

        {/* Alternative Quick Contact Channels & Socials */}
        <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs text-hoza-muted pt-4 border-t border-hoza-violet/60">
          <a
            href="mailto:hello@hoza.studio"
            className="flex items-center gap-2 hover:text-hoza-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-hoza-electric" />
            <span>hello@hoza.studio</span>
          </a>
          <span className="text-hoza-darkMuted">•</span>
          <button
            onClick={onOpenProjectModal}
            className="flex items-center gap-2 hover:text-hoza-white transition-colors text-left"
          >
            <Calendar className="w-3.5 h-3.5 text-hoza-electric" />
            <span>Schedule Intro Call (30 mins)</span>
          </button>
          <span className="text-hoza-darkMuted">•</span>
          <span className="text-hoza-lavender">Direct Partner Access</span>
          <span className="text-hoza-darkMuted">•</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/hozadigital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub @hozadigital"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/hozadigital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @hozadigital"
              className="text-neutral-400 hover:text-[#E1306C] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://x.com/hozadigital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X @hozadigital"
              className="text-neutral-400 hover:text-[#00F0FF] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="relative z-10 flex items-center justify-between border-t border-hoza-violet/80 pt-4 font-mono text-[11px] text-hoza-darkMuted">
        <span>INTERACTIVE BRANDMARK (DRAG TO DISPLACE // AUTO-RESTORES ON IDLE)</span>
        <span>HOZA FAST FORWARD // 2026</span>
      </div>
    </section>
  );
};
