import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { parse as parseCsv } from "csv-parse/sync";

const posts = defineCollection({
  // For content layer you no longer define a `type`
  // type: "content",
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  // schema: z.object({
  //   title: z.string(),
  //   description: z.string(),
  //   date: z.coerce.date().optional(),
  //   updatedDate: z.coerce.date().optional(),
  //   tags: z.array(z.string()),
  //   image: z.string(),
  //   published: z.boolean(),
  // }),
});

function fluxStepsCollection(name: string) {
  return defineCollection({
    loader: file(`./src/content/fluximages/${name}/steps.csv`, {
      parser: (text) => {
        const records = parseCsv(text, {
          columns: true,
          cast: true,
          skipEmptyLines: true,
        });
        const updated = records.map((record) => ({
          ...record,
          id: record.filename,
          name: name,
          _data: record,
        }));
        return updated;
      },
    }),
    schema: z.object({
      id: z.string(),
      step_count: z.number().optional(),
      duration_seconds: z.number().optional(),
      model: z.string().optional(),
      quality: z.number().optional(),
      name: z.string(),
      seed: z.number().optional(),
      prompt: z.string().optional(),
    }),
  });
}

function fluxSeedCollection(name: string) {
  return defineCollection({
    loader: file(`./src/content/fluximages/${name}/seeds.csv`, {
      parser: (text) => {
        const records = parseCsv(text, {
          columns: true,
          cast: true,
          skipEmptyLines: true,
        });
        const updated = records.map((record) => ({
          ...record,
          id: record.filename,
          name: name,
          _data: record,
        }));
        return updated;
      },
    }),
    schema: z.object({
      seed: z.number(),
      duration_seconds: z.number(),
      filename: z.string(),
      name: z.string(),
      timestamp: z.string(),
      model: z.string(),
      quality: z.number(),
      steps: z.number(),
      prompt: z.string(),
      id: z.string(),
    }),
  });
}

// const devSteps = fluxStepsCollection("mflux_timing_20250302_224250.csv");
// const seedSteps = fluxSeedCollection("mflux_seeds_20250302_234714.csv");

// const prince1 = fluxSeedCollection("mflux_seeds_20250302_235650.csv");
// const prince2 = fluxSeedCollection("mflux_seeds_20250302_235831.csv");
// const prince3 = fluxStepsCollection("mflux_timing_20250303_000318.csv");

// const plane1 = fluxSeedCollection("mflux_seeds_20250303_002030.csv");
// const plane2 = fluxStepsCollection("mflux_timing_20250303_002759.csv");

const plane1 = fluxStepsCollection("20250303_010933");
const devDreamy = fluxStepsCollection("20250303_012513");
const schnellDreamy = fluxStepsCollection("20250303_012843");

const prince1 = fluxSeedCollection("20250303_011430");
const prince2 = fluxStepsCollection("20250303_013153");

const styleCt = fluxSeedCollection("20250303_064455");
const styleChineseLine = fluxSeedCollection("20250303_065145");
const styleCharcoal = fluxSeedCollection("20250303_133513");
const styleFujifilm = fluxSeedCollection("20250303_141135");
const styleChildrens = fluxSeedCollection("20250303_142341");
const styleStructural = fluxSeedCollection("20250303_142900");

export const collections = {
  posts: posts,
  devDreamy: devDreamy,
  schnellDreamy: schnellDreamy,
  prince1: prince1,
  prince2: prince2,
  plane1: plane1,
  styleCt: styleCt,
  styleChineseLine: styleChineseLine,
  styleCharcoal: styleCharcoal,
  styleFujifilm: styleFujifilm,
  styleChildrens: styleChildrens,
  styleStructural: styleStructural,
};
