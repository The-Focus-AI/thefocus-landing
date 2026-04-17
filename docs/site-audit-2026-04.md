# Site Audit — CTAs, Language Consistency, and Story

_Date: April 2026_
_Scope: main landing site (`src/pages/*`) + subsites (weekend-warrior, weekend-coding-agent, AI Engineering Code Summit)_

This audit inventories every conversion path on thefocus.ai, flags where CTAs, voice, and design systems drift from the intended story, and lists prioritized fixes. Items marked **[fixed]** were applied in the same pass as this report.

---

## TL;DR

The consulting story is strong and mostly coherent:

> **"Can your organization describe its own work?"** → 6-level maturity framework (tribal → self-improving) → 3 engagement shapes (Assessment & Roadmap, Build & Ship, Ongoing Partnership) → proof via case studies.

The story **breaks down in three places**:

1. **Home vs. Capabilities taxonomy mismatch.** The home page sells three products (Vibe Check, Habitat Build, Embedded Partnership). The `/capabilities` page sells three different products (Assessment & Roadmap, Build & Ship, Ongoing Partnership). A visitor moving from home → capabilities effectively encounters a second company.
2. **Two sub-brands bleed into each other without a clear rule.** Client consulting (Renaissance / petrol / Fraunces) vs. Labs (Bell Labs / rand-blue / mono) is clear in intent but inconsistent in execution — `/reports` uses a third style (Bootstrap blue buttons), `/coding-agents` orphans the Labs aesthetic, and Labs pages drop the consulting CTAs entirely.
3. **CTA copy lacks a primary verb.** "Start a Conversation" (dominant) competes with "Discuss Your Strategy," "Scope a Project," "Discuss Strategy," "Let's Talk," "Discuss Your [Process]," and on the case-study template "Facing a similar challenge?". Eight variants for the same action.

**Recommended primary CTA:** `Start a Conversation` (already most-used, already in the global footer, matches the consulting voice).
**Recommended secondary CTA:** `See the Framework` (for prospecting) or `See Our Work` (for proof).

---

## 1. CTA Inventory

### 1.1 Primary consulting CTA by page

| Page | Hero primary | Hero secondary | Final primary | Final secondary |
|---|---|---|---|---|
| `/` (home) | See the Framework | View Case Studies | Start a Conversation¹ | See Our Work¹ |
| `/capabilities` | Find Out Where You Are | See the Framework | Start a Conversation | See Our Work |
| `/case-studies` | _(none — anchor only)_ | — | **Scope a Project** | **Discuss Strategy** |
| `/about` | _(none)_ | — | **Discuss Your Strategy** | **View Our Capabilities** |
| `/vibe-check` | Get Your Vibe Check | How It Works | Get Your Vibe Check | See How It Works |
| `/offerings/monthly-close` | Discuss Your Close Process → | — | Start a Conversation | See the Full Framework |
| `/offerings/invoice-processing` | Discuss Your AP Process → | — | Start a Conversation | See the Full Framework |
| `/offerings/hiring-pipeline` | Discuss Your Hiring Process → | — | Start a Conversation | See the Full Framework |
| `/offerings/customer-onboarding` | Discuss Your Onboarding Process → | — | Start a Conversation | See the Full Framework |
| `/offerings/executive-reporting` | Discuss Your Reporting Needs → | — | Start a Conversation | See the Full Framework |
| `/case-study/[id]` (template) | _(none)_ | — | **Start a Conversation** (on `bg-ink`, square — inconsistent) | **See the Full Framework** (square — inconsistent) |
| `/jobs` | — | — | _(newsletter + email CTA)_ | — |
| `/insights`, `/tools`, `/reports` (Labs) | **no consulting CTA at all** | — | — | — |

¹ From the global `BaseLayout` bottom-of-page CTA, present on every consulting page.

**Findings**

