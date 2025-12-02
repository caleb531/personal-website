<script lang="ts">
  import { resolve } from '$app/paths';
  import site from '$data/site.json';
  import portraitRetina from '$images/self-portrait-v6.jpg?w=120&imagetools';
  import portrait from '$images/self-portrait-v6.jpg?w=60&imagetools';
  import Navigation from '$routes/Navigation.svelte';

  const headerImageSize = 60;
</script>

<header class="site-header">
  <a href={resolve('/')} class="site-title-link" rel="home">
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
  <Navigation />
</header>
