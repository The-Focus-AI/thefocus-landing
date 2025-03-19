import { getCollection } from "astro:content";

export async function getrecipes() {
  let recipes = await getCollection("recipes");

  // if (import.meta.env.NODE_ENV !== "development") {
  console.log("Not in development, filtering out unpublished posts");
  recipes = recipes.filter((recipe) => recipe.data.published);
  // }

  // Filter out posts without a date or where date is not a real date
  recipes = recipes.filter(
    (recipe) => recipe.data.date && !isNaN(new Date(recipe.data.date).getTime())
  );

  // Filter out posts with future dates unless in development mode
  if (import.meta.env.NODE_ENV !== "development") {
    recipes = recipes.filter(
      (recipe) => new Date(recipe.data.date) <= new Date()
    );
  }
  // Sort posts by date
  recipes = recipes.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return recipes;
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
  return `/recipes/${recipe.id}`;
}

export async function getRecentrecipes() {
  let recipes = await getrecipes();

  // Get the first 2 posts
  recipes = recipes.slice(0, 2);

  return recipes;
}
export async function getRelatedrecipes(recipe) {
  if (!recipe.data.related) {
    return [];
  }
  let recipes = await getrecipes();
  return recipes.filter((r) => recipe.data.related.includes(r.id));
}
