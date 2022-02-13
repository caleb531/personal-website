import classNames from 'classnames';
import React from 'react';
import SvgIcon from './SvgIcon';
import { ProjectEntry } from './types';

type Props = { project: ProjectEntry, animationDelay?: number, isCompact?: boolean };

function Project({ project, animationDelay = null, isCompact = false }: Props) {
  return (
    <article className={classNames(
      'entry',
      'project',
      { 'entry-compact': isCompact },
      { 'project-compact': isCompact }
    )}>

      <div className="entry-image project-image">
        <a
          href={project.direct_url}
          aria-labelledby={`project-title-${project.id}`}>
          <SvgIcon content={project.iconContents} animationDelay={animationDelay} />
        </a>
      </div>

      <div className="entry-main project-main">

        <h4
          className="entry-title project-title"
          id={`project-title-${project.id}`}>
          <a href={project.direct_url}>
            {project.title}
          </a>
        </h4>

        {project.description && !isCompact ? (
          <p className="entry-desc project-desc">
            {project.description}
          </p>
        ) : null}

      </div>

    </article>
  );
}
export default Project;
