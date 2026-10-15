import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0A0612",
          900: "#120924",
          800: "#1A0F35",
        },
        brand: {
          DEFAULT: "#6C2BD9",
          light: "#8B5CF6",
        },
        glow: {
          pink: "#EC4899",
          lilac: "#C084FC",
          cyan: "#06B6D4",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          soft: "#E2E8F0",
          mute: "#94A3B8",
        },
      },
      fontFamily: {
        arabic: ["var(--font-tajawal)", "sans-serif"],
        latin: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        neu: "8px 8px 20px rgba(0,0,0,0.45), -6px -6px 16px rgba(255,255,255,0.04)",
        glow: "0 0 32px rgba(108,43,217,0.45)",
        "glow-pink": "0 0 28px rgba(236,72,153,0.35)",
        "glow-cyan": "0 0 28px rgba(6,182,212,0.35)",
      },
      backgroundImage: {
        mesh: "radial-gradient(ellipse at 20% 0%, rgba(108,43,217,0.28), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.18), transparent 45%), radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.12), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