- **8 distinct wordings** for the single action "email us to start work": `Start a Conversation` · `Scope a Project` · `Discuss Strategy` · `Discuss Your Strategy` · `Discuss Your Close Process` · `Let's Talk` · `Let's map your starting point` · `Facing a similar challenge?` (CTA heading).
- **3 distinct secondary CTA wordings** for "see the framework": `See the Framework` · `View Our Capabilities` · `See the Full Framework` · `Explore the Full Framework`.
- Case studies page final CTA (`Scope a Project` / `Discuss Strategy`) is the most off-brand — it's the only place using `bg-paper`/`border-paper` on `bg-ink` without the rounded pill, and uses verbs that appear nowhere else.
- About page final CTA is likewise off-pattern (`Discuss Your Strategy` / `View Our Capabilities`).
- Case-study detail template CTAs use square-corner buttons with `bg-ink hover:bg-petrol` — breaks the pill aesthetic used everywhere else.
- Individual offering top-of-page CTAs use `Discuss Your X Process →` which _is_ good variation (specific + active), but the arrow glyph and the bottom-of-page generic `Start a Conversation` create two competing patterns on the same page. Suggest keeping the top-of-page specific form but rewriting the final CTA to be the same.
- Labs pages (`/insights`, `/tools`, `/reports`) have **zero** path back into the consulting funnel — a visitor who reads a research report has no next step except the global `BaseLayout` footer CTA. The Labs are positioned as proof of credibility for consulting; the pages should have at least one soft-bridge CTA like "Work with the team behind this research →".
- **Mobile home-page hero CTAs (`See the Framework` / `View Case Studies`)** do not match the sitewide global CTA (`Start a Conversation`). The hero is the highest-intent moment; a conversation CTA should live there too.

### 1.2 Email-signup CTA

Used globally in `BaseLayout`. Generic copy ("Subscribe to our newsletter"). No reinforcement of value prop. Recommend customizing per-section (already supported via `h2_prompt` / `p_prompt` props but unused outside subpages).

### 1.3 Broken / risky CTAs

- `/reports/coding-agent/` and `/reports/aiecode-2025-11/` are linked from `/reports` but **do not exist in `public/reports/`**. They are built from git submodules (`subsites/weekend-coding-agent`, `subsites/2025-11-20-ai-engineering-code-summit`) that are currently empty locally. If these submodules aren't fetched before build, the links 404.
- `/coding-agents` page exists but isn't in any nav — it serves an older June 2025 PDF landing page using a different layout (`LandingLayout`) and is effectively orphaned.
- `use-cases/index.astro` passes `title=` to `BaseLayout` but the component expects `pageTitle=`. Result: the page title falls back to `"the focus.ai"` (lowercase, generic) which is wrong for SEO.

---

## 2. Language & Voice Consistency

### 2.1 Brand-name usage

Canonical form: **TheFocus.AI** (PascalCase, no space).

Confirmed variants in copy:

| Form | Where | Correct? |
|---|---|---|
| `TheFocus.AI` | Everywhere consulting | ✅ canonical |
| `TheFocus.AI Labs` | Labs pages | ✅ canonical sub-brand |
| `The Focus AI` | RSS title, SEO alternateName | ✅ intentional for SEO |
| `Focus.ai` | `/reports` page description ("In-depth reports and analysis from Focus.ai") | ❌ **[fixed]** |
| `FOCUS/AI` | Logo in header | ✅ visual treatment |
| `Focus.ai` | Old blog post text | Low-priority — legacy content |

### 2.2 Taglines

Currently in circulation:

- **Hero H1 (home):** "Building an Intelligent Organization"
- **Footer strapline:** "Distill The Signal From The Noise"
- **Banner:** "Production AI shipped for Samsung, Tesla, Perplexity, and Rivian — in weeks, not quarters"
- **Meta description:** "production AI in weeks, not quarters. From tribal knowledge to intelligent systems — principal-led, outcome-driven."
- **About H1:** "Clarity through partnership"
- **Capabilities H1:** "Where is your organization on the AI journey?"

