<script lang="ts">
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import navigation from '../data/navigation.json';

  const dispatch = createEventDispatcher();

  export let isNavOpen: Writable<boolean>;
  function toggleNav() {
    $isNavOpen = !$isNavOpen;
  }

  // Normalize the given URL pathname (e.g. /about/me -> about/me)
  function normalizePathname(pathname: string) {
    return pathname.replace(/(^\/)|(\/$)/gi, '');
  }
  function isCurrentPage(navigationLink: typeof navigation[number], $currentPage: typeof $page) {
    return normalizePathname(navigationLink.url) === normalizePathname($currentPage.url.pathname);
  }
</script>

<nav class="site-header-nav" class:site-header-nav-open={$isNavOpen}>
  <button class="site-header-nav-toggle" aria-label="Menu" on:click={toggleNav}>
    <img src="/icons/nav-toggle.svg" alt="Toggle Navigation" />
  </button>
  <ul class="site-header-nav-list">
    {#each navigation as navigationLink (navigationLink.url)}
      <li class:is-current-page={isCurrentPage(navigationLink, $page)}>
        <a href={navigationLink.url} on:click={() => dispatch('click-nav-link')}>
          {navigationLink.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
