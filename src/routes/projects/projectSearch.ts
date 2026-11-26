import projectMetadata from '#data/projects.json' with { type: 'json' };
import type { ProjectEntry } from '#routes/types.ts';

// Category titles indexed by ID so searches can match the displayed titles
const categoryTitles = Object.fromEntries(
  projectMetadata.categoriesByColumn.flat().map((category) => [category.id, category.title])
);

// Display labels indexed by the tag IDs used in project frontmatter
const tagLabels = new Map(Object.entries(projectMetadata.tags));

// Return display labels in the order the project's tags were authored
export function getProjectTagLabels(project: ProjectEntry) {
  return (project.tags ?? []).flatMap((tag) => tagLabels.get(tag) ?? []);
}

// Return projects whose searchable fields contain every word in the query
export function filterProjects(projects: ProjectEntry[], searchQuery: string) {
  // The words to match, with case and surrounding whitespace removed
  const query = searchQuery.trim().toLowerCase();
  if (!query) {
    return projects;
  }

  // Each word can match a different field or part of a longer word
  const searchWords = query.split(/\s+/);
  return projects.filter((project) => {
    // The text shown on the project card and in its category heading
    const keywords = [
      project.title,
      categoryTitles[project.category.toLowerCase()],
      project.description.replace(/<[^>]+>/g, ' '),
      ...getProjectTagLabels(project)
    ].map((field) => field.toLowerCase());
    return searchWords.every((word) => keywords.some((field) => field.includes(word)));
  });
}
