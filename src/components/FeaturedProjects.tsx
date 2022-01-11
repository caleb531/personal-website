import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import projectMetadata from '../data/projects.json';
import SvgIcon from './SvgIcon';
import { ProjectMap } from './types';

function FeaturedProjects() {

  const { allMarkdownRemark } = useStaticQuery(query);
  const projectsById: ProjectMap = keyBy(allMarkdownRemark.nodes, 'fields.name');

  return (
    <section className="featured-projects">
      <h3>Featured Projects</h3>
      <div className="entry-list project-list entry-list-compact project-list-compact">
        {projectMetadata.featuredProjects.map((projectId) => {
          const { title, direct_url } = projectsById[projectId].frontmatter;
          const { icon } = projectsById[projectId];
          return (
            <article className="entry project" key={projectId}>

              <div className="entry-image project-image">
                <a href={direct_url}>
                  <SvgIcon content={icon.fields.svgContents} />
                </a>
              </div>
              <span className="project-title" id={`project-title-${projectId}`}>{title}</span>

            </article>
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
