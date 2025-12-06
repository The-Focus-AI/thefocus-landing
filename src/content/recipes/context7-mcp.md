---
title: context7-mcp
published: true
date: 2025-09-01
image: context7.png
tech:
  - mcp
section:
  - coding
  - analysis
description: Learn how to integrate Context7 MCP server to get up-to-date code documentation for LLMs and AI code editors, enabling real-time access to the latest library and framework documentation.
duration: 5 min
related:
  - playwright-mcp
---
One must have mcp server is context7, which is up-to-date code documentation for LLMs and AI code editors.  Knowledge moves fast.

What makes it particularly powerful is how it enables AI models to learn from current documentation rather than the potentially outdated data they were trained on, creating a dynamic feedback loop where your AI assistant becomes more knowledgeable about the latest best practices.
## Installation

```
claude mcp add --scope project context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

*You can leave off the API_KEY if you don't have it*

This lets you pull down the latest version of the docs, so you can ask it to lookup how to do a certain thing and the model will learn how.

## Example Usage

Once installed, you can ask questions like:
- "How do I implement authentication in Next.js 14?"
- "What's the latest way to handle forms in React 18?"
- "Show me the current MongoDB aggregation pipeline syntax"
- "What are the new features in Supabase v2?"

The AI will fetch the most current documentation and provide accurate, up-to-date answers based on the official sources.