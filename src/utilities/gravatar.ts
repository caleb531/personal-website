import { toUrl } from 'gatsby-source-gravatar';

// A utility function which returns a Gravatar URL for the given email and at
// the given pixel size
export function getGravatarUrl(email: string, size: number): string {
  return toUrl(email, `?size=${size}`);
}
