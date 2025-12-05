---
title: "Astro Video Handling: Native HTML5 Video Element"
date: 2025-12-05
topic: astro-video-handling
recommendation: Native HTML5 video element with public folder storage
version_researched: Astro 5.8.0
use_when:
  - Building looping background videos for headers or hero sections
  - Need seamless video playback across page transitions (with transition:persist)
  - Want simple, direct control over video attributes
  - Working with optimized MP4/WebM files under 10MB
avoid_when:
  - Need advanced video features like adaptive bitrate streaming
  - Handling user-uploaded videos requiring transcoding
  - Building video-heavy platforms requiring CDN integration
  - Need automatic format conversion or optimization
project_context:
  language: TypeScript/Astro
  relevant_dependencies: astro@5.8.0, @astrojs/tailwind@6.0.2, @astrojs/react@4.3.0
---

## Summary

For Astro sites, the simplest and most effective approach for MP4 video files is to use the native HTML5 `<video>` element with videos stored in the `public/` directory. This approach provides direct path references without build-time processing, universal browser support, and seamless integration with Astro's View Transitions API[1][2].

Key metrics supporting this recommendation:
- **Browser support**: 98.8% global support for HTML5 video element
- **Performance**: Videos in `public/` are served as-is without processing overhead
- **Astro adoption**: 50,000+ GitHub stars, actively maintained with releases every 2-4 weeks
- **Latest release**: Astro 5.8.0 (November 2025)

For looping background videos specifically, the best practice is to store optimized MP4/WebM files (720p, 2-5MB, 10-30 seconds) in the `public/videos/` directory and reference them with absolute paths. This keeps file handling simple while delivering excellent performance[3][4].

## Philosophy & Mental Model

### The Astro Video Philosophy

Astro treats video files fundamentally differently from images. While Astro provides sophisticated image optimization through its built-in Image component, **video files receive no automatic processing or optimization**[1]. This is by design—video optimization is complex, format-specific, and often requires specialized services.

### Mental Model: Two Paths for Assets

Think of Astro's asset handling as two distinct paths:

1. **The `public/` path**: "Ship exactly as-is"
   - Files are copied directly to `/dist` without modification
   - Perfect for videos, which you've already optimized
   - Reference with absolute paths: `/videos/hero.mp4`
   - No cache-busting hashes (you control versioning)

2. **The `src/` path**: "Process and optimize"
   - Files get ESM imports and cache-busting hashes
   - Returns URL like `/_astro/hero.C7vXpQtF.mp4`
   - Useful for JavaScript/CSS but overkill for pre-optimized videos[5]

### Core Abstraction: The Video Element

The HTML5 `<video>` element is your primary abstraction. Think of it as having three responsibility layers:

1. **Source layer**: What files to load (format fallbacks)
2. **Behavior layer**: How it plays (autoplay, loop, muted)
3. **Presentation layer**: How it appears (sizing, positioning)

In Astro, you enhance this with a fourth layer:
4. **Persistence layer**: Whether it maintains state across page transitions (`transition:persist`)[6]

## Setup

### Step 1: Directory Structure

Create a `videos/` directory in your `public/` folder:

```bash
mkdir -p public/videos
```

Your structure should look like:
```
thefocus-landing/
├── public/
│   ├── videos/           # Your video files go here
│   │   ├── hero-bg.mp4
│   │   └── hero-bg.webm  # Optional WebM version
│   ├── favicon.ico
│   └── ...
├── src/
└── astro.config.mjs
```

### Step 2: Prepare Your Video Files

Optimize your videos before adding them to the project. Follow these guidelines[7][8]:

- **Resolution**: 720p (1280×720) for most backgrounds
- **Frame rate**: 24-30 fps
- **Duration**: 10-30 seconds for seamless loops
- **File size**: Target 2-5MB, maximum 10MB
- **Format**: MP4 (H.264) for compatibility, WebM (VP9) for size optimization
- **Audio**: Remove audio track entirely (saves ~20% bandwidth)

Using FFmpeg to optimize:

```bash
# Remove audio and optimize for web
ffmpeg -i input.mp4 -an -vcodec libx264 -crf 23 -preset slow \
  -movflags +faststart -vf scale=1280:720 public/videos/hero-bg.mp4

# Create WebM version for better compression
ffmpeg -i input.mp4 -an -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -vf scale=1280:720 public/videos/hero-bg.webm
```

