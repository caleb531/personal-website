<script lang="ts">
  import { page } from '$app/stores';
  import Footer from '../routes/Footer.svelte';
  import Header from '../routes/Header.svelte';
  import '../styles/index.scss';
  import type { LayoutServerData } from './$types';

  export let data: LayoutServerData;

  // SvelteKit does not seem to like if..else blocks within <svelte:head>; if we
  // try to conditionally set the <title> within <svelte:head> itself, then the
  // page title stops updating after the first or second page navigate; to fix
  // this, we move the conditional logic to the TypeScript section of the layout
  // component, and use a reactive statement to update the page title whenever
  // the value of 'page' changes
  let pageTitle: string;
  $: {
    if ($page.data.id === 'home') {
      pageTitle = `${data.site.title} | ${data.site.tagline}`;
    } else {
      pageTitle = `${$page.data.title} | ${data.site.title}`;
    }
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={$page.data.description} />
</svelte:head>

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
