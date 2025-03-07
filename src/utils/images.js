import { getCollection } from "astro:content";

export async function getFluxImages(collection) {
  // Get the flux images collection

  const fluxImages = await getCollection(collection);

  const result = {
    name: fluxImages.find((entry) => entry.id === "name")?.data || {},
    args: fluxImages.find((entry) => entry.id === "command_args")?.data || {},
    results: fluxImages.find((entry) => entry.id === "results")?.data || {},
  };

  return result;
}
