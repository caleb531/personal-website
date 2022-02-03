import classNames from 'classnames';
import React from 'react';
import SvgIcon from './SvgIcon';
import { ProjectData } from './types';

type Props = { project: ProjectData, animationDelay: number, isCompact?: boolean };

function Project({ project, animationDelay, isCompact = false }: Props) {
  return (
    <article className={classNames(
      'entry',
      'project',
      { 'entry-compact': isCompact },
      { 'project-compact': isCompact }
    )}>

      <div className="entry-image project-image">
        <a
          href={project.frontmatter.direct_url}
          aria-labelledby={`project-title-${project.fields.name}`}>
          <SvgIcon content={project.icon.fields.svgContents} animationDelay={animationDelay} />
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

        {project.frontmatter.description && !isCompact ? (
          <p className="entry-desc project-desc">
            {project.frontmatter.description}
          </p>
        ) : null}

      </div>

    </article>
  );
}
export default Project;
