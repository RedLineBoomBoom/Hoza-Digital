"use client";

import React, { useState } from "react";
import { soundEffects } from "@/components/ui/SoundEffects";
import { SmoothHeading } from "@/components/ui/SmoothHeading";
import {
  Zap,
  CheckCircle,
  Sliders,
  Send,
  Layers,
  Sparkles,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectEstimatorProps {
  onOpenModalWithScope?: (scopeText: string) => void;
}

interface FoundationOption {
  id: string;
  name: string;
  baseDays: number;
  description: string;
  stack: string[];
}

const FOUNDATIONS: FoundationOption[] = [
  {
    id: "website",
    name: "Corporate Digital Flagship",
    baseDays: 14,
    description: "Multi-page SEO-dominant corporate presence with fluid typography.",
    stack: ["Next.js 14", "Tailwind CSS", "Vercel Edge", "Headless CMS"],
  },
  {
    id: "landing",
    name: "High-Converting Landing Page",
    baseDays: 7,
    description: "Laser-focused narrative page optimized for campaigns and conversions.",
    stack: ["Next.js", "Framer Motion", "Instant Lead Form", "Analytics Mesh"],
  },
  {
    id: "webapp",
    name: "Web Application / SaaS Portal",
    baseDays: 24,
    description: "Reactive internal tools, client portals, and complex cloud dashboards.",
    stack: ["React / Next.js", "Node.js / Go", "PostgreSQL", "Supabase Auth"],
  },
  {
    id: "mobile",
    name: "Cross-Platform Mobile App",
    baseDays: 28,
    description: "iOS and Android apps with 120fps gesture fluidity and offline caching.",
    stack: ["React Native", "Expo EAS", "Biometrics", "REST/GraphQL"],
  },
  {
    id: "ai-auto",
    name: "Autonomous AI & Workflow Mesh",
    baseDays: 10,
    description: "Self-governing AI agents and WhatsApp/CRM operational pipeline.",
    stack: ["OpenAI / Claude", "n8n / Webhooks", "WhatsApp Cloud API", "Postgres"],
  },
];

interface AddonOption {
  id: string;
  name: string;
  extraDays: number;
}

const ADDONS: AddonOption[] = [
  { id: "wa", name: "WhatsApp Cloud API Live Bot", extraDays: 3 },
  { id: "payments", name: "Stripe / QRIS Payment Gateway", extraDays: 4 },
  { id: "multilang", name: "Multi-Region / Multi-Language Edge", extraDays: 2 },
  { id: "analytics", name: "Deep Analytics & Event Instrumentation", extraDays: 2 },
  { id: "biometrics", name: "Biometric Auth & Role-Based Access", extraDays: 3 },
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onOpenModalWithScope,
}) => {
  const [selectedFoundation, setSelectedFoundation] = useState<string>("website");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["wa", "analytics"]);

  const currentFoundation =
    FOUNDATIONS.find((f) => f.id === selectedFoundation) || FOUNDATIONS[0];

  const totalSprintDays =
    currentFoundation.baseDays +
    selectedAddons.reduce((acc, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return acc + (addon ? addon.extraDays : 0);
    }, 0);

  const toggleAddon = (id: string) => {
    soundEffects.playClick?.();
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const getScopeSummary = () => {
    const addonsList = selectedAddons
      .map((a) => ADDONS.find((item) => item.id === a)?.name)
      .filter(Boolean)
      .join(", ");
    return `Project: ${currentFoundation.name} | Addons: ${addonsList || "None"} | Target Velocity: ~${totalSprintDays} Working Days`;
  };

  const handleWhatsAppDirect = () => {
    soundEffects.playClick?.();
    const scope = getScopeSummary();
    const text = encodeURIComponent(
      `Hi Hoza Digital, I used your interactive sprint estimator:\n\n• ${scope}\n\nCan we discuss feasibility and commercial roadmap?`
    );
    window.open(`https://wa.me/6285111505115?text=${text}`, "_blank");
  };

  const handleOpenDrawer = () => {
    soundEffects.playClick?.();
    if (onOpenModalWithScope) {
      onOpenModalWithScope(getScopeSummary());
    }
  };

  return (
    <section
      id="estimator"
      className="relative py-24 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Section Header */}
      <div className="border-b border-[#D4FF00]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>// 03 ARCHITECTURE & SPRINT ESTIMATOR</span>
          </div>
          <SmoothHeading
            title="CALCULATE"
            highlight="SPRINT SCOPE."
            highlightGradient="from-[#E6FF4D] via-[#D4FF00] to-[#E6FF4D]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Select your product requirements to calculate estimated sprint velocity,
            stack blueprint, and generate an instant project specification.
          </p>
        </div>
      </div>

      {/* Main Estimator HUD Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Configurator Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Step 1: Select Foundation (Clean Rounded Container) */}
          <div className="p-6 sm:p-8 bg-[#121216]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono text-xs text-[#D4FF00] uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
                STEP 1: SELECT CORE SYSTEM TYPE
              </span>
              <span className="font-mono text-[11px] text-hoza-muted px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                5 FOUNDATION TYPES
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {FOUNDATIONS.map((f) => {
                const isSelected = f.id === selectedFoundation;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      soundEffects.playClick?.();
                      setSelectedFoundation(f.id);
                    }}
                    onMouseEnter={() => soundEffects.playHover?.()}
                    className={cn(
                      "relative p-4 sm:p-5 text-left border transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl cursor-pointer group overflow-hidden",
                      isSelected
                        ? "border-[#D4FF00] shadow-[0_0_25px_rgba(212,255,0,0.25)]"
                        : "bg-[#121216]/70 border-white/10 hover:border-white/25 hover:bg-[#18181D]"
                    )}
                  >
                    {/* Sliding active pill indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeFoundationHighlight"
                        className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/25 via-[#D4FF00]/15 to-[#D4FF00]/10 rounded-2xl pointer-events-none"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="font-display font-bold text-base text-hoza-white group-hover:text-white transition-colors flex items-center gap-2">
                        <span>{f.name}</span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]"
                          />
                        )}
                      </div>
                      <div className="font-sans text-xs text-hoza-muted mt-1 leading-relaxed">
                        {f.description}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "relative z-10 flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border shrink-0 font-medium transition-colors duration-200",
                        isSelected
                          ? "bg-[#D4FF00]/20 border-[#D4FF00]/50 text-[#D4FF00] shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                          : "bg-white/5 border-white/10 text-hoza-muted"
                      )}
                    >
                      <Clock className={cn("w-3.5 h-3.5", isSelected ? "text-[#D4FF00]" : "text-hoza-muted")} />
                      <span>~{f.baseDays} Days Base</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Addons (Clean Rounded Container) */}
          <div className="p-6 sm:p-8 bg-[#121216]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono text-xs text-[#D4FF00] uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
                STEP 2: ENHANCE WITH INTEGRATIONS
              </span>
              <span className="font-mono text-[11px] text-[#D4FF00] px-2.5 py-0.5 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30">
                {selectedAddons.length} SELECTED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    onMouseEnter={() => soundEffects.playHover?.()}
                    className={cn(
                      "p-3.5 sm:p-4 text-left border transition-all duration-200 flex items-center justify-between rounded-xl cursor-pointer group",
                      isChecked
                        ? "bg-[#D4FF00]/20 border-[#D4FF00] text-white shadow-[0_0_15px_rgba(212,255,0,0.2)]"
                        : "bg-[#121216]/70 border-white/10 text-hoza-muted hover:text-white hover:bg-[#18181D]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                          isChecked
                            ? "bg-[#D4FF00] border-[#D4FF00] text-[#09090B] shadow-[0_0_8px_#D4FF00]"
                            : "border-white/20 bg-white/5"
                        )}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 text-[#09090B] stroke-[3]" />}
                      </div>
                      <span className="font-sans text-xs font-medium">{addon.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#D4FF00]/70 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 shrink-0 ml-2">
                      +{addon.extraDays}d
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Scope Summary Column (5 cols, sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="p-6 sm:p-8 bg-[#121216]/90 border border-[#D4FF00]/40 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono text-xs text-[#D4FF00] uppercase font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4FF00] animate-pulse" />
                SYSTEM BLUEPRINT READOUT
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 font-mono text-[10px] rounded-full border border-emerald-500/30">
                SPRINT READY
              </span>
            </div>

            {/* Velocity Output Display */}
            <div className="mb-6 p-5 bg-[#09090B] border border-white/10 rounded-2xl flex items-center justify-between shadow-inner relative overflow-hidden">
              <div className="min-h-[56px] flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-hoza-muted uppercase block">
                    ESTIMATED SPRINT DURATION
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentFoundation.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.18 }}
                      className="font-mono text-[9px] text-[#D4FF00] px-2 py-0.5 rounded bg-[#D4FF00]/10 border border-[#D4FF00]/20"
                    >
                      {currentFoundation.name.split(" ")[0]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalSprintDays}
                    initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-display font-black text-3xl sm:text-4xl text-hoza-white mt-1 block">
                      ~{totalSprintDays} Working Days
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div
                key={currentFoundation.id + "-" + totalSprintDays}
                initial={{ scale: 0.82, rotate: -18 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 24 }}
                className="w-12 h-12 rounded-full bg-[#D4FF00]/20 border border-[#D4FF00] flex items-center justify-center text-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.3)] shrink-0"
              >
                <Zap className="w-6 h-6" />
              </motion.div>
            </div>

            {/* Architecture Stack Badges */}
            <div className="mb-6 min-h-[96px]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] text-hoza-muted uppercase tracking-wider block">
                  RECOMMENDED ARCHITECTURE STACK:
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentFoundation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[10px] text-[#D4FF00]/70"
                  >
                    {currentFoundation.stack.length} Modules
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFoundation.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.035,
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -4,
                      filter: "blur(2px)",
                      transition: { duration: 0.15 },
                    },
                  }}
                  className="flex flex-wrap gap-2"
                >
                  {currentFoundation.stack.map((item, i) => (
                    <motion.span
                      key={`${currentFoundation.id}-${item}-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 8, scale: 0.94, filter: "blur(3px)" },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: { duration: 0.22, ease: "easeOut" },
                        },
                      }}
                      className="px-3 py-1.5 bg-[#18181D] border border-[#D4FF00]/35 font-mono text-xs text-[#D4FF00]/70 rounded-lg shadow-sm hover:border-[#D4FF00]/50 transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Included Guarantees */}
            <div className="space-y-2.5 mb-8 text-xs font-sans text-hoza-muted border-t border-white/10 pt-5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white/80">100% Codebase Ownership & IP Transfer</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white/80">Core Web Vitals 95+ Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white/80">Direct Daily Senior Engineering Checkpoints</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppDirect}
                onMouseEnter={() => soundEffects.playHover?.()}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-[#09090B] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span>Export Scope to WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenDrawer}
                onMouseEnter={() => soundEffects.playHover?.()}
                className="w-full py-3.5 px-4 bg-[#18181D] hover:bg-[#1E1E24] border border-[#D4FF00]/40 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:border-[#D4FF00]/50"
              >
                <span>Open Project Enquiry Modal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
