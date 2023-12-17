<script lang="ts">
  import type { TransitionConfig } from 'svelte/transition';
  import { noopTransition } from './transitions';

  export let id: string;
  export let type: string;
  export let transition: (node: Element) => TransitionConfig = noopTransition;
</script>

<article
  data-entry-id={id}
  class="entry {type}"
  class:no-transition={transition === noopTransition}
  transition:transition|global
>
  <slot />
</article>
