<script lang="ts">
  import portrait from '../images/portrait-full.jpg?w=180&imagetools';
  import portraitRetina from '../images/portrait-full.jpg?w=360&imagetools';
  import ProjectArchive from './projects/ProjectArchive.svelte';
</script>

<article class="home-intro">
  <div class="home-intro-left">
    <div class="home-intro-photo">
      <img
        src={portrait}
        srcset={`${portraitRetina} 2x`}
        width={180}
        height={180}
        alt="Caleb Evans"
        class="home-intro-photo-image"
      />
    </div>
  </div>
  <div class="home-intro-right">
    <p>
      <strong>Hi, I'm Caleb</strong>, a web developer who lives for Christ by building enjoyable
      apps &amp; useful tools.
      <strong>Take&nbsp;a&nbsp;look&nbsp;around!</strong>
    </p>
  </div>
</article>

<ProjectArchive />
