import { DISALLOW_BOTS } from '$env/static/private';

export const prerender = true;

// Prebuild a robots.txt file according to the DISALLOW_BOTS environment
// variable; this is so we can allow bots for the production site, while
// disallowing bots on the staging site
export function GET() {
  const directives = DISALLOW_BOTS
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Disallow:'];
  return new Response(directives.join('\n'));
}
