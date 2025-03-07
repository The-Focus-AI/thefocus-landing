---
title: Image Gen on Apple Silicon
date: 2025-03-04
tags:
  - usecase
published: false
image: flux_wide.png
description: We've got the apple silicon, lets download some models and make some pictures
slug: /use-cases/flux-images
---

# aider

## Installation

uv tool install playwright
```
playwright install --with-deps chromium
```

```
uv tool install --force --python python3.12 aider-chat@latest
```
```
playwright install --with-deps chromium
```

## Running

export ANTHROPIC_API_KEY=$(op read "op://Development/Claude API/notesPlain" )
aider --model sonnet

