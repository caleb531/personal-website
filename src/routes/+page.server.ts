import site from '$data/site.json';
import { getProjects } from '$lib/entries.server.ts';

export async function load() {
  return {
    id: 'home',
    description: site.description,
    projects: await getProjects()
  };
}
