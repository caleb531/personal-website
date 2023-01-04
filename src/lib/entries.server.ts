import fs from 'fs';
import { glob } from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';
import type { ContactLinkEntry, Entry, ProjectEntry, WebsiteEntry } from '../routes/types';

// Retrieve a list of entries for the given entry type, optionally specifying a
// callback function that dynamically defines additional properties to
// initialize the entry with
export async function getEntries<SubEntry extends Entry>(entryType: string): Promise<SubEntry[]> {
  const entryDirectory = path.join(process.cwd(), 'src', entryType);
  const entryPaths = glob.sync(`${entryDirectory}/*.md`);
  return entryPaths.map((entryPath) => {
    const entryId = path.basename(entryPath, '.md');
    return {
      id: entryId,
      ...matter(fs.readFileSync(entryPath)).data
    } as SubEntry;
  });
}

export async function getProjects(): Promise<ProjectEntry[]> {
  return getEntries<ProjectEntry>('projects');
}

export async function getContactLinks(): Promise<ContactLinkEntry[]> {
  return getEntries<ContactLinkEntry>('contact-links');
}

export async function getWebsiteEntries(): Promise<WebsiteEntry[]> {
  return getEntries<WebsiteEntry>('websites');
}
