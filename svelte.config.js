import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Enable Static Site Generation (SSG) for all pages; this also requires
    // that we export const prerender = true; in the root layout
    // (layout.server.ts, in our case)
    adapter: adapterStatic()
  }
};

export default config;
