---
title: "There are no AI-native enterprises"
date: 2026-04-23
description: "And there won't be for a while. Enterprises are ecosystems with their own internal physics — becoming AI-native means rebuilding the machinery that runs the ecosystem, not just the product it ships."
published: false
tags:
  - essay
  - org-age
  - enterprise
  - maturity
---

*Why the enterprise AI problem is not a technology problem. In the series: The Org Age of AI.*

---

There are no AI-native enterprises. There won't be for a while.

Part of it is age. A fifty-year-old company has fifty years of decisions baked into how it operates, and you cannot unbake them on a Tuesday. But age is the easy explanation. The deeper reason is that enterprises are ecosystems with their own internal physics, and those physics do not bend to what the market wants.

From the outside, a large company looks like a firm that responds to customers and competitors and margins. That is half the picture. The other half is an internal economy running on different forces entirely. Companies do not spend money — they spend budget, allocated quarterly, denominated in headcount and FTE units, distributed across cost centers whose interests do not align. Information is a currency, and hoarding it is a rational strategy. Tribes form around functions, and functions defend their territory. Managing upward is its own skill. Every organization reaches a steady state, and every steady state resists change, because the steady state is what the people inside it have optimized for.

None of this is a pathology. This is what an enterprise *is*. Consultants know this. Every career consultant knows this. It is why the same PowerPoint gets different reactions in different rooms even when the numbers are identical. The market sees a firm; the firm contains politics.

Most writeups of "AI-native transformation" skip this. You cannot rebuild an enterprise around AI the way you rebuild a hundred-person consultancy. The enterprise is not a larger consultancy — it's a different kind of system, and it has to be addressed on its own terms.

## In the business, on the business

Here is a split that collapses in startups and opens up at scale.

There is AI **in the business** — how the product gets built, how the service gets delivered, how the customer gets served. The thing you sell, and the work of producing it.

And there is AI **on the business** — how the company runs itself. How decisions get made, how budgets move, how information flows upward, how the stated org chart relates to the real one.

In a ten-person company these are the same thing. The founders write the code and also decide what to build and also do the accounting. Everyone sees everything.

In a fifty-thousand-person company they come apart. A bank can ship AI-powered fraud detection and still run quarterly planning on slide decks emailed between executive assistants. A manufacturer can automate warehouse routing with computer vision and still budget in FTE units fixed at the start of the fiscal year. The product can be AI-native while the company stays entirely pre-AI in how it operates. One side moves; the other does not.

Almost all the enterprise AI work happening right now is on the "in" side. None of it touches the harder problem. The question this post is about: how do you make an enterprise AI-native on both sides at once, when one side is a technology upgrade and the other is a rebuild of the machinery of the organization?

## What's the agent version of Cold Start?

There is an old algorithm for this problem, on the human side.

Andrew Bosworth calls it the Career Cold Start. When he joins a new team he takes thirty minutes with each person and asks three questions. Twenty-five minutes: *tell me everything you think I should know*. Three minutes: *what are the biggest challenges the team has right now?* Two minutes: *who else should I talk to?* He repeats the loop with every new name until no new names come up.

The algorithm works because it produces, in about a week, a private model of the real organization. Question one gives the vocabulary and the priorities. Question two surfaces quick wins. Question three, the two-minute one, is the interesting one — the names it produces "tend to look very different from the one in the org chart." It's a shadow map of how work actually gets done. Every effective new executive runs some version of this. Most don't call it an algorithm. They call it getting up to speed. Then they act on the map quietly, routing around formal structure without anyone having to name the routing.

Now ask the interesting question. When an agent joins the same organization, what is its version of Cold Start?

The agent cannot ask Dave what he knows. The agent has to read what has been written down. If the cost code mapping lives in Dave's head, the agent cannot use it. If the approval flow actually goes through three people who are not on the org chart, the agent will route to the chart and the work will stall. The agent version of Cold Start is the act of writing down what the organization already knows but has never written down — in a form a machine can act on.

That is what makes this transition political. The executive can run Cold Start privately; the notes never leave the notebook. When the output is a machine-readable document the whole company will use, the private becomes public. Dave's cost code mapping stops being Dave's leverage. The real approval chain stops being shadow. The set of exceptions everyone knows but nobody admits — the invoice rules, the pricing carve-outs, the vendor special cases — get written into a spreadsheet the agent reads from and the auditor can subpoena.

