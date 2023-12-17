<script lang="ts">
  import { noopTransition } from './transitions';

  export let id: string;
  export let type: string;
  export let transition = noopTransition;
</script>

<article data-entry-id={id} class="entry {type}" transition:transition|global>
  <slot />
</article>
