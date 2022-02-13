import { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import useGoogleAnalytics from '../components/useGoogleAnalytics';
import '../styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
