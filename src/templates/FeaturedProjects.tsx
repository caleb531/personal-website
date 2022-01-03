import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import projectMetadata from '../data/projects.json';

export type NodeFields = { id: string, contentType: string };
export type ProjectFrontmatter = { title: string, direct_url: string };
export type ProjectData = {
  fields: NodeFields,
  frontmatter: ProjectFrontmatter,
  icon: { fields: { svgContents: string } }
};
export type FileData = {
  fields: NodeFields;
}
export type ProjectMap = { [key: string]: ProjectData };

function FeaturedProjects() {

  const { allMarkdownRemark } = useStaticQuery(query);
  const allProjects = allMarkdownRemark.nodes.filter((node: ProjectData) => {
    return node.fields.contentType === 'projects';
  });
  const projectsById: ProjectMap = keyBy(allProjects, (project: ProjectData) => {
    return project.fields.id;
  });

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
                <a
                  href={direct_url}
                  dangerouslySetInnerHTML={{ __html: icon.fields.svgContents }} />
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

const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        fields {
          id
          contentType
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
