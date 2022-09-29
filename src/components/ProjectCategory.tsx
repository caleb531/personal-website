import { keyBy } from 'lodash-es';
import React from 'react';
import Project from './Project';
import { ProjectCategoryData, ProjectEntry } from './types';

type Props = { category: ProjectCategoryData; projects: ProjectEntry[] };

function ProjectCategory({ category, projects }: Props) {
  // Promote some projects to the top of the list
  const topProjectsSet = new Set(category.topProjects);
  // Demote some projects to the end of the list
  const bottomProjectsSet = new Set(category.bottomProjects);
  const projectsById = keyBy(projects, 'id');
  // Re-sort projects list according to the promotion/demotion criteria defined
  // for this category
  projects = [
    ...(category.topProjects || [])
      .map((projectId) => projectsById[projectId])
      // If the user searches for a project, then projectsById[projectId] might
      // return undefined because topProjects may not include any projects that
      // can be shown; to solve this, we filter out all falsy values
      .filter(Boolean),
    ...projects.filter(
      (project) =>
        !topProjectsSet.has(project.id) && !bottomProjectsSet.has(project.id)
    ),
    ...(category.bottomProjects || [])
      .map((projectId) => projectsById[projectId])
      // If the user searches for a project, then projectsById[projectId] might
      // return undefined because bottomProjects may not include any projects
      // that can be shown; to solve this, we filter out all falsy values
      .filter(Boolean)
  ];
  return (
    <>
      {projects.length ? (
        <section className="entry-list project-list">
          <h3 className="entry-list-category-title project-list-category-title">
            {category.title}
          </h3>

          {projects.map((project, p) => {
            return <Project key={project.id} project={project} />;
          })}
        </section>
      ) : null}
    </>
  );
}
export default ProjectCategory;
