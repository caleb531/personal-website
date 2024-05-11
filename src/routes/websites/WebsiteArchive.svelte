<script lang="ts">
  import { page } from '$app/stores';
  import websiteMetadata from '$data/websites.json';
  import Website from '$routes/websites/Website.svelte';
  import { objectify } from 'radash';
  import type { PageData } from './$types';

  let { websites } = $page.data as Pick<PageData, 'websites'>;
  let websitesById = objectify(websites, (website) => website.id);
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
