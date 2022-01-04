// Core GraphQL node types


export interface NodeFields {
  name: string;
  collection: string;
}
export interface NodeMap<NodeType> {
  [key: string]: NodeType;
}
export interface MarkdownData<FrontmatterType> {
  frontmatter: FrontmatterType;
}


// Page types


export interface PageFields extends NodeFields {
  // Equivalent shape for now
}
export interface PageFrontmatter {
  title: string;
  slug: string;
}
export interface PageData {
  fields: PageFields;
  frontmatter: PageFrontmatter;
}
type PageMap = NodeMap<PageData>;


// Icon types


export interface IconFields extends NodeFields {
  svgContents: string;
}
export interface IconData {
  fields: IconFields;
}


// Project types


export interface ProjectFields extends NodeFields {
  // Equivalent shape for now
}
export interface ProjectFrontmatter {
  title: string;
  direct_url: string;
  category: string;
  description: string;
}
export interface ProjectData extends MarkdownData<ProjectFrontmatter> {
  icon: IconData;
}
type ProjectMap = NodeMap<ProjectData>;


// Website types


export interface WebsiteFields extends NodeFields {
  // Equivalent shape for now
}
export interface WebsiteFrontmatter {
  title: string;
  direct_url: string;
  category: string;
  description: string;
  start_year: number;
  end_year: number;
}
export interface WebsiteData extends MarkdownData<WebsiteFrontmatter> {
  // Equivalent shape for now
}
type WebsiteMap = NodeMap<WebsiteData>;
