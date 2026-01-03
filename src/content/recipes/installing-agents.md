---
title: Installing Coding Agents
date: 2025-09-16
description: How to get Claude Code, Cursor, and other coding agents running on your machine. The tools that live on your filesystem and do the work.
published: false
tech:
  - agents
  - claude
  - cursor
section:
  - coding
image: installing-agents.png
duration: 30 minutes
---

I like to play with a bunch of different agents, and I use [mise](https://mise.jdx.dev/) to help keep track of thing.  This way they follow me around no matter where I'm doing the coding -- on my laptop, in a codespace, where ever.

The big ones are Claude Code, AMP, and OpenCode.

## Mise

First, install mise.  This just makes it easier to keep track of local versions and what is installed in each project.

```bash
curl https://mise.run | sh
```

And then, in alphabetical order:

## AMP



```bash
mise use node@latest
mise use npm:@sourcegraph/amp@latest

```

## Codex
```bash
mise use node@latest
mise use npm:@openai/codex
```

## Claude

```bash
mise use node@latest
mise use npm:@anthropic-ai/claude-code
```

## Gemini

```bash
mise use node@latest
mise use npm:@google/gemini-cli
```

## Goose

```bash
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash
```

## Kiro

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

## Open Code

```bash
mise use node@latest
mise use npm:opencode-ai
```



## Claude Code (Terminal)

Claude Code is Anthropic's CLI agent. It's the one that feels most autonomous - you can let it run and it will figure things out.

```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Or with homebrew
brew install claude-code
```

You'll need an Anthropic API key:

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

Then just run it in any directory:

```bash
claude
```

That's it. You're in a conversation with an agent that can see your files, run commands, and make changes. Type what you want to do.

### Running Multiple Instances

The power move: run multiple terminal windows with separate Claude Code sessions. Each one holds its own context. One researches, one implements, one documents. They coordinate through the shared filesystem.

## Cursor

Cursor is VS Code with an agent built in. The composer mode is where the magic happens.

1. Download from [cursor.com](https://cursor.com)
2. Open your project
3. `Cmd+K` for inline edits, `Cmd+L` for composer mode

The key difference from Claude Code: **checkpoints**. Every change creates a restore point. You can explore aggressively because rolling back is one click.

### Composer vs Claude Code

Use Cursor Composer when you want to:
- Explore different approaches quickly
- Watch changes happen in real-time in the IDE
- Roll back frequently

Use Claude Code when you want to:
- Let it run autonomously
- Work across multiple parallel tasks
- Do things beyond just code (file organization, research, etc.)

## Warp Terminal

Warp has agent mode built into the terminal itself. It watches your command history and can suggest or execute commands.

Download from [warp.dev](https://warp.dev)

The integration is lighter than Claude Code but useful for quick tasks - "write a script that does X based on what I just ran."

## Build Your Own

If you want to understand how these work under the hood, check out the [Weekend Coding Agent](/reports/coding-agent/) tutorial. You'll build a complete agent from scratch - no frameworks, just the primitives.

The core loop is simple: prompt → model → tool call → execute → repeat. Everything else is context management.

## Which One to Use?

All of them, depending on the task:

| Tool | Best For |
|------|----------|
| Claude Code | Autonomous work, multi-tasking, non-code tasks |
| Cursor | Exploratory development, visual feedback, checkpoints |
| Warp | Quick terminal tasks, command generation |

The real workflow is having multiple instances running. Claude Code in several terminals, Cursor open on the side, each doing different parts of the work. They coordinate through the codebase itself.
