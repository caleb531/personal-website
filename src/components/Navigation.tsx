import { graphql, Link, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React, { useState } from 'react';
import { NavigationQuery } from '../../graphql-types';
import navigation from '../data/navigation.json';

function Navigation() {

  const queryResults: NavigationQuery = useStaticQuery(query);
  const { allMdx } = queryResults;
  const pagesById = keyBy(allMdx.nodes, 'fields.name');
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className={`site-header-nav ${isNavOpen ? `site-header-nav-open` : ''}`}>
      <button className="site-header-nav-toggle" aria-label="Menu" onClick={() => setIsNavOpen(!isNavOpen)}>
        <img src="/icons/nav-toggle.svg" alt="Toggle Navigation" />
      </button>
      <ul className="site-header-nav-list">
        {navigation.map((pageId: string) => {
          const { slug, title } = pagesById[pageId].frontmatter;
          return (
            <li key={pageId}>
              <Link to={slug} onClick={() => setIsNavOpen(false)}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navigation;

export const query = graphql`
  query Navigation {
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
