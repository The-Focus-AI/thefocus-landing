const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const extensionRoot = path.resolve(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(extensionRoot, "manifest.json"), "utf8")
);

test("manifest is a minimal Manifest V3 configuration", () => {
  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(manifest.permissions, ["storage"]);
  assert.equal(manifest.host_permissions, undefined);
  assert.deepEqual(manifest.content_scripts[0].matches, [
    "https://x.com/*",
    "https://twitter.com/*"
  ]);
});

test("every local manifest entry point exists", () => {
  const entryPoints = [
    manifest.action.default_popup,
    ...manifest.content_scripts.flatMap((script) => [
      ...script.js,
      ...script.css
    ])
  ];

  for (const entryPoint of entryPoints) {
    assert.equal(
      fs.existsSync(path.join(extensionRoot, entryPoint)),
      true,
      `${entryPoint} should exist`
    );
  }
});
