<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    href: string;
    type?: string;
    children?: Snippet;
  }

  let { href, type = 'h3', children }: Props = $props();
</script>

<svelte:element this={type} class="entry-title">
  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
  <a {href}
    >{#if children}
      {@render children()}
    {/if}</a
  >
</svelte:element>
