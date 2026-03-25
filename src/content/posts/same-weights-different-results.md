---
title: "Same Weights, Different Results"
date: 2026-03-24
tags:
  - essay
  - models
  - compare
  - infrastructure
description: "We ran the same Nemotron model on four providers and got wildly different results. MCP tool use ranged from 1/6 to 6/6. Speed varied 16x. The weights are identical. The results are not."
published: true
author: Will Schenk
image: same-weights-different-results.png
ogImage: same-weights-different-results.png
---

We gave the same model — NVIDIA Nemotron Nano 30B — the same prompt on four different providers. Analyze battery health and charging data by calling tools via the TezLab MCP server. Here's what each one did.

**Ollama** (running locally, no middleware) called 17 tools autonomously:

```
list_vehicles → get_vehicle_status → get_battery_health → get_charges_brief →
get_drives_brief → find_nearby_chargers → get_my_chargers → get_efficiency →
find_nearby_chargers → search_public_chargers → search_public_chargers →
current_time → get_aggregations → get_aggregations → current_time →
get_aggregations ...
```

It explored everything — vehicle status, battery health, charges, drives, nearby chargers, efficiency stats, aggregations. Score: 6/6.

**NVIDIA NIM** called 7 tools:

```
list_vehicles → get_battery_health → get_vehicle_status → get_charges →
get_my_chargers → find_nearby_chargers → search_public_chargers
```

Methodical and complete. It covered all the key tool categories. Score: 5/6.

**OpenRouter** called 1 tool:

```
list_vehicles
```

Then stopped and asked:

> *"I see you have two vehicles linked to your TezLab account: Rivian R1S and Tesla X. Which of these vehicles would you like me to analyze?"*

Score: 1/6. Same weights. Same prompt. It asked for permission instead of acting.

**DeepInfra** didn't even get that far — it hit a context overflow error. The tool definitions pushed it past DeepInfra's 34K token context limit, while the same model handled 54K+ tokens fine on the other three providers.

Same weights. Same architecture. Same training data. Four completely different outcomes.

## How We Got Here

We didn't set out to test inference providers. We were building a [model showdown](/reports/model-showdown/) — 48 LLMs across 5 dimensions — and we happened to include the same Nemotron models on multiple providers. Nemotron Nano 30B scored 83.7% on OpenRouter and 77.0% on DeepInfra. That 6.7-point gap is larger than the difference between many distinct models.

So we ran a focused follow-up: the same three Nemotron models across four providers — OpenRouter, DeepInfra, Ollama (local), and NVIDIA's own NIM inference platform. Same prompts. Same evaluation harness. Three tests: MCP tool use, instruction following, and reasoning.

Here's the Nano 30B side by side:

| Test | OpenRouter | DeepInfra | Ollama | NVIDIA NIM |
|---|---|---|---|---|
| MCP Tool Use (/6) | 1 | ERR | **6** | 5 |
| Instruction (/15) | 8 | **15** | 10 | **15** |
| Reasoning time | 51s | 57s | 32s | **27s** |

## It's Not Just Tool Calling

The more we looked, the wider the divergence spread.

**Instruction following breaks down.** We asked each provider's Nano 30B to write a 12-word sentence about the ocean:

| Provider | Response | Words | Pass? |
|---|---|---|---|
| **DeepInfra** | "The endless blue horizon whispers secrets of distant worlds beyond boundless imagination." | 12 | Yes |
| **NVIDIA NIM** | "The ocean waves rhythmically crash a soothing sound that calms the soul" | 12 | Yes |
| **Ollama** | "Ocean waves whisper ancient secrets, painting shifting horizons beneath endless skies." | 10 | No |
| **OpenRouter** | "Waves whispered secrets to wandering soulsbeneath endless blue horizons of mystery." | 11 | No |

Notice OpenRouter's response — "soulsbeneath" is missing a space. The tokenization or response processing is subtly corrupting the output.

**Speed varies 16x.** OpenRouter's Nano 9B took 729 seconds for a reasoning question that NVIDIA NIM answered in 44 seconds. Twelve minutes versus forty-four seconds. Same model.

**Coding swings wildly.** In the original showdown, DeepInfra's Nano 30B scored 110/126 on coding while OpenRouter scored 71/126. Simple tasks (FizzBuzz) were identical. Complex tasks (Custom Cipher, Data Pipeline) diverged completely — 7-vs-0, pass-vs-fail differences.

## The Reversal

Here's where it gets worse. On Nano 9B, the pattern **inverts**.

**OpenRouter's Nano 9B** called 4 tools autonomously — `list_vehicles`, `get_battery_health`, `get_charges`, `find_nearby_chargers` — and produced a useful analysis. Score: 4/6.

**DeepInfra's Nano 9B** called 1 tool (`list_vehicles`) and asked which vehicle to analyze. Score: 1/6.

**NVIDIA NIM's Nano 9B** did the same — called `list_vehicles` and asked for clarification. Score: 1/6.

