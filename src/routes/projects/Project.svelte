<script lang="ts">
  import Entry from '$routes/(entries)/Entry.svelte';
  import EntryDesc from '$routes/(entries)/EntryDesc.svelte';
  import EntryImage from '$routes/(entries)/EntryImage.svelte';
  import EntryMain from '$routes/(entries)/EntryMain.svelte';
  import EntryTitle from '$routes/(entries)/EntryTitle.svelte';
  import type { ProjectEntry } from '$routes/types.ts';
  import { getProjectArchiveOptions } from '../projectArchiveOptions';

  interface Props {
    project: ProjectEntry;
  }

  let { project }: Props = $props();
  let transition = $derived(getProjectArchiveOptions().transition);
</script>

<Entry type="project" id={project.id} {transition}>
  <EntryImage href={project.direct_url} hiddenFromAccessibility>
    <img src={project.iconUrl} alt="" width={80} height={80} loading="lazy" />
  </EntryImage>
  <EntryMain>
    <EntryTitle href={project.direct_url} type="h4">{project.title}</EntryTitle>

    {#if project.description}
      <!-- Because the entry description is coming directly from static JSON
      files and is not sourced from user input, there is no XSS risk -->
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <EntryDesc>{@html project.description}</EntryDesc>
    {/if}
  </EntryMain>
</Entry>
