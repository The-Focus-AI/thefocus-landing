---
title: Applying the specification to a different repository
section:
  - coding
date: 2025-03-14
tech:
  - prompts
---
I asked it to write out the specifications from the old repository. It producted three files `implementation-guide.md`, `memory-system-spec.md`, and `prompts-reference.md`. I copied them into the project, and the fired up `claude code`:

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
