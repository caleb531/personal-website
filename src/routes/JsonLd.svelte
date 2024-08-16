<script lang="ts">
  import type { WebPage, WebSite } from 'schema-dts';

  export let title: string;
  export let description: string;
  export let url: string;
  export let type: 'WebSite' | 'WebPage';

  let schema: WebSite | WebPage;
  $: schema = {
    '@type': type,
    name: title,
    headline: title,
    url: url,
    description: description,
    '@context': 'https://schema.org'
  };
</script>

<!-- Because JSON.stringify() is guaranteed to be safe from HTML injection,
there is no XSS risk -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html '<script type="application/ld+json">' + JSON.stringify(schema, null, 2) + `<${'/'}script>`}
