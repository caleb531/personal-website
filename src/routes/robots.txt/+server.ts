export const prerender = true;

// Prebuild a robots.txt file according to the DISALLOW_BOTS environment
// variable; this is so we can allow bots for the production site, while
// disallowing bots on the staging site
export function GET() {
  let directives;
  if (process.env.DISALLOW_BOTS) {
    directives = ['User-agent: *', 'Disallow: /'];
  } else {
    directives = ['User-agent: *', 'Disallow:'];
  }
  return new Response(directives.join('\n'));
}
