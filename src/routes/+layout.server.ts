import { getContactLinks } from '$lib/entries.server';

export const prerender = true;
// Without enforcing trailing slashes, when SvelteKit builds using the static
// adapter, pages will be written to the build/ directory as mypage.html rather
// than mypage/index.html (source:
// <https://kit.svelte.dev/docs/page-options#trailingslash>)
export const trailingSlash = 'always';

// Define props that should be globally available across all pages
export async function load(locals) {
  return {
    pathname: locals.url.pathname,
    contactLinks: await getContactLinks()
  };
}
