<script lang="ts">
  export let id: string;
  export let name: string = 'search';
  export let value: string;
  export let placeholder: string = '';
  export let ariaLabel: string;

  function clearSearch() {
    value = '';
  }
</script>

<div class="search-input-container">
  <input type="search" {name} {id} bind:value {placeholder} aria-label={ariaLabel} />
  <button
    type="button"
    class="search-input-clear-button"
    on:pointerdown|preventDefault={clearSearch}
  >
    <img src="/icons/clear.svg" alt="Clear Search Query" />
  </button>
</div>
