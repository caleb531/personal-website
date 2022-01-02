import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import navigation from '../data/navigation.json';

type PageFields = { id: string, contentType: string };
type PageFrontmatter = { title: string, slug: string, id: string };
type PageData = { fields: PageFields, frontmatter: PageFrontmatter };
type PageMap = { [key: string]: PageData };

function Navigation() {

  const { allMdx } = useStaticQuery(query);
  const allPages = allMdx.nodes.filter((node: PageData) => {
    return node.fields.contentType === 'pages';
  });
  const pagesById: PageMap = keyBy(allPages, (page: PageData) => {
    return page.fields.id;
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
          id
          contentType
        }
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;
