---
title: "78% Faster Talent Decisions: AI-Powered Celebrity Analytics for Media Networks"
industry: Media / Entertainment
client: Upper Hand AI
year: "2025"
timeline: "16 weeks (ongoing)"
services: "Strategy + Development"
description: We built a multi-agent AI platform that unifies celebrity data from disparate sources — survey research, social media metrics, and brand affinity studies — letting entertainment executives answer complex casting questions in natural language instead of navigating dozens of spreadsheets.
results: |-
  - 78% reduction in time to generate talent reports
  - 5 specialized AI agents across talent, ratings, and streaming data
  - 15+ query tools with typo-tolerant search and nickname recognition
  - Zero spreadsheet wrangling — natural language queries replace manual lookups
  - Cross-demographic analysis that previously required custom analyst work
tech_stack: "Next.js 15, TypeScript, Vercel AI SDK, Supabase, PostgreSQL, Anthropic Claude, Radix UI, Recharts"
testimonial: "What used to take our research team half a day now takes thirty seconds. And the AI actually understands the nuances — when I ask about 'authentic' celebrities who appeal to Lifetime viewers, it knows exactly what I mean."
testimonial_person: "Research Director"
testimonial_company: "Media Analytics Client"
published: false
image: upperhand_wide.png
---

### The Challenge

Entertainment networks live and die by casting decisions. When a cable network is developing a new reality show or licensing a movie, they need to answer questions like: *Which celebrities have high awareness among women 25-54? Who's seen as 'relatable' versus 'aspirational'? Which talent over-indexes with our brand affinity compared to competitors?*

The data to answer these questions existed — scattered across three different research platforms:

- **ePoll** — Survey-based research with awareness, appeal, and 30+ personality attributes across demographic segments
- **ListenFirst** — Social media follower counts across Twitter, Instagram, TikTok, YouTube, and Facebook
- **Audiense** — Twitter affinity analysis showing which audiences over-index for following specific celebrities

The problem: these datasets didn't talk to each other. A researcher asking "Who appeals to History Channel viewers and has strong social media presence?" would spend hours cross-referencing spreadsheets, manually matching celebrity names that were spelled differently across systems, and building one-off reports that couldn't be reused.

**The scale of the problem:** The research team was spending 40+ hours per week on manual data compilation. High-priority talent questions — the ones that came from executives during meetings — could take half a day to answer. And the analysis was bottlenecked through a handful of analysts who knew how to navigate all three systems.

**The trigger:** When a competitive network launched an AI-powered insights tool, the client realized they needed to modernize — fast.

### Our Approach

We designed a multi-agent architecture where specialized AI systems handle different data domains, unified by a natural language interface that routes questions to the right agent.

**The key insight:** Celebrity analytics isn't one problem — it's several. Nielsen TV ratings require different expertise than social media metrics or survey-based attribute analysis. Rather than building one monolithic AI that does everything poorly, we built focused agents that excel in their domains.

This meant solving three interconnected problems:

1. **Data unification** — Creating a mapping layer that links celebrity identities across systems with different naming conventions
2. **Agent specialization** — Building domain experts that understand the semantics of each data source
3. **Natural language routing** — Enabling users to ask questions in plain English and get the right agent automatically

### Technical Implementation

#### Multi-Source Celebrity Mapping

The hardest problem wasn't AI — it was identity resolution. "Dwayne Johnson" in ePoll might be "The Rock" in ListenFirst and "Dwayne 'The Rock' Johnson" in Audiense. We built a fuzzy matching system with confidence scoring:

```
Mapping System:
├── Canonical celebrity ID (internal)
├── ePoll identifiers (survey-specific)
├── ListenFirst handles (social platform IDs)
├── Audiense profiles (Twitter-centric)
└── Confidence scores (0.0-1.0) for each link
```

When a user searches for "Pink," the system disambiguates: *Did you mean Pink the singer, or Pink the color brand?* The disambiguation uses context from previous queries and explicit confirmation for edge cases.

#### The Agent Architecture

We built four specialized agents using Vercel AI SDK with tool-calling:

**Talent Agent (CelebLens)** — The flagship agent for celebrity analysis. Tools include:

- `talentLookup` — Fuzzy search with disambiguation across all data sources
- `talentData` — Comprehensive profiles pulling from ePoll, ListenFirst, and Audiense simultaneously
- Above-average attribute detection using statistical analysis (identifying when a celebrity scores meaningfully above demographic norms)
- Affinity bucket categorization — translating raw affinity scores into actionable categories (Exceptional / High / Average / Low)

