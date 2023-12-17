import site from '$data/site.json';
import { getProjects } from '$lib/entries.server';

export async function load() {
  return {
    id: 'home',
    description: site.description,
    projects: await getProjects()
  };
}
