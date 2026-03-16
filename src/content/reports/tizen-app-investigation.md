---
title: Tizen App Investigation
date: 2026-03-07
author: Will Schenk
titlepage: true
titlepage-logo: ../assets/thefocusai.png
colorlinks: ff0d8a
linkcolor: blue
urlcolor: blue
listings-no-page-break: true
code-block-font-size: \scriptsize
logo-width: 100mm
titlepage-rule-color: "360049"
toc: true
toc-own-page: true
header-right: March 2026
table-use-row-colors: true
description: Architectural patterns across 37 extracted Samsung Smart TV applications, covering hosting models, frontend stacks, authentication, background services, DRM, and Samsung-specific platform behavior.
subtitle: Architectural patterns across 37 extracted Samsung Smart TV applications, covering hosting models, frontend stacks, authentication, background services, DRM, and Samsung-specific platform behavior.
mainfont: Iowan Old Style
sansfont: Helvetica Neue Bold
monofont: Menlo
---

# Executive Summary

This report catalogs 37 extracted applications from a Samsung Smart TV and groups them by delivery model, frontend stack, authentication, background-service behavior, media strategy, and Samsung-specific platform integration.

The key takeaway is that the Tizen ecosystem is less a collection of standalone apps and more a layered delivery system: thin local launchers, remote-hosted interfaces, Samsung service hooks, and native system daemons working together to create the TV experience.

Key findings:

- **Web delivery dominates.** Of the 37 apps reviewed, 24 are web-based local or hybrid packages and 10 are primarily hosted wrappers that redirect to remote content.
- **Samsung platform hooks are everywhere.** Prelaunch, Eden home screen services, WARP allowlists, WebAPI injection, and hidden `nodisplay` services show up repeatedly.
- **Streaming apps rely on background agents.** Continue-watching, preview tiles, remote logging, and service workers are common infrastructure across entertainment apps.
- **Trust and identity are layered.** The platform mixes Samsung SSO, OAuth device flows, certificate-based trust, secure storage, and even hardcoded partner credentials depending on the app.

# Scope

This repository contains extracted Tizen app packages pulled from a Samsung Smart TV. Each directory represents a different application installed on the device, ranging from major streaming services to Samsung's own system utilities.

Tizen apps in this dataset fall into three shapes:

- **Hosted App**: The TV launches a minimal local wrapper, then navigates to a remote URL hosted on the app provider's servers. The actual UI and logic live in the cloud.
- **Tizen Web App**: The app runs entirely, or primarily, from locally bundled HTML, CSS, and JavaScript on the TV. Some use a hybrid approach where a local shell loads remote content at runtime.
- **Native Application**: Compiled binaries running via Samsung's native app frameworks (C/C++ or .NET). Not web-based.

Extracted app directories live in `projects/`. The `docs/` directory contains a summary file for each app.

# Portfolio Breakdown

## Breakdown by Shape

| Shape | Count | Apps |
| --- | --- | --- |
| **Tizen Web App** | 20 | `2025.SmartTV.Rose`, `Ad_Player`, `Amazon_Alexa`, `AriaVideoBGService`, `Brainrot_Merge`, `cmsWebApp`, `DeviceHomeTV`, `echelon`, `Google_Cast_Settings`, `Peacock_TV`, `Privacy_Choices`, `QVC__and_HSN_`, `Samsung_Promotion`, `Samsung_TV_Plus`, `The_Six`, `the_weather_channel`, `Tubi_-_Free_Movies_____TV`, `User_Guide`, `Volley_Games_-_Song_Quiz_and_Jeopardy_`, `WebAccountExtension` |
| **Tizen Web App (hybrid)** | 4 | `Angel_Studios`, `newsmax_tv`, `Spotify_-_Music_and_Podcasts`, `teton_gravity_research` |
| **Hosted App** | 10 | `AMC_`, `cbs_news`, `Disney_`, `disney_plus`, `ESPN`, `Hulu`, `PBS_KIDS_Video`, `Sling_TV`, `Xbox`, `YouTube` |
| **Native Application** | 3 | `apple_music`, `netflix`, `bixby_integration` (suite of 4 services) |
| **Total** | **37** |  |

