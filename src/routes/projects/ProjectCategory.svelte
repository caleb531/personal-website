<script lang="ts">
  import { keyBy } from 'lodash-es';
  import type { ProjectCategoryData, ProjectEntry } from '../types';
  import Project from './Project.svelte';

  export let projects: ProjectEntry[];
  export let category: ProjectCategoryData;

  // Promote some projects to the top of the list
  const topProjectsSet = new Set(category.topProjects);
  // Demote some projects to the end of the list
  const bottomProjectsSet = new Set(category.bottomProjects);
  let projectsById: Record<string, ProjectEntry>;
  // Re-sort projects list according to the promotion/demotion criteria defined
  // for this category
  let sortedProjects: ProjectEntry[];
  $: {
    projectsById = keyBy(projects, 'id');
    sortedProjects = [
      ...(category.topProjects || [])
        .map((projectId) => projectsById[projectId])
        // If the user searches for a project, then projectsById[projectId]
        // might return undefined because topProjects may not include any
        // projects that can be shown; to solve this, we filter out all falsy
        // values
        .filter(Boolean),
      ...projects.filter(
        (project) => !topProjectsSet.has(project.id) && !bottomProjectsSet.has(project.id)
      ),
      ...(category.bottomProjects || [])
        .map((projectId) => projectsById[projectId])
        // If the user searches for a project, then projectsById[projectId]
        // might return undefined because bottomProjects may not include any
        // projects that can be shown; to solve this, we filter out all falsy
        // values
        .filter(Boolean)
    ];
  }
</script>

{#if sortedProjects.length}
  <section class="entry-list project-list">
    <h3 class="entry-list-category-title project-list-category-title">
      {category.title}
    </h3>

    {#each sortedProjects as project}
      <Project {project} />
    {/each}
  </section>
{/if}
