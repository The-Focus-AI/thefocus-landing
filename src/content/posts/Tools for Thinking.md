---
title: Tools for thinking.  Everyday AI.
date: 2025-01-30
tags:
  - thoughts
published: true
description: From building nuclear fusors to probing Vatican AI doctrine, this exploration reveals how AI tools are reshaping our daily intellectual work in surprisingly practical ways. Through examples of interfacing with databases, analyzing legal documents, and diving into deep research rabbit holes, we see how AI assistants are becoming intuitive research companions that expand our ability to quickly understand and synthesize complex information.
image: using_ai_wide.png
---
I was struck recently reading an article about [A Young Man Used AI to Build A Nuclear Fusor](https://substack.com/home/post/p-155980666) by this passage:

> It's not that I don’t use these things. I do. It’s more that I was watching HudZah navigate his laptop with an AI fluency that felt alarming to me. He was using his computer in a much, much different way than I’d seen someone use their computer before, and it made me feel old and alarmed by the number of new tools at our disposal and how HudZah intuitively knew how to tame them.

How do we really use these new things? Broadly we all agree that it's a big deal, but what, specifically, do we do with it?

My focus at The Focus recently has been to talking to custom databases, teaching a model how to interact with a system, using native language (or business speak if you prefer) do gain insights to the stuff you have around -- more on that later.

![that's a llama](../assets/llama.png)*minimalist line art drawing of a llama, sketched in continuous black lines against a plain, soft lavender background, accentuates the motion, capturing a sense of freedom and elegance*

And in coding I use AI in various ways, from using [v0](https://v0.dev/) or [cursor](https://www.cursor.com/changelog) or [midjourney](https://www.midjourney.com/) to help me do what I would have already done, but better. I can talk to you about [openrouter](http://openrouter.ai/) and [ollama](https://ollama.com/) -- and I will -- but that's all sort of esoteric. What about _normal stuff_?

# Getting answers to a broader array of questions

One handy trick is to upload a pdf or other document to claude or chatgpt and ask it about it. It's better than a summary, though it is that, because you probe questions about it. For example:

## Data Licensing Agreement

[MLS GRID DATA LICENSE](https://static1.squarespace.com/static/5908cde79f745622b6a59828/t/66be47e0d36f050c408abbd8/1723746273028/MLS+GRID+Data+License+Agreement.pdf)

> i want to take this data and show broker performance, is there anything against that in this data agreement

How much cheaper was that then a lawyer? It was a lot cheaper is what.

## Technical Paper

[Load is not what you should balance: Introducing Prequal](https://www.usenix.org/system/files/nsdi24-wydrowski.pdf)

> what are the key takeways

> how does the probing work

> for cold servers how do they report latency

Three questions. Got right to what I thought was interesting about a better way to do load balancing. The idea is very clever, where you are probing the back end servers to report on what its doing, like every second or so. It keeps track of its own historical perfomance, so you don't even really need to tune it. But I'm fascinated with the idea of the machines being "_self aware_" even if in this very technical sense.

If you are interested in this the go to reference is [Performance Modeling and Design of Computer Systems: Queueing Theory in Action](https://www.cs.cmu.edu/~harchol/PerformanceModeling/book.html)

![](../assets/messy.png)*super detailed photography of colorful modern apartment, filled with books and records, surrounded by sales tickets*

## Vatican

The vatican wants to weigh in on AI. Why not? Maybe they know something?

[Antiqua et Nova - _Note on the relationship between Artificial Intelligence and Human Intelligence_](https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_ddf_doc_20250128_antiqua-et-nova_en.html)

> What are the key points

> what is the basis for their arguments about what is or is not human intelligence

> how does it concieve of "human" vs "person", does it all for non-human persons

> what is the distinction between computational thinking and creative thinking?

I'm leaving out the responses since the idea is to use it as a foil of thought, rather than dragging you alone with these random arguments. I tend to ask a bunch of questions about things, and then read deeper if the responses made sense.

In this case, I was deeply surprised that they had no idea of a **non-human person** and wanted to get to the bottom of that. The difference, by the way, of mere computational thinking vs creative thinking is considered by the article to be **self-evident**. Claude concludes with

> The distinction as presented seems more theological/philosophical than empirical, and would benefit from more rigorous definition and evidence.

![](../assets/market.png)*super detailed photography of colorful modern apartment, filled with books and records, surrounded by sales tickets*

# Talking to everything

## Claude Projects

I have one claude project where I've put in every proposal that [The Focus AI](https://thefocus.ai/) has sent out, focusing on the ones that closed. Then for each new client, I have a new chat and give it a high level pitch -- exactly like I would have with a scoping team previously. I do a couple of revisions inside of claude, then I copy the artifact into google docs for final formatting and a final round of pass through where I tweak everything. It's smart enough to get most of the estimations right.

I have another project where I've copied API documentation in from [Tezlab](https://tezlabapp.com/). Everytime I write another little script, I also throw that in there, so it has examples of the coding style I'm interested in. It ends up knowing more and more about it.

The more you use this, the better it will be for getting the answers. This was the technique that the fella who made the fusion reactor used -- filled up the project with everything he could find and used that to help in problem solve.

![](../assets/rabbit.png)*alice in wonderland , mad hatter and the chesire cat going down the rabbit hole in a disney cell animation style*

## DeepResearch

And my real favorite for scratching that intellectual itch is DeepResearch.

### Machines of loving grace

I didn't make it through [Dario Amodei's Machines of Loving Grace](https://darioamodei.com/machines-of-loving-grace) but I recognized the name from the 90s, because I'm old school. Or old.

> where is the phrase Machines Of Loving Grace from, what are the notable references. i know first of the l0pht but it may be somewhere else. what is it an allusion to

This of course gets you very close to the [The California Ideology](https://en.wikipedia.org/wiki/The_Californian_Ideology) (through the show [All Watched over by Machines of Loving Grace](<https://en.wikipedia.org/wiki/All_Watched_Over_by_Machines_of_Loving_Grace_(TV_series)>)). In this context, the original post seems very out of touch.

Actually I feel like the problem with his post was that it wrote it with AI and not enough _soul_. I guess it's computational vs creative after all.

![](../assets/loving_grace.png)*machines of loving grace, psychadelic, lsd, 60s, california*

### Autofiction and Antipsychotic medication

Now here's a real rabbit hole. Multiple books. Different questions. Summarized and papers. More books. This started because I was wondering why there used to be so many insane asylums and had this vague memory of reading somewhere in the 6 volume [My Struggle](<https://en.wikipedia.org/wiki/My_Struggle_(Knausg%C3%A5rd_novels)>) novels that he worked at a mental institution and how "those people never went anywhere, the ship of fools never left port". Did he write that? Did I make it up in a moment of creative remembering? **Strap in**

Upload [Knausgard and the Autofictional Novel](https://www.google.com/books/edition/Knausg%C3%A5rd_and_the_Autofictional_Novel/UzbhEAAAQBAJ?hl=en&gbpv=1&pg=PT6&printsec=frontcover)

> What is this about

> what are american contempories are how are they different

> what are good definations of autofiction

> what is metatextuality

> what does he think abut the difference between the author and the character in the books

> how does reality hunger fit ito it

> what about david shields? who is he and what else did he write?

> can you search the internet to see more about him

![](../assets/ruins.png)*impressionistic oil painting of a mental institution in ruins*

Upload [Reality Hunger](https://www.google.com/books/edition/Reality_Hunger/yXfi3PfMI0kC?hl=en&gbpv=1&pg=PA3&printsec=frontcover)

> heres the text of that book. how does it compare to what knausgard is purported to do

> what does knsausgard, or any of the authors arund him, have to say about mental health

> what about working at a mental institudion

> can you elaborate on how it shaped his perspective?

# Tools for thought

You can use it to check grammar. To fix phrasing. To brain storm different ideas and pick and choose. (I'm thinking about renaming the *agentic framework* we are working on here as _specialist framework_ which was using ChatGPT as a very fancy thesaurus.)

If you have questions it gives you a wider array of answers than were popular before. I've always thought that universities were ways of keeping crazy people productive members of society, where they can use their overactive and possibly not-practical minds to contribute to the world of knowledge. And that's just the sorts of thing that the AIs seem already better at.

It feels like we haven't found the shape of what it can't do, or what it won't be able to do. I think it'll be something around community, loved ones, and all those things that make life living. Right now all of that is wrapped up with success and achievement.

## Wrap up

```
cat Tools\ for\ Thinking.md | \
	llm -m anthropic/claude-3-5-sonnet-20241022 \
	"write two sentences to use as a blog summary to get people to read more"
```

```
Here's a suggested 2-sentence summary for your blog post:

From building nuclear fusors to probing Vatican AI doctrine, this
exploration reveals how AI tools are reshaping our daily intellectual
work in surprisingly practical ways. Through examples of interfacing with
databases, analyzing legal documents, and diving into deep research rabbit
holes, we see how AI assistants are becoming intuitive research companions
that expand our ability to quickly understand and synthesize complex
information.

```
