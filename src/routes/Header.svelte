<script lang="ts">
  import { resolve } from '$app/paths';
  import site from '#data/site.json';
  import Navigation from '#routes/Navigation.svelte';
</script>

<header class="site-header">
  <a href={resolve('/')} class="site-title-link" rel="home">
    <h1 class="site-title">{site.title}</h1>
  </a>
  <Navigation />
</header>
