<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<p class="entry-desc">
  {#if children}
    {@render children()}
  {/if}
</p>
