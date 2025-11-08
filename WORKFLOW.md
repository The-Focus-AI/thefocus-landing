# Content Creation Workflow

A step-by-step guide for creating posts and recipes from daily notes.

## Quick Start

```bash
# Start dev server to preview drafts
npm run dev

# Visit drafts page
open http://localhost:4321/drafts
```

---

## The Four-Phase Workflow

### Phase 1: Capture (Daily Notes)

**Location:** `~/Documents/The Focus/Content/daily/`

**Goal:** Just capture ideas with zero pressure.

**Minimal structure:**
```yaml
---
title: Notes for Nov 7th 25
date: 2025-11-07
tags:
  - daily
---

Your thoughts, links, code snippets here...
```

**Tips:**
- Write freely, no editing needed
- Paste links, code, whatever
- Don't worry about polish
- Tag with `daily` for easy filtering

---

### Phase 2: Draft Development

**When:** You have an idea worth developing.

**Method A - Manual:**
1. Create new file in `src/content/posts/` or `src/content/recipes/`
2. Copy template from `draft.md`
3. Copy content from daily note
4. Fill in required fields

**Method B - Script (Recommended):**
```bash
# Migrate from daily note to post
./scripts/migrate-note.sh post daily/2025-11-07.md my-post-slug

# Migrate from daily note to recipe
./scripts/migrate-note.sh recipe daily/2025-11-07.md my-recipe-slug
```

**Required fields to add:**
- `title` - Make it descriptive
- `date` - Today's date (or intended publish date)
- `description` - What's this about? (For previews/SEO)
- `published: false` - Keep as draft for now

---

### Phase 3: Polish

**Edit in Obsidian** - The directories are symlinked!
- `~/Documents/The Focus/Content/posts/` → `src/content/posts/`
- `~/Documents/The Focus/Content/recipes/` → `src/content/recipes/`

**Refine content:**
1. Write clear intro
2. Add structure (headings, lists)
3. Include code examples
4. Proofread

**Add optional enhancements:**
- **Images**
  - Posts: Place in `src/content/assets/cards/`
  - Recipes: Place in `src/content/assets/recipes/`
  - Add to frontmatter: `image: filename.png`

- **Better metadata**
  - Posts: Refine `tags`
  - Recipes: Add `section` categories, `related` recipes

**Preview your work:**
```bash
npm run dev
open http://localhost:4321/drafts
```

---

### Phase 4: Publish

**Final checklist:**
- [ ] Title is clear and compelling
- [ ] Description is informative (appears in previews)
- [ ] Content is polished
- [ ] Image is added (optional but recommended)
- [ ] All links work
- [ ] Code examples are tested

**Publish:**
```yaml
published: true  # Change from false to true
```

**Deploy:**
```bash
git add .
git commit -m "feat: publish new post/recipe"
git push
```

---

## Content Type Reference

### Posts

**Location:** `src/content/posts/`

**Required frontmatter:**
```yaml
---
title: "Your Title"
date: 2025-11-07
description: "Brief description for SEO"
published: false
tags:
  - essay
---
```

**Optional:**
- `image: filename.png` - Card image
- `author: Name` - Defaults to Will Schenk
- `audio: elevenLabsId` - For audio player

**Common tags:**
- `essay` - Thoughtful pieces
- `models` - AI models
- `usecase` - Practical applications
- `process` - Workflows
- `compare` - Comparisons
- `architecture` - Technical design
- `barefoot` - Minimalist approaches

---

### Recipes

**Location:** `src/content/recipes/`

**Required frontmatter:**
```yaml
---
title: "Your Recipe"
date: 2025-11-07
description: "What this teaches"
published: false
tech:
  - tool-name
section:
  - coding
---
```

**Optional:**
- `image: filename.png` - Recipe image
- `related: [other-recipe-id]` - Link similar recipes

**Tech tags:** `prompts`, `mcp`, `claude`, `cursor`, `git`, etc.

**Section tags:** `coding`, `analysis`, `user-experience`, `voice`, `images`

**Recipe structure:**
1. Brief intro
2. Prerequisites
3. Step-by-step instructions
4. Examples
5. Tips & variations

---

## Helper Scripts

### Migrate from Daily Notes

```bash
./scripts/migrate-note.sh <type> <source> <slug>
```

**Examples:**
```bash
# Create post from daily note
./scripts/migrate-note.sh post daily/2025-11-07.md my-awesome-post

# Create recipe from daily note
./scripts/migrate-note.sh recipe daily/2025-11-07.md my-handy-recipe

# Full path also works
./scripts/migrate-note.sh post ~/Documents/The\ Focus/Content/daily/2025-11-07.md slug
```

---

## Troubleshooting

### "My draft isn't showing up"

Check `/drafts` page to see what's wrong:
```bash
npm run dev
open http://localhost:4321/drafts
```

Common issues:
- Missing `title` - Required!
- Missing `description` - Required!
- Missing `date` or invalid date format
- Date in the future (will be filtered out)

### "Where do I put images?"

- **Posts:** `src/content/assets/cards/filename.png`
- **Recipes:** `src/content/assets/recipes/filename.png`

Then reference in frontmatter:
```yaml
image: filename.png  # Just the filename, not the path
```

### "How do I preview before publishing?"

```bash
npm run dev
```

Then:
- **Published posts:** `http://localhost:4321/blog`
- **Published recipes:** `http://localhost:4321/recipes`
- **All drafts:** `http://localhost:4321/drafts` (dev only)

---

## Tips & Best Practices

### Capture Everything

Don't filter yourself in daily notes. Just write. You can organize later.

### Start Small

Move to draft when you have a clear idea, not a complete article. Let it grow.

### Iterate Gradually

Edit in small sessions. Polish over days, not hours.

### Use the Drafts Page

It shows exactly what's missing. No guessing.

### Commit Early, Commit Often

```bash
git add .
git commit -m "wip: working on post about X"
```

Snapshots let you experiment fearlessly.

### Link Between Content

Use the `related` field in recipes to build knowledge graphs.

---

## Quick Reference

**File locations:**
- Daily notes: `~/Documents/The Focus/Content/daily/`
- Posts: `src/content/posts/`
- Recipes: `src/content/recipes/`
- Post images: `src/content/assets/cards/`
- Recipe images: `src/content/assets/recipes/`

**Commands:**
```bash
# Dev server
npm run dev

# Migration helper
./scripts/migrate-note.sh <type> <source> <slug>

# Check git status
git status

# Preview specific post/recipe
open http://localhost:4321/posts/your-slug
open http://localhost:4321/recipes/your-slug
```

**URLs (dev):**
- Drafts: `http://localhost:4321/drafts`
- Posts: `http://localhost:4321/blog`
- Recipes: `http://localhost:4321/recipes`

---

## Philosophy

> Start messy. Refine gradually. Publish confidently.

The goal is to lower the barrier to creation. Capture freely in daily notes, develop when inspired, polish when ready, publish when proud.

Don't let perfect be the enemy of good (or published).
