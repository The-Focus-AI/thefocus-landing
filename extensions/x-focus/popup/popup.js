(function initializePopup() {
  "use strict";

  const engine = globalThis.XFocusEngine;
  const STORAGE_KEY = "xFocusSettings";
  const form = document.querySelector("#settings-form");
  const enabled = document.querySelector("#enabled");
  const topics = document.querySelector("#topics");
  const accounts = document.querySelector("#accounts");
  const hidePromoted = document.querySelector("#hide-promoted");
  const saveStatus = document.querySelector("#save-status");
  const controls = Array.from(form.elements);
  let hydrated = false;

  controls.forEach((control) => {
    control.disabled = true;
  });

  function render(settings) {
    enabled.checked = settings.enabled;
    topics.value = settings.topics.join("\n");
    accounts.value = settings.accounts.map((account) => `@${account}`).join("\n");
    hidePromoted.checked = settings.hidePromoted;

    const filterStyle = form.querySelector(
      `input[name="filterStyle"][value="${settings.filterStyle}"]`
    );
    if (filterStyle) {
      filterStyle.checked = true;
    }
  }

  function readForm() {
    return engine.normalizeSettings({
      enabled: enabled.checked,
      topics: engine.parseList(topics.value),
      accounts: engine.parseList(accounts.value),
      filterStyle:
        form.querySelector('input[name="filterStyle"]:checked')?.value || "hide",
      hidePromoted: hidePromoted.checked
    });
  }

  async function save() {
    const settings = readForm();
    await chrome.storage.local.set({ [STORAGE_KEY]: settings });
    render(settings);
    saveStatus.textContent = "Saved — your open X tabs update automatically.";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    save().catch(() => {
      saveStatus.textContent = "Could not save settings. Try again.";
    });
  });

  enabled.addEventListener("change", () => {
    if (!hydrated) {
      return;
    }
    save().catch(() => {
      saveStatus.textContent = "Could not update focus mode.";
    });
  });

  form.addEventListener("input", () => {
    if (hydrated) {
      saveStatus.textContent = "";
    }
  });

  chrome.storage.local
    .get(STORAGE_KEY)
    .then((stored) => render(engine.normalizeSettings(stored[STORAGE_KEY])))
    .catch(() => render(engine.normalizeSettings()))
    .finally(() => {
      hydrated = true;
      controls.forEach((control) => {
        control.disabled = false;
      });
    });
})();
