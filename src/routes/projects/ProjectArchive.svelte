<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import projectMetadata from '$data/projects.json';
  import SearchInput from '$routes/SearchInput.svelte';
  import ProjectCategory from '$routes/projects/ProjectCategory.svelte';
  import { noopTransition, projectFadeSlide } from '$routes/transitions';
  import type { ProjectCategoryMap, ProjectEntry, ProjectGroups } from '$routes/types.ts';
  import { groupBy } from 'es-toolkit';
  import { onMount } from 'svelte';
  import { setProjectArchiveOptions, type ProjectOptions } from '../projectArchiveOptions';
  import type { PageData } from './$types';

  // Pregenerate lookup table of project categories IDs to titles so the titles
  // can be added to the available keyword pool (for the user to search from)
  const categoriesById: ProjectCategoryMap = projectMetadata.categories.reduce((map, category) => {
    return { ...map, [category.id]: category };
  }, {});

  function filterProjects(projects: ProjectEntry[], searchQuery: string): ProjectEntry[] {
    if (searchQuery.trim() === '') {
      return projects;
    }
    return projects.filter((project) => {
      // Build a bank of keywords for this project using its title, description,
      // and category name
      const keywords = [
        ...project.title.toLowerCase().split(' '),
        categoriesById[project.category.toLowerCase()].title.toLowerCase(),
        ...project.description
          .toLowerCase()
          // Strip all HTML tags from the description
          .replace(/<(.+?)>/, '')
          .split(' ')
      ];
      // If every word in the search query is contained within a project's
      // keyword bank (see above), then the project is considered a match
      return searchQuery
        .trim()
        .toLowerCase()
        .split(' ')
        .every((searchKeyword) => {
          return keywords.some((keyword) => {
            return keyword.includes(searchKeyword);
          });
        });
    });
  }

  let searchQuery = $state('');

  let { projects } = page.data as Pick<PageData, 'projects'>;
  let visibleProjects: typeof projects = $derived(filterProjects(projects, searchQuery));
  let visibleProjectsByCategory: ProjectGroups = $derived(
    groupBy(visibleProjects, (project) => project.category)
  );

  // Check the user's preference for reduced motion so that we can conditionally
  // enable/disable transitions accordingly
  const reducedMotionQuery: MediaQueryList | null = browser
    ? matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  // Svelte 5 runs global transitions on mount by default, and in SvelteKit,
  // there's no way to disable this intro transition on mount; this creates a
  // CLS issue at the time of hydration, so we need to set a noop transition
  // initially and only set the actual transition when the component mounts
  let projectOptions: ProjectOptions = $state({ transition: noopTransition });
  setProjectArchiveOptions(projectOptions);
  let transition = $derived(projectOptions.transition);
  onMount(() => {
    // Only enable the project fade-slide transition if the user has not
    // requested reduced motion
    if (!reducedMotionQuery || !reducedMotionQuery.matches) {
      projectOptions.transition = projectFadeSlide;
    }
  });

  // If the user changes their preference for reduced motion during the lifetime
  // of the page, update the transition accordingly
  $effect(() => {
    reducedMotionQuery?.addEventListener('change', () => {
      projectOptions.transition = reducedMotionQuery.matches ? noopTransition : projectFadeSlide;
    });
  });
</script>

<article class="project-archive">
  <div class="project-search-container">
    <form class="project-search-container-form" onsubmit={(event) => event.preventDefault()}>
      <SearchInput
        name="search"
        id="project-search-input"
        bind:value={searchQuery}
        placeholder="Search for a project"
        ariaLabel="Search for a project; results will update as you type"
      />
    </form>
    {#if visibleProjects.length}
      <div
        class="project-search-result-count"
        aria-live="polite"
        aria-atomic="true"
        transition:transition|global
      >
        {#if visibleProjects.length === 1}
          Showing 1 project
        {:else}
          Showing {visibleProjects.length} projects
        {/if}
      </div>
    {:else}
      <div
        class="project-search-no-results"
        aria-live="polite"
        aria-atomic="true"
        transition:transition|global
      >
        No Matching Projects
      </div>
    {/if}
  </div>
  <div class="projects-by-category" aria-live="polite" aria-atomic="true">
    {#each projectMetadata.categories as category}
      <ProjectCategory {category} projects={visibleProjectsByCategory[category.id] ?? []} />
    {/each}
  </div>
</article>
