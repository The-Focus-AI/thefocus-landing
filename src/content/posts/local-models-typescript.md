---
title: Code Generation with Local Models
date: 2025-08-20
tags:
  - essay
  - models
published: true
image: live_free_or_die.jpg
description: Small, local AI models deliver surprisingly effective results for everyday tasks.  Also llama3.2 is surprisingly fast and gpt-oss is surprisingly good.
---
I needed a small script to help anonymizing some test data.  Nothing fancy, but on my way to ChatGPT I ended up on the "wrong window" -- and threw the prompt at Olamma `gpt-oss` instead.  And it surprised me by giving me a solid result quickly.  Small local models are the future and being able to run them on hardware you already own is a political statement. 

No remote API calls. No burning through tokens/the environment. No company watching. Like a cowboy, just me and my machine.**Small, local models that are good enough to be useful and powerful enough to matter.** 

## Mostly, just worked

I ended up trying the prompt with a couple of different models, and then grading the results.

> i need a script that will give me at least 1042 distinct but made up show names. they should be funny and grammatically correct and written in typescript

I expected `gpt-oss:20b` to be the best of the lot, but surprisingly the 5 month old `llama3.2` crushed everything on the time dimension:
![](../assets/Model%20Response%20Time%20Comparison.png)
4 of them got winning results on the first (and only) try:


![](../assets/Model%20Total%20Score%20Comparison.png)


## Code "Quality"

This is silly since it's a tiny, throw away script but:

| **Model**                | **AI Quality** | **Docker Execution** | **Notes / Errors**                                       |
| ------------------------ | -------------- | -------------------- | -------------------------------------------------------- |
| **gpt-oss:20b**          | 4/5            | ✅ Success            | Clear & well-named; could abstract title generation.     |
| **deepseek-r1:32b**      | 3/5            | ✅ Success            | Repeats random-selection logic, refactoring needed.      |
| **devstral:24b**         | 4/5            | ✅ Success            | Cleanly organized, avoid duplicate checks.               |
| **llama3.2:latest**      | 4/5            | ✅ Success            | Clear, but unused suffixes array and weak modularity.    |
| **gemma3:12b**           | 4/5            | ❌ Failed             | TypeError: Cannot read properties of undefined (forEach) |
| **gemma3:27b**           | 3/5            | ❌ Failed             | ReferenceError: $2 is not defined                        |
| **mistral-small3.2:24b** | 3/5            | ❌ Failed             | Syntax error: Expected ")" but found "count"             |

This is for TypeScript, they could be better or worse on different languages.

The test code is [on github](https://github.com/The-Focus-AI/umwelten/blob/main/scripts/ollama-typescript-evaluation.ts)
