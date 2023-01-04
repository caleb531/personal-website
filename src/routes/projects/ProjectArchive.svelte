<script lang="ts">
  import { page } from '$app/stores';
  import { groupBy, keyBy } from 'lodash-es';
  import { writable } from 'svelte/store';
  import type { PageData } from '../$types';
  import { analyticsEntryListeners } from '../../actions/analyticsEntryListeners';
  import projectMetadata from '../../data/projects.json';
  import type { ProjectCategoryMap, ProjectEntry, ProjectGroups } from '../types';
  import ProjectCategory from './ProjectCategory.svelte';

  // Pregenerate lookup table of project categories IDs to titles so the titles
  // can be added to the available keyword pool (for the user to search from)
  const categoriesById: ProjectCategoryMap = projectMetadata.categoriesByColumn.reduce(
    (map, categoriesInColumn) => {
      return { ...map, ...keyBy(categoriesInColumn, 'id') };
    },
    {}
  );

  function filterProjects(projects: ProjectEntry[], searchQuery: string): ProjectEntry[] {
    if (searchQuery.trim() === '') {
      return projects;
    }
    return projects.filter((project) => {
      const keywords = [
        ...project.title.toLowerCase().split(' '),
        categoriesById[project.category.toLowerCase()].title.toLowerCase(),
        ...project.description.toLowerCase().split(' ')
      ];
      return searchQuery
        .toLowerCase()
        .split(' ')
        .every((searchKeyword) => {
          return keywords.some((keyword) => {
            return keyword.indexOf(searchKeyword) !== -1;
          });
        });
    });
  }

  // Disable the browser-native search behavior of reloading the page when the
  // <form> element is submitted
  function disableNativeFormSubmit(event: Event) {
    event.preventDefault();
  }

  const searchQuery = writable('');

  let { projects } = $page.data as PageData;
  let visibleProjects: typeof projects;
  let visibleProjectsByCategory: ProjectGroups;
  let columnVisibilityMap: boolean[];
  $: {
    visibleProjects = filterProjects(projects, $searchQuery);
    visibleProjectsByCategory = groupBy(visibleProjects, 'category');
    // Keep track of which columns contain projects that match the search query
    // so we can only show those columns
    columnVisibilityMap = projectMetadata.categoriesByColumn.map((categoriesInColumn) => {
      return categoriesInColumn.some((category) => {
        return visibleProjectsByCategory[category.id]?.length > 0;
      });
    });
  }
</script>

<div class="project-archive" use:analyticsEntryListeners={'projects'}>
  <div class="project-search-container">
    <form class="project-search-container-form" on:submit={disableNativeFormSubmit}>
      <label for="project-search-input" class="accessibility-only"> Search: </label>
      <input
        type="search"
        name="search"
        id="project-search-input"
        bind:value={$searchQuery}
        placeholder="Search for a project"
      />
    </form>
    {#if visibleProjects.length}
      <div class="project-search-result-count">
        {visibleProjects.length === 1
          ? 'Showing 1 project'
          : `Showing ${visibleProjects.length} projects`}
      </div>
    {:else}
      <div class="project-search-no-results">No Projects Found</div>
    {/if}
  </div>
  <div class="project-list-container">
    {#each projectMetadata.categoriesByColumn as categoriesInColumn, columnIndex}
      {#if columnVisibilityMap[columnIndex]}
        <div class="project-list-column">
          {#each categoriesInColumn as category}
            {#if visibleProjectsByCategory[category.id]}
              <ProjectCategory {category} projects={visibleProjectsByCategory[category.id]} />
            {/if}
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>
