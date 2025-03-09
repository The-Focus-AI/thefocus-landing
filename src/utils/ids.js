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

  // Check if the word already ends in 's'
  if (tag.endsWith("s")) {
    plural = false;
  }
  if (plural) {
    return tag + "s";
  }
  return tag;
}
