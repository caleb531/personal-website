import fm from 'front-matter';
import fs from 'fs';
import glob from 'glob-promise';
import path from 'path';
import puppeteer from 'puppeteer';

type Frontmatter = { direct_url: string };

const websiteImageDir = 'src/images/websites';
const websiteImageExtension = 'jpg';
const websiteImageQuality = 85;
const windowWidth = 1024;
const windowHeight = 640;

// Create website image directory if it doesn't already exist
function createWebsiteImageDirectory() {
  return fs.promises.mkdir(websiteImageDir, { recursive: true });
}

async function generateScreenshots(websiteConfigFilePaths: string[]) {

  await createWebsiteImageDirectory();
  const browser = await puppeteer.launch();

  // Generate screenshot for each portfolio website that has configuration
  await Promise.all(websiteConfigFilePaths.map(async (websiteConfigFilePath) => {

    const websiteName = path.basename(websiteConfigFilePath, '.md');

    const websiteConfigFileContents = await fs.promises.readFile(websiteConfigFilePath, 'utf8');

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
      return error;
    });

  }));

  await browser.close();

}

async function main() {
  // Generate screenshot for the specified file path(s); otherwise, default to
  // every file in the /src/websites directory
  let websiteConfigFilePaths = process.argv.slice(2);
  if (websiteConfigFilePaths.length === 0) {
    websiteConfigFilePaths = await glob.promise('src/websites/*.md');
  }
  generateScreenshots(websiteConfigFilePaths);
}
main();
