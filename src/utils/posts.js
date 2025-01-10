import { getCollection } from "astro:content";

export async function getPosts() {
  let posts = await getCollection("posts");
  // Sort posts by date
  posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  // Filter out posts without a date or where date is not a real date
  posts = posts.filter(
    (post) => post.data.date && !isNaN(new Date(post.data.date).getTime())
  );

  // Filter out posts that are not published
  posts = posts.filter((post) => post.data.published);

  return posts;
}

export async function getRecentPosts() {
  let posts = await getCollection("posts");
  // Sort posts by date
  posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  // Filter out posts without a date or where date is not a real date
  posts = posts.filter(
    (post) => post.data.date && !isNaN(new Date(post.data.date).getTime())
  );

  // Filter out posts that are not published
  posts = posts.filter((post) => post.data.published);

  // Get the first 2 posts
  posts = posts.slice(0, 2);

  return posts;
}
