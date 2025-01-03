<script lang="ts">
  import { type TransitionType, noopTransition } from '$routes/transitions';
  import type { Snippet } from 'svelte';

  interface Props {
    id: string;
    type: string;
    transition?: TransitionType;
    children: Snippet;
  }

  let { id, type, transition = noopTransition, children }: Props = $props();
</script>

<article data-entry-id={id} class="entry {type}" transition:transition|global>
  {#if children}
    {@render children()}
  {/if}
</article>
