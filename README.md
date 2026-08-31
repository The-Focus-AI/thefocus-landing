# TheFocus.AI — Marketing Site

The marketing site for [TheFocus.AI](https://thefocus.ai), built with Astro +
Tailwind and deployed to GitHub Pages. This is the v2 rebuild on "The Ledger"
design system.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Org Age consultancy overview, practices, maturity ladder, and engagement model |
| `/data/` | Intelligent Data practice |
| `/software/` | Intelligent Software and Gaia practice |
| `/organization/` | Intelligent Organization and Habitats practice |
| `/book/` | The Org Age of AI book landing page |
| `/work/` | Case studies index (TezLab featured) |
| `/work/perplexity-samsung/` | Case study — Perplexity on Samsung Smart TVs |
| `/work/ae-networks/` | Case study — A+E Networks data QA |
| `/work/steering-house/` | Case study — QuickBooks reconciliation |
| `/habitats/` | Habitats product page |
| `/studio/` | Inside the Studio + demo-night signup |

Everything editorial (posts, recipes, reports) lives at
[labs.thefocus.ai](https://labs.thefocus.ai) (`The-Focus-AI/labs`). Legacy URLs
(`/posts/*`, `/recipes/*`, `/reports/*`, `/insights`, `/tools`, tag pages, …)
redirect there via the map in `redirects.mjs` — Astro turns each entry into a
`<meta refresh>` page at build time, since GitHub Pages has no server-side
redirects. The map was built against the live sitemaps of both sites.

## Design system

"The Ledger" — near-black canvas (`#0A0A0A`), drab-olive signal (`#556B2F`),
Inter + IBM Plex Mono, hairline borders, square corners. The source of truth
(full DESIGN.md, brand brief, voice rules, locked mockups) lives in the
`The-Focus-AI/thefocus-v2` repo. Keep new work consistent with it — in
particular: no second accent color, no rounded corners, no drop shadows, no
hype copy.

## Development

```bash
mise run dev     # dev server on 0.0.0.0:4321
mise run build   # production build into dist/
mise run test    # build as a smoke test
```

Requires node 24 + pnpm 10 (managed by [mise](https://mise.jdx.dev)). Plain
`pnpm install && pnpm build` also works.

## Deployment

Pushes to `main` build and deploy to GitHub Pages via
`.github/workflows/deploy.yml` (custom domain `thefocus.ai`, see
`public/CNAME`). `mise run deploy` publishes a preview to pgs.sh.

## Layout

```
src/
  layouts/BaseLayout.astro       # head/meta/fonts/nav/footer + reveal script
  layouts/CaseStudyLayout.astro  # shared case-study chrome
  components/                    # Nav, Footer, CtaBand, Icon
  pages/                         # one .astro file per page
  styles/global.css              # Tailwind + shared Ledger utilities
public/assets/                   # photography, logos, Habitats live demos
redirects.mjs                    # legacy URL → labs/new-page map
```
