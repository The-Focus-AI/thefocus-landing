# The Production AI Readiness One-Pager

**The 12 questions we ask before any engagement.**

A diagnostic from TheFocus.AI for engineering leaders shipping LLM systems that have to work on Monday morning.

---

## Why this one-pager exists

Most teams shipping "AI features" today are running a demo with extra steps. The model works in a notebook, works for the founder, works for the customer in the sales call. Then it ships, the contract closes, and the on-call engineer learns what the model does at 2 a.m. on a Tuesday when the API provider has a 30-second latency spike.

The 12 questions below are what we ask before we agree to help a team move from "it works in the demo" to "it works in production, under load, with real users, and the bill is predictable." If you can answer all 12 with a clear sentence, you do not need us. If three or more are fuzzy, you have a project — not a feature.

---

## The 12 questions

### Product surface

1. **What user job does the AI do?** Name the single job-to-be-done in one sentence. If you need three, the surface is not ready.
2. **What is the failure mode the user sees?** When the model is wrong, slow, refuses, or unavailable — what does the screen look like and what does the user do next?
3. **What is the ground truth?** How do you know the answer was right? Who labels, who arbitrates, and how fast does that loop close?

### System architecture

4. **Where does the model live, and who pays for it?** API, fine-tune, self-hosted, on-device. Per-call cost, per-user cost, and who absorbs a 3× usage spike.
5. **What is the prompt boundary?** Where do user inputs end and your instructions begin? Have you red-teamed injection from the inputs you actually accept?
6. **What is in the context window, and who put it there?** RAG sources, retrieval policy, freshness, and what happens when retrieval returns nothing.

### Operations

7. **What is the p95 latency budget?** Not the average. The 95th percentile a user will actually feel. Have you measured it under load with a real provider, not a local mock?
8. **What is the rate-limit and quota story?** Your provider's limits, your account's limits, and what happens when a single tenant burns the quota for the rest.
9. **How do you roll back a prompt?** Prompts are code. If a new prompt regresses a use case, what is the revert path, the audit trail, and the time-to-recover?

### Trust, safety, and the boring stuff

10. **What data leaves your perimeter, and where does it land?** Provider retention, vendor sub-processors, contractual training opt-outs, and the legal review you actually completed (not the one in the slide deck).
11. **Who is accountable for a bad answer?** A named human, a Slack channel, an on-call rotation, a SLA. "The model" is not an accountable party.
12. **What does success look like in 90 days?** A metric, a baseline, a target, a review cadence, and a kill criterion if it does not work.

---

## How to use this

Print it. Walk it through your team meeting. If three or more answers are fuzzy, you have homework before you ship — not a launch.

If you want a second pair of eyes on the homework, [we do that for a living](https://thefocus.ai/capabilities).

---

**TheFocus.AI** — Building intelligent organizations. Production AI, not demoware.

[thefocus.ai](https://thefocus.ai) · [Subscribe to the weekly note](https://thefocus.ai/production-ai-readiness/)

*v1 · 2026-05-25 · CTO draft — pending CEO review.*
