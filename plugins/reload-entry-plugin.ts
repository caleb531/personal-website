import path from 'node:path';
import type { Plugin } from 'vite';

// By default, because the entry *.json files are preprocessed during the build
// process, they are never imported into the client-side application and
// therefore will not trigger a hot reload when the file changes; to solve this,
// we can write a simple Vite plugin which detects changes to these JSON files
// are reloads the page accordingly
export default function reloadEntryPlugin(): Plugin {
  return {
    name: 'reload-entry-plugin',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.json')) {
        const relativePath = path.relative(server.config.root, file);
        if (
          relativePath.startsWith('src/projects') ||
          relativePath.startsWith('src/contact-links') ||
          relativePath.startsWith('src/websites')
        ) {
          server.ws.send({
            type: 'full-reload',
            path: '*'
          });
        }
      }
    }
  };
}
