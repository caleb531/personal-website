// Fixes a "Cannot find module '...' or its corresponding type declarations."
// issue when using vite-imagetools (source:
// <https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026>)
declare module '*&imagetools' {
  const image: string;
  export default image;
}

// The @beyonk/svelte-google-analytics package is missing TypeScript types
// (source:
// <https://github.com/beyonk-adventures/svelte-google-analytics/issues/14#issuecomment-1100511233>)
declare module '@beyonk/svelte-google-analytics' {
	import { SvelteComponentTyped } from 'svelte';
  export class GoogleAnalytics extends SvelteComponentTyped<{ properties: string[] }> {}
  export const ga = {
    addEvent(event: string, data: object): void
    // repeat if needed for `all`, `ecommerce`, `retail`, `travel`, `games`, `setUserProperties` ...
    // refer to `svelte-google-analytics/src/generated-functions.js` after `npm run build`
    // but first install `@beyonk/async-script-loader` dependency to avoid build failure
  };
}
