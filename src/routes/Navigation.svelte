<script lang="ts">
  import { page } from '$app/state';
  import navigation from '$data/navigation.json';
  import navToggleSvgUrl from '$src/images/nav-toggle.svg';
  import { onMount } from 'svelte';
  import FloatingMenuBackdrop from './FloatingMenuBackdrop.svelte';

  let isNavOpen = $state(false);
  let navToggleElement: HTMLButtonElement;
  let navListElement: HTMLUListElement;
  let isBackdropEnhanced = $state(false);
  let backdropWidth = $state(0);
  let backdropHeight = $state(0);
  let backdropArrowWidth = $state(0);
  let backdropArrowHeight = $state(0);
  let backdropArrowCenterX = $state(0);
  let backdropCornerRadius = $state(0);

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

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  function readPixelValue(styles: CSSStyleDeclaration, propertyName: string, fallback: number) {
    const value = Number.parseFloat(styles.getPropertyValue(propertyName));
    return Number.isFinite(value) ? value : fallback;
  }

  function measureFloatingMenuBackdrop() {
    if (!navToggleElement || !navListElement) {
      return;
    }

    const listStyles = window.getComputedStyle(navListElement);
    const toggleStyles = window.getComputedStyle(navToggleElement);
    const menuRect = navListElement.getBoundingClientRect();
    const toggleRect = navToggleElement.getBoundingClientRect();
    const width = menuRect.width;
    const height = menuRect.height;

    if (toggleStyles.display === 'none' || width <= 0 || height <= 0) {
      isBackdropEnhanced = false;
      return;
    }

    const arrowWidth = readPixelValue(listStyles, '--menu-arrow-width', 18);
    const arrowHeight = readPixelValue(listStyles, '--menu-arrow-height', 9);
    const cornerRadius = readPixelValue(listStyles, '--menu-border-radius', 5);
    const arrowMin = cornerRadius + arrowWidth / 2;
    const arrowMax = width - cornerRadius - arrowWidth / 2;
    const rawArrowCenterX = toggleRect.left + toggleRect.width / 2 - menuRect.left;

    backdropWidth = width;
    backdropHeight = height;
    backdropArrowWidth = arrowWidth;
    backdropArrowHeight = arrowHeight;
    backdropCornerRadius = cornerRadius;
    backdropArrowCenterX = clamp(rawArrowCenterX, arrowMin, Math.max(arrowMin, arrowMax));
    isBackdropEnhanced = true;
  }

  // Normalize the given URL pathname (e.g. /about/me -> about/me)
  function normalizePathname(pathname: string) {
    return pathname.replace(/(^\/)|(\/$)/gi, '');
  }
  function isCurrentPage(navigationLink: (typeof navigation)[number], $currentPage: typeof page) {
    return normalizePathname(navigationLink.url) === normalizePathname($currentPage.url.pathname);
  }

  onMount(() => {
    measureFloatingMenuBackdrop();
  });

  $effect(() => {
    if (isNavOpen) {
      measureFloatingMenuBackdrop();
    }
  });
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
    bind:this={navToggleElement}
  >
    <img src={navToggleSvgUrl} alt="" aria-hidden="true" />
  </button>
  <ul
    class="site-header-nav-list"
    id="site-header-nav-list"
    bind:this={navListElement}
    data-floating-menu-enhanced={isBackdropEnhanced ? 'true' : null}
  >
    {#if isBackdropEnhanced}
      <FloatingMenuBackdrop
        width={backdropWidth}
        height={backdropHeight}
        arrowWidth={backdropArrowWidth}
        arrowHeight={backdropArrowHeight}
        arrowCenterX={backdropArrowCenterX}
        cornerRadius={backdropCornerRadius}
      />
    {/if}
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
