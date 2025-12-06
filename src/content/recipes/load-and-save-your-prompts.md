---
title: Make it easy to load and update your prompt library
description: Never lose track of your valuable AI prompts again with this elegant solution for maintaining a personal prompt library. The system provides simple commands to list, load, and save prompts, making it effortless to reuse and iterate on your most effective conversation starters.
date: 2025-03-19
tech:
  - prompts
  - mcp
section:
  - user-experience
image: load-and-save.png
published: true
duration: 10 min
related:
  - add-memory-to-cursor
  - product-ideation
---

My [prompt library](https://github.com/The-Focus-AI/prompt-library) can act as a MCP server, so I can tell cursor to do things like:

> install the enhanced memory bank prompt into .cursor/rules/memory-bank.mdc and run it

Inside of `.cursor/mcp.json` I have the `run-prompt` command set up as a MCP server, like this

```json
{
  "mcpServers": {
    "prompt-library": {
      "command": "uv",
      "args": ["run", "/Users/wschenk/prompt-library/run-prompt", "mcp"],
      "cwd": "/Users/wschenk/prompt-library"
    }
  }
}
```

And that exposes a couple of tools

- `list-prompts` - outputs the name of all the prompts available
- `load-prompt` - returns the prompt
- `save-prompt` - saves a new prompt

I can say something like `write a markdown prompt that helps evaluate different libraries and save the prompt`

Later I can say something like `load the library evaluation prompt, which typescript testing library should i use`

Or in cursor, you could say `load up the visual metafor prompt and ask it about @load-and-save-your-prompts.md`
