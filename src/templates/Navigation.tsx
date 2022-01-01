import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import navigation from '../data/navigation.json';

export type PageFields = { id: string, contentType: string };
export type PageFrontmatter = { title: string, slug: string, id: string };
export type PageData = { fields: PageFields, frontmatter: PageFrontmatter };
export type PageMap = { [key: string]: PageData };

function Navigation() {

  const { allMdx } = useStaticQuery(query);
  const allPages = allMdx.nodes.filter((node: PageData) => {
    return node.fields.contentType === 'pages';
  });
  const pagesById: PageMap = keyBy(allPages, (page: PageData) => {
    return page.frontmatter.id;
  });

  return (
    <nav id="site-header-nav">
      <ul id="site-header-nav-list">
        {navigation.map((pageId: string) => {
          const { slug, title } = pagesById[pageId].frontmatter;
          return (
            <li key={pageId}><a href={slug}>{title}</a></li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navigation;

const query = graphql`
  query {
    allMdx {
      nodes {
        fields {
          contentType
        }
        frontmatter {
          slug
          id
          title
        }
      }
    }
  }
`;
