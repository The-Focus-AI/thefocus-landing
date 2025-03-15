---
title: Exposing Services with MCP
date: 2025-03-15
tags:
  - usecase
description: Model Context Protocol bridges the gap between AI models and your applications, as demonstrated in this hands-on walkthrough with Tezlab's Tesla monitoring service. Learn how defining simple tools with descriptions and parameters lets Claude intelligently combine services like vehicle data and weather information without explicit instructions.
published: true
image: mcp_wide.png
---
This morning I plugged in [Tezlab](https://tezlabapp.com) to my local Claude desktop.

The model context protocol is something like how you would define tools and function calling when you're building your own application. But it lets you do it in a generic way that lets any applications plug into it.

Here's what it looks like:

<div style="position: relative; width: 100%; aspect-ratio: 867/728;">
  <iframe
    src="https://player.mux.com/bU01hI89Fr8gujTDzaCeNPLYzEH8Xv01lp0018g019u6BVs?primary-color=%23ffffff&secondary-color=%23000000&accent-color=%23fa50b5"
    style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; border: none;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>

## How it works

>MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.
>
>-- [Introduction to ModelContextProtocol](https://modelcontextprotocol.io/introduction)

This is very similar to how you would call models with tools. You specify in a ZOD schema what the description of your tool is, what parameters it needs, and sort of the situation why you would call it.

For example, I have a tool that lets you look up Nielsen data, and there's a concept of a nielsen week.  When building out that agent, I tell it about a tool like this:

```
export const getWeekRange = createTool({
  description:
    "If the user references a week, first get the nielsen month range, and within that call this tool, to get the week range.  Nielsen weeks are based on the sunday being in the month",
  parameters: z.object({
    date: z
      .string()
      .describe(
        "The date to get week range for (YYYY-MM-DD format) where DD is th sunday"
      ),
  }),
  execute: async ({ date }) => {
    const nielson_week = get_nielson_week_by_date(date);
    console.log("getWeekRange with date", date, nielson_week);
    return nielson_week;
  },
});
```

So anytime that you talk about a week now, it goes and calls this function that will figure out exactly when a Nielsen week is. Which is weird because say the first week of June doesn't necessarily begin in June. (It's weird.)

Model context protocol extends this, so you're using a very, very similar way of defining a tool, but instead of it being for your own application, you can expose it to other applications.

In this case, I'm doing it for Claude Desktop.

I defined two simple tools, like this.

```
server.tool('chargeReport', 
. 'Get the latest charge report for your vehicle', 
. {}, 
. async ({}) => {
    const client = new ChargeReport(undefined, false);
    const report = await client.getChargeReport();
   . return {
     . content: [
       . {
          type: 'text',
          text: JSON.stringify(report, null, 2),
        },
      ],
    };
});

server.tool(
  'batteryInfo',
  'Get information about your vehicle, its location, type, and battery level',
  {},
  async ({}) => {
    const client = new BatteryInfo(undefined, false);
    const info = await client.getVehicleInfo();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  }
);
```

The description tells the model when and what the tool provides. And for these particular ones I didn't pass any parameters, but above you can see that you can specify any parameters that it requires and the format it needs and the model will do the best to figure it out.

## And it can check the weather

<div style="position: relative; width: 100%; aspect-ratio: 867/728;">
  <iframe
    src="https://player.mux.com/1hTUhfy5l1cEbFtgtmaIKPsKKc5PMeA3kbiwneib92M?primary-color=%23ffffff&secondary-color=%23000000&accent-color=%23fa50b5"
    style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; border: none;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>

If you have other tools defined, then the model can combine them any way it wants to. So I have this one tool that provides the location of the car, so that helps the model figure out where you are. But I've got another tool defined -- which is one of the sample ones, I forgot I had it installed -- which goes and checks the weather. 

If you ask it to plan a trip, it thinks, hey, maybe you want to know the weather in these locations. It just decided to do all this stuff on its own.

[Code is available](https://github.com/The-Focus-AI/tezlab-cli)

