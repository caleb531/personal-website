import fs from 'fs';
import { glob } from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';
import { ContactLinkEntry, Entry, PagePropsWrapper, ProjectEntry, WebsiteEntry } from '../components/types';

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
export function getEntries<SubEntry>(entryType: string, defineAddlProps: (id: string) => object = () => undefined): SubEntry[] {
  const entryDirectory = path.join(process.cwd(), 'src', entryType);
  const entryPaths = glob.sync(`${entryDirectory}/*.md`);
  return entryPaths.map((entryPath) => {
    const entryId = path.basename(entryPath, '.md');
    return {
      id: entryId,
      ...matter(fs.readFileSync(entryPath)).data,
      ...defineAddlProps(entryId)
    } as (Entry & SubEntry);
  });
}

export function getProjects(): ProjectEntry[] {
  return getEntries<ProjectEntry>('projects', (entryId) => {
    return { icon: getEntryIconContents('projects', entryId) };
  });
}

export function getContactLinks(): ContactLinkEntry[] {
  return getEntries<ContactLinkEntry>('contact-links', (entryId) => {
    return { icon: getEntryIconContents('contact-links', entryId) };
  });
}

export function getWebsiteEntries(): WebsiteEntry[] {
  return getEntries<WebsiteEntry>('websites', (entryId) => {
    return { image: `/images/websites/${entryId}.jpg` };
  });
}

// Define props that should be globally available across all pages
export async function withGlobalStaticProps(pageProps: PagePropsWrapper) {
  return {
    props: {
      contactLinks: getContactLinks(),
      ...(pageProps.props)
    }
  };
}
