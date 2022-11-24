import Image from 'next/image';
import ProjectArchive from '../components/ProjectArchive';
import { ProjectEntry } from '../components/types';
import { getProjects } from '../lib/entries';
import { withGlobalStaticProps } from '../lib/page';

type Props = { projects: ProjectEntry[] };

function Home({ projects }: Props) {
  return (
    <div className="page-home">
      <article className="home-intro">
        <div className="home-intro-left">
          <div className="home-intro-photo">
            {/* There is a NextJS quirk that requires images to be in the public/ directory, and outside src/, when used with the <Image /> component (source: https://github.com/vercel/next.js/issues/19105#issuecomment-750408928) */}
            <Image
              src="/images/portrait-full.jpg"
              alt="Caleb Evans"
              width={180}
              height={180}
              className="home-intro-photo-image"
              // Setting priority=true disables lazy loading and enables
              // preloading on the image, since it is above-the-fold (source:
              // https://nextjs.org/docs/api-reference/next/image#priority)
              priority={true}
            />
          </div>
        </div>
        <div className="home-intro-right">
          <p>
            <strong>Hi, I'm Caleb</strong>, a web developer who lives for Christ
            by building enjoyable apps &amp; useful tools.{' '}
            <strong>Take&nbsp;a&nbsp;look&nbsp;around!</strong>
          </p>
        </div>
      </article>

      <ProjectArchive projects={projects} />
    </div>
  );
}
export default Home;

export async function getStaticProps() {
  return withGlobalStaticProps({
    props: {
      projects: getProjects()
    }
  });
}
