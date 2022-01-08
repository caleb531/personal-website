import fm from 'front-matter';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import puppeteer from 'puppeteer';

type Frontmatter = { direct_url: string };

const websiteImageDir = 'src/images/websites';
const websiteImageExtension = 'jpg';
const websiteImageQuality = 85;
const windowWidth = 1024;
const windowHeight = 640;

// Create website image directory if it doesn't already exist
fs.mkdir(websiteImageDir, { recursive: true }, () => {/* noop */});

// Generate screenshot for the specified file path(s); otherwise, default to
// every file in the /src/websites directory
let websiteConfigFilePaths = process.argv.slice(2);
if (websiteConfigFilePaths.length === 0) {
  websiteConfigFilePaths = glob.sync('src/websites/*.md');
}

async function generateScreenshots(websiteConfigFilePaths: string[]) {

  const browser = await puppeteer.launch();

  // Generate screenshot for each portfolio website that has configuration
  await Promise.all(websiteConfigFilePaths.map(async (websiteConfigFilePath) => {

    const websiteName = path.basename(websiteConfigFilePath, '.md');

    await fs.promises.readFile(websiteConfigFilePath, 'utf8').then(async (websiteConfigFileContents: string) => {

      const websiteFrontmatter = fm(websiteConfigFileContents).attributes as Frontmatter;
      const websiteImagePath = path.join(websiteImageDir, `${websiteName}.${websiteImageExtension}`);

      const page = await browser.newPage();
      await page.setViewport({
        width: windowWidth,
        height: windowHeight
      });
      await page.goto(websiteFrontmatter.direct_url);

      return page.screenshot({
        path: websiteImagePath,
        type: 'jpeg',
        quality: websiteImageQuality,
        captureBeyondViewport: false
      }).then(() => {
        console.log(`generated screenshot for ${websiteName}`);
      }).catch((error) => {
        console.error(error);
      });

    });

  }));

  await browser.close();

}
generateScreenshots(websiteConfigFilePaths);
