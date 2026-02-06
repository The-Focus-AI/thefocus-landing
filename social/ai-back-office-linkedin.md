# LinkedIn Posts: AI-Powered Back Office

Based on "6 Commands Replace 10+ Hours/Week: Building an AI-Powered Back Office" - https://thefocus.ai/case-studies/ai-back-office/

---

## Post 1 - Main Hook (January 29)

I fired my back office.

Not the people. The software.

Killed the CRM. Canceled the project management tool. Ditched the invoice tracker. Unsubscribed from the HR platform.

Replaced all of it with a folder of text files.

Sounds insane. Here's why it works:

Most "enterprise software" is just structured data + views + workflows.

A CRM? Contacts + deals + "remind me to follow up."
Invoice system? Amounts + dates + "who hasn't paid?"
Project tracker? Tasks + status + "what's blocked?"

Markdown files can hold all that data. AI can read it, understand it, act on it.

Six commands now run my entire operation:

`/daily` gives me a morning briefing synthesized from GitHub, meetings, invoices, and calendar — in 30 seconds.

`/client-update` drafts branded status emails that used to take me 30 minutes each.

`/talent-search` queries 50 evaluated candidates by skill.

The result after 3 weeks:
- 10+ hours/week of ops work gone
- $0/month in SaaS fees
- Zero context ever lost

The best part? When I need a new field, I just add it to the markdown. No migrations. No schema changes. No begging a vendor for a feature.

My data. My format. My rules.

https://thefocus.ai/case-studies/ai-back-office/

---

## Post 2 - The $7,500 Problem (January 30)

An invoice sat unpaid for 14 days and I completely forgot about it.

Not because I'm disorganized. Because I was drowning.

Every morning started the same way: Check Slack. Check email. Check calendar. Check the project board. Check the invoice spreadsheet. Check, check, check.

By the time I assembled a picture of what actually mattered, an hour was gone. And things still fell through the cracks.

The $7,500 invoice? Buried in a spreadsheet I opened maybe twice a week.

So I built something different.

Now I run one command: `/daily`

It reads everything — project files, commits, meeting transcripts, invoices, tasks, calendar — and tells me what actually matters.

```
TODAY'S PRIORITIES:
1. Wobblefish — PR needs review before demo
2. Invoice — $7,500 overdue (14 days)  ← Would have missed this
3. Hiring — Trial week check-in

ONE THING:
If you do nothing else: Follow up on that invoice.
```

Important over urgent.

The briefing surfaces what you'd forget. The invoice going stale. The candidate waiting for a response. The client you haven't updated in two weeks.

30 seconds to know exactly where to focus.

That $7,500? Got paid the next day.

https://thefocus.ai/case-studies/ai-back-office/

---

## Post 3 - I Let AI Reject 50 Job Candidates (January 31)

(Before you write that angry comment, hear me out.)

Posted a junior developer role. 50 applications arrived over the weekend.

Each one deserved real evaluation. Check GitHub — is there code? LinkedIn — real experience? Portfolio — can they ship?

That's 25+ hours of work. Meanwhile, the good candidates are emailing for updates while I'm still reviewing the first ten.

So I built a pipeline.

Claude processes each application:
1. Parse the email
2. Research GitHub, LinkedIn, portfolio
3. Evaluate against requirements with evidence
4. Rate: Yes / Maybe / No
5. Draft a personalized response

One candidate looked perfect. Tons of "React" in their profile.

Claude said no.

The "React experience"? Actually Streamlit dashboards over Python ML code. Not frontend development. I would have wasted an interview slot.

Another candidate had sparse GitHub. Looked weak on paper.

Claude dug deeper: their commits showed clean architecture patterns. The sparse activity was because they'd been working on proprietary code for 3 years. Recommended a call.

The AI doesn't make the hire decision. It makes sure I don't miss signals in the noise — positive or negative.

Every candidate got a personalized response. Not a form letter. A real acknowledgment of their specific background.

48 people evaluated, researched, and contacted. One weekend. Zero guilt about ghosting applicants.

https://thefocus.ai/case-studies/ai-back-office/

---

## Post 4 - The Email I've Been Putting Off For 3 Weeks (February 1)

"I should send Barnaby an update."

Tuesday: That thought appears.
Wednesday: Still on the list.
Thursday: Maybe tomorrow.
Friday: The week got away from me.

