<script lang="ts">
  import Project from '$routes/projects/Project.svelte';
  import { projectFadeSlide } from '$routes/transitions.ts';
  import type { ProjectCategoryData, ProjectEntry } from '$routes/types.ts';
  import { keyBy } from 'es-toolkit';

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
    projectsById = keyBy(projects, (project) => project.id);
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

<section class="entry-list project-category desktop-column-{category.column}">
  {#if sortedProjects.length}
    <h3 class="entry-list-category-title" transition:projectFadeSlide|global>
      {category.title}
    </h3>
  {/if}

  {#each sortedProjects as project (project.id)}
    <Project {project} />
  {/each}
</section>
