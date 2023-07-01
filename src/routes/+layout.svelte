<script lang="ts">
  import { page } from '$app/stores';
  import '@fontsource/source-sans-pro/300.css';
  import '@fontsource/source-sans-pro/400.css';
  import '@fontsource/source-sans-pro/600.css';
  import '../styles/index.scss';
  import Footer from './Footer.svelte';
  import Head from './Head.svelte';
  import Header from './Header.svelte';
  import { pageFade } from './transitions';
  export let data;

  // The scroll-Y position on the page (used for parallax effect)
  let scrollY: number;

  // SvelteKit doesn't currently support adding data-* attributes (or class
  // names, for that matter) via <svelte:body />, so we must set the attribute
  // on the DOM element directly via a reactive statement
  function assignPageId(pageId: string) {
    if (typeof document !== 'undefined') {
      document.body.dataset.pageId = pageId;
    }
  }
  $: assignPageId($page.data.id);
</script>

<svelte:window bind:scrollY />

<Head />

<a class="skip-to-main-content accessibility-only" href="#page">Skip to main content</a>
<Header />

<main>
  <!--
  We cannot key off of the $page store or any property of it because doing so
  will cause the slot contents to change before the transition finishes,
  supposedly because the subscription to the page store is not transition-aware;
  to work around this, we can send down the dynamically-changing pathname from
  the layout server function (+layout.server.ts)
  -->
  <article class="page" id="page" style="background-position: 0 {scrollY * 0.5}px">
    {#key data.pathname}
      <section class="page-content" transition:pageFade>
        {#if $page.data.title}
          <h2>{$page.data.title}</h2>
        {/if}
        <slot />
      </section>
    {/key}
  </article>
</main>

<Footer />
