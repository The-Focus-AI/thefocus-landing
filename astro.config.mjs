import { defineConfig } from "astro/config";
import { existsSync } from "node:fs";
import { join } from "node:path";

import tailwind from "@astrojs/tailwind";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import remarkObsidianCallout from "remark-obsidian-callout";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";


// https://astro.build/config
export default defineConfig({
  site: "https://thefocus.ai",
  trailingSlash: "ignore",
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
      fs: {
        strict: false,
      },
    },
    appType: "mpa",
    plugins: [
      {
        name: "static-index-html",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || "";
            // Handle /reports/ paths - try to serve index.html for directories
            if (url.startsWith("/reports/")) {
              // Try appending index.html to see if it's a directory
              const targetPath = url.endsWith("/") ? url + "index.html" : url + "/index.html";
              const publicPath = join(process.cwd(), "public", targetPath);
              if (existsSync(publicPath)) {
                req.url = targetPath;
              }
            }
            next();
          });
        },
      },
    ],
  },
});
