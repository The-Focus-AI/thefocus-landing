#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# TheFocus.AI AutoResearch Runner
# =============================================================================
# Orchestrates the autonomous improvement loop. This script:
#   1. Takes a baseline measurement
#   2. Launches Claude Code with the program.md instructions
#   3. Lets it run experiments in a loop
#
# Usage:
#   ./run.sh                    # Run with defaults
#   ./run.sh --max-experiments 50  # Limit experiments
#   ./run.sh --with-llm        # Enable LLM copy scoring
#
# Prerequisites:
#   - Claude Code CLI installed (npm install -g @anthropic-ai/claude-code)
#   - Inside the thefocus-landing repo
#   - npm dependencies installed
#   - Chrome/Chromium available
# =============================================================================

MAX_EXPERIMENTS=100
WITH_LLM=""
BRANCH_NAME="autoresearch/$(date +%Y%m%d_%H%M%S)"

for arg in "$@"; do
  case $arg in
    --max-experiments=*) MAX_EXPERIMENTS="${arg#*=}" ;;
    --with-llm) WITH_LLM="--with-llm" ;;
  esac
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TheFocus.AI AutoResearch Runner"
echo "  Branch: ${BRANCH_NAME}"
echo "  Max experiments: ${MAX_EXPERIMENTS}"
echo "  LLM scoring: ${WITH_LLM:-disabled}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ─────────────────────────────────────────────────────────────────────────────
# Setup
# ─────────────────────────────────────────────────────────────────────────────

# Ensure we're in the repo root
if [ ! -f "astro.config.mjs" ]; then
  echo "Error: Run this from the thefocus-landing repo root"
  exit 1
fi

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Ensure Lighthouse is available
if ! npx lighthouse --version > /dev/null 2>&1; then
  echo "Installing Lighthouse..."
  npm install -g lighthouse
fi

# Ensure serve is available
if ! npx serve --version > /dev/null 2>&1; then
  npm install -g serve
fi

# Create feature branch
git checkout -b "${BRANCH_NAME}"

# Make evaluate.sh executable
chmod +x evaluate.sh

# ─────────────────────────────────────────────────────────────────────────────
# Baseline
# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo "Taking baseline measurement..."
./evaluate.sh ${WITH_LLM}

BASELINE_FILE=$(ls -t .autoresearch/eval_*.json | head -1)
BASELINE_SCORE=$(node -e "console.log(require('./${BASELINE_FILE}').composite_score)")
echo ""
echo "Baseline score: ${BASELINE_SCORE}"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Launch Claude Code
# ─────────────────────────────────────────────────────────────────────────────
echo "Launching Claude Code for autonomous experimentation..."
echo ""

# The prompt that kicks off the autonomous loop
AGENT_PROMPT="You are running an autoresearch loop on the TheFocus.AI website.

Read program.md for the full research agenda and constraints.

The current baseline composite score is: ${BASELINE_SCORE}

Your task: run up to ${MAX_EXPERIMENTS} experiments to improve this score.

For each experiment:
1. Pick ONE dimension and ONE specific change from program.md
2. State your hypothesis
3. Make the change (modify only necessary files)
4. Run: npm run build — if it fails, revert and try something else
5. Run: ./evaluate.sh ${WITH_LLM} — check the composite score
6. If score >= ${BASELINE_SCORE}: git add -A && git commit -m 'experiment: [your hypothesis] — score [new] vs baseline [${BASELINE_SCORE}]'
7. If score < ${BASELINE_SCORE}: git checkout -- . (revert all changes)
8. Log the result and move to the next experiment

After each successful experiment, update your baseline to the new score so improvements ratchet upward.

Start with Dimension 4 (Performance & Accessibility) since those improvements are most measurable, then move to SEO, then copy.

Begin now. Do not ask for confirmation — just start experimenting."

# Run Claude Code with the prompt
claude --print "${AGENT_PROMPT}"

# ─────────────────────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  AutoResearch complete"
echo "  Branch: ${BRANCH_NAME}"
echo "  Experiments log: experiments.log"
echo "  Results: .autoresearch/"
echo ""
echo "  To review changes:"
echo "    git log --oneline main..${BRANCH_NAME}"
echo ""
echo "  To merge improvements:"
echo "    git checkout main"
echo "    git merge ${BRANCH_NAME}"
echo ""
echo "  To discard:"
echo "    git checkout main"
echo "    git branch -D ${BRANCH_NAME}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
