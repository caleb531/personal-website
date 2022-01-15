import React from 'react';
import Project from './Project';
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
          <Project
            key={project.fields.name}
            project={project} />
        );
      })}

    </section> : null}
    </>
  );
}
export default ProjectCategory;
