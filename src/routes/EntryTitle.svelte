<script lang="ts">
  export let href: string;
  export let type = 'h3';
</script>

<svelte:element this={type} class="entry-title">
  <a {href}><slot /></a>
</svelte:element>
