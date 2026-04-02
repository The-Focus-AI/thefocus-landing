#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# TheFocus.AI AutoResearch Evaluation Script
# =============================================================================
# Builds the site, runs Lighthouse CI, and optionally scores copy with an LLM.
# Returns a composite score that the autoresearch loop uses to keep or revert.
#
# Usage:
#   ./evaluate.sh                  # Full eval (Lighthouse only)
#   ./evaluate.sh --with-llm       # Full eval + LLM copy scoring
#   ./evaluate.sh --quick          # Build check only (no Lighthouse)
#
# Requirements:
#   - Node.js 18+
#   - npm dependencies installed (npm install)
#   - Chrome/Chromium (for Lighthouse)
#   - Optional: ANTHROPIC_API_KEY env var (for LLM copy scoring)
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${SCRIPT_DIR}"
RESULTS_DIR="${PROJECT_ROOT}/.autoresearch"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_FILE="${RESULTS_DIR}/eval_${TIMESTAMP}.json"
LOG_FILE="${PROJECT_ROOT}/experiments.log"
WITH_LLM=false
QUICK=false

# Parse args
for arg in "$@"; do
  case $arg in
    --with-llm) WITH_LLM=true ;;
    --quick) QUICK=true ;;
  esac
done

mkdir -p "${RESULTS_DIR}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  TheFocus.AI AutoResearch Evaluation — ${TIMESTAMP}${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# ─────────────────────────────────────────────────────────────────────────────
# Step 1: Build
# ─────────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}[1/4] Building site...${NC}"
BUILD_START=$(date +%s)

if npm run build > "${RESULTS_DIR}/build_${TIMESTAMP}.log" 2>&1; then
  BUILD_END=$(date +%s)
  BUILD_TIME=$((BUILD_END - BUILD_START))
  BUILD_SUCCESS=true
  echo -e "${GREEN}  ✓ Build succeeded in ${BUILD_TIME}s${NC}"
else
  echo -e "${RED}  ✗ Build FAILED — aborting evaluation${NC}"
  echo "${TIMESTAMP} | BUILD_FAILED | score=0 | $(git log --oneline -1)" >> "${LOG_FILE}"
  echo '{"composite_score": 0, "build": false}' > "${RESULTS_FILE}"
  cat "${RESULTS_DIR}/build_${TIMESTAMP}.log"
  exit 1
fi

if [ "$QUICK" = true ]; then
  echo -e "\n${GREEN}  Quick mode: build passed. Score = 100${NC}"
  echo '{"composite_score": 100, "build": true, "mode": "quick"}' > "${RESULTS_FILE}"
  exit 0
fi

# ─────────────────────────────────────────────────────────────────────────────
# Step 2: Lighthouse
# ─────────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}[2/4] Running Lighthouse audits...${NC}"

# Start a local preview server in the background
npx serve dist -l 4567 -s > /dev/null 2>&1 &
SERVE_PID=$!
sleep 2

# Pages to audit
PAGES=("http://localhost:4567/" "http://localhost:4567/capabilities" "http://localhost:4567/case-studies")
PAGE_NAMES=("homepage" "capabilities" "case-studies")

