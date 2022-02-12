import React from 'react';
import ProjectArchive from '../components/ProjectArchive';
import { ProjectEntry } from '../components/types';
import { getProjects, withGlobalStaticProps } from '../lib/api';

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
  return withGlobalStaticProps({
    props: {
      title: 'Projects',
      description: 'Apps and programs crafted by Caleb Evans, coder for Christ',
      projects: getProjects()
    }
  });
}

export default Projects;
