<script lang="ts">
  import ProjectArchive from '#routes/projects/ProjectArchive.svelte';
  import type { PageProps } from './$types';

  // The archive title and projects loaded for this page
  let { data }: PageProps = $props();
</script>

<ProjectArchive
  projects={data.projects}
  title={data.title}
  description="This is a collection of projects I've developed in my spare time including one-pager web apps, Python programs, and JavaScript libraries."
/>
