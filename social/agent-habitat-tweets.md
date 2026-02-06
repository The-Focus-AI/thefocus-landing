# Tweets: The Agent Habitat

Based on "The Agent Habitat" - https://thefocus.ai/posts/agent-habitat/

---

## Tweet 1 - Main Hook (February 5)

An agent isn't a chatbot.

An agent is a git repo.

Literally. The repo IS the agent.

- `CLAUDE.md` = memory
- `prompts/` = behaviors
- `data/` = state
- `scripts/` = hardened automation

You don't deploy agents. You deploy repos.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 2 - The Lifecycle (February 6)

Every agent follows the same path:

1. Conversation (exploration)
2. Prompt (captured knowledge)
3. Script (automated mechanics)
4. Cron job (runs without you)

Each stage trades flexibility for reliability.

A conversation handles anything.
A script handles one thing perfectly.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 3 - The Habitat (February 7)

My agent architecture:

```
twitter-feed/
  .claude/      # Skills
  prompts/      # Playbooks
  data/         # Working state
  scripts/      # Automation
  CLAUDE.md     # Memory
  .env          # Scoped creds
```

Six agents running. Each one self-contained. Own skills, own credentials, own accumulated knowledge.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 4 - Git as Infrastructure (February 8)

Git gives agents everything for free:

- Version history (what changed when)
- Rollback (undo what broke)
- Audit trail (did the agent modify itself?)

Did the agent accidentally corrupt its own behavior? Check the diff.

`git log` is your agent debugger.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 5 - Credential Isolation (February 9)

Twitter agent has Twitter keys.
Newsletter agent has Gmail access.
Neither sees the other's credentials.

Each `.env` scoped to one service.

If something goes wrong—prompt injection, value drift—the blast radius is contained.

Docker makes the isolation physical.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 6 - Docker + Dagger (February 10)

How I run agents in production:

1. Check out repo
2. Spin up container
3. Run the work
4. Push results to git
5. Tear down

Agent cannot touch host. Cannot access other agents' secrets. Container is the boundary.

Dagger makes the environment config code, not a checklist.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 7 - Sharp Edges (February 11)

Honest take: self-modifying agents are powerful and dangerous in equal measure.

Watched an agent "fix" a date parser. Broke something else that relied on the original format.

Git caught it. The diff was obvious.

But if nobody reviews diffs, corruption accumulates.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 8 - Prompt Injection (February 12)

The scarier risk with agents:

If an agent reads external content—tweets, emails, web pages—and that content contains instructions, the agent might act on them.

Attacker doesn't need to compromise the agent directly.

Just plant text in a data source it consumes.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 9 - The Stack (February 13)

The whole architecture:

```
conversation → prompt → script → skill
git repo + tools + memory + credentials
docker + scoped .env + git audit
```

Lifecycle. Habitat. Isolation.

Start with one agent in a repo. Get it working. Extract the prompt. Containerize.

That's the pattern.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 10 - From Flywheel to Autonomous (February 14)

Data Flywheel showed data flows through AI systems.

But someone was always at the terminal:
- `/sync-with-github`
- `/daily`
- "Pull the latest tweets"

What happens when you aren't there?

Agents. Not conversations—habitats.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 11 - The Definition (February 15)

An agent isn't just automation with LLM calls.

The difference:
- Carries state
- Accumulates memory
- Makes bounded decisions under uncertainty

The repo is where all of that lives.

Think habitats, not chatbots.

https://thefocus.ai/posts/agent-habitat/

---

## Tweet 12 - What's Next (February 16)

What happens when you have a dozen habitats running?

How do you coordinate them?
Monitor their sessions?
Extract organizational knowledge from their logs?

That's the next post.

https://thefocus.ai/posts/agent-habitat/
