<script lang="ts">
  import Entry from '../Entry.svelte';
  import EntryDesc from '../EntryDesc.svelte';
  import EntryImage from '../EntryImage.svelte';
  import EntryMain from '../EntryMain.svelte';
  import EntryTitle from '../EntryTitle.svelte';
  import { projectFadeSlide } from '../transitions';
  import type { ProjectEntry } from '../types';
  export let project: ProjectEntry;
</script>

<Entry type="project" id={project.id} transition={projectFadeSlide}>
  <EntryImage href={project.direct_url} hiddenFromAccessibility>
    <img src="/icons/projects/{project.id}.svg" alt="" width={80} height={80} loading="lazy" />
  </EntryImage>
  <EntryMain>
    <EntryTitle href={project.direct_url} type="h4">{project.title}</EntryTitle>

    {#if project.description}
      <!-- eslint-disable-next-line svelte/no-at-html-tags Because the entry
      description is coming directly from static JSON files and is not sourced
      from user input, there is no XSS risk -->
      <EntryDesc>{@html project.description}</EntryDesc>
    {/if}
  </EntryMain>
</Entry>
