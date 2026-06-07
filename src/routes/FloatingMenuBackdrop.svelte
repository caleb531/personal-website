<script lang="ts">
  type Props = {
    // Rendered width of the floating menu body.
    width: number;
    // Rendered height of the floating menu body, excluding the arrow.
    height: number;
    // Visual width of the arrow base.
    arrowWidth: number;
    // Visual height from the menu body top edge to the arrow tip.
    arrowHeight: number;
    // Horizontal arrow tip position within the menu body's coordinate space.
    arrowCenterX: number;
    // Corner radius for the rounded rectangle body.
    cornerRadius: number;
  };

  let { width, height, arrowWidth, arrowHeight, arrowCenterX, cornerRadius }: Props = $props();

  function buildPath() {
    const left = 0;
    // The SVG includes the arrow area above the menu, so the body starts below it.
    const top = arrowHeight;
    const right = width;
    const bottom = arrowHeight + height;
    const resolvedCornerRadius = Math.min(cornerRadius, width / 2, height / 2);
    const arrowHalfWidth = arrowWidth / 2;
    const arrowLeft = arrowCenterX - arrowHalfWidth;
    const arrowRight = arrowCenterX + arrowHalfWidth;

    // Draw the fill and stroke as one outline so translucent borders do not overlap.
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
</script>

<svg
  class="floating-menu-backdrop"
  aria-hidden="true"
  focusable="false"
  {width}
  height={height + arrowHeight}
  viewBox={`0 0 ${width} ${height + arrowHeight}`}
  style:top={`-${arrowHeight}px`}
>
  <path d={buildPath()} />
</svg>
