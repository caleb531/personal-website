import { getWebsiteEntries } from '$lib/entries.server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    id: 'websites',
    title: 'Websites',
    description: 'Professional websites built by Caleb Evans, coder for Christ',
    websites: getWebsiteEntries()
  };
}) satisfies PageServerLoad;
