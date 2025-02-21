import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = {
  posts: posts,
};
