---
title: Fetch and Brave Search in Claude Desktop
section:
  - user-experience
date: 2025/03/14
tech:
  - mcp
  - clients
---

In `~/Library/Application Support/Claude/claude_desktop_config.json`:

```
{
"mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": [
        "mcp-server-fetch"
      ]
    },
  "brave-search": {
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "BRAVE_API_KEY",
      "mcp/brave-search"
	],
  "env": {
    "BRAVE_API_KEY": "YOUR_KEY"
  }
	}
```
