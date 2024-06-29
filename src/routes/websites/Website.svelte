<script lang="ts">
  import Entry from '$routes/(entries)/Entry.svelte';
  import EntryDesc from '$routes/(entries)/EntryDesc.svelte';
  import EntryImage from '$routes/(entries)/EntryImage.svelte';
  import EntryMain from '$routes/(entries)/EntryMain.svelte';
  import EntryTitle from '$routes/(entries)/EntryTitle.svelte';
  import { websiteFade } from '$routes/transitions';
  import type { WebsiteEntry } from '$routes/types';
  import {
    getWebsite1xThumbnailUrl,
    getWebsite2xThumbnailUrl
  } from '$routes/websites/WebsiteImageStore';

  export let website: WebsiteEntry;
</script>

<Entry type="website" id={website.id}>
  <EntryImage href={website.direct_url} hiddenFromAccessibility transition={websiteFade}>
    <img
      src={getWebsite1xThumbnailUrl(website)}
      srcset="{getWebsite2xThumbnailUrl(website)} 2x"
      alt=""
      width={256}
      height={160}
    />
  </EntryImage>
  <EntryMain>
    <EntryTitle href={website.direct_url}>{website.title}</EntryTitle>

    <p class="website-years">
      {website.start_year} &ndash; {website.end_year || 'present'}
    </p>
    <p class="website-technologies">{website.technologies}</p>

    <!-- eslint-disable-next-line svelte/no-at-html-tags Because the entry
    content is coming directly from static JSON files and is not sourced from
    user input, there is no XSS risk -->
    <EntryDesc>{@html website.content}</EntryDesc>
  </EntryMain>
</Entry>
