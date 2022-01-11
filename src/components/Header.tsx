import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { getGravatarUrl } from '../utilities/gravatar';
import Navigation from './Navigation';

function Header() {

  const { siteEmail, siteTitle } = useStaticQuery(query).site.siteMetadata;
  const headerImageSize = 60;
  const gravatarUrl = getGravatarUrl(siteEmail, headerImageSize);
  const gravatarUrlRetina = getGravatarUrl(siteEmail, headerImageSize * 2);

  return (
    <header className="site-header">
      <Link to="/" className="site-title-link" rel="home">
        <img
          className="site-header-image"
          src={gravatarUrl}
          srcSet={`${gravatarUrlRetina} 2x`}
          width={headerImageSize} height={headerImageSize}
          alt="" />
        <h1 className="site-title">{siteTitle}</h1>
      </Link>
      <Navigation />
    </header>
  );
}
export default Header;

const query = graphql`
  query {
    site {
      siteMetadata {
        siteEmail
        siteTitle
      }
    }
  }
`;
