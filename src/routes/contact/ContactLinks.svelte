<script lang="ts">
  import { page } from '$app/stores';
  import contactLinkMetadata from '$data/contact-links.json';
  import ContactLink from '$routes/contact/ContactLink.svelte';
  import type { ContactLinkMap } from '$routes/types';
  import { keyBy } from 'lodash-es';

  const { contactLinks } = $page.data;
  export let isCompact = false;

  const contactLinksByName: ContactLinkMap = keyBy(contactLinks, 'id');
</script>

<div class="entry-list contact-link-list" class:entry-list-compact={isCompact}>
  {#each contactLinkMetadata.contactLinks as contactLinkName (contactLinkName)}
    {#if contactLinksByName[contactLinkName]}
      <ContactLink contactLink={contactLinksByName[contactLinkName]} {isCompact} />
    {/if}
  {/each}
</div>
