import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import redirects from "./redirects.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://thefocus.ai",
  trailingSlash: "ignore",
  integrations: [tailwind(), sitemap()],
  redirects,
});
