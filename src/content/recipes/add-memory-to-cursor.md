---
title: Adding Memory to Cursor
published: true
date: 2025-03-20
image: add-memory-to-cursor.png
tech:
  - prompts
section:
  - coding
  - user-experience
description: Transform your Cursor IDE into a more intelligent assistant by implementing a sophisticated memory system adapted from cline-memory-bank. This enhanced version includes TDD principles and integrates seamlessly with your prompt library, allowing your AI assistant to maintain context and remember important details across multiple coding sessions.
duration: 10 min
related:
  - load-and-save-your-prompts
  - product-ideation
  - always-tdd
---
Lets add a memory system to cursor.

This is adapted from [cline-memory-bank](https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank) but I fleshed out the project planning a bit more to be TDD.

I use this with my [load and save prompts](/recipes/load-and-save-your-prompts) pattern to put it in `.cursor/rules/memory-bank.mdc` and then it will help maintain the state of where you are, and you can tell it to remember things across sessions and it's smart enough to do so.

And I use [product-ideation](/recipes/product-ideation) to come up with the initial project brief.

Sort of a poor-mans claude code.

<iframe frameborder="0" scrolling="no" style="width:100%; height:2288px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2FThe-Focus-AI%2Fprompt-library%2Fblob%2Fmain%2Fcursor%2Fproject-builder.md&style=an-old-hope&type=markdown&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>