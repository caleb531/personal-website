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

export interface ProjectEntry extends Entry {
  // Equivalent shape for now
}
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

export interface ContactLinkEntry extends Entry {
  // Equivalent shape for now
}
