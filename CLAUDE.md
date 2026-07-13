## Learning and Memory Management

- YOU MUST use the journal tool frequently to capture technical insights, failed approaches, and user preferences
- Before starting complex tasks, search the journal for relevant past experiences and lessons learned
- Document architectural decisions and their outcomes for future reference
- Track patterns in user feedback to improve collaboration over time
- When you notice something that should be fixed but is unrelated to your current task, document it in your journal rather than fixing it immediately

## What this repo is

The marketing site for thefocus.ai — a lean Astro + Tailwind site on "The
Ledger" design system, deployed to GitHub Pages. Blog posts, recipes, and
reports do NOT live here anymore; they moved to labs.thefocus.ai
(`The-Focus-AI/labs`). If asked to add editorial content, it belongs in the
labs repo, not here.

## Design system — The Ledger

Source of truth: `DESIGN.md` and `brand/brand-brief.md` in the
`The-Focus-AI/thefocus-v2` repo. The rules that matter most:

- Canvas `#0A0A0A`, surface `#111111`, single accent: drab olive `#556B2F` (never neon, never a large fill)
- Inter for display/body (headlines 600, tight tracking); IBM Plex Mono for labels and figures ("01 — FIND")
- Hairline `white/10` borders for containment; **no drop shadows, no rounded corners** (the Habitats device frame is the one sanctioned exception)
- Primary CTA: solid white on black, 1–2 per page; everything else ghost
- Voice: measured, anti-hype. Banned: "transform", "revolutionize", "unlock", "supercharge", "game-changer", "sovereign", "AI-native"

## Redirects

`redirects.mjs` maps every legacy URL (old posts/recipes/reports/tags/pages)
to labs.thefocus.ai or the new pages. GitHub Pages has no server redirects, so
Astro generates `<meta refresh>` pages. If content moves again, update that map
— never delete a published URL without a redirect.
