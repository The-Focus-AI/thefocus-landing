---
title: How I Code in May 2026
date: 2026-05-22
description: Five months after the last update, almost every choice has shifted. Multi-model is the default, open weights showed up, the harness is open, and the coding agent is now a native part of the software process.
published: true
tags:
  - essay
  - process
  - agents
  - workflow
  - coding
image: how-i-code-may-2026.png
---

It's May 2026, five months since I [last wrote about how I use AI](https://thefocus.ai/posts/how-i-use-ai-jan-2026/). That's decades in AI time, so the January column below is already completely out of date — feel free to chuckle knowingly at how cute and innocent it all looks.

The three big shifts: **coding agents as a native software component** &bull; **multi-model by default** &bull; **context compaction as a first-class problem**.

| January                   | May                                          |
| ------------------------- | -------------------------------------------- |
| Opus vs GPT               | Multi-model is the default                   |
| Foundation models only    | Open-weight models in the mix                |
| Context dumbzone          | Multi compaction strategies                  |
| Claude Code               | "Automated shell scripts" as product feature |
| AmpCode                   | AmpCode inspires                             |
| IDE (Cursor)              | TMUX + agent workstation                     |
| Claude Marketplace        | AGENTS.md + skills + MCP                     |
| Reviewing markdown drafts | Reviewing interactive HTML pages             |
| Beads                     | PRD → tracer-bullet issues                   |
| Coding agent as tool      | Coding agent as component of software        |

The big takeaway is that coding agents are now a native part of the software arsenal, alongside the compiler and the database. They're not a *tool* anymore — they're a *component*. It's not "Claude Code" — it's Claude-Code-shaped things, assembled at runtime and build-time, the way you'd compose any other piece of software. The agent is closer to a runtime than an editor.

I have not read source code since last year. I read the thinking blocks, I stop them and correct them, I ask agents to analyze and refactor through specific lenses — but I don't read the code itself, and I no longer particularly care what language it's written in.

What I *do* care about is what happens before the code. There's a whole new layer of work above the spec, and I've started calling it **alignment**.

![Process flow: before and after](../assets/cards/diagram-flow-v2.png)
*The shape of the work changed. Before: PRD → Guided Code → Verify. After: Align → PRD → Tasks → Automated Coding → Verify. The new layer up front is where most of the leverage now lives.*

Everything in this post is, in one way or another, about one of those five boxes. The coding agent isn't a crafting tool anymore — it's how intelligence gets put into software.

## Models

The single-frontier-model era is over. In January it was "Opus 4.5 or Gemini 3, pick one." In May it's a multi-model world by default — different models for different jobs, switched mid-task, sometimes running in parallel against each other. **If your tool is locked to a single model, you're unnecessarily limiting yourself.**

Two things drove this:

- **Open-weight models are good.** DeepSeek V4 did it for me — roughly frontier-tier output at something like 1/100th the cost of the closed labs. A task that runs $30 on Anthropic runs about 17 cents on DeepSeek. That changes what's worth doing: background agents, batch jobs, exploratory loops, and "just try it" workflows are suddenly viable. For local models gemma4 is no joke, though you can watch your battery dissapear. **The Linux moment has arrived for AI** — open weights aren't "the future," they're load-bearing right now.
- **Context and inference are now thought about together.** In January the conversation was "how big is the context window." In May it's "how much compute do we spend thinking about what's in the context." Reasoning models, multi-turn agent loops, and inference-time techniques mean a smaller, cheaper model with more inference budget often beats a bigger model run cheaply.

Use the expensive frontier models for the alignment and planning phase up front, then hand off to lots and lots of parallel cheaper models — including things running on my laptop — for the execution.

## The Harness

*"Claude Code changed everything"* — and now it's wild that Claude Code isn't even the best coding harness for Claude.

