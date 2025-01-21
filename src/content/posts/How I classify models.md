---
title: How I classify models
date: 2025-01-21
tags:
  - models
  - thoughts
  - architecture
image: tree_wide.png
published: true
description: Small models are smart yet limited in knowledge; foundation models possess both deep understanding and extensive knowledge but lack structured problem-solving approaches. Educated models like DeepResearch excel by combining learned reasoning processes with large memory capacities, enabling them to adapt effectively to complex tasks while handling vast information instantaneously.
---
Stepping back a bit from [thoughts on what these models can really help us answer](AI%20for%20research,%20DeepResearch%20wins.md), there are 4 different dimensions ways to think about AI model capabilities: 
* smart (ability to reason and understand language)
* knowledgeable (breadth and depth of information)
* educated (learned processes for systematic thinking, or Chain Of Thought built it)
* complexity (how much information they can actively process at once i.e. context window)

Another way to think of this is, small, big, slow, and good conversationally.

Small models (around 7B parameters) show remarkable intelligence - they can understand language and reason about complex concepts. Think of them as quick-witted but with limited knowledge. They can define terms, summarize conversations, and handle targeted tasks that require language understanding. They are *good at listening*. They're smart, but their knowledge base is constrained.

For these my go tos are: [llama3.2](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/) and [gemma2](https://blog.google/technology/developers/google-gemma-2/) if only because [phi4](https://ollama.com/library/phi4) is a bit too much for my laptop.

Big, or foundation models (400B+ parameters) like [ChatGPT](https://chatgpt.com/), [Gemini](https://gemini.google.com/), [Claude](https://claude.ai/new) and (surprisingly) [DeepSeek](https://www.deepseek.com/) are both smarter and vastly more knowledgeable. They have deep understanding plus extensive knowledge embedded in their weights. But despite their capabilities, they often lack structured approaches to problem-solving - like brilliant people who haven't learned systematic ways to apply their intelligence.

Then there are the "educated" models - systems like [DeepResearch](https://blog.google/products/gemini/google-gemini-deep-research/), DeepThink, [o1](https://openai.com/o1/), and [o3](https://en.wikipedia.org/wiki/OpenAI_o3). These have learned methodical thinking processes.   But what makes them even more powerful is their massive context windows - they can hold entire research papers, previous conversations, or multiple documents in their memory at once. This combination of learned thinking processes and expanded memory means they can adapt incredibly well to specific tasks. 

Putting multiple books -- the whole 500 page pdf, just drag it in -- to [Gemini](https://gemini.google.com/app) changes the types of conversations you can have.  Even using something like [Claude Projects](https://support.anthropic.com/en/articles/9517075-what-are-projects) makes a lot of things easier.  For example, when I'm writing a script for something, I'll throw a couple examples of the stuff I like in there -- maybe the API documentation -- and it really helps claude get the answer on the first try.

Medium models (around 40B parameters) sit between small and foundation models in both intelligence and knowledge. They're particularly interesting from an engineering perspective - you can run them on high-end consumer hardware, giving you more control and flexibility. Each generation of medium models tends to match the previous generation's large model capabilities.  It feels like the future is here, we'll be able to do all of this stuff locally.

The trade-off is clear: as you move up this hierarchy, you get better results but at increasing costs of money, energy, and time. Small models are essentially free, foundation models are expensive but accessible, and educated models can cost hundreds or even thousands of dollars per query.

There are other dimensions around how the models interact with their environment which make huge difference in how you use it.  True multimodal stuff, where the models understand voice and images and video without having to first translate it into text give a much deeper view into the world.  Simply being able to talk -- and listen to -- the models is a great leap forward in interactions.  And things like [Gemini Realtime AI](https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/#ceo-message) is truly bananas, where you can share your screen with it and speak out loud and have it respond -- is wild.  

Looking ahead, small models might get smarter while becoming more specialized - trading broad shallow knowledge for deep expertise in specific areas. But the real evolution is happening in those educated models, which are learning not just what to think, but how to think, while being able to hold and process more context than ever before.