This is why small companies reach L2 easily and enterprises grind on it for years. Small companies have no Dave yet. Enterprises are full of Daves, and every Dave is a rational actor inside an economy where undocumented knowledge is a source of security. Documentation is redistribution. A lot of the resistance you will meet is not about the technology. It is about the fact that the public version changes who has power.

## Shadow IT, shadow AI, and the load the official path has to carry

The other place the real organization lives is shadow IT.

Every enterprise has it. A separate, unofficial stack that people actually use because the approved one cannot carry real work. Engineers running scripts on personal laptops. Finance maintaining the real forecast in a spreadsheet outside the ERP. Sales reps keeping the actual pipeline in a tool the CRM vendor never sold them. The official stack exists; the work happens elsewhere.

Shadow IT gets framed, usually by people who have never done real work inside a large company, as a governance failure. It is not. It is a diagnostic — it tells you exactly where the official path cannot carry what the business is trying to do. The question is never "how do we eliminate shadow IT." You cannot, and every attempt makes the shadow deeper. The question is: *how do we make the official path the fast path?*

The same thing is happening with AI, right now. Employees running ChatGPT on personal accounts against company documents, because the procurement cycle for an enterprise AI agreement is nine months and the analysis needs to happen this week. Mid-level managers building Claude workflows on the side, because the approved "AI strategy" is a PowerPoint deck with no engineering team attached. A team lead somewhere quietly running an agent against a production database because it works, and because waiting for the official read-only MCP server to exist would mean waiting forever. This is shadow AI. It is everywhere. Stamping it out is not a plan.

So what does the official path have to do to win?

**Pick a platform, and stand behind the choice.** Claude, GPT, Gemini — the tradeoffs are real but none is so decisive you can wait for the winner. Pick one. We picked Claude. You could pick any of them. What matters is that the organization can say *this is how we do things here, this is the blessed tool, this is the supported version, this is where training and docs live.* A firm with no platform choice has a thousand platforms, which is the same as having none.

**Curate skills, agents, and MCP servers.** A platform without an artifact layer is a toy. The real productivity comes from the library — the skills, the agents, the MCP servers that connect to internal tools. Every artifact is a third-party dependency the enterprise just took on. Every one needs to be reviewed before it is blessed, and re-reviewed when it changes. This is a new vendor-management discipline, and there is no SOC 2 regime behind it yet. Someone has to curate the internal marketplace. That job did not exist two years ago.

**Build the audit trail as if you will be asked to produce it.** Because you will. Every agent action needs to be reconstructable: which prompt, which context, which tool calls, which data inputs, which outputs, which human approval if any, at what time, on whose behalf. Not "the agent processed the refund" — the full causal chain, survivable by legal hold, readable under GDPR DSR, producible under SEC subpoena. Logging this is not hard. Logging it in a way that holds up in court is a real engineering project, and nobody has scoped it honestly.

**Answer the data questions before the customer asks.** Are you sending customer data to a model provider? Is it being used to train anything? Can you prove it isn't? Where is it stored, for how long, under whose jurisdiction? Every customer contract now has clauses that did not exist two years ago. Every DPA has riders. Every RFP has a section. The answers have to be true — not documented, *enforced*. A platform that says "we don't train on your data" has to be configured to not train on your data, and the configuration has to be auditable. Most enterprise AI setups right now cannot actually prove this.

**Classify the inputs, and the outputs.** A human analyst reads five confidential documents and writes a summary. The summary inherits the clearance of the inputs. An agent reads the same five documents and writes the same summary. What is the classification of that summary? What if the agent was invoked by a user with clearance for four of the five documents but not the fifth? Data classification has been a solved problem in enterprises for decades — for humans. It is not yet solved for non-human consumers that combine, transform, and re-emit information.

**Make identity and permissions work for non-human actors.** When the agent runs, who is it acting as? Does it inherit the user's identity, or does it have its own service credentials? If service credentials, what RBAC profile? What happens when an agent invoked by user A tries to read a resource only user B can see — does it fail, silently redact, alert? SSO, RBAC, DLP, network segmentation were all built for humans with badges. The infrastructure now has to stretch to cover a class of actors that do not have badges, do not have performance reviews, and do not have manager chains.

**Write the incident runbook.** The agent did something wrong. Now what? Who gets paged? How do you roll it back — and what does "roll back" mean for actions already sent out into the world? How do you communicate to the customer? Who is accountable? The first major agent-caused incident at a Fortune 500 is going to surface a lot of untested assumptions. Better to test them on purpose.

