---
title: "Zero to Live in 10 Weeks: Building a Referral-Only Marketplace for Event Production"
industry: Events / Experiential Marketing
client: Name-Drop Network
year: "2025"
timeline: "10 weeks"
services: "Strategy + Development"
description: We built a referral-only, fully-vetted two-sided marketplace connecting event vendors with planners — where trust is the product and quality is enforced through network effects.
results: |-
  - 43+ vendor categories with structured profiles and portfolios
  - Referral system with 30-day token expiration and tracking
  - Row-level security ensuring data privacy across the entire platform
  - Admin approval workflow processing applications in under 24 hours
tech_stack: "React 19, TypeScript, Vite, Supabase (PostgreSQL + Edge Functions), Clerk, Tailwind CSS, Resend"
testimonial: "Focus.AI understood that we weren't building a directory — we were building a trust network. The referral system they designed captures exactly how our industry actually works: reputation flows through personal connections."
testimonial_person: "Founder"
testimonial_company: "Name-Drop Network"
published: true
image: ndn_wide.png
---

### The Challenge

The events and experiential industry runs on relationships. When a corporate client needs a DJ for their product launch, they don't search Google — they ask their trusted event planner who asks their trusted vendors. Quality in this industry is verified through word-of-mouth, not star ratings.

But this creates a problem: how do you scale a relationship-based industry? How do new vendors break in? How do planners find specialists outside their immediate network without sacrificing the trust that makes the system work?

**The founder's insight:** Build a platform that digitizes the referral network itself. Not a directory where anyone can list themselves, but a closed network where every member is vouched for by existing members. If you're in, someone trusted you enough to invite you.

**The technical challenge:** Most marketplace platforms treat "trust" as a star-rating system bolted on after launch. Name-Drop Network needed trust baked into the architecture from day one — in how users join, how they're verified, how their profiles are built, and how they find each other.

### Our Approach

We started with a fundamental architecture decision: **the referral system isn't a feature, it's the foundation.** Every technical choice flowed from that principle.

**Authentication as access control.** Rather than "sign up and post," the platform required invitation tokens before account creation. We integrated Clerk for OAuth with custom JWT validation in Supabase, creating a chain: invite → application → admin review → member creation. No step can be skipped.

**Profiles that prove competence.** In the events world, a portfolio matters more than a bio. We built a structured profile system with projects, media galleries (including Instagram embed support), service capabilities, and geographic coverage. Profile completion percentage gamifies thoroughness — incomplete profiles don't appear in search.

**Search that respects boundaries.** When a planner searches for "AV technicians in the Northeast," they should only see vetted vendors. Row-level security policies ensure users only see what they're authorized to see, enforced at the database level, not the application level.

### Technical Implementation

#### The Referral Token System

Every member can generate invite links with unique tokens:

```
Architecture:
├── referral_invites table
│   ├── unique token (UUID)
│   ├── inviter_id (who sent it)
│   ├── invitee_email (who it's for)
│   ├── expires_at (30 days from creation)
│   ├── status (pending, accepted, expired)
│   └── tracking fields (opened, clicked, errored)
└── Edge Function: send-referral-email
    └── Resend + React Email templates
```

When someone clicks an invite link, we validate the token, check expiration, record the referral relationship, and route them through the application flow. The referrer gets credit — this matters for network analytics and potential future incentive programs.

#### Authentication Chain: Clerk → Supabase

The trickiest integration: using Clerk for user-facing auth while Supabase handles data with Row-Level Security. We built an adapter:

1. User authenticates via Clerk (OAuth or email/password)
2. Clerk issues a JWT with custom claims
3. Frontend passes JWT to Supabase on every request
4. Supabase validates against Clerk's JWKS endpoint
5. RLS policies use `clerk_user_id()` function for row-level access

This lets us use Clerk's polished auth UI while maintaining database-level security — no API-layer trust required.

#### Profile System with 27 Tables

The schema evolved through 18 migrations as requirements crystallized:

| Table Group | Tables | Purpose |
|-------------|--------|---------|
| **Core** | members, user_roles | Profile data and permissions |
| **Applications** | applications, waitlist_applications, application_notes | Intake pipeline |
| **Referrals** | referral_invites, referrals | Network tracking |
| **Profile** | member_projects, project_media, member_social_links | Portfolio content |
| **Discovery** | member_tags, tag_votes, profile_votes | Peer validation |
| **Analytics** | activities, member_analytics | Usage tracking |
| **Admin** | admin_actions | Audit trail |

Every table has RLS policies. Members see only their own data (and public profiles of others). Admins see everything but actions are logged. No endpoint returns data the requester shouldn't see.

#### Admin Workflow for Quality Control

Applications flow through a review queue:

```
Waitlist Application → Full Application → Admin Review → Approval/Rejection
                                              ↓
                                    Data migrates to members table
                                              ↓
                                    Invitation email sent
                                              ↓
                                    Member completes profile
```

The admin dashboard shows pending applications with full context: who referred them, their submitted portfolio, their service categories. Approvals trigger an RPC function that:

1. Creates the member record
2. Copies application data
3. Sends the invitation email
4. Logs the admin action

Rejection routes to a notification flow with feedback.

#### Analytics Without Creepiness

The platform tracks engagement in ways that help vendors understand their visibility:

- **Profile views:** Who viewed your profile (with names, not just counts)
- **Search appearances:** How often you appeared in search results
- **Contact reveals:** When someone clicked to see your email/phone

But privacy matters. Analytics are aggregated appropriately — you can see that 5 people viewed your profile, but browsing behavior isn't exposed in ways that feel invasive.

### What Made This Work

**1. Feature-based architecture.** We organized code by domain (auth, admin, profile, search, referrals, analytics) rather than technical layer. Each feature contains its own components, services, hooks, and types. When requirements changed — and they did — changes were isolated.

**2. Service layer abstraction.** All database operations go through service functions that accept SupabaseClient as a parameter. No React imports in services. This made business logic testable and kept components focused on UI.

**3. Edge Functions for email.** Supabase's Deno-based Edge Functions handle all transactional email: waitlist confirmation, application confirmation, member invitation, referral emails. Serverless, scalable, and decoupled from the frontend.

**4. Iterative schema design.** We didn't try to predict every field upfront. The 18 migrations tell a story of evolving requirements — adding profile completion tracking, restructuring tags into capabilities, building out the analytics system. Supabase's migration tooling made this safe.

### Results

After 10 weeks of development:

- **43+ service categories** covering the full events ecosystem: catering, DJs, florists, AV technicians, venues, staffing, and more
- **Referral system processing** with token validation, expiration handling, and relationship tracking
- **Admin approval workflow** enabling quality control at network entry
- **Comprehensive analytics** showing vendors their visibility in the network
- **Production-ready infrastructure** with Vercel frontend and Supabase backend

The platform launched with a curated initial network and is growing through the referral mechanism it was designed around. Each new member must be invited by an existing member — the architecture enforces the community's values.

### Technical Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind, shadcn/ui | Member and admin interfaces |
| **Auth** | Clerk, Supabase JWT integration | OAuth, role-based access |
| **Database** | PostgreSQL via Supabase, 27 tables, RLS | Secure data storage |
| **Email** | Deno Edge Functions, Resend, React Email | Transactional notifications |
| **Media** | Instagram embeds, image galleries | Portfolio display |
| **Deployment** | Vercel (frontend), Supabase Cloud (backend) | Production infrastructure |
