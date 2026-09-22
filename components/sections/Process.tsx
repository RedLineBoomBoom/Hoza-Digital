"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SmoothHeading } from "@/components/ui/SmoothHeading";

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Responsive check for desktop lateral slide-in animation
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Smooth scroll-driven spine laser progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Header with Smooth Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-hoza-violet pb-8 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] inline-block" />
            <span>// 04 THE EXECUTION PROTOCOL</span>
          </div>
          <SmoothHeading
            title="IDEA TO"
            highlight="LAUNCH."
            highlightGradient="from-hoza-white via-[#C8B7FF] to-[#8B5CFF]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            A battle-tested 6-stage engineering sprint cycle. Predictable delivery,
            transparent progress checkpoints, and zero guesswork.
          </p>
        </div>
      </motion.div>

      {/* Process Timeline with Animated Electric Line */}
      <div className="relative">
        {/* Continuous Center Animated Laser Line for Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-hoza-violet/40">
          <motion.div
            className="w-full bg-gradient-to-b from-[#8B5CFF] via-[#00F0FF] to-[#8B5CFF] origin-top shadow-[0_0_16px_rgba(0,240,255,0.8)]"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        {/* 6 Steps with Staggered Smooth Scroll Reveal */}
        <div className="space-y-16 lg:space-y-24">
          {PROCESS_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.step}
                className={cn(
                  "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12",
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                )}
              >
                {/* Content Card with Smooth Lateral + Vertical Glide */}
                <motion.div
                  className="w-full lg:w-1/2 order-2 lg:order-none"
                  initial={{
                    opacity: 0,
                    y: 40,
                    x: isDesktop ? (isEven ? 50 : -50) : 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  viewport={{ once: true, amount: 0.22, margin: "-40px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="group p-6 sm:p-8 bg-[#0C0C0C]/95 tactical-corners border border-white/15 hover:border-[#00F0FF] transition-all duration-300 shadow-2xl relative overflow-hidden">
                    <span className="tactical-corner-tr" />
                    <span className="tactical-corner-bl" />
                    {/* Ambient subtle top edge laser highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-xs">
                      <span className="text-[#00F0FF] font-bold tracking-wider">
                        [PHASE {step.step}]
                      </span>
                      <span className="text-[#C8B7FF] tracking-widest uppercase font-semibold">
                        {step.label}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-hoza-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#C8B7FF] transition-all duration-200">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm text-hoza-muted leading-relaxed">
                      {step.description}
                    </p>

                    {/* Staggered Deliverables Badges */}
                    <div className="mt-6 pt-4 border-t border-hoza-violet/80 flex flex-wrap gap-2">
                      {step.deliverables.map((d, dIdx) => (
                        <motion.span
                          key={dIdx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.15 + dIdx * 0.08,
                            ease: "easeOut",
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#08050D] border border-hoza-violet rounded-sm font-mono text-[11px] text-hoza-muted transition-all duration-200 hover:border-[#00F0FF]/50 hover:text-white"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                          <span>{d}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Central Node Badge with Elastic Pop Reveal */}
                <motion.div
                  className="relative z-10 flex items-center justify-center order-1 lg:order-none"
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <div className="relative group cursor-default">
                    {/* Pulsing ambient halo */}
                    <div className="absolute inset-0 bg-[#8B5CFF]/30 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

                    {/* Square Number Node */}
                    <div className="relative w-12 h-12 bg-[#08050D] border-2 border-[#8B5CFF] text-[#C8B7FF] flex items-center justify-center font-mono text-sm font-bold shadow-[0_0_16px_rgba(139,92,255,0.45)] group-hover:border-[#00F0FF] group-hover:text-[#00F0FF] group-hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] transition-all duration-300">
                      {step.step}
                    </div>
                  </div>
                </motion.div>

                {/* Empty opposite spacer column for desktop layout balance */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
