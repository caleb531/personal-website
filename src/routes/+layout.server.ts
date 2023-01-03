import { getContactLinks } from '$lib/entries.server';
import { getBaseGravatarUrl } from '$lib/gravatar.server';
import site from '../data/site.json';
import type { LayoutServerLoad } from './$types';

// Define props that should be globally available across all pages
export const load = (() => {
  return {
    site,
    gravatarUrl: getBaseGravatarUrl(site.email),
    contactLinks: getContactLinks()
  };
}) satisfies LayoutServerLoad;
