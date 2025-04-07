<script lang="ts">
  import { page } from '$app/state';
  import navigation from '$data/navigation.json';
  import navToggleSvgUrl from '$src/images/nav-toggle.svg';

  interface Props {
    isNavOpen: boolean;
    closeNav: () => void;
  }

  let { isNavOpen, closeNav }: Props = $props();

  // Normalize the given URL pathname (e.g. /about/me -> about/me)
  function normalizePathname(pathname: string) {
    return pathname.replace(/(^\/)|(\/$)/gi, '');
  }
  function isCurrentPage(navigationLink: (typeof navigation)[number], $currentPage: typeof page) {
    return normalizePathname(navigationLink.url) === normalizePathname($currentPage.url.pathname);
  }
</script>

<nav class="site-header-nav" class:site-header-nav-open={isNavOpen}>
  <button
    type="button"
    class="site-header-nav-toggle"
    aria-haspopup="true"
    aria-expanded={isNavOpen}
  >
    <img src={navToggleSvgUrl} alt="Toggle Navigation" />
  </button>
  <ul class="site-header-nav-list">
    {#each navigation as navigationLink (navigationLink.url)}
      {@const isCurrent = isCurrentPage(navigationLink, page)}
      <li class:is-current-page={isCurrent} aria-current={isCurrent ? 'page' : null}>
        <a href={navigationLink.url} onclick={closeNav}>
          {navigationLink.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
