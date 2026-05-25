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
      filter: (page) => {
        // Strip pathname from absolute URL for matching
        let path;
        try {
          path = new URL(page).pathname;
        } catch {
          path = page;
        }
        // Exclude dev-only / scratch / index pages from the public sitemap.
        // Keep these in sync with the placeholder pages they correspond to:
        //   - /drafts, /draft     dev-only draft listings (drafts.astro, draft.md)
        //   - /emails             dev-only newsletter analytics (emails.astro)
        //   - /tags               tag index (kept private; individual tag pages stay)
        const excluded = [
          "/drafts",
          "/drafts/",
          "/draft",
          "/draft/",
          "/emails",
          "/emails/",
          "/tags",
          "/tags/",
        ];
        if (excluded.includes(path)) return false;
        // Drop any redirect stubs (Astro emits these for static redirects).
        // The redirect targets are themselves indexed; we don't want both.
        const redirectStubs = [
          "/blog",
          "/blog/",
          "/careers",
          "/careers/",
          "/products",
          "/products/",
          "/studio",
          "/studio/",
          "/ai-maturity",
          "/ai-maturity/",
          "/learnings",
          "/learnings/",
          "/coding-agents",
          "/coding-agents/",
          "/recipes",
          "/recipes/",
        ];
        if (redirectStubs.includes(path)) return false;
        return true;
      },
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
