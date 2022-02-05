import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { HeadQuery } from '../../graphql-types';
import { getGravatarUrl } from '../utilities/gravatar';

type Props = { pageTitle: string, pageSlug: string };

function Head({ pageTitle, pageSlug }: Props) {

  const queryResults: HeadQuery = useStaticQuery(query);
  const {
    siteUrl,
    siteTitle,
    siteTagline,
    siteDescription,
    siteEmail,
    twitterUsername,
    googleSiteVerification
  } = queryResults.site.siteMetadata;
  const { allGoogleFontCss } = queryResults;
  const isHomepage = pageSlug === '/';
  const pageSeoTitle = (isHomepage ? `${siteTitle} | ${siteTagline}` : pageTitle);
  const pageSeoUrl = siteUrl + pageSlug;
  const pageSeoImage = `${siteUrl}/images/social-preview.jpg`;

  const renderedTitle = isHomepage ?
    `${siteTitle} | ${siteTagline}` :
    `${pageTitle} | ${siteTitle}`;

  const appleTouchIcons = [76, 120, 152, 180].map((size) => {
    return { size, url: getGravatarUrl(siteEmail, size) };
  });

  const jsonLd = {
    description: siteDescription,
    headline: isHomepage ? siteTitle : pageTitle,
    url: pageSeoUrl,
    '@type': isHomepage ? 'WebSite' : 'WebPage',
    name: isHomepage ? siteTitle : pageTitle,
    '@context': 'https://schema.org'
  };

  return (
    <Helmet
      htmlAttributes={{ lang: 'en-US' }}
      bodyAttributes={{ 'data-page-slug': pageSlug }}
      title={renderedTitle}>
      <link rel="shortcut icon" href={getGravatarUrl(siteEmail, 32)} />
      <link rel="icon" href={getGravatarUrl(siteEmail, 192)} sizes="192x192" />

      <meta name="og:title" content={pageSeoTitle} />
      <meta name="og:site_title" content={siteTitle} />
      <meta name="og:description" content={siteDescription} />
      <meta name="og:url" content={pageSeoUrl} />
      <meta name="og:image" content={pageSeoImage} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={pageSeoTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={pageSeoImage} />
      <meta name="google-site-verification" content={googleSiteVerification} />
      <link rel="canonical" href={pageSeoUrl} />
      <link rel="alternate" hrefLang="en-US" href={pageSeoUrl} />
      <script type="application/ld+json">{`${JSON.stringify(jsonLd)}`}</script>
      {appleTouchIcons.map(({ url, size }) => {
        return <link
          key={url}
          rel="apple-touch-icon"
          href={url}
          sizes={`${size}x${size}`} />;
      })}
      {allGoogleFontCss.nodes.map(({ url, css }) => {
        return css ?
          <style key={url} data-href={url} data-keep-inline>{css}</style> :
          <link key={url} rel="stylesheet" href={url} />;
      })}
    </Helmet>
  );

}
export default Head;

export const query = graphql`
  query Head {
    site {
      siteMetadata {
        siteUrl
        siteEmail
        siteTitle
        siteTagline
        siteDescription
        twitterUsername
        googleSiteVerification
      }
    }
    allGoogleFontCss {
      nodes {
        url
        css
      }
    }
  }
`;
