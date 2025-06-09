<script lang="ts">
  import clearSearchSvgUrl from '$src/images/clear-search.svg';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    value: string;
    placeholder?: string;
  }

  let { value = $bindable(), ...inputProps }: Props = $props();

  function clearSearch(event: PointerEvent | KeyboardEvent) {
    event.preventDefault();
    value = '';
  }
</script>

<div class="search-input-container">
  <input type="search" bind:value {...inputProps} />
  <!-- pointerdown|preventDefault must be used in conjunction with pointerup to
  ensure that the search input doesn't lose focus when the user initially
  depresses the button -->
  <button
    type="button"
    class="search-input-clear-button"
    class:hidden={value === ''}
    onpointerdown={(event) => event.preventDefault()}
    onpointerup={clearSearch}
    onkeyup={(event) => {
      if (event.key === 'Enter') {
        clearSearch(event);
      }
    }}
    title="Clear Search Query"
  >
    <img src={clearSearchSvgUrl} alt="Clear Search Query" />
  </button>
</div>
