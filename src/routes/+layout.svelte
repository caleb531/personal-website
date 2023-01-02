<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../routes/Header.svelte';
	import '../styles/index.scss';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<svelte:head>
	{#if $page.data.id === 'home'}
		<title>{data.site.title} | {data.site.tagline}</title>
	{:else}
		<title>{$page.data.title} | {data.site.title}</title>
	{/if}
	<meta name="description" content={$page.data.description} />
</svelte:head>

<main data-page-id={$page.data.id}>
	<Header gravatarUrl={data.gravatarUrl} />
	<article class="page" id="page">
		{#if $page.data.title}
			<h2>{$page.data.title}</h2>
		{/if}
		<slot />
	</article>
</main>
