# LinkedIn Posts: The Agent Habitat

Based on "The Agent Habitat" - https://thefocus.ai/posts/agent-habitat/

---

## Post 1 - Main Hook (February 5)

An agent isn't a chatbot.

An agent is a git repo.

Not metaphorically. Literally. The repo IS the agent.

```
twitter-feed/
  .claude/           # Skills, plugins
  prompts/           # The agent's playbooks
  data/              # Working state
  scripts/           # Hardened automation
  CLAUDE.md          # Long-term memory
  .env               # Scoped credentials
```

`CLAUDE.md` is memory. `prompts/` are behaviors. `data/` is state. `scripts/` are the parts that graduated from conversation to code.

Git gives you everything else for free:
- Version history (what changed when)
- Rollback (undo what broke)
- Audit trail (did the agent modify itself?)

I have half a dozen of these "habitats" now. Twitter aggregator. YouTube transcript summarizer. Newsletter clusterer. Operations tracker.

Each one is self-contained. Own skills. Own credentials. Own accumulated knowledge.

You don't deploy agents. You deploy repos.

https://thefocus.ai/posts/agent-habitat/

---

## Post 2 - The Lifecycle (February 7)

Every agent I build follows the same maturity path.

It starts as a conversation. It ends as a cron job.

**Stage 1: The conversation.** You're in Claude Code, figuring things out interactively. "Pull down tweets from my AI Engineers list." Debugging rate limits, learning API quirks. This is exploration.

**Stage 2: The prompt.** Once it works, extract it to a file. `prompts/fetch-tweets.md` captures everything: which endpoints, how to handle pagination, what to do when limits hit. The knowledge lives in the repo now, not in a chat window.

**Stage 3: The optimization.** Notice the prompt burns through your usage. The fetch part doesn't need the expensive model—it's mechanical. Wrap deterministic parts in a shell script. Keep conversation mode only for the parts that need judgment.

**Stage 4: The automation.** Shell script runs on schedule. AI gets called for the smart parts. Whole thing executes without you touching it.

Each stage trades flexibility for reliability and cost.

A conversation can handle anything.
A shell script handles one thing perfectly.

The goal: push toward automation as far as the task allows—but keep conversation mode available for what genuinely needs intelligence.

https://thefocus.ai/posts/agent-habitat/

---

## Post 3 - Credential Isolation (February 9)

The Twitter agent has Twitter API keys.
The newsletter agent has Gmail access.
Neither can see the other's credentials.

This matters more than you think.

Each `.env` is scoped to one service. If something goes wrong—prompt injection, value drift, whatever—the blast radius is contained.

When it's time for production, Docker makes the isolation physical.

The agent:
1. Checks out its repo
2. Spins up a container
3. Does its work
4. Pushes results back to git

It cannot touch the host machine. It cannot access other agents' secrets. The container is the boundary.

We're using Docker and Dagger to create repeatable, isolated environments for each habitat. Dagger is particularly good here—define the environment programmatically: which base image, which tools, which credentials to mount.

The habitat config becomes code, not a manual checklist.

Spin up. Run. Tear down. Reproducible every time.

https://thefocus.ai/posts/agent-habitat/

---

## Post 4 - Sharp Edges (February 11)

I need to be honest about something.

Self-modifying agents are powerful and dangerous in roughly equal measure.

Skills are text files. The agent can read and edit them. More flexible than compiled MCP servers—but it introduces real risks.

I've watched an agent "fix" a date formatting issue by rewriting a date parser. Which then broke a different part of the skill that relied on the original format.

Git caught it. The diff was obvious.

But if nobody reviews the diff, corruption accumulates.

Prompt injection is scarier. If an agent reads external content—a tweet, an email, a web page—and that content contains instructions, the agent might act on them.

An attacker doesn't need to compromise the agent directly. They just need to plant text in a data source the agent consumes.

The mitigations:
- Docker isolation limits access
- Scoped credentials limit damage
- Git provides audit trail

These are safety nets, not guarantees.

I use self-modifying agents because the productivity gain is massive. The git audit trail catches most problems.

But I don't pretend it's solved.

https://thefocus.ai/posts/agent-habitat/

---

## Post 5 - The Stack (February 13)

Here's the whole thing:

```
conversation → prompt → script → skill     (lifecycle)
git repo + tools + memory + credentials    (habitat)
docker/dagger + scoped .env + git audit    (isolation)
```

The lifecycle tells you how an agent matures.
The habitat tells you how it's structured.
The isolation layer tells you how to run it safely.

Start with one agent in a repo. Get it working interactively. Extract the prompt. Containerize it.

That's it.

The patterns are the same whether you're tracking tweets or running a consulting firm's back office.

An agent is a repo.
The repo is the habitat.
The habitat is self-contained.

And if you need to understand what happened? `git log` will tell you.

This is how the data flywheel runs without you at the wheel.

https://thefocus.ai/posts/agent-habitat/

---

## Post 6 - From Conversation to Cron (February 15)

The Data Flywheel showed how data flows through these systems.

GitHub commits become weekly reports. Oura metrics become infographics. Tweets become daily digests.

But in every case, someone was sitting at a terminal typing commands.

`/sync-with-github`
`/daily`
"Pull down the latest tweets."

What happens when you aren't there?

That's the question I've been working on. How do you take something that works when you're driving it and make it run on its own?

The answer is architectural: think about agents differently.

Not as conversations.
As habitats.

An agent carries state, accumulates memory, and makes bounded decisions under uncertainty.

The repo is where all of that lives.

https://thefocus.ai/posts/agent-habitat/
