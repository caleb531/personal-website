<script lang="ts">
  import { page } from '$app/stores';
  import { keyBy } from 'lodash-es';
  import contactLinkMetadata from '../../data/contact-links.json';
  import type { ContactLinkMap } from '../types';
  import ContactLink from './ContactLink.svelte';

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
