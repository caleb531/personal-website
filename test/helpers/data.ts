import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { parseEntryDataFromString } from '../../src/lib/utilities.server.ts';
import type { Entry, ProjectEntry, WebsiteEntry } from '../../src/routes/types.ts';
import projectConfig from '../../src/data/projects.json' with { type: 'json' };
import websiteConfig from '../../src/data/websites.json' with { type: 'json' };
import contactConfig from '../../src/data/contact-links.json' with { type: 'json' };
export { default as navigation } from '../../src/data/navigation.json' with { type: 'json' };
export { default as site } from '../../src/data/site.json' with { type: 'json' };

// Read every Markdown entry without importing the Vite-dependent entry loader
export function readSourceEntries<T extends Entry>(directory: string): T[] {
  return readdirSync(`src/${directory}`)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map(
      (name) =>
        ({
          id: name.slice(0, -3),
          ...parseEntryDataFromString(name, readFileSync(`src/${directory}/${name}`, 'utf8'))
        }) as T
    );
}

// Source entries and configured display constraints; tests never mutate these values
export const projects = readSourceEntries<ProjectEntry>('projects');
// The category columns as authored in the archive configuration
export const columns = projectConfig.categoriesByColumn;
// All website Markdown entries indexed before applying the configured display order
const websiteEntries = readSourceEntries<WebsiteEntry>('websites');
// All contact Markdown entries indexed before applying the configured display order
const contactEntries = readSourceEntries<Entry>('contact-links');
// Website entries in their configured display order
export const websites = websiteConfig.websites.map((id) => {
  // The Markdown entry required by this configured website ID
  const website = websiteEntries.find((entry) => entry.id === id);
  assert.ok(website, `Missing Markdown source for configured website: ${id}`);
  return website;
});
// Contact entries in their configured display order
export const contacts = contactConfig.contactLinks.map((id) => {
  // The Markdown entry required by this configured contact ID
  const contact = contactEntries.find((entry) => entry.id === id);
  assert.ok(contact, `Missing Markdown source for configured contact: ${id}`);
  return contact;
});
// Routes are application behavior rather than editable content
export const routes = ['/', '/about/', '/projects/', '/websites/', '/contact/', '/privacy-policy/'];
