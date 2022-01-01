import React from 'react';
import '../styles/index.scss';
import Header from './Header';

type Props = { pageContext: { frontmatter: { slug: string, id: string, title: string } }, children: JSX.Element | JSX.Element[] };

export default function Page({ pageContext: { frontmatter }, children }: Props) {
  return (
    <>
      <Header />
      <main>
        <article id={`page-${frontmatter.id}`}>
          {frontmatter.title ? (
            <h2 id="page-title">{frontmatter.title}</h2>
          ) : null}
          <div id="page-content">{children}</div>
        </article>
      </main>
      {/* <Footer /> */}
    </>
  );
}
