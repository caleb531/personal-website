import React from 'react';
import Project from './Project';
import { ProjectCategoryData, ProjectEntry } from './types';

type Props = { category: ProjectCategoryData, projects: ProjectEntry[] };

function ProjectCategory({ category, projects }: Props) {
  return (
    <>
    {projects.length ? <section className="entry-list project-list">

      <h3 className="entry-list-category-title project-list-category-title">
        {category.title}
      </h3>

      {projects.map((project, p) => {
        return (
          <Project
            key={project.id}
            project={project} />
        );
      })}

    </section> : null}
    </>
  );
}
export default ProjectCategory;
