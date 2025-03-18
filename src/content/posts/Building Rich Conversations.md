---
title: Building Rich Conversations
date: 2025-03-18
tags:
  - essay
  - usecase
image: rich_conversations_wide.png
---
There's a new interface in town, where you get into a thoughtful, curious place, and the computer is there to assist you.

Lets actually talk with our data -- not go through some SQL query thing, or be confronted by a wall of text, but be able to go back and forth and go do whatever rabbit holes we want.

# Know your data


![](../assets/render-diagram.png)

# MCP Server

```
Implement a new endpoint which is /v2/car_score/details. This is a GET request, and its purpose is get the car score of the active car.

First write subclass of apiclient that makes the call, and store it in logs folder.

Be sure to make the request before you make any times. Only make the types after you read in the json
file that was written out in the logs file.

Then look at the result to create a new type in types.ts.

Then update the api call to return the object cast into that new type.

Add a new command to the cli that lets the user run it.

Finally, add a new mcp command that exposes this functionality to other AI agents.

Always write tests and run them until everything is resolved.
```

# Client