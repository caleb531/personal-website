<script lang="ts">
	import ProjectArchive from '../ProjectArchive.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<p>
	This is a collection of projects I've developed in my spare time including one-pager web apps,
	Python programs, and JavaScript libraries.
</p>
<ProjectArchive projects={data.projects} />
