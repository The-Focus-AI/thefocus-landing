import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import remarkObsidianCallout from "remark-obsidian-callout";
import fs from "fs";
import { ogimage } from "./src/components/ogimage";

import opengraphImages from "astro-opengraph-images";

const opengraphImagesConfig = {
  options: {
    fonts: [
      {
        name: "DM Sans",
        weight: 400,
        style: "normal",
        data: fs.readFileSync(
          "node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff"
        ),
      },
    ],
  },
  render: ogimage,
};

// https://astro.build/config
export default defineConfig({
  site: "https://thefocus.ai",
  integrations: [tailwind(), opengraphImages(opengraphImagesConfig)],
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
    remarkPlugins: [remarkObsidianCallout],
  },
});
