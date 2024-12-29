import { onDestroy, onMount } from 'svelte';

// A simple primitive to detect whether or not the component is mounted
class MountObserver {
  #isMounted = $state(false);

  // Keep track of when the current component is mounted
  constructor() {
    onMount(() => {
      this.#isMounted = true;
    });
    onDestroy(() => {
      this.#isMounted = false;
    });
  }

  // Retrieve the current "mount" state of the component
  get current() {
    return this.#isMounted;
  }
}

export default MountObserver;
