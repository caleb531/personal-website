<script lang="ts">
  import Entry from '#routes/(entries)/Entry.svelte';
  import EntryDesc from '#routes/(entries)/EntryDesc.svelte';
  import EntryMain from '#routes/(entries)/EntryMain.svelte';
  import EntryTitle from '#routes/(entries)/EntryTitle.svelte';
  import type { ProjectEntry } from '#routes/types.ts';
  import { getProjectTagLabels } from '#routes/projects/projectSearch.ts';
  import { noopTransition, type TransitionType } from '#routes/transitions.ts';

  // The project and its presentation within the gallery or archive
  interface Props {
    project: ProjectEntry;
    isFeatured?: boolean;
    transition?: TransitionType;
  }

  // Featured cards stay in place while the archive animates search results
  let { project, isFeatured = false, transition = noopTransition }: Props = $props();

  // The display labels for any tags assigned to this project
  const tags = $derived(getProjectTagLabels(project));
</script>

<Entry
  type={isFeatured ? 'project featured-project panel' : 'project'}
  id={project.id}
  {transition}
>
  <div class="entry-image">
    <img aria-hidden="true" src={project.iconUrl} alt="" width={80} height={80} loading="lazy" />
  </div>
  <EntryMain>
    <EntryTitle href={project.direct_url} type={isFeatured ? 'h3' : 'h4'}>
      {project.title}
    </EntryTitle>

    {#if project.description}
      <!-- Because the entry description is coming directly from static JSON
      files and is not sourced from user input, there is no XSS risk -->
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <EntryDesc>{@html project.description}</EntryDesc>
    {/if}
    {#if tags.length}
      <ul class="project-tags">
        {#each tags as tag (tag)}
          <li>{tag}</li>
        {/each}
      </ul>
    {/if}
  </EntryMain>
</Entry>
