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

                  {/* Official Social Media Channels in More Dropdown */}
                  <div className="border-t border-white/10 my-1 pt-1.5 space-y-0.5">
                    <div className="px-3 py-1 font-mono text-[9px] text-[#00F0FF] uppercase tracking-wider font-bold">
                      // Social Channels
                    </div>
                    <a
                      href="https://github.com/hozadigital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl text-left hover:bg-white/[0.06] group transition-colors flex items-center justify-between"
                    >
                      <span className="font-mono text-xs text-neutral-300 group-hover:text-white">GitHub</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-[#00F0FF]" />
                    </a>
                    <a
                      href="https://www.instagram.com/hozadigital/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl text-left hover:bg-white/[0.06] group transition-colors flex items-center justify-between"
                    >
                      <span className="font-mono text-xs text-neutral-300 group-hover:text-[#E1306C]">Instagram</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-[#E1306C]" />
                    </a>
                    <a
                      href="https://x.com/hozadigital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl text-left hover:bg-white/[0.06] group transition-colors flex items-center justify-between"
                    >
                      <span className="font-mono text-xs text-neutral-300 group-hover:text-[#00F0FF]">X (Twitter)</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-[#00F0FF]" />
                    </a>
                  </div>
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

          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Mobile Social Links */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-hoza-lavender uppercase tracking-widest block">
                // OFFICIAL SOCIALS
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/hozadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 text-xs font-mono text-white hover:border-[#8B5CFF] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.instagram.com/hozadigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 text-xs font-mono text-white hover:border-[#E1306C] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://x.com/hozadigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 text-xs font-mono text-white hover:border-[#00F0FF] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X.com</span>
                </a>
              </div>
            </div>

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
