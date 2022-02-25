import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
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

      <a
        className="entry-image project-image"
        href={project.direct_url}
        aria-labelledby={`project-title-${project.id}`}>
        <Image
          src={`/icons/projects/${project.id}.svg`}
          alt=""
          width={80}
          height={80} />
      </a>

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