**Offer customer assurances you can actually keep.** "We do not train on your data." "Your data is not sent to third-party models without explicit consent." "You can request deletion." "We can produce, on request, an audit log of every AI interaction that touched your account." These are standard clauses in procurement RFPs from any customer with a real legal department. The enterprise either has the systems to make them true, or it has to decline the business. Most enterprises currently have *some* of these systems for *some* of their use cases, in a way that isn't enforced.

This is the load. It is heavier than any AI strategy deck admits, and heavier than the platform vendors acknowledge when they are selling you the runtime. It is also the answer to what "becoming AI-native on the business" actually looks like. Shadow AI exists because the official path does not yet carry any of this weight, and the business cannot wait. The job is to stand up a path that does carry it — and to make that path *faster* than the shadow. Safer isn't enough. If the official path is slower than the shadow, the shadow wins.

## The currency is failing

Even once you build all of that, a second problem surfaces. The business model of the enterprise itself was denominated in a currency that is starting to fail.

Services businesses billed by the hour. Hours were never a measure of value — they were a measure of cost, and the industry agreed to treat cost as the stand-in for value because nothing better was handy. An agent that compresses eighty hours of analyst work into forty minutes breaks the arrangement. You cannot bill for the forty minutes at the old rate. You cannot bill for the eighty hours you did not do. The value is real; the invoice has no line item for it.

Design firms billed for the artifact. A finished PDF, a figma file, a brand guideline. The artifact was a proxy for the thinking. When the thinking gets distributed across a human-plus-agent workflow and the artifact is produced overnight, the proxy breaks. The firm's entire apparatus — scoping, pricing, hiring, training, promotion — was built around producing artifacts at a rate humans can sustain.

Software companies sold per seat. One human, one login, one monthly fee. Agents are not seats. They run autonomously, they multiply, they burn tokens in patterns that do not map to seat counts. Business-to-business software is becoming business-to-agent software, and the billing model, the security model, the identity model, the support model all have to be rebuilt.

The enterprise has years of machinery — CFO forecasts, procurement policies, HR capacity plans, sales comp structures — denominated in headcount, hours, seats, artifacts, and quarterly budget. The value being produced is increasingly not denominated in any of those units. The CFO cannot plan in the old currency. The procurement team cannot procure. The HR team cannot staff. The value is there. The measuring instruments belong to the previous economy.

The habitat problem sits underneath this. If agents are going to be on the team, they need a place to live — identity, permissions, memory, tools, audit trail, a manager, a termination procedure. The enterprise already has a century of machinery for this: Active Directory, the HR system, the badge reader, the PIP process. Platform vendors sell the runtime. The enterprise has to assemble the habitat around it, using its own IAM, its own HR system, its own data classification, its own incident response. The HR system is the agent runtime. Nobody is ready for that.

## Retrofit, not subsidiary

The tempting move is to do what the tech press keeps recommending: spin up an AI-native subsidiary. Small greenfield team, no legacy stack, competes with the parent from inside.

Sometimes this works. Usually it produces a small, fast team that cannot actually touch the data, the customers, or the revenue — because those live in the legacy org. The greenfield becomes a demo farm. It produces screenshots for the board deck. It does not ship systems that change the P&L.

Real enterprise AI-native work is a retrofit. It is the slow, expensive, political work of making the organization legible, building the platform that becomes faster than the shadow, and rebuilding the business model so the new value has units.

If you run an enterprise right now, the move that beats the greenfield subsidiary is to fund an internal AI platform team with real authority, and hand them the load above as their job description. Not a czar, not a steering committee. An engineering team with a budget, a mandate, and ownership of the blessed tools, the audit trail, the customer assurances, the incident runbook. They are the ones who make the official path the fast path. Everything else follows.

I am not sure every enterprise can do this. Some will have to be destroyed and rebuilt in the ashes of the old. Some will run two economies in parallel for a decade and converge them slowly. Some will not make it. The ones that do will not have gotten there by buying a product, and not by anointing an AI czar and waiting for a strategy deck. They will have gotten there by doing, in public, the unglamorous structural work every previous wave of enterprise transformation — ERP, cloud, digital — also required, and that the consulting industry keeps trying to package as a methodology and failing to.

AI in the business is the easy half. AI on the business is the work.

---

*In the next episode, the verification and evaluation infrastructure that separates deployments that earn trust from ones that remain perpetual pilots — the piece we owed you from last time.*

---

*Will Schenk is a co-founder of TheFocus.AI, where he works directly with companies navigating these transitions.*
