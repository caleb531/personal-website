<script lang="ts">
  import type { ContactLinkEntry } from '../types';
  export let contactLink: ContactLinkEntry;
  export let isCompact = false;
</script>

<article data-entry-id={contactLink.id} class="entry contact-link">
  {#if !isCompact}
    <a class="entry-image" href={contactLink.direct_url} aria-hidden="true" tabindex="-1">
      <img src="/icons/contact-links/{contactLink.id}.svg" alt="" width={64} height={64} />
    </a>
    <section class="entry-main">
      <h3 class="entry-title">
        <a href={contactLink.direct_url}>
          {contactLink.title}
        </a>
      </h3>

      <div class="entry-desc">
        {contactLink.description}
      </div>
    </section>
  {:else}
    <a
      class="entry-image contact-link-image"
      href={contactLink.direct_url}
      title={contactLink.title}
    >
      <img
        src="/icons/contact-links/{contactLink.id}.svg"
        alt={contactLink.title}
        width={40}
        height={40}
        loading="lazy"
      />
    </a>
  {/if}
</article>
