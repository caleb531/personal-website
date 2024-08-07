<script lang="ts">
  import { page } from '$app/stores';
  import contactLinkMetadata from '$data/contact-links.json';
  import ContactLink from '$routes/contact/ContactLink.svelte';
  import type { ContactLinkMap } from '$routes/types.ts';
  import { keyBy } from 'es-toolkit';
  import type { PageData } from './$types';

  const { contactLinks } = $page.data as Pick<PageData, 'contactLinks'>;
  export let isCompact = false;

  const contactLinksById: ContactLinkMap = keyBy(contactLinks, (contactLink) => contactLink.id);
</script>

<div class="entry-list contact-link-list" class:entry-list-compact={isCompact}>
  {#each contactLinkMetadata.contactLinks as contactLinkId (contactLinkId)}
    {#if contactLinksById[contactLinkId]}
      <ContactLink contactLink={contactLinksById[contactLinkId]} {isCompact} />
    {/if}
  {/each}
</div>
