"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  Cpu,
  Layers,
  ArrowUpRight,
  Server,
  CheckCircle2,
  X,
  Activity,
  ArrowRight,
  Database,
  Radio,
  Sparkles,
  Mail,
} from "lucide-react";
import { SmoothHeading } from "@/components/ui/SmoothHeading";
import { soundEffects } from "@/components/ui/SoundEffects";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  onOpenProjectModal?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenProjectModal,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      id: 0,
      code: "01",
      label: "Studio & Mission",
      icon: Layers,
      summary: "Unified engineering vs fragmented agency overhead",
    },
    {
      id: 1,
      code: "02",
      label: "Core Squad",
      icon: Users,
      summary: "Dedicated engineers, zero account managers",
    },
    {
      id: 2,
      code: "03",
      label: "11 Automation Engines",
      icon: Cpu,
      summary: "Autonomous backend pipelines running 24/7",
    },
    {
      id: 3,
      code: "04",
      label: "Platform & Stack",
      icon: Server,
      summary: "Battle-tested architecture & ecosystem",
    },
  ];

  // Squad Members
  const squadMembers = [
    {
      name: "Arma",
      role: "Lead Ops",
      location: "Hoza Digital Core Team · Remote-First",
      avatar: "/images/authors/arma.webp",
      bio: "Lead Operations at Hoza Digital. Specializing in analytics pipelines, sales intelligence, workflow automation, and client delivery systems that eliminate friction and scale revenue.",
      stats: "24h Response SLA",
      socials: {
        x: "https://x.com/hozadigital",
        github: "https://github.com/hozadigital",
        email: "mailto:hello@hoza.studio",
      },
    },
    {
      name: "Owen",
      role: "Lead Engineer",
      location: "Hoza Digital Core Team · Remote-First",
      avatar: "/images/authors/owen.webp",
      bio: "Lead Engineer at Hoza Digital. Building mission-critical full-stack web platforms, mobile products, real-time database architectures, and high-performance serverless infrastructure.",
      stats: "Sub-Second Deploys",
      socials: {
        x: "https://x.com/hozadigital",
        github: "https://github.com/hozadigital",
        email: "mailto:hello@hoza.studio",
      },
    },
    {
      name: "Amma",
      role: "Engineer",
      location: "Hoza Digital Core Team · Remote-First",
      avatar: "/images/authors/amma.webp",
      bio: "Frontend & Systems Engineer at Hoza Digital. Focused on design systems, conversion-driven UX/UI, interaction fidelity, and fluid web experiences that drive user action.",
      stats: "100% Type-Safe",
      socials: {
        x: "https://x.com/hozadigital",
        github: "https://github.com/hozadigital",
        email: "mailto:hello@hoza.studio",
      },
    },
  ];

  // 11 Automation Engines Grouped by Purpose for Instant Readability
  const engineCategories = [
    {
      title: "Growth & Ingestion Pipelines",
      engines: [
        {
          num: "01",
          title: "Lead Qualification & Routing",
          desc: "Inbound inquiry parsing, automatic intent classification, and instant founder notification.",
        },
        {
          num: "02",
          title: "Multi-Channel Customer Triage",
          desc: "Cross-platform routing connecting WhatsApp, web chat, and email support into unified queues.",
        },
        {
          num: "04",
          title: "Stripe Billing & Auto-Invoicing",
          desc: "Automated recurring subscriptions, multi-currency tax calculation, and instant payment webhooks.",
        },
      ],
    },
    {
      title: "Data Sync & Edge Deployment",
      engines: [
        {
          num: "03",
          title: "Custom API & Webhook Bridges",
          desc: "Event-driven middleware bridging legacy business databases with modern cloud APIs.",
        },
        {
          num: "05",
          title: "CRM & Database Real-Time Sync",
          desc: "Zero-latency bidirectional synchronisation between PostgreSQL, HubSpot, and internal dashboards.",
        },
        {
          num: "06",
          title: "Sub-Second Edge Deployments",
          desc: "Automated GitHub CI/CD continuous delivery deploying code to 300+ global edge locations.",
        },
        {
          num: "07",
          title: "Automated Regression & E2E Testing",
          desc: "Rigorous synthetic Playwright & unit test matrices executed on every commit before production.",
        },
      ],
    },
    {
      title: "Reliability & 24/7 Operations",
      engines: [
        {
          num: "08",
          title: "WhatsApp & Slack Instant Alerts",
          desc: "Mission-critical real-time telemetry notifying engineering teams of high-priority transactions.",
        },
        {
          num: "09",
          title: "Dead-Letter Queue Retries",
          desc: "Fault-tolerant message queues with exponential backoff guaranteeing zero transactional drop.",
        },
        {
          num: "10",
          title: "Telemetry & Health Checks",
          desc: "Continuous sub-minute heartbeat probes inspecting latency, memory usage, and TLS certificates.",
        },
        {
          num: "11",
          title: "24/7 Autonomous Ops Monitoring",
          desc: "Self-healing microservice containers and automatic failover systems safeguarding uptime.",
        },
      ],
    },
  ];

  // Ecosystem Partners
  const ecosystemPartners = [
    { name: "Vercel", role: "Edge Compute & Serverless", tag: "Global Runtime" },
    { name: "Supabase", role: "PostgreSQL & Auth Engines", tag: "Enterprise DB" },
    { name: "GitHub", role: "CI/CD & Version Control", tag: "Deploy Pipeline" },
    { name: "Netlify", role: "Cloud Delivery Infrastructure", tag: "DNS & CDN" },
    { name: "Stripe", role: "Payment Processing & Billing", tag: "Financial Infra" },
    { name: "Shopify", role: "Headless E-commerce APIs", tag: "Commerce Core" },
    { name: "Notion", role: "Knowledge Base & Client Hub", tag: "Documentation" },
    { name: "Zendesk", role: "Multi-Channel Customer Service", tag: "Service Protocol" },
  ];

  // Core Deliverables
  const realDeliverables = [
    {
      title: "Enterprise Operations & Data Dashboard",
      category: "Portal Architecture",
      desc: "High-density realtime operational consoles and management dashboards.",
    },
    {
      title: "Multi-API Event & Webhook Pipeline",
      category: "Automation Engine",
      desc: "Event-driven infrastructure connecting third-party systems seamlessly.",
    },
    {
      title: "On-Demand Delivery & Tracking App",
      category: "Cross-Platform Mobile",
      desc: "Fast native iOS and Android apps with live GPS location telemetry.",
    },
    {
      title: "High-Converting Venture Landing System",
      category: "Conversion Engine",
      desc: "SEO-dominant flagship sites engineered to convert institutional visitors.",
    },
  ];

  const handleTabSelect = (idx: number) => {
    soundEffects.playClick?.();
    setActiveTab(idx);
  };

  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* ── SECTION HEADER (Clean, Balanced & Aligned) ────────────────────────── */}
      <div className="border-b border-hoza-violet pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>// 05 ABOUT HOZA DIGITAL</span>
          </div>
          <SmoothHeading
            title="BRANDS ARE TASTE."
            highlight="THE REST IS SOFTWARE."
            highlightGradient="from-hoza-white via-[#8B5CFF] to-[#00F0FF]"
          />
        </div>

        <div className="max-w-md">
          <p className="text-hoza-muted text-sm sm:text-base leading-relaxed">
            Hoza is a digital product studio founded in 2025 (remote-first). We
            engineer high-converting web apps, mobile products, and automated
            workflows that eliminate friction and move businesses forward.
          </p>
        </div>
      </div>

      {/* ── CLEAN TAB BAR (Segmented Pill Style, High Readability) ──────────── */}
      <div className="mb-10 p-1.5 bg-[#121214] border border-white/10 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleTabSelect(tab.id)}
              onMouseEnter={() => soundEffects.playHover?.()}
              className={cn(
                "py-3 px-4 rounded-lg text-left transition-all duration-200 cursor-pointer flex items-center gap-3 relative group",
                isSelected
                  ? "bg-[#1E1E22] text-white shadow-lg border border-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors",
                  isSelected
                    ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30"
                    : "bg-white/5 text-neutral-400 group-hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">
                  [{tab.code}]
                </div>
                <div className="font-semibold text-xs truncate">
                  {tab.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── CONTENT PANEL (Simple, Clean, Easy on the Eyes) ────────────────── */}
      <div className="bg-[#0D0D10] border border-white/10 rounded-2xl p-4 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {/* ════════════════════════════════════════════════════════════════════
              TAB 0: STUDIO & MISSION
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 0 && (
            <motion.div
              key="tab-mission"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Header inside Panel */}
              <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider block mb-1">
                    Philosophy & Architecture
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    One Studio, Not Fragmented Agencies.
                  </h3>
                </div>
                <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                  Instead of juggling multiple vendors and disconnected tools, Hoza delivers design, engineering, and automation in a unified system.
                </p>
              </div>

              {/* Side-by-Side Comparison: Clean, Simple, Effortless to Read */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traditional Agency Model */}
                <div className="p-6 rounded-xl bg-[#141418] border border-red-500/20 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      The Fragmented Agency
                    </span>
                    <span className="text-[11px] text-neutral-500">High Overhead</span>
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Separate freelance designers and contract dev shops with disconnected goals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Outsourced QA teams that catch critical bugs only after production launch</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Fragile no-code zaps and siloed databases creating data loss risks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Layers of middleman account managers causing weeks of bureaucratic delays</span>
                    </li>
                  </ul>
                </div>

                {/* Hoza Studio Model */}
                <div className="p-6 rounded-xl bg-gradient-to-b from-[#161622] to-[#12121A] border border-[#00F0FF]/30 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                      The Hoza Digital Studio
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">Zero Waste</span>
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-200">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>A single cohesive team owning design, code, and infrastructure from day one</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>Automated Playwright test suites catching edge cases before deployment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>Custom event-driven webhook pipelines linking PostgreSQL, Stripe, and CRM</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>Direct Slack/WhatsApp access to the actual engineers building your product</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3 Key Metrics: Clean, Spacious, Legible */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
                <div className="p-6 rounded-xl bg-[#141418] border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    24h
                  </div>
                  <div className="text-xs font-mono text-[#00F0FF] uppercase mt-1 font-semibold">
                    Sprint Turnaround
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Architecture blueprints delivered in hours, not multi-week agency meeting cycles.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#141418] border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    11
                  </div>
                  <div className="text-xs font-mono text-[#00F0FF] uppercase mt-1 font-semibold">
                    Autonomous Engines
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Self-governing backend pipelines eliminating repetitive manual administrative tasks.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#141418] border border-white/10">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    99.9%
                  </div>
                  <div className="text-xs font-mono text-emerald-400 uppercase mt-1 font-semibold">
                    Production Uptime
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Zero-downtime rolling deploys with automated regression verification.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 1: CORE SQUAD
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 1 && (
            <motion.div
              key="tab-squad"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header inside Panel */}
              <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider block mb-1">
                    Who Builds It · Remote-First · Since 2025
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Dedicated Engineers, Zero Account Managers.
                  </h3>
                </div>
                <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                  We engineer the software that powers your business, and we are the ones who answer when you need changes shipped.
                </p>
              </div>

              {/* 3 Clean Squad Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                {squadMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 rounded-2xl bg-[#141418] border border-white/10 hover:border-[#8B5CFF]/30 transition-all flex flex-col justify-between h-full shadow-lg"
                  >
                    <div>
                      {/* Avatar Header & Socials */}
                      <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-neutral-900 border border-white/15 shrink-0 shadow-inner">
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight whitespace-nowrap">
                              {member.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-medium bg-[#8B5CFF]/15 text-[#C4B5FD] border border-[#8B5CFF]/30 whitespace-nowrap">
                              {member.role}
                            </span>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                          <a
                            href={member.socials.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on X`}
                            className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on GitHub`}
                            className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          </a>
                          <a
                            href={member.socials.email}
                            aria-label={`Email ${member.name}`}
                            className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Subtitle Line - Full width, no truncation */}
                      <p className="text-[11px] sm:text-xs text-neutral-400 font-sans mt-2.5">
                        {member.location}
                      </p>

                      {/* Divider */}
                      <div className="border-b border-white/10 my-4" />

                      {/* Bio */}
                      <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                        {member.bio}
                      </p>
                    </div>

                    {/* Footer SLA - Equal baseline, single-line guaranteed */}
                    <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono">
                      <span className="text-neutral-500 whitespace-nowrap shrink-0">Verified Capacity</span>
                      <span className="text-emerald-400 font-semibold whitespace-nowrap text-right">{member.stats}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* QA Methodology Callout Banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#14141E] to-[#121218] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <p className="text-sm text-neutral-300">
                    <strong className="text-white">Automated QA Before Production:</strong> Bugs caught in staging take minutes to resolve. Caught in production, they cost customer trust.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase px-3 py-1 bg-[#00F0FF]/10 rounded-full border border-[#00F0FF]/20 shrink-0 self-start sm:self-auto">
                  Zero-Defect Protocol
                </span>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 2: 11 AUTOMATION ENGINES (Clean Categorized Layout)
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 2 && (
            <motion.div
              key="tab-engines"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header inside Panel */}
              <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider block mb-1">
                    Continuous 24/7 Autonomous Workflows
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    What Our 11 Automation Engines Run.
                  </h3>
                </div>
                <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                  Self-governing backend pipelines that eliminate human bottlenecks, prevent data loss, and run mission-critical workflows with zero manual effort.
                </p>
              </div>

              {/* 3 Clean Categories: Highly readable, zero cognitive overload */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {engineCategories.map((cat, catIdx) => (
                  <div
                    key={catIdx}
                    className="p-5 sm:p-6 rounded-xl bg-[#141418] border border-white/10 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Category Title */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                          {cat.title}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Running
                        </span>
                      </div>

                      {/* Engine Items List */}
                      <div className="space-y-4">
                        {cat.engines.map((engine) => (
                          <div
                            key={engine.num}
                            className="p-3.5 rounded-lg bg-[#0C0C0E] border border-white/5 hover:border-[#00F0FF]/30 transition-colors group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                                {engine.title}
                              </span>
                              <span className="font-mono text-[10px] text-neutral-500 font-bold">
                                [{engine.num}]
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                              {engine.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>Deterministic Execution</span>
                      <span className="text-[#00F0FF]">100% Guaranteed</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              TAB 3: PLATFORM & STACK
              ════════════════════════════════════════════════════════════════════ */}
          {activeTab === 3 && (
            <motion.div
              key="tab-platform"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header inside Panel */}
              <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider block mb-1">
                    Working Software, Not Slide Decks
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Made, Not Mocked Up.
                  </h3>
                </div>
                <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                  Prototypes deploy in days, not months. We combine battle-tested architecture templates with custom engineering to eliminate agency bloat.
                </p>
              </div>

              {/* Two Column Layout: Deliverables & Partner Ecosystem */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (5 Cols): Verified Disciplines */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                    <span>Verified Production Disciplines</span>
                  </div>
                  {realDeliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 rounded-xl bg-[#141418] border border-white/10 hover:border-[#00F0FF]/40 transition-colors group"
                    >
                      <div className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider mb-1">
                        {item.category}
                      </div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                        {item.title}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right Column (7 Cols): Infrastructure Ecosystem Wall */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CFF]" />
                    <span>Integrated Cloud Ecosystem</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ecosystemPartners.map((partner, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-4 rounded-xl bg-[#141418] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                      >
                        <div className="text-base font-bold text-white">
                          {partner.name}
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/5">
                          <span className="text-[9px] font-mono font-semibold text-[#00F0FF] block">
                            {partner.tag}
                          </span>
                          <span className="text-[10px] text-neutral-400 block mt-0.5 leading-tight">
                            {partner.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Project Dispatch Callout */}
                  <div className="p-6 rounded-xl bg-gradient-to-r from-[#161624] to-[#12121A] border border-white/10 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Tell us what you want to build.
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        One scoping conversation is enough to know if we can make it, what it costs, and how fast.
                      </p>
                    </div>
                    {onOpenProjectModal && (
                      <button
                        onClick={onOpenProjectModal}
                        className="px-5 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-[#08050D] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer self-start sm:self-auto"
                      >
                        <span>Start a Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
