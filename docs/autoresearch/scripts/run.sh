#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# AutoResearch Runner (portable)
# =============================================================================
# Copy to your site repo ROOT next to evaluate.sh and program.md, then chmod +x.
#
# Usage:
#   ./run.sh
#   ./run.sh --with-llm
#   ./run.sh --max-experiments=50
#
# Requires: npm install -g @anthropic-ai/claude-code lighthouse serve (or npx)
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
echo "  AutoResearch Runner"
echo "  Branch: ${BRANCH_NAME}"
echo "  Max experiments: ${MAX_EXPERIMENTS}"
echo "  LLM scoring: ${WITH_LLM:-disabled}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -f "package.json" ]; then
  echo "Error: Run this from your site repository root (need package.json)."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

if ! npx lighthouse --version > /dev/null 2>&1; then
  echo "Installing Lighthouse..."
  npm install -g lighthouse
fi

if ! npx serve --version > /dev/null 2>&1; then
  npm install -g serve
fi

git checkout -b "${BRANCH_NAME}"

chmod +x evaluate.sh

echo ""
echo "Taking baseline measurement..."
./evaluate.sh ${WITH_LLM}

BASELINE_FILE=$(ls -t .autoresearch/eval_*.json | head -1)
BASELINE_SCORE=$(node -e "console.log(require('./${BASELINE_FILE}').composite_score)")
echo ""
echo "Baseline score: ${BASELINE_SCORE}"
echo ""

echo "Launching Claude Code for autonomous experimentation..."
echo ""

AGENT_PROMPT="You are running an autoresearch loop on this marketing site.

Read program.md for the full research agenda and constraints.

The current baseline composite score is: ${BASELINE_SCORE}

Your task: run up to ${MAX_EXPERIMENTS} experiments to improve this score.

For each experiment:
1. Pick ONE dimension and ONE specific change from program.md
2. State your hypothesis
3. Make the change (modify only necessary files)
4. Run: npm run build — if it fails, revert and try something else
5. Run: ./evaluate.sh ${WITH_LLM} — check the composite score
6. If score improves: git add -A && git commit -m 'experiment: [hypothesis] — score [new] vs baseline [old]'
7. If score does not improve: revert changes
8. Log the result and move to the next experiment

After each successful experiment, treat the new score as baseline.

Start with measurable wins (performance, accessibility, SEO) if scores aren't maxed, then copy.

Begin now. Do not ask for confirmation — start experimenting."

claude -p --dangerously-skip-permissions "${AGENT_PROMPT}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  AutoResearch complete"
echo "  Branch: ${BRANCH_NAME}"
echo "  Experiments log: experiments.log"
echo "  Results: .autoresearch/"
echo ""
echo "  Review:    git log --oneline main..${BRANCH_NAME}"
echo "  Merge:     git checkout main && git merge ${BRANCH_NAME}"
echo "  Discard:   git checkout main && git branch -D ${BRANCH_NAME}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
