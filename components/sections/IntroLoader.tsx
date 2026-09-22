"use client";

import React, { useEffect, useState } from "react";

import { HozaLogo } from "@/components/ui/HozaLogo";

export const IntroLoader: React.FC<{ onComplete?: () => void }> = ({
  onComplete,
}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALISING HOZA");

  useEffect(() => {
    // Check session storage to ensure it doesn't repeat repeatedly in the same session
    const hasBooted = sessionStorage.getItem("hoza_session_booted");
    if (hasBooted) {
      if (onComplete) onComplete();
      return;
    }

    setVisible(true);

    const startTime = Date.now();
    const duration = 1200; // 1.2s max duration

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct > 35 && pct < 70) {
        setStatusText("DESIGN / DEVELOP / DEPLOY");
      } else if (pct >= 70) {
        setStatusText("SYSTEM READY — FAST FORWARD");
      }

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("hoza_session_booted", "true");
          if (onComplete) onComplete();
        }, 150);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-tactical-black transition-opacity duration-300 select-none pointer-events-auto"
      style={{
        opacity: progress >= 100 ? 0 : 1,
      }}
    >
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        {/* Official Hoza Vector Brandmark */}
        <div className="flex items-center justify-center mb-8 relative">
          <HozaLogo height={36} glow className="h-8 sm:h-9 w-auto text-tactical-offwhite" />
        </div>

        {/* Telemetry Status Line */}
        <div className="flex justify-between items-center w-full font-mono text-[11px] text-tactical-grey mb-3 tracking-widest uppercase">
          <span>// {statusText}</span>
          <span className="text-tactical-cyan font-bold">[{progress}%]</span>
        </div>

        {/* Accelerating progress bar */}
        <div className="w-full h-[2px] bg-tactical-border overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-tactical-red via-tactical-cyan to-white transition-all ease-out"
            style={{
              width: `${progress}%`,
              transitionDuration: "40ms",
            }}
          />
        </div>

        <div className="flex justify-between items-center w-full font-mono text-[10px] text-tactical-grey/60 mt-3 tracking-wider uppercase">
          <span>[06°12'S 106°49'E]</span>
          <span>SYS_BOOT // TACTICAL_2.0</span>
        </div>
      </div>
    </div>
  );
};
