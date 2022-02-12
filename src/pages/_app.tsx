import { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import '../styles/index.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
