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
    <section id="faq" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto w-full select-none">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#D4FF00]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="border-b border-[#D4FF00]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// 07 FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <SmoothHeading
            title="CLEAR ANSWERS."
            highlight="ZERO AMBIGUITY."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Everything you need to know about working with Hoza Digital, how we architect
            systems, sprint timelines, and commercial models.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-[#121216]/80 border border-white/10 rounded-xl w-fit backdrop-blur-md relative z-10">
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
                  ? "bg-[#D4FF00] text-[#09090B] font-bold border border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.4)]"
                  : "text-hoza-muted hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  isSelected
                    ? "bg-[#09090B] shadow-[0_0_6px_#09090B]"
                    : "bg-white/20"
                )}
              />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3.5 max-w-4xl relative z-10">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                isOpen
                  ? "bg-[#16161C]/90 border-[#D4FF00]/50 shadow-[0_0_25px_rgba(212,255,0,0.15)]"
                  : "bg-[#121216]/80 border-white/10 hover:border-white/20 hover:bg-[#16161C]"
              )}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                onMouseEnter={() => soundEffects.playHover?.()}
                className="w-full p-4 min-[400px]:p-5 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 sm:gap-5">
                  <span className="font-mono text-xs text-[#D4FF00]/70 pt-1 font-semibold">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] text-[#D4FF00] uppercase tracking-wider block mb-1.5">
                      // {faq.category}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#D4FF00] transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5",
                    isOpen
                      ? "rotate-180 bg-[#D4FF00]/20 border-[#D4FF00]/50 text-[#D4FF00] shadow-[0_0_10px_rgba(212,255,0,0.2)]"
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
                    <div className="px-4 min-[400px]:px-5 sm:px-6 pb-5 sm:pb-6 pt-2 text-xs min-[400px]:text-sm sm:text-base text-hoza-white/80 leading-relaxed font-sans border-t border-white/10 pl-8 min-[400px]:pl-12 sm:pl-16">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Consult Box */}
      <div className="mt-10 sm:mt-12 p-5 sm:p-8 rounded-2xl border border-white/10 bg-[#121216]/80 backdrop-blur-md max-w-4xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/15 border border-[#D4FF00]/30 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-[#D4FF00]" />
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4FF00] hover:bg-[#E6FF4D] text-[#09090B] font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_20px_rgba(212,255,0,0.4)] w-full sm:w-auto shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Consult with Engineer</span>
          <ArrowUpRight className="w-4 h-4 ml-0.5" />
        </a>
      </div>
    </section>
  );
};
