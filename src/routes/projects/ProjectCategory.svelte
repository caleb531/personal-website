<script lang="ts">
  import Project from '#routes/projects/Project.svelte';
  import type { TransitionType } from '#routes/transitions.ts';
  import type { ProjectCategoryData, ProjectEntry } from '#routes/types.ts';
  import { keyBy } from 'es-toolkit';

  interface Props {
    projects: ProjectEntry[];
    category: ProjectCategoryData;
    // The archive transition to run when a search changes the results
    transition: TransitionType;
  }

  let { projects, category, transition }: Props = $props();

  // Promote some projects to the top of the list
  const topProjectsSet = $derived(new Set(category.topProjects));
  // Demote some projects to the end of the list
  const bottomProjectsSet = $derived(new Set(category.bottomProjects));
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
</script>

{#if sortedProjects.length}
  <section class="project-category panel" transition:transition>
    <div class="project-category-header">
      <h3>{category.title}</h3>
      <span aria-hidden="true">{sortedProjects.length}</span>
    </div>
    <div class="project-category-listing">
      {#each sortedProjects as project (project.id)}
        <Project {project} {transition} />
      {/each}
    </div>
  </section>
{/if}
