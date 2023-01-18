<script lang="ts">
  import { page } from '$app/stores';
  import { groupBy, keyBy } from 'lodash-es';
  import type { PageData } from '../$types';
  import { analyticsEntryListeners } from '../../actions/analyticsEntryListeners';
  import projectMetadata from '../../data/projects.json';
  import { projectFadeSlide } from '../transitions';
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

  let { projects } = $page.data as PageData;
  let visibleProjects: typeof projects;
  let visibleProjectsByCategory: ProjectGroups;
  $: {
    visibleProjects = filterProjects(projects, searchQuery);
    visibleProjectsByCategory = groupBy(visibleProjects, 'category');
  }
</script>

<div class="project-archive" use:analyticsEntryListeners={'Visit Project'}>
  <div class="project-search-container">
    <form class="project-search-container-form" on:submit|preventDefault>
      <input
        type="search"
        name="search"
        id="project-search-input"
        bind:value={searchQuery}
        placeholder="Search for a project"
        aria-label="Search for a project"
      />
    </form>
    {#if visibleProjects.length}
      <div class="project-search-result-count" aria-live="polite" transition:projectFadeSlide>
        {#if visibleProjects.length === 1}
          Showing 1 project
        {:else}
          Showing {visibleProjects.length} projects
        {/if}
      </div>
    {:else}
      <div class="project-search-no-results" aria-live="polite" transition:projectFadeSlide>
        No Projects Found
      </div>
    {/if}
  </div>
  <div class="project-list-container" aria-live="polite">
    {#each projectMetadata.categoriesByColumn as categoriesInColumn}
      <div class="project-list-column">
        {#each categoriesInColumn as category (category.id)}
          {#if visibleProjectsByCategory[category.id]}
            <ProjectCategory {category} projects={visibleProjectsByCategory[category.id]} />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
