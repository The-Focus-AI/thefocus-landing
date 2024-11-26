import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import remarkObsidianCallout from "remark-obsidian-callout";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
    remarkPlugins: [remarkObsidianCallout],
  },
});