# Strategies Across Apps

## Frontend Frameworks and Build Tools

| Framework / Tool | Apps |
| --- | --- |
| **React + Webpack** | Privacy_Choices (CRA/Webpack 4), Samsung_Promotion, Samsung_TV_Plus, Peacock_TV |
| **Next.js 13+** | User_Guide (React Server Components, full offline) |
| **Vite** (hash-named assets) | cmsWebApp |
| **Canvas / JAM engine** | The_Six (2D/3D game, custom JS animation middleware) |
| **jQuery** | DeviceHomeTV, Ad_Player |
| **Single minified bundle** | Brainrot_Merge, Volley_Games, YouTube, ESPN (all logic in one JS file) |
| **Samsung Aria + Luna framework** | apple_music (native host running proprietary JS engine) |
| **Netflix Gibbon engine** | netflix (~48MB native C++ media/rendering engine) |
| **Bixby C SDK + LWE** | bixby_integration/capsuleviewer (native C host + Lightweight Web Engine iframe renderer) |
| **.NET Core 2.0 / Xamarin** | bixby_integration/promotion |

## Hosting and Boot Strategies

| Pattern | Apps |
| --- | --- |
| **Simple redirect** (thin local wrapper -> remote URL) | CBS News, ESPN, Hulu, PBS Kids, Sling TV |
| **Version-resolved redirect** (fetch `currentVersion.json` at runtime) | `Disney_`, `disney_plus` resolve a versioned CDN URL on each launch |
| **Canary / A/B rollout** (random dice roll stored in localStorage) | `Disney_`, `disney_plus` use rollout percentage to control which CDN version loads |
| **Environment-based redirect** (ENV var -> prod/staging/alpha) | Tubi uses `main.js` to switch between `ott-samsung.tubitv.com` and development endpoints |
| **Locale-resolved URL** (TV system language -> remote path) | Xbox maps 33 system languages to locale-specific `xbox.com` paths |
| **Iframe-embedded remote UI** (local shell hosts remote iframe) | Spotify points an iframe at `api-partner.spotify.com/tvapp?platform=tizen-ng` |
| **CDN bootstrap** (local HTML only loads remote bundles) | newsmax_tv (24iMedia CDN delivers all CSS/JS at runtime), teton_gravity_research (MAZ CDN delivers all JS/CSS/config at runtime) |
| **Hybrid local + remote** (local shell fetches remote JS bundle) | Angel_Studios ships a local `index.html` but loads `https://ott.angel.com/tizen/assets/index-legacy.js` remotely |
| **Fully offline** (no network calls) | `2025.SmartTV.Rose`, `User_Guide` |

## Splash Screens

| Approach | Apps |
| --- | --- |
| **Animated logo fade** | Angel_Studios (logo fade-out during startup) |
| **Static splash image** | Tubi (`tubi-splash-screen.jpg`), the_weather_channel (`twcsplash.png`) |
| **Splash screen directory** | `Disney_`, `disney_plus` (`splash-v04/` assets) |
| **Waiting screen via prelaunch** | Samsung_TV_Plus (prelaunch waiting screen while React loads) |
| **.NET splash screen** | bixby_integration/promotion (`splash-screen-display="true"`) |
| **Loading iframe with spinner** | bixby_integration/capsuleviewer (loading container with spinner image before capsule renders) |

## Authentication Mechanisms

| Mechanism | Apps |
| --- | --- |
| **Samsung SSO** (platform/partner/public tiers) | WebAccountExtension, cmsWebApp, the_weather_channel, Samsung_TV_Plus, Google_Cast_Settings, DeviceHomeTV, bixby_integration (prov, context-client, promotion) |
| **OAuth 2.0 device code flow** | Xbox uses `DeviceCodeFlowHandler.js` and `TokenManager.js` to manage Microsoft OAuth tokens with refresh |
| **Hardcoded base64 credentials** | Spotify stores base64-encoded Tizen/Spotify partnership credentials in `auth.txt` |
| **Tizen DNA certificate** (platform-level signing) | apple_music, bixby_integration (prov, context-client), netflix |
| **Secure storage + RSA-SHA512 auth module** | apple_music uses `secure_storage_config.json` and a signed credentials module |
| **PIN code pairing** (60s expiry + JSEncrypt) | DeviceHomeTV uses a QR code plus encrypted PIN for remote-control pairing |

