import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        'default-src': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
        'img-src': [
          "'self'",
          'data:',
          'https://www.gravatar.com',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com'
        ],
        'script-src': [
          "'self'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com'
        ],
        'connect-src': [
          "'self'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com'
        ],
        'prefetch-src': ["'self'"]
      }
    }
  }
};

export default config;
