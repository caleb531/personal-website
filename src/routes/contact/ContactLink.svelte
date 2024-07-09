<script lang="ts">
  import Entry from '$routes/(entries)/Entry.svelte';
  import EntryDesc from '$routes/(entries)/EntryDesc.svelte';
  import EntryImage from '$routes/(entries)/EntryImage.svelte';
  import EntryMain from '$routes/(entries)/EntryMain.svelte';
  import EntryTitle from '$routes/(entries)/EntryTitle.svelte';
  import type { ContactLinkEntry } from '$routes/types.ts';

  export let contactLink: ContactLinkEntry;
  export let isCompact = false;
</script>

<Entry type="contact-link" id={contactLink.id}>
  {#if !isCompact}
    <EntryImage href={contactLink.direct_url} hiddenFromAccessibility>
      <img src={contactLink.iconUrl} alt="" width={64} height={64} />
    </EntryImage>
    <EntryMain>
      <EntryTitle href={contactLink.direct_url}>{contactLink.title}</EntryTitle>

      <EntryDesc>{@html contactLink.description}</EntryDesc>
    </EntryMain>
  {:else}
    <EntryImage href={contactLink.direct_url} title={contactLink.title}>
      <img
        src={contactLink.iconUrl}
        alt={contactLink.title}
        width={40}
        height={40}
        loading="lazy"
      />
    </EntryImage>
  {/if}
</Entry>
