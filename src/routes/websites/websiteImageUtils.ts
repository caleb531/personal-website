import type { WebsiteEntry } from '$routes/types';

type ImagetoolsResult = { default: string[] };
type GlobUrlMap = Record<string, ImagetoolsResult>;

// Resize the website images at build time so that the appropriate (smaller)
// versions of each website image can be served
export const resizedWebsiteUrlMap: GlobUrlMap = import.meta.glob('../../images/websites/*.jpg', {
  // Generate additional sizes for each pregenerated website image
  query: { width: '256;512' },
  // Resolve each import promise and store the final values
  eager: true
});

// Retrieve the URL to the regular-sized thumbnail for this website
export function getWebsite1xThumbnailUrl(website: WebsiteEntry): string {
  const imagePath = `../../images/websites/${website.id}.jpg`;
  return resizedWebsiteUrlMap[imagePath].default[0];
}

// Retrieve the URL to the high-density (Retina) thumbnail for this website
export function getWebsite2xThumbnailUrl(website: WebsiteEntry): string {
  const imagePath = `../../images/websites/${website.id}.jpg`;
  return resizedWebsiteUrlMap[imagePath].default[1];
}
