---
title: Local coding agents
date:
  "{ date }": 
tags:
  - daily
---

# lmstudio
Install lmstudio -> download qwen3-32b (check memory requirements)

Up the context length

# create prd

New chat:

> Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea.
> 
> Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let's do this iteratively and dig into every relevant detail. Remember, only one question at a time.
> 
> Once we've come to a good conclusion, or once we are ready to wrap up the brainstorming process, compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation.

Once you are happy, then

> Draft a detailed, step-by-step blueprint for building this project. Then, once you have a solid plan, break it down into small, iterative chunks that build on each other. Look at these chunks and then go another round to break it into small steps. Review the results and make sure that the steps are small enough to be implemented safely with strong testing, but big enough to move the project forward. Iterate until you feel that the steps are right sized for this project.
> 
> From here you should have the foundation to provide a series of prompts for a code-generation LLM that will implement each step in a test-driven manner. Prioritize best practices, incremental progress, and early testing, ensuring no big jumps in complexity at any stage. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. There should be no hanging or orphaned code that isn't integrated into a previous step.
> 
> Make sure and separate each prompt section. Use markdown. Each prompt should be tagged as text using code tags. The goal is to output prompts, but context, etc is important as well.


# install roocode



https://docs.roocode.com/providers/lmstudio?utm_source=extension&utm_medium=ide&utm_campaign=provider_docs

