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
          bg: "#08050D",
          surface: "#150A22",
          surfaceHover: "#1D0F2E",
          violet: "#281044",
          violetBorder: "#341857",
          electric: "#8B5CFF",
          electricGlow: "#9E75FF",
          lavender: "#C8B7FF",
          lavenderMuted: "#A392D6",
          white: "#F5F2FA",
          muted: "#8D8498",
          darkMuted: "#524A5E",
        },
        tactical: {
          black: "#0C0C0C",
          dark: "#0E0E0E",
          surface: "#141414",
          border: "#2A2A2A",
          red: "#F30000",
          redDark: "#C00B0B",
          offwhite: "#FFF7EA",
          grey: "#B9B9B8",
          cyan: "#00F0FF",
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
        "electric-sm": "0 0 15px -3px rgba(139, 92, 255, 0.35)",
        "electric-md": "0 0 30px -5px rgba(139, 92, 255, 0.45)",
        "electric-lg": "0 0 50px -10px rgba(139, 92, 255, 0.6)",
        "plum-inner": "inset 0 1px 0 0 rgba(200, 183, 255, 0.1)",
      },
      backgroundImage: {
        "hoza-gradient":
          "linear-gradient(135deg, #A478FF 0%, #7138E8 45%, #281044 100%)",
        "radial-violet":
          "radial-gradient(circle at 50% 50%, rgba(139, 92, 255, 0.15) 0%, rgba(8, 5, 13, 0) 70%)",
        "radial-spotlight":
          "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 255, 0.14), transparent 40%)",
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
