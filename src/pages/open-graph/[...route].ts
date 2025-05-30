import { OGImageRoute } from "astro-og-canvas";
import { getPosts } from "../../utils/posts";
import { getSlug } from "../../utils/ids";

const collectionEntries = await getPosts(); // This will return an array of objects with the following structure:

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', description: '' } }]
// to { 'post.md': { title: 'Example', description: '' } }
// console.log("NODE_ENV", process.env.NODE_ENV);
const pages = Object.fromEntries(
  collectionEntries.map(({ id, data }) => [getSlug({ id }), data])
);

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  pages: pages,

  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
  }),
});
