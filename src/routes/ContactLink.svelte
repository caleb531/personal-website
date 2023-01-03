<script lang="ts">
  import type { ContactLinkEntry } from '../components/types.d';
  export let contactLink: ContactLinkEntry;
  export let isCompact = false;
</script>

<article
  data-entry-id={contactLink.id}
  class="entry contact-link"
  class:entry-compact={isCompact}
  class:contact-link-compact={isCompact}
>
  {#if !isCompact}
    <a
      class="entry-image contact-link-image"
      href={contactLink.direct_url}
      aria-labelledby={`contact-link-${contactLink.id}`}
    >
      <img src={`/icons/contact-links/${contactLink.id}.svg`} alt="" width={64} height={64} />
    </a>
    <div class="entry-main contact-link-main">
      <h3 class="entry-title contact-link-title">
        <a href={contactLink.direct_url} id={`contact-link-${contactLink.id}`}>
          {contactLink.title}
        </a>
      </h3>

      <div class="entry-desc contact-link-desc">
        {contactLink.description}
      </div>
    </div>
  {:else}
    <a
      class="entry-image contact-link-image"
      href={contactLink.direct_url}
      title={contactLink.title}
    >
      <img
        src={`/icons/contact-links/${contactLink.id}.svg`}
        alt={contactLink.title}
        width={40}
        height={40}
      />
    </a>
  {/if}
</article>
