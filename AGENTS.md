# TheFocus.AI marketing site agent guide

This project follows TheFocus.AI standards. It is a lean Astro + Tailwind
marketing site for TheFocus.AI, built on "The Ledger" design system.

## First files to read

1. `AGENTS.md` — this guide.
2. `README.md` — site purpose, pages, and project structure.
3. `CLAUDE.md` — design-system and redirect rules.
4. `mise.toml` — project tools, setup, build, and deployment tasks.
5. `redirects.mjs` — legacy URL → labs.thefocus.ai redirect map.

## Operating rules

- Use mise for tools and runtimes. Do not install project tooling globally.
- Use pnpm for JavaScript/TypeScript packages.
- Use `mise run ...` tasks where possible.
- Preserve TheFocus.AI naming exactly. Do not use the shortened dotted company name.
- Editorial content (posts, recipes, reports) belongs in `The-Focus-AI/labs`, not here.
- Never delete a published URL without adding a redirect to `redirects.mjs`.
- Follow The Ledger design system (`The-Focus-AI/thefocus-v2` → `DESIGN.md`): one olive accent, square corners, no shadows, no hype copy.

## Learning and memory management

- Use the journal tool when available to capture technical insights, failed approaches, and user preferences.
- Before starting complex tasks, search the journal for relevant past experiences and lessons learned.
- Document architectural decisions and their outcomes for future reference.
- When you notice something that should be fixed but is unrelated to your current task, document it rather than fixing it opportunistically.

## Quality bar

Before declaring work complete, run the relevant checks:

```bash
mise run lint
mise run test
```

If a command cannot run, explain why and what remains to be done.
