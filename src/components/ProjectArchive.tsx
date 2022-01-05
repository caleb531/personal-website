import { graphql, useStaticQuery } from 'gatsby';
import { groupBy } from 'lodash-es';
import React from 'react';
import projectMetadata from '../data/projects.json';
import ProjectCategory from './ProjectCategory';
import { ProjectGroups } from './types';

function FeaturedProjects() {

  const { allMarkdownRemark } = useStaticQuery(query);
  const projectsByCategory: ProjectGroups = groupBy(allMarkdownRemark.nodes, 'frontmatter.category');

  return (
    <div className="project-list-container">
      {projectMetadata.categories.map((categories, columnIndex) => {
        return (
          <div key={`column-${columnIndex}`} className="project-list-column">
            {categories.map((category) => {
              const projectsInCategory = projectsByCategory[category.slug];
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
  );
}
export default FeaturedProjects;

const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { collection: { eq: "projects" } } }) {
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
