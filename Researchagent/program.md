# TheFocus.AI Website AutoResearch Program

## Overview

You are an autonomous research agent iterating on the TheFocus.AI landing site to improve its effectiveness as a client acquisition tool. The site is built with Astro 5.8 + Tailwind CSS 3.4, deployed on Vercel.

Your job: make one focused change per experiment, build the site to verify it compiles, run the evaluation script, and keep only changes that improve the composite score.

## The Business

TheFocus.AI is an AI consultancy that helps growth-stage companies go from tribal knowledge to production AI systems. Founded by Ben Schippers and Will Schenk. Clients include Samsung, Tesla, Perplexity, Rivian, Con Edison. The company has offices in NYC, Hudson Valley, and Northwest Connecticut.

**Core offering:** Assessment & Roadmap (4-6 weeks), Build & Ship (6-12 weeks), Ongoing Partnership (retained).

**Key differentiator:** They don't just advise — they build and ship production AI in weeks, not quarters. Every engagement is principal-led. They also run their own AI products (TezLab, Distill) which gives them operator credibility most consultancies lack.

**Target buyer:** Founders, CEOs, and product leaders at growth-stage companies who have a working product and want to make it smarter with AI, but don't have an internal AI/ML team.

**Brand voice:** Direct, confident, zero bullshit. Think founder-to-founder, not agency-to-prospect. Short sentences. No jargon for jargon's sake. "Let's turn and burn" energy.

## Research Dimensions

Pick ONE dimension per experiment. Do not combine multiple changes.

### Dimension 1: Copy Clarity & Persuasion

The homepage and capabilities page need to immediately answer: "What do you do, who is it for, and why should I care?"

**Areas to explore:**
- Hero headline and subhead — is "Building an Intelligent Organization" specific enough? Does it communicate urgency?
- The "question nobody asks first" section — could be tighter, punchier
- CTA copy — "See the Framework" and "View Case Studies" are passive. Test more action-oriented language
- Case study cards — the descriptions are long. Test shorter, punchier summaries that lead with the result
- The maturity framework labels (L0-L5) — are these clear to someone seeing them for the first time?
- Remove or tighten any copy that reads like generic AI consultancy language
- The "Results" stats section (27% higher conversion, 78% faster decisions, etc.) — are these positioned for maximum impact?

**What NOT to change:**
- Don't invent fake stats or case studies
- Don't change the maturity framework levels themselves (L0-L5 structure)
- Don't alter client logos or testimonials
- Keep the brand voice: direct, founder-to-founder, no fluff

### Dimension 2: Information Architecture & Flow

The user journey from landing → understanding the offering → reaching out should be frictionless.

**Areas to explore:**
- Is the homepage section order optimal? (Hero → Results → Clients → Insight → Journey → Approach → Engagement → CTA)
- The capabilities page is long — does the framework section need all six levels expanded by default?
- Case studies page — is the categorization (Conversational AI, Data Intelligence, Platform & Tooling) the best grouping for prospects?
- Navigation structure — "Studio" dropdown with Insights/Tools/Products may confuse prospects vs. the main client pages
- Footer links — are the right things prominent?
- Mobile experience — section ordering and readability on small screens

### Dimension 3: SEO & Meta

Every page should have strong meta titles, descriptions, and structured data.

**Areas to explore:**
- Page titles — are they keyword-rich and compelling in search results?
- Meta descriptions — do they include a clear value prop and CTA?
- Heading hierarchy (H1 → H2 → H3) — is it semantically correct?
- Image alt text — descriptive and keyword-relevant
- Internal linking between pages — case studies should link to relevant capabilities, etc.
- Open Graph tags for social sharing
- Schema.org structured data (Organization, Service, etc.)

### Dimension 4: Performance & Accessibility

Fast load times and accessibility directly impact conversion and SEO.

**Areas to explore:**
- Lighthouse performance score improvements
- Image optimization (format, sizing, lazy loading)
- CSS/JS bundle size reduction
- Font loading strategy (CinaGEO, Noto Serif, Iosevka Etoile, Fraunces — that's four font families)
- Color contrast ratios (especially the Petrol #0e3b46 on various backgrounds)
- ARIA labels and semantic HTML
- Keyboard navigation
- Core Web Vitals (LCP, CLS, INP)

### Dimension 5: Social Proof & Trust

Prospects need to trust that TheFocus.AI can deliver before they reach out.

**Areas to explore:**
- Client logo section — placement, size, visual weight
- Testimonial placement and formatting
- Case study result numbers — are they prominent enough?
- "How we work with you" section — does it reduce anxiety about the engagement process?
- Team/about information — is there enough to build personal trust?
- The banner announcement — currently links to Model Showdown report. Is this the best use of that prime real estate?

## Experiment Protocol

1. **Pick one dimension** and one specific change within it
2. **State your hypothesis** in the commit message: "Hypothesis: [change] will improve [metric] because [reasoning]"
3. **Make the change** — modify only the files necessary
4. **Build the site**: `npm run build` — if build fails, revert immediately
5. **Run evaluation**: `./evaluate.sh` — this produces a composite score
6. **Compare to baseline**: if score improved, commit with results. If not, `git revert HEAD`
7. **Log the result** in `experiments.log` with: dimension, hypothesis, score delta, keep/revert
8. **Move to next experiment**

## Evaluation Criteria

The evaluation script scores on these axes (see evaluate.sh for weights):

- **Lighthouse Performance** (0-100): page speed, Core Web Vitals
- **Lighthouse Accessibility** (0-100): a11y compliance
- **Lighthouse SEO** (0-100): meta tags, structured data, crawlability
- **Lighthouse Best Practices** (0-100): security, modern web standards
- **Build Success** (binary): site compiles without errors
- **Copy Quality Score** (0-100): LLM-judged clarity, persuasion, brand voice (optional, requires API key)

## File Structure

Key files you'll be modifying:

```
src/pages/index.astro              — Homepage
src/pages/capabilities.astro       — Services/framework page
src/pages/case-studies.astro       — Case studies listing
src/pages/about.astro              — About page
src/components/                    — Reusable components
src/layout/BaseLayout.astro        — Main layout (meta tags, fonts, etc.)
src/layout/LandingLayout.astro     — Landing page layout
tailwind.config.mjs                — Design tokens
astro.config.mjs                   — Site configuration
```

## Constraints

- **Never break the build.** Always run `npm run build` before committing.
- **One change at a time.** If you change copy AND layout in the same experiment, you won't know which one helped.
- **Stay on brand.** Review the design system in README.md before making visual changes.
- **Don't touch content files** (posts, recipes, case studies content) unless the experiment is specifically about how they're displayed.
- **Don't add new dependencies** without strong justification.
- **Keep changes small and reversible.** Each experiment should be a single commit that can be cleanly reverted.

## What Success Looks Like

After a night of running, you should have:
- A git history of validated improvements with clear commit messages
- An `experiments.log` showing what was tried, what worked, what didn't
- Measurable improvement in Lighthouse scores
- Tighter, more persuasive copy
- Better information architecture
- Zero regressions — every kept change improved the score
