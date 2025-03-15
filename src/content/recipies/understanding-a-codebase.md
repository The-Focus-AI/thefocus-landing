---
title: Understanding a code base
date: 2025-03-14
section:
  - coding
  - analysis
tech:
  - claude
  - context
  - prompts
published: true
related:
  - extracting-requirements
  - repomix
image: understanding-a-codebase.png
description: Explore three complementary approaches to rapidly comprehend any codebase using the latest AI assistants and developer tools. Follow along with practical examples showing how to extract key information about memory systems and other complex functionality with minimal effort.
---
There's a couple of different tools that I use to kind of understand what's going on in a code base. 

## github copilot

I don't think before writing this article out I never even looked at Google GitHub Copilot to use this. But there's a little GitHub Copilot button up there and you can just start typing away and asking questions about it. 

I went to the [mem0ai/mem0](https://github.com/mem0ai/mem0) repo and I asked the question explaining to me how the memory system works. And it gave me a pretty good analysis of how it worked.

*You obviously should adjust what you are looking for.*
```
explain how the memory system works, specifically 
around how it adds memories to the system, 
what is the prompt it uses
```

## pull it locally
What I normally do is pull it down locally into a temporary directory and then use a combination of clog code, cursor, and repo mix to ask it different questions.
```
alias nd=cd $(mktemp -d)
```

## `claude code`


```
git clone git@github.com:mem0ai/mem0.git
cd *;claude
```

Then do `/init` and let it figure out what is going on, and then start asking questions.

## `cursor`

Cursor is a little bit different on some level it's not quite as smart as Claude Code is at the second although I'm sure tomorrow it'll be different but the advantage is here is that you can zip around the repository and navigate and you're sort of poised to start working right away.

But the same prompts works because it's largely the same thing underneath.
