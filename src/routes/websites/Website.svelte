<script lang="ts">
  import { websiteFade } from '../transitions';
  import type { ResizedWebsiteEntry } from '../types';
  export let website: ResizedWebsiteEntry;
</script>

<article data-entry-id={website.id} class="entry website">
  <a class="entry-image" href={website.direct_url} in:websiteFade aria-hidden="true" tabindex="-1">
    <img
      src={website.image_url_1x}
      srcset="{website.image_url_2x} 2x"
      alt=""
      width={256}
      height={160}
    />
  </a>
  <section class="entry-main">
    <h4 class="entry-title">
      <a href={website.direct_url}>{website.title}</a>
    </h4>

    <div class="website-years">
      {website.start_year} &ndash; {website.end_year || 'present'}
    </div>
    <div class="website-technologies">{website.technologies}</div>

    <div class="entry-desc">
      {@html website.content}
    </div>
  </section>
</article>
