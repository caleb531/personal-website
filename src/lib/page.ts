import { PagePropsWrapper } from '../components/types';
import site from '../data/site.json';
import { getBaseGravatarUrl } from '../lib/gravatar';
import { getContactLinks } from './entries';

// Define props that should be globally available across all pages
export async function withGlobalStaticProps(pageProps: PagePropsWrapper) {
  return {
    props: {
      contactLinks: getContactLinks(),
      gravatarUrl: getBaseGravatarUrl(site.email),
      ...(pageProps.props)
    }
  };
}
