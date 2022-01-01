import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { getGravatarUrl } from '../utilities/gravatar';
import Navigation from './Navigation';

function Header() {

  const { email, title } = useStaticQuery(query).site.siteMetadata;
  const headerImageSize = 60;
  const gravatarUrl = getGravatarUrl(email, headerImageSize);
  const gravatarUrlRetina = getGravatarUrl(email, headerImageSize * 2);

  return (
    <header id="site-header">
      <a href="/" id="site-title-link" rel="home">
        <img
          id="site-header-image"
          src={gravatarUrl}
          srcSet={`${gravatarUrlRetina} 2x`}
          width={headerImageSize} height={headerImageSize}
          alt="" />
        <h1 id="site-title">{title}</h1>
      </a>
      <Navigation />
    </header>
  );
}
export default Header;

const query = graphql`
  query {
    site {
      siteMetadata {
        email
        title
      }
    }
  }
`;
