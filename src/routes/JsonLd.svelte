<script lang="ts">
  import type { WebPage, WebSite } from 'schema-dts';

  interface Props {
    title: string;
    description: string;
    url: string;
    type: 'WebSite' | 'WebPage';
  }

  let { title, description, url, type }: Props = $props();

  let schema: WebSite | WebPage = $derived({
    '@type': type,
    name: title,
    headline: title,
    url: url,
    description: description,
    '@context': 'https://schema.org'
  });
</script>

<!-- Because JSON.stringify() is guaranteed to be safe from HTML injection,
there is no XSS risk -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html '<script type="application/ld+json">' + JSON.stringify(schema, null, 2) + `<${'/'}script>`}
