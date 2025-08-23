---
title: Test your prompts with promptfoo
published: false
date: 2025-01-01
image: geolocator.png
tech:
  - prompts
section:
  - coding
  - analysis
description: A brief description of your recipe that will appear in previews and search results. Keep it concise but informative.
related:
  - related-recipe-1
  - related-recipe-2
---

```script
brew install promptfoo
```

then create a new thing

```script
cd $(mktemp -d)
promptfoo init
```


Start your recipe content here. This is where you'll write the main body of your recipe.

## Common Recipe Tags

Based on existing recipes, here are some commonly used tags you can choose from:

### Tech Tags:
- `prompts` - For prompt engineering recipes
- `mcp` - For Model Context Protocol recipes
- `claude` - For Claude-specific recipes
- `context` - For context management recipes

### Section Tags:
- `coding` - For programming and development recipes
- `analysis` - For data analysis and research recipes
- `user-experience` - For UX and interface recipes
- `voice` - For voice and audio recipes
- `images` - For image generation and editing recipes
- `clients` - For client-facing recipes
- `slack` - For Slack integration recipes
- `notebooklm` - For NotebookLM recipes

## Required Fields

Make sure to fill in:
- `title` - The title of your recipe
- `published` - Set to `true` when ready to publish, `false` for drafts
- `date` - Publication date (YYYY-MM-DD format)
- `image` - Image filename (without path)
- `tech` - Array of technical tags (see above)
- `section` - Array of section tags (see above)
- `description` - Brief description for SEO and previews
- `related` - Array of related recipe slugs (optional)

## Recipe Structure

A typical recipe should include:
1. **Introduction** - What this recipe helps you accomplish
2. **Prerequisites** - What you need before starting
3. **Steps** - Clear, numbered steps to follow
4. **Examples** - Code snippets or examples
5. **Tips** - Helpful hints and variations
6. **Related Recipes** - Links to other relevant recipes

## Draft Status

This recipe is currently marked as `published: false`, which means it will appear in the drafts page but not on the main site. Change this to `true` when you're ready to publish.