## Consent and Privacy

| Mechanism | Apps |
| --- | --- |
| **GDPR consent datasets** (per-region opt-in flows) | apple_music uses `onboardingkit-js` with per-region datasets |
| **OneTrust consent management** | CBS News (OneTrust domain referenced in WARP config) |
| **Dedicated consent/privacy app** | Privacy_Choices, cmsWebApp are system-level apps hidden from the launcher |
| **Terms of Service flow** | Google_Cast_Settings uses conditional pre/post-TOS UI with `pre_tos.svg` and `post_tos.svg` |

## Background Services and Continue Watching

Nearly every streaming app ships a background service layer. Common patterns include:

| Pattern | Apps |
| --- | --- |
| **Continue watching service** | `AMC_` (`continueWatchingService.js`), Angel_Studios, AriaVideoBGService (`cw.js`), Peacock_TV (`cw_service.js`) |
| **Eden / home screen preview tile service** | `AMC_`, Sling_TV (`preview/bgservice.js`), QVC, Peacock_TV (`eden_service.js`), Samsung_Promotion (`edenservice/`), CBS News, `Disney_`, Hulu, PBS Kids, AriaVideoBGService |
| **Remote logging service** | `AMC_` (`remoteLogger.js`) |
| **Service worker precaching** | Samsung_TV_Plus (Workbox, precaches 200+ assets), Privacy_Choices |
| **Scheduled background tasks** | Brainrot_Merge (alarm privileges), Samsung_Promotion (cache with 1-day + 0-2h jitter) |
| **Boot-persistent daemon** | bixby_integration/prov (`on-boot=true`, `auto-restart=true`) |
| **vconf event listener** | bixby_integration/context-client listens to nine OS-level events for Bluetooth, SSO, source changes, and related state |

## DRM and Media

| Strategy | Apps |
| --- | --- |
| **Widevine / Tizen DRM** | ESPN, Hulu, `Disney_`, `disney_plus`, Peacock_TV, QVC, Sling_TV (Bitmovin player), Tubi, Xbox |
| **iTunes DRM** (bundled locally) | apple_music |
| **Netflix Gibbon** (custom DRM/playback engine) | netflix |
| **HLS adaptive streaming** | apple_music (three HLS implementation variants: adopted, candidate, control) |
| **DIAL casting protocol** | netflix, YouTube for second-screen pairing and social sharing |
| **Samsung Cobalt browser engine** | YouTube via `com.samsung.tv.cobalt` |

## Voice Control Integration

| Integration | Apps |
| --- | --- |
| **Bixby voice control** | Samsung_TV_Plus, Peacock_TV, User_Guide, Spotify, apple_music (SkipBackward/Forward, SetPlayPosition, TrackPrev/Next, Restart), bixby_integration (native SDK + 40+ AOV command mappings) |
| **Amazon Alexa** | Amazon_Alexa defers to native Samsung `com.samsung.tv.alexa-fullscreen-app` |

## Analytics and Error Monitoring

| Tool | Apps |
| --- | --- |
| **New Relic** | Peacock_TV (`logger-nr.transport.js`), Sling_TV |
| **Sentry** | Tubi (DSN in `main.js`), Xbox, Brainrot_Merge (crash logs) |
| **Datadog / Mux / Rudderstack / Litix** | Angel_Studios |
| **Conviva** | Peacock_TV, QVC |
| **Kochava** | Sling_TV |
| **DoubleClick / comScore / Adobe** | CBS News (`scorecardresearch.com`, `omtrdc.net`, `doubleclick.net`) |
| **Google Analytics / GTM** | QVC, teton_gravity_research (UA + GA4 + GTM + Firebase) |
| **WebSocket live logger** | The_Six (`wsslogger.js`) |
| **Crash log to `/tmp`** | Brainrot_Merge (`/tmp/brd_service_crash*<timestamp>.log`) |
| **LaunchDarkly feature flags** | QVC |

## Localization

