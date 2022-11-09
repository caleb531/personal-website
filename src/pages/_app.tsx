import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { LayoutProps } from '../components/types';
import useGoogleAnalytics from '../components/useGoogleAnalytics';
import '../styles/index.scss';

function App({ Component, pageProps }: AppProps<LayoutProps>) {
  useGoogleAnalytics();
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
