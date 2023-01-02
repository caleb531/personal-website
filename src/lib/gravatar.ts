import crypto from 'crypto';

// Generate a base Gravatar URL (without URL parameters) from the given email
// address; this allows us to pre-compute the Gravatar URL at build time, then
// generate the various sizes on-the-fly when rendering
export function getBaseGravatarUrl(email: string): string {
  const normalizedEmail = String(email).trim().toLowerCase();
  const hash = crypto
    .createHash('md5')
    .update(normalizedEmail.trim().toLowerCase())
    .digest('hex');
  return `https://www.gravatar.com/avatar/${hash}`;
}
