

import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

type Props = { children: JSX.Element | JSX.Element[] };

function HomeIntro({ children }: Props) {
  return (
    <article className="home-intro">
      <div className="home-intro-left">
        <StaticImage src="../images/portrait-full.jpg" alt="Caleb Evans" width={180} height={180} />
      </div>
      <div className="home-intro-right">
        {children}
      </div>
    </article>
  );
}

export default HomeIntro;
