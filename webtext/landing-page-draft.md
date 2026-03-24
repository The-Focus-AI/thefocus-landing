# Landing Page Draft: "Building an Intelligent Organization"

This document drafts the new copy and structure for thefocus.ai homepage + capabilities page. Review before implementing in Astro.

---

## Homepage (index.astro)

### Hero

**Title:** Building an Intelligent Organization

**Subhead:** AI capabilities are arriving faster than organizations can absorb them. The bottleneck isn't the technology — it's making your company legible to machines. We help organizations move from tribal knowledge to structured intelligence, one level at a time.

**CTA 1:** See the Framework
**CTA 2:** View Case Studies

---

### Results (dark bar — keep as-is)

- 27% higher conversion
- 78% faster decisions
- 50M+ devices reached
- 8 wks to production

---

### Client Logos (keep as-is)

Upper Hand, Perplexity, Samsung, Tesla, Rivian, Con Edison, WeaveGrid

---

### "What We Do" → rename to "The Journey"

Replace the three pillars (Connect / Curate / Distill) with the organizational transformation arc:

**Section header:** The Journey
**Section title:** From tribal to coherent

**Card 1: Make Your Organization Legible**
Your team's knowledge lives in people's heads, email threads, and undocumented workarounds. Before AI can help, your workflows need to be described in a form machines can act on. This is the hardest step — and the one most companies skip.

**Card 2: Connect Your Proprietary Data**
Generic AI tools use generic data. The real transformation happens when AI is connected to *your* invoices, surveys, maintenance manuals, customer data. What used to take 45 minutes now takes 5 seconds. New hires are productive on day one.

**Card 3: Build Systems That Learn**
The best AI systems don't just execute — they improve. Every interaction teaches the system something new. Tribal knowledge crystallizes into documented workflows. Competitive advantage compounds over time.

---

### Engagement Models (keep structure, update language)

**Section header:** How We Engage
**Section title:** Every level up is a clear engagement

**1. Assessment & Roadmap** (4-6 weeks)
We walk through the framework with your team, identify where each department sits, and build a prioritized plan. You get an honest picture of where you are — not where we think you should be.
→ Discuss your starting point

**2. Build & Ship** (6-12 weeks)
For defined initiatives ready to move. We deliver production AI systems — document ingestion, knowledge bases, conversational interfaces, agent workflows — integrated into your existing infrastructure.
→ Scope your project

**3. Ongoing Partnership** (Retained)
Embedded AI expertise. Continuous optimization, capability expansion, feedback loop design, and knowledge transfer to your internal teams.
→ Explore partnership

---

### Case Studies (keep structure, update framing)

**Section header:** The Transformation in Practice
**Section title:** Case Studies

How organizations have moved from tribal knowledge to structured intelligence — and what they can do now that they couldn't before.

[Featured case studies — suggest reordering to lead with Fountain Creek or AI Back Office, since those best illustrate the "organizational legibility" thesis]

---

### "How We Deliver" → update language

**Section header:** Our Approach
**Section title:** How we deliver

Every engagement begins with a question most consultants skip: *can your organization describe its own work?* Before we build anything, we develop a thorough understanding of how your processes actually run — not how the org chart says they should.

**What to expect:**
→ **Discover** — We audit your systems, data, and workflows. More importantly, we find the tribal knowledge — the undocumented rules, exceptions, and judgment calls that your team carries in their heads.
→ **Structure** — We turn that knowledge into a form machines can act on: schemas, validation rules, canonical data models. This is the organizational legibility work.
→ **Build** — We deliver production AI systems with traceability built in. Every answer can be traced back to its source. Your team trusts the output because they can verify it.

---

### Products (keep as-is or trim)

---

## Capabilities Page (capabilities.astro)

### Hero

**Eyebrow:** Building an Intelligent Organization
**Title:** Where is your organization on the journey?
**Subhead:** AI adoption isn't about picking the right model or buying the right tool. It's about making your organization legible to machines — turning tribal knowledge into structured context, building trust through verifiability, and closing the feedback loop. The journey is from **tribal to coherent** — and each transition has a different blocker.

**CTA 1:** Find Out Where You Are
**CTA 2:** See the Framework

---

### The Six Levels (reframed from technology → organization)

**L0 — Tribal**
*Knowledge lives in people's heads*

Everything is manual. Information is scattered across documents, spreadsheets, and institutional memory. Processes depend entirely on who knows what. A key person leaves and critical workflows break.

What this looks like:
- Searching through email threads to find an answer someone gave six months ago
- New hires take months to become productive because nothing is documented
- Key person leaves and critical processes break

The common mistake: *"We need to pick the right AI tool."*
The reality: *This level resolves itself — people start using ChatGPT on their own. The real question is what happens next.*

Case studies: (none — L0 is the starting point)

---

**L1 — Experimenting**
*Individual tools, nothing shared*

Employees are using ChatGPT, Copilot, or other AI tools on their own. Some get real value. But every person's usage is isolated — nothing is shared, nothing compounds. When someone leaves, their AI workflows leave with them.

