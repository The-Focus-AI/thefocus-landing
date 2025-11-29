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
        // Focus.AI Client Brand Colors
        paper: "#faf9f6", // Client: cooler off-white
        ink: "#161616",
        graphite: "#4a4a4a",
        petrol: "#0e3b46",
        vermilion: "#c3471d",
        // Focus.AI Labs Brand Colors
        void: "#1a1a1a", // Labs: primary text
        "rand-blue": "#0055aa", // Labs: primary accent
        "alert-red": "#d93025", // Labs: decorative emphasis
        surface: "#e6e4dc", // Labs: secondary background
        "labs-paper": "#f3f2ea", // Labs: warmer paper background
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