PERF_TOTAL=0
A11Y_TOTAL=0
SEO_TOTAL=0
BP_TOTAL=0
PAGE_COUNT=${#PAGES[@]}

for i in "${!PAGES[@]}"; do
  PAGE_URL="${PAGES[$i]}"
  PAGE_NAME="${PAGE_NAMES[$i]}"
  LHCI_OUTPUT="${RESULTS_DIR}/lighthouse_${PAGE_NAME}_${TIMESTAMP}.json"

  echo -e "  Auditing ${PAGE_NAME}..."

  # Run Lighthouse in headless Chrome
  npx lighthouse "${PAGE_URL}" \
    --output=json \
    --output-path="${LHCI_OUTPUT}" \
    --chrome-flags="--headless --no-sandbox --disable-gpu" \
    --only-categories=performance,accessibility,seo,best-practices \
    --quiet 2>/dev/null || {
      echo -e "${RED}  ✗ Lighthouse failed for ${PAGE_NAME}${NC}"
      continue
    }

  # Extract scores (Lighthouse returns 0-1, we want 0-100)
  PERF=$(node -e "const r=require('${LHCI_OUTPUT}');console.log(Math.round((r.categories.performance?.score||0)*100))")
  A11Y=$(node -e "const r=require('${LHCI_OUTPUT}');console.log(Math.round((r.categories.accessibility?.score||0)*100))")
  SEO=$(node -e "const r=require('${LHCI_OUTPUT}');console.log(Math.round((r.categories.seo?.score||0)*100))")
  BP=$(node -e "const r=require('${LHCI_OUTPUT}');console.log(Math.round((r.categories['best-practices']?.score||0)*100))")

  echo -e "    Perf: ${PERF} | A11y: ${A11Y} | SEO: ${SEO} | Best Practices: ${BP}"

  PERF_TOTAL=$((PERF_TOTAL + PERF))
  A11Y_TOTAL=$((A11Y_TOTAL + A11Y))
  SEO_TOTAL=$((SEO_TOTAL + SEO))
  BP_TOTAL=$((BP_TOTAL + BP))
done

# Kill the preview server
kill $SERVE_PID 2>/dev/null || true

# Average scores across pages
PERF_AVG=$((PERF_TOTAL / PAGE_COUNT))
A11Y_AVG=$((A11Y_TOTAL / PAGE_COUNT))
SEO_AVG=$((SEO_TOTAL / PAGE_COUNT))
BP_AVG=$((BP_TOTAL / PAGE_COUNT))

echo -e "\n  ${CYAN}Averages across ${PAGE_COUNT} pages:${NC}"
echo -e "    Performance:    ${PERF_AVG}"
echo -e "    Accessibility:  ${A11Y_AVG}"
echo -e "    SEO:            ${SEO_AVG}"
echo -e "    Best Practices: ${BP_AVG}"

# ─────────────────────────────────────────────────────────────────────────────
# Step 3: LLM Copy Scoring (optional)
# ─────────────────────────────────────────────────────────────────────────────
COPY_SCORE=0
if [ "$WITH_LLM" = true ]; then
  echo -e "\n${YELLOW}[3/4] Scoring copy with LLM...${NC}"

  if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
    echo -e "${RED}  ✗ ANTHROPIC_API_KEY not set — skipping LLM scoring${NC}"
  else
    # Extract text content from built HTML and build JSON-safe payload via Node
    COPY_SCORE=$(node -e "
      const fs = require('fs');
      const https = require('https');
      const html = fs.readFileSync('dist/index.html', 'utf8');
      const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 8000);
      const body = JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: 'Score this website homepage copy on a scale of 0-100. Consider: clarity of value proposition, persuasiveness, brand voice consistency (should be direct and founder-to-founder), CTA effectiveness, and information hierarchy. Return ONLY a single integer, nothing else.\n\nCopy:\n' + text
        }]
      });
      const req = https.request('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            const d = JSON.parse(data);
            const score = parseInt(d.content[0].text.trim());
            console.log(isNaN(score) ? 0 : Math.min(100, Math.max(0, score)));
          } catch(e) { console.log(0); }
        });
      });
      req.on('error', () => console.log(0));
      req.write(body);
      req.end();
    ")

    echo -e "    Copy Quality Score: ${COPY_SCORE}"
  fi
else
  echo -e "\n${YELLOW}[3/4] LLM copy scoring skipped (use --with-llm to enable)${NC}"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Step 4: Composite Score
# ─────────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}[4/4] Computing composite score...${NC}"

# Weights (must sum to 100 when LLM is off, adjusted when on)
if [ "$WITH_LLM" = true ] && [ "$COPY_SCORE" -gt 0 ]; then
  # With LLM: Perf 25, A11y 20, SEO 25, BP 10, Copy 20
  COMPOSITE=$(( (PERF_AVG * 25 + A11Y_AVG * 20 + SEO_AVG * 25 + BP_AVG * 10 + COPY_SCORE * 20) / 100 ))
else
  # Without LLM: Perf 30, A11y 25, SEO 30, BP 15
  COMPOSITE=$(( (PERF_AVG * 30 + A11Y_AVG * 25 + SEO_AVG * 30 + BP_AVG * 15) / 100 ))
fi

echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  COMPOSITE SCORE: ${COMPOSITE}${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Save results
cat > "${RESULTS_FILE}" <<EOF
{
  "timestamp": "${TIMESTAMP}",
  "composite_score": ${COMPOSITE},
  "build": true,
  "build_time_seconds": ${BUILD_TIME},
  "lighthouse": {
    "performance": ${PERF_AVG},
    "accessibility": ${A11Y_AVG},
    "seo": ${SEO_AVG},
    "best_practices": ${BP_AVG}
  },
  "copy_score": ${COPY_SCORE},
  "commit": "$(git log --oneline -1 2>/dev/null || echo 'unknown')"
}
EOF

# Append to experiment log
COMMIT_MSG=$(git log --oneline -1 2>/dev/null || echo 'unknown')
echo "${TIMESTAMP} | score=${COMPOSITE} | perf=${PERF_AVG} a11y=${A11Y_AVG} seo=${SEO_AVG} bp=${BP_AVG} copy=${COPY_SCORE} | ${COMMIT_MSG}" >> "${LOG_FILE}"

echo -e "\n  Results saved to ${RESULTS_FILE}"
echo -e "  Log appended to ${LOG_FILE}"

# Return the score as exit code (capped at 0-100 for use by the runner)
# The runner script reads the JSON file, not the exit code
exit 0
