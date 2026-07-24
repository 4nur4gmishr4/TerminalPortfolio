import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        foreground: "#16221B",
        primary: "#0A6157",
        secondary: "#AD3D4B",
        muted: {
          DEFAULT: "#EEF1ED",
          foreground: "#66756C",
        },
        border: "#D6DDD7",
        input: "#D6DDD7",
        ring: "#0A6157",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#16221B",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#16221B",
        },
        destructive: {
          DEFAULT: "#9D2638",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
        lg: "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
