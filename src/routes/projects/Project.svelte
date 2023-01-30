<script lang="ts">
  import { projectFadeSlide } from '../transitions';
  import type { PageData } from './$types';
  export let project: PageData['projects'][number];
</script>

<article data-entry-id={project.id} class="entry project" transition:projectFadeSlide>
  <a
    class="entry-image project-image"
    href={project.direct_url}
    aria-labelledby="project-title-{project.id}"
  >
    <img src="/icons/projects/{project.id}.svg" alt="" width={80} height={80} loading="lazy" />
  </a>

  <section class="entry-main project-main">
    <h4 class="entry-title project-title" id="project-title-{project.id}">
      <a href={project.direct_url}>{project.title}</a>
    </h4>

    {#if project.description}
      <p class="entry-desc project-desc">{project.description}</p>
    {/if}
  </section>
</article>
