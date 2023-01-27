<script lang="ts">
  import { page } from '$app/stores';
  import { keyBy } from 'lodash-es';
  import websiteMetadata from '../../data/websites.json';
  import type { WebsiteMap } from '../types';
  import Website from './Website.svelte';

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
