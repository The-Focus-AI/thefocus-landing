#!/bin/bash

# Cleanup script for removing old/deprecated files after rebrand
# Run this after reviewing changes with: bash scripts/cleanup-old-files.sh --dry-run

set -e

DRY_RUN=false

if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "🔍 DRY RUN MODE - No files will be deleted"
    echo ""
fi

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

remove_file() {
    local file=$1
    if [[ -f "$file" ]]; then
        if $DRY_RUN; then
            echo -e "${YELLOW}Would remove:${NC} $file"
        else
            echo -e "${RED}Removing:${NC} $file"
            rm "$file"
        fi
    else
        echo -e "${GREEN}Already removed:${NC} $file"
    fi
}

remove_dir() {
    local dir=$1
    if [[ -d "$dir" ]]; then
        if $DRY_RUN; then
            echo -e "${YELLOW}Would remove directory:${NC} $dir"
        else
            echo -e "${RED}Removing directory:${NC} $dir"
            rm -rf "$dir"
        fi
    else
        echo -e "${GREEN}Already removed:${NC} $dir"
    fi
}

echo "🧹 Focus.AI Landing - File Cleanup"
echo "=================================="
echo ""

# Old recipe pages (typos/deprecated)
echo "📝 Checking old recipe pages..."
remove_file "src/pages/recipies/index.astro"  # Typo version

# Check if journey/tech recipe pages are still used
echo ""
echo "🔍 Checking recipe navigation pages..."
echo "   These might still be in use - review before removing:"
if $DRY_RUN; then
    if [[ -f "src/pages/recipes/[...journey].astro" ]]; then
        echo -e "${YELLOW}   Found:${NC} src/pages/recipes/[...journey].astro"
    fi
    if [[ -f "src/pages/recipes/[...tech].astro" ]]; then
        echo -e "${YELLOW}   Found:${NC} src/pages/recipes/[...tech].astro"
    fi
fi

# Old component files (if confirmed unused)
echo ""
echo "🧩 Checking for potentially unused components..."
echo "   Review these manually before removing:"

POTENTIALLY_UNUSED=(
    "src/components/studycard.astro"
    "src/components/homepage_toc.astro"
)

for component in "${POTENTIALLY_UNUSED[@]}"; do
    if [[ -f "$component" ]]; then
        # Check if it's referenced anywhere
        if grep -rq "$(basename "$component" .astro)" src/pages/ 2>/dev/null; then
            echo -e "${GREEN}   Still used:${NC} $component"
        else
            if $DRY_RUN; then
                echo -e "${YELLOW}   Potentially unused:${NC} $component"
            else
                echo -e "${YELLOW}   Skipping (review manually):${NC} $component"
            fi
        fi
    fi
done

# Check for old layout files
echo ""
echo "📐 Checking layouts..."
# These are still in use, just noting them
if [[ -f "src/layout/LandingLayout.astro" ]]; then
    echo -e "${GREEN}   Keeping:${NC} src/layout/LandingLayout.astro (used for coding-agents)"
fi

# Old style files
echo ""
echo "🎨 Checking old style files..."
if [[ -d "src/styles" ]]; then
    echo -e "${GREEN}   Found:${NC} src/styles/ directory"
    echo "   Review contents - may contain font imports"
    if $DRY_RUN; then
        ls -la src/styles/
    fi
fi

# Old webtext files (documentation/planning)
echo ""
echo "📄 Checking webtext directory..."
if [[ -d "webtext" ]]; then
    echo -e "${GREEN}   Found:${NC} webtext/ directory"
    echo "   This contains planning documents - keep for reference"
fi

# Summary
echo ""
echo "=================================="
if $DRY_RUN; then
    echo -e "${YELLOW}✨ Dry run complete!${NC}"
    echo ""
    echo "To actually remove files, run:"
    echo "  bash scripts/cleanup-old-files.sh"
else
    echo -e "${GREEN}✨ Cleanup complete!${NC}"
    echo ""
    echo "Review changes with:"
    echo "  git status"
    echo ""
    echo "If everything looks good:"
    echo "  git add ."
    echo "  git commit -m 'chore: remove deprecated files'"
fi
echo "=================================="
