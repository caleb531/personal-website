import React from 'react';
import Head from '../components/Head';
import Header from '../components/Header';
import '../styles/index.scss';

type Props = { pageContext: { frontmatter: { slug: string, id: string, title: string } }, children: JSX.Element | JSX.Element[] };

function Page({ pageContext: { frontmatter }, children }: Props) {
  // In development mode, Gatsby will inject its own 404 page without any
  // frontmatter, so we can simply return that page in that scenario
  if (!frontmatter) {
    return children;
  }
  return (
    <>
      <Head pageTitle={frontmatter.title} />
      <Header />
      <main>
        <article id="page" data-slug={frontmatter.slug}>
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
export default Page;
