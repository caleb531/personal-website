import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import { FeaturedProjectsQuery } from '../../graphql-types';
import projectMetadata from '../data/projects.json';
import Project from './Project';
import { ProjectMap } from './types';

function FeaturedProjects() {

  const queryResults: FeaturedProjectsQuery = useStaticQuery(query);
  const { allMarkdownRemark } = queryResults;
  const projectsByName: ProjectMap = keyBy(allMarkdownRemark.nodes, 'fields.name');
  const initialAnimationDelay = 200;
  const animationDelay = 200;

  return (
    <section className="featured-projects">
      <h3>Featured Projects</h3>
      <div className="entry-list project-list entry-list-compact project-list-compact">
        {projectMetadata.featuredProjects.map((projectName, p) => {
          const project = projectsByName[projectName];
          return (
            <Project
              key={project.fields.name}
              project={project}
              animationDelay={initialAnimationDelay + (animationDelay * p)}
              isCompact />
          );
        })}
      </div>
    </section>
  );
}
export default FeaturedProjects;

export const query = graphql`
  query FeaturedProjects {
    allMarkdownRemark(filter: { fields: { collection: { eq: "projects" } } }) {
      nodes {
        fields {
          name
          collection
        }
        frontmatter {
          title
          direct_url
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
