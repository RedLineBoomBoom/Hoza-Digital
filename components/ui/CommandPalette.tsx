"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  ArrowRight,
  Zap,
  Copy,
  Check,
  Activity,
  Layers,
  FileDown,
  MessageCircle,
  Calculator,
  Globe,
  Radio,
  ExternalLink,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import { soundEffects } from "@/components/ui/SoundEffects";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal?: (service?: string) => void;
  onOpenStudioDeck?: () => void;
  onOpenSystemHealth?: () => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Action" | "System";
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenProjectModal,
  onOpenStudioDeck,
  onOpenSystemHealth,
}) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setPingResult(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    soundEffects.playClick?.();
    navigator.clipboard.writeText("hello@hoza.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePing = () => {
    soundEffects.playClick?.();
    setPingResult("Probing multi-region cluster...");
    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      const latency = Math.round(end - start) % 15 + 9;
      setPingResult(`TLS 1.3 Verified: JKT ${latency}ms // SGT ${latency + 4}ms (0% packet loss)`);
    }, 450);
  };

  const scrollTo = (hash: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      // Actions
      {
        id: "cmd-copy-email",
        category: "Action",
        title: "Copy Official Studio Email",
        subtitle: "hello@hoza.studio (Direct Founder Inquiries)",
        icon: copied ? Check : Copy,
        badge: copied ? "COPIED!" : "CLIPBOARD",
        action: handleCopyEmail,
      },
      {
        id: "cmd-whatsapp",
        category: "Action",
        title: "Direct WhatsApp Line",
        subtitle: "Instant 24h inquiry channel with lead engineers",
        icon: MessageCircle,
        badge: "LIVE CHAT",
        action: () => {
          onClose();
          window.open(
            "https://wa.me/6285111505115?text=" +
              encodeURIComponent("Hi Hoza Digital, I am interested in building a high-velocity digital product."),
            "_blank"
          );
        },
      },
      {
        id: "cmd-download-deck",
        category: "Action",
        title: "Download Studio Credentials Deck",
        subtitle: "Executive capabilities, enterprise SLA, & portfolio PDF",
        icon: FileDown,
        badge: "PDF DECK",
        action: () => {
          onClose();
          onOpenStudioDeck?.();
        },
      },
      {
        id: "cmd-system-health",
        category: "System",
        title: "Live Studio Health & Sprint Availability",
        subtitle: "Realtime node uptime, SLA telemetry, and booking queue",
        icon: Activity,
        badge: "99.98% SLA",
        action: () => {
          onClose();
          onOpenSystemHealth?.();
        },
      },
      {
        id: "cmd-ping",
        category: "System",
        title: "Run Edge Latency Probe",
        subtitle: pingResult || "Simulate real-time network handshake to edge gateways",
        icon: Radio,
        badge: "PROBE",
        action: handlePing,
      },
      {
        id: "cmd-book-sprint",
        category: "Action",
        title: "Reserve Next Sprint Slot",
        subtitle: "Book priority engineering window (October 2026 Batch)",
        icon: Zap,
        badge: "PRIORITY",
        action: () => {
          onClose();
          onOpenProjectModal?.("High-Velocity Sprint");
        },
      },
      {
        id: "cmd-estimator",
        category: "Navigation",
        title: "Interactive Sprint & Scope Calculator",
        subtitle: "Calculate estimated working days, scope, & commercial roadmap",
        icon: Calculator,
        badge: "CALCULATOR",
        action: () => scrollTo("#estimator"),
      },
      // Navigation
      {
        id: "nav-capabilities",
        category: "Navigation",
        title: "Jump to: Capabilities & Services",
        subtitle: "Websites, Web Apps, Mobile, AI Agents, & Automation",
        icon: Layers,
        badge: "#capabilities",
        action: () => scrollTo("#capabilities"),
      },
      {
        id: "nav-work",
        category: "Navigation",
        title: "Jump to: Selected Production Work",
        subtitle: "Full-viewport showcase with architectural telemetry",
        icon: ArrowRight,
        badge: "#work",
        action: () => scrollTo("#work"),
      },
      {
        id: "nav-about",
        category: "Navigation",
        title: "Jump to: About Studio & Squad",
        subtitle: "Arma, Owen, Amma & 11 autonomous automation engines",
        icon: ShieldCheck,
        badge: "#about",
        action: () => scrollTo("#about"),
      },
      {
        id: "nav-why-hoza",
        category: "Navigation",
        title: "Jump to: Why Hoza Comparison Matrix",
        subtitle: "Traditional agency overhead vs Hoza velocity model",
        icon: Zap,
        badge: "#why-hoza",
        action: () => scrollTo("#why-hoza"),
      },
      {
        id: "nav-process",
        category: "Navigation",
        title: "Jump to: Execution Protocol Roadmap",
        subtitle: "4-stage pipeline from zero to live cloud production",
        icon: Terminal,
        badge: "#process",
        action: () => scrollTo("#process"),
      },
      {
        id: "nav-network",
        category: "Navigation",
        title: "Jump to: 3D Holographic Edge Network",
        subtitle: "Interactive Three.js globe & regional latency telemetry",
        icon: Globe,
        badge: "#network",
        action: () => scrollTo("#network"),
      },
      {
        id: "nav-faq",
        category: "Navigation",
        title: "Jump to: Frequently Asked Questions",
        subtitle: "Clear answers on timeline, IP ownership, and pricing",
        icon: ExternalLink,
        badge: "#faq",
        action: () => scrollTo("#faq"),
      },
    ],
    [copied, pingResult, onOpenProjectModal, onOpenStudioDeck, onOpenSystemHealth]
  );

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const query = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.subtitle.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    );
  }, [commands, search]);

  // Keyboard navigation inside palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0E0E12] border border-[#D4FF00]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,255,0,0.15)] overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Header: Cyber Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#121216]">
              <Search className="w-4 h-4 text-[#D4FF00] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent font-mono text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="p-1 hover:text-white text-neutral-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                <kbd>ESC</kbd>
              </div>
            </div>

            {/* List Results */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 space-y-1 divide-y divide-white/[0.04]"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 font-mono text-xs">
                  No matching commands found for &quot;{search}&quot;
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => item.action()}
                      className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-[#181820] border border-[#D4FF00]/40 shadow-[0_0_12px_rgba(212,255,0,0.1)]"
                          : "hover:bg-white/[0.03] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#D4FF00] text-black"
                              : "bg-white/5 text-neutral-400 group-hover:text-white"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`font-mono text-xs font-semibold truncate transition-colors ${
                              isSelected
                                ? "text-[#D4FF00]"
                                : "text-neutral-200 group-hover:text-white"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded tracking-wider shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#D4FF00]/20 text-[#D4FF00] border border-[#D4FF00]/40"
                              : "bg-white/5 text-neutral-500 border border-white/5"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2.5 bg-[#09090B] border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                    ↑↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                    ↵
                  </kbd>{" "}
                  Execute
                </span>
              </div>
              <div className="text-[#D4FF00] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                <span>HOZA CYBER-OS // v2.6.4</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
