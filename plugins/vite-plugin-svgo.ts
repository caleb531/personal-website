// This Vite plugin recursively finds all SVG assets under the specified
// directory (inputDir) and processes them with svgo (to remove whitespace,
// strip comments, etc.); the plugin then serves them in a way that they can be
// referenced like static files, as if they were placed under SvelteKit's
// static/ directory (which is the SvelteKit equivalent to Vite's public/
// directory); the publicBasePath option indicates the base directory from which
// these SVG paths should be servable
import { glob } from 'glob';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { optimize } from 'svgo';
import type { PluginOption } from 'vite';

interface ViteSvgoPluginOptions {
  // The input directory in which SVG files are recursively found and processed;
  // note that this directory should be outside the static/ directory, since
  // Vite copies static assets as-is, and we want to honor that behavior but not
  // placing files-to-be-processed in static/
  inputDir: string;
  // The base for any icon path that should be referenced in the application
  // (e.g. <img src="/icons/my-icon.svg" alt="My Icon" />)
  publicBasePath: string;
}

export default function svgo(options: ViteSvgoPluginOptions): PluginOption {
  return {
    name: 'svgo',
    // Run plugin before Vite core plugins; this is necessary to ensure that the
    // SVG files return a 200 response (see
    // <https://vitejs.dev/guide/api-plugin#plugin-ordering>)
    enforce: 'pre',
    // When building for production, write optimized SVGs to the same directory
    // as other static assets
    async generateBundle() {
      const destDir = path.resolve(`.svelte-kit/output/client/${options.publicBasePath}`);
      const srcFilePaths = await glob(`${options.inputDir}/**/*.svg`);

      for (const srcFilePath of srcFilePaths) {
        const svgContent = await fs.readFile(srcFilePath, 'utf-8');
        const optimizedSvg = optimize(svgContent, { path: srcFilePath }).data;
        const destFilePath = path.join(destDir, path.relative(options.inputDir, srcFilePath));

        await fs.mkdir(path.dirname(destFilePath), { recursive: true });
        await fs.writeFile(destFilePath, optimizedSvg, 'utf-8');
      }
    },
    // Since the SVG files we are attempting to reference may not actually exist
    // under static/, we need to ensure that they are served like static files
    // when referenced by the application (e.g. in an <img /> tag); to
    // accomplish this, we add middleware to virtually serve the unprocessed SVG
    // files on the local dev server
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          try {
            if (
              req.originalUrl?.startsWith(options.publicBasePath) &&
              req.originalUrl?.endsWith('.svg')
            ) {
              res.setHeader('Content-Type', 'image/svg+xml');
              res.writeHead(200);
              res.write(
                await fs.readFile(
                  `${options.inputDir}/${path.relative(options.publicBasePath, req.originalUrl)}`,
                  'utf8'
                )
              );
              res.end();
            } else {
              next();
            }
          } catch (error) {
            next(error);
          }
        });
      };
    }
  };
}
