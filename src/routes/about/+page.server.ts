import type { PageServerLoad } from './$types';

export const load = (() => {
	return {
		id: 'about',
		title: 'About',
		description: 'About the life and interests of Caleb Evans, coder for Christ'
	};
}) satisfies PageServerLoad;
