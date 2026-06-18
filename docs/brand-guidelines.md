# TheFocus.AI Brand Guidelines

**Status:** Living document, v0.1 — derived from the site as it stands today.
**Owner:** Founders. Any change to voice, palette, or type requires founder sign-off.
**North star for look and feel:** [anthropic.com](https://anthropic.com) — warm, editorial, serif-forward, confident without shouting. We are closer to a literary magazine than a SaaS product site.

This document describes the **Client brand** (thefocus.ai — the public site) and the **Labs brand** (research & experimentation surface). When in doubt, Client brand is the default.

---

## 1. What the brand stands for

TheFocus.AI helps mid-market and enterprise organizations go from **tribal knowledge to production AI — in weeks, not quarters**. Every piece of the brand should reinforce three promises:

1. **Principal-led accountability.** Named people build it and run it. No rotating analysts, no offshore handoffs.
2. **Craft over tooling.** The work is formalizing how a team actually operates, not bolting on a chatbot.
3. **Restraint.** We write plainly, design quietly, and let the work speak. Nothing on the site should feel like it's shouting.

### What we are not
- Not a framework vendor. Not a chatbot builder.
- Not hype-forward. Never use "revolutionary," "game-changing," "supercharge," "unleash," or "unlock."
- Not corporate-sterile. No stock photography of diverse teams at laptops.

---

## 2. Voice and tone

Founder-to-founder. Direct. Concrete nouns over abstractions. Sentences carry weight; paragraphs are short.

### The rules
- **Write like you're explaining to a peer who respects your time.** Assume intelligence. Don't over-explain.
- **Use concrete nouns.** "Your monthly close Habitat" beats "our AI-powered solution."
- **Numbers, names, and specifics.** "Samsung · Tesla · Perplexity · Rivian" beats "Fortune 500 clients."
- **Short sentences for emphasis.** "Your CISO gets a direct line." Sentence-long paragraphs are allowed when the point deserves the weight.
- **No consultant-speak.** No "leverage," "synergize," "unlock value," "best-in-class," "cutting-edge," "world-class."
- **Be honest about what's incomplete.** The Trust section on `/habitat-os` explicitly says "SOC 2 Type I audit is underway for 2026. In the meantime..." — that kind of honesty is on-brand.

### Signature phrases (use naturally, don't over-index)
- *Principal-led* / *named principals* / *a named principal*
- *Tribal knowledge to production AI — in weeks, not quarters*
- *Talk to a principal* (primary CTA language)
- *Your cloud, your keys, your rules*
- *The people who built it run it*
- *Auditable engine, accountable distribution*

### Voice examples from the live site

**Good** (from `src/pages/habitat-os.astro`):
> "Every engagement is led by a named principal. No rotating analysts, no offshore handoffs, no layers between the people who understand your Habitat and the people fixing it when something breaks. Your CISO gets a direct line."

**Good** (from `src/pages/index.astro`):
> "AI capabilities are arriving faster than organizations can absorb them. The bottleneck isn't the technology — it's whether your company can describe its own work in a form machines can act on."

**Bad** (would never ship):
> "Our cutting-edge, AI-powered platform leverages enterprise-grade capabilities to unlock unprecedented value across your organization."

### Punctuation
- Em dashes for emphasis — like this. No hair spaces around them.
- Oxford comma, always.
- Single sentence per bullet where possible.
- Use `·` (middle dot) to separate inline meta (e.g. "Monthly Close · 12 runs today").

---

## 3. Typography

### Font families (declared in `tailwind.config.mjs`)
| Role | Family | Tailwind token | Usage |
|------|--------|----------------|-------|
| Sans / UI primary | **CinaGEO** | `font-sans` | Body copy, nav, buttons, most headings |
| Serif | **Noto Serif** | `font-serif` | Reserved / specific editorial moments |
| Serif display | **Fraunces** | `font-fraunces` | Used sparingly for hero or editorial emphasis |
| Mono | **Iosevka Etoile** | `font-mono` | Eyebrows, meta, filenames, numbers-in-context |

**Anthropic parallel:** they pair a serif display (Copernicus Serif) with a grotesque sans (Styrene B). Our pairing is different but plays the same role — a distinctive sans for UI, a warmer serif for anywhere we want the page to breathe.

### Type scale (from live pages)
| Role | Classes | Notes |
|------|---------|-------|
| Hero H1 | `text-4xl sm:text-5xl md:text-7xl font-bold leading-tight` | `text-ink` on light, `text-paper` on dark |
| Section H2 | `text-3xl md:text-5xl font-bold text-ink` | Always bold, always leading into a single-sentence H2 |
| Card H3 | `text-xl md:text-2xl font-bold text-ink leading-tight` | Used in pillar / offering cards |
| Body lead | `text-lg md:text-xl text-graphite leading-relaxed` | Directly under an H2 |
| Body | `text-base text-graphite leading-relaxed` | Default prose |
| Eyebrow | `text-xs uppercase tracking-[0.2em] text-petrol font-medium` | Pre-H2 label |
| Meta / micro | `text-[10px] md:text-xs font-mono uppercase tracking-wider` | Filenames, counts, badges |

### Rules
- **Max one display H1 per page.** Everything else is H2 or smaller.
- **Always pair an eyebrow with an H2** on top-level sections. Eyebrows are `text-petrol`, uppercase, wide-tracked.
- **Never mix more than 2 families in a single component.** Sans + mono is common; sans + serif is reserved.
- **Leading:** Hero `leading-tight` (1.1). Body `leading-relaxed` (1.625). Never set tighter than 1.0 or looser than 1.7.

---

## 4. Color system

We run two parallel palettes: **Client brand** (public site, warm, founder-grade) and **Labs brand** (research pages, cooler, technical). All tokens live in `tailwind.config.mjs`.

### 4.1 Client brand (primary — use for thefocus.ai)

| Token | Hex | Role |
|-------|-----|------|
| `paper` | `#faf9f6` | Default page background. Cool off-white — the "canvas." |
| `ink` | `#161616` | Primary text and dark-section background. Never pure black. |
| `graphite` | `#4a4a4a` | Secondary text, body prose on light backgrounds. |
| `petrol` | `#0e3b46` | Primary accent. Buttons, links, eyebrows, emphasis. |
| `petrol-light` | `#4aa8b8` | Accessible petrol for use on dark (`ink`) backgrounds. 6.9:1 contrast on `ink`. |
| `vermilion` | `#c3471d` | Warm secondary accent. Used sparingly for ambient background dots and editorial warmth. |

### 4.2 Tinted backgrounds (section differentiation)

Used as full-bleed section backgrounds to create rhythm as the reader scrolls. Apply at 20-40% opacity (`bg-tint-cool/30`).

| Token | Hex | Feel |
|-------|-----|------|
| `tint-cool` | `#edf6f8` | Cool, calm — defaults for platform/technical sections |
| `tint-sage` | `#eef6ee` | Natural, human — good for about/people |
| `tint-warm` | `#f7f0e6` | Warm, welcoming — good for product/offering sections |
| `tint-lavender` | `#f2eef6` | Editorial, considered |
| `tint-aqua` | `#edf6f6` | Between cool and sage |

### 4.3 Labs brand (research / experimentation surface only)

| Token | Hex | Role |
|-------|-----|------|
| `void` | `#1a1a1a` | Labs primary text |
| `rand-blue` | `#0055aa` | Labs primary accent |
| `alert-red` | `#d93025` | Labs decorative emphasis |
| `surface` | `#e6e4dc` | Labs secondary background |
| `labs-paper` | `#f3f2ea` | Labs warmer paper background |

### 4.4 Color rules
- **Client pages never use Labs tokens,** and vice versa. The one exception is the `rand-blue` announcement banner at the top of `BaseLayout.astro` — that's legacy and will migrate to `petrol`.
- **Backgrounds alternate** between `paper` (default), a tint, and full-bleed `bg-ink` (rare, reserved for gravity moments like the "How it works" section).
- **Borders on light:** always `border-ink/10`. Never a hard black border.
- **Borders on dark:** always `border-paper/10` or `border-paper/20`.
- **Text opacity on dark:** body `text-paper/70`, secondary `text-paper/60`. Never drop below `/50` on dark for body text.
- **Saturated accents are rare.** `petrol` is the only color that appears with any frequency. Hold `vermilion` back for ambient or single-use editorial moments.

---

## 5. Layout and spacing

### Container widths
| Class | Use |
|-------|-----|
| `max-w-4xl mx-auto` | Default narrative sections (hero, about, pricing-less pages). |
| `max-w-5xl mx-auto` | Grids of offerings or integrations. |
| `max-w-6xl mx-auto` | Complex layouts with sidebars (e.g. WorkStreams mockup). |
| `max-w-screen-xl mx-auto` | Global nav, footer, results bands. |

Horizontal padding is always `px-5 md:px-8` on full-bleed sections.

### Vertical rhythm
- Standard section: `py-16 md:py-24`
- Compact / callout section: `py-8 md:py-12`
- Hero: `py-12 md:py-24` (sometimes `py-8 md:py-16` for secondary page heroes)
- Between eyebrow and H2: `mb-4`
- Between H2 and lead paragraph: `mb-4`
- Between lead and body: `mb-10` to `mb-12`

### Full-bleed backgrounds
Use this pattern for tinted / dark sections:
```html
<div class="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-tint-cool/30">
  <div class="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
    <!-- content -->
  </div>
</div>
```

### Rhythm principle
Alternate `paper` → tint → `paper` → `ink` so the reader's eye gets a visual pulse. Never two tinted sections in a row.

---

## 6. Components

### 6.1 Buttons

**Primary (filled petrol):**
```
px-8 py-4 bg-petrol text-paper font-medium uppercase text-sm tracking-wider rounded-full
hover:bg-petrol/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200
```

**Secondary (outline on light):**
```
px-8 py-4 border-2 border-ink/20 text-ink font-medium uppercase text-sm tracking-wider rounded-full
hover:border-petrol hover:text-petrol hover:-translate-y-0.5 transition-all duration-200
```

**Secondary on dark:**
```
border-2 border-paper/30 text-paper … hover:border-paper hover:bg-paper/10
```

Buttons are always **uppercase, tracked, pill-shaped (`rounded-full`)**. Never square corners. Never sentence-case button copy.

### 6.2 Cards

**Standard content card:**
```
bg-paper border border-ink/10 rounded-2xl p-6 md:p-8
hover:border-petrol/30 transition-all
```

**Compact card:**
```
bg-paper border border-ink/10 rounded-xl p-5
```

**Dark accent card (used sparingly for emphasis):**
```
bg-ink text-paper rounded-2xl p-6 md:p-8
```

Radius scale: `rounded-full` (buttons), `rounded-2xl` (content cards), `rounded-xl` (nested / compact), `rounded-lg` (dropdowns), `rounded-md` (inline chips).

### 6.3 Eyebrow + H2 pattern (baseline for every section)
```html
<p class="text-xs uppercase tracking-[0.2em] text-petrol mb-4 font-medium">The section eyebrow</p>
<h2 class="text-3xl md:text-5xl font-bold text-ink mb-4">Your headline, usually one sentence.</h2>
<p class="text-lg text-graphite mb-12 max-w-3xl">One or two sentences of lead copy.</p>
```

### 6.4 Navigation — the bracket pattern
The site logo and nav items use a distinctive bracket treatment:
```
[Capabilities]
[Habitat OS]
[About]
```
Brackets fade in on hover (`opacity-30 group-hover:opacity-100`), and a petrol underline animates beneath the active link. This is a **signature element** — don't replace it with plain text links.

### 6.5 Pull quote / emphasis block
```html
<div class="bg-petrol/5 border-l-4 border-petrol rounded-r-2xl p-6 md:p-8">
  <p class="text-xs uppercase tracking-[0.2em] text-petrol mb-2 font-medium">Eyebrow</p>
  <p class="text-lg text-ink leading-relaxed">Emphasis content.</p>
</div>
```

---

## 7. Imagery

Three imagery tracks, each with a different purpose. **Never mix them on the same page.**

### 7.1 Client brand — Renaissance Drafting (default for `src/content/posts/*` blog cards)
From `AGENTS.md` / `CLAUDE.md`:
- Da Vinci diagrams, Dürer engravings, celestial maps, cartography, distillation machines
- Sepia ink on aged parchment, cross-hatching, red chalk accents
- Generated via nano-banana
- Wide 16:9, never include text overlays

Example prompt pattern:
> "Wide 16:9 Da Vinci diagram style. [Metaphorical subject]. Sepia ink on aged parchment, detailed cross-hatching, red chalk accents. Not a literal depiction."

### 7.2 Labs brand — Bell Labs / Tufte / RAND
For research-oriented pages and reports:
- Tufte data viz, Bell Labs technical diagrams, RAND report infographics, retro terminal
- Restrained palette, heavy on typography
- Grid-aligned, data-forward

### 7.3 Editorial photography (current prompt set, brand experiment)
We're experimenting with cinematic editorial photography for major page headers (not blog cards). Aesthetic:
- Cinematic, magazine-quality (Kinfolk / Monocle / New Yorker feature)
- Natural or dramatic single-source light
- Muted, sophisticated palette — no saturated corporate stock
- Subjects: craft objects, architectural details, workshops, instruments
- **No people** in frame (unless explicitly approved)
- Visual metaphor for the page's thesis, not literal
- 16:9, no text overlays

### Universal imagery rules
- No stock photography of diverse teams at laptops.
- No saturated tech-marketing gradients.
- No AI-generated imagery that looks like AI (waxy skin, impossible geometry, six-finger hands).
- Header images for blog posts live in `src/content/assets/cards/` and are referenced in frontmatter as `image: filename.png`.

---

## 8. Writing patterns

### 8.1 CTAs — the standard ladder
| Tier | CTA text | Use when |
|------|----------|----------|
| Primary | **Talk to a principal** | Enterprise inquiry, any major page |
| Primary (product-specific) | **Talk to a principal about [X]** | WorkStreams, regulated deployments, etc. |
| Exploratory | **See the Framework** / **See the Platform** | Mid-funnel, sending to capabilities or habitat-os |
| Proof | **View Case Studies** / **See Our Work** | Validation, late-funnel |
| Tactical | **Vibe Check** | Low-commitment entry point |

**Rules:**
- Always use a `mailto:` for "Talk to a principal" with a subject line that identifies the context. Example:
  `mailto:hey@thefocus.ai?subject=Habitat%20WorkStreams%20%E2%80%94%20Enterprise%20Inquiry`
- Never use "Learn more" — it's meaningless.
- Never use "Get started" — we're not self-serve.

### 8.2 Headline patterns that work
- **Contrast:** "Production AI your security team can actually approve."
- **Accusation flipped:** "Your best prompts shouldn't die in one person's chat history."
- **Promise with specifics:** "From tribal knowledge to production AI — in weeks, not quarters."
- **One-word emphasis:** "Meet Habitat OS."

### 8.3 Lists over prose
When listing capabilities, commitments, or comparisons — use a grid of cards or a bullet list. Don't bury specifics in paragraphs.

### 8.4 Honest hedges
When something isn't finished, say so in plain language. Example from `/habitat-os` Trust section: *"TheFocus.AI's own SOC 2 Type I audit is underway for 2026. In the meantime, we provide security posture documentation…"* — this builds more trust than a vague claim.

---

## 9. Accessibility baseline

- **Contrast minimums:** 4.5:1 for body text, 3:1 for large text and UI elements. `petrol-light` exists specifically because `petrol` doesn't pass contrast on `ink` backgrounds — use the right token.
- **Interactive elements:** all buttons and links have visible hover and focus states. Don't remove focus rings.
- **Touch targets:** 44×44px minimum. All primary buttons already meet this via `px-8 py-4`.
- **Alt text:** every image needs alt text. Decorative imagery can use `alt=""`.
- **Headings in order:** never skip from H1 to H3. Each page has exactly one H1.
- **Color is never the only cue.** Badges always have text labels in addition to color (see the Private/Team/Org badges in the WorkStreams mockup).
- **Run Lighthouse before shipping significant visual changes.** The AutoResearch loop (`docs/autoresearch/`) can enforce this automatically.

---

## 10. Inspiration and references

### Primary reference
- **[anthropic.com](https://anthropic.com)** — warm cream backgrounds, serif-forward typography, generous whitespace, single warm accent, understated confidence. Our north star for editorial restraint.

### Secondary references
- **[Stripe Press](https://press.stripe.com/)** — long-form respect for the reader, serif display, considered pacing.
- **[Basecamp / 37signals](https://37signals.com/)** — founder-voice directness, no fluff, opinions stated clearly.
- **[Nat Friedman's site](https://nat.org/)** — personal but authoritative, intentional simplicity.
- **[Linear](https://linear.app/)** for product-surface components (cards, nav affordances) — but never for marketing voice.

### Anti-references (what we are not)
- Typical B2B SaaS landing pages with purple-to-blue gradients and stock photos of diverse teams at laptops.
- "AI for everyone" marketing with hero videos of people high-fiving.
- Decks disguised as websites.

---

## 11. File locations

| What | Where |
|------|-------|
| Color + font tokens | `tailwind.config.mjs` |
| Site-wide layout, nav, footer | `src/layout/BaseLayout.astro` |
| Blog post header images | `src/content/assets/cards/` |
| Post frontmatter field | `image: filename.png` |
| Organization schema (SEO) | `src/components/schemas/organization.astro` |
| Long-form copy drafts | `webtext/` |
| This document | `docs/brand-guidelines.md` |

---

## 12. Changelog

| Date | Change |
|------|--------|
| 2026-04-17 | v0.1 — initial document created from the live site. Documents Client + Labs palettes, bracket nav pattern, CTA ladder, imagery tracks, anthropic.com as north star. |

---

*When this document and the live site disagree, the site wins until the founders decide otherwise — update the document, don't retrofit the site to match stale guidelines.*
