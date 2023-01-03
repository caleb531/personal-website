<script lang="ts">
  import { page } from '$app/stores';
  import '../styles/index.scss';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import PageHead from './PageHead.svelte';
</script>

<PageHead />

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
