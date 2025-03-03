import { getCollection } from "astro:content";

export async function getFluxImages(collection) {
  // Get the flux images collection
  const fluxImages = await getCollection(collection);

  // console.log(fluxImages);

  // Transform the collection data into the format we need
  const records = fluxImages.map((entry) => {
    return {
      filename: entry.id,
      step_count: entry.data.step_count || entry.data.steps || 0,
      duration_seconds: entry.data.duration_seconds || 0,
      model: entry.data.model || "Unknown",
      quality: entry.data.quality || "Unknown",
      seed: entry.data.seed || "Unknown",
      prompt: entry.data.prompt || "Unknown",
      steps: entry.data.steps || entry.data.step_count || 0,
      name: entry.data.name || "Unknown",
    };
  });

  return records;
}
