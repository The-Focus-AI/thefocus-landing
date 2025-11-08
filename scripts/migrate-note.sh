#!/bin/bash
# Migrate content from daily notes to posts or recipes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_usage() {
    echo "Usage: $0 <post|recipe> <daily-note-file> <new-slug>"
    echo ""
    echo "Examples:"
    echo "  $0 post daily/2025-11-07.md my-new-post"
    echo "  $0 recipe daily/2025-11-07.md my-new-recipe"
    echo ""
    echo "This will:"
    echo "  1. Read content from the daily note"
    echo "  2. Create a new draft with required frontmatter"
    echo "  3. Open it in your editor"
    exit 1
}

# Check arguments
if [ $# -ne 3 ]; then
    print_usage
fi

TYPE=$1
SOURCE=$2
SLUG=$3

# Validate type
if [ "$TYPE" != "post" ] && [ "$TYPE" != "recipe" ]; then
    echo -e "${RED}Error: Type must be 'post' or 'recipe'${NC}"
    print_usage
fi

# Find the content directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OBSIDIAN_ROOT="$HOME/Documents/The Focus/Content"

# Resolve source file
if [[ "$SOURCE" == /* ]]; then
    SOURCE_FILE="$SOURCE"
elif [[ "$SOURCE" == daily/* ]]; then
    SOURCE_FILE="$OBSIDIAN_ROOT/$SOURCE"
else
    SOURCE_FILE="$OBSIDIAN_ROOT/daily/$SOURCE"
fi

# Check if source exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo -e "${RED}Error: Source file not found: $SOURCE_FILE${NC}"
    exit 1
fi

# Set destination based on type
if [ "$TYPE" = "post" ]; then
    DEST_DIR="$PROJECT_ROOT/src/content/posts"
    DEST_FILE="$DEST_DIR/${SLUG}.md"
else
    DEST_DIR="$PROJECT_ROOT/src/content/recipes"
    DEST_FILE="$DEST_DIR/${SLUG}.md"
fi

# Check if destination already exists
if [ -f "$DEST_FILE" ]; then
    echo -e "${RED}Error: Destination already exists: $DEST_FILE${NC}"
    echo "Choose a different slug or edit the existing file."
    exit 1
fi

# Get today's date
TODAY=$(date +%Y-%m-%d)

# Extract content (skip frontmatter if it exists)
CONTENT=$(awk '
    BEGIN { in_frontmatter=0; frontmatter_count=0 }
    /^---$/ {
        in_frontmatter = !in_frontmatter
        frontmatter_count++
        next
    }
    !in_frontmatter && frontmatter_count >= 2 { print }
    frontmatter_count == 0 { print }
' "$SOURCE_FILE")

# Create the new file with appropriate template
if [ "$TYPE" = "post" ]; then
    cat > "$DEST_FILE" << EOF
---
# ===== REQUIRED FIELDS =====
title: "${SLUG//-/ }"
date: $TODAY
description: "TODO: Add a brief description"
published: false

# ===== RECOMMENDED FIELDS =====
tags:
  - essay

# ===== OPTIONAL FIELDS =====
# image: ${SLUG}.png  # Place in src/content/assets/cards/
---

$CONTENT
EOF
else
    cat > "$DEST_FILE" << EOF
---
# ===== REQUIRED FIELDS =====
title: "${SLUG//-/ }"
date: $TODAY
description: "TODO: What does this recipe teach?"
published: false

# ===== RECOMMENDED FIELDS =====
tech:
  - tool-name
section:
  - coding

# ===== OPTIONAL FIELDS =====
# image: ${SLUG}.png  # Place in src/content/assets/recipes/
---

$CONTENT
EOF
fi

echo -e "${GREEN}✓ Created new $TYPE: $DEST_FILE${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Edit the file and add required fields (title, description)"
echo "  2. Polish the content"
echo "  3. Add an image (optional)"
echo "  4. Set published: true when ready"
echo ""
echo -e "Run ${GREEN}npm run dev${NC} and visit ${GREEN}http://localhost:4321/drafts${NC} to preview"
echo ""

# Optionally open in editor
if command -v code &> /dev/null; then
    echo -e "${YELLOW}Opening in VS Code...${NC}"
    code "$DEST_FILE"
elif command -v cursor &> /dev/null; then
    echo -e "${YELLOW}Opening in Cursor...${NC}"
    cursor "$DEST_FILE"
fi
