import Image from 'next/image';
import React from 'react';
import portraitImage from '/src/images/portrait-full.jpg';

function Home() {
  return (
    <>
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

      {/* <ProjectArchive /> */}
    </>
  );
}
export default Home;
