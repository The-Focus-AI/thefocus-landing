import { getCollection } from "astro:content";

export async function getPosts() {
  let posts = await getCollection("posts");

  // Filter out posts that are not published

  if (import.meta.env.NODE_ENV !== "development") {
    console.log("Not in development, filtering out unpublished posts");
    posts = posts.filter((post) => post.data.published);
  }

  // Filter out posts without a date or where date is not a real date
  posts = posts.filter(
    (post) => post.data.date && !isNaN(new Date(post.data.date).getTime())
  );

  // Filter out posts with future dates unless in development mode
  if (import.meta.env.NODE_ENV !== "development") {
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

export async function getNextPost(post) {
  let posts = await getPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  return posts[index - 1];
}

export async function getPrevPost(post) {
  let posts = await getPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  return posts[index + 1];
}
