import type { PageProps } from '../../components/types.d';
import { getProjects } from '../../lib/entries';
import type { PageServerLoad } from './$types';

type Props = PageProps & { projects: ReturnType<typeof getProjects> };

export const load = ((): Props => {
	return {
		id: 'projects',
		title: 'Projects',
		description: 'Apps and programs crafted by Caleb Evans, coder for Christ',
		projects: getProjects()
	};
}) satisfies PageServerLoad<Props>;
