<script lang="ts">
  import Entry from '../(entries)/Entry.svelte';
  import EntryDesc from '../(entries)/EntryDesc.svelte';
  import EntryImage from '../(entries)/EntryImage.svelte';
  import EntryMain from '../(entries)/EntryMain.svelte';
  import EntryTitle from '../(entries)/EntryTitle.svelte';
  import type { ContactLinkEntry } from '../types';
  export let contactLink: ContactLinkEntry;
  export let isCompact = false;
</script>

<Entry type="contact-link" id={contactLink.id}>
  {#if !isCompact}
    <EntryImage href={contactLink.direct_url} hiddenFromAccessibility>
      <img src="/icons/contact-links/{contactLink.id}.svg" alt="" width={64} height={64} />
    </EntryImage>
    <EntryMain>
      <EntryTitle href={contactLink.direct_url}>{contactLink.title}</EntryTitle>

      <EntryDesc>{contactLink.description}</EntryDesc>
    </EntryMain>
  {:else}
    <EntryImage href={contactLink.direct_url} title={contactLink.title}>
      <img
        src="/icons/contact-links/{contactLink.id}.svg"
        alt={contactLink.title}
        width={40}
        height={40}
        loading="lazy"
      />
    </EntryImage>
  {/if}
</Entry>
