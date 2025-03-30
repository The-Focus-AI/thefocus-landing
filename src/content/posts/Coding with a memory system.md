---
title: Coding with a memory system
date: 2025-03-30
tags:
  - essay
  - process
---
I've been playing around a lot with memory system which is a way to sort of give software coding agents context and overall plan for how to build something.

Sort of like sculpting with clay that you start off with a little one prompt that kind of gives you another document and then you kind of mold that document into kind of to make sure that you know what you want and then from there you take that and you expand it off into a bunch of different things you know in my case it's going to be a project plan and architectural decisions and different caveats and constraints and all this stuff about how I want things built.

And since you are documenting your decision-making process, over time it really helps guide future developments and you're able to keep things on track. So in a way you're distilling down the context into a format that you know makes sense for what your thing is.

Now given that I'm doing software development and I'm a software developer, I understand kind of how to break these things down. But this pattern probably is something you can apply to something else.

# Project Brief

The first thing I do is to create a project brief, which is a conversation that I can have where the model, whatever one I want to use really, will ask me about the idea and sort of go through, try to pick parts, pick it apart, make sure that it can work given the constraints and help flush out any issues or whatever that I may or may not have. And then be able to write out a sort of overall document describing what it is that we're trying to do and how it is that we're trying to do that.

Since the prompt library is a model context protocol server, I can just ask the model to load up my briefmaker and off we go.

> load up the project brief maker 

## When is it done

Now I'll also do this in a different context. I'll do it while driving, or I'll do that while thinking about something, doing, you know, maybe not even at the computer. The Google Gemini integration with the Pixel phone makes that super easy to kind of on the flow, on the fly, just make something happen. So if you've got headphones on and you're walking around, you can do it, you know, anywhere.

And often this will be a process of me thinking through an idea and I'll get to the end of it and I'll throw it into some folder somewhere and then I'll look at it later and realize that there's a much simpler way or easier way to do it. So I started off at one point talking about a sort of larger website thing that eventually turned into a quick command line application utility that solved the problem anyway.

# Project Planning

> now i want you to load up the tdd planning prompt, and use the @project-brief.md to write up a memory/project-plan.md

There's a couple of different ways that you can break down a project. I find the most effective way in using agents is to really force it to define the task in the smallest way possible. Make sure that in the task description it's got a clear criteria for success. And then when it actually starts to implement something to make sure that it builds out the test structure first so that it can sort of self-evaluate to see if the code is correct.

So it goes from the project brief, which is a high level concept. Then it goes and breaks that down and do a series of relatively discrete phases that can be layered on top of each other to get it. And then inside of each of these phases, there's clear success criteria. And then inside of each of the things that it's building, it will or it should write out tests first. So that you can basically tell it, "Cool, just keep on running the tests and making sure that they work before we call this done."

# Human in the Loop

What's important about this thing too is that as it spits out the plan you can tweak and adjust it before it does anything else and oftentimes it'll make things too complicated or it misses the point and the project context which is sort of the whole description of like what the end goal or what it is that we're trying to achieve is can help align things in and make sure that they still remain the same but in each of the details it's very useful to say let's stop really think about a plan let me tweak a couple things about this plan okay great now that you're sort of nudged back into what it is that we're trying to do

# Be ready to throw it all away

And then it's a matter of sort of going down the list and making things work.

One key, and maybe not very focused on part of this, is that really to make agentic coding work you need to be very comfortable with and you very often have to throw everything away and start again.

Maybe you're going back to a known checkpoint and maybe you're just blowing the whole thing out of the water and readjusting of how it works.

The process isn't like one and done. The process is sort of two steps forward, one steps back. Sometimes you blow the whole thing up and restart over now that you have, with the agent, I guess, explored the space through which you're trying to develop something in. And your understanding at the end of that process is probably more valuable than the artifact itself. And throw it all away and restart and that might get you to a better place than where you began.

# Other useful things

> load up the library evaluator and lets look at which testing framework is the best in this situation

I also have a library evaluator, which is a prompt that you can ask about what libraries to use for a specific task, and it goes out and looks to see how mature they are, how popular they are, how often they're being maintained, and when they're good in which situation. And so sometimes that can uncover a better solution to the problem.

# Always make it list out the plan

Adding an explicit planning step that it needs to do before it does anything and it knows that you're going to review it really helps focus the task at hand and I believe improves the output of the result.

It's a higher level thing. You're not really asking about a specific immediate task that is doing. It's really more of like let's help reframe that and so that it's able to be very effective.