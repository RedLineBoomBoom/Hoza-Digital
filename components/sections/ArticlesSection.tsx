"use client";

import React, { useState } from "react";
import { HOZA_ARTICLES, HozaArticle } from "@/lib/constants";
import { soundEffects } from "@/components/ui/SoundEffects";
import { ArrowUpRight, Newspaper, ExternalLink, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Official Hoza Digital Brand Mark Vector Logo
const HozaLogo: React.FC<{ className?: string }> = ({
  className = "h-10 sm:h-14 md:h-18 lg:h-22 w-auto",
}) => (
  <div className="flex items-center justify-center px-1">
    <svg
      viewBox="0 0 448 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "text-[#8B5CFF] hover:text-[#00F0FF] transition-colors duration-300 drop-shadow-[0_0_25px_rgba(139,92,255,0.55)]",
        className
      )}
      aria-label="Hoza Digital Logo"
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
        className="animate-pulse shadow-[0_0_15px_#00F0FF]"
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
);

// Hoza Geometric Cyber Emblem Badge (Octagonal "O" with Cyan Laser Core)
const HozaEmblem: React.FC<{ className?: string }> = ({
  className = "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24",
}) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-[#8B5CFF] hover:text-[#00F0FF] transition-colors duration-300 drop-shadow-[0_0_25px_rgba(139,92,255,0.65)]"
      aria-label="Hoza Emblem"
    >
      {/* Outer cyber ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        opacity="0.45"
      />
      <circle
        cx="50"
        cy="50"
        r="49"
        stroke="#00F0FF"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Octagonal O from Hoza Logo */}
      <path
        fillRule="evenodd"
        d="M 30,18 H 70 L 84,32 V 68 L 70,82 H 30 L 16,68 V 32 Z M 38,32 H 62 L 68,38 V 62 L 62,68 H 38 L 32,62 V 38 Z"
        fill="currentColor"
      />
      {/* Pulsating Cyan Laser Core */}
      <circle
        cx="50"
        cy="50"
        r="6.5"
        fill="#00F0FF"
        className="animate-pulse shadow-[0_0_18px_#00F0FF]"
      />
    </svg>
  </div>
);

