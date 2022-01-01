import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import navigation from '../data/navigation.json';

export type PageFrontmatter = { title: string, slug: string, id: string };
export type PageData = { frontmatter: PageFrontmatter };

function Navigation() {

  const data = useStaticQuery(query);
  const pages = data.allMdx.edges
    .map(({ node }: { node: PageData }) => node.frontmatter);

  return (
    <nav id="site-header-nav">
      <ul id="site-header-nav-list">
        {pages.filter((page: PageFrontmatter) => navigation.includes(page.id)).map((page: PageFrontmatter) => {
          return (
            <li key={page.id}><a href={page.slug}>{page.title}</a></li>
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
