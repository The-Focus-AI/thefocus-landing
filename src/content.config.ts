import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { parse as parseCsv } from "csv-parse/sync";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
});

const recipes = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/recipes",
  }),
});

const sections = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/sections",
  }),
});

function fluxRunCollection(name: string) {
  return defineCollection({
    loader: file(`./src/content/fluximages/${name}/run_info.json`, {
      parser: (text) => {
        const data = JSON.parse(text);
        data.name = name;
        return data;
      },
    }),
  });
}

const prince_prompt = fluxRunCollection("mflux_output_20250306_075408/run_1");
const prince_varyseeds = fluxRunCollection(
  "mflux_output_20250306_075408/run_2"
);

const dev_plane = fluxRunCollection("mflux_output_20250306_162014/run_1");
const dev_dream = fluxRunCollection("mflux_output_20250306_162014/run_2");
const schnell_dream = fluxRunCollection("mflux_output_20250306_162014/run_3");
const schnell_forest = fluxRunCollection("mflux_output_20250306_162014/run_6");
const lil_robots = fluxRunCollection("mflux_output_20250306_184017/run_1");
export const collections = {
  posts: posts,
  recipes,
  sections,
  prince_prompt: prince_prompt,
  prince_varyseeds: prince_varyseeds,
  dev_plane: dev_plane,
  dev_dream: dev_dream,
  schnell_dream: schnell_dream,
  schnell_forest: schnell_forest,
  lil_robots: lil_robots,
};
