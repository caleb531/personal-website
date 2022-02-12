import { useRouter } from 'next/router';
import React from 'react';
import Header from './Header';
import PageHead from './PageHead';

type Props = { title: string, children: JSX.Element | JSX.Element[] };

function Layout({ title, children }: Props) {
  const router = useRouter();
  return (
    <main>
      <PageHead pageTitle={title} pagePath={router.pathname} />
      <Header />
      <article className="page">
        {title ? <h2 className="page-title">{title}</h2> : null}
        {children}
      </article>
    </main>
  );
}

export default Layout;
