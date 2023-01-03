import type { PageServerLoad } from './$types';

export const load = (() => {
  return {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'The privacy policy for apps crafted by Caleb Evans, coder for Christ'
  };
}) satisfies PageServerLoad;
