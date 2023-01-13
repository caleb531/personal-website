<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { resizeGravatar } from '$lib/gravatar';
  import JsonLd from './JsonLd.svelte';
  let { gravatarUrl, site } = $page.data;

  let isHomepage: boolean;
  let pageSeoTitle: string;
  let pageSeoUrl: string;
  let pageSeoDescription: string;
  let pageSeoImage = `${site.url}/images/social-preview.png`;

  // SvelteKit does not seem to like if..else blocks within <svelte:head>; if we
  // try to conditionally set the <title> within <svelte:head> itself, then the
  // page title stops updating after the first or second page navigate; to fix
  // this, we move the conditional logic to the TypeScript section of the layout
  // component, and use a reactive statement to update the page title whenever
  // the value of 'page' changes
  let renderedTitle: string;
  $: {
    isHomepage = $page.data.id === 'home';
    if (isHomepage) {
      renderedTitle = `${site.title} | ${site.tagline}`;
      pageSeoTitle = `${site.title} | ${site.tagline}`;
      pageSeoDescription = site.description;
    } else {
      renderedTitle = `${$page.data.title} | ${site.title}`;
      pageSeoTitle = $page.data.title;
      pageSeoDescription = $page.data.description;
    }
    pageSeoUrl = site.url + $page.url.pathname;
  }

  let appleTouchIcons = [76, 120, 152, 180].map((size) => {
    return { size, url: resizeGravatar(gravatarUrl, size) };
  });
</script>

<svelte:head>
  <title>{renderedTitle}</title>
  <link rel="shortcut icon" href={resizeGravatar(gravatarUrl, 32)} />
  <link rel="icon" href={resizeGravatar(gravatarUrl, 192)} sizes="192x192" />
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
  <JsonLd
    title={pageSeoTitle}
    description={pageSeoDescription}
    url={pageSeoUrl}
    type={isHomepage ? 'WebSite' : 'WebPage'}
  />
  {#each appleTouchIcons as icon (icon.url)}
    <link rel="apple-touch-icon" href={icon.url} sizes={`${icon.size}x${icon.size}`} />
  {/each}
  <title>{renderedTitle}</title>
  <meta name="description" content={$page.data.description} />
  {#if import.meta.env.PROD && browser}
    <script
      defer
      data-domain={window.location.hostname}
      src="https://plausible.io/js/script.tagged-events.js"
    ></script>
  {/if}
</svelte:head>
