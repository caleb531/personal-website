<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<section class="entry-main">
  {#if children}
    {@render children()}
  {/if}
</section>
