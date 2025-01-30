import { defineConfig } from "languine";

export default defineConfig({
  version: "1.0.2",
  locale: {
    source: "en",
    targets: ["cn es it ru"],
  },
  files: {
    ts: {
      include: ["locales/[locale].ts"],
    },
  },
  llm: {
    provider: "ollama",
    model: "gemma2:latest",
  },
  extract: ["./src/**/*.{ts,tsx}"]
});