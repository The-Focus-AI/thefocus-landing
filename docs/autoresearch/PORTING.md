# Porting AutoResearch to Your Website

This guide is for **Will** (or anyone) who wants the same autonomous measure → improve → keep/revert loop on **another** codebase. TheFocus.AI uses Astro + static `dist/` output; your stack may differ — the scripts are easy to retarget.

## What you copy

From this repository, copy these into **your site’s git root** (same folder as `package.json`):

| File | Source in thefocus-landing |
|------|----------------------------|
| `evaluate.sh` | [`docs/autoresearch/scripts/evaluate.sh`](scripts/evaluate.sh) |
| `run.sh` | [`docs/autoresearch/scripts/run.sh`](scripts/run.sh) |
| `program.md` | Start from [`program.md`](program.md) and rewrite for your product, voice, and file paths |

Then:

```bash
chmod +x evaluate.sh run.sh
```

Add to **your** `.gitignore`:

```gitignore
.autoresearch/
experiments.log
```

## Prerequisites

- **Node.js 18+** and `npm install` works for your project  
- **`npm run build`** produces a **static folder** you can serve with [`serve`](https://www.npmjs.com/package/serve)  
- **Chrome or Chromium** (Lighthouse uses it headless)  
- **Optional:** [Anthropic API key](https://console.anthropic.com/) for copy scoring (`./evaluate.sh --with-llm`)  
- **Optional:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI for the full `./run.sh` autonomous loop (`npm install -g @anthropic-ai/claude-code`)

Global installs (or use `npx`):

```bash
npm install -g lighthouse serve
```

## 1. Build output directory

| Stack | Typical output dir | Set env |
|-------|--------------------|---------|
| Astro / Vite | `dist` | default — no change |
| Next.js (`output: 'export'`) | `out` | `export BUILD_OUTPUT_DIR=out` |
| Other | (your docs) | `export BUILD_OUTPUT_DIR=…` |

Example one-off eval:

```bash
BUILD_OUTPUT_DIR=out ./evaluate.sh
```

## 2. URLs Lighthouse should hit

Edit **`evaluate.sh`** — find the `PAGES` and `PAGE_NAMES` arrays. Replace paths with **real routes** on your site (no typos; 404s tank scores).

```bash
PAGES=(
  "${BASE_URL}/"
  "${BASE_URL}/pricing"
  "${BASE_URL}/about"
)
PAGE_NAMES=("homepage" "pricing" "about")
```

Keep `PAGE_COUNT` in sync (length of `PAGES`).

## 3. Homepage HTML for copy scoring

The LLM reads one file to score messaging. Defaults to **`dist/index.html`** (or `${BUILD_OUTPUT_DIR}/index.html`).

- If your home page is **`out/index.html`**, set `BUILD_OUTPUT_DIR=out` — path follows automatically.  
- If the home build lives elsewhere (e.g. `dist/en/index.html`), set:

```bash
export HOMEPAGE_HTML=dist/en/index.html
./evaluate.sh --with-llm
```

## 4. Build command

The script runs **`npm run build`**. If you use `pnpm build`, either:

- Add an npm script `"build": "pnpm run build"`, or  
- Edit `evaluate.sh` and replace `npm run build` with your command (one line).

## 5. Rewrite `program.md`

The agent reads this file as **your** research charter. Replace:

- Company name, offer, ICP, brand voice  
- “Key files you’ll touch” with **your** paths (`src/app/...`, `pages/...`, etc.)  
- Dimensions and **off-limits** (e.g. don’t invent testimonials)

Without a good `program.md`, the agent optimizes the wrong things.

## 6. Run a baseline (no agent)

```bash
./evaluate.sh
./evaluate.sh --with-llm   # needs ANTHROPIC_API_KEY
```

## 7. Full autonomous loop

```bash
export ANTHROPIC_API_KEY=sk-ant-...
./run.sh --with-llm
```

`run.sh` uses `claude -p --dangerously-skip-permissions` so the agent can edit files and run shell commands without interactive approvals. Use only on a repo you trust; work stays on a new `autoresearch/*` branch until you merge.

If you prefer not to use that flag, run `claude` manually and paste instructions from `run.sh`’s prompt.

## 8. SPA / client-only apps

Lighthouse needs **real URLs** that return HTML with content. Pure setups that ship an empty shell and render everything in the browser will get weak SEO/accessibility scores and aren’t a great fit for this **static preview** flow. Prefer running against an **exported static** build or **SSR preview** if you add a `next start` style server (you’d change the `serve` step in `evaluate.sh` to match).

## 9. Troubleshooting

| Issue | What to check |
|--------|----------------|
| Copy score always 0 | `ANTHROPIC_API_KEY`, billing, `HOMEPAGE_HTML` path exists after build |
| Lighthouse failures | Chrome installed, URLs in `PAGES` correct, port `SERVE_PORT` free (default 4567) |
| Build fails | `npm run build` locally; script logs in `.autoresearch/build_*.log` |
| Wrong composite | Edit weights in `evaluate.sh` (comment block above composite calculation) |

## Reference docs

- [README.md](README.md) — workflow and FAQ  
- [PARTNER-BRIEF.md](PARTNER-BRIEF.md) — non-technical overview  
