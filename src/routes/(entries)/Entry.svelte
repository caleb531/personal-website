<script lang="ts">
  import { noopTransition } from '$routes/transitions';

  export let id: string;
  export let type: string;
  export let transition = noopTransition;
</script>

<article
  data-entry-id={id}
  class="entry {type}"
  class:no-transition={transition === noopTransition}
  transition:transition|global
>
  <slot />
</article>