What this looks like:
- Marketing copies blog posts into ChatGPT for editing suggestions
- One developer uses Copilot while others don't — no shared standards
- Someone built an internal tool with AI, but nobody else can maintain it

The common mistake: *"We need an AI strategy" or "We need better models."*
The reality: *The blocker isn't technology — it's that you can't describe your own workflows. Your processes run on habit, tacit knowledge, and improvisation. AI can't act on knowledge that only lives in people's heads.*

This is where **Pilot Purgatory** lives. 93% of AI projects stall here — not because the pilots fail, but because there's no organizational foundation to build on.

Bridge to L2: [Vibe Check — fix your AI-coded app]

---

**L2 — Legible**
*Your organization can describe its own work*

The organization has started describing its workflows in a form machines can act on. AI tools are connected to real systems — CRM, codebase, analytics, accounting. There's structure and consistency. This is the hardest transition because it requires the company to formalize what was previously tribal.

What this looks like:
- AI assistants connected to your CRM, analytics platform, or codebase
- Standardized tools that the whole team uses the same way
- Data flows between systems without copy-paste
- Your team has documented their processes well enough for a machine to follow them

The common mistake: *"We've integrated the tools, we're done."*
The reality: *Integration is the beginning, not the end. Your tools are connected to your systems, but your proprietary data — the invoices, surveys, research, internal docs — is still locked in folders nobody can search.*

Case studies: [Perplexity-Samsung, QBSync]

---

**L3 — Knowledgeable**
*Your organization knows what it knows*

AI is connected to your proprietary datasets. Teams can ask ad hoc questions and get instant answers — the 45-minutes-to-5-seconds transformation. Documents that lived in Drive folders become searchable knowledge. New employees can query institutional expertise from day one. This is where real capability expansion begins.

What this looks like:
- Upload a document and get structured data extracted automatically
- Ask "how does Q4 retention compare to Q3?" and get an answer in seconds with source attribution
- New employees can query institutional knowledge from day one
- 170 brand lift studies/year analyzed in hours instead of weeks

The common mistake: *"We need more data" or "We need RAG."*
The reality: *The blocker is trust. Your data is connected, but your team won't act on what the system says until they can verify it. Every answer needs to be traceable to the specific document and passage it came from. Without traceability, adoption stalls — no matter how good the model is.*

This is the lesson from NVIDIA's chip design team: the fine-tuned model worked, but engineers refused to use it until every response was traceable to source documents.

Case studies: [TezLab AI, Fountain Creek, Onboarding, Image Browser]

---

**L4 — Adaptive**
*The system brings insights to you*

Systems pull from production data, customer behavior, and service logs. AI proactively surfaces insights and adapts. The organization changes shape — people closest to the business problem start driving decisions that used to require engineering work. Power moves to whoever asks the best question.

What this looks like:
- Real-time dashboards that flag anomalies before anyone asks
- Content intelligence that filters noise and surfaces what matters
- Product managers and analysts driving features that used to require engineering
- 8,000 survey responses/month analyzed conversationally instead of turned into 300 slides manually

The common mistake: *"We need more engineers" or "We need to scale what we built."*
The reality: *The blocker is organizational. When the system surfaces insights proactively, the people closest to the problem need decision-making authority. Your org chart may not match your information flow. This is a management problem, not an engineering problem.*

Case studies: [Distill]

---

**L5 — Self-Improving**
*The system learns from every interaction*

Agent sessions are mined for institutional knowledge. Tribal knowledge crystallizes into documented workflows and specs. Feedback loops are continuous. The system learns and improves on its own. Competitive advantage compounds.

What this looks like:
- AI agent interactions are analyzed to discover undocumented processes
- Every meeting transcript becomes project context; every invoice teaches billing patterns
- The system suggests workflow improvements based on usage patterns
- Operations run on AI commands instead of SaaS subscriptions

The common mistake: *"We need autonomous agents."*
The reality: *The blocker is that you haven't built the feedback loop. The system surfaces insights (L4) but doesn't learn from how humans respond. The work here is capturing expert correction in a form the system can learn from — so everyday use improves the system over time.*

Case studies: [AI Back Office]

---

### Self-Assessment Clusters (update language)

**Cluster 1: Tribal → Legible (L0-L1)**
*Your team uses ChatGPT individually but there's no organizational strategy. AI feels interesting but you don't know where to begin. The real question isn't which tool to pick — it's whether you can describe your own workflows.*

**Engagement:** Assessment & Roadmap (4-6 weeks)
**Deliverables:** AI opportunity assessment, process documentation, prioritized roadmap, build vs. buy analysis
**CTA:** Let's map your starting point →

**Cluster 2: Legible → Knowledgeable (L2-L3)**
*You have AI tools connected to your workflows but they feel generic. Your proprietary data — the documents, surveys, records that make your business unique — is still locked in folders nobody can search. You know it could unlock more, but aren't sure how.*

