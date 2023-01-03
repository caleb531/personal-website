<script lang="ts">
	import { page } from '$app/stores';
	import { keyBy } from 'lodash-es';
	import type { ContactLinkMap } from '../components/types.d';
	import contactLinkMetadata from '../data/contact-links.json';
	import type { PageData } from './$types';
	import ContactLink from './ContactLink.svelte';

	const { contactLinks } = $page.data as PageData;
	export let isCompact: boolean = false;

	const contactLinksByName: ContactLinkMap = keyBy(contactLinks, 'id');

	// TODO: implement click action for Google Analytics
	// const gaEventListenerProps = useEntryLinkListeners('contact links');
</script>

<div
	class="entry-list contact-link-list"
	class:entry-list-compact={isCompact}
	class:contact-link-list-compact={isCompact}
>
	{#each contactLinkMetadata.contactLinks as contactLinkName}
		<ContactLink contactLink={contactLinksByName[contactLinkName]} {isCompact} />
	{/each}
</div>
