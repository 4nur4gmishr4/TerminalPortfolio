import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "inverse-on-surface": "#29313c",
        "on-tertiary-fixed-variant": "#25496c",
        "surface-variant": "#2d3541",
        "tertiary-container": "#c0dcff",
        "primary-container": "#00f0ff",
        "surface-container-highest": "#2d3541",
        "secondary-container": "#d7e404",
        "surface": "#0c141e",
        "primary": "#dbfcff",
        "surface-container-lowest": "#070f19",
        "background": "#0c141e",
        "inverse-primary": "#006970",
        "on-background": "#dbe3f2",
        "secondary-fixed-dim": "#c3d000",
        "tertiary-fixed": "#d0e4ff",
        "on-tertiary-fixed": "#001d35",
        "primary-fixed-dim": "#00dbe9",
        "outline-variant": "#3b494b",
        "on-secondary-container": "#5d6400",
        "on-surface-variant": "#b9cacb",
        "surface-container-low": "#141c27",
        "on-primary-container": "#006970",
        "on-primary-fixed-variant": "#004f54",
        "on-primary": "#00363a",
        "on-secondary": "#2f3300",
        "error": "#ffb4ab",
        "on-error-container": "#ffdad6",
        "surface-container": "#18202b",
        "surface-tint": "#00dbe9",
        "outline": "#849495",
        "surface-dim": "#0c141e",
        "on-error": "#690005",
        "error-container": "#93000a",
        "secondary-fixed": "#dfed1a",
        "on-surface": "#dbe3f2",
        "tertiary": "#f2f6ff",
        "inverse-surface": "#dbe3f2",
        "tertiary-fixed-dim": "#a7caf3",
        "on-tertiary": "#063254",
        "on-primary-fixed": "#002022",
        "primary-fixed": "#7df4ff",
        "surface-container-high": "#232a36",
        "on-secondary-fixed": "#1b1d00",
        "on-tertiary-container": "#3e6186",
        "secondary": "#f5ff7d",
        "surface-bright": "#323a45",
        "on-secondary-fixed-variant": "#454a00",
        
        // Retaining essential shadcn vars mapping to the new theme roughly
        border: "#3b494b", // outline-variant
        input: "#141c27", // surface-container-low
        ring: "#00dbe9", // primary-fixed-dim
        foreground: "#dbe3f2", // on-surface
        destructive: {
          DEFAULT: "#ffb4ab", // error
          foreground: "#690005", // on-error
        },
        muted: {
          DEFAULT: "#18202b", // surface-container
          foreground: "#b9cacb", // on-surface-variant
        },
        accent: {
          DEFAULT: "#00f0ff", // primary-container
          foreground: "#006970", // on-primary-container
        },
        popover: {
          DEFAULT: "#2d3541", // surface-container-highest
          foreground: "#dbe3f2", // on-surface
        },
        card: {
          DEFAULT: "#0c141e", // surface
          foreground: "#dbe3f2", // on-surface
        },
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "sm": "0.125rem", // 2px
        "md": "0.25rem", // 4px
        "lg": "0.5rem", // 8px
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "xs": "4px",
        "unit": "4px",
        "sm": "8px",
        "md": "16px",
        "gutter": "16px",
        "lg": "24px",
        "xl": "48px",
        "window-padding": "20px"
      },
      fontFamily: {
        "headline-md": ["Geist", "sans-serif"],
        "data-mono": ["JetBrains Mono", "monospace"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "display-lg": ["Geist", "sans-serif"],
        "body-base": ["Geist", "sans-serif"],
        "headline-lg-mobile": ["Geist", "sans-serif"],
        // Retain standard fonts mapping
        sans: ["Geist", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-md": ["24px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500" }],
        "data-mono": ["13px", { "lineHeight": "1.6", "letterSpacing": "-0.01em", "fontWeight": "400" }],
        "label-caps": ["11px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600" }],
        "body-base": ["14px", { "lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }]
      },
      keyframes: {
        "shimmer": {
          "100%": { transform: "translateX(100%)" }
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(2px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
          "100%": { transform: "translate(0)" }
        }
      },
      animation: {
        "shimmer": "shimmer 1.5s infinite",
        "glitch": "glitch 0.2s ease-in-out infinite"
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
} satisfies Config;