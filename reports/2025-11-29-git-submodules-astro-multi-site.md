---
title: "Multi-Site Astro Deployment: Git Submodules + GitHub Actions"
date: 2025-11-29
topic: git-submodules-astro
recommendation: git submodules with custom build workflow
version_researched: actions/checkout@v4, withastro/action@v2
use_when:
  - You own multiple separate Astro repos and want unified deployment
  - Each sub-site should be independently maintainable
  - Sub-sites need to appear at specific paths like /reports/aie-coding-2025
  - You want automatic rebuilds when submodules update
avoid_when:
  - Sub-sites need to share components/layouts with the main site (use monorepo instead)
  - You need tight integration between sites (use Astro content collections)
  - Private submodules and you can't manage PAT tokens
project_context:
  language: TypeScript/Astro
  relevant_dependencies:
    - astro@5.8.0
    - withastro/action@v2
    - actions/deploy-pages@v4
---

## Summary

Combining multiple Astro sites using git submodules is straightforward with GitHub Actions. The approach involves: (1) adding your separate Astro repos as git submodules, (2) checking them out recursively in CI, (3) building each sub-site with a custom output path, and (4) deploying the combined result[1][2].

The key insight is that you **cannot use `withastro/action@v2` directly** for multi-site builds—it's designed for single-site deployment. Instead, you need a custom workflow that builds each submodule independently and merges the outputs before uploading the pages artifact[3]. GitHub's `actions/checkout@v4` has first-class support for recursive submodule checkout[1].

For your use case (outputting to `public/reports/aie-coding-2025`), you have two options: (A) configure each sub-site's `outDir` in astro.config.mjs, or (B) build to default `dist/` and copy to the target location. Option B is simpler and more reliable[4].

## Philosophy & Mental Model

Think of this as a **build-time composition** pattern:

```
Main Site (thefocus-landing)
├── src/pages/           → builds to dist/
├── public/              → copied to dist/ as-is
└── submodules/
    ├── aie-report/      → builds to dist/reports/aie-coding-2025
    └── weekend-warrior/ → builds to dist/weekend-warrior/coding-agent
```

Each submodule is a **complete, standalone Astro project** that can be developed and tested independently. At build time, they're all compiled and their outputs are merged into the main site's `dist/` directory.

The submodule approach differs from a monorepo: submodules maintain their own git history, can be versioned independently, and can be reused across multiple parent projects[5].

## Setup

### Step 1: Add Submodules to Your Repository

```bash
# From your main repo root
git submodule add https://github.com/your-org/aie-report.git submodules/aie-report
git submodule add https://github.com/your-org/weekend-warrior.git submodules/weekend-warrior

# Commit the .gitmodules file and submodule references
git add .gitmodules submodules/
git commit -m "Add submodule sites"
```

This creates a `.gitmodules` file:

```ini
[submodule "submodules/aie-report"]
    path = submodules/aie-report
    url = https://github.com/your-org/aie-report.git

[submodule "submodules/weekend-warrior"]
    path = submodules/weekend-warrior
    url = https://github.com/your-org/weekend-warrior.git
```

### Step 2: Configure Sub-Site Base Paths

Each submodule's Astro config needs the correct `base` path for assets to work:

**submodules/aie-report/astro.config.mjs:**
```javascript
import { defineConfig } from "astro/config";

export default defineConfig({
  // Critical: set base to match final deployment path
  base: "/reports/aie-coding-2025",
  // Optional: can also customize outDir, but we'll handle this in CI
  // outDir: "../../public/reports/aie-coding-2025",
});
```

**submodules/weekend-warrior/astro.config.mjs:**
```javascript
import { defineConfig } from "astro/config";

export default defineConfig({
  base: "/weekend-warrior/coding-agent",
});
```

### Step 3: Create the Combined Build Workflow

Replace your `.github/workflows/deploy.yml`:

