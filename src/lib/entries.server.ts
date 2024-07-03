import type { ContactLinkEntry, Entry, ProjectEntry, WebsiteEntry } from '$routes/types';
import { marked } from 'marked';
import path from 'node:path';
import { objectify } from 'radash';

type EntryType = 'contact_link' | 'project' | 'website';
type GlobMap = Record<string, () => Promise<unknown>>;
type EntriesByTypeMap = Record<EntryType, GlobMap>;

// A map where each key is the (singular) entry type and the value is the
// (plural) name of the directory containing the entries of that type
const entryTypeToDirName: Record<EntryType, string> = {
  contact_link: 'contact-links',
  project: 'projects',
  website: 'websites'
};

// A map where each key name is a specific entry type (e.g. project) and each
// value is a map of that entry type's data files (for this submap, the key is
// the filepath and the value is a function which returns the project details as
// JSON)
const entriesByType: EntriesByTypeMap = {
  contact_link: import.meta.glob('$src/contact-links/*.json', { query: '?raw', import: 'default' }),
  project: import.meta.glob('$src/projects/*.json', { query: '?raw', import: 'default' }),
  website: import.meta.glob('$src/websites/*.json', { query: '?raw', import: 'default' })
};

// A map where each key name is a specific entry type (e.g. project) and each
// value is a map of that entry type's icon files (for this submap, the key is the
// filepath and the value is a function which returns the entry icon as an SVG file)
const entryIconsByType: Partial<EntriesByTypeMap> = {
  contact_link: import.meta.glob('$src/images/contact-links/*.svg', {
    query: '?url',
    import: 'default'
  }),
  project: import.meta.glob('$src/images/projects/*.svg', { query: '?url', import: 'default' })
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
      const entryIconMap = entryIconsByType[entryType];
      const entryIconUrl = entryIconMap
        ? await entryIconMap[`/src/images/${entryTypeToDirName[entryType]}/${entryId}.svg`]()
        : null;
      const entryData = JSON.parse(String(await getEntryContents())) as Omit<SubEntry, 'id'>;
      return {
        id: entryId,
        ...entryData,
        // If entry has an icon, add its URL to the object
        ...(entryIconUrl ? { iconUrl: entryIconUrl } : {}),
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
