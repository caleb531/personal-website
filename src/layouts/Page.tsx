import React from 'react';
import '../styles/index.scss';
import Head from '../templates/Head';
import Header from '../templates/Header';

type Props = { pageContext: { frontmatter: { slug: string, id: string, title: string } }, children: JSX.Element | JSX.Element[] };

function Page({ pageContext: { frontmatter }, children }: Props) {
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
