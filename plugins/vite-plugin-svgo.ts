// This Vite plugin recursively finds all SVG assets under the specified
// directory (inputDir) and processes them with svgo (to remove whitespace,
// strip comments, etc.); the plugin then serves them in a way that they can be
// referenced like static files, as if they were placed under SvelteKit's
// static/ directory (which is the SvelteKit equivalent to Vite's public/
// directory); the publicBasePath option indicates the base directory from which
// these SVG paths should be servable
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { optimize } from 'svgo';
import type { PluginOption, ResolvedConfig } from 'vite';

export interface ViteSvgoPluginConfiguration {
  // The input directory in which SVG files are recursively found and processed;
  // note that this directory should be outside the static/ directory, since
  // Vite copies static assets as-is, and we want to honor that behavior but not
  // placing files-to-be-processed in static/
  inputDir: string;
  // The base for any icon path that should be referenced in the application
  // (e.g. <img src="/icons/my-icon.svg" alt="My Icon" />)
  publicBasePath: string;
}

interface SvgMapEntry {
  id: string;
  content: string;
}

export function createBasePath(base?: string) {
  return (base?.replace(/\/$/, '') || '') + '/@svgo/';
}

export default function svgo(): PluginOption {
  let viteConfig: ResolvedConfig;
  let basePath: string;
  const generatedImages: Record<string, SvgMapEntry> = {};
  return {
    name: 'svgo',
    // Run plugin before Vite core plugins; this is necessary to ensure that the
    // SVG files return a 200 response (see
    // <https://vitejs.dev/guide/api-plugin#plugin-ordering>)
    enforce: 'pre',
    configResolved(cfg) {
      viteConfig = cfg;
      basePath = createBasePath(viteConfig.base);
    },
    // By default, `import.meta.ROLLUP_FILE_URL_${referenceId}` returns the full
    // file URL to any emitted asset, when we really need the file path relative
    // to the root of the site
    resolveFileUrl({ fileName }) {
      return `"/${fileName}"`;
    },
    async load(id) {
      if (!id.includes('.svg')) {
        return;
      }

      const [srcFilePath, query] = path.relative(process.cwd(), id).split('?');
      const origSvgContents = await fs.readFile(srcFilePath, 'utf8');
      const optimizedSvgContents = optimize(origSvgContents, { path: srcFilePath }).data;

      generatedImages[srcFilePath] = {
        id,
        content: optimizedSvgContents
      };

      if (query === 'raw') {
        return `export default ${JSON.stringify(optimizedSvgContents)}`;
      }

      if (viteConfig.command === 'serve') {
        // For the dev server, although we cannot emit files, we can still
        // provide a path that will be served dynamically at request time (via
        // Vite's configureServer hook)
        return `export default ${JSON.stringify(path.join(basePath, srcFilePath))}`;
      } else {
        // When building for production, we need to write a file to the site's
        // assets subdirectory under the build directory, then use that URL
        const referenceId = this.emitFile({
          name: `${path.basename(id, path.extname(id))}.svg`,
          source: optimizedSvgContents,
          type: 'asset'
        });
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId}`;
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.includes('.svg')) {
          next();
          return;
        }
        const id = req.url.replace(basePath, '');
        const svgMapEntry: SvgMapEntry | undefined = generatedImages[id];
        if (svgMapEntry) {
          res.setHeader('Content-Type', 'image/svg+xml');
          res.writeHead(200);
          res.write(svgMapEntry.content);
          res.end();
        } else {
          next();
          return;
        }
      });
    }
  };
}
