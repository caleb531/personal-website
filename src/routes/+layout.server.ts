import { getContactLinks } from '$lib/entries.server';
import { getBaseGravatarUrl } from '$lib/gravatar.server';
import site from '../data/site.json';
import type { LayoutServerLoad } from './$types';

// Force Static Site Generation (SSG) for all pages; this also requires that
// @sveltejs/adapter-static be used in svelte.config.js
export const prerender = true;

// Define props that should be globally available across all pages
export const load = (async () => {
  return {
    site,
    gravatarUrl: getBaseGravatarUrl(site.email),
    contactLinks: await getContactLinks()
  };
}) satisfies LayoutServerLoad;
