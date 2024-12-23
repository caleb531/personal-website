<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import site from '$data/site.json';
  import { PUBLIC_ANALYTICS_SITE_ID, PUBLIC_SITE_ORIGIN } from '$env/static/public';
  import portrait120 from '$images/self-portrait-v6.jpg?w=120&imagetools';
  import portrait152 from '$images/self-portrait-v6.jpg?w=152&imagetools';
  import portrait180 from '$images/self-portrait-v6.jpg?w=180&imagetools';
  import portrait192 from '$images/self-portrait-v6.jpg?w=192&imagetools';
  import portrait76 from '$images/self-portrait-v6.jpg?w=76&imagetools';
  import socialPreview from '$images/social-preview.png?w=2400&imagetools';
  import JsonLd from '$routes/JsonLd.svelte';

  const siteOrigin: string = PUBLIC_SITE_ORIGIN || '';

  // When the site is built using SSG, imported images only are absolute paths,
  // when on the frontend, they are fully-qualified URLs; to prevent hydration
  // mismatches that could cause the site origin to get redundantly prepended to
  // the path, we must strip the origin from the imported image URLs to make
  // them paths (and if they are already paths, i.e. as they are on the backend,
  // then the string should be returned unchanged)
  function stripOrigin(pathOrUrl: string) {
    return pathOrUrl.replace(/^https?:\/\/([^/]+)/, '');
  }

  // SvelteKit does not seem to like if..else blocks within <svelte:head>; if we
  // try to conditionally set the <title> within <svelte:head> itself, then the
  // page title stops updating after the first or second page navigate; to fix
  // this, we move the conditional logic to the TypeScript section of the layout
  // component, and use a reactive statement to update the page title whenever
  // the value of 'page' changes
  let isHomepage = $derived($page.data.id === 'home');
  let renderedTitle = $derived(
    isHomepage ? `${site.title} | ${site.tagline}` : `${$page.data.title} | ${site.title}`
  );
  let pageSeoTitle = $derived(isHomepage ? `${site.title} | ${site.tagline}` : $page.data.title);
  let pageSeoDescription = $derived(isHomepage ? site.description : $page.data.description);
  let pageSeoUrl = `${siteOrigin}${stripOrigin($page.url.pathname)}`;
  let pageSeoImage = `${siteOrigin}${stripOrigin(socialPreview)}`;

  // Ensure that each page navigation counts as one pageview in GoatCounter; per
  // the documentation, afterNavigate also runs when the component initially
  // mounts on page load, so we must also instruct GoatCounter not to
  // double-count the pageview (see <https://www.goatcounter.com/help/spa> and
  // <https://kit.svelte.dev/docs/modules#$app-navigation-afternavigate>)
  if (browser) {
    afterNavigate(({ to }) => {
      const url = to?.url;
      if (url) {
        window.goatcounter?.count({
          path: url.pathname + url.search + url.hash
        });
      }
    });
  }
</script>

<svelte:head>
  <title>{renderedTitle}</title>
  <link rel="shortcut icon" href="/favicon.png" />
  <link rel="icon" href={portrait192} sizes="192x192" />
  <meta name="description" content={pageSeoDescription} />

  <meta name="og:title" content={pageSeoTitle} />
  <meta name="og:site_name" content={site.title} />
  <meta name="og:description" content={pageSeoDescription} />
  <meta name="og:url" content={pageSeoUrl} />
  <meta name="og:image" content={pageSeoImage} />
  <meta name="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={site.twitterUsername} />
  <meta name="twitter:creator" content={site.twitterUsername} />
  <meta name="twitter:title" content={pageSeoTitle} />
  <meta name="twitter:description" content={pageSeoDescription} />
  <meta name="twitter:image" content={pageSeoImage} />
  <meta name="google-site-verification" content={site.googleSiteVerification} />
  <link rel="canonical" href={pageSeoUrl} />
  <link rel="alternate" hrefLang="en-US" href={pageSeoUrl} />
  <JsonLd
    title={pageSeoTitle}
    description={pageSeoDescription}
    url={pageSeoUrl}
    type={isHomepage ? 'WebSite' : 'WebPage'}
  />
  <link rel="apple-touch-icon" href={portrait76} sizes="76x76" />
  <link rel="apple-touch-icon" href={portrait120} sizes="120x120" />
  <link rel="apple-touch-icon" href={portrait152} sizes="152x152" />
  <link rel="apple-touch-icon" href={portrait180} sizes="180x180" />
  {#if import.meta.env.PROD && PUBLIC_ANALYTICS_SITE_ID}
    <script
      data-goatcounter="https://{PUBLIC_ANALYTICS_SITE_ID}.goatcounter.com/count"
      data-goatcounter-settings={JSON.stringify({ no_onload: true })}
      async
      src="https://gc.zgo.at/count.v4.js"
      crossorigin="anonymous"
      integrity="sha384-nRw6qfbWyJha9LhsOtSb2YJDyZdKvvCFh0fJYlkquSFjUxp9FVNugbfy8q1jdxI+"
    ></script>
  {/if}
</svelte:head>
