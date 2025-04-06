import { getCollection } from "astro:content";

export async function getCaseStudies() {
  let case_studies = await getCollection("case_studies");

  if (import.meta.env.NODE_ENV !== "development") {
  console.log("Not in development, filtering out unpublished posts");
  case_studies = case_studies.filter((case_study) => case_study.data.published);
  }

  return case_studies;
}


export function getCaseStudyUrl(case_study) {
  return `/case-study/${case_study.id}`;
}

export async function getRecentCaseStudies() {
  let case_studies = await getCaseStudies();

  // Get the first 2 posts
  recipes = recipes.slice(0, 2);

  return case_studies;
}

export async function getRelatedCaseStudies(case_study) {
  if (!case_study.data.related) {
    return [];
  }
  let recipes = await getrecipes();
  return recipes.filter((r) => recipe.data.related.includes(r.id));
}
