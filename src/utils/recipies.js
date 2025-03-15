import { getCollection } from "astro:content";

export async function getRecipies() {
  let recipies = await getCollection("recipies");

  // if (import.meta.env.NODE_ENV !== "development") {
  console.log("Not in development, filtering out unpublished posts");
  recipies = recipies.filter((recipe) => recipe.data.published);
  // }

  // Filter out posts without a date or where date is not a real date
  recipies = recipies.filter(
    (recipe) => recipe.data.date && !isNaN(new Date(recipe.data.date).getTime())
  );

  // Filter out posts with future dates unless in development mode
  if (import.meta.env.NODE_ENV !== "development") {
    recipies = recipies.filter(
      (recipe) => new Date(recipe.data.date) <= new Date()
    );
  }
  // Sort posts by date
  recipies = recipies.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return recipies;
}

export async function getSections() {
  let sections = await getCollection("sections");
  return sections;
}

export async function getSection(section) {
  let sections = await getSections();
  return sections.find((s) => s.id === section);
}

export function getRecipeUrl(recipe) {
  return `/recipies/${recipe.id}`;
}

export async function getRecentRecipies() {
  let recipies = await getRecipies();

  // Get the first 2 posts
  recipies = recipies.slice(0, 2);

  return recipies;
}
export async function getRelatedRecipies(recipe) {
  if (!recipe.data.related) {
    return [];
  }
  let recipies = await getRecipies();
  return recipies.filter((r) => recipe.data.related.includes(r.id));
}
