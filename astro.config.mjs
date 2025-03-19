import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import remarkObsidianCallout from "remark-obsidian-callout";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://thefocus.ai",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: "daily",
      lastmod: new Date(),
      priority: 0.8,
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
    remarkPlugins: [remarkObsidianCallout],
  },
  vite: {
    server: {
      allowedHosts: ["214e-108-58-192-206.ngrok-free.app"],
    },
  },
});
