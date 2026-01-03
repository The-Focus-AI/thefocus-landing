---
title: How I Use AI in Jan 2026
date: 2026-01-03
description: We're at the beginning of infinity. In geological time this is all happening in an instant — and 2026 might be the best year to be alive.
published: true
tags:
  - essay
  - process
  - agents
  - workflow
image: how-i-use-ai-jan-2026.png
---

This is what it feels like to live in The Singularity.  The amount of change and discovering for what AI can do is staggering, and what was cutting edge on Monday seems to be ho-hum by Friday.  So, in the spirit of "this will be out dated by the time I press publish" I wanted to share how I use AI.

## LLM inside your computer

The best way to AI is inside of a workspace,  an actual file system where they can read and write documents, run commands, and call tools.  The web chat products are fine for quick questions, but you lose your conversations, there's no persistence, and the model can't actually *do* everything -- its annoying to be in someone else's sandbox.

* A way of reading and writing files
* Access to bash

Give an LLM access to your computer.  It can look at your project, understand what's there, make changes, run tests, and iterate.  That's where the real leverage is.  And not just code.

## Couple of non-code examples

### operations

I have an `operations` folder where I track client SOWs, invoices, development projects, sales leads, and content ideas.  I've had it customize itself to do the work I need, so it's smart enough to look through GitHub to see exactly what the state of each project is.

So when I ask it for a status, it pulls down the repo, looks at what is in there, compares it to the SOW, and gives me an update.  I wired that up using only english words.

### health

I'm just starting a 10 day water fast.  I'm using claude to record my stats, and I have a manual scale plus an oura ring.

> make me a skill that connects to my oura, and then tell me the monthly sleep and exercise trends

And it goes off and does that.

### family infographics

We are just finishing up xmas and New Years break, which is 16 days long!

So we came up with a plan, then had nano-banana make an infographic about it, which is now on the fridge where we cross things off.

![](../assets/Gemini_Generated_Image_f433wrf433wrf433.png)

*We are finishing up day trips now, so hopefully I'll see you on Jiminy later today*

## The Models

Gemini 3 and Opus 4.5 are notably smarter than everything else, including you.  That's a very weird feeling at first, but it's actually pretty wild to have a familiar.  I've basically stopped using ChatGPT -- no particular reason, Claude is just better for my day to day and Gemini when I need something with different umph.  Grok seems like it's also very impressive but I keep forgetting about it.  Sorry.

On the OSS side, I think there's a bit of a pause right now since the frontier models are so good.  But I'm looking at MiniMax and Qwen3 mainly, with gpt-oss as a go to.  I mention this because ultimately this will be the future, and we will be casually hosting these things ourselves, even if that's not where the action is currently.

## The Harness

[Claude Code](https://code.claude.com/docs/en/overview) is the winner.  I use this in the terminal, I use it in emacs, and I use it (mainly) inside of Cursor.

Why is it better?  It shouldn't be -- a multimodel one like [Amp](https://ampcode.com/) or [Goose](https://block.github.io/goose/) or should be better, but, you know, they're not.

## Peak Skills

Anthropic led the charge with MCP, which I believe has run its course.  Skills do everything that MCPs do, but backwards and in high heels, and also better respect the context window.

What skills are is a way to package up context that can be progressively disclosed, so you don't tell the models every last thing about what you want to do, but you tell it "when you want to do X look here for more detailed instructions".  You can add a whole bunch of skills to your "agent" without having it get confused.

They are also really easy to write.  So I have ones for [The Focus AI Branding](https://github.com/The-Focus-AI/focus-ai-brand) or [How to use Nano Banana](https://github.com/The-Focus-AI/nano-banana-cli) and now I've taught my agent how to do those things.  Claude doesn't support generating images out of the box, but who cares since I can teach it how to.

## Market Place

Claude is building an ecosystem around itself, which is making it very powerful.  Others are catching up but Anthropic continues to be the leader here.

I've published a few plugins myself — [focus-ai-brand](https://github.com/The-Focus-AI/focus-ai-brand) for applying our brand guidelines to any document, and [nano-banana](https://github.com/The-Focus-AI/nano-banana-cli) for image and video generation.  Installing them is just a URL — no npm, no package managers, just point Claude at the repo and it figures it out.

The thing I'm watching for is composability.  Right now plugins are mostly standalone tools, but the real power will come when they start talking to each other.  Imagine a research plugin that hands off to a writing plugin that hands off to a publishing plugin — all orchestrated by the same agent context.  We're not quite there yet, but you can feel it coming.

## Coding

I still use cursor as my main coding IDE -- this is largely because it's easy to manage files with it, and there's plenty of time where I'm working on documents.  I've iterated on a bunch of different planning and memory systems, and have currently settled on

* "Planning mode"
* Beads
* Lots of instances of claude running at the same time

## Planning mode

What I mean by planning is to tell it what I want it to do, and then present me with a thoughtful plan on how to do it.  The key phrase is

> Ask me clarifying questions one at a time

And we go through.  Then you say

> Is there anything that we missed?

Then you think about it again.  **Make sure that it's only working on the plan, and not implementing**. 
Then I use [beads](https://github.com/steveyegge/beads) to actually manage the work.  This is like a todo list on steroids, where it will break down the tasks into dependent modules, where each of the tasks knows what it needs to know to implement itself.  It will give the order etc, while you have everything in the planning context active.

Then you can reset the whole window and say "work on the next most important thing" and it'll go through that list and just keep going.  It will mark things as in progress so multiple things can happen at the same time.

I haven't gone full [Ralph Wiggum](https://www.youtube.com/watch?v=fOPvAPdqgPo) yet but I'm glancing towards [Gas Town](https://github.com/steveyegge/gastown).

## What's Actually Changed

We are getting smarter at post-training inference.  Reasoning or multi step agent calling are all adding more effectively capabilities to the models.  "Spend more time thinking" and well, it's smarter.

We are starting to develop more effective techniques for memory.  People learn; LLMs don't really, or at least not the same way that we do.  There's so much action on coding agents because the development of the harnesses goes parallel, and people are figuring out how to leverage the models better than the foundation labs.

There was a lot of manual memory management floating around at the beginning of 2025 -- I got really into the cline one and spent many days trying to force Cursor to "follow all your @rules and update the memory".  It worked but was frustrating.  Now they've gotten better at following the rules, and also now we have better systems for tracking things.

## More context

We are still discovering what these tools can do -- and if the larger bitter lesson is that we are computer starved, it's also clear that we have been memory starving them.  2026 will bring more techniques of managing and finagling the context.

Welcome to the singularity. Bring snacks, it's going to be a while.