These are **not wrong individually** — they serve different contexts — but there is no single "north-star" sentence. Recommend picking one and having every other moment reinforce it. The strongest candidate is the meta-description cluster: **"From tribal knowledge to production AI — in weeks, not quarters."** It bundles the problem (tribal), the product (production AI), the differentiator (speed), and the framework arc all at once.

The footer strapline "Distill The Signal From The Noise" is beautiful but **disconnected from the current story** (it maps to the Distill product, not the consulting arc). Consider moving it next to the Distill link in the Products list, or retiring it from the footer.

### 2.3 Headline case

- **Consulting site default:** sentence case — "Where is your organization on the AI journey?", "The question nobody asks first", "From tribal to coherent", "Clarity through partnership", "Real problems. Measurable results.", "How we deliver".
- **Offering pages:** Title Case — "Your Monthly Close Shouldn't Take 10 Days", "Stop Losing Candidates to Your Own Process", "New Client Setup Shouldn't Depend on Who Remembers What", "Your Executives Shouldn't Wait for Slides", "Every Invoice Is Different. Your System Should Handle That."
- **Vibe Check:** sentence case — "You built it with vibes. Now make it real."

This is a real inconsistency. Sentence case is the brand default. Recommend **converting all five offering H1s to sentence case** for consistency — fixed in this pass.

### 2.4 Terminology: the story keywords

Key terms appear in these counts (rough counts across `src/pages/*.astro`, `src/pages/offerings/*.astro`):

| Term | Uses | Notes |
|---|---|---|
| `tribal` / `tribal knowledge` | 19+ | Core concept, well-reinforced |
| `Habitat` | 3 (home, offerings/monthly-close) | **Underutilized.** Home introduces it as a product name; capabilities page never uses it; only one offering page references it. Either commit to the "Habitat" product language throughout `/capabilities` and `/offerings`, or retire it to the home page only. |
| `Vibe Check` | Strong — dedicated page, home CTA, footer link | ✅ |
| `Distill` | Appears on home, about, footer | Referenced as product but never fully sold. |
| `legible` / `legibility` | 7 | Part of the maturity language |
| `production AI in weeks, not quarters` | 8 | Strong tagline reinforcement |
| `principal-led` / `no junior analysts` | 4 | Key differentiator, consistently used |

**Term clash**: The home page says **"Habitat Build"** is the middle engagement; the capabilities page calls the same tier **"Build & Ship."** Pick one. See Section 3.

### 2.5 Punctuation / typography

- Em-dashes used consistently across consulting pages (good).
- Smart quotes inconsistent: mostly straight `"` in HTML copy (`"It works on my laptop"`). Fine.
- Arrow glyphs: a mix of `→`, `&rarr;`, and `&rArr;`. Mostly `&rarr;`. Low priority.

---

## 3. The Story — Where It Breaks

### 3.1 Taxonomy mismatch: home vs. capabilities

This is the **most important** finding.

**On `/` (home), the "Engagement Models" section sells:**

1. **Vibe Check** — "Built something with AI tools? We assess your codebase…" (1-3 weeks, `bg-vermilion`)
2. **Habitat Build** — "A Habitat is a production AI system…" (points to `/capabilities`)
3. **Embedded Partnership** — "For organizations scaling AI across multiple departments…"

**On `/capabilities`, the "Find your starting point" section sells:**

1. **Assessment & Roadmap** (L0→L1, 1-2 weeks)
2. **Build & Ship** (L2→L3, 2-6 weeks)
3. **Ongoing Partnership** (L4→L5, monthly retainer)

These are **the same three engagement shapes** rebranded. "Habitat Build" = "Build & Ship." "Embedded Partnership" = "Ongoing Partnership." "Assessment & Roadmap" is **missing from the home page.**

