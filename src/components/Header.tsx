import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { HeaderQuery } from '../../graphql-types';
import { getGravatarUrl } from '../utilities/gravatar';
import Navigation from './Navigation';

function Header() {

  const queryResults: HeaderQuery = useStaticQuery(query);
  const { siteEmail, siteTitle } = queryResults.site.siteMetadata;
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

export const query = graphql`
  query Header {
    site {
      siteMetadata {
        siteEmail
        siteTitle
      }
    }
  }
`;
