import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    vitePreprocess(),
    // Per <https://github.com/sveltejs/kit/issues/11993>, move the Svelte
    // announcer inline styles to a CSS stylesheet to eliminate CSP issues
    {
      name: 'strip-announcer-inline-styles',
      markup: ({ content: code }) => {
        code = code.replace(
          /<div id="svelte-announcer" [\s\S]*?>/,
          '<div id="svelte-announcer" aria-live="assertive" aria-atomic="true">'
        );
        return { code };
      }
    }
  ],

  kit: {
    // Give me the option of either serving the entire site via server-side
    // rendering (SSR) or as a static site (SSG); this can be controlled on a
    // per-environment basis
    adapter: adapterStatic(),
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
        'style-src': ["'self'"],
        'font-src': ["'self'", 'data:'],
        'img-src': ["'self'", 'data:'],
        'script-src': [
          "'self'",
          ...(process.env.PUBLIC_ANALYTICS_SITE_ID ? ['https://gc.zgo.at'] : [])
        ],
        'connect-src': [
          "'self'",
          ...(process.env.PUBLIC_ANALYTICS_SITE_ID
            ? [`https://${process.env.PUBLIC_ANALYTICS_SITE_ID}.goatcounter.com/count`]
            : [])
        ],
        'base-uri': ["'none'"]
      }
    }
  }
};

export default config;
