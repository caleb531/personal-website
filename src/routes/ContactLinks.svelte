<script lang="ts">
	import { keyBy } from 'lodash-es';
	import type { ContactLinkEntry, ContactLinkMap } from '../components/types.d';
	import contactLinkMetadata from '../data/contact-links.json';
	import ContactLink from './ContactLink.svelte';

	export let contactLinks: ContactLinkEntry[];
	export let isCompact: boolean;

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
