<script lang="ts">
  import { page } from '$app/stores';
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
  import '@fontsource/source-sans-pro/300.css';
  import '@fontsource/source-sans-pro/400.css';
  import '../styles/index.scss';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import PageHead from './PageHead.svelte';
</script>

<PageHead />

{#if import.meta.env.PROD}
  <GoogleAnalytics properties={[$page.data.site.ga4TrackingId]} />
{/if}

<main data-page-id={$page.data.id}>
  <Header />
  <article class="page" id="page">
    {#if $page.data.title}
      <h2>{$page.data.title}</h2>
    {/if}
    <slot />
  </article>
  <Footer />
</main>
