import Image from 'next/image';
import React from 'react';
import ProjectArchive from '../components/ProjectArchive';
import { getEntriesOfType } from '../lib/api';
import portraitImage from '/src/images/portrait-full.jpg';

type Props = { projects: ProjectEntry[] };

function Home({ projects }: Props) {
  return (
    <div className="page-home">
      <article className="home-intro">
        <div className="home-intro-left">
          <div className="home-intro-photo">
            <Image src={portraitImage} alt="Caleb Evans" width={180} height={180} />
          </div>
        </div>
        <div className="home-intro-right">
          <p><strong>Hi, I'm Caleb</strong>, a web developer who lives for Christ by building enjoyable apps &amp; useful tools. <strong>Take&nbsp;a&nbsp;look&nbsp;around!</strong></p>
        </div>
      </article>

      <ProjectArchive projects={projects} />
    </div>
  );
}
export default Home;

export async function getStaticProps() {
  return {
    props: {
      projects: getEntriesOfType('projects')
    }
  };
}
