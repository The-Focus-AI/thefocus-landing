# The Production AI Readiness one-pager — source content

This is the canonical source for the lead-magnet PDF.

- **Render**: see `production-ai-readiness.html` (Focus.AI Client paged.js template).
  To re-render the PDF, run the chrome-driver pdf binary against the HTML:
  `~/.claude/plugins/cache/focus-marketplace/chrome-driver/*/bin/pdf file://$(pwd)/production-ai-readiness.html ./production-ai-readiness.pdf`
- **Preview**: `production-ai-readiness-preview.png` (single page, Letter).
- **Style**: Focus.AI Client (paper bg, ink/petrol/vermilion, Source Serif 4 / Inter / Courier Prime).

## Title

> The 12 questions we ask before any engagement.

## Lead

Most teams shipping "AI features" today are running a demo with extra steps. The 12 questions below are what we ask before we agree to help move a system from *"it works in the demo"* to *"it works in production."* If you can answer each in a sentence, you do not need us. If three or more come back fuzzy, you have a project — not a feature.

## The 12 questions

### Product surface

01. **What user job does the AI do?** — Name the single job-to-be-done in one sentence. If you need three, the surface is not ready.
02. **What is the failure mode the user sees?** — When the model is wrong, slow, refuses, or unavailable — what does the screen look like and what does the user do next?
03. **What is the ground truth?** — How do you know the answer was right? Who labels, who arbitrates, how fast does the loop close?

### System architecture

04. **Where does the model live, and who pays?** — API, fine-tune, self-hosted, on-device. Per-call cost, per-user cost, and who absorbs a 3× usage spike.
05. **What is the prompt boundary?** — Where do user inputs end and your instructions begin? Have you red-teamed injection from the inputs you actually accept?
06. **What is in the context window, and who put it there?** — RAG sources, retrieval policy, freshness, and what happens when retrieval returns nothing.

### Operations

07. **What is the p95 latency budget?** — Not the average. The 95th percentile a user will feel. Have you measured it under load with a real provider, not a local mock?
08. **What is the rate-limit and quota story?** — Provider limits, account limits, and what happens when a single tenant burns the quota for the rest.
09. **How do you roll back a prompt?** — Prompts are code. What is the revert path, the audit trail, the time-to-recover when a new prompt regresses?

### Trust, safety, and the boring stuff (vermilion border)

10. **What data leaves your perimeter, and where does it land?** — Provider retention, sub-processors, training opt-outs, and the legal review you actually completed — not the one in the slide deck.
11. **Who is accountable for a bad answer?** — A named human, a Slack channel, an on-call rotation, a real SLA. *The model* is not an accountable party.
12. **What does success look like in 90 days?** — A metric, a baseline, a target, a review cadence, and a kill criterion if it does not work.

## Footer CTA

**Production AI, not demoware.**
[thefocus.ai/production-ai-readiness](https://thefocus.ai/production-ai-readiness) — one short essay a week for engineers shipping LLM systems.

---

*v1 · 2026-05-25 · CTO draft. CEO can edit this `.md`, regenerate `.html` from the dense Focus.AI Client template at `~/.claude/plugins/cache/focus-marketplace/focus-ai-brand/2.0.1/templates/client-report-paged.html`, and re-render the PDF.*
