import { getContactLinks } from '$lib/entries.server';
import { getBaseGravatarUrl } from '$lib/gravatar.server';
import site from '../data/site.json';
import type { LayoutServerLoad } from './$types';

export const prerender = Boolean(process.env.USE_STATIC_ADAPTER);

// Define props that should be globally available across all pages
export const load = (async ({ url: { pathname } }) => {
  return {
    pathname,
    site,
    gravatarUrl: getBaseGravatarUrl(site.email),
    contactLinks: await getContactLinks()
  };
}) satisfies LayoutServerLoad;
