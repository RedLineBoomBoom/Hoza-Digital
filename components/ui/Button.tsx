"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  withArrow = false,
  href,
  className,
  children,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-mono tracking-wider",
    md: "px-6 py-3.5 text-sm font-medium",
    lg: "px-8 py-4 text-base font-medium tracking-wide",
  };

  const variantClasses = {
    primary:
      "bg-hoza-electric text-hoza-white hover:bg-hoza-electricGlow hover:shadow-electric-md border border-hoza-lavender/30 active:scale-[0.98]",
    secondary:
      "bg-hoza-surface text-hoza-white border border-hoza-violet hover:border-hoza-electric/60 hover:bg-hoza-surfaceHover active:scale-[0.98]",
    outline:
      "bg-transparent text-hoza-white border border-hoza-violet hover:border-hoza-electric hover:bg-hoza-electric/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-hoza-muted hover:text-hoza-white hover:bg-hoza-violet/30",
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center rounded-none font-sans uppercase transition-all duration-200 select-none overflow-hidden group cursor-pointer",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-hoza-white" />
        )}
      </span>
      {/* Interactive violet energy sheen effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
    </>
  );

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 ? "transform 0.4s ease-out" : "transform 0.1s ease-out",
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      className={baseClasses}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {innerContent}
    </button>
  );
};
