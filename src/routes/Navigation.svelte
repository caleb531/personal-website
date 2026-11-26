<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import type { Path } from '$app/types';
  import navigation from '#data/navigation.json';

  // Whether the mobile navigation panel is expanded
  let isNavOpen = $state(false);

  // The disclosure button to focus when Escape closes the panel
  let toggleButton: HTMLButtonElement;

  // Collapse the panel when a route changes, including browser Back and Forward
  afterNavigate(closeNavigation);

  // Close the mobile navigation panel
  function closeNavigation() {
    isNavOpen = false;
  }

  // Close the panel when focus moves outside the navigation
  function handleFocusOut(event: FocusEvent & { currentTarget: HTMLElement }) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeNavigation();
    }
  }

  // Return focus to the toggle before hiding the focused navigation link
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isNavOpen) {
      event.preventDefault();
      toggleButton.focus();
      closeNavigation();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<nav class="site-header-nav" onfocusout={handleFocusOut}>
  <!-- The tabindex allows Safari to focus the button when clicked -->
  <button
    bind:this={toggleButton}
    type="button"
    class="site-header-nav-toggle"
    aria-label="Toggle Navigation"
    aria-controls="site-header-nav-list"
    aria-expanded={isNavOpen}
    tabindex={0}
    onclick={() => (isNavOpen = !isNavOpen)}
  >
    {#if isNavOpen}
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m5 5 14 14M19 5 5 19" />
      </svg>
    {:else}
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    {/if}
  </button>
  <ul class="site-header-nav-list" id="site-header-nav-list" class:is-open={isNavOpen}>
    {#each navigation as link (link.url)}
      <li>
        <a
          href={resolve(link.url as Path)}
          aria-current={link.url === page.url.pathname ? 'page' : null}
          tabindex={0}
          onclick={closeNavigation}
        >
          {link.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
