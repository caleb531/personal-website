import { getProjects } from '$lib/entries.server';
import type { PageServerLoad } from './$types';

export const load = (() => {
  return {
    id: 'projects',
    title: 'Projects',
    description: 'Apps and programs crafted by Caleb Evans, coder for Christ',
    projects: getProjects()
  };
}) satisfies PageServerLoad;
