<script lang="ts">
  import navigation from '../data/navigation.json';

  let isNavOpen = false;

  function toggleNav() {
    isNavOpen = !isNavOpen;
  }
  function closeNav() {
    isNavOpen = false;
  }
</script>

<nav class="site-header-nav" class:site-header-nav-open={isNavOpen}>
  <button class="site-header-nav-toggle" aria-label="Menu" on:click={toggleNav}>
    <img src="/icons/nav-toggle.svg" alt="Toggle Navigation" />
  </button>
  <ul class="site-header-nav-list">
    {#each navigation as navigationLink}
      <li>
        <a href={navigationLink.url} on:click={closeNav}>
          {navigationLink.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