| Scale | Apps |
| --- | --- |
| **95 language packs** | Samsung_TV_Plus |
| **91+ languages** | cmsWebApp |
| **89 languages** | WebAccountExtension |
| **59+ languages** | Google_Cast_Settings |
| **50+ locales** | apple_music, Ad_Player, bixby_integration/capsuleviewer binary assets |
| **28 error page languages** | Xbox |
| **Multi-platform font sets** (OneUI 4.0-7.0) | The_Six ships fonts for four TV firmware generations |

## Obfuscation and Code Protection

| Technique | Apps |
| --- | --- |
| **Heavy JS obfuscation** (variable mangling, string encoding, anti-debugging) | Brainrot_Merge in both main bundle and service code |
| **Samsung `.spm` secure packaging** | `2025.SmartTV.Rose` uses proprietary Samsung asset protection |
| **Tizen DNA platform signing** | apple_music, bixby_integration (prov, context-client) use elevated system trust |

## Multi-Platform Builds

| Strategy | Apps |
| --- | --- |
| **Runtime platform detection** (Tizen / WPE / VIZIO) | the_weather_channel ships a single bundle that detects TV OS and loads platform-specific APIs |
| **Device-specific capsule bundles** | bixby_integration/capsuleviewer provides separate webpack bundles for `bixby-tv`, `bixby-mobile`, `bixby-watch`, and `default` |
| **Multi-environment icons** | ESPN ships five icon variants (base, dev, QA, shared-dev, stage) |

## Samsung TV-Specific Platform Patterns

| Pattern | Description | Apps |
| --- | --- | --- |
| **Prelaunch** | App pre-initializes before the user opens it for faster startup | Amazon_Alexa, `AMC_`, `Disney_`, Hulu, QVC, Samsung_Promotion, Samsung_TV_Plus |
| **Eden home screen preview** | Background service populates Samsung's home screen tiles | Most streaming apps |
| **WARP network allowlist** | Tizen Content Security Policy extension for network access | All hosted and hybrid apps |
| **`nodisplay`** | App runs as a headless service and never appears in the launcher | Ad_Player, cmsWebApp, WebAccountExtension, bixby_integration services |
| **Samsung WebAPIs injection** | `$WEBAPIS/webapis/webapis.js` provides TV-specific API access | Ad_Player, Samsung_TV_Plus, Volley_Games, newsmax_tv |
| **Samsung Gaming Hub integration** | `bgservice` registers with the Gaming Hub ecosystem | The_Six (`rpgamehub.js`), Xbox (`GamingHubManager.js`) |
| **Built-in app flag** | Firmware-bundled and not uninstallable by the user | All bixby_integration apps, Ad_Player |
| **B2B / Hospitality mode** | Detects commercial or hotel TV context and adjusts behavior | Google_Cast_Settings |

# App Summaries

