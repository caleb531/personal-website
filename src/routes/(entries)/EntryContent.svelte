<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="entry-content">
  {#if children}
    {@render children()}
  {/if}
</div>
