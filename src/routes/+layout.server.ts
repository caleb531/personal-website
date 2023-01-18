import { getContactLinks } from '$lib/entries.server';
import site from '../data/site.json';
import type { LayoutServerLoad } from './$types';

export const prerender = Boolean(process.env.USE_STATIC_ADAPTER);

// Define props that should be globally available across all pages
export const load = (async (locals) => {
  return {
    pathname: locals.url.pathname,
    site,
    gravatarUrl: 'https://www.gravatar.com/avatar/952d736a582fdfdb7d7a9a5e7588bf3e',
    contactLinks: getContactLinks()
  };
}) satisfies LayoutServerLoad;
