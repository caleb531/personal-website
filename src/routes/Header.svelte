<script lang="ts">
  import { page } from '$app/stores';
  import { resizeGravatar } from '$lib/gravatar';
  import { writable } from 'svelte/store';
  import Navigation from './Navigation.svelte';
  let { gravatarUrl, site } = $page.data;

  const headerImageSize = 60;
  const headerGravatarUrl = resizeGravatar(gravatarUrl, headerImageSize);
  const headerGravatarUrlRetina = resizeGravatar(gravatarUrl, headerImageSize * 2);

  let isNavOpen = writable(false);

  function closeNav() {
    $isNavOpen = false;
  }
</script>

<header class="site-header">
  <a href="/" class="site-title-link" rel="home" on:click={closeNav}>
    <img
      class="site-header-image"
      src={headerGravatarUrl}
      srcSet={`${headerGravatarUrlRetina} 2x`}
      width={headerImageSize}
      height={headerImageSize}
      alt=""
    />
    <h1 class="site-title">{site.title}</h1>
  </a>
  <Navigation {isNavOpen} on:click-nav-link={closeNav} />
</header>
