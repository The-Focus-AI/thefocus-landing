# TheFocus.AI landing site agent guide

This project follows TheFocus.AI standards. It is an Astro + React + Tailwind landing/content site for TheFocus.AI Studio and TheFocus.AI Labs.

## First files to read

1. `AGENTS.md` — this guide.
2. `README.md` — site purpose, content workflow, and project structure.
3. `mise.toml` — project tools, setup, build, and deployment tasks.
4. `fnox.toml` — secret declarations only; never secret values.
5. `docs/agents/issue-workflow.md` — GitHub Issues / PRD workflow.
6. `CLAUDE.md` — legacy local guidance, especially image/header style notes.
7. `src/content/` — posts, recipes, and content collections.
8. `src/content/assets/cards/` — blog/card header image references.

## Operating rules

- Use mise for tools and runtimes. Do not install project tooling globally.
- Use pnpm for JavaScript/TypeScript packages.
- Use fnox + 1Password for secrets. Do not commit plaintext env files or secret values.
- Use `mise run ...` tasks where possible.
- Install/update agent skills with `npx skills add ...`; do not manually copy skill directories.
- Preserve TheFocus.AI naming exactly. Do not use the shortened dotted company name.

## Learning and memory management

- Use the journal tool when available to capture technical insights, failed approaches, and user preferences.
- Before starting complex tasks, search the journal for relevant past experiences and lessons learned.
- Document architectural decisions and their outcomes for future reference.
- Track patterns in user feedback to improve collaboration over time.
- When you notice something that should be fixed but is unrelated to your current task, document it rather than fixing it opportunistically.

## Content and brand notes

- Header images for blog posts go in `src/content/assets/cards/` and are referenced from frontmatter as `image: filename.png`.
- Use the `focus-ai-brand` skill for brand guidance.
- Use nano-banana skills for image generation when needed.
- Prefer visual metaphors over literal depictions and never include text overlays in header images.

### Post header image style

Generate images using nano-banana with these characteristics:

- **Aesthetic**: impasto oil painting with thick brushstrokes, vintage illustration, or risograph style.
- **Subject**: visual metaphors for the post concept, not literal depictions.
- **Colors**: warm earth tones — ochre, deep blue, burnt sienna, cream, limited palette.
- **Format**: wide 16:9 aspect ratio.
- **Mood**: contemplative, atmospheric, moody lighting.
- **No text**: never include text overlays in header images.

Example prompt structure:

```text
Wide 16:9 impasto oil painting in the style of Van Gogh with thick visible brushstrokes. [METAPHORICAL SCENE DESCRIPTION]. Warm earth tones — ochre, deep blue, burnt sienna, cream. Moody atmospheric lighting. No text.
```

Reference existing cards in `src/content/assets/cards/`:

- `good-for-human-good-for-ai-header.png` — human + robot working together, heavy impasto.
- `mcp_wide.png` — craftsperson in workshop, moody lighting.
- `yolo_wide.png` — vintage risograph style, limited colors.
- `moral_vibe_check_wide.png` — graphic novel style, person looking at statue reflection.

## Planning workflow

Use the installed planning skills when appropriate:

- `grill-me` or `grill-with-docs` to clarify ambiguous plans.
- `to-prd` for non-trivial product/workflow changes.
- `to-issues` to split PRDs/plans into GitHub Issues.
- `prototype` for throwaway validation of UI or content workflow ideas.

Default issue tracker: GitHub Issues for `The-Focus-AI/thefocus-landing`.

## Quality bar

Before declaring work complete, run the relevant checks:

```bash
mise run lint
mise run test
```

If a command cannot run, explain why and what remains to be done.
