<script lang="ts">
  import { noopTransition } from '$routes/transitions';

  export let href: string;
  export let title = '';
  export let hiddenFromAccessibility = false;
  export let transition = noopTransition;
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
  <slot />
</a>
