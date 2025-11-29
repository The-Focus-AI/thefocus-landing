---
title: "27% Higher Conversion: Building a Conversational AI Layer for EV Data"
industry: Transportation / Consumer Apps
client: TezLab
year: "2025"
timeline: "8 weeks"
services: "Strategy + Development"
description: We built a conversational AI interface that lets Tesla and Rivian owners ask natural language questions about their driving data, plan road trips, and get personalized insights — all without the existing mobile team changing a single line of code.
results: |-
  - 27% increase in user acquisition and paid conversion
  - Zero changes required to existing backend infrastructure
  - 8-week timeline from kickoff to production launch
  - 15+ specialized tools for vehicle data, charging, and trip planning
tech_stack: "Next.js 15, TypeScript, MCP SDK, OpenRouter, Mapbox, Recharts, Vercel"
testimonial: "Focus.AI delivered a complete AI-powered web experience in weeks, not months. They understood our API architecture immediately and built something our users love — without disrupting our mobile team at all."
testimonial_person: "Ben Schippers"
testimonial_company: "CEO, TezLab"
published: true
image: tezlab_wide.png
---

### The Challenge

[TezLab](https://tezlabapp.com) is the #1-rated companion app for Tesla and Rivian owners. The app tracks everything: battery health, charging efficiency, driving patterns, energy costs, and more. They've built a loyal community of EV enthusiasts who obsess over optimizing their vehicle's performance.

But the data was locked in static dashboards. Users who wanted to understand how their efficiency varied with temperature had to manually compare charts. Planning a road trip meant jumping between multiple screens. And the growing demand for "just tell me what I need to know" insights wasn't being met.

**The constraint:** TezLab's mobile development team was fully committed to their 2025 roadmap. They couldn't spare engineering cycles for an experimental AI feature, but they didn't want to miss the opportunity either.

**What they needed:** A partner who could build a complete AI-powered web experience on top of their existing infrastructure — without requiring any backend changes or mobile team involvement.

### Our Approach

We started with a two-day deep dive into TezLab's existing API architecture. Their backend already exposed rich endpoints for vehicle state, charging history, driving activities, supercharger locations, and trip data. The challenge wasn't getting the data — it was making it conversational.

**The key insight:** Rather than building a traditional chatbot with hardcoded responses, we designed a system where the LLM could dynamically call TezLab's APIs as tools. When a user asks "How's my battery health compared to other Model 3 owners?", the AI knows to call the car scoring endpoint, interpret the results, and explain them in plain English.

This meant building two interconnected systems:

1. **An MCP Server** — A Model Context Protocol implementation that wraps TezLab's REST API as LLM-callable tools
2. **A Web Application** — A Next.js frontend with a chat interface and rich visual components for displaying results

### Technical Implementation

#### The MCP Server Architecture

We built a TypeScript MCP server supporting both STDIO (for CLI testing) and SSE (for web clients). Each TezLab API endpoint became a tool with carefully designed schemas:

```
Tools Implemented:
├── Vehicle State (real-time battery, location, climate)
├── Recent Drives (with pagination, time filtering)
├── Recent Charges (home vs. supercharger breakdown)
├── Vehicle Statistics (efficiency, temperature trends)
├── Car Score (battery health comparisons)
├── Supercharger Search (location-based with ratings)
├── Charger Details (availability, pricing, reviews)
└── Road Trip Planning (multi-stop routing with charger optimization)
```

The critical design decision: **tool descriptions matter enormously for AI performance.** We iterated extensively on how each tool was described to the LLM, including when to use it, what parameters mean, and how to interpret results. For example, the system prompt explicitly defines that "real world range" uses current battery percentage and rolling median efficiency — a distinction that confused early model outputs.

#### The Frontend: Beyond Text Responses

A text-only chat interface would have been a missed opportunity. When users ask about their driving stats, they want to *see* the trends. When planning a road trip, they want a *map*.

We built custom React components for each tool response type:

- **StatToolResponse** — Recharts-based visualizations for time-series data (efficiency over time, battery temperature trends)
- **RoadTripTool** — Full Mapbox integration with route polylines, charger markers, and an interactive timeline of stops
- **ChargerListResponse** — Filterable list with ratings, pricing, and real-time availability indicators
- **RecentDrivesResponse** — Trip summaries with distance, efficiency, and energy consumption

The chat interface uses Vercel's AI SDK with streaming responses. The model selection is dynamic: GPT-4 for initial messages (better reasoning for complex queries), GPT-4o-mini for follow-ups (faster, cheaper for clarifications).

#### Authentication Without Backend Changes

TezLab's existing OAuth2 flow was designed for mobile apps. Rather than asking them to modify their auth system, we built an adapter:

1. Users authenticate through TezLab's standard OAuth flow
2. We exchange tokens for MCP-specific credentials
3. The MCP server validates tokens on each request
4. Automatic token refresh handles session expiration transparently

This meant **zero backend changes** for the TezLab team — the single most important constraint we had to satisfy.

### What Made This Work

**1. MCP as an integration pattern.** The Model Context Protocol gave us a clean abstraction between the AI layer and TezLab's APIs. When TezLab adds new endpoints, we add new tools — the LLM automatically learns to use them based on user intent.

**2. Rich visual responses.** Users don't want to read paragraphs about their efficiency trends. They want charts. The component-per-tool architecture let us build exactly the right visualization for each data type.

**3. Context-aware prompting.** The system prompt includes the user's current vehicle state, location, and preferences. When a user asks "find chargers near me," the LLM already knows where "me" is.

**4. Parallel to existing operations.** The entire project ran independently of TezLab's mobile development. Their API didn't change. Their deployment process didn't change. We shipped a complete product without ever blocking their roadmap.

### Results

Within 6 weeks of launch:

- **27% increase** in user acquisition and conversion to paid tiers
- **Road trip planning** became the most-used feature among Pro subscribers
- **Zero downtime** or performance impact on existing mobile apps
- The AI assistant handles **thousands of queries daily** with sub-second response times

The web application now serves as TezLab's primary channel for showcasing AI capabilities to potential users, and the MCP server architecture provides a foundation for future AI integrations across their product suite.

### Technical Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 15, TypeScript, Tailwind, Radix UI | Chat interface, rich tool visualizations |
| **AI Integration** | Vercel AI SDK, OpenRouter | Streaming responses, model orchestration |
| **Tool Server** | MCP SDK, Express, Zod | API-to-tool bridge with schema validation |
| **Mapping** | Mapbox GL, Turf.js | Road trip visualization, charger locations |
| **Charts** | Recharts | Time-series data visualization |
| **Deployment** | Vercel (frontend), Kubernetes (MCP server) | Production infrastructure |