```yaml
name: Deploy Multi-Site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Send Telegram Build start
        run: |
          curl -s -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
          -d chat_id="${{ secrets.TELEGRAM_CHAT_ID }}" \
          -d text="🔨 Multi-site build starting for ${{ github.repository }}!"

      - name: Checkout with submodules
        uses: actions/checkout@v4
        with:
          submodules: recursive
          # For private submodules, uncomment and add GH_PAT secret:
          # token: ${{ secrets.GH_PAT }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      # Build main site
      - name: Install main site dependencies
        run: pnpm install

      - name: Build main site
        run: pnpm build

      # Build submodule: aie-report
      - name: Build aie-report submodule
        run: |
          cd submodules/aie-report
          pnpm install
          pnpm build
          # Copy built site to main dist folder
          mkdir -p ../../dist/reports/aie-coding-2025
          cp -r dist/* ../../dist/reports/aie-coding-2025/

      # Build submodule: weekend-warrior
      - name: Build weekend-warrior submodule
        run: |
          cd submodules/weekend-warrior
          pnpm install
          pnpm build
          mkdir -p ../../dist/weekend-warrior/coding-agent
          cp -r dist/* ../../dist/weekend-warrior/coding-agent/

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

      - name: Send Telegram Success
        if: success()
        run: |
          curl -s -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
          -d chat_id="${{ secrets.TELEGRAM_CHAT_ID }}" \
          -d text="✅ Multi-site build succeeded for ${{ github.repository }}!"

      - name: Send Telegram Failure
        if: failure()
        run: |
          curl -s -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
          -d chat_id="${{ secrets.TELEGRAM_CHAT_ID }}" \
          -d text="❌ Multi-site build failed for ${{ github.repository }}!"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 4: Auto-Update Submodules with Dependabot (Optional)

Create `.github/dependabot.yml` to automatically create PRs when submodules update[6]:

```yaml
version: 2
updates:
  - package-ecosystem: gitsubmodule
    directory: /
    schedule:
      interval: daily
    open-pull-requests-limit: 5
```

## Core Usage Patterns

### Pattern 1: Update Submodules Locally

```bash
# Pull latest changes for all submodules
git submodule update --remote --merge

# Or update a specific submodule
git submodule update --remote submodules/aie-report

# Commit the updated submodule reference
git add submodules/aie-report
git commit -m "Update aie-report submodule to latest"
git push
```

### Pattern 2: Clone with Submodules

When cloning the repo fresh:

```bash
# Option A: Clone with submodules in one command
git clone --recurse-submodules https://github.com/your-org/thefocus-landing.git

# Option B: If already cloned, initialize submodules
git submodule update --init --recursive
```

### Pattern 3: Build Script for Local Development

Create `scripts/build-all.sh`:

```bash
#!/bin/bash
set -e

echo "Building main site..."
pnpm build