### Step 3: No Astro Configuration Needed

Unlike image optimization, no special Astro configuration is required for videos. They work out of the box with the standard setup. Your existing `astro.config.mjs` is sufficient[1].

## Core Usage Patterns

### Pattern 1: Basic Looping Background Video

The foundation for any background video implementation.

```astro
---
// src/components/HeroVideo.astro
---
<div class="relative w-full h-screen overflow-hidden">
  <video
    autoplay
    loop
    muted
    playsinline
    class="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero-bg.webm" type="video/webm">
    <source src="/videos/hero-bg.mp4" type="video/mp4">
  </video>

  <!-- Content overlay -->
  <div class="relative z-10 flex items-center justify-center h-full">
    <h1 class="text-white text-5xl font-bold">Your Content Here</h1>
  </div>
</div>
```

**Key attributes explained:**
- `autoplay`: Starts playing immediately (requires `muted`)
- `loop`: Restarts when it reaches the end
- `muted`: Required for autoplay to work in modern browsers[9]
- `playsinline`: Prevents fullscreen on iOS, keeps video inline[9]

### Pattern 2: Video with Poster Image

Provide a fallback image that displays while the video loads.

```astro
---
// src/components/HeroVideo.astro
---
<video
  autoplay
  loop
  muted
  playsinline
  poster="/images/hero-poster.jpg"
  class="w-full h-screen object-cover"
>
  <source src="/videos/hero-bg.webm" type="video/webm">
  <source src="/videos/hero-bg.mp4" type="video/mp4">
</video>
```

The `poster` attribute shows an image before the video loads, improving perceived performance and providing a fallback if video fails to load[9].

### Pattern 3: Persistent Video Across Page Transitions

Use Astro's View Transitions to keep video playing when navigating between pages.

```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
---
<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <video
      autoplay
      loop
      muted
      playsinline
      transition:persist="hero-video"
      class="fixed top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source src="/videos/background.webm" type="video/webm">
      <source src="/videos/background.mp4" type="video/mp4">
    </video>

    <slot />
  </body>
</html>
```

The `transition:persist="hero-video"` directive maintains video state across page navigations. The video continues playing seamlessly when users click links[6][10].

### Pattern 4: Responsive Video with Mobile Fallback

Hide video on mobile devices and show a static image instead for better performance.

```astro
---
// src/components/ResponsiveHeroVideo.astro
---
<div class="relative w-full h-screen">
  <!-- Desktop: Video -->
  <video
    autoplay
    loop
    muted
    playsinline
    poster="/images/hero-poster.jpg"
    class="hidden md:block absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero-bg.webm" type="video/webm">
    <source src="/videos/hero-bg.mp4" type="video/mp4">
  </video>

  <!-- Mobile: Static image -->
  <img
    src="/images/hero-poster.jpg"
    alt="Hero background"
    class="md:hidden absolute inset-0 w-full h-full object-cover"
  />

  <div class="relative z-10">
    <slot />
  </div>
</div>
```

This pattern prevents mobile devices from downloading and attempting to play large video files, significantly improving mobile performance[7][11].

### Pattern 5: Programmatic Autoplay Control

Reinforce autoplay with JavaScript for browsers that block it initially.

```astro
---
// src/components/HeroVideo.astro
---
<video
  id="hero-video"
  loop
  muted
  playsinline
  class="w-full h-screen object-cover"
>
  <source src="/videos/hero-bg.webm" type="video/webm">
  <source src="/videos/hero-bg.mp4" type="video/mp4">
</video>

<script>
  const video = document.getElementById('hero-video');
  if (video) {
    video.muted = true; // Enforce muted state
    video.play().catch(error => {
      console.warn('Autoplay was blocked:', error);
      // Optionally show a play button overlay
    });
  }
</script>
```

Some browsers require the muted state to be set programmatically, not just via HTML attributes. This pattern ensures reliable autoplay[9].

### Pattern 6: Reusable Video Component

Create a configurable component for consistent video usage across your site.

