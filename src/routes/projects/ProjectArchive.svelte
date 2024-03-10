<script lang="ts">
  import { page } from '$app/stores';
  import projectMetadata from '$data/projects.json';
  import ProjectCategory from '$routes/projects/ProjectCategory.svelte';
  import SearchInput from '$routes/SearchInput.svelte';
  import { projectFadeSlide } from '$routes/transitions';
  import type { ProjectCategoryData, ProjectCategoryMap, ProjectEntry } from '$routes/types';
  import { groupBy, keyBy, times } from 'lodash-es';

  // Pregenerate lookup table of project categories IDs to titles so the titles
  // can be added to the available keyword pool (for the user to search from)
  const categoriesById: ProjectCategoryMap = keyBy(projectMetadata.categories, 'id');

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
        ...project.description.toLowerCase().split(' ')
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

  let searchQuery = '';

  let { projects } = $page.data;
  let visibleProjects: ProjectEntry[];
  let visibleProjectsByCategory: Record<string, ProjectEntry[]>;
  let categoriesByColumn: ProjectCategoryData[][];
  let columnCount: number;
  if (typeof matchMedia !== 'undefined') {
    const mediaQueryList = matchMedia('screen and (max-width: 768px)');
    mediaQueryList.addEventListener('change', (event) => {
      columnCount = event.matches ? 1 : 2;
    });
    columnCount = mediaQueryList.matches ? 1 : 2;
  }
  $: {
    visibleProjects = filterProjects(projects, searchQuery);
    visibleProjectsByCategory = groupBy(visibleProjects, 'category');
    categoriesByColumn = times(columnCount, (columnIndex) => {
      return projectMetadata.categories.filter((category, categoryIndex) => {
        return categoryIndex % columnCount === columnIndex;
      });
    });
  }
</script>

<article class="project-archive">
  <div class="project-search-container">
    <form class="project-search-container-form" on:submit|preventDefault>
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
        transition:projectFadeSlide|global
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
        transition:projectFadeSlide|global
      >
        No Projects Found
      </div>
    {/if}
  </div>
  <div class="project-list-container" aria-live="polite" aria-atomic="true">
    {#each categoriesByColumn as categoriesInColumn}
      <div class="project-list-column">
        {#each categoriesInColumn as category (category.id)}
          {#if visibleProjectsByCategory[category.id]}
            <ProjectCategory {category} projects={visibleProjectsByCategory[category.id]} />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</article>
