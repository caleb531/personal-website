<script lang="ts">
  import { page } from '$app/state';
  import navigation from '$data/navigation.json';
  import navToggleSvgUrl from '$src/images/nav-toggle.svg';

  let isNavOpen = $state(false);

  // A custom Svelte action to update state a specified element, or any of its
  // descendants, receives focus
  function onFocusWithin(node: HTMLElement, setNavOpen: (isOpen: boolean) => void) {
    function broadcastNavFocus() {
      setNavOpen(node.matches(':focus-within'));
    }
    // Unlike the focus/blur events, the focusin and focusout events bubble
    node.addEventListener('focusin', broadcastNavFocus);
    node.addEventListener('focusout', broadcastNavFocus);
    return {
      destroy() {
        node.removeEventListener('focusin', broadcastNavFocus);
        node.removeEventListener('focusout', broadcastNavFocus);
      }
    };
  }

  function setNavOpen(isOpen: boolean) {
    isNavOpen = isOpen;
  }

  // Normalize the given URL pathname (e.g. /about/me -> about/me)
  function normalizePathname(pathname: string) {
    return pathname.replace(/(^\/)|(\/$)/gi, '');
  }
  function isCurrentPage(navigationLink: (typeof navigation)[number], $currentPage: typeof page) {
    return normalizePathname(navigationLink.url) === normalizePathname($currentPage.url.pathname);
  }
</script>

<nav class="site-header-nav" use:onFocusWithin={setNavOpen}>
  <!-- The tabindex attribute is necessary to allow the button to receive focus
  when clicked in Safari -->
  <button
    type="button"
    class="site-header-nav-toggle"
    aria-label="Toggle Navigation"
    aria-controls="site-header-nav-list"
    aria-haspopup="true"
    aria-expanded={isNavOpen}
    tabindex={0}
  >
    <img src={navToggleSvgUrl} alt="" aria-hidden="true" />
  </button>
  <ul class="site-header-nav-list" id="site-header-nav-list">
    {#each navigation as navigationLink (navigationLink.url)}
      {@const isCurrent = isCurrentPage(navigationLink, page)}
      <li class:is-current-page={isCurrent} aria-current={isCurrent ? 'page' : null}>
        <!-- The tabindex attribute is necessary to allow the link to receive
        focus when clicked in Safari -->
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={navigationLink.url} tabindex={0}>
          {navigationLink.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
