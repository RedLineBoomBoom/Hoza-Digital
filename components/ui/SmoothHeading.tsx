"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SmoothHeadingProps {
  title?: string;
  highlight?: string;
  highlightGradient?: string;
  children?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
}

// ─────────────────────────────────────────────────────────────────────────────
// Luxury Kinetic SmoothHeading
// - Masked spatial slit reveal with 3D perspective fold & optical blur dissipation
// - Word-by-word cascading rhythm for Line 1 (crisp white)
// - Harmonic second-wave cascade for Line 2 (vivid cyber gradient)
// - Rock-solid dual scroll observer (useInView + native viewport probe)
//   Ensures animation NEVER triggers prematurely while offscreen, and ALWAYS
//   unfurls with buttery 60/120fps silkiness as the user scrolls into view.
// ─────────────────────────────────────────────────────────────────────────────
export const SmoothHeading: React.FC<SmoothHeadingProps> = ({
  title,
  highlight,
  highlightGradient = "from-hoza-white via-[#8B5CFF] to-[#00F0FF]",
  children,
  className,
  as = "h2",
  align = "left",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Trigger when 10% into viewport from bottom
  const inView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasTriggered(true);
      return;
    }

    // Bulletproof fallback: check real viewport coordinates on mount & scroll
    const checkPosition = () => {
      if (!containerRef.current || hasTriggered) return;
      const rect = containerRef.current.getBoundingClientRect();
      // If heading top is within 92% of viewport height and not completely scrolled past
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        setHasTriggered(true);
      }
    };

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    return () => window.removeEventListener("scroll", checkPosition);
  }, [inView, hasTriggered]);

  // ── CHILDREN BRANCH (Hero <h1> freeform typography) ─────────────────────────
  if (children) {
    const MotionTag = motion[as];
    return (
      <div
        ref={containerRef}
        className={cn("w-full", align === "center" && "text-center")}
        style={{ perspective: 1200 }}
      >
        <MotionTag
          className={cn(
            "font-display font-black tracking-tight leading-[0.95] text-hoza-white uppercase will-change-transform",
            className
          )}
          initial={{
            y: 35,
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={
            hasTriggered
              ? {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }
              : {
                  y: 35,
                  opacity: 0,
                  filter: "blur(8px)",
                }
          }
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </MotionTag>
      </div>
    );
  }

  // ── TITLE / HIGHLIGHT BRANCH (Section Headings) ────────────────────────────
  const Tag = as;
  const titleWords = title ? title.trim().split(/\s+/) : [];
  const highlightWords = highlight ? highlight.trim().split(/\s+/) : [];
  const highlightStartDelay = Math.max(0.14, titleWords.length * 0.065);

  return (
    <div
      ref={containerRef}
      className={cn("w-full", align === "center" && "text-center")}
      style={{ perspective: 1200 }}
    >
      <Tag
        className={cn(
          "font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-hoza-white uppercase",
          align === "center" && "text-center",
          className
        )}
      >
        {/* LINE 1: Pure Crisp White / Kinetic Word-by-Word Cascade */}
        {title && (
          <span className="block overflow-hidden py-1.5">
            {titleWords.map((word, idx) => (
              <span
                key={idx}
                className="inline-block overflow-hidden py-1 mr-[0.24em] last:mr-0 align-top"
                style={{ perspective: 1000 }}
              >
                <motion.span
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "50% 100%" }}
                  initial={{
                    y: "115%",
                    rotateX: 25,
                    opacity: 0,
                    filter: "blur(7px)",
                  }}
                  animate={
                    hasTriggered
                      ? {
                          y: "0%",
                          rotateX: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }
                      : {
                          y: "115%",
                          rotateX: 25,
                          opacity: 0,
                          filter: "blur(7px)",
                        }
                  }
                  transition={{
                    duration: 0.92,
                    delay: idx * 0.065,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        )}

        {/* LINE 2: Vivid Cyber Gradient Reveal with Harmonic Wave */}
        {highlight && (
          <span className="block overflow-hidden py-1.5 pt-0.5">
            <motion.span
              className={cn(
                "inline-block text-transparent bg-clip-text bg-gradient-to-r will-change-transform",
                highlightGradient
              )}
              style={{ transformOrigin: "50% 100%" }}
              initial={{
                y: "115%",
                rotateX: 25,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={
                hasTriggered
                  ? {
                      y: "0%",
                      rotateX: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : {
                      y: "115%",
                      rotateX: 25,
                      opacity: 0,
                      filter: "blur(8px)",
                    }
              }
              transition={{
                duration: 0.98,
                delay: highlightStartDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {highlight}
            </motion.span>
          </span>
        )}
      </Tag>
    </div>
  );
};
