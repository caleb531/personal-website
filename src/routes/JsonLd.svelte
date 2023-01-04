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

{@html '<script type="application/ld+json">' + JSON.stringify(schema, null, 2) + '</script>'}
