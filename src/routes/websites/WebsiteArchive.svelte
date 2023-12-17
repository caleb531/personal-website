<script lang="ts">
  import { page } from '$app/stores';
  import websiteMetadata from '$data/websites.json';
  import type { WebsiteMap } from '$routes/types';
  import Website from '$routes/websites/Website.svelte';
  import { keyBy } from 'lodash-es';

  let { websites } = $page.data;
  let websitesById: WebsiteMap = keyBy(websites, 'id');
  // A list of the websites to feature in the archive (this is mostly to dictate
  // the order)
  let websiteNames = websiteMetadata.websites;
</script>

<div class="entry-list website-list">
  {#each websiteNames as websiteName (websiteName)}
    {#if websitesById[websiteName]}
      <Website website={websitesById[websiteName]} />
    {/if}
  {/each}
</div>
