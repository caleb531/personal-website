import { defineEnvVars } from '@sveltejs/kit/env';

// The environment variables available to the website at build time
export const variables = defineEnvVars({
  // The GoatCounter site ID; an empty value disables analytics
  PUBLIC_ANALYTICS_SITE_ID: { public: true, static: true },
  // The public origin used for canonical URLs and social previews
  PUBLIC_SITE_ORIGIN: { public: true, static: true },
  // Whether the generated robots.txt should disallow crawlers
  DISALLOW_BOTS: { static: true }
});
