<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    href: string;
    title?: string;
    hiddenFromAccessibility?: boolean;
    children?: Snippet;
  }

  let { href, title = '', hiddenFromAccessibility = false, children }: Props = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
  class="entry-image"
  {href}
  aria-hidden={hiddenFromAccessibility}
  tabindex={hiddenFromAccessibility ? -1 : 0}
  title={hiddenFromAccessibility ? '' : title}
>
  {#if children}
    {@render children()}
  {/if}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