A prospect visiting home → capabilities sees two different frameworks and will assume either (a) the company is disorganized or (b) these are different products and they need to ask a salesperson.

**Recommendation.** Pick one taxonomy. The `/capabilities` version (`Assessment & Roadmap` / `Build & Ship` / `Ongoing Partnership`) is clearer because:

- It maps 1:1 to maturity-level transitions (a story we already tell elsewhere).
- "Build & Ship" is plain-language; "Habitat Build" requires explaining what a Habitat is.
- "Ongoing Partnership" is what a buyer searches for; "Embedded Partnership" is internal language.

Then on the home page, either (a) add the missing Assessment & Roadmap tier (it covers the "just starting" case the home page otherwise leaves out), or (b) drop the three-engagement grid entirely and let the one-line "For founders, CEOs, and product leaders" CTA lead to `/capabilities` for the selection.

**Habitat** as a concept is powerful but should be the _payload_ (what we build during Build & Ship), not the _product tier name_. That way the page can say "During Build & Ship, we build a Habitat — an AI system that carries your team's rules and runs autonomously." Concept kept, taxonomy clean.

### 3.2 Vibe Check is a 4th product, positioned as a 1st

On home the three engagement cards are: Vibe Check, Habitat Build, Embedded Partnership. On capabilities the three are: Assessment & Roadmap, Build & Ship, Ongoing Partnership — **Vibe Check is not on that page at all** (except as a proof point under L1).

Vibe Check **is** a distinct product with a distinct brand (vermilion instead of petrol, different audience: solo founders who used AI coding tools). It should be one of two tracks, not squeezed into the three-engagement consulting grid:

> **Track 1 — Consulting (petrol):** Assessment & Roadmap → Build & Ship → Ongoing Partnership
> **Track 2 — Audit (vermilion):** Vibe Check (for AI-coded apps)

Surfacing this explicitly on both pages reduces confusion and makes the two audiences (consulting clients vs. solo AI-coding founders) easier to route. The capabilities page already has the color discipline (petrol for consulting); just acknowledge Vibe Check there as a parallel path.

### 3.3 Labs is unintegrated

`/insights`, `/tools`, `/reports`, `/recipes` are styled as **Labs** (Bell Labs retro, rand-blue, mono, sharp corners) — a deliberate visual break from consulting. Good.

But Labs pages:

- Never link to `/capabilities` or `/case-studies`.
- Don't say "This research is by the team that consults with Samsung, Tesla, Rivian" anywhere prominent.
- Don't explain when/why a reader would cross over.

The two sub-brands are treated like separate companies. They _should_ be — Labs is credibility and content marketing, consulting is sales — but a soft bridge (one line + one link) at the bottom of each Labs page would connect the funnel. Example:

> "Labs is where we share what we learn. When you're ready to build for production, our consulting team is here. → Start a Conversation"

### 3.4 `/reports` page breaks _both_ aesthetics

`src/pages/reports.astro` uses Bootstrap-ish styling (`bg-blue-600`, `rounded` not `rounded-full`, non-uppercase "Read the Report" buttons). It uses neither the consulting style nor the Bell Labs Labs style. It also uses lowercase "Focus.ai" in its meta description. **[fixed]** in this pass by converting to the Labs rand-blue button style and correcting the brand name.

### 3.5 Navigation incoherence

The top nav advertises: Capabilities · Case Studies · About · Contact / Studio (Insights, Tools, Reports, Products).

But:

- **Vibe Check** is a first-class product with its own page — not in nav (only in footer and home hero).
- **Jobs** is in the global banner / footer / about but not in top nav.
- **Use Cases** exists at `/use-cases` but isn't in the Studio dropdown (yet it belongs there per content — research). It's only in the _footer_.
- **Capabilities** label vs. the page H1 "Where is your organization on the AI journey?" — reasonable, but the page title + nav label could reinforce the same promise. Consider renaming nav label to "Framework" or "Approach" to match the page's own "See the Framework" CTA.

