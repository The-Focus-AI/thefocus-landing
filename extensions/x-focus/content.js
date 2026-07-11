(function startXFocus() {
  "use strict";

  const engine = globalThis.XFocusEngine;
  if (!engine) {
    return;
  }

  const STORAGE_KEY = "xFocusSettings";
  const ARTICLE_SELECTOR = 'article[data-testid="tweet"]';
  const HIDDEN_CLASS = "x-focus-filtered";
  const DIMMED_CLASS = "x-focus-dimmed";
  const KEPT_CLASS = "x-focus-kept";
  const TOOLBAR_ID = "x-focus-toolbar";

  let settings = engine.normalizeSettings();
  let scheduled = false;
  let toolbar;

  function extractPost(article) {
    const tweetText = article.querySelector('[data-testid="tweetText"]');
    const userName = article.querySelector('[data-testid="User-Name"]');
    const handleMatch = userName?.textContent?.match(/@[A-Za-z0-9_]{1,15}/);
    const articleText = article.innerText || "";

    return {
      text: tweetText?.textContent || articleText,
      author: handleMatch?.[0] || "",
      promoted:
        Boolean(article.querySelector('[data-testid="placementTracking"]')) ||
        /(^|\n)Promoted(\n|$)/i.test(articleText)
    };
  }

  function resetArticle(article) {
    article.classList.remove(HIDDEN_CLASS, DIMMED_CLASS, KEPT_CLASS);
    delete article.dataset.xFocusReason;
  }

  function applyDecision(article, decision) {
    resetArticle(article);

    if (!settings.enabled) {
      return;
    }

    if (decision.keep) {
      article.classList.add(KEPT_CLASS);
      article.dataset.xFocusReason = decision.reason;
      return;
    }

    article.classList.add(
      settings.filterStyle === "dim" ? DIMMED_CLASS : HIDDEN_CLASS
    );
  }

  function filterTimeline() {
    scheduled = false;
    const articles = Array.from(document.querySelectorAll(ARTICLE_SELECTOR));
    let kept = 0;
    let filtered = 0;

    for (const article of articles) {
      const decision = engine.classifyPost(extractPost(article), settings);
      applyDecision(article, decision);
      decision.keep ? kept++ : filtered++;
    }

    updateToolbar({ kept, filtered, total: articles.length });
  }

  function scheduleFilter() {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(filterTimeline);
  }

  function updateToolbar(stats) {
    if (!toolbar) {
      toolbar = createToolbar();
    }

    const root = toolbar.shadowRoot;
    const status = root.querySelector("[data-status]");
    const button = root.querySelector("button");
    const statusText = settings.enabled
      ? `${stats.kept} useful · ${stats.filtered} filtered`
      : "Focus mode paused";
    const buttonText = settings.enabled ? "Pause" : "Resume";

    toolbar.hidden = stats.total === 0;
    if (status.textContent !== statusText) {
      status.textContent = statusText;
    }
    if (button.textContent !== buttonText) {
      button.textContent = buttonText;
    }
    button.setAttribute(
      "aria-label",
      settings.enabled ? "Pause X Focus filtering" : "Resume X Focus filtering"
    );
  }

  function createToolbar() {
    const host = document.createElement("div");
    host.id = TOOLBAR_ID;
    const root = host.attachShadow({ mode: "open" });

    root.innerHTML = `
      <style>
        :host {
          all: initial;
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 2147483647;
          font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px 9px 13px;
          color: #f5f5f0;
          background: rgba(17, 24, 26, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.28);
          font-size: 12px;
          line-height: 1;
        }
        .mark {
          width: 7px;
          height: 7px;
          background: #ef8354;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(239, 131, 84, 0.18);
        }
        button {
          appearance: none;
          padding: 6px 9px;
          color: #f5f5f0;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          font: inherit;
          cursor: pointer;
        }
        button:hover,
        button:focus-visible {
          border-color: #ef8354;
          outline: none;
        }
      </style>
      <div class="bar" role="status" aria-live="polite">
        <span class="mark" aria-hidden="true"></span>
        <span data-status>X Focus active</span>
        <button type="button">Pause</button>
      </div>
    `;

    root.querySelector("button").addEventListener("click", async () => {
      settings = { ...settings, enabled: !settings.enabled };
      await chrome.storage.local.set({ [STORAGE_KEY]: settings });
      scheduleFilter();
    });

    document.documentElement.append(host);
    return host;
  }

  async function loadSettings() {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    settings = engine.normalizeSettings(stored[STORAGE_KEY]);

    if (!stored[STORAGE_KEY]) {
      await chrome.storage.local.set({ [STORAGE_KEY]: settings });
    }

    scheduleFilter();
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[STORAGE_KEY]) {
      return;
    }

    settings = engine.normalizeSettings(changes[STORAGE_KEY].newValue);
    scheduleFilter();
  });

  const observer = new MutationObserver(scheduleFilter);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  loadSettings().catch(() => {
    scheduleFilter();
  });
})();
