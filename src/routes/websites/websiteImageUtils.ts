import type { WebsiteEntry } from '$routes/types';

type GlobUrlMap = Record<string, string[]>;

// Resize the website images at build time so that the appropriate (smaller)
// versions of each website image can be served
export const resizedWebsiteUrlMap: GlobUrlMap = import.meta.glob('$src/images/websites/*.jpg', {
  // Generate additional sizes for each pregenerated website image (note that as
  // of vite-imagetools v5, the 'width' query parameter has been renamed to 'w';
  // see
  // <https://github.com/JonasKruckenberg/imagetools/blob/main/packages/vite/CHANGELOG.md#major-changes-2>)
  query: { w: '256;512' },
  import: 'default',
  // Resolve each import promise and store the final values
  eager: true
});

// Retrieve the URL to the regular-sized thumbnail for this website
export function getWebsite1xThumbnailUrl(website: WebsiteEntry): string {
  const imagePath = `/src/images/websites/${website.id}.jpg`;
  return resizedWebsiteUrlMap[imagePath][0];
}

// Retrieve the URL to the high-density (Retina) thumbnail for this website
export function getWebsite2xThumbnailUrl(website: WebsiteEntry): string {
  const imagePath = `/src/images/websites/${website.id}.jpg`;
  return resizedWebsiteUrlMap[imagePath][1];
}
