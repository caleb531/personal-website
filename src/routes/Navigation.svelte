<script lang="ts">
  import { page } from '$app/stores';
  import navigation from '../data/navigation.json';

  export let isNavOpen: boolean;
  export let toggleNav: () => void;
  export let closeNav: () => void;

  // Normalize the given URL pathname (e.g. /about/me -> about/me)
  function normalizePathname(pathname: string) {
    return pathname.replace(/(^\/)|(\/$)/gi, '');
  }
  function isCurrentPage(navigationLink: typeof navigation[number], $currentPage: typeof $page) {
    return normalizePathname(navigationLink.url) === normalizePathname($currentPage.url.pathname);
  }
</script>

<nav class="site-header-nav" class:site-header-nav-open={isNavOpen}>
  <button type="button" class="site-header-nav-toggle" on:click={toggleNav}>
    <img src="/icons/nav-toggle.svg" alt="Toggle Navigation" />
  </button>
  <ul class="site-header-nav-list">
    {#each navigation as navigationLink (navigationLink.url)}
      <li class:is-current-page={isCurrentPage(navigationLink, $page)}>
        <a href={navigationLink.url} on:click={closeNav}>
          {navigationLink.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
