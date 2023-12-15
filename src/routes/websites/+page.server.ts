import { getWebsiteEntries } from '$lib/entries.server';

export async function load() {
  return {
    id: 'websites',
    title: 'Websites',
    description: 'Professional websites built by Caleb Evans, coder for Christ',
    websites: await getWebsiteEntries()
  };
}
