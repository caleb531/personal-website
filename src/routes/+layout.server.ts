import site from '../data/site.json';
import { getContactLinks } from '../lib/entries';
import { getBaseGravatarUrl } from '../lib/gravatar';
import type { LayoutServerLoad } from './$types';

// Define props that should be globally available across all pages
export const load = (() => {
	return {
		site,
		gravatarUrl: getBaseGravatarUrl(site.email),
		contactLinks: getContactLinks()
	};
}) satisfies LayoutServerLoad;
