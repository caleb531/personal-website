<script lang="ts">
  import { page } from '$app/stores';
  import { keyBy } from 'lodash-es';
  import { analyticsEntryListeners } from '../actions/analyticsEntryListeners';
  import contactLinkMetadata from '../data/contact-links.json';
  import type { PageData } from './$types';
  import ContactLink from './ContactLink.svelte';
  import type { ContactLinkMap } from './types';

  const { contactLinks } = $page.data as PageData;
  export let isCompact: boolean = false;

  const contactLinksByName: ContactLinkMap = keyBy(contactLinks, 'id');
</script>

<div
  class="entry-list contact-link-list"
  class:entry-list-compact={isCompact}
  class:contact-link-list-compact={isCompact}
  use:analyticsEntryListeners={'contact links'}
>
  {#each contactLinkMetadata.contactLinks as contactLinkName (contactLinkName)}
    {#if contactLinksByName[contactLinkName]}
      <ContactLink contactLink={contactLinksByName[contactLinkName]} {isCompact} />
    {/if}
  {/each}
</div>
