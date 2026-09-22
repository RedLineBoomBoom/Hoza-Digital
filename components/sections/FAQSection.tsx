"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/constants";
import { soundEffects } from "@/components/ui/SoundEffects";
import { ChevronDown, HelpCircle, MessageSquare, ArrowUpRight, MessageCircle } from "lucide-react";
import { SmoothHeading } from "@/components/ui/SmoothHeading";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Strategy", "Technology", "Timeline & Pricing"];

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((item) => item.category === activeCategory);

  const toggleFAQ = (index: number) => {
    soundEffects.playClick?.();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#8B5CFF]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* ── SECTION HEADER ─────────────────────────────────────────────────── */}
      <div className="border-b border-hoza-violet pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3 flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>// 07 FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <SmoothHeading
            title="CLEAR ANSWERS."
            highlight="ZERO AMBIGUITY."
            highlightGradient="from-hoza-white via-[#8B5CFF] to-[#00F0FF]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Everything you need to know about working with Hoza Digital, how we architect
            systems, sprint timelines, and commercial models.
          </p>
        </div>
      </div>

      {/* ── CLEAN CATEGORY FILTER PILLS ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-[#0F081D]/80 border border-white/10 rounded-xl w-fit backdrop-blur-md relative z-10">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playClick?.();
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              onMouseEnter={() => soundEffects.playHover?.()}
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded-lg cursor-pointer flex items-center gap-2",
                isSelected
                  ? "bg-[#8B5CFF] text-white font-bold border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(139,92,255,0.4)]"
                  : "text-hoza-muted hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  isSelected
                    ? "bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"
                    : "bg-white/20"
                )}
              />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* ── CLEAN ACCORDION LIST (High Readability & Calm Surfaces) ────────── */}
      <div className="space-y-3.5 max-w-4xl relative z-10">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                isOpen
                  ? "bg-[#140B26]/90 border-[#8B5CFF]/60 shadow-[0_0_25px_rgba(139,92,255,0.2)]"
                  : "bg-[#0F081D]/80 border-white/10 hover:border-white/20 hover:bg-[#120921]"
              )}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                onMouseEnter={() => soundEffects.playHover?.()}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="font-mono text-xs text-[#00F0FF]/70 pt-1 font-semibold">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] text-[#00F0FF] uppercase tracking-wider block mb-1.5">
                      // {faq.category}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-hoza-lavender transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5",
                    isOpen
                      ? "rotate-180 bg-[#8B5CFF]/20 border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                      : "text-hoza-muted group-hover:text-white group-hover:border-white/30"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-hoza-white/80 leading-relaxed font-sans border-t border-white/10 pl-12 sm:pl-16">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── DIRECT CONTACT BANNER (Clean & Welcoming) ────────────────────── */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0F081D]/80 backdrop-blur-md max-w-4xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CFF]/15 border border-[#8B5CFF]/30 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div>
            <h4 className="text-white text-sm sm:text-base font-bold font-display">
              Have an architecture requirement not listed here?
            </h4>
            <p className="text-hoza-muted text-xs sm:text-sm font-sans mt-0.5">
              Discuss directly with our lead engineering squad on WhatsApp.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/6285111505115?text=Hi%20Hoza%2C%20I%20have%20a%20technical%20question%20about%20a%20project."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B5CFF] hover:bg-[#9E75FF] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-[0_0_20px_rgba(139,92,255,0.4)] shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Consult with Engineer</span>
          <ArrowUpRight className="w-4 h-4 ml-0.5" />
        </a>
      </div>
    </section>
  );
};
