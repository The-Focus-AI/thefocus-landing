# X Focus

X Focus is a privacy-first Chrome extension prototype that filters X timelines
to selected work topics and accounts. It operates on posts already loaded in
the browser and does not call X APIs, collect browsing history, or send post
content to a server.

## Try it locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this `extensions/x-focus` directory.
5. Open or refresh [x.com](https://x.com).
6. Select the extension icon to configure topics and preferred accounts.

The in-page status control shows how many currently loaded posts were kept or
filtered. Use **Pause** to restore the unfiltered timeline immediately.

## Current behavior

- Keeps posts whose text matches a configured topic.
- Keeps every post from configured accounts.
- Hides or dims unrelated posts without deleting them from the page.
- Filters promoted posts when configured.
- Stores all preferences in `chrome.storage.local`.
- Reacts to X's dynamically loaded timeline and settings changes.
- Filters Home, Search, Explore, and List feeds while leaving profiles,
  conversations, and individual post pages unchanged.

Default topics are Tesla, SpaceX, Starship, Falcon, Cybertruck, Optimus, xAI,
and Neuralink. Defaults are only applied on first use and can be replaced from
the popup.

## Verify

The filtering engine uses Node's built-in test runner and has no dependencies:

```bash
cd extensions/x-focus
npm run check
```

## Limitations

- X can change its page markup without notice. The extension intentionally uses
  only a few stable accessibility and `data-testid` selectors, but those may
  still need maintenance.
- It filters posts that X has already chosen and loaded. It does not provide
  unattended feed access, historical search, notifications, or a daily digest.
- Matching is deterministic keyword/account filtering. Story clustering and
  summarization belong in a later opt-in version with an explicit privacy model.
- This prototype is intended for local evaluation and has not been packaged or
  reviewed for the Chrome Web Store.

## Privacy and permissions

The extension requests only Chrome's `storage` permission and page access on
`x.com` and `twitter.com`. No analytics or remote code are included.
