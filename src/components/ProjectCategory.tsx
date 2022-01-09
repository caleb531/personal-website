import React from 'react';
import SvgIcon from './SvgIcon';
import { ProjectCategoryData, ProjectData } from './types';

type Props = { category: ProjectCategoryData, projects: ProjectData[] };

function ProjectCategory({ category, projects }: Props) {
  return (
    <>
    {projects.length ? <section className="entry-list project-list">

      <h3 className="entry-list-category-title project-list-category-title">
        {category.title}
      </h3>

      {projects.map((project) => {
        return (
          <article className="entry project" key={project.fields.name}>

            <div className="entry-image project-image">
              <a
                href={project.frontmatter.direct_url}
                aria-labelledby={`project-title-${project.fields.name}`}>
                <SvgIcon content={project.icon.fields.svgContents} />
              </a>
            </div>

            <div className="entry-main project-main">

              <h4
                className="entry-title project-title"
                id={`project-title-${project.fields.name}`}>
                <a href={project.frontmatter.direct_url}>
                  {project.frontmatter.title}
                </a>
              </h4>

              <p className="entry-desc project-desc">
                {project.frontmatter.description}
              </p>

            </div>

          </article>
        );
      })}

    </section> : null}
    </>
  );
}
export default ProjectCategory;
