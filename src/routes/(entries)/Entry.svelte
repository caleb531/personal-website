<script lang="ts">
  import { type TransitionType, noopTransition } from '$routes/transitions';

  interface Props {
    id: string;
    type: string;
    transition?: TransitionType;
    children?: import('svelte').Snippet;
  }

  let { id, type, transition = noopTransition, children }: Props = $props();
</script>

<article data-entry-id={id} class="entry {type}" transition:transition|global>
  {#if children}
    {@render children()}
  {/if}
</article>
