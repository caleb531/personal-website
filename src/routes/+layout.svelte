<script lang="ts">
  import { afterNavigate, disableScrollHandling } from '$app/navigation';
  import { page } from '$app/state';
  import Footer from '$routes/Footer.svelte';
  import Head from '$routes/Head.svelte';
  import Header from '$routes/Header.svelte';
  import { pageFade, pageFadeDuration } from '$routes/transitions';

  import '$src/styles/index.scss';
  import '@fontsource/source-sans-pro/300.css';
  import '@fontsource/source-sans-pro/400.css';
  import '@fontsource/source-sans-pro/600.css';
  let { data, children } = $props();

  // SvelteKit doesn't currently support adding data-* attributes (or class
  // names, for that matter) via <svelte:body />, so we must set the attribute
  // on the DOM element directly via a reactive statement
  function assignPageId(pageId: string) {
    if (typeof document !== 'undefined') {
      document.body.dataset.pageId = pageId;
    }
  }
  $effect(() => {
    assignPageId(page.data.id);
  });

  // Source:
  // <https://stackoverflow.com/questions/71648152/snapping-to-the-top-when-doing-svelte-page-transitions>
  afterNavigate((navigation) => {
    // Disable the automatic scrolling to the top of the page when navigating
    // between pages
    disableScrollHandling();
    // However, we still want to scroll-animate to the top of page when
    // navigating to the privacy policy (because the only link to to the privacy
    // policy is at the very bottom of the page, so this is the only page where,
    // when navigated to, the user will need to be scrolled to the top of the
    // page)
    if (navigation.from && navigation.to?.url.pathname === '/privacy-policy/') {
      setTimeout(() => {
        scrollTo({ top: 0, behavior: 'smooth' });
      }, pageFadeDuration);
    }
  });
</script>

<div class="site-background"></div>

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
  We cannot key off of the page store or any property of it because doing so
  will cause the slot contents to change before the transition finishes,
  supposedly because the subscription to the page store is not transition-aware;
  to work around this, we can send down the dynamically-changing pathname from
  the layout server function (+layout.server.ts)
  -->
  <article class="page" id="page">
    {#key data.pathname}
      <section class="page-content" transition:pageFade>
        {#if page.data.title}
          <h2>{page.data.title}</h2>
        {:else}
          <h2 class="accessibility-only">Homepage</h2>
        {/if}
        {#if children}
          {@render children()}
        {/if}
      </section>
    {/key}
  </article>
</main>

<Footer />
