---
title: "From Noise to Signal: AI-Powered Content Intelligence Across Twitter, YouTube, and Podcasts"
industry: Media Intelligence / Content Analytics
client: Internal Platform
year: "2025"
timeline: "12 weeks"
services: "Strategy + Development"
description: We built Distill — a multi-source content intelligence platform that automatically collects, transcribes, summarizes, and analyzes content from Twitter/X, YouTube videos, and podcasts. What used to require hours of manual monitoring and note-taking now happens in minutes, with AI-generated summaries that surface the signal from the noise.
results: |-
  - 94% reduction in time spent monitoring content sources
  - AI-generated summaries for 50+ tracked Twitter accounts daily
  - Full transcript + highlights from hour-long videos in under 5 minutes
  - Topic extraction and cross-source pattern detection
tech_stack: "Next.js 15, TypeScript, Node.js, Express, Google Gemini, Supabase, Stripe, Clerk, Fly.io, Vercel"
testimonial: "Distill changed how I stay informed. Instead of spending an hour scrolling Twitter, I get a two-paragraph summary of what actually mattered. The YouTube transcription saves me from watching entire interviews just to find the one quote I need."
testimonial_person: "Internal User"
testimonial_company: "Focus.AI"
published: true
image: distill_wide.png
---

### The Challenge

Information overload is the defining problem of the modern knowledge worker. Twitter alone generates 500 million tweets daily. YouTube adds 500 hours of video every minute. Podcasts publish over 100,000 new episodes weekly. Staying informed on topics that matter means either spending hours consuming content or missing critical insights entirely.

**The specific pain points:**

1. **Twitter/X fragmentation** — Following thought leaders means scrolling through an endless feed. Important threads get buried. Conversations span days. There's no way to ask "what did the AI research community discuss this week?"

2. **Video and podcast inaccessibility** — Long-form content is valuable but time-expensive. Watching a 90-minute interview to find the 3 minutes that matter is inefficient. Skimming isn't possible. Search doesn't exist.

3. **Cross-source blindness** — Topics emerge across platforms simultaneously. A Twitter thread references a podcast episode which discusses a YouTube interview. Connecting these dots manually is nearly impossible.

**What we needed:** A platform that ingests content from multiple sources, extracts meaning using AI, and presents insights in scannable, searchable form — without requiring human curation at scale.

### Our Approach

We designed Distill as a **federated intelligence system** — multiple specialized services that each excel at one content type, unified by a common data model and AI summarization layer.

**The key architectural insight:** Rather than building a monolithic application, we created purpose-built engines for each content type:

1. **Twitter Collator** — Handles Twitter's rate limits, collects tweets from watched accounts, groups them by conversation, and generates user-level and topic-level summaries

2. **Interview Transcriber** — Downloads audio from YouTube/Spotify, chunks it for parallel processing, transcribes with speaker identification, and extracts highlights

3. **Distill YouTube** — A user-facing SaaS for interview libraries with subscription billing, chat-based exploration, and curated content

4. **Distill X** — A dashboard for Twitter monitoring with collection management, topic filtering, and engagement analytics

Each service is independently deployable, scalable, and maintainable — but they share AI summarization patterns and can exchange data when needed.

### Technical Implementation

#### Twitter Intelligence Pipeline

Twitter's API rate limits are the primary constraint. We built a sophisticated quota management system:

```
Rate Limit Strategy:
├── 4 endpoint types tracked independently (search, timeline, userLookup, retweets)
├── Pre-check quota before requests
├── Optimistic decrement + actual header sync
├── Automatic 15-minute window reset detection
├── Persisted state survives container restarts
└── User tier system prioritizes high-value accounts
```

**The tier system:** We calculate a priority score for each tracked account based on posting frequency and follower count. When rate limits are tight, Tier 1-3 users (high-activity, high-impact) get resources first. This ensures the most valuable accounts always get fresh data.

**Conversation grouping:** Raw tweets are grouped by `conversation_id` to reconstruct threads. Engagement metrics aggregate across the full conversation, not just the original post. Notable retweeters (high-follower accounts amplifying content) are identified for each thread.

**AI summarization:** Google Gemini generates summaries in the user's voice (first-person perspective), extracts 3-5 key topics with descriptions, and explains why each conversation is interesting. The prompt explicitly prevents hallucination: "Only summarize ACTUAL tweets provided."

#### Video/Podcast Transcription Engine

Long-form audio presents different challenges. A 90-minute podcast can't be sent to an API in one request. We built a chunked processing pipeline:

```
Processing Pipeline:
URL → Metadata Extraction → Audio Download → 16kHz Downsampling
    → 10-minute Chunking → Parallel Transcription (5x concurrent)
    → Chunk Merging → Speaker Normalization → Highlight Extraction
    → Topic/People Extraction → Structured Output
```

**YouTube bot detection bypass:** YouTube aggressively blocks automated downloads. We implemented residential proxy support, automatic cookie management via Playwright, IPv4 forcing, and configurable retry strategies. When all else fails, the system gracefully falls back to manual upload.

