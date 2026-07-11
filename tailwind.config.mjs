import defaultTheme from "tailwindcss/defaultTheme";

/**
 * "The Ledger" design system — see DESIGN.md in The-Focus-AI/thefocus-v2.
 * Near-black canvas, drab-olive signal, hairline borders, square corners.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,md,mdx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        canvas: "#0A0A0A",
        surface: "#111111",
        signal: "#556B2F",
      },
    },
  },
  plugins: [],
};
