// Fixes a "Cannot find module '...' or its corresponding type declarations."
// issue when using vite-imagetools (source:
// <https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026>)
declare module '*&imagetools' {
  const image: string;
  export default image;
}

interface Window {
  // Define type for GoatCounter global object
  goatcounter?: {
    count: (options: object) => void;
  };
}
