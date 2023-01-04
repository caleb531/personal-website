import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const response = await resolve(event);

  // Set relevant security headers (the Content Security Policy / CSP is already
  // defined in svelte.config.js)
  response.headers.set('x-frame-options', 'SAMEORIGIN');
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('strict-transport-security', 'max-age=15552000; includeSubDomains');

  return response;
}) satisfies Handle;