---

## 4. Prioritized Fixes

### P0 — Applied in this pass

1. **[fixed]** `/reports` — buttons now use the Labs `bg-rand-blue` uppercase mono style to match `/insights` and `/tools`. Description corrected from "Focus.ai" to "TheFocus.AI Labs."
2. **[fixed]** All five offering H1s converted to sentence case to match the rest of the consulting site.
3. **[fixed]** `/use-cases/index.astro` passes `pageTitle` (was `title`). Page title now renders correctly.
4. **[fixed]** Case studies page final CTA copy unified on `Start a Conversation` / `See the Framework` and restyled (petrol pill + outlined pill to match home/capabilities).
5. **[fixed]** About page final CTA copy unified on `Start a Conversation` / `See the Framework`.
6. **[fixed]** Case-study detail template CTAs converted to the standard pill style (was square-corner on `bg-ink`).
7. **[fixed]** Home-page final `BaseLayout` CTA gains a subtitle that matches the meta-description positioning, so every page ends with the same promise.
8. **[fixed]** Labs pages (`/insights`, `/tools`) get a bottom-of-page soft-bridge back to consulting.

### P1 — Recommended (not applied — requires product decisions)

9. **Unify engagement taxonomy across `/` and `/capabilities`.** Rename home "Habitat Build" → "Build & Ship" (keep Habitat as the thing you build inside it) and "Embedded Partnership" → "Ongoing Partnership." Add "Assessment & Roadmap" as a fourth card, or refactor the home "Engagement Models" section into the two-track structure: Consulting (3 tiers) + Audit (Vibe Check).
10. **Pick one tagline.** Proposed: **"From tribal knowledge to production AI — in weeks, not quarters."** Use in: meta description, home hero subhead, global footer strapline, social image OG fallback.
11. **Retire or re-home "Distill The Signal From The Noise"** from the global footer. It belongs with the Distill product listing, not as the company strapline.
12. **Restore Labs → Consulting bridges** on every Labs page, not just the two patched in P0.
13. **Add Vibe Check to the nav** or collapse it into Capabilities as a parallel track.

### P2 — Nice-to-have

14. Standardize arrow glyph on `→` (Unicode) throughout; retire `&rarr;`.
15. Expand global `EmailSignup` to accept contextual copy on every page where it renders (prompts already supported — just unused on most pages).
16. Decide fate of `/coding-agents` (orphan page) — merge into `/reports` or retire.
17. Fix the two broken report links (`/reports/coding-agent/`, `/reports/aiecode-2025-11/`) by either ensuring submodules build in CI, or conditionally hiding the cards when the built directories don't exist.
18. Add `description` override to `reports.astro` and per-Labs page to strengthen SEO and stop Labs pages inheriting the consulting meta description.
19. Consider renaming nav "Capabilities" → "Framework" or "Approach."

---

## 5. What _is_ working

Worth calling out so these don't regress:

- **Maturity framework on `/capabilities`.** L0–L5 structure, the "common mistake / reality" pairs, and the cluster mapping (L0–L1, L2–L3, L4–L5 → engagement type) is a genuinely differentiated piece of IP. Leave it alone.
- **Pain-point → Approach → Proof → CTA structure on all five offerings.** Consistent, persuasive, and the cross-linking between offerings is good.
- **Vibe Check page.** Best-executed single page on the site. Clear audience, clear pain, clear two-step product (The Vibe Check + The Cleanup), strong proof ("We use AI coding tools ourselves"), good FAQ.
- **Case studies categorization.** Conversational AI / Data Intelligence / Platform & Tooling is a useful taxonomy that mirrors how prospects search for help.
- **Principal-led / 40+ years / no junior analysts** — repeated everywhere it should be, never overdone.
- **Visual rhythm** (petrol/vermilion/ink/paper + alternating light/dark sections) reads as intentional and editorial rather than templated.

---

_End of audit._
