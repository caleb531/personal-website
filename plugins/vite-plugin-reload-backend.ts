import { createFilter } from '@rollup/pluginutils';
import type { Plugin } from 'vite';

type PluginOptions = {
  include?: string[];
  exclude?: string[];
};

// Reload the page whenever a backend file changes (i.e. a file that is compiled
// during Static Site Generation (SSG) / not executed in the browser)
export default function reloadBackend(options: PluginOptions = {}): Plugin {
  const { include = ['**/+page.server.ts'], exclude = [] } = options;
  return {
    name: 'vite-plugin-reload-backend',
    handleHotUpdate({ file, server }) {
      const filter = createFilter(include, exclude);
      if (filter(file)) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    }
  };
}
