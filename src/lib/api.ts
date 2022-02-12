import fs from 'fs';
import { glob } from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';
import { ContactLinkEntry, Entry, ProjectEntry } from '../components/types';

// Retrieve the path to the raster image for an entry
function getImagePath(entryType: string, entryId: string): string {
  return path.join(process.cwd(), 'src', 'images', entryType, `${entryId}.jpg`);
}
// Retrieve the path to the SVG icon for the given entry
function getEntryIconPath(entryType: string, entryId: string): string {
  return path.join(process.cwd(), 'public', 'icons', entryType, `${entryId}.svg`);
}

// Strip out extraneous information from the contents of an SVG file
function minifySVGContents(data: string): string {
  return data
    .replace(/\s*xmlns(:[a-z]+)?=(['"])(.*?)\2\s*/gi, '')
    .replace(/<!--(.*?)-->/gi, '');
}
// Retrieve the contents of the SVG icon for the given entry
function getEntryIconContents(entryType: string, entryId: string): string {
  return minifySVGContents(
    String(fs.readFileSync(getEntryIconPath(entryType, entryId)))
  );
}

// Retrieve a list of entries for the given entry type, optionally specifying a
// callback function that dynamically defines additional properties to
// initialize the entry with
export function getEntries(entryType: string, defineAddlProps: (id: string) => object = () => undefined): Entry[] {
  const entryDirectory = path.join(process.cwd(), 'src', entryType);
  const entryPaths = glob.sync(`${entryDirectory}/*.md`);
  return entryPaths.map((entryPath) => {
    const entryId = path.basename(entryPath, '.md');
    return {
      id: entryId,
      ...matter(fs.readFileSync(entryPath)).data,
      ...defineAddlProps(entryId)
    } as Entry;
  });
}

export function getProjects(): ProjectEntry[] {
  return getEntries('projects', (entryId) => {
    return { icon: getEntryIconContents('projects', entryId) };
  });
}

export function getContactLinks(): ContactLinkEntry[] {
  return getEntries('contact-links', (entryId) => {
    return { icon: getEntryIconContents('contact-links', entryId) };
  });
}

export function getWebsiteEntries(): ContactLinkEntry[] {
  return getEntries('websites', (entryId) => {
    return { image: `/images/websites/${entryId}.jpg` };
  });
}
