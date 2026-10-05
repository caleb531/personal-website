import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import reloadBackend from './plugins/vite-plugin-reload-backend.ts';

// The build plugins and SvelteKit settings for the website
const config: UserConfig = {
  plugins: [
    sveltekit({
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
        // SvelteKit adds the quotes around CSP keywords in the generated policy
        directives: {
          'default-src': ['none'],
          'style-src': ['self'],
          'font-src': ['self', 'data:'],
          'img-src': ['self', 'data:'],
          // Allow GoatCounter only when analytics is enabled for this build
          'script-src': process.env.PUBLIC_ANALYTICS_SITE_ID
            ? ['self', 'https://gc.zgo.at']
            : ['self'],
          'worker-src': ['self', 'blob:'],
          'connect-src': process.env.PUBLIC_ANALYTICS_SITE_ID
            ? ['self', `https://${process.env.PUBLIC_ANALYTICS_SITE_ID}.goatcounter.com/count`]
            : ['self'],
          'base-uri': ['none']
        }
      }
    }),
    imagetools(),
    // Since vite-plugin-image-optimizer does not yet support image resizing
    // (although we hope this will be added soon via
    // <https://github.com/FatehAK/vite-plugin-image-optimizer/pull/35>), we
    // must still use vite-imagetools to handle resizing of JPEGs and PNGs,
    // while also using vite-plugin-image-optimizer to optimize SVGs
    ViteImageOptimizer({ test: /\.(svg)$/i }),
    reloadBackend({
      include: [
        'src/routes/**/+page.server.ts',
        'src/lib/*.ts',
        'src/projects/*.json',
        'src/contact-links/*.json',
        'src/websites/*.json'
      ]
    })
  ],
  build: {
    // Allow us to conditionally enable sourcemaps on a per-environment basis
    // (this does not apply to development mode, since we are not building)
    sourcemap: Boolean(process.env.ENABLE_SOURCEMAPS),
    // Do not inline any assets as base64
    assetsInlineLimit: 0
  }
};

export default config;
