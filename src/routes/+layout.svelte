<script lang="ts">
  import { page } from '$app/stores';
  import Footer from '$routes/Footer.svelte';
  import Head from '$routes/Head.svelte';
  import Header from '$routes/Header.svelte';
  import { pageFade } from '$routes/transitions';
  import '$src/styles/index.scss';
  export let data;
</script>

<div class="site-background" />

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
