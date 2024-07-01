export interface PageProps {
  id: string;
  title?: string;
  description?: string;
}
export interface PagePropsWrapper {
  props: PageProps;
}

export interface Entry {
  id: string;
  title: string;
  direct_url: string;
  description: string;
  content?: string;
  iconUrl?: string;
}
export type EntryMap<SubEntry> = Record<string, SubEntry>;

export interface ProjectEntry extends Entry {
  category: string;
}
export type ProjectMap = EntryMap<ProjectEntry>;
export type ProjectGroups = Partial<Record<string, ProjectEntry[]>>;
export interface ProjectCategoryData {
  id: string;
  title: string;
  column: string;
  topProjects?: string[];
  bottomProjects?: string[];
}
export type ProjectCategoryMap = Record<string, ProjectCategoryData>;

export interface WebsiteEntry extends Entry {
  technologies: string;
  start_year: number;
  end_year: number;
}
export type WebsiteMap = EntryMap<WebsiteEntry>;

export type ContactLinkEntry = Entry;
export type ContactLinkMap = EntryMap<ContactLinkEntry>;