**Engagement:** Build & Ship (6-12 weeks)
**Deliverables:** Document ingestion pipeline, semantic knowledge base, conversational query interface, source-attributed answers
**CTA:** Let's unlock your data →

**Cluster 3: Knowledgeable → Self-Improving (L4-L5)**
*AI is driving real business outcomes, but you want it to compound. You need systems that learn from themselves, roles that evolve with the technology, and governance that adapts. The question is no longer "does AI work?" — it's "how does our organization change?"*

**Engagement:** Ongoing Partnership (Monthly retainer)
**Deliverables:** Dedicated team access, feedback loop design, continuous optimization, capability expansion, team training
**CTA:** Let's build the next level →

---

### Beyond the Levels (keep existing dimensions, update intro)

**Title:** The organization isn't one-dimensional

Different departments sit at different levels. Engineering might be at L3 while Finance is at L0. Marketing can move fast with content generation. AI touching financial data needs more guardrails. The framework accounts for this.

[Keep Function Types, Governance & Risk, Department Readiness cards as-is]

---

### How We Work (update quote/framing)

Keep the three-column structure. Update the intro text:

*The key insight from every engagement: the technology isn't usually the blocker. The organizational knowledge is. Companies discover how much of their work was never formalized — and formalizing it is the most valuable part of the project.*

---

### FAQ (update)

**Do we need clean data first?**
No. In fact, discovering that your data *isn't* clean is part of the value. Most organizations don't realize how much tribal knowledge — naming conventions, exception rules, approval workflows — lives only in people's heads until they try to connect AI to it. We help you through that process.

**What if we don't know exactly what we need?**
That's normal — and it's what Assessment engagements are for. Most companies overestimate where they are on the maturity framework. The honest starting point is usually: "Can we describe our own workflows in a form a machine can follow?" If the answer is "not yet," that's where we begin.

**How is this different from other AI consultancies?**
We build. Most AI consultancies deliver decks and recommendations. We deliver production systems — working in weeks, not quarters. And we're honest about organizational readiness: if your processes aren't formalized enough for AI, we'll tell you that and help you fix it, rather than building on a shaky foundation.

---

## Key Differences From Current Site

| Element | Current | Proposed |
|---------|---------|----------|
| **Hero title** | "Distill The Signal From The Noise" | "Building an Intelligent Organization" |
| **Core thesis** | Technology-focused (what AI does) | Organization-focused (what the company becomes) |
| **Three pillars** | Connect / Curate / Distill | Make Legible / Connect Data / Build Learning Systems |
| **Level framing** | Technology deployed (tools, data, systems) | Organization transformed (tribal, experimenting, legible, knowledgeable, adaptive, self-improving) |
| **Level names** | None / Ad Hoc / Integrated Tooling / Custom Data Intelligence / Dynamic & Reactive / Autonomous & Evolving | Tribal / Experimenting / Legible / Knowledgeable / Adaptive / Self-Improving |
| **Each level has** | Description + "looks like" + case studies | Description + "looks like" + "common mistake vs reality" + case studies |
| **Assessment clusters** | Static descriptions | Transition-framed (Tribal→Legible, Legible→Knowledgeable, Knowledgeable→Self-Improving) |
| **Approach section** | Discover / Advise / Roadmap | Discover / Structure / Build (emphasizing organizational legibility work) |
| **FAQ** | Generic | Addresses the "organizational readiness" thesis directly |

## Level Name Summary

| Level | Old Name | New Name | Tagline |
|-------|----------|----------|---------|
| L0 | None | Tribal | Knowledge lives in people's heads |
| L1 | Ad Hoc | Experimenting | Individual tools, nothing shared |
| L2 | Integrated Tooling | Legible | Your organization can describe its own work |
| L3 | Custom Data Intelligence | Knowledgeable | Your organization knows what it knows |
| L4 | Dynamic & Reactive | Adaptive | The system brings insights to you |
| L5 | Autonomous & Evolving | Self-Improving | The system learns from every interaction |

## Case Study Mapping (unchanged IDs, updated framing)

| Level | Case Studies | Why |
|-------|-------------|-----|
| L0-L1 | (none) | Starting point — everyone begins here |
| L1→L2 | Vibe Check service | Bridge service for ad hoc → structured |
| L2 | perplexity-samsung, qbsync | Tools integrated into real workflows |
| L3 | tezlab-ai, fountain-creek, onboarding, image-browser | Proprietary data made queryable |
| L4 | distill | Proactive insights from production data |
| L5 | ai-back-office | Feedback loops, compounding knowledge |

## Connection to Turing Post Series

This landing page restructure directly supports the "The Org Age of AI" series with Ksenia:

- **Post #1** (published): "AI Feels Powerful. So Why Is the ROI Still Missing?" — diagnosed the organizational legibility problem
- **Post #2** (planned): "The Five Transitions" — maps directly to these level transitions, with the "common mistake vs reality" framing
- **Landing page**: The framework visitors land on after reading the Turing Post series. Assessment → engagement pipeline.

The language should be consistent across all three: "organizational legibility," "tribal to coherent," "the middle layer can't be skipped."
