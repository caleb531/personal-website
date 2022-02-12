// TODO: refactor this to compute MD5 hash on-the-fly
const BASE_GRAVATAR_URL = 'https://www.gravatar.com/avatar/952d736a582fdfdb7d7a9a5e7588bf3e?size=120';

// A utility function which returns a Gravatar URL for the given email and at
// the given pixel size
export function getGravatarUrl(email: string, size: number): string {
  return `${BASE_GRAVATAR_URL}?size=${size}`;
}
