import type { ContactLinkEntry, Entry, ProjectEntry, WebsiteEntry } from '$routes/types.ts';
import { marked } from 'marked';
import path from 'node:path';
import YAML from 'yaml';

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
  contact_link: import.meta.glob('$src/contact-links/*.md', { query: '?raw', import: 'default' }),
  project: import.meta.glob('$src/projects/*.md', { query: '?raw', import: 'default' }),
  website: import.meta.glob('$src/websites/*.md', { query: '?raw', import: 'default' })
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

// A regular expression pattern to match the frontmatter of an entry's Markdown
// file
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

// Compute the entry ID from the given path
function getEntryIdFromPath(entryPath: string) {
  return path.basename(entryPath, path.extname(entryPath));
}

// Parse the given Markdown string into an object of entry data, combining both
// the frontmatter from the Markdown file and the remaining Markdown content
// (after the frontmatter)
function parseEntryDataFromString(entryPath: string, entryContent: string): Omit<Entry, 'id'> {
  const match = entryContent.match(frontmatterPattern);
  if (!match) {
    throw new Error(`Entry does not contain frontmatter: ${entryPath}`);
  }
  const fm = match ? (YAML.parse(match[1]) ?? {}) : {};
  const md = match ? entryContent.slice(match[0].length) : entryContent;
  const html = String(marked.parse(md)).trim();
  return {
    ...fm,
    content: html,
    // If entry has a 'content' or 'description' property, parse the value as
    // Markdown and convert it to HTML; marked.parseInline() ensures there is no
    // <p> tag wrapper around the formatted value
    ...(fm.description ? { description: marked.parseInline(fm.description) } : {}),
    ...(fm.content ? { content: marked.parse(fm.content) } : {})
  };
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
      const entryIconPath = `/src/images/${entryTypeToDirName[entryType]}/${entryId}.svg`;
      const entryIconUrl = entryIconMap?.[entryIconPath]
        ? await entryIconMap[entryIconPath]()
        : null;
      const entryData = parseEntryDataFromString(
        entryPath,
        String(await getEntryContents())
      ) as Omit<SubEntry, 'id'>;
      return {
        id: entryId,
        ...entryData,
        // If entry has an icon, add its URL to the object
        ...(entryIconUrl ? { iconUrl: entryIconUrl } : {})
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
