<script lang="ts">
  import clearSearchSvgUrl from '#src/images/clear-search.svg';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    value: string;
    placeholder?: string;
  }

  let { value = $bindable(), ...inputProps }: Props = $props();

  // The input that receives focus after the clear button disappears
  let input: HTMLInputElement;

  // Clear the query and return focus to the search field
  function clearSearch() {
    input.focus();
    value = '';
  }
</script>

<div class="search-input-container">
  <input type="search" bind:this={input} bind:value {...inputProps} />
  <!-- Keep focus in the search field while pressing the clear button -->
  <button
    type="button"
    class="search-input-clear-button"
    class:hidden={value === ''}
    onpointerdown={(event) => event.preventDefault()}
    onclick={clearSearch}
    title="Clear Search Query"
  >
    <img src={clearSearchSvgUrl} alt="Clear Search Query" />
  </button>
</div>
