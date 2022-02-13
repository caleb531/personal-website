import { useRouter } from 'next/router';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import PageHead from './PageHead';
import { ContactLinkEntry } from './types';

type Props = { title: string, gravatarUrl: string, contactLinks: ContactLinkEntry[], children: JSX.Element | JSX.Element[] };

function Layout({ title, gravatarUrl, contactLinks, children }: Props) {
  const router = useRouter();
  return (
    <main>
      <PageHead
        pageTitle={title}
        pagePath={router.pathname}
        gravatarUrl={gravatarUrl}
      />
      <Header gravatarUrl={gravatarUrl} />
      <article className="page">
        {title ? <h2 className="page-title">{title}</h2> : null}
        {children}
      </article>
      <Footer contactLinks={contactLinks} pagePath={router.pathname} />
    </main>
  );
}

export default Layout;
