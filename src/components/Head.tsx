import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { getGravatarUrl } from '../utilities/gravatar';

type Props = { pageTitle: string, pageSlug: string };

function Head({ pageTitle, pageSlug }: Props) {

  const { email, title, tagline, description, googleSiteVerification } = useStaticQuery(query).site.siteMetadata;
  const renderedTitle = pageSlug === '/' ? `${title} | ${tagline}` : `${pageTitle} | ${title}`;
  const appleTouchIcons = [76, 120, 152, 180].map((size) => {
    return { size, url: getGravatarUrl(email, size) };
  });


  return (
    <Helmet htmlAttributes={{ lang: 'en-US' }} title={renderedTitle}>
      <link rel="shortcut icon" href={getGravatarUrl(email, 32)} />
      <link rel="icon" href={getGravatarUrl(email, 192)} sizes="192x192" />
      <meta name="og:title" content={renderedTitle} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={window.location.href} />
      <meta name="og:image" content={getGravatarUrl(email, 1200)} />
      <meta name="og:type" content="website" />
      <meta name="google-site-verification" content={googleSiteVerification} />
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
        title
        tagline
        description
        googleSiteVerification
      }
    }
  }
`;
