import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import reloadEntryPlugin from './plugins/reload-entry-plugin';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    imagetools(),
    // Since vite-plugin-image-optimizer does not yet support image resizing
    // (although we hope this will be added soon via
    // <https://github.com/FatehAK/vite-plugin-image-optimizer/pull/35>), we
    // must still use vite-imagetools to handle resizing of JPEGs and PNGs,
    // while also using vite-plugin-image-optimizer to optimize SVGs
    ViteImageOptimizer({ test: /\.(svg)$/i }),
    reloadEntryPlugin()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    // Allow us to conditionally enable sourcemaps on a per-environment basis
    // (this does not apply to development mode, since we are not building)
    sourcemap: Boolean(process.env.ENABLE_SOURCEMAPS),
    // Do not inline any assets as base64
    assetsInlineLimit: 0
  }
};

export default config;
