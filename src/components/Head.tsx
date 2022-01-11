import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { getGravatarUrl } from '../utilities/gravatar';

type Props = { pageTitle: string, pageSlug: string };

function Head({ pageTitle, pageSlug }: Props) {

  const { siteUrl, siteTitle, siteTagline, siteDescription, siteEmail, googleSiteVerification } = useStaticQuery(query).site.siteMetadata;

  const renderedTitle = pageSlug === '/' ?
    `${siteTitle} | ${siteTagline}` :
    `${pageTitle} | ${siteTitle}`;

  const appleTouchIcons = [76, 120, 152, 180].map((size) => {
    return { size, url: getGravatarUrl(siteEmail, size) };
  });

  return (
    <Helmet htmlAttributes={{ lang: 'en-US' }} title={renderedTitle}>
      <link rel="shortcut icon" href={getGravatarUrl(siteEmail, 32)} />
      <link rel="icon" href={getGravatarUrl(siteEmail, 192)} sizes="192x192" />
      <meta name="og:title" content={renderedTitle} />
      <meta name="og:description" content={siteDescription} />
      <meta name="og:url" content={window.location.href} />
      <meta name="og:image" content={getGravatarUrl(siteEmail, 1200)} />
      <meta name="og:type" content="website" />
      <meta name="google-site-verification" content={googleSiteVerification} />
      <link rel="alternate" hrefLang="en-US" href={siteUrl} />
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
        siteUrl
        siteEmail
        siteTitle
        siteTagline
        siteDescription
        googleSiteVerification
      }
    }
  }
`;
