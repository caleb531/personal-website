import fs from 'fs';
import { glob } from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';
import type {
  ContactLinkEntry,
  Entry,
  ProjectEntry,
  WebsiteEntry
} from '../components/types';

// Retrieve a list of entries for the given entry type, optionally specifying a
// callback function that dynamically defines additional properties to
// initialize the entry with
export function getEntries<SubEntry>(entryType: string): SubEntry[] {
  const entryDirectory = path.join(process.cwd(), 'src', entryType);
  const entryPaths = glob.sync(`${entryDirectory}/*.md`);
  return entryPaths.map((entryPath) => {
    const entryId = path.basename(entryPath, '.md');
    return {
      id: entryId,
      ...matter(fs.readFileSync(entryPath)).data
    } as Entry & SubEntry;
  });
}

export function getProjects(): ProjectEntry[] {
  return getEntries<ProjectEntry>('projects');
}

export function getContactLinks(): ContactLinkEntry[] {
  return getEntries<ContactLinkEntry>('contact-links');
}

export function getWebsiteEntries(): WebsiteEntry[] {
  return getEntries<WebsiteEntry>('websites');
}
