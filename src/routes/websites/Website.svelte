<script lang="ts">
  import Entry from '$routes/(entries)/Entry.svelte';
  import EntryDesc from '$routes/(entries)/EntryDesc.svelte';
  import EntryImage from '$routes/(entries)/EntryImage.svelte';
  import EntryMain from '$routes/(entries)/EntryMain.svelte';
  import EntryTitle from '$routes/(entries)/EntryTitle.svelte';
  import type { WebsiteEntry } from '$routes/types.ts';
  import {
    getWebsite1xThumbnailUrl,
    getWebsite2xThumbnailUrl
  } from '$src/routes/websites/websiteImageUtils.ts';

  interface Props {
    website: WebsiteEntry;
  }

  let { website }: Props = $props();
</script>

<Entry type="website" id={website.id}>
  <EntryImage href={website.direct_url} hiddenFromAccessibility>
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

    <!-- Because the entry content is coming directly from static JSON files and
    is not sourced from user input, there is no XSS risk -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <EntryDesc>{@html website.content}</EntryDesc>
  </EntryMain>
</Entry>
