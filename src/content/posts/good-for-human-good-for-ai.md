---
title: AI tools fail loudly where humans failed quietly
date: 2025-12-10
description: AI coding tools don't work well in messy codebases. The fix is doing what should have been done all along - and that's good for everyone.
published: true
image: good-for-human-good-for-ai-header.png
tags:
  - essay
  - process
  - agents
---

The client was going through due diligence for a potential deal and one of the points that came up was that their technology was a bit long in the tooth. They wanted to go through and see what they could do to clean things up.

Everything was functional and worked great, just the technology was a bit long in the tooth and, you know, everyone made it work.  *"We know what works, we'll test manually"*.  *"We'll clean it up someday"*, *"It's in the wiki... somewhere"*.

And everyone wants to use these new AI coding tools, but in this codebase it's not really working all that great. There's a lot of spinning around in circles, redoing what it just did, a lot of motion that goes nowhere.

We need to fix it. And the way to fix it is to do exactly what should have been done before. So, onboarding the AI is a great excuse to clean up the stuff that human beings have needed all this time. They just stopped asking for it.
## Making the plan

This breaks down to:

1. Explore and document the major areas of the code base.
2. Examine and document any architectural patterns.
3. Look through test coverage, see what is there, how extensively or usefully things are tested.
4. "Ask the experts"
5. Consolidate the high level migration plan

Then I "ask the experts" to get their opinion:

> what would be a good group of people to explore how to setup the repo so that we can migrate to the latest versions of everything?  what would they say? 

This gave me the perspective of **Senior Rails Developer / Tech Lead**, **Ruby Platform Engineer**, **DevOps / Platform Engineer**, **Database Administrator / Data Engineer**, **QA Engineer / Test Architect**, **Frontend Developer**, **Security Engineer**.  Each of those simulated entities weighed in with their perspective, and then I got a nice plan to start organizing things.  

It even gave me some meta-commentary:

> Key Quote from the Team
> 
> Tech Lead: "The biggest risk isn't the upgrade itself - it's doing it without adequate test coverage. We have 237 background jobs and 546 models with only ~5% test coverage. One silent regression in vehicle telemetry polling could cost us thousands of users. Invest in tests first, then upgrade with confidence."

 There's no right answer but it's always good to get a bunch of opinions to see which things come out the most. And remember, AI is not a person, it's a simulation. So simulate it to the most effect.

## The plan

And now we have a path to start building in good engineering practices that help everyone.  All those requirements that were tribal knowledge, consensus created in an oral meeting that is locked away in peoples heads needs to get extracted from the current code, documented inside of the tests, or otherwise written down.  Its what should have happened before, and it will make everyone's life easier.

And sure, there's a bunch of stuff now in this age of coding analysis that we don't need to document anymore -- the tools can just figure out the simple technical things.  But all of the special information taht makes your core product valueable.

It still needs to be written down. AI didn't change that requirement. It just made ignoring it more obvious.