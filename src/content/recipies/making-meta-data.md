---
title: Making Meta Data
section:
  - analysis
tech:
  - prompts
related:
  - git-commit-messages
date: 2025-03-15
published: true
image: making-meta-data.png
description: Generating metadata doesn't have to be a manual process when you can leverage AI prompts to produce multiple options quickly. Discover how to implement command-line tools that streamline metadata creation while maintaining your role as the final decision-maker.
---
Metadata is data about data. It sort of describes the thing. It kind of helps you build context or give it information about what it is that we're talking about.

In short, let's ask questions about something:

> What are the key themes of this post

>give me 5 different, two sentences summaries of this post get people to read more

> write 5 short titles for this blog post

These are really tools for thinking because it often gives you things that are sort of whatever, not very interesting, but there are a few thought-provoking ones. And this will help you quickly iterate over a whole bunch of different ideas, making you sort of a curator and a tastemaker.

Many these things I have set up as commands.

```
run-prompt content/key-themes my-post.md
```

You can see all of this over at [my prompt library](https://github.com/The-Focus-AI/prompt-library)
