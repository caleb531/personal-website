import { graphql } from 'gatsby';
import React from 'react';

export default function Page({ data }: { data: any }) {
  const { markdownRemark: { frontmatter, html } } = data;
  return (
    <article className={`page-${frontmatter.id}`}>
      {frontmatter.title ? (
        <h2 className="page-title">{frontmatter.title}</h2>
      ) : null}
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        id
        title
        slug
        description
      }
    }
  }`;
