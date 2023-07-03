<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import site from '../data/site.json';
  import portrait120 from '../images/self-portrait-v6.jpg?w=120&imagetools';
  import portrait152 from '../images/self-portrait-v6.jpg?w=152&imagetools';
  import portrait180 from '../images/self-portrait-v6.jpg?w=180&imagetools';
  import portrait192 from '../images/self-portrait-v6.jpg?w=192&imagetools';
  import portrait32 from '../images/self-portrait-v6.jpg?w=32&imagetools';
  import portrait76 from '../images/self-portrait-v6.jpg?w=76&imagetools';
  import JsonLd from './JsonLd.svelte';

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
</script>

<svelte:head>
  <title>{renderedTitle}</title>
  <link rel="shortcut icon" href={portrait32} />
  <link rel="icon" href={portrait192} sizes="192x192" />
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
  <link rel="apple-touch-icon" href={portrait76} sizes="76x76" />
  <link rel="apple-touch-icon" href={portrait120} sizes="120x120" />
  <link rel="apple-touch-icon" href={portrait152} sizes="152x152" />
  <link rel="apple-touch-icon" href={portrait180} sizes="180x180" />
  <title>{renderedTitle}</title>
  <meta name="description" content={$page.data.description} />
  {#if import.meta.env.PROD && browser}
    <script
      defer
      data-domain={window.location.hostname}
      src="https://plausible.io/js/script.outbound-links.js"
    ></script>
  {/if}
</svelte:head>