echo "Building aie-report..."
cd submodules/aie-report
pnpm install
pnpm build
mkdir -p ../../dist/reports/aie-coding-2025
cp -r dist/* ../../dist/reports/aie-coding-2025/
cd ../..

echo "Building weekend-warrior..."
cd submodules/weekend-warrior
pnpm install
pnpm build
mkdir -p ../../dist/weekend-warrior/coding-agent
cp -r dist/* ../../dist/weekend-warrior/coding-agent/
cd ../..

echo "All sites built! Preview with: pnpm preview"
```

### Pattern 4: Private Submodules Authentication

For private repos, create a fine-grained PAT with read access to Contents[1]:

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens
2. Create token with read-only access to repository Contents
3. Add as repository secret named `GH_PAT`
4. Update checkout step:

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
    token: ${{ secrets.GH_PAT }}
```

### Pattern 5: Trigger Rebuild from Submodule

Add to submodule's workflow to trigger parent rebuild:

```yaml
# In submodule repo: .github/workflows/trigger-parent.yml
name: Trigger Parent Rebuild

on:
  push:
    branches: [main]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger parent workflow
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{ secrets.PARENT_REPO_PAT }}" \
            https://api.github.com/repos/your-org/thefocus-landing/dispatches \
            -d '{"event_type":"submodule-update"}'
```

Then add to parent's workflow triggers:

```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [submodule-update]
  workflow_dispatch:
```

## Anti-Patterns & Pitfalls

### ❌ Don't: Use withastro/action for Multi-Site Builds

```yaml
# BAD: This only builds the main site
- uses: withastro/action@v2
  with:
    path: .
```

**Why it's wrong:** `withastro/action` is designed for single-site deployment and automatically uploads artifacts. You lose control over the build process needed for multi-site[3].

### ✅ Instead: Build Manually and Upload Once

```yaml
# GOOD: Manual build with full control
- run: pnpm build
- run: |
    cd submodules/aie-report && pnpm install && pnpm build
    cp -r dist/* ../../dist/reports/aie-coding-2025/
- uses: actions/upload-pages-artifact@v3
  with:
    path: dist/
```

---

### ❌ Don't: Forget the `base` Path in Sub-Sites

```javascript
// BAD: Missing base path
export default defineConfig({
  // Assets will load from / instead of /reports/aie-coding-2025/
});
```

**Why it's wrong:** Without `base`, asset paths like `/styles.css` will 404 when the site is mounted at a subpath[4].

### ✅ Instead: Always Set Base to Match Deployment Path

```javascript
// GOOD: Base matches deployment location
export default defineConfig({
  base: "/reports/aie-coding-2025",
});
```

---

### ❌ Don't: Mix v3 and v4 Artifact Actions

```yaml
# BAD: Mixing versions
- uses: actions/upload-artifact@v3
# later...
- uses: actions/download-artifact@v4  # Won't find v3 artifacts!
```

**Why it's wrong:** v3 and v4 artifact actions are incompatible. v3 is deprecated as of November 2024[7].

### ✅ Instead: Use v4 Consistently

```yaml
# GOOD: Consistent v4 usage
- uses: actions/upload-pages-artifact@v3
- uses: actions/deploy-pages@v4
```

---

### ❌ Don't: Checkout Without `submodules: recursive`

```yaml
# BAD: Submodules won't be checked out
- uses: actions/checkout@v4
```

**Why it's wrong:** By default, `actions/checkout` does not initialize submodules[1].

### ✅ Instead: Always Use Recursive

```yaml
# GOOD: All submodules are initialized
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

---

### ❌ Don't: Hardcode Paths in Multiple Places

```yaml
# BAD: Path repeated and can drift
- run: mkdir -p ../../dist/reports/aie-coding-2025
# ... and in astro.config.mjs: base: "/reports/aie-coding-2025"
# ... and in another script...
```

**Why it's wrong:** Path drift causes 404s that are hard to debug.

### ✅ Instead: Use Environment Variables or a Config File

```yaml
# GOOD: Single source of truth
env:
  AIE_REPORT_PATH: reports/aie-coding-2025

steps:
  - run: |
      mkdir -p dist/${{ env.AIE_REPORT_PATH }}
      cp -r submodules/aie-report/dist/* dist/${{ env.AIE_REPORT_PATH }}/
```

## Caveats

- **Submodule Commit Pinning:** Submodules point to a specific commit, not a branch. You must explicitly update them with `git submodule update --remote` and commit the new reference. Dependabot can automate this[6].

- **CI Build Time:** Each submodule requires its own `pnpm install`, which adds build time. Consider caching node_modules per submodule or using a build matrix for parallel builds.

- **Shared Dependencies:** If submodules share dependencies with the main site, they're installed separately, increasing disk usage. For tightly coupled sites, a pnpm workspace monorepo may be better.

- **Private Submodules:** Require a Personal Access Token (PAT) with read access. The default `GITHUB_TOKEN` only has access to the current repository[1].

- **Nested Submodules:** If a submodule contains its own submodules, you need `submodules: recursive` (not just `submodules: true`).

- **Pages Artifact Size:** GitHub Pages has a 1GB official limit (10GB absolute maximum). Combine carefully if sub-sites are large[8].

## Alternative: Checkout Multiple Repos Without Submodules

If you don't want to use submodules, you can checkout multiple repos directly:

```yaml
- uses: actions/checkout@v4
  with:
    repository: your-org/thefocus-landing
    path: main

- uses: actions/checkout@v4
  with:
    repository: your-org/aie-report
    path: aie-report
    token: ${{ secrets.GH_PAT }}  # Only needed for private repos

- run: |
    cd main && pnpm install && pnpm build
    cd ../aie-report && pnpm install && pnpm build
    cp -r dist/* ../main/dist/reports/aie-coding-2025/
```

This approach is simpler for one-off builds but doesn't track submodule versions in your git history.

## References

[1] [Stack Overflow: How to checkout submodule in GitHub action?](https://stackoverflow.com/questions/65077036/how-to-checkout-submodule-in-github-action) - Details on `actions/checkout` submodule options and authentication

[2] [Micah Henning: Checkout Submodules with Least Privilege](https://www.micah.soy/posts/checkout-submodules-github-actions-least-privilege/) - Security best practices for PAT tokens with submodules

[3] [withastro/action GitHub Repository](https://github.com/withastro/action) - Official Astro GitHub Action documentation

[4] [Astro Docs: Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/) - `base` and `outDir` configuration options

[5] [GitHub Blog: GitHub Actions Unified Build Pipeline for Multi-Repo](https://blog.cloud-eng.nl/2024/04/01/github-actions-mulitrepo/) - Patterns for multi-repository builds

[6] [GitHub Docs: Dependabot for Git Submodules](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#package-ecosystem) - Auto-updating submodules with Dependabot

[7] [GitHub Blog: Get started with v4 of GitHub Actions Artifacts](https://github.blog/news-insights/product-news/get-started-with-v4-of-github-actions-artifacts/) - Artifact v4 changes and migration guide

[8] [GitHub: actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact) - GitHub Pages artifact requirements and size limits
