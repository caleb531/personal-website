import type { PageServerLoad } from './$types';

export const load = (() => {
	return {
		title: 'Contact',
		description:
			'Contact details (including email, Github, and Twitter) for Caleb Evans, coder for Christ'
	};
}) satisfies PageServerLoad;