```astro
---
// src/components/Video.astro
interface Props {
  src: string;
  webmSrc?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
  persist?: boolean | string;
  class?: string;
}

const {
  src,
  webmSrc,
  poster,
  autoplay = false,
  loop = false,
  controls = false,
  persist = false,
  class: className = '',
} = Astro.props;

const persistValue = typeof persist === 'string' ? persist : undefined;
---

<video
  autoplay={autoplay}
  loop={loop}
  controls={controls}
  muted={autoplay} // Auto-mute if autoplay is true
  playsinline={autoplay}
  poster={poster}
  class={className}
  transition:persist={persistValue}
>
  {webmSrc && <source src={webmSrc} type="video/webm">}
  <source src={src} type="video/mp4">
</video>
```

Usage:
```astro
---
import Video from '../components/Video.astro';
---
<Video
  src="/videos/hero.mp4"
  webmSrc="/videos/hero.webm"
  poster="/images/hero-poster.jpg"
  autoplay
  loop
  class="w-full h-screen object-cover"
/>
```

### Pattern 7: IntersectionObserver for Performance

Only play video when it's visible in the viewport to save resources.

```astro
<video
  id="case-study-video"
  loop
  muted
  playsinline
  class="w-full rounded-lg"
>
  <source src="/videos/case-study-demo.webm" type="video/webm">
  <source src="/videos/case-study-demo.mp4" type="video/mp4">
</video>

<script>
  const video = document.getElementById('case-study-video');

  if (video) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(e => console.warn('Play blocked:', e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    observer.observe(video);
  }
</script>
```

This pattern pauses video when users scroll away, reducing CPU/battery usage and improving overall page performance[7][11].

## Anti-Patterns & Pitfalls

### ❌ Don't: Import Videos from `public/` Using ESM

```astro
---
// BAD - Creates duplicate files in dist
import heroVideo from '../public/videos/hero.mp4';
---
<video src={heroVideo} />
```

**Why it's wrong:** When you import files from `public/`, Astro copies them to both `/dist/videos/hero.mp4` (from public) and `/_astro/hero.C7vXpQtF.mp4` (from the import), doubling your build output size[1][5].

### ✅ Instead: Reference Public Files with Absolute Paths

```astro
<video src="/videos/hero.mp4" />
```

Files in `public/` are automatically available at the root path. Just reference them directly.

### ❌ Don't: Use Autoplay Without Muted

```astro
<!-- BAD - Will be blocked by browsers -->
<video autoplay loop>
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
```

**Why it's wrong:** Modern browsers block autoplay with sound to prevent annoying users. The video simply won't play[9].

### ✅ Instead: Always Mute Autoplaying Videos

```astro
<video autoplay loop muted playsinline>
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
```

### ❌ Don't: Forget `playsinline` for Mobile

```astro
<!-- BAD - Opens fullscreen on iOS -->
<video autoplay loop muted>
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
```

**Why it's wrong:** Without `playsinline`, iOS devices will open the video in fullscreen mode rather than playing it inline in your layout[9].

### ✅ Instead: Include `playsinline` Attribute

```astro
<video autoplay loop muted playsinline>
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
```

### ❌ Don't: Use Large, Unoptimized Video Files

```astro
<!-- BAD - 4K video at 50MB -->
<video autoplay loop muted playsinline>
  <source src="/videos/hero-4k-uncompressed.mp4" type="video/mp4">
</video>
```

**Why it's wrong:** Large videos dramatically slow page load times, especially on mobile networks. Users may never see your content while waiting for the video to load[7][8].

### ✅ Instead: Optimize Before Publishing

```bash
# Optimize to 720p, remove audio, target 2-5MB
ffmpeg -i input.mp4 -an -vcodec libx264 -crf 23 \
  -vf scale=1280:720 -movflags +faststart output.mp4
```

### ❌ Don't: Expect Seamless Looping with Any Video

```astro
<!-- BAD - Video not designed to loop -->
<video autoplay loop muted playsinline>
  <source src="/videos/fade-to-black.mp4" type="video/mp4">
</video>
```

**Why it's wrong:** If your video's first and last frames don't match, you'll see a jarring jump when it loops. Some browsers also introduce a small gap between iterations[12].

### ✅ Instead: Design Videos for Looping or Use WebM

```bash
# Use WebM format for smoother looping in Firefox/Chrome
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 output.webm
```

Edit your source video so the last frame seamlessly transitions to the first frame, or export as WebM which handles looping better than MP4[12].

### ❌ Don't: Keep Audio Track on Muted Videos

```astro
<!-- BAD - Silent audio track still uses bandwidth -->
<video autoplay loop muted playsinline>
  <source src="/videos/hero-with-audio.mp4" type="video/mp4">
</video>
```

