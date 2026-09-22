"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary links in the centered floating pill
  const mainNavLinks = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "About", href: "#about" },
    { label: "Estimator", href: "#estimator" },
    { label: "Work", href: "#work" },
    { label: "Why Hoza", href: "#why-hoza" },
    { label: "FAQ", href: "#faq" },
  ];

  // Secondary links in the sleek "More" dropdown
  const secondaryNavLinks = [
    { label: "Process", href: "#process", desc: "4-Stage sprint roadmap" },
    { label: "Network", href: "#network", desc: "Global edge latency nodes" },
    { label: "Tech Stack", href: "#tech", desc: "Next.js, Three.js, AI Core" },
  ];

  // Complete list for mobile drawer
  const mobileNavLinks = [
    { num: "01", label: "Capabilities", href: "#capabilities" },
    { num: "02", label: "About Studio", href: "#about" },
    { num: "03", label: "Estimator", href: "#estimator" },
    { num: "04", label: "Selected Work", href: "#work" },
    { num: "05", label: "Why Hoza", href: "#why-hoza" },
    { num: "06", label: "Process Roadmap", href: "#process" },
    { num: "07", label: "Global Network", href: "#network" },
    { num: "08", label: "Tech Stack", href: "#tech" },
    { num: "09", label: "FAQ", href: "#faq" },
  ];

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#08050D]/85 backdrop-blur-xl border-b border-hoza-violet/60 py-3 shadow-2xl shadow-black/50"
            : "bg-transparent border-b border-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo Lockup */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Hoza Digital Home"
            >
              {/* SVG Brand Mark */}
              <div className="relative flex items-center">
                <svg
                  className="h-6 sm:h-7 w-auto text-hoza-white group-hover:text-hoza-lavender transition-colors"
                  viewBox="0 0 448 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  style={{ height: "28px", width: "auto", maxWidth: "155px" }}
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
                    className="animate-pulse shadow-[0_0_10px_#00F0FF]"
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

              {/* Sub-label visible on desktop screens */}
              <div className="hidden xl:flex flex-col pl-3 border-l border-white/15">
                <span className="font-mono text-[9px] text-[#00F0FF] font-bold tracking-widest uppercase">
                  HIGH-VELOCITY IT PROTOCOL
                </span>
                <span className="font-mono text-[8px] text-hoza-darkMuted tracking-wider">
                  JKT_HQ &bull; SIN_EDGE &bull; GLOBAL
                </span>
              </div>
            </a>
          </div>

          {/* Center: Awwwards Floating Glassmorphic Pill */}
          <nav
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0D0718]/80 border border-[#8B5CFF]/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_12px_rgba(139,92,255,0.1)]"
            aria-label="Main Navigation"
          >
            {mainNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="px-3.5 py-1 rounded-full font-mono text-xs text-hoza-muted hover:text-white hover:bg-white/[0.06] transition-all tracking-wider whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* Micro More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                onMouseEnter={() => setMoreOpen(true)}
                className={cn(
                  "px-3 py-1 rounded-full font-mono text-xs flex items-center gap-1 text-hoza-muted hover:text-white hover:bg-white/[0.06] transition-all tracking-wider whitespace-nowrap",
                  moreOpen && "text-[#00F0FF] bg-white/[0.08]"
                )}
                aria-expanded={moreOpen}
              >
                <span>More</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-200 text-hoza-muted",
                    moreOpen && "rotate-180 text-[#00F0FF]"
                  )}
                />
              </button>

              {moreOpen && (
                <div
                  onMouseLeave={() => setMoreOpen(false)}
                  className="absolute top-full mt-2 -left-6 w-56 p-2 rounded-2xl bg-[#090514]/95 border border-[#8B5CFF]/40 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,255,0.2)] animate-in fade-in slide-in-from-top-2 duration-150 z-50 flex flex-col gap-1"
                >
                  {secondaryNavLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        handleNavLinkClick(e, item.href);
                        setMoreOpen(false);
                      }}
                      className="px-3 py-2 rounded-xl text-left hover:bg-white/[0.06] group transition-colors"
                    >
                      <div className="font-mono text-xs font-semibold text-white group-hover:text-[#00F0FF] transition-colors flex items-center justify-between">
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00F0FF]" />
                      </div>
                      <div className="font-mono text-[10px] text-hoza-darkMuted group-hover:text-hoza-muted transition-colors">
                        {item.desc}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Cluster - Bulkhead Style Tactical Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Status Available Pill */}
            <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 bg-tactical-dark border border-emerald-500/40 font-mono text-[11px] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="tracking-widest text-[10px] font-bold whitespace-nowrap">
                STATUS: AVAILABLE
              </span>
            </div>

            {/* Start Project Tactical Dual-Box Button */}
            <div className="hidden sm:inline-flex">
              <button
                onClick={onOpenProjectModal}
                className="btn-tactical hover:border-tactical-cyan"
              >
                <span className="btn-box-left">
                  <span className="w-2 h-2 rounded-full bg-tactical-cyan animate-pulse" />
                </span>
                <span className="btn-label font-bold text-xs tracking-wider whitespace-nowrap">
                  Start a Project
                </span>
                <span className="btn-box-right">
                  <ArrowUpRight className="w-3.5 h-3.5 text-tactical-cyan" />
                </span>
              </button>
            </div>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-tactical-offwhite hover:text-tactical-cyan focus:outline-none border border-tactical-border bg-tactical-black tactical-corners transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="tactical-corner-tr" />
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-tactical-cyan" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#08050D]/95 backdrop-blur-2xl lg:hidden pt-20 px-6 flex flex-col justify-between pb-10 animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
                // NAVIGATION DIRECTORY
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-hoza-muted hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/[0.05] group transition-colors"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#8B5CFF]">
                      {link.num}
                    </span>
                    <span className="font-display font-bold text-xl text-white group-hover:text-[#00F0FF] transition-colors uppercase">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-hoza-darkMuted group-hover:text-[#00F0FF] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full py-3 px-6 rounded-xl font-mono text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8B5CFF] to-[#6832E3] flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-between font-mono text-[11px] text-hoza-muted px-1">
              <span>JAKARTA &bull; SINGAPORE</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                DISPATCH READY
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
