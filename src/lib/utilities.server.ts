import type { Entry } from '$routes/types.ts';
import { marked } from 'marked';
import YAML from 'yaml';

// A regular expression pattern to match the frontmatter of an entry's Markdown
// file
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

// Parse the given Markdown string into an object of entry data, combining both
// the frontmatter from the Markdown file and the remaining Markdown content
// (after the frontmatter)
export function parseEntryDataFromString(
  entryPath: string,
  entryContent: string
): Omit<Entry, 'id'> {
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
