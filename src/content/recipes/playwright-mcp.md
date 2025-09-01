---
title: use playwright mcp to get high fidelity designs
published: true
date: 2025-09-01
image: playwright.png
tech:
  - mcp
section:
  - coding
  - analysis
description: Learn how to integrate Playwright MCP server to enable AI coding agents to interact with web browsers, take screenshots, and validate designs with high fidelity for accurate web development and testing.
related:
  - context7-mcp
---
[playwright](https://playwright.dev/) is a programmable browser that you can plug into your coding agents.  You can use this to make sure that your design is right, or to have it look at websites that try to prevent bot traffic.

Add the [playwrite-mcp](https://github.com/microsoft/playwright-mcp) to your claude environment.

```bash
claude mcp add --scope project playwright npx @playwright/mcp@latest
```

Lets look at how to code a design: Take a screen shot, for example of a claude instance inside of cursor, why not?
![](../assets/Screenshot%202025-09-01%20at%2014.53.43.png)

And then prompt claude:

> recreate this screenshot found in this directory in a html.  pay close to the design and and take screenshots using the playwright tool to compare to make sure its recreated exactly

Anytime you can give the LLM a way to measure its progress it does so much better.