import Link from 'next/link';
import React from 'react';
import site from '../data/site.json';
import { getGravatarUrl } from '../utilities/gravatar';
import Navigation from './Navigation';

function Header() {

  const headerImageSize = 60;
  const gravatarUrl = getGravatarUrl(site.email, headerImageSize);
  const gravatarUrlRetina = getGravatarUrl(site.email, headerImageSize * 2);

  return (
    <header className="site-header">
      <Link href="/">
        <a className="site-title-link" rel="home">
          <img
          className="site-header-image"
          src={gravatarUrl}
          srcSet={`${gravatarUrlRetina} 2x`}
          width={headerImageSize} height={headerImageSize}
          alt="" />
        <h1 className="site-title">{site.title}</h1>
        </a>
      </Link>
      <Navigation />
    </header>
  );
}
export default Header;
