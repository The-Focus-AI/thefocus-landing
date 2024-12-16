---
title: Adding chat to NextJS App
date:
  "{ date }": 
tags:
  - daily
---

```
npm i ai ollama-ai-provider
```


```
import { StreamData, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

export const runtime = "edge";

export async function POST(req: Request) {
  const json = await req.json();
  console.log("json", json);
  const { messages, model } = json;
  const ollamaModelName = model.split(":")[1];
  console.log("ollamaModelName", ollamaModelName);
  console.log("messages", messages);

  const ollamaModel = ollama(ollamaModelName);
  // Create a new StreamData
  const data = new StreamData();

  const stream = await streamText({
    model: ollamaModel,
    messages: messages,
    onFinish() {
      data.close();
    },
  });

  return stream.toDataStreamResponse({ data });
}
```


