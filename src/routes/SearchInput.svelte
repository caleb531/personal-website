<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
  export let placeholder: string = '';
  export let ariaLabel: string;

  function clearSearch() {
    value = '';
  }
</script>

<div class="search-input-container">
  <input type="search" {name} {id} bind:value {placeholder} aria-label={ariaLabel} />
  <!-- pointerdown must be used (instead of pointerup) for the Clear Search
  button to ensure that the preventDefault keeps the input focused after button
  click -->
  <button
    type="button"
    class="search-input-clear-button"
    class:hidden={value === ''}
    on:pointerdown|preventDefault={clearSearch}
    title="Clear Search Query"
  >
    <img src="/icons/clear.svg" alt="Clear Search Query" />
  </button>
</div>
