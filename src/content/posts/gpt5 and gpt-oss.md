---
title: gpt-5 and gpt-oss
date: 2025-08-13
tags:
  - models
published: true
image: gpt_oss_wide.png
description: OpenAI’s GPT-5 launch stole headlines, but GPT-OSS quietly made local AI a lot more practical. This post covers what’s new, how to run it with Ollama or LM Studio, and why context size can change your results.
---
Did you hear that the new gpt weights just dropped?   [OpenAI](https://openai.com) just released [gpt-5](https://openai.com/index/introducing-gpt-5/) and did a coordinated release of [gpt-oss](https://openai.com/index/introducing-gpt-oss/) with Hugging Face, Ollama, LMStudio and more that you can run and tinker with at home.

People's reaction has [been mixed](https://garymarcus.substack.com/p/gpt-5-overdue-overhyped-and-underwhelming) -- "[GPT5 Should be ashamed of itself](https://www.realtimetechpocalypse.com/p/gpt-5-is-by-far-the-best-ai-system) -- but in my personal experience it's a like a jump from GPT-3 to GPT-4 and I consistently find it giving me better answers then the other models.  I find myself switch between google's AI Mode and GPT5 for basically everything at this point, so I'd consider it a success.

But lets talk about the open source version.
## Why this is cool

gpt-oss feels like a foundation model from a year ago.  Its polished and one of the strongest text-only models you can run locally, now available for remixing.  I expected that small models would become more capable, but its still surprising that my 4 year old laptop can run the smaller of the two released models.  It's text only, which rules out some of the use cases that gemma 3 in particular is good at, but the over all result feels very polished.

Tool use in general is good but can get stuck in a loop when trying to reason.  Agentic workflows aren't there yet but it feels very close. It can write code surprisingly well for running locally, but when it started called tools to actually write the files it fell down.  The 20b sized one is not to the level when it can property back something like goose or RooCode.  Goose was able to design and write code to the console, but when it started called tools to actually write the code in the filesystem it fell down.  RooCode was completely confused by the assignment even with the context window maxed out.

## Why local

![](../assets/Screenshot%202025-08-06%20at%2016.44.55.png)

 Even without the actual source, these models give you the freedom to run, freedom to study, and the freedom to modify.  But there's something really empowering about being able to have this work in the sky, to be sure that no one is looking at what you are doing, to have what the preppers call Sovereignty.  
## Harmony

Splitting up `system` and `developer` as a message type better reflects how we are using system prompting, and the formalization of the output channels means that applications can start to standardize outputs.  `commentary` will show tool calls, but the `analysis` channel is its chain of thought (CoT), and in the spec its marked 

> **Important:** Messages in the analysis channel do not adhere to the same safety standards as final messages do. Avoid showing these to end-users.`
## Installation

Ollama and lmstudio have coordinated a release so that the latest version works out of the box.  `ollama pull gpt-oss:20b` and you are good to go, and lmstudio gives you a prompt.  Those are basically the 
## Ollama

Download [ollama](https://ollama.com).  Start it up.  In the terminal pull down the model, and then lets go

```shell
ollama pull gpt-oss:20b
```
And then run

```shell
ollama run gpt-oss:20b "why is the sky dark at night"
```

Or use the front end.
![](../assets/Screenshot%202025-08-06%20at%2015.35.53.png)
Grounding in web search makes a difference.
## lmstudio

Download [lmstudio](https://lmstudio.ai/download) and then it will prompt you.

![](../assets/Screenshot%202025-08-06%20at%2015.34.39.png)

Download it and load it up.

You can use the interface or the command line

```shell
lms start
```

## llm-mlx


```shell
llm mlx download-model openai/gpt-oss-20b
```

Then run it

```
llm -m openai/gpt-oss20b "Why is it dark at night"
```
## Context Size Changes How it Answers

The larger the context size, the more that it thinks.  You can as to to think on three levels using the prompt, but the context is also important.

Ollama has a default context size of 

```shell
$ ollama run gpt-oss:20b 
>>> /show info
  Model
    architecture        gptoss    
    parameters          20.9B     
    context length      131072    
    embedding length    2880      
    quantization        MXFP4     
```

lmstudio defaults to `4096` so you need to change the context length and then reload the model.
![](../assets/Screenshot%202025-08-06%20at%2016.01.42.png)


1. https://simonwillison.net/2025/Aug/5/gpt-oss/
2. https://www.oneusefulthing.org/p/gpt-5-it-just-does-stuff
3. https://substack.com/inbox/post/170387696
