import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { getGravatarUrl } from '../utilities/gravatar';

function Head() {

  const { email } = useStaticQuery(query).site.siteMetadata;
  const appleTouchIcons = [76, 120, 152, 180].map((size) => {
    return { size, url: getGravatarUrl(email, size) };
  });

  return (
    <Helmet>
      <link rel="shortcut icon" href={getGravatarUrl(email, 32)} />
      <link rel="icon" href={getGravatarUrl(email, 192)} sizes="192x192" />
      <meta name="twitter:image" content={getGravatarUrl(email, 250)} />
      {appleTouchIcons.map(({ url, size }) => {
        return <link
          key={url}
          rel="apple-touch-icon"
          href={url}
          sizes={`${size}x${size}`} />;
      })}
    </Helmet>
  );

}
export default Head;

const query = graphql`
  query {
    site {
      siteMetadata {
        email
      }
    }
  }
`;
