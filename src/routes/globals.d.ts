// Declare missing global variable for Plausible Analytics
declare const plausible: (eventName: string, eventData?: { props: object }) => void;

// Fixes a "Cannot find module '...' or its corresponding type declarations."
// issue when using vite-imagetools (source:
// <https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026>)
declare module '*&imagetools' {
  const image: string;
  export default image;
}
