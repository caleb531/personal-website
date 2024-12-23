<script lang="ts">
  import { noopTransition, type TransitionType } from '$routes/transitions';

  interface Props {
    href: string;
    title?: string;
    hiddenFromAccessibility?: boolean;
    transition?: TransitionType;
    children?: import('svelte').Snippet;
  }

  let {
    href,
    title = '',
    hiddenFromAccessibility = false,
    transition = noopTransition,
    children
  }: Props = $props();
</script>

<a
  class="entry-image"
  {href}
  aria-hidden={hiddenFromAccessibility}
  tabindex={hiddenFromAccessibility ? -1 : 0}
  title={hiddenFromAccessibility ? '' : title}
  class:no-transition={transition === noopTransition}
  in:transition|global
>
  {#if children}
    {@render children()}
  {/if}
</a>
