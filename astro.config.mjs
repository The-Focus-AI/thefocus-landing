import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import remarkObsidianCallout from "remark-obsidian-callout";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://thefocus.ai",
  integrations: [tailwind(), react()],
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
    remarkPlugins: [remarkObsidianCallout],
  },
  vite: {
    server: {
      allowedHosts: [""],
    },
  },
});
