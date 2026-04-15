# AutoResearch — Brief for Business Partner

**What it is:** An autonomous optimization loop for our marketing site. We give an AI coding agent a written “research agenda” (`program.md`), a scoring function (`evaluate.sh`), and a runner (`run.sh`). The agent proposes one small change at a time, measures impact, and **keeps improvements and reverts everything else** — same idea as [Karpathy’s autoresearch](https://github.com/karpathy/autoresearch), but for the website instead of model training.

**Why we did it:** Raise conversion-quality signals: faster/more accessible pages, clearer SEO, and stronger copy — without shipping a giant unreviewed rewrite. Every kept change had to beat the prior score.

**What we measured**

- **Lighthouse** (performance, accessibility, SEO, best practices) on three URLs — averaged with fixed weights.
- **Optional copy score:** a single number from Claude on the built homepage HTML (clarity, persuasion, brand voice, CTAs, hierarchy). Requires an Anthropic API key and billing.

**Outcomes (high level)**

| Area | Direction |
|------|-----------|
| Technical / Lighthouse | Strong accessibility and SEO; performance and best practices held high. |
| Copy | Clearer hero and CTAs; tighter insight and engagement sections; more concrete social proof where we had facts. |
| SEO / discovery | `robots.txt`, titles/descriptions, structured data (JSON-LD) where relevant. |
| Risk | Experiments on a **feature branch**; bad edits reverted. Review via normal **pull request** before production. |

**How to steer it:** Edit `program.md` — what to optimize, what’s off limits, and which dimensions matter (copy vs. SEO vs. performance). That’s the human “judgment layer”; the agent handles execution and measurement.

**Using the same system on your site**

Step-by-step instructions (build folders, URLs, env vars, `program.md` rewrite) are in **[PORTING.md](PORTING.md)**. Copy the two scripts from `docs/autoresearch/scripts/` into your repo root, adjust paths, and run `./evaluate.sh` for a baseline.

**Files in this folder**

- [README.md](README.md) — setup, how to run, FAQ  
- [PORTING.md](PORTING.md) — **adapt to another website**  
- [program.md](program.md) — full research agenda and constraints  
- [scripts/](scripts/) — `evaluate.sh` and `run.sh` templates  

Raw Lighthouse/build logs under `.autoresearch/` are intentionally **not** for git — keep them gitignored.
