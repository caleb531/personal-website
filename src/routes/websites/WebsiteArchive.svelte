<script lang="ts">
  import { page } from '$app/stores';
  import { keyBy } from 'lodash-es';
  import { analyticsEntryListeners } from '../../actions/analyticsEntryListeners';
  import websiteMetadata from '../../data/websites.json';
  import type { WebsiteMap } from '../types';
  import type { PageData } from './$types';
  import Website from './Website.svelte';

  let { websites } = $page.data as PageData;
  let websitesById: WebsiteMap = keyBy(websites, 'id');
  // A list of the websites to feature in the archive (this is mostly to dictate
  // the order)
  let websiteNames = websiteMetadata.websites;
</script>

<div class="entry-list website-list" use:analyticsEntryListeners={'websites'}>
  {#each websiteNames as websiteName}
    <Website website={websitesById[websiteName]} />
  {/each}
</div>
