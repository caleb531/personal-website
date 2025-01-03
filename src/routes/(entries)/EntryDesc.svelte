<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<p class="entry-desc">
  {#if children}
    {@render children()}
  {/if}
</p>
