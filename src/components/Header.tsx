import Link from 'next/link';
import React from 'react';
import site from '../data/site.json';
import { resizeGravatar } from '../lib/gravatar';
import Navigation from './Navigation';

type Props = { gravatarUrl: string };

function Header({ gravatarUrl }: Props) {
  const headerImageSize = 60;
  const headerGravatarUrl = resizeGravatar(gravatarUrl, headerImageSize);
  const headerGravatarUrlRetina = resizeGravatar(
    gravatarUrl,
    headerImageSize * 2
  );

  return (
    <header className="site-header">
      <Link href="/">
        <a className="site-title-link" rel="home">
          <img
            className="site-header-image"
            src={headerGravatarUrl}
            srcSet={`${headerGravatarUrlRetina} 2x`}
            width={headerImageSize}
            height={headerImageSize}
            alt=""
          />
          <h1 className="site-title">{site.title}</h1>
        </a>
      </Link>
      <Navigation />
    </header>
  );
}
export default Header;
