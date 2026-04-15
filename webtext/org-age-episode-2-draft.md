# #2: The Ladder Nobody Wants to Climb

**Why AI maturity is cumulative, not cosmetic. In the series: The Org Age of AI**

---

In Episode #1, we argued that the real bottleneck in enterprise AI is not model capability — it is organizational legibility. Most companies cannot describe their own work in a form a machine can act on. Until they can, better models will not help much.

That raised a question we heard repeatedly: what does the path actually look like?

There is no shortage of answers. Gartner has a maturity model. McKinsey has one. Deloitte has one. They describe stages on a timeline: you are here, go there.

We want to describe something different. Not stages on a timeline, but a stack of structural dependencies. Each layer requires the one below it. You cannot build the fourth layer without the second underneath, and we have watched companies try. The layers are not aspirational targets — they are load-bearing.

## What most companies actually want

Here is the pattern. A product leader watches a demo of an agent completing a multi-step workflow. Maybe it resolves support tickets end to end. Maybe it reads documents, synthesizes findings, and drafts a report. The demo is real. The capability exists. The immediate response: we need this.

Then the company looks inward and the picture is different. Processes run on habit and improvisation. Critical knowledge lives in two or three people's heads. Data systems use different naming conventions because different teams built them at different times for different reasons. The org chart says one thing about how decisions get made; reality says another.

Most companies want to go from scattered ChatGPT use directly to agents and autonomy. The middle layers — the ones where deployments either become real or die — get skipped in the planning.

## Why the middle cannot be skipped

AI maturity is cumulative. Each level gives the organization a new capability, and that capability reveals something about the organization that was previously invisible. The revelation forces a reassessment. Then the next level becomes possible.

This is not a linear climb. Different departments sit at different levels. Engineering might be at L3 while finance is at L0. Marketing moves fast with content generation while compliance lags a full level behind. The unevenness is normal. Governance almost always trails deployment.

The question is not "what level is our company?" It is "where are the structural gaps, and which ones are blocking us?"

Here is the stack:

| Level | Name | The organization... |
|-------|------|---------------------|
| L0 | Tribal | Runs on tacit knowledge and habit |
| L1 | Experimenting | Uses AI individually, nothing shared |
| L2 | Legible | Can describe its own work to a machine |
| L3 | Knowledgeable | Knows what it knows, and can prove it |
| L4 | Adaptive | Acts on signals before being asked |
| L5 | Self-Improving | Learns from its own operation |

The levels are descriptive. The transitions are where all the value and all the pain lives.

## L1 → L2: Making the organization legible to itself

This is the hardest transition in the framework.

Companies at L1 have employees using AI individually. Someone uses ChatGPT for drafting, someone else uses Copilot for code, a third person built a prototype that nobody else can maintain. Some of this work is genuinely useful. None of it compounds. When someone leaves, their workflows leave with them.

The move to L2 is not about choosing better tools. It is about the organization learning to describe its own work. What are the actual rules for processing an invoice? Not what the policy document says — what do people actually do? Which naming conventions does each supplier use? When someone uploads a file for review, what is the real approval chain — not the org chart version, the one that actually happens?

This is where companies discover something uncomfortable: a great deal of institutional knowledge has never been written down, and some of that is not accidental. When the rules live in someone's head, that person is indispensable. When the process is undocumented, nobody can question whether it makes sense. Organizational opacity often protects turf. Making work legible means making it inspectable, and that is a form of vulnerability.

We worked with a food service company processing dozens of invoices weekly from different suppliers. They wanted AI to automate the data entry. Straightforward enough. But before the system could parse a single invoice, the team had to answer questions they had never been asked: what counts as a "soft cost"? How do you handle weight-based versus unit-based pricing? What happens when a supplier changes their invoice format? Six weeks of work preceded any AI — not because the technology was hard, but because the business process had never been made explicit. The humans had been absorbing ambiguity that a machine could not.

At a construction firm, we inherited a data sync system that had been built over a year by a single developer — 224 commits of working logic. When that developer became unavailable, the entire system broke. Cost code mappings lived in one person's head. "Plumbing" had been renamed to "15.1 PLUMBING" in the accounting system, and only one team member knew the translation. Seven rounds of fixes followed. The code was never the problem. The knowledge was.

Recording meetings so they become searchable records. Documenting exception rules. Cleaning data into structured formats. Defining what "good" looks like so you can evaluate whether a machine did it right. This is the work of L2. It does not look like AI. There is no demo, no model, no agent. The output is a spreadsheet of mappings and a document that explains what terms mean. But without it, everything above collapses.

