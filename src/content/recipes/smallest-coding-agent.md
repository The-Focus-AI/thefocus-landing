---
title: The Smallest Coding Agent
date: 2025-12-05
description: A complete agentic coding loop in 25 lines of Bun. No frameworks, no dependencies, just bash and a model.
published: true
tech:
  - prompts
  - claude
section:
  - coding
image: smallest-coding-agent.png
duration: 15 min
---
Just let a smart model use the terminal and you can build anything.
## The everything agent

```javascript
#!/usr/bin/env bun
const API = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "anthropic/claude-opus-4.5";
const TOOL = [{type:"function",function:{name:"bash",description:"Run bash command",parameters:{type:"object",properties:{command:{type:"string"}},required:["command"]}}}];

let msgs = [];
const call = async () => (await fetch(API, {
  method: "POST",
  headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: MODEL, messages: msgs, tools: TOOL })
})).json();

for await (const line of console) {
  if (line === "exit") break;
  msgs.push({ role: "user", content: line });

  while (true) {
    const r = await call();
    if (r.error) { console.error("Error:", r.error.message); break; }
    const m = r.choices[0].message;
    if (m.tool_calls) {
      const tc = m.tool_calls[0];
      const cmd = JSON.parse(tc.function.arguments).command;
      console.log(`$ ${cmd}`);
      const result = await Bun.$`sh -c ${cmd}`.text().catch(e => e.stderr || e.message);
      console.log(result);
      msgs.push({ role: "assistant", tool_calls: [tc] });
      msgs.push({ role: "tool", tool_call_id: tc.id, content: result });
    } else {
      console.log(m.content);
      msgs.push({ role: "assistant", content: m.content });
      break;
    }
  }
}
```

Get yourself an [OpenRouter API Key](https://openrouter.ai/).
## Ask it to update itself to something more awesome.

```bash
bun run index.ts
> add better code editing tools to index.ts
```

Then restart:

```bash
bun run index.ts
AI Coding Assistant (type 'exit' to quit)
Available tools: bash, view_file, edit_file, create_file, delete_file, search_files, find_files, list_dir, replace_in_file, insert_lines, get_file_info
```