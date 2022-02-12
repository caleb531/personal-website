import Head from 'next/head';
import React from 'react';
import site from '../data/site.json';
import { getGravatarUrl } from '../utilities/gravatar';

type Props = { pageTitle: string, pagePath: string };

function PageHead({ pageTitle, pagePath }: Props) {

  const isHomepage = pagePath === '/';
  const pageSeoTitle = (isHomepage ? `${site.title} | ${site.tagline}` : pageTitle);
  const pageSeoUrl = site.url + pagePath;
  const pageSeoImage = `${site.url}/images/social-preview.png`;

  const renderedTitle = isHomepage ?
    `${site.title} | ${site.tagline}` :
    `${pageTitle} | ${site.title}`;

  const appleTouchIcons = [76, 120, 152, 180].map((size) => {
    return { size, url: getGravatarUrl(site.email, size) };
  });

  const jsonLd = {
    description: site.description,
    headline: isHomepage ? site.title : pageTitle,
    url: pageSeoUrl,
    '@type': isHomepage ? 'WebSite' : 'WebPage',
    name: isHomepage ? site.title : pageTitle,
    '@context': 'https://schema.org'
  };

  return (
    <Head>
      <title>{renderedTitle}</title>
      <link rel="shortcut icon" href={getGravatarUrl(site.email, 32)} />
      <link rel="icon" href={getGravatarUrl(site.email, 192)} sizes="192x192" />
      <meta name="description" content={site.description} />

      <meta name="og:title" content={pageSeoTitle} />
      <meta name="og:site_title" content={site.title} />
      <meta name="og:description" content={site.description} />
      <meta name="og:url" content={pageSeoUrl} />
      <meta name="og:image" content={pageSeoImage} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitterUsername} />
      <meta name="twitter:creator" content={site.twitterUsername} />
      <meta name="twitter:title" content={pageSeoTitle} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content={pageSeoImage} />
      <meta name="google-site-verification" content={site.googleSiteVerification} />
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
    </Head>
  );

}
export default PageHead;
