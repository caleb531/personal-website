import { groupBy } from 'lodash-es';
import React, { useState } from 'react';
import projectMetadata from '../data/projects.json';
import ProjectCategory from './ProjectCategory';
import { ProjectEntry, ProjectGroups } from './types';

function filterProjects(projects: ProjectEntry[], searchQuery: string): ProjectEntry[] {
  if (searchQuery.trim() === '') {
    return projects;
  }
  return projects.filter((project) => {
    const keywords = [
      ...project.title.toLowerCase().split(' '),
      project.category.toLowerCase(),
      ...project.description.toLowerCase().split(' ')
    ];
    return searchQuery.toLowerCase().split(' ').every((searchKeyword) => {
      return keywords.some((keyword) => {
        return keyword.indexOf(searchKeyword) !== -1;
      });
    });
  });
}

// Disable the browser-native search behavior of reloading the page when the
// <form> element is submitted
function disableNativeFormSubmit(event: React.FormEvent) {
  event.preventDefault();
}

type Props = { projects: ProjectEntry[] };

function FeaturedProjects({ projects }: Props) {

  const [searchQuery, setSearchQuery] = useState('');
  projects = filterProjects(projects, searchQuery);
  const projectsByCategory: ProjectGroups = groupBy(projects, 'category');

  function setSearchQueryFromInput(event: React.FormEvent) {
    setSearchQuery((event.target as HTMLInputElement).value);
  }

  return (
    <div className="project-archive">
      <div className="project-search-container">
        <form className="project-search-container-form" method="GET" action="." onSubmit={disableNativeFormSubmit}>
          <label htmlFor="project-search-input" className="accessibility-only">Search:</label>
          <input
            type="search"
            name="search"
            id="project-search-input"
            value={searchQuery}
            placeholder="Search for a project"
            onInput={setSearchQueryFromInput} />
        </form>
        {projects.length ? (
          <div className="project-search-result-count">{projects.length === 1 ? 'Showing 1 project' : `Showing ${projects.length} projects`}</div>
        ) : (
          <div className="project-search-no-results">
            No Projects Found
          </div>
        )}
      </div>
      <div className="project-list-container">
        {projectMetadata.categories.map((categories, columnIndex) => {
          return (
            <div key={`column-${columnIndex}`} className="project-list-column">
              {categories.map((category) => {
                const projectsInCategory = projectsByCategory[category.id] || [];
                return (
                  <ProjectCategory
                    key={category.id}
                    category={category}
                    projects={projectsInCategory} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default FeaturedProjects;
