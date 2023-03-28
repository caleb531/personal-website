import { getProjects } from '$lib/entries.server';
import site from '../data/site.json';

export async function load() {
  return {
    id: 'home',
    description: site.description,
    projects: getProjects()
  };
}
