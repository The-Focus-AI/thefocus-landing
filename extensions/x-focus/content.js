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
  let settingsVersion = 0;
  let scheduleTimer;
  let toolbar;
  let currentUrl = location.href;
  const dirtyArticles = new Set();
  const signatures = new WeakMap();

  function extractPost(article) {
    const tweetText = Array.from(
      article.querySelectorAll('[data-testid="tweetText"]')
    )
      .map((element) => element.textContent || "")
      .join("\n");
    const userName = article.querySelector('[data-testid="User-Name"]');
    const handleMatch = userName?.textContent?.match(/@[A-Za-z0-9_]{1,15}/);
    const promoted = Array.from(article.querySelectorAll("span")).some(
      (element) =>
        element.children.length === 0 && element.textContent?.trim() === "Promoted"
    );

    return {
      text: tweetText,
      author: handleMatch?.[0] || "",
      promoted
    };
  }

  function getFilterTarget(article) {
    return article.closest('[data-testid="cellInnerDiv"]') || article;
  }

  function resetTarget(target) {
    target.classList.remove(HIDDEN_CLASS, DIMMED_CLASS, KEPT_CLASS);
    delete target.dataset.xFocusReason;
  }

  function applyDecision(article, decision) {
    const target = getFilterTarget(article);
    resetTarget(target);

    if (!settings.enabled) {
      return;
    }

    if (decision.keep) {
      target.classList.add(KEPT_CLASS);
      target.dataset.xFocusReason = decision.reason;
      return;
    }

    target.classList.add(
      settings.filterStyle === "dim" ? DIMMED_CLASS : HIDDEN_CLASS
    );
  }

  function filterTimeline() {
    scheduleTimer = undefined;

    if (location.href !== currentUrl) {
      currentUrl = location.href;
      settingsVersion++;
      document.querySelectorAll(ARTICLE_SELECTOR).forEach((article) => {
        dirtyArticles.add(article);
      });
    }

    if (!engine.isFilterablePath(location.pathname)) {
      document
        .querySelectorAll(`.${HIDDEN_CLASS}, .${DIMMED_CLASS}, .${KEPT_CLASS}`)
        .forEach(resetTarget);
      dirtyArticles.clear();
      updateToolbar({ kept: 0, filtered: 0, total: 0 });
      return;
    }

    for (const article of dirtyArticles) {
      if (!article.isConnected) {
        continue;
      }

      const post = extractPost(article);
      const signature = JSON.stringify([
        settingsVersion,
        post.text,
        post.author,
        post.promoted
      ]);
      if (signatures.get(article) === signature) {
        continue;
      }

      signatures.set(article, signature);
      applyDecision(article, engine.classifyPost(post, settings));
    }
    dirtyArticles.clear();

    const articles = Array.from(document.querySelectorAll(ARTICLE_SELECTOR));
    const filtered = articles.filter((article) => {
      const target = getFilterTarget(article);
      return target.classList.contains(HIDDEN_CLASS) ||
        target.classList.contains(DIMMED_CLASS);
    }).length;

    updateToolbar({
      kept: articles.length - filtered,
      filtered,
      total: articles.length
    });
  }

  function collectArticles(node) {
    const element =
      node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    if (!element) {
      return;
    }

    if (element.matches?.(ARTICLE_SELECTOR)) {
      dirtyArticles.add(element);
    }
    const parentArticle = element.closest?.(ARTICLE_SELECTOR);
    if (parentArticle) {
      dirtyArticles.add(parentArticle);
    }
    element.querySelectorAll?.(ARTICLE_SELECTOR).forEach((article) => {
      dirtyArticles.add(article);
    });
  }

  function scheduleFilter(scanAll = false) {
    if (scanAll) {
      document.querySelectorAll(ARTICLE_SELECTOR).forEach((article) => {
        dirtyArticles.add(article);
      });
    }

    if (scheduleTimer) {
      return;
    }

    scheduleTimer = window.setTimeout(filterTimeline, 80);
  }

  function updateToolbar(stats) {
    if (!toolbar) {
      toolbar = createToolbar();
    }

    const { host, root } = toolbar;
    const status = root.querySelector("[data-status]");
    const button = root.querySelector("button");
    const statusText = settings.enabled
      ? `${stats.kept} useful · ${stats.filtered} filtered`
      : "Focus mode paused";
    const buttonText = settings.enabled ? "Pause" : "Resume";

    host.hidden = stats.total === 0;
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
    const root = host.attachShadow({ mode: "closed" });

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
      <div class="bar">
        <span class="mark" aria-hidden="true"></span>
        <span data-status role="status">X Focus active</span>
        <button type="button">Pause</button>
      </div>
    `;

    root.querySelector("button").addEventListener("click", async (event) => {
      if (!event.isTrusted) {
        return;
      }
      settings = { ...settings, enabled: !settings.enabled };
      await chrome.storage.local.set({ [STORAGE_KEY]: settings });
      settingsVersion++;
      scheduleFilter(true);
    });

    document.documentElement.append(host);
    return { host, root };
  }

  async function loadSettings() {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    settings = engine.normalizeSettings(stored[STORAGE_KEY]);

    if (!stored[STORAGE_KEY]) {
      await chrome.storage.local.set({ [STORAGE_KEY]: settings });
    }
  }

  function startObserver() {
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        collectArticles(record.target);
        record.addedNodes.forEach(collectArticles);
      }
      scheduleFilter();
    });
    observer.observe(document.documentElement, {
      characterData: true,
      childList: true,
      subtree: true
    });

    scheduleFilter(true);
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[STORAGE_KEY]) {
      return;
    }

    settings = engine.normalizeSettings(changes[STORAGE_KEY].newValue);
    settingsVersion++;
    scheduleFilter(true);
  });

  loadSettings()
    .catch(() => {})
    .finally(startObserver);
})();
