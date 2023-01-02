<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../routes/Header.svelte';
	import '../styles/index.scss';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<svelte:head>
	<title>{$page.data.title} | Caleb Evans</title>
	<meta name="description" content={$page.data.description} />
</svelte:head>

<main>
	<Header gravatarUrl={data.gravatarUrl} />
	<article class="page" id="page">
		{#if $page.data.title}
			<h2>{$page.data.title}</h2>
		{/if}
		<slot />
	</article>
</main>
