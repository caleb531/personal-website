// Gravatar utility functions that are available for use in client-side code

// Take an existing gravatar URL and return a gravatar URL that has been resized
// to the given size
export function resizeGravatar(gravatarUrl: string, size: number): string {
  const url = new URL(gravatarUrl);
  url.searchParams.set('size', String(size));
  return url.toString();
}
