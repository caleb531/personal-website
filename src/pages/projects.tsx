import React from 'react';
import ProjectArchive from '../components/ProjectArchive';
import { ProjectEntry } from '../components/types';
import { getEntriesOfType } from '../lib/api';

type Props = { projects: ProjectEntry[] };

function Projects({ projects }: Props) {
  return (
    <div className="page-projects">
      <p>This is a collection of projects I've developed in my spare time including one-pager web apps, Python programs, and JavaScript libraries.</p>
      <ProjectArchive projects={projects} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      projects: getEntriesOfType('projects')
    }
  };
}

export default Projects;