**Nielsen Agent** — TV ratings analysis with tools for network rankings, top telecasts, show performance, and demographic breakdowns. Handles Nielsen-specific date conventions (Nielsen weeks/months) automatically.

**AVOD Agent** — Streaming analytics across Roku, Samsung, Tubi, Plex, and Pluto. Tracks minutes viewed, historical trends, and channel performance.

**SPSS Agent** — Survey data analysis for custom research projects. Handles crosstab generation and subpopulation analysis from raw SPSS files.

#### Statistical Quality Controls

Media research has nuances that generic AI would miss. We built quality indicators directly into the response system:

- **Base size validation** — Results with sample sizes below 50 get asterisk warnings; below 30 triggers "insufficient data" alerts
- **Delta calculations** — When showing attributes, the system displays deviation from demographic averages, not just raw scores
- **Data freshness** — Old data gets flagged with field dates so users know when research was conducted

#### The Frontend: Analysis Tables and Visualizations

Natural language queries return structured responses with:

- **Comparison tables** — Side-by-side celebrity profiles with sortable columns for awareness, appeal, and key attributes
- **Demographic breakdowns** — How metrics vary across A18-34, A25-54, and other segments
- **Brand affinity charts** — Visual representation of which audiences over-index for each celebrity
- **CSV export** — One-click export for presentations and further analysis

### What Made This Work

**1. Domain expertise in every tool.** Each AI tool was designed with input from researchers who actually use ePoll and ListenFirst daily. The tool descriptions include guidance on when to use each metric and how to interpret results — knowledge that took years for analysts to develop.

**2. Statistical rigor built-in.** The system doesn't just return numbers — it contextualizes them. "Above average awareness" means something specific (typically 1+ standard deviations above demographic norm), and the AI explains this in its responses.

**3. Disambiguation over hallucination.** When the AI isn't sure which celebrity the user means, it asks rather than guessing. This was a non-negotiable requirement from researchers who had been burned by tools that confidently returned wrong data.

**4. Graceful data gaps.** Not every celebrity has data in every system. The AI clearly indicates when data is missing ("ListenFirst data unavailable — celebrity may not have verified social accounts") rather than omitting the information silently.

### Results

Within 8 weeks of deployment:

- **78% faster** talent report generation — queries that took half a day now complete in under a minute
- **Democratized access** — Product managers and executives can now self-serve insights that previously required analyst time
- **Cross-source analysis** — Questions like "Who has both strong social presence AND high Lifetime affinity?" are now answerable instantly
- **141+ GitHub issues** resolved during active development, with continuous feedback loops from real users

The platform handles thousands of queries monthly, with the Talent Agent (CelebLens) accounting for the majority of usage. The research team shifted from data compilation to strategic interpretation — analyzing the *meaning* of results rather than fighting spreadsheets to generate them.

### Technical Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 15, TypeScript, Radix UI, Tailwind | Chat interface, data tables, visualizations |
| **AI Framework** | Vercel AI SDK, Anthropic Claude | Multi-agent orchestration, tool calling |
| **Database** | Supabase, PostgreSQL | Celebrity mapping, query history, user management |
| **Data Sources** | ePoll, ListenFirst, Audiense | Survey data, social metrics, affinity analysis |
| **Charts** | Recharts | Demographic breakdowns, affinity visualizations |
| **Auth** | Supabase Auth, Role-based access | Agent-specific permissions per user |
| **Deployment** | Vercel | Production hosting with edge functions |

### Approach & Architecture

```
User Query
    ↓
Natural Language Router
    ↓
┌───────────────────────────────────────────────────┐
│                 Agent Selection                    │
├──────────┬──────────┬──────────┬─────────────────┤
│  Talent  │ Nielsen  │   AVOD   │      SPSS       │
│  Agent   │  Agent   │  Agent   │     Agent       │
├──────────┴──────────┴──────────┴─────────────────┤
│              Unified Response Layer               │
│    (Tables, Charts, CSV Export, Citations)        │
└───────────────────────────────────────────────────┘
    ↓
PostgreSQL (Celebrity Mapping + Query History)
    ↓
External APIs (ePoll, ListenFirst, Audiense)
```

The architecture separates concerns cleanly: the AI handles natural language understanding and tool selection, while structured data pipelines handle the statistical analysis. This means the system can evolve — new data sources become new tools, and the AI learns to use them based on their descriptions.
