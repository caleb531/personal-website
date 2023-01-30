import { getContactLinks } from '$lib/entries.server';
import type { LayoutServerLoad } from './$types';

export const prerender = Boolean(process.env.USE_STATIC_ADAPTER);

// Define props that should be globally available across all pages
export const load = (async (locals) => {
  return {
    pathname: locals.url.pathname,
    contactLinks: getContactLinks()
  };
}) satisfies LayoutServerLoad;
