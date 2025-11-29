import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
// import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["CinaGEO", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Serif", ...defaultTheme.fontFamily.serif],
        mono: ["Iosevka Etoile", ...defaultTheme.fontFamily.mono],
        fraunces: ["Fraunces", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // Focus.AI Brand Colors
        paper: "#faf9f6",
        ink: "#161616",
        graphite: "#4a4a4a",
        petrol: "#0e3b46",
        vermilion: "#c3471d",
        // Tinted Backgrounds
        tint: {
          cool: "#edf6f8",
          sage: "#eef6ee",
          warm: "#f7f0e6",
          lavender: "#f2eef6",
          aqua: "#edf6f6",
        },
      },
      daisyui: {
        themes: ["light"],
      },
    },
  },
  plugins: [typography /*daisyui*/],
};
