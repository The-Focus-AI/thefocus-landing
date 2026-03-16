---
title: "Can LLMs Use Real-World Tools? Mercury-2, ELO, and the Umwelten Setup"
date: 2026-03-15
tags:
  - essay
  - models
  - compare
  - agents
description: "We ran 39 models against real Rivian driving data via MCP tools. Inception's Mercury-2 delivered a perfect 15/15 in 8.6 seconds. Here's the standout model, the ELO narrative rankings, and how the same Umwelten setup powers both chat and evals."
published: true
author: Will Schenk
image: mcp-tool-eval-mercury-umwelten.png
---

This winter the snow has been spectacular in the Northeast, and I'm taking full advantage. Been driving a lot — but how much? I'm tracking my driving data with [Tezlab](https://tezlabapp.com) and we've recently [released an MCP server](https://www.tezlabapp.com/mcp), which works great with the big foundational models. But I wanted to see how some other models could make sense of the data.

So I wired up an interactive chat system and ran an evaluation over 39 models, giving them access to real driving and charging data via MCP tools and asked them to summarize 10 days of activity. Most can call tools. Far fewer call the *right* tools with the *right* parameters and turn the results into a narrative worth reading. The [full interactive report](/reports/mcp-tool-test/) has the full rankings, per-model threads, and judge verdicts. Here’s the short version: one new model stole the speed crown, ELO tells you who tells the best story, and the same setup that runs our evals is the same one we use for chat.

## Mercury-2: speed without the tradeoff

**Inception’s Mercury-2** was the fastest model to get a perfect score: **15/15 in 8.6 seconds** at **$0.006**. No other model hit 15/15 that fast. So if you care about “correct + fast + cheap” in a tool-using setting, Mercury-2 is the one to watch.

This is a diffusion model, not an LLM — I discovered it while surveying recent models on OpenRouter. Traditional LLMs like ChatGPT and Claude generate text one token at a time sequentially, which is inherently slow because each token depends on the one before it.

Mercury-2 uses diffusion — the same approach behind image generators — to refine the entire output in parallel across a small number of steps, hitting ~1,000 tokens/sec versus ~70–90 for comparable AR models. The trade-off is that Mercury-2 matches the quality of smaller speed-optimized models (Haiku/Flash class), not the frontier heavyweights, making it ideal for latency-sensitive workloads like agent loops rather than tasks requiring maximum intelligence.

We used the same [Umwelten](https://github.com/The-Focus-AI/umwelten) harness for all of the models, with the same awkwardly worded date stamps -- real date range (Feb 27 – Mar 8, 2026), but a deliberate trap: models that skip `start_date` on `get_drives` and `get_charges` only see recent data and confidently write summaries that miss the first days. Tool score (0–5) is deterministic; an LLM judge (Claude Haiku 4.5) scores narrative quality and factual grounding (0–10). Mercury-2 aced both.

In the **Elo narrative rankings** — pairwise “which summary would you rather read?” — Mercury-2 sits around 1450 (9 wins, 13 losses in 22 matches). So it’s not the *best* storyteller in head-to-head comparison; the big narrative leaders are Claude Opus 4.6, Kimi K2.5, and the like. But for “did it use the tools correctly and produce a solid answer, fast?”, Mercury-2 is the standout.

It also took 8 seconds, while the top scorers took between 90 and 150 seconds — a significant difference.

## Elo: who tells the best story?

The raw score (0–15) measures *correctness* and *quality in isolation*. To compare *narrative preference* we ran a **Swiss-style pairwise tournament**: Claude Haiku 4.5 sees two summaries side-by-side (order randomized to avoid position bias) and picks the better one. Those outcomes feed **Bradley–Terry / Elo** ratings. So you get two views: “Did they get the facts and use the tools?” (score) and “Would a human prefer this story?” (Elo).

Top of the Elo table:

* **Claude Opus 4.6** (1707) — reads like a travel writer at the wheel: *"Four DC fast charges in one day, three of them free. Smart routing."*
* **Kimi K2.5** (1701) — cheeky editorial aside: *"Apparently one trip wasn't enough. Monday morning, you drove 34 miles to Egremont, MA, then continued 72 miles to Dover, VT (arriving with just 23% battery)."*
* **MiniMax M2.1** (1688) — dramatic flair: *"You fast-charged in North Canaan (14 to 34%, $17.73), then limped home to Cornwall for an overnight charge."*
* **Claude Sonnet 4.6** (1660) — investigative-journalist detail: *"Never got stranded — closest call was arriving North Canaan at 14% on Mar 1."*
* **GPT-5.4** (1654) — confident and concise: *"The road-trip pattern is unmistakable: long legs, arrival at low SOC, fast charge, continue."*
* Local models like **GLM-4.7-flash** on Ollama held their own (14/15, 1557 Elo, $0)

Meanwhile Mercury-2, the speed king, writes like a data analyst: *"The biggest single charge (83 kWh) restored the battery from 19% to 85% — essentially a 'full-tank' fill-up."* Correct, but you wouldn't read it on a plane.

You can rank by total score, by time, by cost, or by Elo — the [report](/reports/mcp-tool-test/) lets you filter and sort all of it.

## One setup: chat and eval

The important part for us: **the same Umwelten setup that runs this eval is the same one we use for chat.** One MCP server (TezLab), one OAuth’d connection to real vehicle data, one system prompt and tool set. In “chat” mode you talk to a model through that stack. In “eval” mode we replay a fixed prompt against many models, cache responses, and run the tool-score + judge pipeline. No separate mock APIs or synthetic harness — if the chat can do it, the eval tests it.

That keeps the eval honest. We’re not testing “can the model call a fake `get_drives`?” We’re testing “can it call the real `get_drives` with a `start_date`, get real JSON, and summarize it?” Same 20+ read-only tools, same date trap, same judge. So the numbers in the report map directly to what you’d get in a product that lets users ask “Summarize my last 10 days” in natural language.

## Try it yourself

39 models, 8 providers, about **$0.96** total for the run. Seventeen models hit 15/15; eight failed (no tool support or errors). If you’re choosing a model for a tool-using, narrative-producing product, the [full report](/reports/mcp-tool-test/) has sortable tables, filters by cost/time/score/Elo, and per-model response + thread + judge tabs.

We built the pipeline with [Umwelten](https://github.com/The-Focus-AI/umwelten) — same idea as the [Car Wash Test](/posts/the-car-wash-test): define a prompt, run it against models, score with a judge. Here the twist is **real tools and real data**, so the eval is also a stress test of your MCP stack. If you’re wiring LLMs to real-world APIs, this is the kind of litmus test that actually reflects what users will see.

<a href="/reports/mcp-tool-test/" style="display:inline-block;background:#0055aa;color:#fff;padding:0.75rem 1.5rem;font-weight:700;font-size:0.95rem;text-decoration:none;letter-spacing:0.02em;">Explore the full MCP tool eval report →</a>
