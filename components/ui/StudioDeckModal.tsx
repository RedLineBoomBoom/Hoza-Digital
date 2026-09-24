"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileDown,
  Terminal,
  CheckCircle2,
  Download,
  Eye,
  ExternalLink,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { soundEffects } from "@/components/ui/SoundEffects";

interface StudioDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioDeckModal: React.FC<StudioDeckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [progress, setProgress] = useState(0);
  const [compilingStep, setCompilingStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeView, setActiveView] = useState<"terminal" | "preview">("terminal");

  const compileLogs = [
    "INIT // Establishing cryptographic connection to hoza-core...",
    "EXTRACT // Compiling Studio Capabilities & Delivery Protocols...",
    "TELEMETRY // Packaging 11 Autonomous Engines & Case Studies...",
    "VERIFY // Attaching 100/100 CWV & Sub-second SLA benchmarks...",
    "COMPLETE // HOZA_CREDENTIALS_2026.pdf ready for executive review [200 OK]",
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCompilingStep(0);
      setIsReady(false);
      setActiveView("terminal");
      return;
    }

    // Step-by-step compilation animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const next = prev + 25;
        setCompilingStep(Math.min(Math.floor(next / 25), compileLogs.length - 1));
        return next;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleDownloadPDF = () => {
    soundEffects.playClick?.();
    
    // Create an executive printable credential document in memory
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const deckHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>HOZA DIGITAL - Executive Studio Credentials 2026</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #09090B; color: #F4F4F5; padding: 40px; margin: 0; }
            .header { border-bottom: 2px solid #D4FF00; padding-bottom: 24px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end; }
            h1 { font-size: 36px; margin: 0; color: #FFFFFF; font-weight: 900; letter-spacing: -1px; }
            .badge { background: #D4FF00; color: #000; font-family: monospace; font-weight: bold; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
            .section { margin-bottom: 32px; }
            h2 { color: #D4FF00; font-family: monospace; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #27272A; padding-bottom: 8px; }
            p { color: #A1A1AA; line-height: 1.6; font-size: 14px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; }
            .card { background: #121216; border: 1px solid #27272A; padding: 16px; border-radius: 8px; }
            .card-title { font-weight: bold; color: #FFF; font-size: 14px; margin-bottom: 4px; }
            .card-desc { font-size: 12px; color: #71717A; }
            .metric { font-size: 28px; font-weight: bold; color: #D4FF00; font-family: monospace; }
            .footer { margin-top: 48px; border-top: 1px solid #27272A; padding-top: 16px; font-family: monospace; font-size: 11px; color: #71717A; display: flex; justify-content: space-between; }
            @media print { body { background: #FFF; color: #000; } .card { border-color: #DDD; background: #F9F9F9; } .card-title { color: #000; } h1 { color: #000; } .metric { color: #000; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <span class="badge">OFFICIAL EXECUTIVE DOSSIER // 2026</span>
              <h1 style="margin-top: 8px;">HOZA DIGITAL</h1>
              <p style="margin: 4px 0 0 0; color: #D4FF00; font-family: monospace;">HIGH-VELOCITY DIGITAL PRODUCT STUDIO &bull; JAKARTA &bull; SINGAPORE</p>
            </div>
            <div style="text-align: right; font-family: monospace; font-size: 12px; color: #A1A1AA;">
              <div>DOC ID: HOZA-SPEC-2026-V2</div>
              <div>DATE: ${new Date().toLocaleDateString("en-GB")}</div>
            </div>
          </div>

          <div class="section">
            <h2>01 // Core Operating Principle</h2>
            <p><strong>"BRANDS ARE TASTE. THE REST IS SOFTWARE."</strong> Hoza is a digital product studio building high-converting websites, web apps, mobile platforms, and autonomous automation pipelines. We eliminate agency bloat and deliver production code in 14-day velocity sprints.</p>
          </div>

          <div class="section">
            <h2>02 // Studio Performance Metrics (Audit Verified)</h2>
            <div class="grid">
              <div class="card">
                <div class="metric">14 DAYS</div>
                <div class="card-title">Average Sprint Velocity</div>
                <div class="card-desc">From approved design architecture to live production deployment.</div>
              </div>
              <div class="card">
                <div class="metric">100 / 100</div>
                <div class="card-title">Core Web Vitals Target</div>
                <div class="card-desc">Sub-second Largest Contentful Paint (&lt;0.6s) across all edge regions.</div>
              </div>
              <div class="card">
                <div class="metric">100% IP</div>
                <div class="card-title">Full Code Transfer</div>
                <div class="card-desc">Zero vendor lock-in. Full repository, documentation, and cloud rights.</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>03 // Core Capabilities & Deliverables</h2>
            <div class="grid">
              <div class="card">
                <div class="card-title">Websites & Flagships</div>
                <div class="card-desc">SEO-dominant Next.js digital flagships built to convert institutional visitors.</div>
              </div>
              <div class="card">
                <div class="card-title">Reactive Web Applications</div>
                <div class="card-desc">Client portals, SaaS dashboards, and real-time operational interfaces.</div>
              </div>
              <div class="card">
                <div class="card-title">Cross-Platform Mobile</div>
                <div class="card-desc">120fps fluid iOS & Android applications with native hardware integrations.</div>
              </div>
              <div class="card">
                <div class="card-title">11 Automation Engines</div>
                <div class="card-desc">AI Agents, automated lead triage, WhatsApp CRM, and zero-error pipelines.</div>
              </div>
              <div class="card">
                <div class="card-title">3D & Kinetic Experiences</div>
                <div class="card-desc">WebGL, Three.js, and brutalist spatial interfaces that win market attention.</div>
              </div>
              <div class="card">
                <div class="card-title">Enterprise SLA Support</div>
                <div class="card-desc">24h response guarantee, 99.98% contract uptime, and continuous maintenance.</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <span>HOZA DIGITAL STUDIO &bull; HELLO@HOZA.STUDIO &bull; WA: +62 851 1150 5115</span>
            <span>CONFIDENTIAL &bull; FOR EXECUTIVE REVIEW ONLY</span>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(deckHTML);
    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 min-[400px]:p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0E0E12] border border-[#D4FF00]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,255,0,0.15)] overflow-hidden z-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 min-[400px]:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#121216]">
              <div className="flex items-center gap-2.5">
                <FileDown className="w-4 h-4 text-[#D4FF00]" />
                <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                  EXECUTIVE STUDIO DECK DOWNLOAD
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 min-[400px]:p-6 space-y-4 sm:space-y-5">
              {/* Progress and status */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-400 flex items-center gap-2">
                    {isReady ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                    )}
                    <span>{isReady ? "COMPILATION READY" : "PACKAGING SPECIFICATION..."}</span>
                  </span>
                  <span className="text-[#D4FF00] font-bold">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#D4FF00]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>

              {/* Terminal Logs Window */}
              <div className="p-4 rounded-xl bg-[#070709] border border-white/10 font-mono text-xs text-neutral-300 space-y-2 min-h-[140px]">
                {compileLogs.slice(0, compilingStep + 1).map((log, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      idx === compilingStep
                        ? "text-[#D4FF00]"
                        : "text-neutral-400"
                    }`}
                  >
                    <span className="text-neutral-600 select-none">&gt;</span>
                    <span className="leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  disabled={!isReady}
                  onClick={handleDownloadPDF}
                  className={`w-full sm:w-auto flex-1 px-5 py-3 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isReady
                      ? "bg-[#D4FF00] hover:bg-[#E6FF4D] text-black shadow-[0_0_20px_rgba(212,255,0,0.35)] active:scale-98"
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Executive PDF (Print-Ready)</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    window.open(
                      "https://wa.me/6285111505115?text=" +
                        encodeURIComponent(
                          "Hi Hoza Digital, I reviewed your Executive Studio Deck and would like to discuss a project."
                        ),
                      "_blank"
                    );
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Discuss With Founders</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#09090B] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>FORMAT: PDF // SPEC 2026 // 1.8 MB</span>
              <span>100% UNRESTRICTED EXECUTIVE REVIEW</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
