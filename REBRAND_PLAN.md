# Focus.AI Landing Site Rebrand - Implementation Plan

**Date Started:** 2025-11-08
**Approach:** Incremental implementation with review checkpoints

---

## Core Vision

**Brand Message:** "Distill the signal from the noise"

**Three Pillars:**
1. **Connecting siloed data** → enable prompt UIs to be in play
2. **Highly curated UIs** → task-specific, context-aware interfaces
3. **Distill noise from systems** → more focused, productive time, fewer distractions

**Marketing Strategy:**
- Heavy focus on testimonials (real stories, real people)
- Testimonials link directly to case studies
- Services demonstrated through case studies
- Real storytelling over feature lists

---

## Key Decisions Made

### 1. Navigation Structure

**Old:**
```
Home → Learnings → Case Studies → Contact → About Us
```

**New:**
```
[Studio Section]
Case Studies → Capabilities → About → Contact

[Content Section]
Insights → Tools
```

### 2. URL Changes (with redirects)

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/learnings` | Redirect | Split to /insights and /tools |
| `/blog` | `/insights` | Posts collection |
| `/recipes` | `/tools` | Recipes collection |
| N/A | `/capabilities` | New page |

### 3. Typography

- **Replace:** DM Sans → CinaGEO (globally)
- **Keep:** Noto Serif, Iosevka Etoile, Fraunces (for specialized content)
- **Marketing pages:** Full Focus.AI brand treatment (asymmetric layouts)
- **Content pages:** CinaGEO primary, can mix other fonts for readability

**CinaGEO Usage:**
- Medium (500) for body text
- Bold (700) for headings

### 4. Color Palette (Global Rebrand)

**Old:**
- Gray scale + Orange accent

**New (Focus.AI Brand):**
- **Paper** (#faf9f6) - primary background
- **Ink** (#161616) - primary text
- **Graphite** (#4a4a4a) - secondary text
- **Petrol** (#0e3b46) - primary brand color, CTAs, links
- **Vermilion** (#c3471d) - secondary accent (use sparingly)

**Tinted Backgrounds:**
- Cool (#edf6f8) - Work pages
- Sage (#eef6ee) - Capabilities pages
- Warm (#f7f0e6) - About pages
- Lavender (#f2eef6) - Insights/Tools
- Aqua (#edf6f6) - Contact pages

**Implementation:** Tailwind custom colors (simplest approach)

### 5. Case Study Structure

**Old:** Complex frontmatter (challenge, solution, results, testimonial fields)
**New:** Simplified frontmatter + markdown body

**Minimal Frontmatter:**
```yaml
---
title: Case Study Title
date: 2025-01-01
published: true
image: imagename.png
client: Client Name (optional)
industry: Industry (optional)
---
```

**Everything else in markdown:**
- Challenge/problem statement
- Solution narrative
- Results/metrics
- Testimonials (inline, multiple allowed)
- Natural storytelling flow

### 6. HTML Case Study Integration

**Workflow:**
1. Agent generates branded HTML case study
2. Claude migrates content + styles to Astro page
3. Wrap with BaseLayout (nav/footer)
4. Save to `/src/pages/case-study/[name].astro`
5. Keeps full flexibility (inline styles, custom layouts)

**Example:** image-browser case study will be migrated as proof of concept

---

## Homepage Structure

Following `webtext/Head Copy.md`:

1. **Hero Section**
   - "What is TheFocus.AI" statement
   - Core value prop: "Distill the signal from the noise"

2. **Case Study Highlights**
   - 2-3 featured case studies with testimonials
   - Real stories, real results

3. **Services Offered**
   - Preview of capabilities (link to /capabilities)
   - Connected to case study examples

4. **How We Do It**
   - Strategy phase description
   - Testimonial placement
   - What to expect

5. **Footer Products**
   - TheFocus.AI products (Distill for X, etc.)

---

## Five Core Capabilities

Currently in footer, will become `/capabilities` page content:

1. **AGENTIC TOOLING**
2. **(JIT) JUST IN TIME SOFTWARE**
3. **CONVERTING LEGACY SOFTWARE TO MCP / AGENTIC**
4. **UNDERSTANDING UI DESIGN AND PRODUCT IN THE AI WORLD**
5. **MODIFY LEGACY WORKFLOW AND UI**

**Presentation:**
- Each capability gets expanded description
- Linked to relevant case studies
- Examples: TezLab AI (MCP services), Image Browser (agentic data distillation)

---

## Design System Implementation

### Layout System (Marketing Pages)

**Asymmetric Three-Column Grid:**
```
[Label Gutter: 140px] [Content: max 740px] [Marginalia: 200px]
Gap: 3rem (48px)
Max-width: 1400px
```

**Mobile (≤1024px):** Single column, 1.5rem gap

### Typography Scale

| Element | Desktop | Weight | Line Height | Letter Spacing |
|---------|---------|--------|-------------|----------------|
| H1 | 88px (5.5rem) | 700 | 0.95 | -0.045em |
| H2 | 48px (3rem) | 700 | 1.0 | -0.03em |
| H3 | 30px (1.875rem) | 700 | 1.2 | -0.02em |
| H4 | 24px (1.5rem) | 700 | 1.3 | -0.01em |
| Body | 17px | 500 | 1.6 | 0 |
| Large Body | 20px | 500 | 1.5 | 0 |
| Label | 12px | 500 | 1.2 | 0.12em (uppercase) |

### Spacing

- **Section padding:** 7rem desktop, 3rem mobile
- **Container padding:** 2rem desktop, 1.25rem mobile
- **Border radius:** 8px default for cards/containers
- **Base unit:** 8px

---

## Technical Stack (Current)

- **Framework:** Astro 5.8.0
- **Styling:** Tailwind CSS 3.4.17
- **Content:** Astro Content Collections (markdown)
- **Hosting:** (TBD)
- **Analytics:** Plausible

---

## Implementation Phases

### Phase 1: Foundation (Typography & Colors)
- [ ] Add CinaGEO fonts to project
- [ ] Update Tailwind config with Focus.AI colors
- [ ] Remove DM Sans, configure CinaGEO as primary
- [ ] Test on existing pages

### Phase 2: Navigation & Routing
- [ ] Update navigation component
- [ ] Create `/insights` route (points to posts)
- [ ] Create `/tools` route (points to recipes)
- [ ] Create `/capabilities` page structure
- [ ] Set up redirects from old URLs

### Phase 3: Homepage Rebuild
- [ ] Create new homepage structure following Head Copy.md
- [ ] Implement asymmetric layout system
- [ ] Add hero section with value prop
- [ ] Add case study highlights with testimonials
- [ ] Add capabilities preview
- [ ] Add "How we do it" section

### Phase 4: Case Studies
- [ ] Simplify case study schema
- [ ] Create example case study template (with placeholders)
- [ ] Migrate image-browser HTML case study to Astro
- [ ] Update case study listing page
- [ ] Update individual case study template

### Phase 5: Capabilities Page
- [ ] Design capabilities page layout
- [ ] Add 5 core capabilities with descriptions
- [ ] Link to relevant case studies
- [ ] Apply asymmetric layout

### Phase 6: Marketing Pages (About, Contact)
- [ ] Rebuild About page with Focus.AI brand
- [ ] Update Contact page
- [ ] Apply tinted backgrounds
- [ ] Ensure responsive behavior

### Phase 7: Content Pages (Insights/Tools)
- [ ] Update Insights (posts) listing page
- [ ] Update Tools (recipes) listing page
- [ ] Apply CinaGEO typography
- [ ] Keep content-friendly layouts

### Phase 8: Components & Polish
- [ ] Update footer (remove old capabilities section)
- [ ] Create reusable brand components (CTAs, cards, dividers)
- [ ] Add focus states and accessibility
- [ ] Test responsive breakpoints
- [ ] Performance optimization

---

## Example Projects Referenced

**Distill Series:**
- distill-x (X/Twitter cleanup)
- distill-youtube (YouTube data cleanup)

**Case Studies:**
- TezLab AI (MCP services, vehicle data)
- Image Browser (semantic search, 92K+ images, CLIP embeddings)
- Golf V2 (from Head Copy.md)
- AMC (from Head Copy.md)

---

## Assets & Resources

**Fonts:** CinaGEO (Light, Regular, Medium, Bold) from Focus.AI brand skill
**Brand Guide:** Available via `focus-ai-brand` skill
**Examples:**
- `webtext/image-browser-case-study.html` - Complete branded case study
- `webtext/Head Copy.md` - Homepage content structure
- `webtext/About Us.md` - About page content
- `webtext/header.png` - Navigation reference

---

## Success Criteria

- [ ] Homepage clearly communicates "distill signal from noise" value prop
- [ ] Testimonials are prominent and link to case studies
- [ ] Navigation clearly separates studio work from content
- [ ] Case studies are easy to write (simple markdown)
- [ ] Full Focus.AI brand compliance (colors, typography, layouts)
- [ ] Responsive design works on mobile
- [ ] Old URLs redirect properly (SEO preserved)
- [ ] Marketing pages feel cohesive and premium
- [ ] Content pages remain readable and functional

---

## Notes

- Use placeholders for testimonials/content during build
- Marketing = storytelling with real people, not feature lists
- Keep case study authoring simple (complex frontmatter was painful)
- HTML case studies should integrate smoothly (repeatable workflow)
- This is a complete visual and structural rebrand

---

## Progress Update (2025-11-08)

### Completed:
- ✅ **Phase 1: Foundation** - CinaGEO fonts, Focus.AI color palette
- ✅ **Phase 2: Navigation & Routing** - New nav structure, /insights, /tools, /capabilities, redirects
- ✅ **Phase 3: Homepage Rebuild** - Complete homepage with Focus.AI branding
- ✅ **Header Redesign** - Clean minimal header with bracket hover interactions
- ✅ **Footer Redesign** - 4-column footer with Products, Company, Resources, Connect
- ✅ **About Page** - Standalone page with proper branding

### In Progress:
- Simplifying case study schema
- Migrating image-browser HTML case study

### Next Steps:
- Phase 4: Simplify case study schema and templates
- Phase 5-8: Polish remaining pages and components
