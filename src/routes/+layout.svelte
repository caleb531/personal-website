<script lang="ts">
  import { page } from '$app/stores';
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
  import '../styles/index.scss';
  import type { LayoutData } from './$types';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import PageHead from './PageHead.svelte';
  export let data: LayoutData;
</script>

<PageHead />

{#if import.meta.env.PROD}
  <GoogleAnalytics properties={[$page.data.site.ga4TrackingId]} />
{/if}

<main data-page-id={$page.data.id}>
  <a class="skip-to-main-content accessibility-only" href="#page">Skip to main content</a>
  <Header />
  <!--
  We cannot key off of the $page store or any property of it because doing so
  will cause the slot contents to change before the transition finishes,
  supposedly because the subscription to the page store is not transition-aware;
  to work around this, we can send down the dynamically-changing pathname from
  the layout server function (+layout.server.ts)
  -->
  {#key data.pathname}
    <article class="page" id="page">
      {#if $page.data.title}
        <h2>{$page.data.title}</h2>
      {/if}
      <slot />
    </article>
  {/key}
  <Footer />
</main>