The provider that was worst for the 30B model was best for the 9B model. Whatever OpenRouter does differently in its tool-calling pipeline, it helps the smaller model act more autonomously while hindering the larger one. This isn't just "providers differ" — it's that the interaction between model and provider is unpredictable.

## What Survives the Infrastructure Layer

Not everything breaks. The divergence follows a gradient.

**Reasoning is rock solid.** The surgeon riddle, bat-and-ball, lily pads — these are pattern-recognition tasks with unambiguous answers. Quantization and prompt formatting don't move the needle on pure logic.

**Knowledge is mostly stable.** Factual recall — capital of Kazakhstan, speed of light, when the Berlin Wall fell — barely changes across providers. The facts are baked deep into the weights.

The further you get from pure pattern recognition — into instruction following, coding, and especially tool calling — the more the infrastructure layer determines the outcome. The more a task depends on prompt formatting and API translation, the more it breaks.

## The Full Picture

Here are all three models across all providers.

### Nemotron Super 120B

| Test | OpenRouter | DeepInfra | NVIDIA NIM |
|---|---|---|---|
| MCP Tool Use (/6) | 2 | 3 | **5** |
| Instruction (/15) | **15** | **15** | **15** |
| Reasoning time | 177s | **59s** | 215s |

### Nemotron Nano 9B

| Test | OpenRouter | DeepInfra | NVIDIA NIM |
|---|---|---|---|
| MCP Tool Use (/6) | **4** | 1 | 1 |
| Instruction (/15) | **10** | **10** | 5 |
| Reasoning time | 729s | 56s | **44s** |

### Speed Across the Board

| Model | OpenRouter | DeepInfra | NVIDIA NIM | Ollama |
|---|---|---|---|---|
| Nano 30B | 51s | 57s | **27s** | 32s |
| Super 120B | 177s | **59s** | 215s | — |
| Nano 9B | 729s | 56s | **44s** | — |

A pattern emerges in the data: NVIDIA NIM — the model maker's own platform — consistently outperforms third-party providers on tool calling. On Nano 30B, NIM scores 5/6 while OpenRouter scores 1/6. On Super 120B, NIM gets 5/6 while OpenRouter gets 2/6. This isn't surprising — they control the serving stack, the chat templates, and the quantization. They know exactly how the model was trained and can serve it the way it was intended.

The exception is Nano 9B, where NIM scores only 1/6 on MCP and 5/15 on instruction following. The smaller model may be more sensitive to serving configuration, or NVIDIA may optimize their platform primarily for their larger models.

## Why This Happens

**They're not actually the same model.** DeepInfra uses FP8 quantization on their own GPU clusters. OpenRouter's free endpoint routes through NVIDIA's infrastructure with "unknown" quantization. NVIDIA NIM runs natively on NVIDIA's inference stack. Same weights, different numerics, different behavior.

**Tool calling is implemented differently.** All four providers present an OpenAI-compatible API, but the transformation to what the model actually sees differs. DeepInfra applies the native chat template. OpenRouter adds a translation layer. NVIDIA NIM presumably uses the exact template the model was trained with. OpenRouter has acknowledged this — they created "Exacto," a routing variant specifically because tool-calling accuracy varies so dramatically across providers.

**Context limits vary.** DeepInfra couldn't fit the Nano 30B MCP test into its 34K context window. The same model handled 54K+ tokens fine everywhere else. Providers make different decisions about context length, and those decisions can prevent your application from working at all.

**Free tiers are a different product.** On OpenRouter, the free Nemotron endpoint routes to different infrastructure than the paid one. You're not getting a free version of the same thing — you're getting a different thing entirely. If you're choosing a model for production, test it on the provider and tier you'll actually use.

## The Uncomfortable Implication

The model evaluation ecosystem treats model names as the unit of comparison. Leaderboards rank "Llama 4 Maverick" or "Nemotron 3 Super" as if these are fixed, reproducible artifacts. They're not. A model name is a pointer to a set of weights. What you get when you call that name depends on who's serving it, how they've quantized it, what chat template they've applied, and what middleware sits between you and the inference engine.

We found MCP scores ranging from 1/6 to 6/6 across providers. Instruction following from 8/15 to 15/15. Speed from 27 seconds to 729 seconds. All on the same model.

The industry benchmarks every new model to death while largely ignoring the infrastructure layer that determines what users actually experience. Until we start treating inference infrastructure as a first-class variable in model evaluation, we're measuring the wrong thing.

---

*This analysis is based on the [Model Showdown](/reports/model-showdown/) — 48 LLMs tested across reasoning, knowledge, instruction following, coding, and MCP tool use for $4.63 — and a focused follow-up testing three Nemotron models across four providers. The interactive report includes per-model detail panels where you can see every tool call and judge verdict. The full technical investigation of provider differences is available [on GitHub](https://github.com/The-Focus-AI/umwelten/blob/main/reports/2026-03-20-deepinfra-vs-openrouter-inference-differences.md).*
