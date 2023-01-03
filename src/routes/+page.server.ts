import site from '../data/site.json';
import { getProjects } from '../lib/entries';
import type { PageServerLoad } from './$types';

export const load = (() => {
	return {
		id: 'home',
		title: `${site.title} | ${site.tagline}`,
		description: site.description,
		projects: getProjects()
	};
}) satisfies PageServerLoad;
