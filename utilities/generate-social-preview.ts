import puppeteer from 'puppeteer';
import { createServer } from 'vite';

// The port of the local Vite server which is serving the images
const SERVER_PORT = 51730;
// The dimensions of the browser viewport
const VIEWPORT_WIDTH = 2400;
const VIEWPORT_HEIGHT = 1260;
// The image file paths (*without* leading slashes)
const SRC_SOCIAL_PREVIEW_PATH = 'src/images/social-preview.svg';
const DEST_SOCIAL_PREVIEW_PATH = 'src/images/social-preview.png';

// Serve Vite locally so we can serve the static files to load in Puppeteer's
// headless browser
async function startServer() {
  const server = await createServer({
    // Keep in mind that because we are disabling auto-resolving by setting
    // configFile:false, SvelteKit will not be loaded; only static files will be
    // accessible (e.g. those under static/ or src/)
    configFile: false,
    server: {
      port: SERVER_PORT
    }
  });
  // Calling listen() only starts the server, and resolves once the server is
  // started (i.e. it doesn't lock up the main thread until the parent process
  // is terminated)
  return server.listen();
}

async function generateSocialPreview() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT
  });
  await page.goto(`http://localhost:${SERVER_PORT}/${SRC_SOCIAL_PREVIEW_PATH}`, {
    // Wait until there have been no new network connections for 500ms
    waitUntil: ['load', 'networkidle0']
  });
  await page.screenshot({
    path: DEST_SOCIAL_PREVIEW_PATH,
    type: 'png'
  });
  console.log(`successfully generated social preview (written to ${DEST_SOCIAL_PREVIEW_PATH})`);
}

async function main() {
  const server = await startServer();
  await generateSocialPreview();
  await server.close();
  process.exit(0);
}
main();
