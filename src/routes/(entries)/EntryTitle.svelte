<script lang="ts">
  interface Props {
    href: string;
    type?: string;
    children?: import('svelte').Snippet;
  }

  let { href, type = 'h3', children }: Props = $props();
</script>

<svelte:element this={type} class="entry-title">
  <a {href}
    >{#if children}
      {@render children()}
    {/if}</a
  >
</svelte:element>