**What this transition is misunderstood as:** "We need an AI strategy" or "We need to pick the right tools." The blocker is not technology. It is that the company cannot describe its own workflows. This is where pilot purgatory lives — companies start pilot after pilot, each works in isolation, none connect, nothing accumulates.

**What makes it worth doing anyway:** everything you build to make the organization legible to machines also makes it better for humans. Onboarding gets faster. Bus factor drops. The organization becomes more resilient. The work is not overhead on the way to AI. It is good organizational hygiene that AI forces you to finally do.

## L2 → L3: Trusting your own data

This is the most underestimated transition.

At L2, the organization has described its workflows and connected its tools. AI is plugged into real systems — CRMs, accounting software, project management platforms. Data flows between systems instead of being manually copied.

The move to L3 is connecting AI to your proprietary data — the databases, documents, and records that make your business unique. Building the interfaces (API integrations, sync pipelines, MCP servers) so that AI can work with your actual information instead of generic knowledge.

This sounds like an engineering problem. It is not. It is a trust problem.

When you connect systems, you discover that internal data is messier than anyone admitted. A media analytics firm found that three platforms used different identifiers for the same people. The same public figure appeared under different names and IDs across systems. Nobody had built a canonical mapping because humans just pattern-matched in their heads. Connecting the data forced the company to confront how fragmented its own knowledge actually was — and how much of that fragmentation reflected organizational boundaries rather than logical ones.

At a financial services firm, we validated an AI invoice parser against 88 historical invoices that had been manually entered. The system achieved 94.5% accuracy. But the interesting finding was not the number. Many "discrepancies" turned out to be errors in the manually-entered data, not in the AI's parsing. The machine was catching mistakes the humans had made. That inverted the trust question: the system was more reliable than the process it was replacing.

Even so, the team would not have trusted the system without being able to check its work line by line. Trust at L3 is not about accuracy percentages. It is about verifiability. We discussed this in Episode #1 with NVIDIA's chip design team: their fine-tuned model worked, but engineers refused to use it until every answer was traceable to a source document. The system only gained adoption when it became auditable.

**What this transition is misunderstood as:** "We need RAG" or "We need more data." The blocker is not connecting the data. It is that nobody will act on the answers until they can verify them. Source attribution, audit trails, and the ability to inspect the system's reasoning step by step — this is the infrastructure of trust, and most teams underestimate how much of it they need.

**What makes it worth doing:** institutional knowledge becomes queryable. New hires can ask questions that previously required finding the right senior person. Questions that took 45 minutes of digging through files get answered in 5 seconds. The organization starts to know what it knows.

## L3 → L4: The system starts acting on what it sees

This is the most overhyped transition.

At L3, the organization's data is connected and queryable. People ask questions and get verified, sourced answers. The system is trusted within defined boundaries.

The move to L4 is the system acting on incoming signals without being asked. It watches logs, monitors events, processes incoming requests, and either handles them or surfaces them with context.

A consumer software company built a support system that pulls down incoming emails, queries the production database and the codebase, and diagnoses the issue before a support engineer looks at it. The human still decides what to do. But by the time they see the ticket, the system has already identified the likely cause, pulled the relevant account data, and checked whether the issue matches a known pattern. This is not a chatbot. It is an investigative layer that runs ahead of the human.

That same system was later extended to monitor infrastructure logs. It watches Kubernetes deployments, identifies resource inefficiencies, and proposes optimizations. Hosting costs dropped 20%. The system went from reacting to support tickets to proactively identifying operational improvements nobody had asked about.

The reason this transition is overhyped is that everyone describes it as "deploying agents," which makes it sound like a technology purchase. The actual difficulty is organizational.

When a system surfaces insights proactively, the people receiving those insights need the authority to act on them. A support engineer who can now see the root cause of an issue — diagnosed by the system from production logs and code — is in a position to make what would previously have been considered an engineering change. The customer service team, equipped with AI that understands the database, starts resolving issues that used to require a developer. That is a power shift. The org chart has to accommodate it, and org charts do not change easily.

**What this transition is misunderstood as:** "We need agents." Many firms reaching this point still lack stable workflows, exception logic, and reliable evaluation. They want autonomous execution on top of a foundation that cannot support it. The technology works. The organization is not ready for what the technology makes possible.

**What makes it worth doing:** the organization becomes faster and fairer. People closest to the problem — support engineers, operations coordinators, project managers — get direct access to the information and tools they need. The bottleneck shifts from information access to judgment, which is where human value actually lives.

