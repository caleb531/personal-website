<script lang="ts">
  import { page } from '$app/state';
  import navigation from '$data/navigation.json';
  import navToggleSvgUrl from '$src/images/nav-toggle.svg';

  // Allowed horizontal placement modes for the floating navigation arrow
  type MenuShapeArrowPlacement = 'center' | 'left' | 'right';

  // Normalized SVG artboard width for the floating navigation background
  const menuShapeWidth = 100;

  // Normalized SVG artboard height calibrated to the rendered navigation menu height
  const menuShapeHeight = 200;

  // Normalized width of the floating navigation arrow within the SVG artboard
  const menuShapeArrowWidth = 20;

  // Normalized height of the floating navigation arrow within the SVG artboard
  const menuShapeArrowHeight = 10;

  // Horizontal placement mode for the floating navigation arrow
  const menuShapeArrowRightPlacement = 'right' as MenuShapeArrowPlacement;

  // Positive horizontal offset from the floating navigation arrow placement anchor
  const menuShapeArrowOffsetX = 30;

  // Normalized corner radius for the floating navigation body within the SVG artboard
  const menuShapeBorderRadius = 5;

  // CSS length for spacing content below the floating navigation arrow
  const menuShapeArrowHeightStyle = `${menuShapeArrowHeight}px`;

  // CSS length for documenting the floating navigation arrow width alongside its SVG geometry
  const menuShapeArrowWidthStyle = `${menuShapeArrowWidth}px`;

  // CSS length for documenting the floating navigation arrow horizontal offset alongside its SVG geometry
  const menuShapeArrowOffsetXStyle = `${menuShapeArrowOffsetX}px`;

  // CSS length for documenting the floating navigation radius alongside its SVG geometry
  const menuShapeBorderRadiusStyle = `${menuShapeBorderRadius}px`;

  // Center x-coordinate of the floating navigation arrow placement anchor
  const menuShapeArrowAnchor =
    menuShapeArrowRightPlacement === 'left'
      ? 0
      : menuShapeArrowRightPlacement === 'right'
        ? menuShapeWidth
        : menuShapeWidth / 2;

  // Direction multiplier for applying positive arrow offsets from the placement anchor
  const menuShapeArrowOffsetDirection =
    menuShapeArrowRightPlacement === 'left' ? 1 : menuShapeArrowRightPlacement === 'right' ? -1 : 0;

  // Placement-aware center x-coordinate of the floating navigation arrow within the SVG artboard
  const menuShapeArrowCenter =
    menuShapeArrowAnchor + menuShapeArrowOffsetDirection * menuShapeArrowOffsetX;

  // SVG path for a single continuous filled and stroked shape; viewBox height keeps arrow scaling close to CSS pixels
  const menuShapePath = [
    `M ${menuShapeBorderRadius} ${menuShapeArrowHeight}`,
    `H ${menuShapeArrowCenter - menuShapeArrowWidth / 2}`,
    `L ${menuShapeArrowCenter} 0`,
    `L ${menuShapeArrowCenter + menuShapeArrowWidth / 2} ${menuShapeArrowHeight}`,
    `H ${menuShapeWidth - menuShapeBorderRadius}`,
    `Q ${menuShapeWidth} ${menuShapeArrowHeight} ${menuShapeWidth} ${menuShapeArrowHeight + menuShapeBorderRadius}`,
    `V ${menuShapeHeight - menuShapeBorderRadius}`,
    `Q ${menuShapeWidth} ${menuShapeHeight} ${menuShapeWidth - menuShapeBorderRadius} ${menuShapeHeight}`,
    `H ${menuShapeBorderRadius}`,
    `Q 0 ${menuShapeHeight} 0 ${menuShapeHeight - menuShapeBorderRadius}`,
    `V ${menuShapeArrowHeight + menuShapeBorderRadius}`,
    `Q 0 ${menuShapeArrowHeight} ${menuShapeBorderRadius} ${menuShapeArrowHeight}`,
    'Z'
  ].join(' ');

  // ViewBox for the normalized floating navigation SVG artboard
  const menuShapeViewBox = `0 0 ${menuShapeWidth} ${menuShapeHeight}`;

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
  <ul
    class="site-header-nav-list"
    id="site-header-nav-list"
    style:--menu-arrow-height={menuShapeArrowHeightStyle}
    style:--menu-arrow-width={menuShapeArrowWidthStyle}
    style:--menu-arrow-offset-x={menuShapeArrowOffsetXStyle}
    style:--menu-border-radius={menuShapeBorderRadiusStyle}
  >
    <svg
      class="site-header-nav-list-background"
      viewBox={menuShapeViewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={menuShapePath}
        fill="var(--menu-background-color)"
        stroke="var(--menu-border-color)"
        stroke-width="var(--menu-border-width)"
        vector-effect="non-scaling-stroke"
      />
    </svg>
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
