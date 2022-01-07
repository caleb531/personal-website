// Core GraphQL node types


export interface NodeFields {
  name: string;
  collection: string;
}
export interface NodeMap<NodeType> {
  [key: string]: NodeType;
}
export interface MarkdownData<FrontmatterType> {
  fields: NodeFields;
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


export interface ProjectFrontmatter {
  title: string;
  direct_url: string;
  category: string;
  description: string;
}
export interface ProjectCategoryData {
  slug: string;
  title: string;
}
export interface ProjectData extends MarkdownData<ProjectFrontmatter> {
  icon: IconData;
}
export interface ProjectGroups {
  [key: string]: ProjectData[];
}
type ProjectMap = NodeMap<ProjectData>;


// Website types


export interface WebsiteFrontmatter {
  title: string;
  direct_url: string;
  technologies: string;
  description: string;
  start_year: number;
  end_year: number;
}
export interface WebsiteData extends MarkdownData<WebsiteFrontmatter> {
  // TODO: eliminate the use of `any` once we have the Website Archive built
  image: any;
}
type WebsiteMap = NodeMap<WebsiteData>;


// Contact links


export interface ContactLinkFrontmatter {
  title: string;
  direct_url: string;
  description: string;
}
export interface ContactLinkData extends MarkdownData<ContactLinkFrontmatter> {
  // Equivalent shape for now
  icon: IconData;
}
type ContactLinkMap = NodeMap<ContactLinkData>;
