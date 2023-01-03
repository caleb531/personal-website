<script lang="ts">
  import { page } from '$app/stores';
  import { keyBy } from 'lodash-es';
  import websiteMetadata from '../../data/websites.json';
  import type { WebsiteMap } from '../types';
  import type { PageData } from './$types';
  import Website from './Website.svelte';

  let { websites } = $page.data as PageData;
  let websitesById: WebsiteMap = keyBy(websites, 'id');
  // A list of the websites to feature in the archive (this is mostly to dictate
  // the order)
  let websiteNames = websiteMetadata.websites;

  // TODO: implement click action for Google Analytics
  // const gaEventListenerProps = useEntryLinkListeners('websites');
</script>

<div class="entry-list website-list">
  {#each websiteNames as websiteName}
    <Website website={websitesById[websiteName]} />
  {/each}
</div>
