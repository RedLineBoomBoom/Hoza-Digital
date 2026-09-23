import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  variant?: "status" | "tech" | "outline" | "highlight";
  active?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  variant = "tech",
  active = false,
  className,
  icon,
}) => {
  const variantStyles = {
    status:
      "bg-hoza-surface text-[#D4FF00]/70 border border-[#D4FF00]/20 px-3 py-1 font-mono text-[11px] tracking-wider",
    tech: "bg-hoza-surface/80 text-hoza-muted hover:text-hoza-white hover:border-[#D4FF00]/50 border border-[#D4FF00]/20 px-3 py-1.5 font-mono text-xs transition-colors",
    outline:
      "border border-[#D4FF00]/20 text-hoza-muted hover:text-[#D4FF00]/70 px-3 py-1 text-xs font-mono",
    highlight:
      "bg-[#D4FF00]/15 text-[#D4FF00]/70 border border-[#D4FF00]/40 px-3 py-1 font-mono text-xs shadow-electric-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-none transition-all uppercase select-none",
        variantStyles[variant],
        active && "border-[#D4FF00] text-hoza-white shadow-electric-sm",
        className
      )}
    >
      {variant === "status" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4FF00]"></span>
        </span>
      )}
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
