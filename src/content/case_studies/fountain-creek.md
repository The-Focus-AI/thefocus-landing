---
title: "94.5% Accuracy on Invoice Parsing: AI-Powered Accounts Payable for Multi-Location Food Service"
industry: Food Service / Retail
client: Fountain Creek
year: "2026"
timeline: "4 weeks"
services: "Development"
description: We built an automated invoice parsing pipeline that converts scanned PDF invoices into structured financial data using Gemini 3 Flash. Restaurant managers submit invoices through a Notion form, and within seconds the AI extracts suppliers, line items, and totals — validated against 88 historical invoices at 94.5% accuracy.
results: |-
  - 94.5% overall accuracy validated against 88 historical invoices
  - 97.7% of invoices successfully parsed on first attempt
  - Manual data entry reduced from 15 minutes to under 30 seconds per invoice
  - Notion-native workflow — zero new tools for the team to learn
tech_stack: "Google Cloud Run, Gemini 3 Flash, Google Cloud Storage, Notion API, Eventarc, Node.js, TypeScript"
published: true
image: fountain-creek_wide.png
maturity_level: "L3"
ai_function: "Process Automation"
department: "Finance"
---

## The Challenge

Fountain Creek operates multiple food service locations — markets, delis, and grocery stores — and processes dozens of invoices weekly from a sprawling network of suppliers. Produce from Baldor, broad-line distribution from Sysco, specialty items from David Rosen, bakery from Intercounty, beverages from Northeast Beverage, facility supplies from Cintas. Each supplier sends PDFs in a different format, with different layouts, different field names, and different levels of detail.

The accounts payable process was entirely manual. Someone would open each PDF, read through the line items, type the supplier name, invoice number, amounts, and individual line items into their system. A single invoice took 10-15 minutes. Errors were common — transposed numbers, missed line items, wrong supplier assignments — and each mistake cascaded into reconciliation headaches downstream.

At roughly $5 per document in labor costs, the math only gets worse as the business scales from 25 locations toward their goal of 500+. The target: get invoice processing down to $0.30 per document.

**The core problem:** The team was spending hours every week on data entry that was tedious, error-prone, and didn't require human judgment. They needed that time for actual financial decision-making — reviewing food costs, catching anomalies, managing cash flow across locations.

## Our Approach

We designed the system around two principles: **meet the team where they already work** (Notion) and **keep humans in the loop for approval, not data entry**.

Rather than building a new application, we embedded the entire workflow into Notion — the tool the team was already using daily. Submit a PDF through a form, wait a few seconds, and the parsed invoice appears in a database ready for review.

The AI doesn't make financial decisions. It extracts data. A human still reviews and approves every bill before it moves to accounting.

## Technical Implementation

### The Pipeline

```
Notion Form → Webhook (Cloud Run) → GCS Bucket → Eventarc → Gemini 3 Flash → Notion Databases
```

**Step 1: Submission.** Staff upload a PDF through a Notion form — on desktop or mobile. No new tools, no new logins.

**Step 2: Ingestion.** A Cloud Run webhook receives the Notion event, downloads the PDF attachment, and stores it in a Google Cloud Storage bucket.

**Step 3: Parsing.** GCS triggers an Eventarc event, which invokes a second Cloud Run service. This service sends the PDF to Gemini 3 Flash with a structured extraction schema — supplier details, invoice metadata, and line items.

**Step 4: Storage.** Parsed data writes to three interconnected Notion databases: Bills (the invoice header), Line Items (individual charges), and Suppliers (vendor directory, auto-created if new).

**Step 5: Review.** The bill appears in Notion with a "Pending Review" status. The AP team reviews, adjusts if needed, and approves.

### Structured Extraction with Gemini 3

The key to accuracy was the extraction schema. Instead of asking the AI to "extract invoice data," we defined exactly what we expected:

- **Supplier info:** Name, address, contact details
- **Invoice metadata:** Number, date, due date, PO number, payment terms
- **Line items:** Description, product code, quantity, unit price, extended price, category
- **Soft costs:** Delivery fees, fuel surcharges, bottle deposits, tax
- **Totals:** Subtotal, tax, shipping, total amount due

Each field includes guidance about where it typically appears in food service invoices and how to handle edge cases — weight-based vs. unit-based pricing, case quantities vs. individual items, and multi-page invoices from high-volume distributors.

### Multi-Page Invoice Handling

Food service distributors like Sysco and Baldor often send invoices with dozens of line items spanning multiple pages. Early testing showed Gemini would sometimes truncate extraction on longer documents — not a token limit issue, but an attention limitation. We solved this with page-by-page extraction: headers are captured once, then line items are extracted per-page and merged with deduplication. One Sysco invoice with 43 line items across 4 pages now parses completely.

### Supplier Intelligence

The system maintains a supplier database that grows automatically. When Gemini extracts a supplier name, it fuzzy-matches against existing entries before creating a new one. This prevents the "Baldor" vs "BALDOR SPECIALTY FOODS" vs "Baldor Foods" problem that plagues manual data entry.

## Results

We validated the system against 88 historical invoices that had been manually entered:

| Metric | Result |
|--------|--------|
| Invoices Successfully Parsed | 86/88 (97.7%) |
| Header Field Accuracy | 93.6% |
| Line Item Accuracy | 95.4% |
| **Overall Accuracy** | **94.5%** |
| Perfect Match Invoices | 64/86 (74.4%) |

The two failed invoices were heavily damaged scans — one was partially cut off, the other was a hand-written receipt. Both would have been difficult for a human to process too.

A notable finding: many "discrepancies" turned out to be errors in the manually-entered ground truth data, not in the AI parsing. The parser was extracting item codes and details that had been missed or mistyped during manual entry.

**What changed for the team:**
- Invoice processing went from 15 minutes of typing to 30 seconds of review
- Data entry errors dropped dramatically — AI doesn't transpose numbers
- The AP team now spends their time on financial analysis, not clerical work
- New suppliers are automatically catalogued with consistent formatting

## What's Next

The natural next phase is closing the loop to accounting software. Approved bills in Notion will export directly to Xero, eliminating the last manual step in the AP workflow. We're also adding email intake — forwarding invoices to a dedicated address will trigger the same parsing pipeline, removing even the Notion form step for suppliers who send PDFs via email.

As Fountain Creek scales from 25 locations toward 500+, this pipeline scales with them — serverless architecture means costs stay proportional to volume, not headcount.

## What Made This Work

**1. Notion as the interface.** The team didn't need to learn anything new. The form, the review workflow, the approval process — it all happens in a tool they use every day.

**2. AI for extraction, humans for judgment.** The system doesn't decide whether to pay an invoice. It handles the tedious part (reading PDFs and typing numbers) so humans can focus on the important part (is this correct and should we pay it?).

**3. Validation against real data.** Testing against 88 historical invoices before going live gave the team confidence. They could see exactly where the AI matched their manual work and where it differed.

**4. Serverless event-driven architecture.** Cloud Run + Eventarc means the system scales automatically and costs nearly nothing when idle. There's no server to maintain, no cron job to monitor.
