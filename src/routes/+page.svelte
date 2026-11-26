<script lang="ts">
  import projectMetadata from '#data/projects.json';
  import portraitFull from '#images/self-portrait-v7.jpg?w=256&imagetools';
  import portraitFullRetina from '#images/self-portrait-v7.jpg?w=512&imagetools';
  import Project from '#routes/projects/Project.svelte';
  import ProjectArchive from '#routes/projects/ProjectArchive.svelte';
  import { keyBy } from 'es-toolkit';
  import type { PageProps } from './$types';

  // The projects shared by the homepage groups and archive
  let { data }: PageProps = $props();

  // Look up featured projects by the IDs listed in each group
  const projectsById = $derived(keyBy(data.projects, (project) => project.id));
</script>

<section class="home-intro panel" aria-labelledby="home-intro-title">
  <h2 id="home-intro-title">
    Web apps, tools, and experiments<span>.</span>
  </h2>
  <p>
    Hi, I'm Caleb, a web developer who lives for Christ by building enjoyable apps &amp; useful
    tools. Take a look around!
  </p>
  <img
    src={portraitFull}
    srcset="{portraitFullRetina} 2x"
    width={256}
    height={256}
    alt="Caleb Evans"
    class="home-intro-photo"
  />
</section>

{#each projectMetadata.groups as group (group.id)}
  <section class="project-group" aria-labelledby={group.id}>
    <h2 id={group.id}>{group.title}</h2>
    <p>{group.description}</p>
    <div class="project-group-cards">
      {#each group.projects as projectId (projectId)}
        {#if projectsById[projectId]}
          <Project project={projectsById[projectId]} isFeatured />
        {/if}
      {/each}
    </div>
  </section>
{/each}

<div class="home-project-archive">
  <ProjectArchive
    projects={data.projects}
    title="All Projects"
    description="Most of these projects were built by hand, before ‘vibe coding’ had a name."
  />
</div>
