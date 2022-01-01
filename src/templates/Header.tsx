import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { getGravatar } from '../utilities/gravatar';
import Navigation from './Navigation';

function Header() {

  const { email, title } = useStaticQuery(query).site.siteMetadata;
  const headerImageSize = 60;

  return (
    <header id="site-header">
      <a href="/" id="site-title-link" rel="home">
        <img
          id="site-header-image"
          src={getGravatar(email, headerImageSize)}
          srcSet={`${getGravatar(email, headerImageSize * 2)} 2x`}
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
      }
    }
  }
`;
