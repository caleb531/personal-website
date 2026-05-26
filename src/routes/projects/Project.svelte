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
  const projectOptions = getProjectArchiveOptions();
  // Svelte 5.55.3 started freezing deriveds whose owner effects are
  // destroyed/inert. Project cards can remain in the DOM while outroing after a
  // search removes them, so a local `$derived(projectOptions.transition)` would
  // belong to the outgoing card and warn as `derived_inert` when Svelte later
  // reads the transition. Keep this as a plain callback instead: it gives the
  // transition directive a stable function without latching onto
  // `noopTransition` as the initial transition value, and it reads the
  // archive-owned getter only when the transition actually starts.
  const transition = (node: Element) => projectOptions.transition(node);
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
