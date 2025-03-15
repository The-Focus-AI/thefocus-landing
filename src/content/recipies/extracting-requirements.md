---
title: Extracting requirements
date: 2025-03-14
section:
  - coding
  - analysis
tech:
  - prompts
related:
  - repomix
  - understanding-a-codebase
published: false
description: " Need to understand all the requirements hidden in a codebase? This technique shows how to use LLMs to compile comprehensive specifications from repository analysis for immediate development use."
image: extracting-requirements.png
---

In either of these sessions, we can ask the llm to reverse engineer the repo into a specifictation:

```
can you compile our findings into a comprehensive, 
developer-ready specification? Include all relevant 
requirements, architecture choices, data handling 
details, error handling strategies, and a testing 
plan so a developer can immediately begin implementation.
```

That cost 50 cents.

```
> /cost
  ⎿  Total cost:            $0.51
     Total duration (API):  2m 36.6s
     Total duration (wall): 16m 32.2s
     Total code changes:    43 lines added, 0 lines removed
```
