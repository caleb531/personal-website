import React from 'react';

type Props = { pageContext: { frontmatter: { slug: string, id: string, title: string } }, children: any };

export default function Page({ pageContext: { frontmatter }, children }: Props) {
  return (
    <article id={`page-${frontmatter.id}`}>
      {frontmatter.title ? (
        <h2 id="page-title">{frontmatter.title}</h2>
      ) : null}
      <div id="page-content">{children}</div>
    </article>
  );
}
