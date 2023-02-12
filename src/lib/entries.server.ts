import type { ContactLinkEntry, Entry, ProjectEntry, WebsiteEntry } from '../routes/types';

type EntryType = 'contact_link' | 'project' | 'website';
type GlobMap = Record<string, () => Promise<unknown>>;
type ImagetoolsResult = { default: string[] };
type EntriesByTypeMap = Record<EntryType, GlobMap>;

// A map where each key name a specific entry type (e.g. project) and each value
// is a map of that entry type's files (for this submap, the key is the filepath
// and the value is a function which returns the contents of the file)
const entriesByType: EntriesByTypeMap = {
  contact_link: import.meta.glob('../contact-links/*.json', { as: 'raw' }),
  project: import.meta.glob('../projects/*.json', { as: 'raw' }),
  website: import.meta.glob('../websites/*.json', { as: 'raw' })
};

// Resize the website images at build time so that the appropriate (smaller)
// versions of each website image can be served
const resizedWebsiteUrlMap: Record<string, ImagetoolsResult> = import.meta.glob(
  '../images/websites/*.jpg',
  {
    // Generate additional sizes for each pregenerated website image
    query: { format: 'jpg', width: '256;512' },
    // Resolve each import promise and store the final values
    eager: true
  }
);

// Compute the entry ID from the given path
function getEntryIdFromPath(entryPath: string) {
  return entryPath.slice(entryPath.lastIndexOf('/') + 1, entryPath.indexOf('.json'));
}

// Retrieve a list of entries for the given entry type, optionally specifying a
// callback function that dynamically defines additional properties to
// initialize the entry with
export async function getEntries<SubEntry extends Entry>(
  entryType: EntryType
): Promise<SubEntry[]> {
  const entryPairs = Object.entries(entriesByType[entryType]);
  return Promise.all(
    entryPairs.map(async ([entryPath, getEntryContents]: [string, GlobMap[1]]) => {
      const entryId = getEntryIdFromPath(entryPath);
      const entryData = JSON.parse(String(await getEntryContents()));
      return {
        id: entryId,
        ...entryData
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
  const websiteEntries = await getEntries<WebsiteEntry>('website');
  return websiteEntries.map((website) => {
    const [image_url_1x, image_url_2x] =
      resizedWebsiteUrlMap[`../images/websites/${website.id}.jpg`].default;
    return {
      ...website,
      image_url_1x,
      image_url_2x
    };
  });
}