export const ArticlesSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"featured" | "all">("featured");

  const displayedArticles =
    viewMode === "featured" ? HOZA_ARTICLES.slice(0, 3) : HOZA_ARTICLES;

  const handleOpenArticle = (url: string) => {
    soundEffects.playClick?.();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="articles"
      className="relative w-full py-20 sm:py-28 bg-[#08050D] border-t border-hoza-violet/50 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#8B5CFF]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#00F0FF]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* ── TOP SECTION METADATA ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#00F0FF]" />
          <span className="tracking-wider uppercase font-bold text-[#00F0FF]">
            // 08 DISPATCHES / FIELD NOTES & PERSPECTIVES
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
          <span className="text-hoza-muted text-[11px] uppercase tracking-widest font-mono">
            LIVE RELEASES // HOZA DIGITAL
          </span>
        </div>
      </div>

      {/* ── MEDIUM BULKHEAD-STYLE "ARTICLES" REPEATING MARQUEE WITH HOZA EMBLEM ─── */}
      <div className="group relative w-full overflow-hidden flex items-center border-y border-white/5 py-3 sm:py-4 bg-[#0B0616]/60 backdrop-blur-sm select-none">
        {/* Edge gradient vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#08050D] via-[#08050D]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#08050D] via-[#08050D]/80 to-transparent z-10 pointer-events-none" />

        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap animate-ticker-left-slow group-hover:[animation-play-state:paused]">
          {[...Array(8)].map((_, i) => (
            <div key={`articles-track1-${i}`} className="flex items-center gap-6 sm:gap-10">
              <span className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase text-[#F3EFE0] leading-none select-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.05)]">
                ARTICLES
              </span>
              <div className="transition-transform hover:scale-108 duration-200 cursor-default">
                <HozaEmblem className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 (Exact Duplicate Clone for 100% Seamless Infinite Loop) */}
        <div
          className="flex shrink-0 items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap animate-ticker-left-slow group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => (
            <div key={`articles-track2-${i}`} className="flex items-center gap-6 sm:gap-10">
              <span className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase text-[#F3EFE0] leading-none select-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.05)]">
                ARTICLES
              </span>
              <div className="transition-transform hover:scale-108 duration-200 cursor-default">
                <HozaEmblem className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTROLS & ARTICLE CARDS CONTAINER ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        {/* Filter Toggle and Link to Official Article Page */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1 bg-[#0F081D]/80 border border-white/10 rounded-full backdrop-blur-md">
            <button
              onClick={() => {
                soundEffects.playClick?.();
                setViewMode("featured");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
                viewMode === "featured"
                  ? "bg-[#8B5CFF] text-white shadow-[0_0_12px_rgba(139,92,255,0.4)]"
                  : "text-hoza-muted hover:text-white"
              }`}
            >
              FEATURED (3)
            </button>
            <button
              onClick={() => {
                soundEffects.playClick?.();
                setViewMode("all");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
                viewMode === "all"
                  ? "bg-[#8B5CFF] text-white shadow-[0_0_12px_rgba(139,92,255,0.4)]"
                  : "text-hoza-muted hover:text-white"
              }`}
            >
              ALL ARTICLES (5)
            </button>
          </div>

          <a
            href="https://hoza-digital.vercel.app/article"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEffects.playHover?.()}
            className="group inline-flex items-center gap-2 text-xs font-mono text-hoza-gray-300 hover:text-[#00F0FF] transition-colors"
          >
            <span>VIEW COMPLETE ARTICLE INDEX</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* ── BULKHEAD-STYLE TACTICAL ARTICLES GRID ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayedArticles.map((article: HozaArticle, idx: number) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                onClick={() => handleOpenArticle(article.url)}
                onMouseEnter={() => soundEffects.playHover?.()}
                className="group relative flex flex-col justify-between p-6 sm:p-7 bg-[#0B0616]/90 hover:bg-[#110826] border border-white/10 hover:border-[#8B5CFF]/60 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(139,92,255,0.2)]"
              >
                {/* Tactical Corner Brackets with Hoza theme violet/cyan */}
                <div
                  className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 rounded-tl-md border-[#8B5CFF]/60 group-hover:border-[#00F0FF] transition-colors"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 rounded-tr-md border-[#8B5CFF]/60 group-hover:border-[#00F0FF] transition-colors"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 rounded-bl-md border-[#8B5CFF]/60 group-hover:border-[#00F0FF] transition-colors"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 rounded-br-md border-[#8B5CFF]/60 group-hover:border-[#00F0FF] transition-colors"
                  aria-hidden="true"
                />

                {/* Top content area */}
                <div>
                  {/* Article Compressed Thumbnail Media Frame */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-[#140C29] border border-white/10 group-hover:border-[#8B5CFF]/50 transition-all duration-300 shadow-inner">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Subtle cyber gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0616]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Category floating badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#08050D]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[#00F0FF] group-hover:border-[#00F0FF]/40 uppercase tracking-wider font-semibold transition-colors">
                        {article.category}
                      </span>
                    </div>

                    {/* Read Time floating badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-[#08050D]/85 backdrop-blur-md border border-white/15 font-mono text-[9px] text-hoza-muted">
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-bold text-base sm:text-lg text-hoza-white group-hover:text-[#00F0FF] transition-colors leading-snug mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Article Excerpt/Summary */}
                  <p className="text-hoza-gray-300 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                    {article.summary}
                  </p>
                </div>

                {/* Bottom metadata & Action Arrow Button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  {/* Release Date in Tactical Monospace Format */}
                  <div className="flex flex-col">
                    <span className="font-mono text-xs sm:text-sm font-bold text-hoza-gray-300 group-hover:text-white transition-colors tracking-widest">
                      {article.date}
                    </span>
                    <span className="font-mono text-[9px] text-hoza-muted uppercase">
                      {article.formattedDate}
                    </span>
                  </div>

                  {/* Tactical Action Button with Hoza Electric Purple & Cyan Hover */}
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#8B5CFF] group-hover:bg-[#00F0FF] text-white group-hover:text-[#08050D] flex items-center justify-center font-bold shadow-[0_0_12px_rgba(139,92,255,0.4)] group-hover:shadow-[0_0_16px_rgba(0,240,255,0.6)] transition-all duration-300 group-hover:scale-105"
                    aria-label={`Read article: ${article.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* ── FOOTER SUB-BANNER ──────────────────────────────────────────────── */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0F081D]/60 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-[#8B5CFF]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-hoza-white">
                Looking for more insights on high-converting architecture &amp; software engineering?
              </p>
              <p className="text-xs text-hoza-muted mt-0.5">
                Read direct field reports and technical breakdowns directly from Hoza Digital.
              </p>
            </div>
          </div>

          <a
            href="https://hoza-digital.vercel.app/article"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick?.()}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-[#8B5CFF] border border-white/10 hover:border-[#8B5CFF] text-xs font-mono font-bold text-hoza-white hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(139,92,255,0.4)] flex items-center gap-2"
          >
            <span>READ ALL ARTICLES</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
