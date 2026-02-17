---
title: "57,000 Transactions Synced: Automated Construction Project Accounting from QuickBooks to Google Sheets"
industry: Construction / Finance
client: Steering House
year: "2026"
timeline: "4 weeks (inherited codebase)"
services: "Development"
description: We inherited and stabilized a QuickBooks-to-Google Sheets sync system for a construction company managing multiple active projects. Hourly automated sync pulls labor, materials, and transaction data from QuickBooks Online into per-project reconciliation spreadsheets — giving project managers real-time visibility into costs without leaving the tools they already use.
results: |-
  - 57,829 transactions synced from QuickBooks to Google Sheets
  - Hourly automated sync with zero manual intervention
  - Per-project reconciliation spreadsheets for multiple active construction sites
  - Labor date filtering fixed — resolved systematic data gaps for 10+ employees
tech_stack: "Python, Flask, Google App Engine, QuickBooks Online API, MongoDB, Google Sheets API, OAuth 2.0"
published: true
image: qbsync_wide.png
maturity_level: "L2"
maturity_level_secondary: "L3"
ai_function: "Process Automation"
department: "Finance"
---

## The Challenge

Steering House is a construction company managing multiple active building projects across New York — each with its own budget, labor force, materials spend, and subcontractor commitments. Their financial data lives in QuickBooks Online, but their project managers and accountants work in Google Sheets.

The gap between these two systems was a constant source of friction. Someone had to manually pull reports from QuickBooks, reformat the data, and paste it into the right project spreadsheet. Labor hours needed overtime calculations. Material purchases needed to be mapped to the right project. Reconciliation tabs needed to stay current so project managers could compare budgets against actuals.

A previous developer had built a sync tool — 224 commits over the course of a year — but when Focus.AI was brought in, the system had stopped syncing. The original developer's infrastructure was unreachable, and the client couldn't roll out the tool company-wide because of a critical missing feature: the ability to filter historical labor data by date.

**The specific pain:** Every new hire since August 2025 was missing from the synced data. Ten employees' labor records weren't showing up in the reconciliation spreadsheets, and nobody knew why.

## Our Approach

We took over an existing codebase rather than starting from scratch. The first priority was getting the system running again, then diagnosing and fixing the data gaps.

Our investigation revealed the problem wasn't random API flakiness — it was systematic. The sync was querying QuickBooks by `LastUpdatedTime` (when a record was last modified) rather than `TxnDate` (when the work actually happened). This meant that approved timesheets falling outside the 14-day fetch window were silently dropped. For newer employees whose time entries were being approved in batch, the data simply never made it through.

## Technical Implementation

### Architecture

The system runs as a Flask application on Google App Engine with an hourly cron trigger:

```
QuickBooks Online → OAuth 2.0 → App Engine (Flask) → MongoDB → Google Sheets API
```

**Hourly sync cycle:**
1. Refresh OAuth tokens
2. Pull recent deletes from QuickBooks (CDC)
3. Fetch updated transactions — labor, purchases, deposits
4. Store raw data in MongoDB
5. Transform and sync to per-project Google Sheets

### What We Fixed

**Query strategy.** Switched TimeActivity queries from `MetaData.LastUpdatedTime` to `TxnDate`. This aligned data ingestion with pay periods rather than modification timestamps, eliminating the "approved outside the window" failure mode.

**Date filtering.** Implemented the client's core requirement: filter pre-2026 labor entries from reconciliation sheets while preserving all raw data in MongoDB for troubleshooting. Material, subcontractor, and other cost types sync without date restrictions.

**Import and deployment.** Fixed module import paths for App Engine's deployment model (absolute imports required) and added proper timeout handling for QuickBooks API calls.

**Reconciliation integrity.** Verified the labor filter against 12,634 labor line items in MongoDB — 11,025 pre-2026 entries correctly filtered from sheets, 1,609 current entries syncing normally, zero pre-cutoff entries leaking through.

### Per-Project Reconciliation

Each active construction project gets its own Google Sheets spreadsheet with:

- **QB Sync tab** — raw transaction data from QuickBooks
- **Reconciliation tabs** — dated snapshots comparing budgets vs. actuals
- **Labor entries** — time tracked by employee, mapped to projects
- **Material entries** — purchases and deposits mapped to cost codes
- **Manual overrides** — a dedicated sheet for adjustments that don't come from QuickBooks

The system handles multiple concurrent projects (50 Garden Place, 33 Joralemon Street, 35 Joralemon, and others), each with thousands of transaction rows syncing hourly.

## Results

After stabilizing the system:

- **57,829 total transactions** tracked in MongoDB across all projects
- **Hourly sync** running reliably on App Engine with zero errors
- **10 missing employees** now showing up correctly in labor reconciliation
- **Per-project sheets** updating automatically — project managers check costs without touching QuickBooks
- **Date filtering** working as designed — clean 2026 data in reconciliation, full history preserved in database

## What Made This Work

**1. Inheriting vs. rebuilding.** The existing codebase had 224 commits of working logic — overtime calculations, project mapping, reconciliation formatting. Rebuilding would have taken months. Instead we diagnosed the specific failures and fixed them in weeks.

**2. Systematic diagnosis over guessing.** The missing employee data looked like random API issues. The actual cause was a query strategy mismatch — fixable in a few lines once identified. The TimeActivity investigation report gave the client full transparency into what was wrong and why.

**3. Google Sheets as the interface.** The client's project managers live in spreadsheets. Rather than building a new dashboard nobody would use, the system pushes structured data into the tool they already check every day.

**4. Preserving raw data.** Filtering labor from reconciliation sheets while keeping everything in MongoDB means nothing is lost. When questions come up about historical data, the answer is always retrievable.
