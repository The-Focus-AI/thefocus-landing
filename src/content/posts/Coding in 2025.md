---
title: Notes for {{date:MMM Do YY}}
date: { { date } }
tags:
  - daily
---

# Voice Chatting

```
Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let’s do this iteratively and dig into every relevant detail. Remember, only one question at a time.

Here’s the idea:

<IDEA>
```

## Identifying issue

```

[tasks.llm-lint]
description = 'What does the model think about this'
run = [ 'cat repomix-output.txt | llm -m claude-3.7-sonnet "$(cat $HOME/prompts/lint)"' ]
depends = [ 'llm-dump' ]
```
