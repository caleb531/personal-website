<script lang="ts">
  import { websiteFade } from '../transitions';
  import type { WebsiteEntry } from '../types';
  export let website: WebsiteEntry;
</script>

<article data-entry-id={website.id} class="entry website">
  <a class="entry-image website-image" href={website.direct_url} in:websiteFade>
    <img src="/images/websites/{website.id}.jpg" alt="" width={256} height={160} />
  </a>
  <section class="entry-main website-main">
    <h4 class="entry-title website-title">
      <a href={website.direct_url}>{website.title}</a>
    </h4>

    <div class="website-details">
      <div class="website-years">
        {website.start_year} &ndash; {website.end_year || 'present'}
      </div>
      <div class="website-technologies">{website.technologies}</div>
    </div>

    <div class="website-description-full">
      {@html website.content}
    </div>
  </section>
</article>
