<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from './Navigation.svelte';
	let { gravatarUrl, site } = $page.data;

	// Take an existing gravatar URL and return a gravatar URL that has been
	// resized to the given size
	function resizeGravatar(gravatarUrl: string, size: number): string {
		const url = new URL(gravatarUrl);
		url.searchParams.set('size', String(size));
		return url.toString();
	}

	const headerImageSize = 60;
	const headerGravatarUrl = resizeGravatar(gravatarUrl, headerImageSize);
	const headerGravatarUrlRetina = resizeGravatar(gravatarUrl, headerImageSize * 2);
</script>

<header class="site-header">
	<a href="/" class="site-title-link" rel="home">
		<img
			class="site-header-image"
			src={headerGravatarUrl}
			srcSet={`${headerGravatarUrlRetina} 2x`}
			width={headerImageSize}
			height={headerImageSize}
			alt=""
		/>
		<h1 class="site-title">{site.title}</h1>
	</a>
	<Navigation />
</header>
