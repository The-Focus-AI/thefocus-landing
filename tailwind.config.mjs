import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Serif", ...defaultTheme.fontFamily.serif],
        mono: ["Iosevka Etoile", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [typography],
};
