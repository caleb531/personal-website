<script lang="ts">
  import Entry from '$routes/(entries)/Entry.svelte';
  import EntryDesc from '$routes/(entries)/EntryDesc.svelte';
  import EntryImage from '$routes/(entries)/EntryImage.svelte';
  import EntryMain from '$routes/(entries)/EntryMain.svelte';
  import EntryTitle from '$routes/(entries)/EntryTitle.svelte';
  import { projectFadeSlide } from '$routes/transitions';
  import type { ProjectEntry } from '$routes/types';

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
