---
title: Learning on the go with NotebookLM
date: 2025-01-09
tags:
  - thoughts
  - notebooklm
  - gemini
description: I like throwing a bunch of urls into notebooklm to get a good overview of what's talked about while I'm in the car
published: true
image: broadcast_wide.png
---
I was cleaning out my tabs this morning and there were a few things that I wanted to go a little bit deeper on and make sure that I understood. So I thought, hey, let's just throw this stuff into a model and then see if I can listen to it while driving back from the coffee shop.  Its about a 12 minute drive, so instead of listening to some jokers podcast lets make our own!

Here's what it came up with!

<audio controls>
<source src="/2024_Overview.mp3" type="audio/mp3">
Your browser doesn't support audio player
</audio>

# The process

I would suggest doing this before you order the coffee, as it does take a few minutes for the audio summary to generate.  Or maybe you need the caffienne and are planning on ordering something fancy?  Either way, head over to [NotebookLM](https://notebooklm.google/) and sign up.

Create a new notebook.

Copy in the urls.  I used
- [Things we learned about LLMs in 2024](https://simonwillison.net/2024/Dec/31/llms-in-2024/?ref=labnotes.org) (Simon Willison)
- [Claudes Character](https://simonwillison.net/2024/Jun/8/claudes-character/) (Simon Willison)
- [https://www.anthropic.com/research/claude-character](https://www.anthropic.com/research/claude-character) (Anthropic)

Create the notebook.  Then over in the studio, in audio preview, press "Generate".

If you want to have it focus on something in particular, you can enter customize and tell it what to focus on.  If you are using android, you can use the built in speech to text so you can be standing there, waiting for your coffee, publicly talking out-loud.

This will take a bit of time.  I'm assuming that you either have your drink at this point or are just in queue.  Its almost silly to write this out in a post.

Once it's done, on your phone press "Click to load the conversation".  Bluetooth in the car, bluetooth in the headphones, whatever, now you have 20 minutes of a conversation about this topic.

# Listening to custom, AI slop

So now you're in the car, listening to this thing go. What's a couple of thoughts that came out of this? 

The woman speaker -- or is it a woman or just a female voice?  Do they have personalities?  Part of what they where summarizing was Anthropic's strategy plan on how they designed Claude's personality.  But "she" took on the perspective of Simon. She was "using claude artifacts to produce little applications", she "was making one-file python scripts thanks to [the uv python dependancy manager](https://github.com/astral-sh/uv), she was saying, I, she was, I did this, I did that, I explored this. There were topics that Simon was talking about doing, but this machine took it on as their own.

And oh my gosh, were they both so excited. Very awesome, very interesting, super positive, in a way that felt like you couldn't really believe if anything meant anything because there was no sense of what was important or not.  Its like listening to two politicians talk, many bromides, platitudes, and other empty meaningless.  True in an important sense, but without any weight to it.

# Lets chat

Ok, so you've gotten a sense of what's happening, maybe there were a few things that were interesting to you.  Once you are safely back in your computer, head on over the studio, press Interactive Mode, and then join the conversation.

<audio controls>
<source src="/chatback.mp3" type="audio/mp3">
Your browser doesn't support audio player
</audio>

Here's a transcript:

> Woman: Welcome to uh our deep dive into LLMs. You know those uh large language models everyone's talking about. We're going to be looking at some of the biggest AI breakthroughs of 2024.

> Man: Yeah, some really interesting stuff happening. So, we're basing this deep --Oh, wait. Someone wants to join. Hey, go for it.

> Me: Hey, great to meet you guys. Uh I'm really really interested in uh how the how we're we start talking to these things all the time and uh you know how how they've figured out um how they we should treat them, I guess, and how they should uh treat us. So, love to hear more about what they're doing about that.

>Man: Hey, that's a great question and it's definitely something that's on a lot of people's minds.

> Woman: Yeah. It's like we're not just building smart machines anymore, right?

> Man: Exactly. It's about how these AI interact with us and what kind of relationships we have with them.

# Going deeper

OK, so you can have a "real conversation" with these podcast hosts.  You want to yell at them about something?  Maybe they got something wrong or you want to jump back into it?  No problem.

> [!info] Transcribing to text
 As a fun little side, I used Quicktime player to do an audio recording of the conversation, then I dragged it into the NotebookLM as a source.  Once it loads, you click to expand a boom simple transcripts.
 I did need to add who was talking though

# That was the gimmicky stuff

What's interesting about it is the sort of subtle change in the workflow. 

I often find myself driving from place to place and while I love music and occasionally an audio book is good, I'm often listening to podcasts. Why not have a podcast about a customized topic that you're interested in at that moment?

I haven't really explored all the different ways to tweak it. But there's more to go there.

And if you haven't yet -- download the apps.  The Gemini and ChatGPT apps both have interactive voice chat, where you can have a handsfree conversation with it.  Like you are making a call to this thing that has access to all the worlds knowledge.  In my experience Gemini is better with up to date information.