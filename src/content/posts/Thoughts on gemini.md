---
title: Thoughts on gemini
date: 2025-04-04
tags:
  - essay
  - gemini
image: gemini_wide.png
published: true
description: Despite popular narratives about Google lagging in AI, their Gemini models reveal engineering excellence that's hard to ignore when you strip away the conservative product decisions and UI polish. From the lightweight yet powerful Gemma 3 to the multimodal capabilities of Gemini 2.5, Google's models demonstrate a level of speed, precision, and fundamental understanding that suggests they're not playing catch-up—they're just being cautious.
---
It’s funny how quickly narratives form in tech. One of the more common ones right now is that Google is “behind” in AI — playing catch-up to OpenAI, Anthropic, or even to scrappy open-source players. But that story doesn’t quite hold up once you actually use Google’s models directly.

Let’s not forget: Google literally invented the transformer architecture that underpins everything from GPT-4 to Claude to the open-source LLMs lighting up Hugging Face. And yet, public perception has turned, partly because Google has been unusually conservative in how it releases and positions its AI tools. The consumer-facing Gemini app might not feel as magical or responsive as ChatGPT. But when you drop into the raw model — running Gemma 3 on your own machine, or hitting the Gemini 2.5 API — the story changes.

There’s a tightness and focus to these models that’s hard to ignore. Interacting at the model level strips away the product decisions, the guardrails, the UI polish — and lets you feel the actual engineering. And Gemini feels fast, serious, and precise. It’s like driving a high-performance machine: the output quality might match something like Claude or GPT-4, but the experience is different. Less latency, fewer hallucinations, more substance with fewer words.

Does Google DeepResearch produce insightful research reports.  Not really.  But if you want to use something as a foundational model for your own product, I'm consistently starting with Gemini or Gemma3 in my work.

Gemma 3 is especially striking. It’s open-source and tiny compared to the giants, yet it punches way above its weight. Compared to other models of the same class, it feels more like a distilled essence of what a model should be — no flashy tricks, no quantization hacks, just really strong engineering. It seems like it captures the essence in a way that the others don't.  My gut says that we’re heading toward a future where these small, well-tuned models outperform larger ones simply by being more efficient and better trained.

Contrast that with DeepSeek, which has its own kind of charm. It feels clever and scrappy, like a model cobbled together by brilliant engineers who aren’t afraid to cut corners in smart ways. The outputs are often good — sometimes great — but the sensation is different. Where Gemini feels grounded in theory and craftsmanship, DeepSeek feels like it’s hacking its way to good results.  (And its significantly slower.)

And then there’s the multimodal magic. Gemini 2.5 is the first time I’ve genuinely felt like a model understood not just text, but image, audio, and the sensory world. It could reason about voice timbre, edit an image seamlessly, and do it all with speed and clarity. It wasn’t just responding — it was perceiving. That felt new.

![](../assets/gems_in_crytpal_palace.png)

So no, I don’t think Google is behind. I think they’re cautious. But under the hood, their models are among the best I’ve used. The moment they decide to really ship — to stop slow-rolling every release — it’s going to be hard for anyone else to keep up.