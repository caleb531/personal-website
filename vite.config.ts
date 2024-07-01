import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import svgo from './plugins/vite-plugin-svgo';

const config: UserConfig = {
  plugins: [sveltekit(), imagetools(), svgo()],
  build: {
    // Allow us to conditionally enable sourcemaps on a per-environment basis
    // (this does not apply to development mode, since we are not building)
    sourcemap: Boolean(process.env.ENABLE_SOURCEMAPS),
    // Do not inline any assets as base64
    assetsInlineLimit: 0
  }
};

export default config;
