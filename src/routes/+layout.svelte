<script lang="ts">
  import { page } from '$app/stores';
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
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
  <!-- Keying the page element fixes a bug where the page heading would change
  before the rest of the new page content loads in; this was mostly caused by
  the introduction of CSS transitions on my Projects page (which must complete
  before SvelteKit can finish navigating to the new page) -->
  {#key $page}
    <article class="page" id="page">
      {#if $page.data.title}
        <h2>{$page.data.title}</h2>
      {/if}
      <slot />
    </article>
  {/key}
  <Footer />
</main>
