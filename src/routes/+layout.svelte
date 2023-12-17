<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Footer from '$routes/Footer.svelte';
  import Head from '$routes/Head.svelte';
  import Header from '$routes/Header.svelte';
  import { pageFade } from '$routes/transitions';
  import '$src/styles/index.scss';
  export let data;

  // The scroll-Y position on the page (used for parallax effect)
  let scrollY = 0;

  // A number between 0 and 1 which controls the parallax effect for the page
  // container background image; a value of 0 means the background image remains
  // static relative to the container; a value of simulates
  // background-attachment:fixed, where the background image moves at the same
  // rate as the user's scroll
  let parallaxFactor: number = 0.2;

  function updateReducedMotionSetting({ matches }: { matches: boolean }) {
    parallaxFactor = matches ? 0 : 0.2;
  }

  if (browser) {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener('change', (event) => {
      updateReducedMotionSetting(event);
    });
    updateReducedMotionSetting(reducedMotionQuery);
  }

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

<div class="site-background" />

<svelte:window bind:scrollY />

<Head />

<!--
For screen readers, adding a hidden "Skip to Main Content" link at the top of
the page can help screen reader users jump to the page content; for more, see
<https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/mouse-and-keyboard-events/skip-to-main-content/>
-->
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
  <article class="page" id="page" style="background-position-y: {scrollY * parallaxFactor}px">
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
