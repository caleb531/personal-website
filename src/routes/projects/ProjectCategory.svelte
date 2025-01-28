<script lang="ts">
  import Project from '$routes/projects/Project.svelte';
  import type { ProjectCategoryData, ProjectEntry } from '$routes/types.ts';
  import { keyBy } from 'es-toolkit';
  import { getProjectArchiveOptions } from '../projectArchiveOptions';

  interface Props {
    projects: ProjectEntry[];
    category: ProjectCategoryData;
  }

  let { projects, category }: Props = $props();

  // Promote some projects to the top of the list
  const topProjectsSet = new Set(category.topProjects);
  // Demote some projects to the end of the list
  const bottomProjectsSet = new Set(category.bottomProjects);
  let projectsById: Record<string, ProjectEntry> = $derived(
    keyBy(projects, (project) => project.id)
  );
  // Re-sort projects list according to the promotion/demotion criteria defined
  // for this category
  let sortedProjects: ProjectEntry[] = $derived([
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
  ]);

  let transition = $derived(getProjectArchiveOptions().transition);
</script>

{#if sortedProjects.length}
  <section class="entry-list project-category" transition:transition>
    {#if sortedProjects.length}
      <h3 class="entry-list-category-title" transition:transition|global>
        {category.title}
      </h3>
      {#each sortedProjects as project (project.id)}
        <Project {project} />
      {/each}
    {/if}
  </section>
{/if}
