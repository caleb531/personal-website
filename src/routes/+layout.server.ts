import { getContactLinks } from '$lib/entries.server';

export const prerender = Boolean(process.env.USE_STATIC_ADAPTER);

// Define props that should be globally available across all pages
export async function load(locals) {
  return {
    pathname: locals.url.pathname,
    contactLinks: await getContactLinks()
  };
}
