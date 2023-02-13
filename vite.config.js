import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), imagetools()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  build: {
    // Allow us to conditionally enable sourcemaps on a per-environment basis
    // (this does not apply to development mode, since we are not building)
    sourcemap: Boolean(process.env.ENABLE_SOURCEMAPS)
  }
};

export default config;
