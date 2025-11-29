# Focus.AI Landing Site

A dual-brand website showcasing **Focus.AI Studio** (client services) and **Focus.AI Labs** (research & experiments).

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Site Structure

### Client Pages (Focus.AI Studio)
Professional services and client-facing content:

- **/** - Homepage with value proposition and case studies
- **/capabilities** - Five core service offerings
- **/case-studies** - Portfolio of client work
- **/case-study/[id]** - Individual case study pages
- **/about** - Company background and founders

**Brand Colors:** Petrol (#0e3b46), Ink, Graphite, Paper

### Labs Pages (Focus.AI Labs)
Research, experiments, and public content:

- **/insights** - Research reports (magazine-style)
- **/tools** - Weekend Warrior projects (vintage science kit style)
- **/posts/[id]** - Individual research reports
- **/recipes/[id]** - Individual project instructions

**Brand Colors:**
- **Insights**: Purple (#9333ea), Cyan (#0891b2)
- **Tools**: Vermilion (#c3471d), Orange (#ea580c)

---

## Content Creation Workflow

### Phase 1: Capture (Daily Notes)

**Location:** `~/Documents/The Focus/Content/daily/`

Just capture ideas with zero pressure:

```yaml
---
title: Notes for Nov 7th 25
date: 2025-11-07
tags:
  - daily
---

Your thoughts, links, code snippets here...
```

### Phase 2: Create Draft

**Manual Method:**
1. Create file in `src/content/posts/` or `src/content/recipes/`
2. Copy template from respective directory
3. Fill in required frontmatter

**Script Method (Recommended):**
```bash
# Create post from daily note
./scripts/migrate-note.sh post daily/2025-11-07.md my-post-slug

# Create recipe from daily note
./scripts/migrate-note.sh recipe daily/2025-11-07.md my-recipe-slug
```

### Phase 3: Polish & Preview

**Edit in Obsidian** (directories are symlinked):
- `~/Documents/The Focus/Content/posts/` → `src/content/posts/`
- `~/Documents/The Focus/Content/recipes/` → `src/content/recipes/`

**Preview drafts:**
```bash
npm run dev
open http://localhost:4321/drafts
```

### Phase 4: Publish

1. Update frontmatter: `published: true`
2. Commit and push:
```bash
git add .
git commit -m "feat: publish new post/recipe"
git push
```

---

## Content Types

### Research Reports (Posts)

**Location:** `src/content/posts/`

**Required frontmatter:**
```yaml
---
title: "Your Research Title"
date: 2025-11-07
description: "Brief description for SEO and previews"
published: false
tags:
  - essay
---
```

**Optional fields:**
- `image: filename.png` - Card image (place in `src/content/assets/cards/`)
- `author: Name` - Defaults to Will Schenk
- `audio: elevenLabsId` - For audio player

**Tag for BIG REPORTS:**
```yaml
tags:
  - report  # Shows in "Major Research Reports" section
```

**Common tags:**
- `report` - Major multi-page reports (50+ pages)
- `essay` - Thoughtful pieces
- `models` - AI models
- `usecase` - Practical applications
- `process` - Workflows
- `compare` - Comparisons
- `architecture` - Technical design

### Weekend Warrior Projects (Recipes)

**Location:** `src/content/recipes/`

**Required frontmatter:**
```yaml
---
title: "Your Project Name"
date: 2025-11-07
description: "What you'll build"
published: false
tech:
  - tool-name
section:
  - coding
tags:
  - experiment
---
```

**Optional fields:**
- `image: filename.png` - Project image (place in `src/content/assets/recipes/`)
- `related: [other-recipe-id]` - Link similar recipes

**Tag for MAJOR PROJECTS:**
```yaml
tags:
  - major     # Shows in "Flagship Projects" section
  - flagship  # Alternative tag for major projects
```

**Tech tags:** `prompts`, `mcp`, `claude`, `cursor`, `git`

**Section tags:** `coding`, `analysis`, `user-experience`, `voice`, `images`

**Project structure:**
1. Brief intro
2. Prerequisites / Materials Needed
3. Step-by-step instructions
4. Examples
5. Tips & variations

---

## Asset Management

### Images

**Post card images:**
- Location: `src/content/assets/cards/`
- Frontmatter: `image: filename.png`
- Recommended: 1200x630px (16:9 or 4:3)

**Recipe/project images:**
- Location: `src/content/assets/recipes/`
- Frontmatter: `image: filename.png`
- Recommended: 1200x900px (4:3)

### Cleanup Old Files

**Remove obsolete files:**
```bash
# Remove old recipe index (typo)
rm -f src/pages/recipies/index.astro

# Remove old journey/tech recipe pages if not used
rm -f src/pages/recipes/[...journey].astro
rm -f src/pages/recipes/[...tech].astro
```

**Check for unused components:**
```bash
# List all components
ls src/components/

# Remove if unused:
# - Old card components that don't match new design
# - Deprecated layout files
# - Unused flux components if not needed
```

---

## Development

### Preview Modes

**Published content:**
- Posts: http://localhost:4321/insights
- Recipes: http://localhost:4321/tools

**Drafts (dev only):**
- All drafts: http://localhost:4321/drafts
- Email analytics: http://localhost:4321/emails

### URL Structure

**Client pages:**
```
/                       - Homepage
/capabilities          - Services
/case-studies          - Portfolio listing
/case-study/[id]       - Individual case study
/about                 - About page
```

**Labs pages:**
```
/insights              - Research reports listing
/posts/[id]            - Individual report
/tools                 - Projects listing
/recipes/[id]          - Individual project
```

**Redirects (SEO preserved):**
```
/blog       → /insights  (301)
/learnings  → /insights  (301)
/recipes    → /tools     (301)
```

---

## Design System

### Typography

**Fonts:**
- **Primary:** CinaGEO (sans-serif)
- **Serif:** Noto Serif
- **Mono:** Iosevka Etoile
- **Display:** Fraunces (limited use)

**Headings:**
- H1: `text-5xl md:text-7xl font-bold text-ink`
- H2: `text-4xl md:text-5xl font-bold text-ink`
- H3: `text-2xl font-bold text-ink`

### Color Palette

**Global:**
- Paper: `#faf9f6` (background)
- Ink: `#161616` (primary text)
- Graphite: `#4a4a4a` (secondary text)

**Client Brand:**
- Petrol: `#0e3b46` (primary brand)
- Vermilion: `#c3471d` (accent, use sparingly)

**Labs - Insights:**
- Purple: `#9333ea` (purple-600)
- Cyan: `#0891b2` (cyan-600)
- Gradients: `from-purple-50 via-blue-50 to-cyan-50`

**Labs - Tools:**
- Vermilion: `#c3471d` (primary)
- Orange: `#ea580c` (orange-600)
- Gradients: `from-orange-50 via-red-50 to-amber-50`

**Tinted backgrounds:**
- Cool: `#edf6f8`
- Sage: `#eef6ee`
- Warm: `#f7f0e6`
- Lavender: `#f2eef6`
- Aqua: `#edf6f6`

### Buttons

**Client pages:**
```html
<!-- Primary -->
<a class="px-8 py-4 border-2 border-petrol text-petrol hover:bg-petrol hover:text-paper">

<!-- Secondary -->
<a class="px-8 py-4 border-2 border-ink/20 text-ink hover:border-petrol hover:text-petrol">
```

**Labs - Insights:**
```html
<a class="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-cyan-600 hover:to-purple-600">
```

**Labs - Tools:**
```html
<a class="bg-gradient-to-r from-vermilion to-orange-600 text-white border-2 border-ink hover:from-orange-600 hover:to-vermilion">
```

---

## Troubleshooting

### Draft not showing up?

Check `/drafts` page for issues:
```bash
npm run dev
open http://localhost:4321/drafts
```

Common problems:
- Missing `title` (required)
- Missing `description` (required)
- Missing or invalid `date`
- Date in the future
- `published: true` (won't show in drafts)

### Draft indicators

Posts/recipes with `published: false` show animated orange/yellow "Draft" badges in Labs sections.

### Big Reports / Major Projects not appearing?

**For Big Reports:**
- Add `report` tag to `tags` array in frontmatter
- Will appear in "Major Research Reports" section

**For Major Projects:**
- Add `major` or `flagship` tag to `tags` array
- Will appear in "Flagship Projects" section

### Images not loading?

**Check paths:**
- Posts: `src/content/assets/cards/filename.png`
- Recipes: `src/content/assets/recipes/filename.png`

**Frontmatter:**
```yaml
image: filename.png  # Just filename, not full path
```

---

## Deployment

**Build:**
```bash
npm run build
```

**Deploy:**
```bash
git add .
git commit -m "feat: your changes"
git push
```

Site automatically deploys on push to main branch.

---

## File Structure

```
src/
├── content/
│   ├── posts/              # Research reports
│   ├── recipes/            # Weekend warrior projects
│   ├── case_studies/       # Client case studies
│   └── assets/
│       ├── cards/          # Post images
│       └── recipes/        # Recipe images
├── pages/
│   ├── index.astro         # Homepage
│   ├── capabilities.astro  # Services
│   ├── about.astro         # About
│   ├── insights.astro      # Research reports listing
│   ├── tools.astro         # Projects listing
│   ├── case-studies.astro  # Case studies listing
│   ├── posts/[...id].astro # Individual reports
│   └── recipes/[...id].astro # Individual projects
├── layout/
│   ├── BaseLayout.astro    # Main layout
│   ├── ArticleLayout.astro # Article layout
│   └── LandingLayout.astro # Landing pages
└── components/             # Reusable components
```

---

## Philosophy

> Start messy. Refine gradually. Publish confidently.

The goal is to lower the barrier to creation:
1. **Capture freely** in daily notes
2. **Develop when inspired** in drafts
3. **Polish when ready**
4. **Publish when proud**

Don't let perfect be the enemy of published.

---

## Support

- **Issues:** Report at [GitHub Issues](https://github.com/The-Focus-AI/thefocus-landing/issues)
- **Questions:** Email hey@thefocus.ai
- **Labs projects:** Email labs@thefocus.ai

---

**Built with:** Astro 5.8.0 • Tailwind CSS 3.4.17 • TypeScript

**License:** Proprietary - © 2024 Focus.AI
