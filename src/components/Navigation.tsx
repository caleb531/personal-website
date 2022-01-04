import { graphql, Link, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import navigation from '../data/navigation.json';
import { PageMap } from './types';

function Navigation() {

  const { allMdx } = useStaticQuery(query);
  const pagesById: PageMap = keyBy(allMdx.nodes, 'fields.name');

  return (
    <nav id="site-header-nav">
      <ul id="site-header-nav-list">
        {navigation.map((pageId: string) => {
          const { slug, title } = pagesById[pageId].frontmatter;
          return (
            <li key={pageId}><Link to={slug}>{title}</Link></li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navigation;

const query = graphql`
  query {
    allMdx(filter: { fields: { collection: { eq: "pages" } } }) {
      nodes {
        fields {
          name
          collection
        }
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;
