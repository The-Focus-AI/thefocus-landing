import { OGImageRoute } from "astro-og-canvas";
import { getPosts } from "../../utils/posts";
import { getSlug } from "../../utils/ids";

const collectionEntries = await getPosts();

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', description: '' } }]
// to { 'post.md': { title: 'Example', description: '' } }
// Skip posts with custom ogImage - those are served from public/open-graph/
const pages = Object.fromEntries(
  collectionEntries
    .filter(({ data }) => !data.ogImage)
    .map(({ id, data }) => [getSlug({ id }), data])
);

// Focus.AI Client Brand Colors (RGB)
const colors = {
  paper: [250, 249, 246] as [number, number, number],      // #faf9f6
  ink: [22, 22, 22] as [number, number, number],           // #161616
  graphite: [74, 74, 74] as [number, number, number],      // #4a4a4a
  petrol: [14, 59, 70] as [number, number, number],        // #0e3b46
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages: pages,

  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,

    // Focus.AI Client brand styling
    bgGradient: [colors.paper],

    border: {
      color: colors.petrol,
      width: 16,
      side: "inline-start",
    },

    padding: 40,

    font: {
      title: {
        color: colors.ink,
        size: 72,
        weight: "Bold",
        lineHeight: 1.15,
        families: ["Inter"],
      },
      description: {
        color: colors.graphite,
        size: 36,
        weight: "Normal",
        lineHeight: 1.35,
        families: ["Inter"],
      },
    },

    fonts: [
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff2",
    ],

    logo: {
      path: "./public/logo.png",
      size: [40],
    },
  }),
});
