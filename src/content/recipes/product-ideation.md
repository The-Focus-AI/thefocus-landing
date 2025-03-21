---
title: Planning, brainstorming and idea development
section:
  - coding
  - analysis
date: 2025-03-20
tech:
  - prompts
published: true
image: brainstorm.png
related:
  - add-memory-to-cursor
  - extracting-requirements
description: Transform your rough concepts into detailed project specifications with this powerful prompting technique that guides you through an in-depth development process. By asking just one thoughtful question at a time, AI helps you create comprehensive, developer-ready plans that cover every essential detail.
---

This is a great prompt to help hone an idea.  Use this with a strong model to make sure that it thinks through all of the details.  I've had a 45 minute conversation in the car with ChatGPT about some proejct ideas that I've had!
 
> Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea.
> 
>Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let's do this iteratively and dig into every relevant detail. Remember, only one question at a time.
>
>Once we've come to a good conclusion, or once we are ready to wrap up the brainstorming process, compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation.

And if you are using this inside of cursor, add this at the end to just output the details.

>Put this into memory-bank/project-brief.md