**Why it's wrong:** Even silent or muted audio tracks consume approximately 20% of the file size unnecessarily[8].

### ✅ Instead: Strip Audio from Background Videos

```bash
# Remove audio with -an flag
ffmpeg -i input.mp4 -an -vcodec copy output.mp4
```

### ❌ Don't: Skip Format Fallbacks

```astro
<!-- BAD - Only works if browser supports WebM -->
<video autoplay loop muted playsinline>
  <source src="/videos/hero.webm" type="video/webm">
</video>
```

**Why it's wrong:** Not all browsers support WebM (though most modern ones do). Safari on older iOS devices may not play it[3].

### ✅ Instead: Provide Multiple Formats

```astro
<video autoplay loop muted playsinline>
  <source src="/videos/hero.webm" type="video/webm">
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
```

The browser picks the first format it supports.

### ❌ Don't: Rely Only on HTML Loop Attribute for Critical Animations

```astro
<!-- BAD - May have visible gaps on some browsers/videos -->
<video autoplay loop muted playsinline>
  <source src="/videos/short-clip.mp4" type="video/mp4">
</video>
```

**Why it's wrong:** The native `loop` attribute can have visible gaps (0.5s pause) on some browsers, especially with MP4 files or short clips[12].

### ✅ Instead: Use JavaScript `ended` Event for Seamless Loops

```astro
<video id="seamless-video" autoplay muted playsinline>
  <source src="/videos/hero.webm" type="video/webm">
  <source src="/videos/hero.mp4" type="video/mp4">
</video>

<script>
  const video = document.getElementById('seamless-video');
  if (video) {
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  }
</script>
```

This approach provides more control and can be smoother than the native loop attribute[12].

## Caveats

### Caveat 1: Mobile Autoplay is Unreliable

**Limitation:** Despite using `muted` and `playsinline`, some mobile browsers (especially older versions) may still refuse to autoplay videos. Android and iOS have strict policies about when autoplay is allowed.

**Impact:** Your background video may appear as a static poster image on some mobile devices, or require user interaction to start.

**Workaround:** Design your layout so it works beautifully with just the poster image. Consider using CSS media queries to show a high-quality static image on mobile instead of attempting video playback[7][11]:

```astro
<video class="hidden md:block" autoplay loop muted playsinline>
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
<img class="md:hidden" src="/images/hero-poster.jpg" alt="Hero" />
```

### Caveat 2: Truly Seamless Looping is Difficult

**Limitation:** HTML5 video looping has inherent challenges. There may be a brief pause (0.1-0.5 seconds) between loop iterations, especially with MP4 files or longer videos[12].

**Impact:** Your carefully designed "infinite" loop may have a visible hitch that breaks immersion.

**Workaround:**
1. Use WebM format which loops more smoothly than MP4 in Chrome/Firefox
2. Keep loops short (10-15 seconds) to minimize visible gaps
3. Design the video with matching first/last frames
4. Use the JavaScript `ended` event workaround shown in the anti-patterns section
5. Consider whether a true seamless loop is critical for your use case

### Caveat 3: No Automatic Optimization

**Limitation:** Unlike images, Astro provides no automatic video optimization, format conversion, or responsive serving. You must manually optimize every video file[1].

**Impact:** You're responsible for creating appropriately sized, compressed, and formatted videos. Mistakes here can severely impact performance.

**Workaround:** Establish a video optimization workflow using tools like FFmpeg or HandBrake. Create standard presets for different use cases (background videos, case study videos, etc.). Consider using a video CDN like Cloudflare Stream or Mux for advanced use cases[7][8].

### Caveat 4: Cache-Busting is Manual

**Limitation:** Videos in `public/` don't get cache-busting hashes like imported assets do. `/videos/hero.mp4` will always be `/videos/hero.mp4` even if you update it[5].

**Impact:** Users may see cached old versions of videos after you update them, unless they hard-refresh.

**Workaround:**
1. Version your video filenames manually: `hero-v2.mp4`, `hero-2024-12-05.mp4`
2. Use query strings: `/videos/hero.mp4?v=2` (though CDNs may ignore this)
3. If using ESM imports from `src/assets/`, Astro will add hashes, but you lose the simplicity of the public folder approach

### Caveat 5: Performance Monitoring is Your Responsibility

**Limitation:** Large video files can significantly impact Core Web Vitals (LCP, CLS) and page load times, but Astro won't warn you about this[8][11].

