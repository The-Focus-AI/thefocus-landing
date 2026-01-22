# LinkedIn Posts: Claude Code for Non-Coding Tasks

Based on "Claude Code, not Code" - https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 1: The Hook (January 15)

**It's called Claude Code. I use it for everything except code.**

This month I've used it to:
- Research job candidates and draft personalized follow-up emails
- Build grocery lists, compare prices across stores, and schedule delivery
- Extract data from web apps that refused to export
- Plan a 5-hour meal prep across two ovens, a slow cooker, and an air fryer

Did Claude write some scripts along the way? Probably. I don't know and I don't care.

I described what I wanted in plain English. Claude figured out how to make it happen.

If you're still thinking of AI assistants as "coding tools," you're leaving 90% of the value on the table.

Full breakdown: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 2: The Workflow Pattern (January 16)

**The most useful AI pattern I've found:**

1. Ask Claude to do something once
2. Let it figure out how
3. Ask it to document the process so it can do it again

I was tracking a 10-day fast. Started with "get my sleep data from Oura."

Claude searched the web, found the API docs, told me how to set up access, wrote a script, and ran it.

Then I said: "Add instructions to CLAUDE.md so you can do this every morning."

By day 10, my project file was 300+ lines of structured workflows. Each morning I'd say "my weight is 90.7" and Claude knew exactly what to do—sync data, update logs, generate an infographic.

The project had taught Claude how to work on it.

Don't just ask AI to do things. Ask it to remember how.

More patterns: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 3: Research That Actually Cites Sources (January 17)

**AI research without citations is just expensive hallucination.**

When I ask Claude to research something—a topic, a company, a person—I get:

- A proper report with findings organized by theme
- Specific claims tied to specific sources
- A references section with actual links I can verify

Example: researching metabolic phases during extended fasting. The output cited Cahill's 2006 work on fuel metabolism, Owen's 1967 study on brain ketone usage, and a dozen other sources.

Then Claude synthesized it into an infographic. The research backs up what's in the image.

This isn't "AI said so." This is "AI found this, here's where, go check."

The difference matters.

How I set this up: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 4: Hiring Pipeline (January 18)

**Claude evaluated my job candidates better than I did.**

I was hiring a front-end developer. One applicant looked promising—lots of front-end repos on GitHub.

Claude said no. I pushed back. "Are you sure?"

It explained: yes, the repositories look front-end heavy. But if you actually read the code, it's mostly Python ML work. The "front-end" is just Streamlit dashboards. Not a good fit for this role.

It was right. I would have missed that.

The full pipeline Claude handled:
- Read the SOW and analyzed our codebase
- Wrote the job description based on what we actually needed
- Researched each candidate (LinkedIn, GitHub, actual code)
- Ranked them with specific reasoning
- Drafted personalized follow-ups

I made the final calls. But the analysis was better than mine would have been.

Full workflow: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 5: Data Extraction from Hostile Apps (January 19)

**"Export" button missing? Save the page. Let Claude dig through the mess.**

I had bloodwork results locked in a complex React web app. No export option. Classic.

The trick: "Save Page As" in Chrome creates a massive HTML file with all the embedded JavaScript. It's garbage to read. But the data is in there.

Claude extracted:

| Marker | Value | Status |
|--------|-------|--------|
| Apolipoprotein B | 153 mg/dL | Above Range |
| LDL Cholesterol | 188 mg/dL | Above Range |
| Fasting Glucose | 102 mg/dL | Borderline |

Clean, structured data I can actually track over time.

This pattern works for any app that won't export: health dashboards, financial statements, analytics tools.

Your data. Your format.

More extraction patterns: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 6: Browser Automation Without the Security Nightmare (January 20)

**I tried one of those "AI browser" tools. It asked me to log into my email.**

Deleted it immediately.

But browser automation is genuinely useful—shopping, form filling, data entry. The solution: session isolation.

