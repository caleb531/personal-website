<script lang="ts">
	import { groupBy, keyBy } from 'lodash-es';
	import { writable } from 'svelte/store';
	import type { ProjectCategoryMap, ProjectEntry, ProjectGroups } from '../components/types';
	import projectMetadata from '../data/projects.json';
	import ProjectCategory from './ProjectCategory.svelte';

	// Pregenerate lookup table of project categories IDs to titles so the titles
	// can be added to the available keyword pool (for the user to search from)
	const categoriesById: ProjectCategoryMap = projectMetadata.categories.reduce(
		(map, categories) => {
			return { ...map, ...keyBy(categories, 'id') };
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

	export let projects: ProjectEntry[];
	let visibleProjects: typeof projects;
	let visibleProjectsByCategory: ProjectGroups;
	$: {
		visibleProjects = filterProjects(projects, $searchQuery);
		visibleProjectsByCategory = groupBy(visibleProjects, 'category');
	}

	// TODO: implement click action for Google Analytics
	// const gaEventListenerProps = useEntryLinkListeners('projects');
</script>

<div class="project-archive">
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
		{#each projectMetadata.categories as categories}
			<div class="project-list-column">
				{#each categories as category}
					<ProjectCategory {category} projects={visibleProjectsByCategory[category.id] || []} />
				{/each}
			</div>
		{/each}
	</div>
</div>