**Impact:** Your site's performance scores may suffer without you realizing the video is the cause.

**Workaround:** Regularly test with tools like Google PageSpeed Insights, GTmetrix, and WebPageTest. Monitor video file sizes and set hard limits (e.g., "no background video over 5MB"). Use lazy loading and IntersectionObserver for non-hero videos[7].

### Caveat 6: View Transitions Persistence Has Edge Cases

**Limitation:** While `transition:persist` works well for maintaining video state across page navigation, it requires the video element to have the same structure and attributes on both pages. CSS animations restart and iframes reload even with persist[6][10].

**Impact:** If the video element differs between pages, Astro will replace it rather than persist it, causing it to restart.

**Workaround:** Use a shared layout component for persistent videos. Keep the video element structure identical across pages that should maintain playback state. Test navigation thoroughly.

### Caveat 7: No Built-in Error Handling

**Limitation:** If a video file fails to load, the HTML5 video element provides minimal user feedback by default.

**Impact:** Users may see a blank space or broken icon without understanding what went wrong.

**Workaround:** Implement error handling with JavaScript:

```astro
<video id="hero-video" poster="/images/fallback.jpg">
  <source src="/videos/hero.mp4" type="video/mp4">
</video>

<script>
  const video = document.getElementById('hero-video');
  video.addEventListener('error', () => {
    console.error('Video failed to load');
    // Show fallback content
  });
</script>
```

### Caveat 8: SEO and Accessibility Considerations

**Limitation:** Search engines don't index video content the way they do text. Screen readers can't describe video content without proper semantic markup.

**Impact:** Background videos contribute nothing to SEO and may harm accessibility if they're the only way content is presented.

**Workaround:**
- Never put critical information only in video form
- Add descriptive text alternatives
- Use `aria-label` on video containers
- Consider adding a transcript or description for screen readers
- Remember that background videos are decorative—make sure your content works without them

## References

[1] [Imports reference - Astro Docs](https://docs.astro.build/en/guides/imports/) - Official documentation on how Astro handles different asset types and the difference between public and src imports

[2] [Project structure - Astro Docs](https://docs.astro.build/en/basics/project-structure/) - Explains the role of the public directory and when to use it versus src

[3] [Adding Videos to Keystatic Content with Astro - armno.in.th](https://armno.in.th/blog/adding-videos-to-keystatic-content-with-astro/) - Practical guide showing video implementation in Astro with format fallbacks

[4] [Astro build keeps a copy of the image and video assets - Stack Overflow](https://stackoverflow.com/questions/79727962/astro-build-keeps-a-copy-of-the-image-and-video-assets-in-the-root-of-the-dist-d) - Common issue explaining why importing from public creates duplicate files

[5] [Customize file names in the build output - Astro Docs](https://docs.astro.build/en/recipes/customizing-output-filenames/) - How Astro handles cache-busting hashes for ESM imported assets

[6] [View Transitions in Astro - SitePoint](https://www.sitepoint.com/view-transitions-in-astro/) - Comprehensive guide to Astro's View Transitions API and transition:persist

[7] [How to Optimize a Silent Background Video for Your Website's Hero Area - Design TLC](https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/) - Best practices for background video optimization including file sizes and formats

[8] [Video Optimization Guide: How to Optimize Videos for Web - Windmill Strategy](https://www.windmillstrategy.com/how-to-optimize-videos-for-web/) - Detailed guide on video compression, formats, and performance considerations

[9] [4 Do's and Don'ts When Using Video Autoplay in HTML - Cloudinary](https://cloudinary.com/guides/video-effects/video-autoplay-in-html) - Browser autoplay policies and required attributes (muted, playsinline)

[10] [Astro 2.10: Persistent State in View Transitions - Astro Blog](https://astro.build/blog/astro-2100/) - Official announcement of the transition:persist directive with video examples

[11] [Optimizing Background Videos for Fast Loading - SiteLint](https://www.sitelint.com/blog/optimizing-background-videos-for-fast-loading-tips-and-strategies-for-improved-user-experience/) - Performance strategies including mobile fallbacks and lazy loading

[12] [HTML5 Video Seamless Looping - Stack Overflow](https://stackoverflow.com/questions/20753861/html5-video-seamless-looping) - Common issues with video looping and workarounds using WebM format and JavaScript
