<script lang="ts">
  import site from '$data/site.json';
  import portraitRetina from '$images/self-portrait-v6.jpg?w=120&imagetools';
  import portrait from '$images/self-portrait-v6.jpg?w=60&imagetools';
  import Navigation from '$routes/Navigation.svelte';

  const headerImageSize = 60;

  let isNavOpen = $state(false);

  function closeNav() {
    isNavOpen = false;
  }
</script>

<header class="site-header">
  <a href="/" class="site-title-link" rel="home" onclick={closeNav}>
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
  <Navigation {isNavOpen} {closeNav} />
</header>
