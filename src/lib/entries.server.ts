import type { ContactLinkEntry, Entry, ProjectEntry, WebsiteEntry } from '$routes/types';
import { marked } from 'marked';
import path from 'node:path';
import { objectify } from 'radash';

type EntryType = 'contact_link' | 'project' | 'website';
type GlobMap = Record<string, () => Promise<unknown>>;
type EntriesByTypeMap = Record<EntryType, GlobMap>;

// A map where each key name a specific entry type (e.g. project) and each value
// is a map of that entry type's files (for this submap, the key is the filepath
// and the value is a function which returns the contents of the file)
const entriesByType: EntriesByTypeMap = {
  contact_link: import.meta.glob('../contact-links/*.json', { query: '?raw', import: 'default' }),
  project: import.meta.glob('../projects/*.json', { query: '?raw', import: 'default' }),
  website: import.meta.glob('../websites/*.json', { query: '?raw', import: 'default' })
};

// Compute the entry ID from the given path
function getEntryIdFromPath(entryPath: string) {
  return path.basename(entryPath, path.extname(entryPath));
}

// Return an object of the specified fields within the entry data, where the key
// name is that field ID, and the value is the value from the given entry
// object, interpreted as Markdown and converted to HTML
function parseFieldsAsMarkdownIntoHTML(
  entry: Omit<Entry, 'id'>,
  fields: (keyof Omit<Entry, 'id'>)[]
): object {
  return objectify(
    fields,
    (field) => field,
    (field) => marked.parseInline(String(entry[field]))
  );
}

// Retrieve a list of entries for the given entry type, optionally specifying a
// callback function that dynamically defines additional properties to
// initialize the entry with
export async function getEntries<SubEntry extends Entry>(
  entryType: EntryType
): Promise<SubEntry[]> {
  const entryPairs = Object.entries(entriesByType[entryType]);
  return Promise.all(
    entryPairs.map(async ([entryPath, getEntryContents]: [string, GlobMap[string]]) => {
      const entryId = getEntryIdFromPath(entryPath);
      const entryData = JSON.parse(String(await getEntryContents())) as Omit<SubEntry, 'id'>;
      return {
        id: entryId,
        ...entryData,
        // If entry has a 'content' or 'description' property, parse the value
        // as Markdown and convert it to HTML (parseInline ensures there is no
        // <p> tag wrapper around the formatted value)
        ...parseFieldsAsMarkdownIntoHTML(entryData, ['content', 'description'])
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
