import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import navigation from '../data/navigation.json';

export type PageFrontmatter = { title: string, slug: string, id: string };
export type PageData = { frontmatter: PageFrontmatter };
export type PageMap = { [key: string]: PageData };

function Navigation() {

  const { allMdx } = useStaticQuery(query);
  const allPages: PageData[] = allMdx.edges.map((edge: { node: PageData }) => {
    return edge.node;
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
      edges {
        node {
          frontmatter {
            slug
            id
            title
          }
        }
      }
    }
  }
`;
