(function initializeXFocusEngine(root, factory) {
  const engine = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = engine;
  }

  root.XFocusEngine = engine;
})(typeof globalThis !== "undefined" ? globalThis : this, function createEngine() {
  "use strict";

  const DEFAULT_SETTINGS = Object.freeze({
    enabled: true,
    topics: [
      "Tesla",
      "SpaceX",
      "Starship",
      "Falcon",
      "Cybertruck",
      "Optimus",
      "xAI",
      "Neuralink"
    ],
    accounts: ["Tesla", "SpaceX", "elonmusk"],
    filterStyle: "hide",
    hidePromoted: true
  });

  function parseList(value) {
    const values = Array.isArray(value)
      ? value
      : String(value || "").split(/[\n,]+/);

    return Array.from(
      new Set(values.map((item) => String(item).trim()).filter(Boolean))
    );
  }

  function normalizeHandle(value) {
    return String(value || "")
      .trim()
      .replace(/^@/, "")
      .toLocaleLowerCase();
  }

  function normalizeSettings(value) {
    const settings = value && typeof value === "object" ? value : {};

    return {
      enabled:
        typeof settings.enabled === "boolean"
          ? settings.enabled
          : DEFAULT_SETTINGS.enabled,
      topics: parseList(settings.topics ?? DEFAULT_SETTINGS.topics),
      accounts: parseList(settings.accounts ?? DEFAULT_SETTINGS.accounts).map(
        normalizeHandle
      ),
      filterStyle: settings.filterStyle === "dim" ? "dim" : "hide",
      hidePromoted:
        typeof settings.hidePromoted === "boolean"
          ? settings.hidePromoted
          : DEFAULT_SETTINGS.hidePromoted
    };
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase();
  }

  function matchesTerm(text, term) {
    const normalizedText = normalizeText(text);
    const normalizedTerm = normalizeText(term).trim();

    if (!normalizedTerm) {
      return false;
    }

    if (/^[\p{L}\p{N}_]+$/u.test(normalizedTerm)) {
      const escaped = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|[^\\p{L}\\p{N}_])${escaped}([^\\p{L}\\p{N}_]|$)`, "u").test(
        normalizedText
      );
    }

    return normalizedText.includes(normalizedTerm);
  }

  function isFilterablePath(pathname) {
    const path = String(pathname || "");
    return (
      /^\/(home|search|explore)(\/|$)/.test(path) ||
      path.startsWith("/i/lists/")
    );
  }

  function classifyPost(post, rawSettings) {
    const settings = normalizeSettings(rawSettings);
    const text = String(post?.text || "");
    const author = normalizeHandle(post?.author);

    if (!settings.enabled) {
      return { keep: true, reason: "Focus mode paused" };
    }

    if (settings.hidePromoted && post?.promoted) {
      return { keep: false, reason: "Promoted post" };
    }

    if (author && settings.accounts.includes(author)) {
      return {
        keep: true,
        reason: `Preferred account: @${author}`,
        matchedAccount: author
      };
    }

    const matchedTerm = settings.topics.find((term) => matchesTerm(text, term));
    if (matchedTerm) {
      return {
        keep: true,
        reason: `Topic: ${matchedTerm}`,
        matchedTerm
      };
    }

    return { keep: false, reason: "No selected topic or account" };
  }

  return {
    DEFAULT_SETTINGS,
    classifyPost,
    isFilterablePath,
    matchesTerm,
    normalizeHandle,
    normalizeSettings,
    parseList
  };
});
