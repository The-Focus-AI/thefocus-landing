const test = require("node:test");
const assert = require("node:assert/strict");

const {
  classifyPost,
  isFilterablePath,
  matchesTerm,
  normalizeSettings,
  parseList
} = require("../filter-engine.js");

test("parseList accepts commas and new lines and removes duplicates", () => {
  assert.deepEqual(parseList("Tesla, SpaceX\nTesla\nStarship"), [
    "Tesla",
    "SpaceX",
    "Starship"
  ]);
});

test("single-word topics match whole words without matching fragments", () => {
  assert.equal(matchesTerm("A Tesla factory update", "Tesla"), true);
  assert.equal(matchesTerm("A pretesla fragment", "Tesla"), false);
  assert.equal(matchesTerm("Updates from xAI", "xAI"), true);
});

test("multi-word topics match phrases case-insensitively", () => {
  assert.equal(matchesTerm("The STARSHIP FLIGHT TEST is scheduled", "Starship flight"), true);
});

test("preferred accounts are kept even without a topic match", () => {
  const result = classifyPost(
    { author: "@SpaceX", text: "Liftoff", promoted: false },
    { topics: ["Tesla"], accounts: ["spacex"] }
  );

  assert.equal(result.keep, true);
  assert.equal(result.matchedAccount, "spacex");
});

test("promoted posts are filtered before topic matching", () => {
  const result = classifyPost(
    { author: "@example", text: "Tesla sale", promoted: true },
    { topics: ["Tesla"], accounts: [], hidePromoted: true }
  );

  assert.deepEqual(result, { keep: false, reason: "Promoted post" });
});

test("unrelated posts are filtered while focus mode is active", () => {
  const result = classifyPost(
    { author: "@example", text: "A recipe for lunch", promoted: false },
    { topics: ["Tesla", "SpaceX"], accounts: [] }
  );

  assert.equal(result.keep, false);
});

test("paused focus mode keeps every post", () => {
  const result = classifyPost(
    { author: "@example", text: "Promoted", promoted: true },
    { enabled: false, hidePromoted: true }
  );

  assert.deepEqual(result, { keep: true, reason: "Focus mode paused" });
});

test("normalizeSettings sanitizes handles and invalid filter styles", () => {
  const settings = normalizeSettings({
    accounts: ["@Tesla", "SPACEX"],
    filterStyle: "remove"
  });

  assert.deepEqual(settings.accounts, ["tesla", "spacex"]);
  assert.equal(settings.filterStyle, "hide");
});

test("filtering is limited to feed routes and excludes conversations", () => {
  assert.equal(isFilterablePath("/home"), true);
  assert.equal(isFilterablePath("/search"), true);
  assert.equal(isFilterablePath("/i/lists/12345"), true);
  assert.equal(isFilterablePath("/SpaceX/status/12345"), false);
  assert.equal(isFilterablePath("/SpaceX"), false);
});
