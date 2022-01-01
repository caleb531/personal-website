import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import navigation from '../data/navigation.json';

export type PageFrontmatter = { title: string, slug: string, id: string };
export type PageData = { frontmatter: PageFrontmatter };

function Header() {

  const data = useStaticQuery(query);
  const pages = data.allMdx.edges
    .map(({ node }: { node: PageData }) => node.frontmatter);

  return (
    <header id="site-header">
      <a href="/" id="site-title-link" rel="home">
        <img src="" alt="" srcSet="{{ site.email | gravatar_url: retina_header_image_size }} 2x" width="{{ site.data.gravatar.header_image_size }}" height="{{ site.data.gravatar.header_image_size }}" id="site-header-image" />
      </a>
      <nav id="site-header-nav">
        <ul id="site-header-nav-list">
          {pages.filter((page: PageFrontmatter) => navigation.includes(page.id)).map((page: PageFrontmatter) => {
            return (
              <li key={page.id}><a href={page.slug}>{page.title}</a></li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
export default Header;

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
