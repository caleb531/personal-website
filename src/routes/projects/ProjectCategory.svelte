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

  const projectOptions = getProjectArchiveOptions();
  // Svelte 5.55.3 started freezing deriveds whose owner effects are
  // destroyed/inert. Project cards can remain in the DOM while outroing after a
  // search removes them, so a local `$derived(projectOptions.transition)` would
  // belong to the outgoing card and warn as `derived_inert` when Svelte later
  // reads the transition. Keep this as a plain callback instead: it gives the
  // transition directive a stable function without latching onto
  // `noopTransition` as the initial transition value, and it reads the
  // archive-owned transition callback only when the transition actually starts.
  const transition = (node: Element) => projectOptions.transition(node);
</script>

{#if sortedProjects.length}
  <section class="entry-list project-category">
    <h3 class="entry-list-category-title" transition:transition>
      {category.title}
    </h3>
    {#each sortedProjects as project (project.id)}
      <Project {project} />
    {/each}
  </section>
{/if}
