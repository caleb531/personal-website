<script lang="ts">
  import { websiteFade } from '../transitions';
  import type { WebsiteEntry } from '../types';
  import { getWebsite1xThumbnailUrl, getWebsite2xThumbnailUrl } from './WebsiteImageStore';
  export let website: WebsiteEntry;
</script>

<article data-entry-id={website.id} class="entry website">
  <a
    class="entry-image"
    href={website.direct_url}
    transition:websiteFade|global
    aria-hidden="true"
    tabindex="-1"
  >
    <img
      src={getWebsite1xThumbnailUrl(website)}
      srcset="{getWebsite2xThumbnailUrl(website)} 2x"
      alt=""
      width={256}
      height={160}
    />
  </a>
  <section class="entry-main">
    <h3 class="entry-title">
      <a href={website.direct_url}>{website.title}</a>
    </h3>

    <div class="website-years">
      {website.start_year} &ndash; {website.end_year || 'present'}
    </div>
    <div class="website-technologies">{website.technologies}</div>

    <div class="entry-desc">
      <!-- eslint-disable-next-line svelte/no-at-html-tags Because the entry
      content is coming directly from static JSON files and is not sourced from
      user input, there is no XSS risk -->
      {@html website.content}
    </div>
  </section>
</article>
