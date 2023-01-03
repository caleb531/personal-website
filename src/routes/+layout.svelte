<script lang="ts">
  import { page } from '$app/stores';
  import Footer from '../routes/Footer.svelte';
  import Header from '../routes/Header.svelte';
  import '../styles/index.scss';
</script>

<svelte:head>
  <title>{$page.data.title} | {$page.data.site.title}</title>
  <meta name="description" content={$page.data.description} />
</svelte:head>

<main data-page-id={$page.data.id}>
  <Header />
  <article class="page" id="page">
    {#if $page.data.id !== 'home'}
      <h2>{$page.data.title}</h2>
    {/if}
    <slot />
  </article>
  <Footer />
</main>
