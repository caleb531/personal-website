import type { PageProps } from '../components/types.d';
import site from '../data/site.json';
import { getProjects } from '../lib/entries';
import type { PageServerLoad } from './$types';

type Props = PageProps & { projects: ReturnType<typeof getProjects>};

export const load = ((): Props => {
  return {
    id: 'home',
    description: site.description,
    projects: getProjects()
  };
}) satisfies PageServerLoad;
