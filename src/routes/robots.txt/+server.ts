import type { RequestHandler } from './$types';

// Serve a dynamic robots.txt according to the DISALLOW_BOTS environment
// variable; this is so we can allow bots for the production site, while
// disallowing bots on the staging site
export const GET = (() => {
  let directives;
  if (process.env.DISALLOW_BOTS) {
    directives = ['User-agent: *', 'Disallow: /'];
  } else {
    directives = ['User-agent: *', 'Disallow:'];
  }
  return new Response(directives.join('\n'));
}) satisfies RequestHandler;