| App | Shape | Hosted URL |
| --- | --- | --- |
| `2025.SmartTV.Rose` | Tizen Web App | N/A |
| `Ad_Player` | Tizen Web App | N/A |
| `Amazon_Alexa` | Tizen Web App | N/A |
| `AMC_` | Hosted App | `https://amcn-smart-tv-app.cds.amcn.com/amcn/tizen/amcplus/v1/index.html` |
| `Angel_Studios` | Tizen Web App (hybrid) | N/A |
| `apple_music` | Native Application | N/A |
| `AriaVideoBGService` | Tizen Web App | N/A |
| `bixby_integration` | Native App Suite | N/A |
| `Brainrot_Merge` | Tizen Web App | N/A |
| `cbs_news` | Hosted App | `https://ott.cbsnews.com/tizen-app/v3/index.html` |
| `cmsWebApp` | Tizen Web App | N/A |
| `DeviceHomeTV` | Tizen Web App | N/A |
| `Disney_` | Hosted App | `https://cd-dmgz.bamgrid.com/bbd/prod/[version]/samsung_tv_tizen.html` |
| `echelon` | Tizen Web App | N/A |
| `disney_plus` | Hosted App | `https://cd-dmgz.bamgrid.com/bbd/prod/[version]/samsung_tv_tizen.html` |
| `ESPN` | Hosted App | `https://a.espncdn.com/connected-devices/espn-samsung-tv-tizen/samsung_tv_es5/index.html` |
| `Google_Cast_Settings` | Tizen Web App | N/A |
| `Hulu` | Hosted App | `https://tizenbbd.app.hulu.com/livingroom/tizenbbd/1/index.html` |
| `netflix` | Native Application | N/A |
| `newsmax_tv` | Tizen Web App (hybrid) | N/A |
| `PBS_KIDS_Video` | Hosted App | `https://otter-tizen-kids-prod.pbs.org` |
| `Peacock_TV` | Tizen Web App | N/A |
| `Privacy_Choices` | Tizen Web App | N/A |
| `QVC__and_HSN_` | Tizen Web App | N/A |
| `Samsung_Promotion` | Tizen Web App | N/A |
| `Samsung_TV_Plus` | Tizen Web App | N/A |
| `Sling_TV` | Hosted App | `https://webapp.movetv.com/samsung/index.html?env=production` |
| `Spotify_-_Music_and_Podcasts` | Tizen Web App (hybrid) | N/A |
| `The_Six` | Tizen Web App | N/A |
| `teton_gravity_research` | Tizen Web App (hybrid) | `https://teton-gravity-samsung.maz.tv/` |
| `the_weather_channel` | Tizen Web App | N/A |
| `Tubi_-_Free_Movies_____TV` | Tizen Web App | N/A |
| `User_Guide` | Tizen Web App | N/A |
| `Volley_Games_-_Song_Quiz_and_Jeopardy_` | Tizen Web App | N/A |
| `WebAccountExtension` | Tizen Web App | N/A |
| `Xbox` | Hosted App | `www.xbox.com` (locale-resolved at runtime) |
| `YouTube` | Hosted App | `https://www.youtube.com/tv` |

# Extraction Scripts

These scripts use Samsung's [`sdb` tool](https://developer.samsung.com/smarttv/develop/tools/smart-development-bridge.html) (Smart Development Bridge) to communicate with a TV over the network. The TV must be connected and `sdb` must be available in `PATH`.

## `extract_tizen_apps.sh`

The main extraction script. It discovers all Tizen web apps on the connected TV, pulls their `.tmg` squashfs images, and extracts them into named directories in the current folder.

```bash
./extract_tizen_apps.sh
./extract_tizen_apps.sh --dry-run
```

- Skips any app whose directory already exists locally
- Requires `unsquashfs` from the `squashfs-tools` package to extract `.tmg` files
- Prints `PULL`, `EXTRACT`, `SKIP`, or `FAILED` status for each app
- Internally runs `find_tizen_apps.sh` on the TV to get the app list

## `pull_tizen_app.sh`

Pulls a single app by its Tizen app ID into a local directory. Use this when you know the specific app ID and want to grab just that one app.

```bash
./pull_tizen_app.sh <app_id> <local_dir>

# Example:
./pull_tizen_app.sh 9Ur5IzDKqV.TizenYouTube YouTube
```

It copies the app's `res/` directory from `/opt/usr/apps/<app_id>/res/` on the TV into `./<local_dir>/`.

## `find_tizen_apps.sh`

This shell script is intended to run on the TV, not locally. It scans `/opt/usr/apps/` for installed Tizen web apps and outputs tab-separated lines of `SAFE_NAME<TAB>TMG_PATH` for each one found.

```bash
sdb shell < find_tizen_apps.sh
```

- Only considers directories with exactly 10-character names, matching the Tizen app ID format
- Requires a `res/config.xml` and at least one `.tmg` file to be included
- Extracts the app's display name from `config.xml` and sanitizes it for use as a directory name
- Used internally by `extract_tizen_apps.sh`

## `find_no_config.sh`

This shell script is also intended to run on the TV. It is similar to `find_tizen_apps.sh` but lists apps that do not have a `res/config.xml`, which is useful for finding native apps or unusual packages that the main extraction script would skip.

```bash
sdb shell < find_no_config.sh

# or capture to a file:
sdb shell < find_no_config.sh > no_config.txt
```

The results of a prior run are saved in `no_config.txt`.

# Notes on the `docs/` Directory

The `docs/` directory contains the individual project summary files for each extracted application referenced in this report.
