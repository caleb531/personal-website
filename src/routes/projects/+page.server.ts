import { getProjects } from '$lib/entries.server';

export async function load() {
  return {
    id: 'projects',
    title: 'Projects',
    description: 'Apps and programs crafted by Caleb Evans, coder for Christ',
    projects: getProjects()
  };
}