Each service gets its own cookie universe:
```
--user-data=/Users/me/.chrome-instacart
```

Claude can log into Instacart and manage my cart. But it has zero access to my main Chrome profile. No banking. No email. Nothing.

I had Claude build grocery carts at two different stores from my meal plan:
- Market 32: $317
- Stop & Shop: $361

Same olive oil was $46 at one store, $10 at the other. Claude spotted it and swapped.

Automation without handing over your digital life.

How to set this up: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 7: Meal Prep as Workflow Orchestration (January 21)

**Claude planned my Sunday meal prep better than I ever could.**

The constraints:
- 2 ovens
- 1 slow cooker
- 1 air fryer
- 5 hours max
- 7 days of meals to prep

Claude created a time-boxed workflow. Every 15-30 minutes, a step. Each step tells you exactly which appliance to use and what should be running in the others.

12:00 - Pork in oven #1 at 300°F, beef in slow cooker
12:30 - Chicken in oven #2 at 400°F
1:00 - Start vegetable prep while proteins cook
...

Result: 5 proteins and all sides done in under 5 hours.

This isn't code. It's orchestration documentation. Claude turns "I need to meal prep" into a workflow you can actually execute.

Works for any multi-resource scheduling problem.

Full example: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 8: The Newsletter Pipeline (January 22)

**Research → Draft → Edit → Schedule. One conversation.**

The workflow:
1. "Research [topic] and write a newsletter about it"
2. "Make the intro punchier"
3. "Add a section about X"
4. Rewrite everything because it's not quite right (this step is mandatory)
5. "Schedule for Friday at 9am"

Claude handles the Buttondown API. I can also ask "show me analytics for the last 5 newsletters" and see what's resonating.

The key is skills talking to each other. Research produces content. Brand guidelines ensure consistent voice. The newsletter platform handles delivery.

Claude orchestrates all of it.

I just have opinions.

Setup details: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 9: The Meta-Pattern (January 23)

**Every discovery gets documented back into the system.**

- Learned how to sync Oura data? Goes in CLAUDE.md
- Figured out a website's button patterns? Document them
- Found a good image style? Save the template prompt

Future sessions inherit all previous learnings.

This is the actual unlock. Not any single feature—the compound effect of teaching Claude how to work on your specific problems.

After a month of this, my projects have become collaborators that remember context, patterns, and preferences.

The conversation-to-workflow loop:
1. Ask Claude to do something
2. Ask it to document how
3. Next time, it just knows

Build your own: https://thefocus.ai/posts/claude-code-non-coding/

---

## Post 10: When It Works / When It Doesn't (January 24)

**Be honest about the limits.**

Claude Code works well for:
- Research and briefings (with citations)
- Hiring pipelines
- Content workflows
- Data extraction
- Browser automation (sandboxed)
- Scheduling and orchestration

It doesn't work for:
- Real-time interaction (request/response cycles only)
- High-stakes financial decisions
- Anything requiring 100% reliability

Browser automation can be flaky. Complex web apps break. Sometimes you have to intervene.

But for the 80% of tasks that fit the pattern? It's not even close.

I described what I wanted. Claude made it happen.

Full article: https://thefocus.ai/posts/claude-code-non-coding/

---

## Closing Post: The Invitation (January 25)

**Claude Code isn't a coding tool. It's a capability orchestrator.**

My fasting tracker started as "help me track my weight."

It ended up with:
- API integrations
- Research reports with citations
- Daily infographics
- Meal planning
- Automated grocery shopping

Each piece built on the last. Claude remembered context across sessions.

The skills make it modular. Need research? There's a skill. Images? Skill. Newsletter? Browser automation? Skills.

They compose together. Claude figures out how to chain them.

The question isn't "can Claude code?" It's "what do you want to get done?"

Install it. Try something. Document the workflow.

Then do it again.

https://thefocus.ai/posts/claude-code-non-coding/
