import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hoza: {
          bg: "#09090B",
          surface: "#121216",
          surfaceHover: "#1A1A20",
          violet: "#27272A",
          violetBorder: "#3F3F46",
          electric: "#D4FF00",
          electricGlow: "#E6FF4D",
          lavender: "#E4E4E7",
          lavenderMuted: "#A1A1AA",
          white: "#F4F4F5",
          muted: "#A1A1AA",
          darkMuted: "#71717A",
        },
        tactical: {
          black: "#09090B",
          dark: "#0E0E11",
          surface: "#141418",
          border: "#27272A",
          red: "#F30000",
          redDark: "#C00B0B",
          offwhite: "#F4F4F5",
          grey: "#A1A1AA",
          cyan: "#00F0FF",
          volt: "#D4FF00",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "electric-sm": "0 0 15px -3px rgba(212, 255, 0, 0.35)",
        "electric-md": "0 0 30px -5px rgba(212, 255, 0, 0.45)",
        "electric-lg": "0 0 50px -10px rgba(212, 255, 0, 0.6)",
        "plum-inner": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "hoza-gradient":
          "linear-gradient(135deg, #D4FF00 0%, #A3C900 45%, #18181B 100%)",
        "radial-violet":
          "radial-gradient(circle at 50% 50%, rgba(212, 255, 0, 0.12) 0%, rgba(9, 9, 11, 0) 70%)",
        "radial-spotlight":
          "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 255, 0, 0.12), transparent 40%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ticker-left": "tickerLeft 35s linear infinite",
        "ticker-left-slow": "tickerLeft 50s linear infinite",
        "ticker-left-fast": "tickerLeft 22s linear infinite",
        "ticker-right": "tickerRight 35s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        tickerLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        tickerRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
