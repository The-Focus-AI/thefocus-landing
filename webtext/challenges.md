#2: Laddering up from chatboxes to autonomy
Why AI maturity is cumulative, not cosmetic. In the series: The Org Age of AI

Here is the pattern: A product leader watches a demo of an agent completing a multi-step workflow. Maybe it reads documents, synthesizes findings, and drafts a report with a thoughtful recommendation. Maybe it resolves support tickets end to end — taking the ticket, cross-referencing the database, writing a fix, pushing it to production, and communicating to the user. The demo is real. The capability exists.
The immediate response: we need this.
Then the company looks inward and the picture is different. Processes run on habit and improvisation. Critical knowledge lives in two or three people's heads. Data systems use different naming conventions because different teams built them at different times for different reasons. The org chart says one thing about how decisions get made; reality says another.
Most companies want to go from scattered ChatGPT use directly to agents and autonomy. The middle layers — the ones where deployments either become real or die — get skipped in the planning. They are the critical ones to build upon.
We want to explain why. Not with a maturity timeline — Gartner has one, McKinsey has one, Deloitte has one — but through what we have actually seen happen when companies try. What follows are four transitions, each built on the one before it. Not stages on a linear track but a stack of structural dependencies. Each layer is load-bearing. We have watched companies try to build the fourth without the second underneath. It gets very wobbly.
Making the organization legible to itself
This is the hardest transition.
We worked with a bookkeeping company focused on food service, processing dozens of invoices weekly for different clients from different suppliers. They wanted AI to automate the data entry — PDFs and cell phone photos, handwritten notes where things were accepted or changed. As an OCR exercise the technical challenge was straightforward enough, and the new models are up to the task.
But the business logic had never been written down. Some suppliers put fuel service fees into soft costs, while others put bottle deposits there. How are those factored into calculating unit price? How do you handle weight-based versus unit-based pricing? Which suppliers issue updates with a new invoice number invalidating old ones, and which reissue changes under the same number — and if so, how do you determine which is current? Six weeks of work preceded any AI. Not because the technology was hard, but because the business process had never been made explicit. The humans had been absorbing ambiguity that a machine could not.
And once the system forced clarity, something unexpected happened: fewer "exceptions" started coming through from the suppliers. As the light pushed out the darkness, fewer games were being played on the other side — slipping in expenses that were previously overlooked.
At a construction firm, we inherited a data sync system built over a year by a single developer — 224 commits of working logic. When that developer became unavailable, the entire system broke. Cost code mappings lived in one person's head. "Plumbing" had been renamed to "15.1 PLUMBING" in the accounting system, and only one team member knew the translation.
Once you normalize that, you can start to alert when something is over budget. But burndown rates differ by cost code — you'd expect demolition costs to be front-loaded and finishing work not burning down toward the end. When we surfaced this, large discrepancies emerged. It turned out project managers were playing all sorts of games, moving money between buckets. Not changing the final number, but managing client expectations — waiting to break bad news until things were going well and people were happy. None of that knowledge was visible to the machine.
This is where companies discover something uncomfortable: a great deal of institutional knowledge has never been written down, and some of that is not accidental. When the rules live in someone's head, that person is indispensable. When the process is undocumented, nobody can question whether it makes sense. Organizational opacity often protects turf.
Making work legible means making it inspectable, and that is a form of vulnerability. It is, on some level, a matter of trust.
The work itself is unglamorous. Recording meetings so they become searchable records. Documenting exception rules. Cleaning data into structured formats. Defining what "good" looks like so you can evaluate whether a machine did it right. There is no demo, no model, no agent. The output is a spreadsheet of mappings and a document that explains what terms mean.
What this transition is misunderstood as: "We need an AI strategy" or "We need to pick the right tools." The blocker is not technology. It is that the company cannot describe its own workflows. This is where pilot purgatory lives — companies start pilot after pilot, each works in isolation, none connect, nothing accumulates.
What makes it worth doing anyway: everything you build to make the organization legible to machines also makes it better for humans. Onboarding gets faster. Bus factor drops. The organization becomes more resilient. This is not overhead on the way to AI. It is good organizational hygiene that AI forces you to finally do.
Trusting your own data
This is the most underestimated transition.
Once a company has described its workflows and connected its tools, the next move is connecting AI to proprietary data — the databases, documents, and records that make the business unique. Building the interfaces so AI can work with your actual information instead of generic knowledge.
This sounds like an engineering problem. It is not. It is a trust problem.
A media analytics firm found that three platforms used different identifiers for the same people. They knew this. What they did not realize was that they were double-counting. The same public figure appeared under different names and IDs across systems. Nobody had built a canonical mapping because humans just pattern-matched in their heads. Connecting the data forced the company to confront how fragmented its own knowledge actually was — and how much of that fragmentation reflected organizational boundaries rather than logical ones.
At a financial services firm, we validated an AI invoice parser against 88 historical invoices that had been manually entered. The system achieved 94.5% accuracy. But the interesting finding was not the number. Many "discrepancies" turned out to be errors in the manually-entered data, not in the AI's parsing. The machine was catching mistakes the humans had made. That inverted the trust question: the system was more reliable than the process it was replacing.
Even so, the team would not have trusted the system without being able to check its work line by line. Trust is not about accuracy percentages. It is about verifiability. We discussed this in Episode #1 with NVIDIA's chip design team: their fine-tuned model worked, but engineers refused to use it until every answer was traceable to a source document. The system only gained adoption when it became auditable.
What this transition is misunderstood as: "We need RAG" or "We need more data." The blocker is not connecting the data. It is that nobody will act on the answers until they can verify them. Source attribution, audit trails, the ability to inspect the system's reasoning step by step — this is the infrastructure of trust, and most teams underestimate how much of it they need.
What makes it worth doing: institutional knowledge becomes queryable. Questions that took 45 minutes of digging through files get answered in seconds. New hires can ask questions that previously required finding the right senior person. The organization starts to know what it knows.
The system starts acting on what it sees
This is the most overhyped transition.
At Tezlab, we built a support system that pulls down incoming emails, queries the production database and the codebase, and diagnoses the issue before a support engineer looks at it. The human still decides what to do. But by the time they see the ticket, the system has already identified the likely cause, pulled the relevant account data, and checked whether the issue matches a known pattern. This is not a chatbot. It is an investigative layer that runs ahead of the human.
It identified everything from transient upstream API issues, to data load errors, to the customer simply having a different expectation of the feature.
That same system was later extended to monitor infrastructure logs. It watches Kubernetes deployments, identifies resource inefficiencies, and proposes optimizations. Hosting costs dropped 20%. The system went from reacting to support tickets to proactively identifying operational improvements nobody had asked about.
The reason this transition is overhyped is that everyone describes it as "deploying agents," which makes it sound like a technology purchase. The actual difficulty is organizational. When a system surfaces insights proactively, the people receiving those insights need the authority to act on them. A support engineer who can now see the root cause of an issue — diagnosed from production logs and code — is in a position to make what would previously have been considered an engineering change. The customer service team, equipped with AI that understands the database, starts resolving issues that used to require a developer.
That is a power shift. The org chart has to accommodate it. Org charts do not change easily.
What this transition is misunderstood as: "We need agents." Many firms reaching this point still lack stable workflows, exception logic, and reliable evaluation. They want autonomous execution on top of a foundation that cannot support it.
What makes it worth doing: the organization becomes faster and fairer. People closest to the problem — support engineers, operations coordinators, project managers — get direct access to the information and tools they need. The bottleneck shifts from information access to judgment, which is where human value actually lives.
The system changes how the organization works
This is the most profound transition.
When the system is reacting to signals, surfacing insights, and enabling people across the organization to act on information they could not previously access, the question becomes: does the system learn from all of this activity?
This transition is about closing the feedback loop. The system does not just execute — it improves based on how humans respond to its outputs. Expert corrections flow back into the system's behavior. Usage patterns inform what the system prioritizes. The organization's collective judgment becomes encoded in the system over time.
We built a system that monitors project activity — code commits, ticket velocity, scope changes — and compares it against the original plan. When it detects a divergence, it does not just report it. It proposes adjustments: revised timelines, updated role definitions, changes to the hiring pipeline based on what the project actually needs versus what was originally scoped. The system is making recommendations about organizational design based on what it observes about how work is actually happening.
This is where AI stops being a layer of tooling and becomes a layer of organizational design.
The trust question here is the deepest. The organization has to decide whether it is willing to let a system influence how it operates. Not execute tasks, not surface information — actually change workflows, suggest structural adjustments, redistribute work. Who decides what the system is allowed to learn? What happens when its recommendation conflicts with how things have always been done? What happens when the system is right and the established practice is wrong?
These are management questions. They are not engineering questions. And they are the reason this level remains rare — not because the technology is immature, but because most organizations are not prepared to cede that kind of influence to a system they built.
What this transition is misunderstood as: "We need autonomous agents." The blocker is not autonomy. It is that expert correction stays in people's heads instead of flowing back into the system. The support engineer fixes the issue but the system does not learn from the fix. The analyst adjusts the recommendation but the adjustment disappears. Closing that loop is the work.
What makes it worth doing: competitive advantage compounds. Every interaction makes the system slightly better. Institutional knowledge stops being fragile — it is captured, structured, and continuously refined. The organization's intelligence becomes durable rather than dependent on who happens to be in the room.
The stack beneath the stories
A pattern runs through these transitions. Name it and the framework becomes visible:
Level
Name
The organization...
L0
Tribal
Runs on tacit knowledge and habit
L1
Experimenting
Uses AI individually, nothing shared
L2
Legible
Can describe its own work to a machine
L3
Knowledgeable
Knows what it knows, and can prove it
L4
Adaptive
Acts on signals before being asked
L5
Self-Improving
Learns from its own operation

