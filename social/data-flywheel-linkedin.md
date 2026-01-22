# LinkedIn Posts: The Data Flywheel Pattern

Based on "The Data Flywheel Pattern" - https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 1 - Main Hook (January 22)

I stopped building applications the traditional way.

No database design. No API architecture. No schema planning.

Instead: I drop files into folders and let AI figure out the structure.

Sounds crazy? Here's what I built this way:

**Operations tracker** - Manages client projects, hiring pipeline, invoices. 10 automated commands. Sends branded status emails.

**Health dashboard** - Built in 90 minutes. Integrates with Oura API, parses DEXA scans, generates research reports with citations.

**Media synthesizer** - Aggregates Twitter, YouTube, newsletters. Outputs weekly digests.

The pattern: Data flows in → AI processes → Outputs flow out → Outputs become inputs for the next cycle.

I call it the data flywheel.

Each spin makes the system smarter. Sources get curated. Synthesis gets sharper.

Traditional dev starts with structure.
This approach lets structure emerge from data.

Controversial? Maybe.
Working? Absolutely.

Full breakdown with examples: https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 2 - Hiring Pipeline (January 24)

I let AI evaluate 48 job candidates.

(Before you start typing that angry comment, hear me out.)

When I posted a junior developer role, applications flooded in. Too many to properly evaluate.

So I built a system:

1. Applications arrive as .eml files
2. Claude reads each email
3. Researches the candidate (LinkedIn, GitHub, portfolio)
4. Evaluates against requirements
5. Generates structured assessment

The output for each candidate:
- Skills matrix (what they claim vs. evidence found)
- Strengths identified
- Concerns flagged
- Yes/No recommendation with reasoning

One candidate looked perfect on paper. Lots of React repositories.

Claude said no.

Why? Those "React projects" were actually Streamlit dashboards over Python ML code. Not front-end development experience at all.

I would have missed that in a quick review. Claude caught it because it actually looked at the code.

Is this replacing human judgment? No.
Is it augmenting it? Dramatically.

The AI doesn't make the hire decision. It makes sure I don't miss important signals in the noise.

https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 3 - 90 Minute App (January 25)

I built a complete health tracking application in 90 minutes.

Not a mockup. Not a prototype. A working app with:

- API integration (Oura ring)
- Data visualization (charts, graphs)
- Auto-refreshing dashboard
- Body composition tracking

Here's the timeline from git commits:

**4:49 PM** - First commit. Just a README.

**4:58 PM** - Second commit. Claude wrote a 424-line bash script to pull from Oura's API. Authenticates via 1Password, hits 6 endpoints, writes to JSON.

**5:16 PM** - Third commit. Full HTML dashboard with weight charts, Oura metrics, 10-day phase guide.

**6:11 PM** - Working app. 90 minutes total.

Over the next 11 days, it grew:
- DEXA scan parsing
- Bloodwork analysis
- Research reports (15+ citations each)
- 27 recipes with shopping lists
- Meal prep scheduling

By day 12: 5,544 lines of HTML. 10 research reports. Complete meal planning system.

I didn't design any of this upfront. I dropped in data sources. Claude figured out the structure.

The app emerged from the data.

https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 4 - Rate Limiting Philosophy (January 26)

Hot take: AI makes better rate limiting decisions than code.

Stay with me here.

I built a system that aggregates Twitter content. Twitter's API has aggressive rate limits. The traditional approach:

```
if (remainingQuota < threshold) {
  sleep(resetTime);
}
```

My approach: Make Claude the decision-maker.

The prompt says:

"Run 4-5 parallel searches. Monitor remaining quota in responses. When limit drops below 10, pause and process what you have. Prioritize high-engagement tweets first to maximize value within limits."

The difference:

Code follows rules blindly.
Claude makes judgment calls.

If we're almost at the limit but there's one high-value query left? Claude can decide if it's worth the risk.

If the content so far is already comprehensive? Claude can stop early and save quota for tomorrow.

Pagination isn't a loop. It's a conversation.

Is this overengineering? For a production system at scale, probably.

For a personal content aggregation system? It's exactly the right level of intelligence.

https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 5 - The Anti-Schema (January 28)

Unpopular opinion: Database schemas are technical debt from day one.

Every schema is a bet on the future. "We'll need these fields, in this structure, forever."

That bet is almost always wrong.

My alternative:

- Data lives in JSON and markdown files
- Structure emerges from usage patterns
- When structure needs to change, Claude just changes it

"But that doesn't scale!"

You're right. It doesn't scale to millions of users.

It scales perfectly to what I actually need:
- Track my business
- Monitor my health
- Synthesize my reading

No migrations to run.
No ORM to update.
No API versions to maintain.

"But what about data integrity?"

The AI is the integrity layer. It reads the data, understands the intent, handles inconsistencies gracefully.

Traditional approach: Constrain the data to fit the system.
Flywheel approach: Let the system adapt to the data.

Is this advice for your enterprise SaaS? No.
Is it liberation for personal productivity systems? Absolutely.

https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 6 - The Three Hard Problems (January 30)

Every system I build now has the same architecture:

**Data in.** Drop files into folders. Call APIs. Forward emails.

**AI processes.** This is where the magic happens:

1. **Parsing** - Claude reads anything. PDFs, HTML dumps, API responses, .eml files, scraped web pages. No format is too weird.

2. **Synthesis** - Raw data becomes summaries, reports, cited research. Not just summarization—actual understanding.

3. **Judgment** - When to pause, what to prioritize, what actually matters. This is the part code can't do.

**Outputs out.** Dashboards, emails, infographics, digests. Formatted for humans.

**Outputs become inputs.** This is the flywheel. Each cycle improves the next.

Operations flywheel: GitHub commits → weekly reports → dashboard → client emails → client feedback → better commits

Fasting flywheel: Oura data → daily metrics → trends → research → meal adjustments → body responds → new Oura data

Media flywheel: APIs → raw content → synthesis → digest → reading decisions → curate sources → better API calls

Each spin adds momentum.

https://thefocus.ai/posts/data-flywheel-pattern/

---

## Post 7 - Getting Started (February 1)

Want to try the data flywheel?

Start simple:

1. Pick something you want to track
2. Find a data source (API, export, email)
3. Tell Claude to import it

"I want to track my workouts using my Garmin data"
"I want to synthesize industry news from my RSS feeds"
"I want to monitor my projects using GitHub activity"

The first import creates the structure.
The second import reveals what's missing.
By the fifth import, you have a system.

Key insight: Document the process in CLAUDE.md

When Claude figures out how to do something, ask it to write that down. Future sessions inherit all previous learnings.

Don't design the app.
Grow it.

https://thefocus.ai/posts/data-flywheel-pattern/
