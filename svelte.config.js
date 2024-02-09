import adapterVercel from '@sveltejs/adapter-vercel';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Give me the option of either serving the entire site via server-side
    // renderig (SSR) or as a static site (SSG); this can be controlled on a
    // per-environment basis
    adapter: process.env.USE_STATIC_ADAPTER ? adapterStatic() : adapterVercel({ runtime: 'edge' }),
    // Convenience path aliases
    alias: {
      $src: 'src',
      $data: 'src/data',
      $images: 'src/images',
      $routes: 'src/routes'
    },
    // Content Security Policy
    csp: {
      directives: {
        'default-src': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'font-src': ["'self'", 'data:'],
        'img-src': ["'self'", 'data:'],
        'script-src': ["'self'"],
        'connect-src': ["'self'"]
      }
    }
  }
};

export default config;
