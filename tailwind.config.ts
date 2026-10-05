import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * SolarFeed Hubs design tokens. Every colour maps to a CSS variable in
 * src/styles/globals.css so the same palette is available to SVG and charts.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        navy: "rgb(var(--navy) / <alpha-value>)",
        hub: {
          DEFAULT: "rgb(var(--hub) / <alpha-value>)",
          dark: "rgb(var(--hub-dark) / <alpha-value>)",
        },
        amber: {
          DEFAULT: "rgb(var(--amber) / <alpha-value>)",
          text: "rgb(var(--amber-text) / <alpha-value>)",
        },
        alert: "rgb(var(--alert) / <alpha-value>)",
        cream: "rgb(var(--cream) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          2: "rgb(var(--muted-2) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        sans: ["Figtree", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      fontSize: {
        body: ["1.0625rem", { lineHeight: "1.65" }],
        h1: ["clamp(2.625rem, 1.6rem + 4.4vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        h2: ["clamp(2rem, 1.45rem + 2.3vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        stat: ["clamp(2.5rem, 1.8rem + 2.8vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        card: "1.5rem",
        panel: "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(2 27 47 / 0.04), 0 12px 32px -12px rgb(2 27 47 / 0.12)",
        lift: "0 2px 4px rgb(2 27 47 / 0.05), 0 28px 56px -24px rgb(2 27 47 / 0.28)",
        float: "0 2px 6px rgb(2 27 47 / 0.06), 0 40px 80px -32px rgb(2 27 47 / 0.35)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "pulse-dot": {
          "0%": { boxShadow: "0 0 0 0 rgb(232 163 61 / 0.6)" },
          "70%": { boxShadow: "0 0 0 10px rgb(232 163 61 / 0)" },
          "100%": { boxShadow: "0 0 0 0 rgb(232 163 61 / 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)",
        "pulse-dot": "pulse-dot 2.2s cubic-bezier(0.2, 0.7, 0.2, 1) infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
