import rss from "@astrojs/rss";
import { getPosts } from "../utils/posts";
import { getPostLink } from "../utils/ids";
import { getRecipeUrl } from "../utils/recipies";
import { getRecipies } from "../utils/recipies";

export async function GET(context) {
  const posts = (await getPosts()).map((post) => ({
    title: post.data.title || post.slug,
    pubDate: post.data.date,
    description: post.data.description || post.data.title || post.slug,
    link: getPostLink(post),
    url: `https://thefocus.ai/${getPostLink(post)}`,
  }));

  const recipies = (await getRecipies()).map((recipie) => ({
    title: `[Recipe] ${recipie.data.title || recipie.id}`,
    pubDate: recipie.data.date,
    description: recipie.data.description || recipie.data.title || recipie.slug,
    link: getRecipeUrl(recipie),
    url: `https://thefocus.ai/${getRecipeUrl(recipie)}`,
  }));

  const items = [...posts, ...recipies].sort(
    (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
  );

  return rss({
    title: "The Focus AI",
    description:
      "Keep up to date with the latest news and updates from The Focus AI",
    site: context.site || "https://thefocus.ai",
    items,
  });
}
