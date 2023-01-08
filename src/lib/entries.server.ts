import matter from 'gray-matter';
import path from 'path';
import type { ContactLinkEntry, Entry, ProjectEntry, WebsiteEntry } from '../routes/types';

type EntryType = 'contact_link' | 'project' | 'website';
type GlobMap = Record<string, () => Promise<unknown>>;
type EntriesByTypeMap = Record<EntryType, GlobMap>;

// A map where each key name a specific entry type (e.g. project) and each value
// is a map of that entry type's files (for this submap, the key is the filepath
// and the value is a function which returns the contents of the file)
const entriesByType: EntriesByTypeMap = {
  contact_link: import.meta.glob('../contact-links/*.md', { as: 'raw' }),
  project: import.meta.glob('../projects/*.md', { as: 'raw' }),
  website: import.meta.glob('../websites/*.md', { as: 'raw' })
};

// Retrieve a list of entries for the given entry type, optionally specifying a
// callback function that dynamically defines additional properties to
// initialize the entry with
export async function getEntries<SubEntry extends Entry>(
  entryType: EntryType
): Promise<SubEntry[]> {
  const entryPairs = Object.entries(entriesByType[entryType]);
  return Promise.all(
    entryPairs.map(async ([entryPath, getEntryContents]: [string, GlobMap[1]]) => {
      const entryId = path.basename(entryPath, '.md');
      const rawEntryObj = matter(String(await getEntryContents()));
      return {
        id: entryId,
        ...rawEntryObj.data,
        content: rawEntryObj.content
      } as SubEntry;
    })
  );
}

export async function getProjects(): Promise<ProjectEntry[]> {
  return getEntries<ProjectEntry>('project');
}

export async function getContactLinks(): Promise<ContactLinkEntry[]> {
  return getEntries<ContactLinkEntry>('contact_link');
}

export async function getWebsiteEntries(): Promise<WebsiteEntry[]> {
  return getEntries<WebsiteEntry>('website');
}
