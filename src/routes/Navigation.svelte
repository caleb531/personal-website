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
  <!-- The tabindex attribute is necessary to allow the button to receive focus
  when clicked in Safari -->
  <button
    type="button"
    class="site-header-nav-toggle"
    aria-label="Toggle Navigation"
    aria-haspopup="true"
    aria-expanded={isNavOpen}
    tabindex={0}
  >
    <img src={navToggleSvgUrl} alt="" />
  </button>
  <ul class="site-header-nav-list">
    {#each navigation as navigationLink (navigationLink.url)}
      {@const isCurrent = isCurrentPage(navigationLink, page)}
      <li class:is-current-page={isCurrent} aria-current={isCurrent ? 'page' : null}>
        <!-- The tabindex attribute is necessary to allow the link to receive
        focus when clicked in Safari -->
        <a href={navigationLink.url} onclick={closeNav} tabindex={0}>
          {navigationLink.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
