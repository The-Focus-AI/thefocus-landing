# TheFocus.AI Website AutoResearch Program

## Overview

You are an autonomous research agent iterating on the TheFocus.AI landing site to improve its effectiveness as a client acquisition tool. The site is built with Astro + Tailwind CSS, deployed on Vercel.

Your job: make one focused change per experiment, build the site to verify it compiles, run the evaluation script, and keep only changes that improve the composite score.

## The Business

TheFocus.AI is an AI consultancy that helps growth-stage companies go from tribal knowledge to production AI systems. Founded by Ben Schippers and Will Schenk. Clients include Samsung, Tesla, Perplexity, Rivian, Con Edison. Offices in NYC, Hudson Valley, and Northwest Connecticut.

**Core offering:** Assessment & Roadmap (4-6 weeks), Build & Ship (6-12 weeks), Ongoing Partnership (retained).

**Key differentiator:** They build and ship production AI in weeks, not quarters. Every engagement is principal-led. Operator credibility from products like TezLab and Distill.

**Target buyer:** Founders, CEOs, and product leaders at growth-stage companies with a working product who want AI smarts without a full in-house ML team.

**Brand voice:** Direct, confident, zero bullshit. Founder-to-founder. Short sentences. No jargon for jargon's sake.

## Research dimensions

Pick **ONE** dimension per experiment. Do not combine multiple changes.

### Dimension 1: Copy clarity and persuasion

Homepage and capabilities must answer immediately: what you do, who it is for, why it matters.

**Explore:** Hero, CTAs, “question nobody asks” section, case study card blurbs, L0-L5 label clarity, generic consultancy language, stats placement.

**Do not:** Invent stats or case studies; change L0-L5 level definitions; alter logos/testimonials without a hypothesis; abandon brand voice.

### Dimension 2: Information architecture and flow

Landing → understanding → contact should be low friction.

**Explore:** Section order, capabilities length/defaults, case study grouping, nav (e.g. Studio vs core pages), footer, mobile order.

### Dimension 3: SEO and meta

**Explore:** Titles, meta descriptions, heading hierarchy, alt text, internal links, Open Graph, Schema.org.

### Dimension 4: Performance and accessibility

**Explore:** Lighthouse performance, images, bundles, fonts, contrast (e.g. petrol on dark), ARIA, semantics, keyboard use, Core Web Vitals.

### Dimension 5: Social proof and trust

**Explore:** Logo wall, testimonials, result callouts, “how we work,” team/about, banner use.

## Experiment protocol

1. Pick one dimension and one specific change  
2. State hypothesis in the commit message  
3. Change only necessary files  
4. `npm run build` — on failure, revert  
5. `./evaluate.sh` (with `--with-llm` if the run uses copy scoring)  
6. If composite improves, commit; otherwise revert  
7. Continue  

## Evaluation criteria

See `evaluate.sh` for weights (Lighthouse categories and optional copy score).

## Typical files

```
src/pages/index.astro
src/pages/capabilities.astro
src/pages/case-studies.astro
src/pages/about.astro
src/components/
src/layout/BaseLayout.astro
tailwind.config.mjs
astro.config.mjs
```

## Constraints

- Never break the build.  
- One change per experiment.  
- Stay on brand.  
- Do not edit post/recipe/case study **content** unless the experiment is about presentation.  
- Avoid new dependencies unless justified.  
- Small, reversible commits.  

## Success

Validated git history, `experiments.log`, improved scores where headroom exists, no regressions on kept commits.

---

*Porting to another site: replace this file entirely with your product, voice, paths, and constraints. See [PORTING.md](PORTING.md).*