**Speaker identification:** Gemini identifies speakers by extracting real names when mentioned, or using consistent role labels (Host, Guest, Interviewer). A normalization pass prevents "Speaker 1" vs "Speaker A" inconsistency across chunks.

**Timestamp accuracy:** Each transcript segment includes precise timestamps (HH:MM:SS format) preserved across chunk boundaries. The YouTube player can jump directly to any moment referenced in the highlights.

#### User-Facing Dashboard (Distill X)

The frontend makes complexity invisible:

- **Clerk authentication** with Twitter OAuth for seamless signup
- **Collection management** — group tracked accounts by topic (AI researchers, startup founders, industry analysts)
- **Topic filtering** — AI-extracted topics become filterable dimensions across all tweets
- **Engagement stats** — likes, retweets, replies, impressions aggregated by user and conversation
- **Focus Account integration** — credit-based billing for metered features

Built with Next.js 15 + React 19, the dashboard uses SWR for real-time data updates and Radix UI for accessible components. Supabase handles user state with Row Level Security ensuring users only see their own collections.

#### Interview Library SaaS (Distill YouTube)

A complete subscription product for interview content:

- **Stripe integration** — tiered pricing plans with monthly credit limits
- **Async job processing** — transcription jobs run in background with webhook notifications
- **AI chat** — ask questions about any interview, get answers with transcript references
- **Starred items** — bookmark interviews and chat conversations for later
- **Admin tools** — job management, Stripe sync, analytics dashboards

### What Made This Work

**1. Separation of concerns.** Each service does one thing well. Twitter Collator knows nothing about YouTube. Interview Transcriber knows nothing about billing. This makes each component testable, debuggable, and replaceable.

**2. Smart rate limit management.** Rather than failing when limits hit, the system degrades gracefully — prioritizing high-value content, caching aggressively, and resuming automatically when quotas reset.

**3. Schema-driven AI extraction.** Both Twitter summaries and video transcripts use structured output schemas with detailed field descriptions. This produces consistent, parseable results that can feed into dashboards and search indexes.

**4. Edge deployment.** User-facing AI features (chat) run on Vercel Edge for sub-second latency. Background processing (transcription) runs on Fly.io with persistent volumes for job state.

**5. Operational observability.** Every service exposes health checks, rate limit status, processing statistics, and debug endpoints. When something breaks at 3am, we can diagnose remotely.

### Results

The platform now processes daily:

- **50+ Twitter accounts** with automated summaries and topic extraction
- **Full transcripts** from hour-long videos in under 5 minutes
- **Cross-platform topic detection** identifying when the same subject appears across sources
- **User collections** allowing personalized monitoring without information overload

For internal users, this transformed content consumption:

| Before | After |
|--------|-------|
| 60+ minutes daily scrolling Twitter | 5-minute summary review |
| Watch full interviews to find quotes | Search transcripts, jump to timestamp |
| Miss conversations that happen overnight | Daily digest with nothing missed |
| No visibility into emerging topics | Topic trends across all sources |

### Technical Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Twitter Backend** | Node.js, Express, Twitter API v2, Gemini | Tweet collection, summarization, topic extraction |
| **Transcription Engine** | Node.js, yt-dlp, ffmpeg, Gemini | Audio processing, parallel transcription |
| **Interview SaaS** | Next.js 15, React 19, Supabase, Stripe | User-facing subscription product |
| **Twitter Dashboard** | Next.js 15, Clerk, Supabase, SWR | Real-time monitoring interface |
| **Infrastructure** | Fly.io, Vercel, Docker, PostgreSQL | Scalable deployment with persistent storage |

### Architecture Diagram

```
                    ┌─────────────────────────────────────────────┐
                    │              User Interfaces                 │
                    │  ┌─────────────┐    ┌─────────────────────┐ │
                    │  │  Distill X  │    │   Distill YouTube   │ │
                    │  │ (Twitter UI)│    │ (Interview Library) │ │
                    │  └──────┬──────┘    └──────────┬──────────┘ │
                    └─────────┼───────────────────────┼───────────┘
                              │                       │
                    ┌─────────┼───────────────────────┼───────────┐
                    │         │    Backend Services   │           │
                    │  ┌──────▼──────┐    ┌──────────▼─────────┐ │
                    │  │   Twitter   │    │    Interview       │ │
                    │  │  Collator   │    │   Transcriber      │ │
                    │  └──────┬──────┘    └──────────┬─────────┘ │
                    └─────────┼───────────────────────┼───────────┘
                              │                       │
                    ┌─────────┼───────────────────────┼───────────┐
                    │         ▼                       ▼           │
                    │  ┌─────────────────────────────────────┐   │
                    │  │          Google Gemini AI           │   │
                    │  │  (Summarization, Topics, Transcripts)│   │
                    │  └─────────────────────────────────────┘   │
                    └─────────────────────────────────────────────┘
```

This architecture enables Focus.AI to stay at the frontier of AI research, startup activity, and industry trends — by letting AI do the reading so we can focus on the thinking.
