import rss from "@astrojs/rss";
import { getPosts } from "../utils/posts";
import { getPostLink } from "../utils/ids";
export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: "The Focus AI",
    description:
      "Keep up to date with the latest news and updates from The Focus AI",
    site: context.site || "https://thefocus.ai",
    items: posts.map((post) => ({
      title: post.data.title || post.slug,
      pubDate: post.data.date,
      description: post.data.description || post.data.title || post.slug,
      // Compute RSS link from post `slug`
      link: getPostLink(post),
      url: `https://thefocus.ai/${getPostLink(post)}`,
    })),
  });
}
