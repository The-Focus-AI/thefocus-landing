# AutoResearch for TheFocus.AI

Adapted from [Karpathy's autoresearch](https://github.com/karpathy/autoresearch) for website optimization instead of ML training.

The same core loop — propose a change, measure the result, keep or revert — applied to your landing site's performance, accessibility, SEO, and copy quality.

## Documentation map

| Doc | Audience |
|-----|----------|
| [PARTNER-BRIEF.md](PARTNER-BRIEF.md) | Business partner — what it is, why, outcomes |
| [PORTING.md](PORTING.md) | **Using this on another website** — paths, build dirs, env vars |
| [program.md](program.md) | Research agenda the agent follows (edit to steer) |
| [scripts/evaluate.sh](scripts/evaluate.sh) | Scoring script (copy to repo root to run) |
| [scripts/run.sh](scripts/run.sh) | Autonomous runner (copy to repo root) |

## How it works

```
program.md  →  Claude Code  →  one change  →  npm run build  →  ./evaluate.sh
                                                                    │
                                              better? commit : revert
```

## Setup (this repo)

**Portable scripts** live under `docs/autoresearch/scripts/`. To run AutoResearch from the **repository root** (next to `package.json`), copy them up (or keep a symlink):

```bash
cp docs/autoresearch/scripts/evaluate.sh docs/autoresearch/scripts/run.sh .
cp docs/autoresearch/program.md .   # optional: use root copy for Claude Code
chmod +x evaluate.sh run.sh
```

Ensure `.gitignore` includes:

```gitignore
.autoresearch/
experiments.log
```

### Dependencies

```bash
npm install -g lighthouse serve
npm install -g @anthropic-ai/claude-code
```

### Environment (copy scoring)

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

## Running

```bash
./evaluate.sh
./evaluate.sh --with-llm
./run.sh --with-llm
```

For **`--with-llm`**, the copy scorer uses Node + `JSON.stringify` (safe HTML escaping). Do not replace it with a naive `curl` body containing raw HTML — JSON breaks on quotes.

`run.sh` calls `claude -p --dangerously-skip-permissions` so unattended loops work; tighten permissions if you only run interactively.

## Reading results

- `experiments.log` — one line per evaluation  
- `.autoresearch/` — JSON + Lighthouse artifacts (should stay gitignored)  
- `git log` on your `autoresearch/*` branch — commits that improved the score  

## FAQ

**Different framework?** See [PORTING.md](PORTING.md).

**How is this different from Lighthouse alone?** Lighthouse reports; this tries edits and keeps only what raises the composite score.

**Production safety?** Work on a feature branch; merge after human review (e.g. pull request).
