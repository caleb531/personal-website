<script lang="ts">
  import site from '../data/site.json';
  import portraitRetina from '../images/self-portrait-v6.jpg?w=120&imagetools';
  import portrait from '../images/self-portrait-v6.jpg?w=60&imagetools';
  import Navigation from './Navigation.svelte';

  const headerImageSize = 60;

  let isNavOpen = false;

  function toggleNav() {
    isNavOpen = !isNavOpen;
  }
  function closeNav() {
    isNavOpen = false;
  }
</script>

<header class="site-header">
  <a href="/" class="site-title-link" rel="home" on:click={closeNav}>
    <img
      class="site-header-image"
      src={portrait}
      srcSet="{portraitRetina} 2x"
      width={headerImageSize}
      height={headerImageSize}
      alt=""
    />
    <h1 class="site-title">{site.title}</h1>
  </a>
  <Navigation {isNavOpen} {toggleNav} {closeNav} />
</header>
