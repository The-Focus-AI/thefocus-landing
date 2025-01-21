import { getCollection } from "astro:content";

export async function getPosts() {
  let posts = await getCollection("posts");

  // Filter out posts that are not published
  posts = posts.filter((post) => post.data.published);

  // Filter out posts without a date or where date is not a real date
  posts = posts.filter(
    (post) => post.data.date && !isNaN(new Date(post.data.date).getTime())
  );

  // Filter out posts with future dates unless in development mode
  if (import.meta.env.PROD) {
    posts = posts.filter((post) => new Date(post.data.date) <= new Date());
  }
  // Sort posts by date
  posts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return posts;
}

export async function getRecentPosts() {
  let posts = await getPosts();

  // Get the first 2 posts
  posts = posts.slice(0, 2);

  return posts;
}
