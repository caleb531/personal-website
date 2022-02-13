import { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import useGoogleAnalytics from '../components/useGoogleAnalytics';
import '../styles/index.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
