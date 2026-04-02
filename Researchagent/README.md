# AutoResearch for TheFocus.AI

Adapted from [Karpathy's autoresearch](https://github.com/karpathy/autoresearch) for website optimization instead of ML training.

The same core loop — propose a change, measure the result, keep or revert — but applied to your landing site's performance, accessibility, SEO, and copy quality.

## How It Works

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   program.md          ← you iterate on this     │
│   (research agenda)                             │
│         │                                       │
│         ▼                                       │
│   Claude Code         ← agent iterates on code  │
│   (autonomous agent)                            │
│         │                                       │
│         ▼                                       │
│   Make one change                               │
│         │                                       │
│         ▼                                       │
│   npm run build       ← compile check           │
│         │                                       │
│         ▼                                       │
│   ./evaluate.sh       ← Lighthouse + LLM score  │
│         │                                       │
│    ┌────┴────┐                                  │
│    │         │                                  │
│  better?   worse?                               │
│    │         │                                  │
│  commit    revert                               │
│    │         │                                  │
│    └────┬────┘                                  │
│         │                                       │
│         ▼                                       │
│   next experiment                               │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Setup

### 1. Copy files into your repo

```bash
cd thefocus-landing

# Copy the three files
cp /path/to/program.md .
cp /path/to/evaluate.sh .
cp /path/to/run.sh .

# Make scripts executable
chmod +x evaluate.sh run.sh

# Add results directory to gitignore
echo ".autoresearch/" >> .gitignore
```

### 2. Install dependencies

```bash
# Lighthouse (for scoring)
npm install -g lighthouse

# Serve (for local preview during eval)
npm install -g serve

# Claude Code (the agent)
npm install -g @anthropic-ai/claude-code
```

### 3. Set environment variables (optional)

```bash
# Only needed if you want LLM copy scoring
export ANTHROPIC_API_KEY=sk-ant-...
```

## Running

### Option A: Full autonomous loop (recommended)

```bash
# Let it run overnight — ~12 experiments/hour
./run.sh

# With LLM copy scoring
./run.sh --with-llm

# Limit experiments
./run.sh --max-experiments 50
```

This creates a feature branch, takes a baseline, and launches Claude Code to run experiments autonomously. Every improvement is committed; every failure is reverted.

### Option B: Manual with Claude Code

If you'd rather stay in the loop:

```bash
# Create a branch
git checkout -b autoresearch/manual

# Take a baseline
./evaluate.sh

# Launch Claude Code and tell it to read program.md
claude

# Inside Claude Code:
# > Read program.md and run one experiment on Dimension 4
```

### Option C: Just the evaluation

```bash
# Score the site as-is
./evaluate.sh

# Quick build check only
./evaluate.sh --quick

# With LLM copy scoring
./evaluate.sh --with-llm
```

## Reading Results

### experiments.log

Each line is one experiment:

```
20260401_223015 | score=82 | perf=78 a11y=95 seo=88 bp=92 copy=0 | experiment: lazy-load hero images — score 82 vs baseline 79
20260401_223445 | score=82 | perf=79 a11y=95 seo=85 bp=92 copy=0 | experiment: add preconnect hints — score unchanged, reverted
```

### .autoresearch/

JSON files with detailed results from each evaluation run, plus Lighthouse reports per page.

### Git log

```bash
# See all experiments on the branch
git log --oneline main..autoresearch/20260401_223015

# See what changed in a specific experiment
git show <commit-hash>
```

## Tuning

### Changing evaluation weights

Edit the weight lines in `evaluate.sh`:

```bash
# Current weights (no LLM):
# Perf 30, A11y 25, SEO 30, BP 15

# If SEO matters more to you:
# Perf 20, A11y 20, SEO 40, BP 20
```

### Changing the research agenda

Edit `program.md`. This is the human's job — just like Karpathy says, the agent handles execution but the judgment behind the research agenda remains yours.

Good changes to program.md:
- Narrow the focus ("only work on homepage copy this session")
- Add specific constraints ("don't change any colors")
- Refine what "better" means for your goals
- Add new dimensions as you learn what matters

### Adding new evaluation criteria

The modular design makes it easy to add scoring. For example, to add broken link checking:

```bash
# In evaluate.sh, after Lighthouse:
BROKEN_LINKS=$(npx broken-link-checker http://localhost:4567 --recursive | grep "BROKEN" | wc -l)
# Factor into composite score
```

## FAQ

**How is this different from just running Lighthouse?**
Lighthouse tells you your score. This *improves* your score autonomously by letting an AI agent try hundreds of changes and keep only the ones that help.

**Will it break my site?**
No — every change must pass `npm run build` before it's evaluated, and every change that doesn't improve the score is reverted. All work happens on a feature branch. You merge only what you want.

**How long should I let it run?**
A few hours is enough for low-hanging fruit (performance, SEO meta tags). Overnight gets you deeper improvements. Karpathy ran his for 2 days and got 700 experiments.

**Does it need a GPU?**
No. Karpathy's version trains ML models so it needs a GPU. Yours just builds a website and runs Lighthouse — any machine with Node.js and Chrome works.

**Can I run this in CI?**
Yes — you could trigger it on a schedule via GitHub Actions. Run overnight, open a PR with the improvements in the morning.
