import crypto from 'crypto';

// Generate a base Gravatar URL (without URL parameters) from the given email
// address; this allows us to pre-compute the Gravatar URL at build time, then
// generate the various sizes on-the-fly when rendering
export function getBaseGravatarUrl(email: string): string {
  const normalizedEmail = String(email).trim().toLowerCase();
  const hash = crypto.createHash('md5').update(normalizedEmail).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}`;
}

// Take an existing gravatar URL and return a gravatar URL that has been
// resized to the given size
export function resizeGravatar(gravatarUrl: string, size: number): string {
  const url = new URL(gravatarUrl);
  url.searchParams.set('size', String(size));
  return url.toString();
}
