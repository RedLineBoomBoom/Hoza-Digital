"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HozaLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  height?: number | string;
  glow?: boolean;
}

export const HozaLogo: React.FC<HozaLogoProps> = ({
  className,
  height = 32,
  glow = false,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 448 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-auto text-tactical-offwhite transition-colors",
        glow && "drop-shadow-[0_0_15px_rgba(212,255,0,0.3)]",
        className
      )}
      style={{ height, width: "auto" }}
      {...props}
    >
      {/* Letter H */}
      <polygon
        points="0,0 22,0 22,32 62,32 62,0 84,0 84,82 62,82 62,51 22,51 22,82 0,82"
        fill="currentColor"
      />

      {/* Letter O */}
      <path
        fillRule="evenodd"
        d="M 118,0 H 176 L 197,21 V 61 L 176,82 H 118 L 97,61 V 21 Z M 129,21 H 165 L 175,31 V 51 L 165,61 H 129 L 119,51 V 31 Z"
        fill="currentColor"
      />

      {/* Pulsing Cyan Core in the center of O */}
      <circle
        cx="147"
        cy="41"
        r="6"
        fill="#D4FF00"
        className="animate-pulse shadow-[0_0_12px_#D4FF00]"
      />

      {/* Letter Z */}
      <polygon
        points="215,0 319,0 319,20 256,63 319,63 319,82 215,82 215,63 278,19 215,19"
        fill="currentColor"
      />

      {/* Letter A */}
      <path
        fillRule="evenodd"
        d="M 375,0 H 403 L 448,82 H 423 L 412,65 H 366 L 355,82 H 330 Z M 389,21.5 L 404,50 H 374 Z"
        fill="currentColor"
      />
    </svg>
  );
};
