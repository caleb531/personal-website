import site from '../data/site.json';
import { getContactLinks } from '../lib/entries';
import { getBaseGravatarUrl } from '../lib/gravatar';

// Define props that should be globally available across all pages
export async function load() {
  return {
    site,
    gravatarUrl: getBaseGravatarUrl(site.email),
    contactLinks: getContactLinks()
  };
}
