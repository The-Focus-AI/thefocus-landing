import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  let jobs = await getCollection('jobs');

  // Filter to only published jobs in production
  if (import.meta.env.NODE_ENV !== 'development') {
    jobs = jobs.filter((job) => job.data.published);
  }

  // Sort by date descending
  jobs = jobs.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const jobsData = jobs.map((job) => ({
    id: job.id,
    title: job.data.title,
    type: job.data.type,
    location: job.data.location,
    hours: job.data.hours || null,
    rate: job.data.rate || null,
    date: job.data.date,
    url: `${site}jobs/${job.id}`,
  }));

  return new Response(JSON.stringify({
    count: jobsData.length,
    jobs: jobsData,
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
