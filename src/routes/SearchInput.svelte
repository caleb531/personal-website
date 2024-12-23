<script lang="ts">
  import clearSearchSvgUrl from '$src/images/clear-search.svg';

  interface Props {
    id: string;
    name: string;
    value: string;
    placeholder?: string;
    ariaLabel: string;
  }

  let {
    id,
    name,
    value = $bindable(),
    placeholder = '',
    ariaLabel
  }: Props = $props();

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
    onpointerdown={(event) => event.preventDefault()}
    onpointerup={clearSearch}
    title="Clear Search Query"
  >
    <img src={clearSearchSvgUrl} alt="Clear Search Query" />
  </button>
</div>
