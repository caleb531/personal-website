<script lang="ts">
  import { projectFadeSlide } from '../transitions';
  import type { ProjectEntry } from '../types';
  export let project: ProjectEntry;
</script>

<article data-entry-id={project.id} class="entry project" transition:projectFadeSlide|global>
  <a class="entry-image" href={project.direct_url} aria-hidden="true" tabindex="-1">
    <img src="/icons/projects/{project.id}.svg" alt="" width={80} height={80} loading="lazy" />
  </a>

  <section class="entry-main">
    <h4 class="entry-title">
      <a href={project.direct_url}>{project.title}</a>
    </h4>

    {#if project.description}
      <!-- eslint-disable-next-line svelte/no-at-html-tags Because the entry
      description is coming directly from static JSON files and is not sourced
      from user input, there is no XSS risk -->
      <p class="entry-desc">{@html project.description}</p>
    {/if}
  </section>
</article>