![Terminal Bench 2.0 leaderboard with Claude Opus 4.6](../assets/Screenshot%202026-05-20%20at%2011.41.28.png)
*[Terminal Bench 2.0](https://www.tbench.ai/leaderboard/terminal-bench/2.0?models=Claude+Opus+4.6) — the in-house harness no longer wins on its own model.*

The old assumption was that the in-house harness would know best how to use its own model. There's no particular reason that should be true, and increasingly it isn't. The harness and the model both matter, and they should vary independently depending on the task.

Three harnesses are worth calling out specifically:

- **Codex has had a real resurgence.** OpenAI rebuilt it from a niche into a serious contender. The UI iterations got everyone excited, and the ability to have really long-running conversations is genuinely useful.
- **Pi is where I've landed for daily work.** [Pi](https://pi.dev) isn't dramatically better at any one thing — it's that it does *everything new* that the others are racing to add: native multi-model, an open extension model (pi-tmux for sessions, pi-lens for code understanding, pi-web-access for browsing), a shape-it-yourself surface. The engineering also feels especially solid. It's the harness that assumes you want to drive.
- **Amp is pushing on a different axis: deletion.** This is the one I find most interesting. [Amp](https://ampcode.com/) has been aggressively *removing* features rather than adding them. I got excited about `/handoff` and then read that they pulled it because they decided it was ultimately a dead end. That's an unusually mature move in this space — and the broader bet behind it (the right move isn't more affordances, it's fewer and sharper ones) is the most generalizable product lesson of the year. If budget were no issue, I'd spend a lot more time there.

Day-to-day, I'm building custom agents on Pi and luxuriating in the best-of-everything world of Amp. The value of the Claude Max subscription aside, I'm moving away from Claude Code as my only harness. *(And by "moving away" I mean running two Max 20× accounts 24/7 alongside everything else.)*

## IDE vs TMUX vs CMUX

I wrote my first Unix terminal emulator when in the early 90s I was 16, so the terminal is near and dear. I started the year using Claude Code inside of Cursor — multiple Claude instances in different tabs, deep into a client project, Warp on the side for one-offs.

Then at the last AI Engineering course I saw someone using a model to drive TMUX on a remote box. SSH in, detach, close the laptop, come back later, reattach. The combination of background-running agents plus models smart enough to drive TMUX themselves shifted what an "IDE" needs to be.

I moved into Warp with six or seven tabs across projects, two to four TMUX sessions in each. CMUX is also a great agent runner, having the browse as another pane is great and as product is smaller but more focused than the cursor on. I've got a prototype I'm actively building in, it mean its building itself...

The IDE is getting transformed, and it does not look like VS Code anymore. It looks more like a workstation built around concurrent agent sessions, where the filesystem is replaced by worktrees and pull requests are automatically previewed.

![The agent workstation: tiled terminals + live browser preview](../assets/cards/diagram-workstation-v3b.png)
*A typical layout: backend / frontend / test-runner agents up top, research and synthesis panes in the middle, a live browser preview pinned at the bottom. Each pane is its own agent context.*

## Skills, AGENTS.md, MCP

In January I was excited about skills as progressive disclosure, and `CLAUDE.md` as the spot to teach an agent about your repo. Five months later all of that has standardized — and it's no longer Claude-specific.

- `AGENTS.md` is the file every harness reads now. Same role `CLAUDE.md` played, open convention. Cursor, Codex, Pi, Amp, Opencode — they all pick it up, so you can reuse that knoweldge
- Skills are packaged the same way but very annoyingly put in different places. The progressive-disclosure idea won, and the fact that its implictly using CLI tools make things easier
- MCP still has the best way to deal with authentication.  And by best I mean: the least worst, it's still annoying.

The patterns Anthropic pushed (skills, MCP, agent-instruction files) became the industry standard, and in doing so they stopped being Anthropic's. Ironically, Claude Code now has some of the worst support for the open convention — symlink hacks abound — but it's a work in progress.

That maturation is what makes a multi-harness, multi-model workflow actually viable.

I maintain a [standards repo](https://github.com/The-Focus-AI/standards) that defines what every project of mine has installed, and there's a way where those standards are be reappied to existing projects as they change.

| Skill | What it does |
|-------|-------------|
| nano-banana (image) | Image generation via Gemini models |
| nano-banana (video) | Video generation via Veo models |
| focus-ai-brand | Our brand guidelines, applied to any output |
| focus-agents | Our agent patterns and conventions |
| firecrawl | Web scraping and content extraction |
| find-skills | Discover and install new skills |
| swiss-design | General design principles |
| chrome-driver | Browser automation |

## From markdown drafts to live HTML

I stopped reviewing work as markdown and started reviewing it as interactive HTML.

In January, the pattern was "agent writes a long `.md`, I read it, I redline it." Plans, PRDs, research summaries, design docs — all flat text. That's still fine for the *document of record*, but it's a bad *review surface*. You can't sort the table. You can't tab between alternatives. You can't toggle a "what if" parameter. You can't click through to the actual data.

So the new pattern is: agents emit markdown *and* generate a paired HTML page purpose-built for the decision I need to make. I built [artifacts.thefocus.ai](https://artifacts.thefocus.ai/) to host these publicly, and I've started using a "make a magazine" prompt for client briefings — it has completely replaced slides for me.

A few real examples from the last month:

- A PRD rendered as an interactive scope table — toggle features in and out, watch a live cost estimator update at the top.
- A "which model should we use" research note that came back as a sortable comparison grid with hover cards and a side panel of sample outputs.
- An architecture review delivered as a clickable diagram — each box opens the file in question, each arrow has its contract written on it. The corresponding markdown was almost an afterthought.

![Markdown document of record on the left; interactive HTML review surface on the right](../assets/cards/diagram-md-html-v1.png)
*Two outputs, two jobs. Markdown is the document of record — diffable, durable. HTML is the review surface — sortable, clickable, disposable.*

Markdown and HTML aren't competing — they're two outputs with two different jobs. Markdown is the durable artifact: diffable, sitting in the repo, future agents read it. HTML is the *review surface*: it exists for the twenty minutes I'm making a decision, and then it's disposable. The agent regenerates it freely whenever the markdown underneath changes.

This also makes Vercel/Netlify preview deploys feel different. They were already useful for code PRs. Now they're useful for *thinking* PRs — research, planning, design — because the review artifact is a real web page, not a file.

## Process

The flow I'm using now comes from [AI Hero](https://www.aihero.dev/) — software design practices repackaged as reusable skills. It's still in flux, but the **grill-me → mutual-understanding** arc is the heart of it. Mapped against the Align → PRD → Tasks → Automated → Verify diagram from the top, the four phases below are the middle three boxes.

**Phase 1: Grill me.** No more "ask me one clarifying question at a time." The model grills you — challenging, poking at assumptions. This is the pre-PRD alignment phase, the design-driven-development moment. You're getting the idea out of your head and the model's understanding aligned. As a process for understanding what you actually want, it's incredibly useful — and not just for software.

**Phase 2: Generate the PRD.** Only after that shared understanding exists do we write the Product Requirements Document. The prompt explores the repo, uses the project's domain vocabulary, respects existing ADRs, and synthesizes everything into a structured document:

| Section | Content |
|---------|---------|
| Problem Statement | The problem from the user's perspective |
| Solution | The solution from the user's perspective |
| User Stories | Exhaustive list: "As an X, I want Y, so that Z" |
| Implementation Decisions | Modules, interfaces, architecture, schema changes |
| Testing Decisions | What gets tested, how, and why |
| Out of Scope | What's explicitly excluded |

The PRD gets published as a GitHub issue with a `ready-for-agent` label. No extra triage needed.

**Phase 3: Tracer bullet issues.** From the PRD, issues get generated as thin vertical slices — each cuts through every layer end-to-end (schema, API, UI, tests), not horizontal layer-by-layer. Pragmatic Programmer style. Each slice is demoable or verifiable on its own. Prefer many thin slices over few thick ones.

Two types of issue:

- **AFK (Away From Keyboard)** — can be implemented and merged without human interaction. Preferred.
- **HITL (Human In The Loop)** — requires a human decision: architectural choice, design review, etc.

**Phase 4: Parallel agents, parallel branches.** Each issue gets spun out to its own agent, its own branch, its own PR. No particular linear order, but the tasks aren't independent either — some agents wait on others, and the dependency graph is part of the work.

![Five agent swimlanes over time with dashed dependency arrows showing where agents wait on each other](../assets/cards/diagram-parallel-v6.png)
*Phase 4 in practice. Lanes are staggered, not aligned — Agent 3 waits for Agent 1's output; Agent 4 (HITL) blocks Agent 5. The merge to MAIN is where the dependency graph collapses.*

The open question I'm playing with now is how to fully automate the loop — do the grilling to lock in what you want, guide the agents through the issues, then validate.

I'm pushing more of this through GitHub than I used to. PRDs and issues live as tickets, not documents in the repo. The fewer documents, the better. ADRs stay in the repo for architectural context, but the work management flows through GitHub.

Vercel and Netlify spinning up preview instances per PR is the keystone — you can check things humanly as they go, and once they're okay they merge through and deploy automatically.

## What's actually changed

**Claude Code is dead, long live Claude Code.**

The realization underneath everything: you can just give a model access to the computer, and it figures out how to do anything. The shell turns out to be the right interface. OpenClaw — which is literally pi.dev at its core, with a better interface and a charming personality — captured the imagination briefly precisely because it leaned into that. Now there's a blossoming of new, general-purpose harnesses, and **it's not just for code**. The same harness that drives my repo also drives my operations folder, my research, my client briefings.

A few other things shifted underneath:

- **The harness is no longer the moat.** AGENTS.md, skills, MCP, and the open marketplace mean swapping harnesses is cheap. The lock-in moved up the stack to *how you structure the work* — PRDs, tracer-bullet issues, AFK/HITL — which is portable.
- **Open weights + more inference beats bigger model + cheaper inference.** This is the real lesson of DeepSeek plus reasoning models. You can run a lot more cycles for a lot less money, and that compounds.
- **The IDE is dying as a primary surface.** Not gone, but no longer where the work lives. The agent workstation — TMUX/CMUX sessions, branches per agent, previews per PR — is what's emerging in its place.

Five months ago I was excited about agents as collaborators. Now they're just how software gets made. The interesting question isn't "can the model do this" — it's "how do I structure the work so that an agent, or ten agents, can do it without me in the loop."

My bet for the second half of the year: the next wave of process invention will be around **context and long-term memory** — how to compact it, how to share it across agents, how to make it persist across sessions without rotting. That's where most of our internal work is focused now.

Bring snacks. It's accelerating.
