---
title: How I use AI in March 2023
date: 2025/05/12
tags:
  - daily
  - usecase
---
# Copy a podcast into notebookllm

Download the mp3 of the podcast, and throw it into notebooklm

Ask it questions.

https://99percentinvisible.org/episode/619-what-were-reading/

[Download](https://99percentinvisible.org/episode/619-what-were-reading/download)

Drag it into notebook llm, ask it what books they were talking about

It's smart enough to link out to the web

# Honing ideas

# Talking to in the car


# Fetch and Brave Search in Claude Desktop

In `~/Library/Application Support/Claude/claude_desktop_config.json`:

```
{
"mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": [
        "mcp-server-fetch"
      ]
    },
  "brave-search": {
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "BRAVE_API_KEY",
      "mcp/brave-search"
	],
  "env": {
    "BRAVE_API_KEY": "YOUR_KEY"
  }
	}
```


# Planning, brainstorming and idea development


# Voice Chatting

```
Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let’s do this iteratively and dig into every relevant detail. Remember, only one question at a time.

Here’s the idea:

<IDEA>
```

Then

```
Now that we’ve wrapped up the brainstorming process, can you compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation.
```

## Fleshing out the specification

```
Think carefully through this specification, and ask any clarifying questions needed to help with the implemtnation and specification
```

# Development

## Always TDD

If you don't have tests, first think you should do is to say

```
Extract the code into modules and write tests for them.  Make sure you run the tests after every change.
```

This is basically the main loop of what you do.

## Write git-commit-messages

Prompt:

```
Write a commit message based upon the diffs of the code.

Each commit has a type, with a short sentence describing what it is.  There's a longer paragraph afterwards describing the change

feat: Introduces a new feature (correlates with MINOR in semantic versioning). 
fix: Patches a bug (correlates with PATCH in semantic versioning). 
docs: Documentation changes (e.g., updates to README or other markdown files). 
style: Changes that do not affect the meaning of the code (white-space, formatting, etc.). 
refactor: A code change that neither fixes a bug nor adds a feature. 
perf: Improves performance. 
test: Adds missing tests or corrects existing tests. 
chore: Changes that do not relate to a fix or feature and don't modify src or test files (e.g., updating dependencies). 
build: Changes that affect the build system or external dependencies 
ci: Continuous integration related changes 
revert: Reverts a previous commit 

# Examples

feat: Add new user profile feature
fix(parser): Fix issue with parsing dates
docs: Update README with installation instructions
style: Remove unnecessary whitespace
refactor: Improve code readability
perf: Optimize image loading
test: Add unit tests for new feature
chore: Update dependencies 
```

**Usage:**

After you stage the changes

```
[tasks.commit-message]
description = 'Writes a commit message'
run = [ 'git diff HEAD | llm -m claude-3.7-sonnet "$(cat $HOME/prompts/git-commit-message)"' ]
```

## Identifying issues

```
Assess code quality and suggest improvements:
1. Review naming conventions
2. Check code organization
3. Evaluate error handling
4. Review commenting practices

Provide specific examples of good and problematic patterns.
```

**Usage:**

```
[tasks.llm-lint]
description = 'What does the model think about this'
run = [ """
cat repomix-output.txt | llm -m claude-3.7-sonnet 'Assess code quality and suggest improvements:
1. Review naming conventions
2. Check code organization
3. Evaluate error handling
4. Review commenting practices

Provide specific examples of good and problematic patterns.'
"""]
depends = [ 'llm-dump' ]
```

# Understanding a code base

## `claude`

 
```
cd $(mktemp -d)
git clone git@github.com:mem0ai/mem0.git
cd *;claude
```

Then

```
explain how the memory system works, specifically around how it adds memories to the system, what is the prompt it uses
```

And it will tell you about it.  You can ask followups

```
show me both of the prompts
```

That cost 50 cents.

```
> /cost 
  ⎿  Total cost:            $0.51
     Total duration (API):  2m 36.6s
     Total duration (wall): 16m 32.2s
     Total code changes:    43 lines added, 0 lines removed
```
## `repomix`


```
npx repomix --ignore "**/*.json,**/*.ipynb,**/*.mdx"
```

This is a big repo, so I'd suggest dragging the file over and uploading it.

But if it's smaller you can:
```
cat repomix-output.txt | pbcopy
```

## Extracting requirements

In either of these sessions, we can ask the llm to reverse engineer the repo into a specifictation:

```
can you compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation.
```

## Applying the specification to a different repository

I asked it to write out the specifications from the old repository.  It producted three files `implementation-guide.md`, `memory-system-spec.md`, and `prompts-reference.md`.  I copied them into the project, and the fired up `claude code`:

```
look at the files in docs.  I want to add a memory section in @specialist/ai/memory.  Figure out how to translate the system over into typescript, and great specialists for the   │
│   two prompts that are referenced.  Then lets add a simple memory store version of this as part of the chat command, where we can say "--memory" and it will remember     
```

And at the end of all that

```
> /cost 
  ⎿  Total cost:            $4.06
     Total duration (API):  14m 56.0s
     Total duration (wall): 26m 31.0s
     Total code changes:    2134 lines added, 161 lines removed
```