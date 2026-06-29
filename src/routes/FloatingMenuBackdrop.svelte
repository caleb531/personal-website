<script lang="ts">
  type ArrowPlacement = 'left' | 'center' | 'right';

  type Props = {
    // Where the arrow sits along the floating menu's top edge
    arrowPlacement: ArrowPlacement;
  };

  let { arrowPlacement }: Props = $props();
  let svgElement: SVGSVGElement;
  let width = $state(0);
  let height = $state(0);
  let arrowWidth = $state(0);
  let arrowHeight = $state(0);
  let arrowCenterX = $state(0);
  let cornerRadius = $state(0);
  let isReady = $state(false);

  // Keep the arrow base clear of the rounded corners; guard against offsets
  // that would visually collide with the body radius
  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  // Keep the component generic; read geometry from the floating-menu element's
  // CSS custom properties rather than hard-coding nav-specific sizes
  function readPixelValue(styles: CSSStyleDeclaration, propertyName: string, fallback: number) {
    const value = Number.parseFloat(styles.getPropertyValue(propertyName));
    return Number.isFinite(value) ? value : fallback;
  }

  // Convert the semantic placement prop into an exact x-coordinate in the
  // measured menu box; left/right can be tuned with CSS offsets so specific
  // menus can point at their trigger without changing this component's API
  function getArrowCenterX(
    menuWidth: number,
    resolvedCornerRadius: number,
    resolvedArrowWidth: number,
    styles: CSSStyleDeclaration
  ) {
    const arrowMin = resolvedCornerRadius + resolvedArrowWidth / 2;
    const arrowMax = menuWidth - resolvedCornerRadius - resolvedArrowWidth / 2;
    // The default offset is the nearest safe position after accounting for the
    // corner radius and half the arrow width
    const arrowLeftOffset = readPixelValue(styles, '--menu-arrow-left-offset', arrowMin);
    const arrowRightOffset = readPixelValue(styles, '--menu-arrow-right-offset', arrowMin);

    const unclampedArrowCenterX =
      {
        left: arrowLeftOffset,
        center: menuWidth / 2,
        right: menuWidth - arrowRightOffset
      }[arrowPlacement] ?? menuWidth / 2;

    return clamp(unclampedArrowCenterX, arrowMin, Math.max(arrowMin, arrowMax));
  }

  // Measure the rendered parent menu instead of scaling a fixed SVG viewBox;
  // preserve arrow size, corner radius, and stroke width as the menu changes width
  function measureBackdrop() {
    const menuElement = svgElement.parentElement;

    if (!menuElement) {
      isReady = false;
      return;
    }

    const menuStyles = window.getComputedStyle(menuElement);
    const menuRect = menuElement.getBoundingClientRect();
    const measuredWidth = menuRect.width;
    const measuredHeight = menuRect.height;

    // In desktop navigation, the same markup is not a floating menu; leave the
    // backdrop uninitialized so the CSS fallback and normal nav layout remain
    if (menuStyles.position === 'static' || measuredWidth <= 0 || measuredHeight <= 0) {
      isReady = false;
      return;
    }

    const measuredArrowWidth = readPixelValue(menuStyles, '--menu-arrow-width', 18);
    const measuredArrowHeight = readPixelValue(menuStyles, '--menu-arrow-height', 9);
    const measuredCornerRadius = readPixelValue(menuStyles, '--menu-border-radius', 5);

    width = measuredWidth;
    height = measuredHeight;
    arrowWidth = measuredArrowWidth;
    arrowHeight = measuredArrowHeight;
    cornerRadius = measuredCornerRadius;
    arrowCenterX = getArrowCenterX(
      measuredWidth,
      measuredCornerRadius,
      measuredArrowWidth,
      menuStyles
    );
    isReady = true;
  }

  // Build a single continuous outline: arrow, top edge, rounded rectangle, then
  // close; keeping this as one path avoids translucent fill/stroke overlap at
  // the arrow base
  function buildPath() {
    const left = 0;
    // The SVG includes the arrow area above the menu; the body starts below it
    const top = arrowHeight;
    const right = width;
    const bottom = arrowHeight + height;
    const resolvedCornerRadius = Math.min(cornerRadius, width / 2, height / 2);
    const arrowHalfWidth = arrowWidth / 2;
    const arrowLeft = arrowCenterX - arrowHalfWidth;
    const arrowRight = arrowCenterX + arrowHalfWidth;

    return [
      `M ${resolvedCornerRadius} ${top}`,
      `L ${arrowLeft} ${top}`,
      `L ${arrowCenterX} 0`,
      `L ${arrowRight} ${top}`,
      `L ${right - resolvedCornerRadius} ${top}`,
      `Q ${right} ${top} ${right} ${top + resolvedCornerRadius}`,
      `L ${right} ${bottom - resolvedCornerRadius}`,
      `Q ${right} ${bottom} ${right - resolvedCornerRadius} ${bottom}`,
      `L ${left + resolvedCornerRadius} ${bottom}`,
      `Q ${left} ${bottom} ${left} ${bottom - resolvedCornerRadius}`,
      `L ${left} ${top + resolvedCornerRadius}`,
      `Q ${left} ${top} ${left + resolvedCornerRadius} ${top}`,
      'Z'
    ].join(' ');
  }

  $effect(() => {
    if (svgElement) {
      // Defer until Vite-loaded styles are reflected in computed CSS variables
      const timeoutId = window.setTimeout(measureBackdrop);
      return () => window.clearTimeout(timeoutId);
    }
  });
</script>

<svg
  class="floating-menu-backdrop"
  class:is-ready={isReady}
  aria-hidden="true"
  focusable="false"
  {width}
  height={height + arrowHeight}
  viewBox={`0 0 ${width} ${height + arrowHeight}`}
  style:top={`-${arrowHeight}px`}
  bind:this={svgElement}
>
  {#if isReady}
    <path d={buildPath()} />
  {/if}
</svg>
