<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<section class="entry-main">
  {#if children}
    {@render children()}
  {/if}
</section>
