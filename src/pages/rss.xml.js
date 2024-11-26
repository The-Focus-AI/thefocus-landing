import rss from "@astrojs/rss";
import { getPosts } from "../utils/posts";

export async function GET(context) {
  const posts = await getPosts();

  posts.forEach((post) => {
    console.log("title", post.data.title || post.slug);
    console.log("date", post.data.date);
    console.log(
      "description",
      post.data.description || post.data.title || post.slug
    );
    console.log("link", `/posts/${post.slug}`);
    console.log("---");
  });

  //   console.log(blog);
  return rss({
    title: "Obsidian Blog",
    description: "Rocks are cool",
    site: context.site || "https://obsidian.blog",
    items: posts.map((post) => ({
      title: post.data.title || post.slug,
      pubDate: post.data.date,
      description: post.data.description || post.data.title || post.slug,
      // Compute RSS link from post `slug`
      link: `/posts/${post.slug}`,
    })),
  });
}
