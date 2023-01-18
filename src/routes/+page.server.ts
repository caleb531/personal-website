import { getProjects } from '$lib/entries.server';
import site from '../data/site.json';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    id: 'home',
    description: site.description,
    projects: getProjects()
  };
}) satisfies PageServerLoad;