The levels are descriptive. The transitions between them are where all the value and all the pain lives. AI maturity is cumulative. Each level gives the organization a new capability, and that capability reveals something about the organization that was previously invisible. The revelation forces a reassessment. Then the next level becomes possible.
This is not a linear climb. Different departments sit at different levels. Engineering might be at L3 while finance is at L0. Marketing moves fast with content generation while compliance lags a full level behind. The unevenness is normal. Governance almost always trails deployment.
The question is not "what level is our company?" It is "where are the structural gaps, and which ones are blocking us?"
What this is actually about
There is a thread running through all four transitions that we want to name directly.
The work required to make an organization legible to machines — documenting processes, structuring data, building verification infrastructure, redistributing authority, closing feedback loops — is the same work that makes the organization better for the humans inside it.
Recording meetings so they are searchable is good for AI. It is also good for the person who missed the meeting. Building source attribution into every AI answer is good for trust. It is also good for the analyst who wants to check the reasoning. Giving the support team tools to resolve issues directly is good for response times. It is also good for the support engineers who were previously dependent on a developer's availability.
At every level, what AI demands of the organization is what good management has always demanded: clarity about how work gets done, transparency about who knows what, authority distributed to where the knowledge lives, and systems that learn from their own operation.
Most organizations have not done this work. Not because they did not know it was valuable, but because the pressure was never sufficient. Humans tolerate ambiguity. They absorb context socially. They know which shortcuts are acceptable and which dashboard numbers to mentally adjust. A machine cannot do any of this. It needs the real version.
AI is the forcing function. The opportunity it creates is not just automation or efficiency. It is the chance to build an organization that actually works the way it claims to — and to discover, in the process, that this benefits everyone. Except, perhaps, the people whose influence depended on the organization remaining opaque.
The pressure from both directions
Large enterprises face these transitions as organizational surgery. Each level requires exposing something that was previously hidden, redistributing something that was previously hoarded, or formalizing something that was previously improvised. The transitions are hard because the organization has mass. But the potential is enormous — thousands of people operating with better information, clearer processes, and more distributed authority.
Very small teams face a different version. A five-person company does not need to document tribal knowledge because there is no tribe. It does not need to redistribute authority because everyone already has it. Small teams can reach L3 or L4 quickly because they do not carry the organizational debt. But as they grow, they will hit the same walls unless they build the legibility infrastructure early.
AI is compressing the distance between these two. It is forcing large organizations to become more legible and adaptive. It is giving small organizations the leverage to operate at a scale that used to require hundreds of people. The companies that navigate this — in either direction — will be the ones that understood the transitions were not about technology adoption. They were about institutional redesign.
And institutional redesign, done well, is not something that happens to people. It is something that benefits them.

In the next episode, we will look at the verification and evaluation infrastructure that separates deployments that earn trust from ones that remain perpetual pilots.

Will Schenk is a co-founder of TheFocus.AI, where he works directly with companies navigating these transitions. Ksenia Se is the founder of Turing Post.


