// To run this utility, run `esr utilities/screenshot-website.ts` from the root
// project directory on the CLI
import fs from 'fs';
import glob from 'glob-promise';
import path from 'path';
import puppeteer from 'puppeteer';
import type { WebsiteEntry } from '../src/routes/types.d';

const websiteImageDir = 'static/images/websites';
const websiteImageExtension = 'jpg';
const websiteImageQuality = 85;
const windowWidth = 1024;
const windowHeight = 640;

// Create website image directory if it doesn't already exist
function createWebsiteImageDirectory(): Promise<string | undefined> {
  return fs.promises.mkdir(websiteImageDir, { recursive: true });
}

async function generateScreenshots(websiteConfigFilePaths: string[]): Promise<void> {
  await createWebsiteImageDirectory();
  console.log('launching browser...');
  const browser = await puppeteer.launch();

  // Generate screenshot for each portfolio website that has configuration
  await Promise.all(
    websiteConfigFilePaths.map(async (websiteConfigFilePath) => {
      const websiteName = path.basename(websiteConfigFilePath, '.json');

      const websiteConfigFileContents = await fs.promises.readFile(websiteConfigFilePath, 'utf8');

      const websiteEntry = JSON.parse(websiteConfigFileContents) as WebsiteEntry;
      const websiteImagePath = path.join(
        websiteImageDir,
        `${websiteName}.${websiteImageExtension}`
      );

      const page = await browser.newPage();
      await page.setViewport({
        width: windowWidth,
        height: windowHeight
      });
      await page.goto(websiteEntry.direct_url, {
        waitUntil: ['load', 'networkidle0']
      });

      return page
        .screenshot({
          path: websiteImagePath,
          type: 'jpeg',
          quality: websiteImageQuality,
          captureBeyondViewport: false
        })
        .then(() => {
          console.log(`generated screenshot for ${websiteName}`);
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
    })
  );

  console.log('closing browser...');
  await browser.close();
}

async function main(): Promise<void> {
  // Generate screenshot for the specified file path(s); otherwise, default to
  // every file in the /src/websites directory
  let websiteConfigFilePaths = process.argv.slice(2);
  if (websiteConfigFilePaths.length === 0) {
    websiteConfigFilePaths = await glob.promise('src/websites/*.json');
  }
  generateScreenshots(websiteConfigFilePaths);
}
main();
