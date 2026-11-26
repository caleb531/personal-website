<script lang="ts">
  import SearchInput from '#routes/SearchInput.svelte';
  import projectMetadata from '#data/projects.json';
  import ProjectCategory from '#routes/projects/ProjectCategory.svelte';
  import { filterProjects } from '#routes/projects/projectSearch.ts';
  import { noopTransition, projectFadeSlide } from '#routes/transitions.ts';
  import type { ProjectEntry, ProjectGroups } from '#routes/types.ts';
  import { groupBy } from 'es-toolkit';
  import { prefersReducedMotion } from 'svelte/motion';
  import MountObserver from '../MountObserver.svelte';

  // The archive content supplied by the homepage or the projects page
  interface Props {
    projects: ProjectEntry[];
    title: string;
    description: string;
  }

  // The full catalog and the heading and description for this archive
  let { projects, title, description }: Props = $props();

  // A unique heading ID keeps the two archives distinct while routes crossfade
  const archiveId = $props.id();

  // The current query, including any whitespace typed into the search field
  let searchQuery = $state('');

  // The projects that match the current query, before applying category order
  const visibleProjects = $derived(filterProjects(projects, searchQuery));

  // The matching projects indexed by the category in their frontmatter
  const visibleProjectsByCategory: ProjectGroups = $derived(
    groupBy(visibleProjects, (project) => project.category)
  );

  // Skip global intro transitions during hydration to avoid layout shifts
  const isMounted = new MountObserver();

  // Read the current state when the transition starts because outgoing cards
  // can outlive the effects that created them
  const transition = (node: Element) => {
    return isMounted.current && !prefersReducedMotion.current
      ? projectFadeSlide(node)
      : noopTransition(node);
  };
</script>

<section class="project-archive" aria-labelledby={archiveId}>
  <div class="project-archive-header">
    <h2 id={archiveId}>{title}</h2>
    <p class="project-archive-description">{description}</p>
    <form class="project-search-form" onsubmit={(event) => event.preventDefault()}>
      <SearchInput
        name="search"
        bind:value={searchQuery}
        placeholder="Search projects"
        aria-label="Search projects; results will update as you type"
      />
    </form>
    <p class="project-search-result-count" aria-live="polite" aria-atomic="true">
      {#if visibleProjects.length}
        Showing <strong>{visibleProjects.length}</strong>
        {visibleProjects.length === 1 ? 'project' : 'projects'}
      {:else}
        No Matching Projects
      {/if}
    </p>
  </div>
  <div class="project-category-columns">
    {#each projectMetadata.categoriesByColumn as categories, categoryIndex (categoryIndex)}
      <div class="project-category-column">
        {#each categories as category (category.id)}
          <ProjectCategory
            {category}
            projects={visibleProjectsByCategory[category.id] ?? []}
            {transition}
          />
        {/each}
      </div>
    {/each}
  </div>
</section>
