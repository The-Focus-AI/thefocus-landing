---
title: Agent Coordination
date: 2026-02-10
description: "Coordinating multiple agent habitats, mining session logs for organizational knowledge, and the monitoring patterns that make autonomous agents reliable."
published: false
tags:
  - essay
  - agents
  - workflow
  - process
image: agent-coordination.png
ogImage: agent-coordination.png
---

In [The Agent Habitat](/posts/agent-habitat) I described how each agent is a self-contained git repo — its own skills, credentials, memory, and working state. That pattern works for one agent. But what happens when you have a dozen of them?

## The Coordinator

Once each agent is a self-contained repo, you need something to run them. This is the coordinator — and yes, it's also a repo.

```
coordinator/
  agents/
    twitter-feed.yaml
    youtube-feed.yaml
    newsletter-feed.yaml
    operations-sync.yaml
  auto-sync.sh
```

Each config specifies: which repo, which prompt or script to run, what credentials to mount, how often. The coordinator doesn't need to be smart. It starts containers and reads exit codes. All the intelligence lives inside each agent's habitat.

Two scheduling patterns have emerged:

**Cron-like.** Run every hour. Run every morning at 6am. Simple, predictable. Works for things like the operations sync where you want a daily briefing at the same time.

**Rate-limit-aware.** This is the interesting one. The Twitter agent reads the API response, sees `x-rate-limit-remaining: 3`, calculates that the limit resets in 46 minutes, and decides to sleep. It wakes itself up and continues. The scheduling isn't external — the agent manages its own pace based on the constraints it encounters.

```bash
#!/bin/bash
# auto-sync.sh — run the twitter agent in the background

claude --print \
  --dangerously-skip-permissions \
  --model sonnet \
  --prompt "$(cat prompts/sync-all.md)" \
  > logs/$(date +%Y%m%d-%H%M%S).log 2>&1
```

The `--dangerously-skip-permissions` flag is what makes unattended execution possible. The agent runs without asking for confirmation at each step. This is fine *because* the habitat is isolated — scoped credentials, Docker container, git audit trail. You've already made the security decisions when you set up the habitat.

The log files are where monitoring happens. Each run produces a timestamped log. If something goes wrong, you can read exactly what the agent tried to do. Over time, these logs become a dataset themselves — patterns of failures, rate limit behavior, processing times.

The end state: a coordinator managing multiple habitats, each in its own container, each with its own credentials, each producing logs you can inspect. Not an AI framework. Just repos, containers, and cron.

## Session Memory

Here's an underappreciated fact: every Claude Code session gets stored locally for 30 days. Cursor stores its sessions in a SQLite database. These conversation logs are a goldmine that almost nobody mines.

I've been building tools to browse and search past sessions. You can go back and see exactly what an agent did — which files it read, what commands it ran, what reasoning it applied. When something breaks, you can replay the session and find where it went wrong.

But the more interesting use is extracting knowledge. Every conversation contains lessons learned. "The Oura API returns sleep data in a different format for naps vs. overnight sessions." "Clerk's webhook payload changed in v5." "The LinkedIn rate limit is per-application, not per-user." These insights get discovered during interactive sessions and then... forgotten. The next session starts fresh.

There's a research paper from September 2025 that tested exactly this idea. They created a private social network for AI agents — a place where agents could post what they learned after completing tasks. Other agents could query this network before starting similar work. The result: a 14% improvement in problem-solving ability. Not from better models. Just from shared context.

I've been experimenting with something similar. After a session where I figured out a tricky integration, I have Claude write up the key learnings and save them to a shared knowledge file. Future sessions can consult it. "What did we learn about Clerk + Supabase on the Wobblefish project? Use that approach here."

The vision is organizational knowledge emerging from agent activity. Not documentation written by humans (which is always out of date) but knowledge extracted from actual working sessions (which is grounded in reality). Each agent's session logs become institutional memory.

## Monitoring

TODO: Log parsing, the session viewer tool, real-time monitoring of background agents, the unwelcome log parser.

## The Full Stack

```
conversation → prompt → script → skill     (lifecycle)
git repo + tools + memory + credentials     (habitat)
coordinator + schedule + monitoring         (orchestration)
session logs + shared knowledge             (institutional memory)
```

Each layer builds on the one below it. The lifecycle tells you how an agent matures. The habitat tells you how it's structured. The coordinator tells you how multiple habitats work together. Session memory tells you how they learn.
