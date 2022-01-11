import React from 'react';
import Footer from '../components/Footer';
import Head from '../components/Head';
import Header from '../components/Header';
import '../styles/index.scss';

type Props = {
  pageContext: {
    frontmatter: {
      slug: string,
      id: string,
      title: string
    }
  },
  children: JSX.Element | JSX.Element[]
};

function Page({ pageContext: { frontmatter }, children }: Props) {
  // In development mode, Gatsby will inject its own 404 page without any
  // frontmatter, so we can simply return that page in that scenario
  if (!frontmatter) {
    return children;
  }
  return (
    <>
      <Head pageTitle={frontmatter.title} pageSlug={frontmatter.slug} />
      <Header />
      <main>
        <article className="page" data-slug={frontmatter.slug}>
          {frontmatter.title ? (
            <h2 className="page-title">{frontmatter.title}</h2>
          ) : null}
          <div className="page-content">{children}</div>
        </article>
      </main>
      <Footer pageSlug={frontmatter.slug} />
    </>
  );
}
export default Page;
