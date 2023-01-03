// Fixes a "Cannot find module '...' or its corresponding type declarations."
// issue when using vite-imagetools (source:
// <https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026>)
declare module '*&imagetools' {
  const image: string;
  export default image;
}

// The @beyonk/svelte-google-analytics package is missing TypeScript types
declare module '@beyonk/svelte-google-analytics' {
  export const GoogleAnalytics: SvelteComponent;
}
