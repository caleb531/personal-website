import { getWebsiteEntries } from '../../lib/entries';
import type { PageServerLoad } from './$types';

export const load = (() => {
	return {
		title: 'Websites',
		description: 'Professional websites built by Caleb Evans, coder for Christ',
		websites: getWebsiteEntries()
	};
}) satisfies PageServerLoad;
