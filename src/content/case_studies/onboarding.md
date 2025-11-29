---
title: "From 15 Minutes to 30 Seconds: AI-Powered Benefits Document Extraction"
industry: Human Resources / SaaS
client: HR Software Provider
year: "2025"
timeline: "6 weeks"
services: "Development"
description: We built a schema-driven AI pipeline that extracts structured data from complex healthcare benefits documents (SBCs), transforming a frustrating 15-minute manual process into a 30-second automated workflow.
results: |-
  - 78% reduction in onboarding time
  - 98% accuracy in data extraction
  - 15-minute process reduced to 30 seconds
  - Zero manual data entry for standard documents
tech_stack: "AWS Lambda, S3, DynamoDB, Claude 3 Opus, SvelteKit, TypeScript, Zod"
testimonial: "This solution completely changed the way that we were able to onboard new customers, making a process that was frustrating into an almost magical experience."
testimonial_person: "Chief Product Officer"
testimonial_company: "HR Software Provider"
published: true
image: onboarding_wide.png
---

## The Challenge

Our client provides a communication platform for retirement and healthcare benefits — a centralized place where employees can access information about their coverage, costs, and options. When companies onboard onto their platform, they need to import detailed information about every benefit plan they offer.

The problem: this information arrives as Summary of Benefits and Coverage (SBC) documents — standardized PDFs from insurance providers. While the format is "standardized," every carrier implements it differently. UnitedHealthcare documents look nothing like Cigna documents. A benefits administrator would spend 15+ minutes per document manually copying deductibles, copays, out-of-pocket limits, and coverage details into the system.

**The scale of the problem:** With dozens of plans per client and hundreds of clients onboarding each quarter, this manual process consumed thousands of hours annually. And errors were common — a typo in a deductible could cause months of support issues.

## Our Approach

We built a schema-driven extraction system using Claude 3 Opus. The key insight: rather than training a model to recognize specific document layouts, we gave the AI a comprehensive schema describing *what* to extract and *where to look* for it in SBC documents.

**The schema approach:** We defined a detailed Zod schema with over 50 fields covering everything from basic plan information to complex coverage scenarios:

```typescript
const HealthInsurancePlanSchema = z.object({
  planName: z.string().describe(
    "The formal name of the health insurance plan. Usually appears at the top of the SBC."
  ),
  deductibles: z.object({
    inNetwork: z.object({
      individual: z.number().describe(
        "Found in 'What is the overall deductible?' section."
      ),
      family: z.number(),
    }),
    outOfNetwork: z.object({...}),
  }),
  // ... 50+ more fields with detailed extraction hints
});
```

Each field includes not just validation rules but *extraction guidance* — telling the AI where in the document to find each piece of information. This made the system robust to layout variations because it understood the semantics, not just the visual structure.

## Technical Implementation

### Serverless Processing Pipeline

We built on AWS with a fully serverless architecture:

```
PDF Upload → S3 Trigger → Lambda Processor → Claude 3 Opus → Schema Validation → DynamoDB
                                                                    ↓
                                                    Admin Review (edge cases only)
```

**S3 Event Trigger:** When a PDF lands in the input bucket, it automatically triggers processing. No polling, no queues to manage — S3 events handle it.

**Lambda Processing:** Each document processes in its own Lambda invocation. Claude 3 Opus handles the extraction, receiving the PDF as a base64-encoded attachment and the schema as structured output format.

**DynamoDB for State:** Every processing job gets tracked — when it started, its status, where the output went. This lets the admin UI show real-time progress and handle retries gracefully.

### Schema Validation Layer

The client's existing database had strict constraints. A dental plan needs different fields than medical. An HSA has different rules than an FSA. We built validation that ensures every extraction matches the expected schema before hitting the database.

When extraction fails validation, the document routes to an admin queue rather than silently failing. The admin interface shows the original PDF alongside the extracted JSON, letting operators quickly fix issues.

### SvelteKit Admin Frontend

The admin interface provides:

- **Real-time dashboard** showing input/output bucket statistics
- **Drag-and-drop upload** for manual testing
- **PDF preview** side-by-side with extracted JSON
- **Processing status tracking** with automatic updates
- **Error handling** with retry functionality

Deployed on ECS Fargate for reliable, auto-scaling hosting.

## What We Extracted

The system handles the full complexity of U.S. healthcare benefits:

- **Basic plan info:** Name, carrier, plan type, coverage period
- **Cost sharing:** Deductibles, out-of-pocket limits, copays, coinsurance
- **Coverage details:** 20+ service categories from preventive care to prescription drugs
- **Network rules:** Referral requirements, provider directory URLs
- **Drug coverage:** Tier structure, retail vs. mail order, specialty medications
- **Exclusions:** Services not covered and their alternatives

Each field has validation rules and semantic descriptions that help the AI understand what it's looking for, even when the document layout varies.

## Results

The transformation was dramatic:

- **15 minutes → 30 seconds** for standard documents
- **98% accuracy** on first-pass extraction (no human review needed)
- **Edge cases** still get human review, but represent less than 5% of documents
- **Multi-carrier support** — works across UnitedHealthcare, Cigna, Aetna, Blue Cross, and others

The client's onboarding team went from dreading document processing to barely thinking about it. What used to be the slowest part of customer onboarding became essentially instant.

## What Made This Work

**1. Schema-as-prompt.** By embedding extraction guidance directly in the schema, we created a system that generalizes across document formats. New carriers just work because the AI understands what it's looking for semantically.

**2. Confidence routing.** Rather than guessing on ambiguous extractions, the system routes uncertain documents to humans. This maintains accuracy while still automating the clear cases.

**3. Operational tooling from day one.** The admin interface wasn't an afterthought — it shipped alongside the extraction pipeline. This made debugging, monitoring, and edge case handling smooth from the first deployment.

**4. Full AWS serverless.** No servers to manage, automatic scaling during busy periods, near-zero cost during quiet times. The architecture matches the bursty nature of customer onboarding.