## L4 → L5: The system changes how the organization works

This is the most profound transition.

At L4, the system is reacting to signals, surfacing insights, and enabling people across the organization to act on information they could not previously access. The question becomes: does the system learn from all of this activity?

The move to L5 is closing the feedback loop. The system does not just execute — it improves based on how humans respond to its outputs. Expert corrections flow back into the system's behavior. Usage patterns inform what the system prioritizes. The organization's collective judgment becomes encoded in the system over time.

We built a system that monitors project activity — code commits, ticket velocity, scope changes — and compares it against the original plan. When it detects a divergence, it does not just report it. It proposes adjustments: revised timelines, updated job descriptions for roles that need to be filled, changes to the hiring pipeline based on what the project actually needs versus what was originally scoped. The system is making recommendations about organizational design based on what it observes about how work is actually happening.

This is where AI stops being a layer of tooling and becomes a layer of organizational design.

The trust question here is the deepest one. The organization has to decide whether it is willing to let a system influence how it operates. Not execute tasks, not surface information — actually change workflows, suggest structural adjustments, redistribute work. Who decides what the system is allowed to learn? What happens when its recommendation conflicts with how things have always been done? What happens when the system is right and the established practice is wrong?

These are management questions. They are not engineering questions. And they are the reason L5 remains rare — not because the technology is immature, but because most organizations are not prepared to cede that kind of influence to a system they built.

**What this transition is misunderstood as:** "We need autonomous agents." The blocker is not autonomy. It is that expert correction stays in people's heads instead of flowing back into the system. The support engineer fixes the issue but the system does not learn from the fix. The analyst adjusts the recommendation but the adjustment disappears. Closing that loop is the work.

**What makes it worth doing:** competitive advantage compounds. Every interaction makes the system slightly better. Institutional knowledge stops being fragile — it is captured, structured, and continuously refined. The organization's intelligence becomes durable rather than dependent on who happens to be in the room.

## What this is actually about

There is a thread running through all four transitions that we want to name directly.

The work required to make an organization legible to machines — documenting processes, structuring data, building verification infrastructure, redistributing authority, closing feedback loops — is the same work that makes the organization better for the humans inside it.

Recording meetings so they are searchable is good for AI. It is also good for the person who missed the meeting. Building source attribution into every AI answer is good for trust in the system. It is also good for the analyst who wants to check the reasoning. Giving the support team tools to resolve issues directly is good for response times. It is also good for the support engineers who were previously dependent on a developer's availability.

At every level, what AI demands of the organization is what good management has always demanded: clarity about how work gets done, transparency about who knows what, authority distributed to where the knowledge lives, and systems that learn from their own operation.

Most organizations have not done this work — not because they did not know it was valuable, but because the pressure was never sufficient. Humans tolerate ambiguity. They absorb context socially. They know which shortcuts are acceptable and which dashboard numbers to mentally adjust. A machine cannot do any of this. It needs the real version.

AI is the forcing function. The opportunity it creates is not just automation or efficiency. It is the chance to build an organization that actually works the way it claims to — and to discover, in the process, that this benefits everyone. Except, perhaps, the people whose influence depended on the organization remaining opaque.

## The pressure from both directions

One observation about where this leaves different kinds of companies.

Large enterprises face these transitions as organizational surgery. Each level requires exposing something that was previously hidden, redistributing something that was previously hoarded, or formalizing something that was previously improvised. The transitions are hard because the organization has mass. But the potential is enormous — thousands of people operating with better information, clearer processes, and more distributed authority.

Very small teams face a different version of the same problem. A five-person company does not need to document tribal knowledge because there is no tribe. It does not need to redistribute authority because everyone already has it. Small teams can reach L3 or L4 quickly because they do not carry the organizational debt. But as they grow, they will hit the same walls unless they build the legibility infrastructure early.

AI is compressing the distance between these two. It is forcing large organizations to become more legible and adaptive. It is giving small organizations the leverage to operate at a scale that used to require hundreds of people. The companies that navigate this — in either direction — will be the ones that understood the transitions were not about technology adoption. They were about institutional redesign.

And institutional redesign, done well, is not something that happens to people. It is something that benefits them.

---

*In the next episode, we will look at the verification and evaluation infrastructure that separates deployments that earn trust from ones that remain perpetual pilots.*

---

*Will Schenk is a co-founder of TheFocus.AI, where he works directly with companies navigating these transitions. Ksenia Se is the founder of Turing Post.*
