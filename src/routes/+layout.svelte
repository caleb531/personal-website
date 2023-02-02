<script lang="ts">
  import { page } from '$app/stores';
  import '../styles/index.scss';
  import type { LayoutData } from './$types';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import PageHead from './PageHead.svelte';
  import { pageFade } from './transitions';
  export let data: LayoutData;

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

<PageHead />

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
  <article class="page" id="page">
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
