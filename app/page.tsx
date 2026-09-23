"use client";

import React, { useState, useEffect } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { IntroLoader } from "@/components/sections/IntroLoader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Capabilities } from "@/components/sections/Capabilities";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhyHoza } from "@/components/sections/WhyHoza";
import { Process } from "@/components/sections/Process";
import { RegionalMap } from "@/components/sections/RegionalMap";
import { TechMatrix } from "@/components/sections/TechMatrix";
import { FAQSection } from "@/components/sections/FAQSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { ContactDrawer } from "@/components/sections/ContactDrawer";
import { FloatingCyberDock } from "@/components/ui/FloatingCyberDock";
import { TacticalFrame } from "@/components/ui/TacticalFrame";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { StudioDeckModal } from "@/components/ui/StudioDeckModal";
import { StudioHealthModal } from "@/components/ui/StudioHealthModal";

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isStudioDeckOpen, setIsStudioDeckOpen] = useState(false);
  const [isSystemHealthOpen, setIsSystemHealthOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined
  );
  const [preselectedScope, setPreselectedScope] = useState<string | undefined>(
    undefined
  );

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenProjectModal = (service?: string) => {
    if (service) {
      setPreselectedService(service);
    }
    setPreselectedScope(undefined);
    setIsContactModalOpen(true);
  };

  const handleOpenModalWithScope = (scopeText: string) => {
    setPreselectedScope(scopeText);
    setPreselectedService("Web Applications");
    setIsContactModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <SmoothScroll>
      {/* Intro Loader (Smooth, runs once per session) */}
      <IntroLoader />

      {/* Interactive Desktop Violet Spotlight & Cursor */}
      <CustomCursor />

      {/* Fixed Futuristic Header with Sound Controller */}
      <Navbar
        onOpenProjectModal={() => handleOpenProjectModal()}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenStudioDeck={() => setIsStudioDeckOpen(true)}
      />

      {/* Bulkhead Tactical Viewport Ruler Ticks & Crosshairs */}
      <TacticalFrame />

      <main className="relative flex flex-col w-full overflow-hidden">
        {/* 1. Hero Section with 3D WebGL Canvas & Physics Chips */}
        <Hero
          onOpenProjectModal={handleOpenProjectModal}
          onOpenEstimator={() => {
            const el = document.getElementById("estimator");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onOpenSystemHealth={() => setIsSystemHealthOpen(true)}
          onOpenStudioDeck={() => setIsStudioDeckOpen(true)}
        />

        {/* 2. Ecosystem & Partners Ticker Marquee */}
        <ClientMarquee />

        {/* 3. Capabilities Section with 8 Transforming Live Previews */}
        <Capabilities
          onSelectService={(service) => handleOpenProjectModal(service)}
        />

        {/* 4. About Us Interactive Command Deck (Philosophy, Squad, 11 Engines, Ecosystem) */}
        <AboutSection onOpenProjectModal={() => handleOpenProjectModal()} />

        {/* 5. Interactive Project Sprint & Scope Estimator */}
        <ProjectEstimator onOpenModalWithScope={handleOpenModalWithScope} />

        {/* 5. Selected Work Full-Viewport Showcase */}
        <SelectedWork />

        {/* 6. Why Hoza Advantage & Agency Comparison Matrix */}
        <WhyHoza />

        {/* 7. Process Roadmap Timeline */}
        <Process />

        {/* 8. Regional Positioning Global Network Map */}
        <RegionalMap />

        {/* 9. Technology Matrix */}
        <TechMatrix />

        {/* 10. Frequently Asked Questions (FAQ) */}
        <FAQSection />

        {/* 11. News & Articles Field Notes (Bulkhead Style + Hoza Live Articles) */}
        <ArticlesSection />

        {/* 12. Final CTA with Interactive Elastic Wordmark */}
        <FinalCTA onOpenProjectModal={() => handleOpenProjectModal()} />
      </main>

      {/* Studio Colophon & Local Clocks Footer */}
      <Footer
        onOpenProjectModal={() => handleOpenProjectModal()}
        onOpenStudioDeck={() => setIsStudioDeckOpen(true)}
        onOpenSystemHealth={() => setIsSystemHealthOpen(true)}
      />

      {/* Floating Tactical Cyber Action Dock */}
      <FloatingCyberDock
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Project Enquiry OS Modal with Scope Pre-fill */}
      <ContactDrawer
        isOpen={isContactModalOpen}
        onClose={handleCloseProjectModal}
        preselectedService={preselectedService}
        initialDescription={preselectedScope}
      />

      {/* Cyber-OS Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenProjectModal={handleOpenProjectModal}
        onOpenStudioDeck={() => setIsStudioDeckOpen(true)}
        onOpenSystemHealth={() => setIsSystemHealthOpen(true)}
      />

      {/* Executive Studio Credentials Deck Modal */}
      <StudioDeckModal
        isOpen={isStudioDeckOpen}
        onClose={() => setIsStudioDeckOpen(false)}
      />

      {/* Studio System Health & Live Sprint Availability Telemetry Modal */}
      <StudioHealthModal
        isOpen={isSystemHealthOpen}
        onClose={() => setIsSystemHealthOpen(false)}
        onOpenProjectModal={() => handleOpenProjectModal("High-Velocity Sprint")}
      />
    </SmoothScroll>
  );
}
