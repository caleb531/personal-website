const { exec } = require('child_process');
const fm = require('front-matter');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const chromePath = path.join('/Applications', 'Google\\ Chrome.app', 'Contents', 'MacOS', 'Google\\ Chrome');
const websiteImageDir = 'src/images/websites';
const resizeImageDir = 'static/images/resized/websites';
const websiteImageExtension = 'jpg';
const windowWidth = 1024;
const windowHeight = 640;
// The delay (in milliseconds) to wait before taking the screenshot
const screenshot_delay = 1000;

// Create website image directory if it doesn't already exist
fs.mkdir(websiteImageDir, { recursive: true }, () => {/* noop */});
// Remove existing directory containing resized images
fs.rmSync(resizeImageDir, { recursive: true, force: true });

// Generate screenshot for the specified file path(s); otherwise, default to
// every file in the /src/websites directory
let websiteConfigFilePaths = process.argv.slice(2);
if (websiteConfigFilePaths.length === 0) {
  websiteConfigFilePaths = glob.sync('src/websites/*.md');
}

// Generate screenshot for each portfolio website that has configuration
websiteConfigFilePaths.forEach((websiteConfigFilePath) => {
  const websiteName = path.basename(websiteConfigFilePath, '.md');
  console.log(`generating screenshot for ${websiteName}`);
  fs.promises.readFile(websiteConfigFilePath, 'utf8').then((websiteConfigFileContents) => {
    const websiteFrontmatter = fm(websiteConfigFileContents).attributes;
    const resizedWebsiteImagePath = path.join(websiteImageDir, `${websiteName}.${websiteImageExtension}`);
    const cmd = `${chromePath} \
      --headless \
      --disable-gpu \
      --disk-cache-size=0 \
      --media-cache-size=0 \
      --window-size=${windowWidth},${windowHeight} \
      --hide-scrollbars \
      --screenshot=${resizedWebsiteImagePath} \
      ${websiteFrontmatter.direct_url}
    `;
    exec(cmd, (err, stdout, stderr) => {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      if (err) {
        console.log(err);
      }
    });
  });
});
