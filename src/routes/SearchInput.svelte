<script lang="ts">
  import clearSearchSvgUrl from '$src/icons/clear-search.svg';

  export let id: string;
  export let name: string;
  export let value: string;
  export let placeholder: string = '';
  export let ariaLabel: string;

  function clearSearch(event: PointerEvent) {
    event.preventDefault();
    value = '';
  }
</script>

<div class="search-input-container">
  <input type="search" {name} {id} bind:value {placeholder} aria-label={ariaLabel} />
  <!-- pointerdown|preventDefault must be used in conjunction with pointerup to
  ensure that the search input doesn't lose focus when the user initially
  depresses the button -->
  <button
    type="button"
    class="search-input-clear-button"
    class:hidden={value === ''}
    on:pointerdown={(event) => event.preventDefault()}
    on:pointerup={clearSearch}
    title="Clear Search Query"
  >
    <img src={clearSearchSvgUrl} alt="Clear Search Query" />
  </button>
</div>
