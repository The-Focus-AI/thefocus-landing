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

export function getSlug(post) {
  let path = post.id;
  path = path.toLowerCase();
  path = path.replace(/^\/src\/pages\//, "");
  path = path.replace(/\.[^.]*$/, "");
  path = path.replace(/[^a-z0-9]+/g, "-");
  return path;
}

export function getTagSlug(tag) {
  return `/${tag}`;
}

export function getPostLink(post) {
  if (post.data.slug) {
    return post.data.slug;
  }
  return `/posts/${getSlug(post)}`;
}

export function getSectionTag(tags) {
  if (tags.includes("essay")) {
    return "essay";
  }
  if (tags.includes("usecase")) {
    return "usecase";
  }
  if (tags.includes("casestudy")) {
    return "casestudy";
  }
  return undefined;
}

export function getTagDisplay(tag, plural = false) {
  if (tag === "usecase") {
    return plural ? "Use Cases" : "Use Case";
  }
  if (tag === "casestudy") {
    return plural ? "Case Studies" : "Case Study";
  }
  // Capitalize first letter and replace hyphens with spaces
  tag = tag.charAt(0).toUpperCase() + tag.slice(1);
  tag = tag.replace(/-/g, " ");

  if (plural) {
    return tag + "s";
  }
  return tag;
}
