import React from 'react';
import Header from './Header';

type Props = { children: JSX.Element | JSX.Element[] };

function Layout({ children }: Props) {
  return (
    <main>
      <Header />
      <article className="page">
        {children}
      </article>
    </main>
  );
}

export default Layout;
