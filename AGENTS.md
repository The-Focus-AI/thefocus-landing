## Learning and Memory Management

- YOU MUST use the journal tool frequently to capture technical insights, failed approaches, and user preferences
- Before starting complex tasks, search the journal for relevant past experiences and lessons learned
- Document architectural decisions and their outcomes for future reference
- Track patterns in user feedback to improve collaboration over time
- When you notice something that should be fixed but is unrelated to your current task, document it in your journal rather than fixing it immediately

## Post Header Images

Header images for blog posts go in `src/content/assets/cards/` and are referenced in post frontmatter as `image: filename.png`.

### Style Guidelines (Focus.AI Labs Brand)

Generate images using nano-banana with these characteristics:

- **Aesthetic**: Impasto oil painting (Van Gogh-like thick brushstrokes) OR vintage illustration/risograph style
- **Subject**: Visual metaphors for the post concept - NOT literal depictions
- **Colors**: Warm earth tones - ochre, deep blue, burnt sienna, cream, limited palette
- **Format**: Wide 16:9 aspect ratio
- **Mood**: Contemplative, atmospheric, moody lighting
- **No text**: Never include text overlays in header images

### Example Prompt Structure

```
"Wide 16:9 impasto oil painting in the style of Van Gogh with thick visible brushstrokes. [METAPHORICAL SCENE DESCRIPTION]. Warm earth tones - ochre, deep blue, burnt sienna, cream. Moody atmospheric lighting. No text."
```

### Reference Images

Look at existing cards in `src/content/assets/cards/` for style reference:
- `good-for-human-good-for-ai-header.png` - human + robot working together, heavy impasto
- `mcp_wide.png` - craftsperson in workshop, moody lighting
- `yolo_wide.png` - vintage risograph style, limited colors
- `moral_vibe_check_wide.png` - graphic novel style, person looking at statue reflection
