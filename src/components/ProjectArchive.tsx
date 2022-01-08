import { graphql, useStaticQuery } from 'gatsby';
import { groupBy } from 'lodash-es';
import React, { useState } from 'react';
import projectMetadata from '../data/projects.json';
import ProjectCategory from './ProjectCategory';
import { ProjectData, ProjectGroups } from './types';

function filterProjects(projects: ProjectData[], searchQuery: string): ProjectData[] {
  if (searchQuery.trim() === '') {
    return projects;
  }
  return projects.filter((project) => {
    const keywords = [
      ...project.frontmatter.title.toLowerCase().split(' '),
      project.frontmatter.category.toLowerCase(),
      ...project.frontmatter.description.toLowerCase().split(' ')
    ];
    return searchQuery.toLowerCase().split(' ').every((searchKeyword) => {
      return keywords.some((keyword) => {
        return keyword.indexOf(searchKeyword) !== -1;
      });
    });
  });
}

function FeaturedProjects() {

  const { allMarkdownRemark } = useStaticQuery(query);
  const [searchQuery, setSearchQuery] = useState('');
  const projects = filterProjects(allMarkdownRemark.nodes, searchQuery);
  const projectsByCategory: ProjectGroups = groupBy(projects, 'frontmatter.category');

  function setSearchQueryFromInput(event: React.FormEvent) {
    setSearchQuery((event.target as HTMLInputElement).value);
  }

  return (
    <div className="project-archive">
      <div className="project-search-container">
        <div className="project-search-container-form">
          <label htmlFor="project-search-input">Search:</label>
          <input
            type="text"
            name="search"
            id="project-search-input"
            value={searchQuery}
            placeholder="Search for a project"
            onInput={setSearchQueryFromInput} />
        </div>
        {!projects.length ? (
          <div className="project-search-no-results">
            No Projects Found
          </div>
        ) : null}
      </div>
      <div className="project-list-container">
        {projectMetadata.categories.map((categories, columnIndex) => {
          return (
            <div key={`column-${columnIndex}`} className="project-list-column">
              {categories.map((category) => {
                const projectsInCategory = projectsByCategory[category.slug] || [];
                return (
                  <ProjectCategory
                    key={category.slug}
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

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { fields: frontmatter___title }
    ) {
      nodes {
        fields {
          name
          collection
        }
        frontmatter {
          title
          direct_url
          category
          description
        }
        icon {
          fields {
            svgContents
          }
        }
      }
    }
  }
`;
