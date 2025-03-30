---
title: Lift and shift
section:
  - coding
date: 2025-04-02
tech:
  - prompts
related:
  - extracting-requirements
  - add-memory-to-cursor
image: lift-and-shift.png
published: true
description: Master the art of learning from existing projects by using this structured approach to extracting and documenting requirements and insights. With simple command-line tools and clear documentation practices, you'll be able to turn any existing implementation into a wealth of reusable knowledge.
---
Pull out the requirements and best practices from a repository, or even a set of screenshots, and then use that to implement your own version.

>Extract all the learnings out of this repository -- ask me what I want to focus on.
>
> Look through all the of code, and the dependancies, how the build is setup, and
how the tools are setup, and write a clear specification for how to create a project
with these qualities in mind.
>
> If there are any lessons learned that are applicable in the future be sure you include them.
>
Extract all of this into a clean file -- if you are running in cursor save it as reimplementation-guide.md

So if you wanted to do this first get everything:

```bash
npx repomix
```

Then you can copy it

```bash
cat repomix-output.xml | pbcopy
```

And move it over.

Or just run it on the cli.

```bash
npx repomix
cat repomix-output.xml| run-prompt code/extract-requirements.md
```

This works especially well when you have a memory system in place which is tracking what you've been working on.