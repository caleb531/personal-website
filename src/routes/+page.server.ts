import { getProjects } from '../lib/entries';

export async function load() {
  return {
    projects: getProjects()
  };
}
