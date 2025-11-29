---
title: "Voice-First AI for 50M+ Smart TVs: Building Perplexity for Samsung"
industry: Consumer Electronics / AI
client: Perplexity AI
year: "2025"
timeline: "12 weeks"
services: "Strategy + Development"
description: We built a voice-first AI assistant for Samsung Smart TVs that lets users ask questions naturally and get real-time streaming answers — navigating entirely with a TV remote and speaking through their phone or Bluetooth microphone.
results: |-
  - Deployed to 50M+ Samsung Smart TVs globally
  - Sub-2-second voice recognition latency
  - 12-week timeline from kickoff to Samsung QA approval
  - Multi-language support (English, German, Korean) with automatic dialect detection
tech_stack: "SvelteKit, TypeScript, Tailwind CSS, OpenAI Realtime API, Tizen SDK, Vite"
testimonial: "Focus.AI understood the unique constraints of TV development immediately. They delivered a production-ready app that passed Samsung's rigorous QA process on the first major submission."
testimonial_person: "Product Team"
testimonial_company: "Perplexity AI"
published: true
image: perplexity_wide.png
---

### The Challenge

Perplexity AI wanted to bring their AI-powered answer engine to the living room. Samsung Smart TVs, running on the Tizen platform, reach over 50 million households globally — a massive opportunity to put conversational AI where families gather.

But TVs aren't phones. There's no keyboard. No touchscreen. No mouse. Users navigate with a remote control's directional pad, and typing a question using an on-screen keyboard takes forever. The experience had to be fundamentally different.

**The core constraints:**

1. **Voice-first interaction** — Users should be able to press one button and speak their question naturally
2. **Remote navigation** — Every element must be accessible via up/down/left/right arrows with clear visual focus states
3. **10-foot UI** — Text and controls must be readable from across a living room
4. **Limited hardware** — Smart TVs have significantly less processing power than phones or laptops
5. **Samsung QA certification** — The app had to pass Samsung's rigorous certification process covering 100+ test cases

**What Perplexity needed:** A team that understood both AI integration and the unique constraints of embedded TV development.

### Our Approach

We began with a week-long discovery phase, studying Tizen's capabilities and limitations. Samsung TVs support web technologies through a customized Chromium engine, but with important restrictions: no Node.js runtime, limited memory, and strict security policies around microphone access.

**The key insight:** Voice input on a TV comes from external sources — the Samsung SmartThings app on a user's phone, or a Bluetooth microphone. The Tizen platform provides device APIs to access these inputs, but they require careful permission handling and fallback strategies.

We designed the architecture around three principles:

1. **Progressive enhancement** — Start with keyboard input as the baseline, layer voice on top for users with compatible microphones
2. **Streaming everything** — AI responses stream word-by-word, giving immediate feedback even on slower connections
3. **Focus management as a first-class concern** — Build a complete spatial navigation system before any feature work

### Technical Implementation

#### Custom Focus Navigation System

TV remote navigation is fundamentally different from web accessibility. Users expect:
- Press "right" → focus moves to the next logical element on the right
- Press "down" → focus moves to an element below, even if it's in a different container
- Press "back" → return to the previous context or exit the modal

We built a custom focus management system from scratch:

```
Focus Architecture:
├── Page Registration (usePageFocus hook)
│   ├── Default focus element per page
│   ├── Back button behavior handlers
│   └── Focus restoration on navigation
├── Element Registration (FocusableElement components)
│   ├── Directional navigation declarations
│   ├── Visual focus ring styling
│   └── Keyboard event handling
└── Modal Layer Management
    ├── Focus trapping within modals
    ├── Stacked modal support
    └── Automatic focus restoration on close
```

Every focusable element declares its spatial neighbors: `up="settings-button" down="mic-button" left="back-button"`. This explicit mapping ensures predictable navigation even when the DOM structure changes dynamically.

#### Real-Time Voice Recognition

For voice input, we integrated OpenAI's Realtime API for speech-to-text. The challenge: handling the unique microphone sources available on Samsung TVs.

```
Microphone Priority:
1. Samsung Remote Microphone (via SmartThings app)
2. Samsung Bluetooth Microphone
3. Built-in TV microphone (limited availability)
4. Fallback: On-screen keyboard
```

The system automatically detects available devices, requests appropriate permissions, and provides clear user feedback throughout. When the user speaks, we show a real-time waveform visualization and display interim transcriptions as they're processed.

Critical implementation details:

- **Ephemeral key authentication** — Voice sessions use short-lived tokens that refresh automatically
- **Graceful degradation** — If the microphone fails mid-session, we seamlessly switch to keyboard mode
- **Timeout handling** — Sessions automatically close after one minute of inactivity to preserve resources

#### Streaming AI Responses

Perplexity's API streams responses as Server-Sent Events. On a TV, where users are watching from 10 feet away, this streaming behavior is even more important — they can start reading immediately rather than waiting for a complete response.

We implemented:

- **Chunk timeout detection** — If no data arrives for 10 seconds, we surface an error rather than leaving users waiting indefinitely
- **Abort controller integration** — Users can press "back" mid-response to cancel and ask a different question
- **Citation deduplication** — Source URLs are deduplicated by root domain for cleaner display
- **Markdown rendering** — Responses render as formatted text with proper heading hierarchy

#### Internationalization

Samsung required support for multiple languages from launch. We built a complete i18n system using svelte-i18n:

- **Language detection** — The app detects the TV's system language and maps it to supported locales
- **CMS-driven content** — Promotional materials and onboarding copy are fetched from a remote CMS, allowing updates without app redeployment
- **Regional dialect support** — Korean (ko-KR) and German (de-DE) handle regional variations

The language system also controls the voice recognition model — sending the correct language code to OpenAI ensures accurate transcription across languages.

### What Made This Work

**1. TV-first architecture.** We didn't adapt a mobile or web app to TV. We built for the 10-foot experience from day one: large touch targets, spatial navigation, voice as the primary input.

**2. Rigorous focus testing.** We tested every screen flow with only arrow keys and the Enter button before any mouse interaction. Focus bugs that would be minor annoyances on web become app-breaking on TV.

**3. Defensive error handling.** TVs can't "just refresh the page." Every error state has a recovery path, every timeout has user-facing feedback, every microphone failure gracefully falls back to keyboard.

**4. Samsung QA preparation.** We studied Samsung's certification requirements early and built compliance into our architecture — proper privilege declarations, accessibility labels, memory management patterns.

### Results

The app passed Samsung's QA certification and launched globally:

- **50M+ potential users** across Samsung's Smart TV install base
- **Sub-2-second latency** from button press to voice recognition start
- **Multi-language launch** with English, German, and Korean support
- **98%+ crash-free sessions** across diverse hardware generations
- **Continuous deployment pipeline** with separate release, develop, and test channels

The application demonstrates that conversational AI can work beautifully on non-traditional platforms when designed for the medium's unique constraints.

### Technical Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | SvelteKit 2, TypeScript, Tailwind CSS | TV-optimized UI with custom focus system |
| **Voice Recognition** | OpenAI Realtime API | Real-time speech-to-text with streaming |
| **AI Integration** | Perplexity API, Server-Sent Events | Streaming AI responses with citations |
| **Platform** | Tizen SDK, Tizen Web APIs | Samsung TV integration, microphone access |
| **Build System** | Vite, Static Adapter | Optimized bundle for TV deployment |
| **Testing** | Vitest, JSDOM | Component and integration testing |
| **Deployment** | Tizen CLI, Custom Release Pipeline | Multi-channel releases (release/develop/test) |
