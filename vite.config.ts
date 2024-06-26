import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import svgo from './plugins/vite-plugin-svgo';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    imagetools(),
    svgo({
      // The input directory in which SVG files are recursively found and
      // processed; note that this directory should be outside the static/
      // directory, since Vite copies static assets as-is, and we want to honor
      // that behavior but not placing files-to-be-processed in static/
      inputDir: 'src/icons',
      // The base for any icon path that should be referenced in the application
      // (e.g. <img src="/icons/my-icon.svg" alt="My Icon" />)
      publicBasePath: '/icons'
    })
  ],
  build: {
    // Allow us to conditionally enable sourcemaps on a per-environment basis
    // (this does not apply to development mode, since we are not building)
    sourcemap: Boolean(process.env.ENABLE_SOURCEMAPS)
  }
};

export default config;