Three weeks later, Barnaby's wondering if his project is still alive. The relationship quietly erodes.

I know what the update should say. I just can't make myself write it.

Pull up the project file. Remember what we discussed. Check what shipped. Look at the invoice. Make it coherent. Make it professional.

30 minutes minimum. Times six clients. That's three hours of email writing — if I actually do it.

So I stopped writing them.

Now I run `/client-update wobblefish` and Claude drafts the whole thing:

- Reads the project file
- Pulls the weekly commit summary
- Checks meeting transcripts
- Notes invoice status
- Formats it in branded HTML
- Creates a Gmail draft

I review it. Maybe tweak a sentence. Hit send.

The email that haunted me for three weeks? Generated in 8 seconds.

Client communication now happens consistently because the friction disappeared.

Barnaby gets his update. I don't dread Monday mornings. Everyone wins.

https://thefocus.ai/case-studies/ai-back-office/

---

## Post 5 - My Database Is a Text File (February 2)

"That doesn't scale."

You're right. It doesn't scale to millions of users.

It scales perfectly to running a consulting business.

My invoice "database":

```markdown
## Outstanding

| Client | Amount | Due | Status |
|--------|--------|-----|--------|
| Mongoose | $7,500 | Jan 17 | Overdue |
| Wobblefish | $15,000 | Feb 3 | Sent |

## Paid (2026)

| Client | Amount | Paid |
|--------|--------|------|
| Periwinkle | $10,000 | Jan 28 |
```

That's it. A markdown table.

"But what about data integrity?"

Claude is the integrity layer. It reads the data, understands the intent, handles inconsistencies.

"But what about queries?"

I ask Claude in English. "Which invoices are overdue?" "What's my total outstanding?" "Who paid in January?"

"But what about migrations?"

What migrations? When I need a new field, I add it. Claude adapts instantly.

Every schema is a bet on the future. "We'll need these fields, in this structure, forever." That bet is almost always wrong.

My approach: Let structure emerge from usage. Let the system adapt to the data instead of constraining data to fit the system.

Traditional software engineers will hate this.

It works anyway.

https://thefocus.ai/case-studies/ai-back-office/

---

## Post 6 - The Real Data Isn't In Your Systems (February 3)

"We agreed to push the deadline to the 15th."
"Barnaby said he's prioritizing mobile now."
"We need the assessment before the board meeting."

Where does this information live?

Not in Jira. Not in your CRM. Not in the project spec.

It lives in conversations. And conversations evaporate.

Two weeks later, someone asks "what did we decide about the timeline?" and everyone has a different memory.

This is the actual problem with project management. Not task tracking. Tribal knowledge disappearing.

So I started recording everything.

Every client call gets transcribed. `/sync` drops the transcript into the right project folder automatically.

Now the weekly report connects conversations to code:

```
Meeting: Jan 22 with Barnaby
- Agreed to prioritize event handlers before demo
- Raised backfill performance concerns

Commits this week:
- Add event handlers (addresses meeting agreement)
- Fix backfill performance (addresses Barnaby's concern)

Status: On track. Did what we said we'd do.
```

The conversation becomes part of the project record.

When a client asks "where do we stand?" I don't alt-tab through five apps. The answer is already synthesized.

https://thefocus.ai/case-studies/ai-back-office/

---

## Post 7 - Why I'll Never Buy Another SaaS Tool (February 4)

$47/month for CRM.
$25/month for project management.
$15/month for invoicing.
$30/month for the HR platform.

That's $117/month to be locked into four different data silos, each with their own login, their own limitations, their own way of doing things.

And the moment I want these systems to talk to each other? "That'll be our Enterprise plan."

I canceled all of it.

Now I have:
- A folder of markdown files
- Claude Code
- Some open-source plugins

Total monthly cost: Whatever I was already paying for Claude.

But cost isn't even the real win.

The real win is ownership.

When I want a new feature, I don't submit a ticket and wait 6 months. I describe it to Claude and it exists in 10 minutes.

When I want to change the data model, I just... change it. No migration scripts. No breaking changes. No API versioning.

When I want to query across all my data — projects, invoices, candidates, sales — I ask one question and get one answer. No "integrations" required.

My operations run on text files that I own completely.

If Claude disappeared tomorrow, I'd still have readable, portable data.

Try saying that about Salesforce.

https://thefocus.ai/case-studies/ai-back-office/

---
