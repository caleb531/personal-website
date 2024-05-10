<script lang="ts">
  import portraitFull from '$images/self-portrait-v6-full.jpg?w=180&imagetools';
  import portraitFullRetina from '$images/self-portrait-v6-full.jpg?w=360&imagetools';
  import ProjectArchive from '$routes/projects/ProjectArchive.svelte';
</script>

<article class="home-intro">
  <div class="home-intro-left">
    <img
      src={portraitFull}
      srcset="{portraitFullRetina} 2x"
      width={180}
      height={180}
      alt="Caleb Evans"
      class="home-intro-photo"
    />
  </div>
  <div class="home-intro-right">
    <p>
      <strong>Hi, I'm Caleb</strong>, a web developer who lives for Christ by building enjoyable
      apps &amp; useful tools.
      <strong>Take&nbsp;a&nbsp;look&nbsp;around!</strong>
    </p>
  </div>
</article>

<section>
  <h2 class="accessibility-only">Projects</h2>
  <ProjectArchive />
</section>
