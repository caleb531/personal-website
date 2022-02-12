export interface PageProps {
  title: string;
  description: string;
}

export interface Entry {
  id: string;
  title: string;
  direct_url: string;
  category: string;
  description: string;
}
export interface EntryMap<SubEntry> {
  [key: string]: SubEntry
}

export interface ProjectEntry extends Entry {
  // Equivalent shape for now
}
export type ProjectMap = EntryMap<ProjectEntry>;
export interface ProjectGroups {
  [key: string]: ProjectEntry[];
}
export interface ProjectCategoryData {
  id: string;
  title: string;
}

export interface WebsiteEntry {
  technologies: string;
  start_year: number;
  end_year: number;
}
export type WebsiteMap = EntryMap<WebsiteEntry>;

export interface ContactLinkEntry extends Entry {
  // Equivalent shape for now
}
