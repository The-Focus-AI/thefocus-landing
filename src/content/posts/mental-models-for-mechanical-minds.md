---
title: Mental Models for Mechanical Minds
date: 2025-09-06
tags:
  - essay
  - models
  - process
published: false
image: geolocate_wide.png
description: Principles and mental models for effective "vibe coding" with AI - managing context, breaking down phases, and building reliable workflows with LLMs.
---
There are moments when "the models" will stagger you with its ability to intuit your intent, and give you the answer to the question that you should have asked.  Vibe coding in the coding casino, that unpredictable dopamine hit of vibe coding it what makes us coming back for more.


<iframe width="560" height="315" src="https://www.youtube.com/embed/1XRFSXVDx6Q?si=AtYEz4EJ6weOFiCV&amp;clip=Ugkx6Gd8N7MAprQmc4A6bW5_AvTcWnSRHMyq&amp;clipt=EPjgDRic5Q4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



hat dopamine hit keeps us coming back for more -- and it's very c
## Principals of Coding

1. Context management
2. Small Context Window (reset often)
3. Explicitly extract context at the end of phase
4. Output documents and files
5. Planning Context
6. Phase context
7. Rollback and Reprompt
8. Allow agent-reflection: playwright, unit tests


## How to vibe code

Think of it as expanding out documents.  And then you expand those out into code.

The first task is thinking through what you want to do, and creating a feature requirment document, sometimes also called a Product Requirement Document, or PRD.


The first task is the planning, or creating a Product Requirement Document.  This should be a feature: it should be a small, self contained bit of information.  
## Initial Ask

### Prompt 1:
> we want to update the chatbot to use the data inside of CleanEmailsFinalV5.  The plan us to extract the decision tree that is in the data and put that in the database.  then go through each of the emails inside of that file, use an embedder from openai, and put them into a supabase vector store based upon the source question.  then during the chat itself, we want to first take the message that they user asked, pull down similar emails from the vector store, and use that to guide the decision tree to get a response to the user.  look through the CleanEmailsFinalV5 and write a docs/rag_refactor_prd.md file with the plan that we can use.  confirm with me before commitiung to the plan

### Prompt 2:
> we need to add testing to this plan, between phase 2 and 3 we need to have something that takes in a jsonl file with different questions and gets the proper results back -- that output should be a json file that we can view in html.  also the respose should be graded, and it should know what further questions it needs from the user to get to the right answer.  for example, the order number, or which truck they are talking about etc based upon the rag ansswers

## New Context: Phase 1

### Prompt 1:

> imoplement phase 1 in the @rag_refactor_prd.md 

### Prompt 2:

> update everything to always use pnpm and typescript.  for the scripts, have them runnable via package.json so for example pnpm run validate-phase-1 etc

### Prompt 3:

> update the progress in @rag_refactor_prd.md 

## New Context: Phase 2

### Prompt 1

> implement phase 2 in @rag_refactor_prd.md and look through the proess in @phase1-completion-summary.md 

### Prompt 2:

I ran the test script and then I copied in the result:

> error -- also can you update it so it updates it as it goes

### Prompt 3:

run the script and make sure that it works.

### Prompt 4:

update all the progress stuff and aslo @rag_refactor_prd.md 

## New Context: Phase 3

### Prompt 1

> implement phase 3 from @rag_refactor_prd.md 

### Prompt 2:

> run everything and validate that it works

### Prompt 3:

Then I exampled the sample test results, and it was a mess.  the design was all weird, it put the files in the root directory, and basically everything was a mess.  So I got ready for a new context

> Update the status in the docs folder

## Unexpected new context

We need a much better way to do testing and it needs to be way more interactive.

### Prompt 1

> lets review and refactor the test system that we just did.  in @phase3-implementation.md and @phase3-final-summary.md  a lot of things are a failure with this lookup, and the sample html is in the wrong place.  So lets move these test questions into the database, and then also have the results of the run in the database.  In the existing next app lets create a system where we can add in questions, and then do the test runs with it.  There are a lot of problems with the data right now so we need a tigher way to tweak the system to tune it.

### Prompt 2:

copied front end error code in.  Did it a couple times still things started working

## Reset Conext

It went down a crazy path that I didn't like, so I rolled back and reissued the prompt

>lets review and refactor the test system that we just did.  in @phase3-implementation.md and @phase3-final-summary.md  a lot of things are a failure with this lookup, and the sample html is in the wrong place.  So lets move these test questions into the database, and then also have the results of the run in the database.  In the existing next app lets create a system where we can add in questions, and then do the test runs with it.  There are a lot of problems with the data right now so we need a tigher way to tweak the system to tune it.
>
> It should be relatively straight forward.  The tests should have questions, and then ways to see if they are correct -- we can start with a list of strings it should contain or not contain, and what actions it requires (escallate to human, lookup order number, need clarification etc). The runs should be also simple -- defailt to all of the questions, have the optional ability to put a description on it before and after, but nothing complicated.  Be able to pop open the results.

### Prompt 2:

> http://localhost:3000/admin/test-runs doesn't render anything

This used playwright to open up the browser and debuged it!

### Prompt 3:

> the test run should be easy to start, so specifically it should not require a name and just have a date.  description and notes are optionally added before or after the run.  Additionally, we should make sure that the side bar is included on these pages and it fits the overall design.

### Prompt 4:

> The test results say "Based on your question "My bump stops are missing and my springs are bottoming out", here's what I found: This appears to be a test of the RAG system. The system is working and can process your query." so i don't think it's actually running the tests.  look at the database and the code to see

### Prompt 5:

> update the status of the @rag_refactor_prd.md and call this phase3a and update the summary and other things inside of docs/

## New Context: Replanning and Refactoring

At this point we have something working, but something about the plan feels a bit off.  Lets have it reexamine everything from scratch and see where we are, and update the plan if necessary before commiting to implementaiton.

### Prompt 1

Lets make sure that we are all good:

> Lets look through the @rag_refactor_prd.md and the phase status in the docs/ folder.  Do we need the html output or can the current implementation work?  What would we be missing from 3B if we just removed it and moved on to phase 3?

It says basicallt that we've already done 3B

### Prompt 2

> Update status and prepare for phase 4

### Prompt 2: reprompt

i didn't like the plan it came up with, so lets update the prompt for something cleaner

> Update status and prepare for phase 4.  We should make sure that we are cleanly having the manual cli test code and the website code into a common lib directory and that the phase.  Look through the script folder and identify

### Prompt 3

Ok it found a lot of things that can get cleaned up.  Lets get it happening

> Create the lib struction and refactor the code so that it gets pulled out.  Make sure that we rerun all of the tests from previous phases to validate that its working

### Prompt 4:

> update all the docs files especialy @rag_refactor_prd.md 


We are good here.  However I notice that we are at 76% context window size, which is crazy to start the feature development. 

## New Context: Phase 4

### Prompt 1

> implement the next phase in @rag_refactor_prd.md 

### Prompt 2

I tried the chat and it didn't work, so I copied the error from the logs

> restart the server and use playwright to test the rag interface, just use one of the sample questions

### Reprompt 1

After a while this didn't work, so I'm going back and restarting everything from the original check point.  The rolled back like 15 file.s

> implement the next phase in @rag_refactor_prd.md first use playwright to validate that things are working, and examine how the existing chat endpoint is working and how it passes back the assistant id