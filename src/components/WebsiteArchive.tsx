import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { keyBy } from 'lodash-es';
import React from 'react';
import websiteMetadata from '../data/websites.json';
import { WebsiteMap } from './types';

function WebsiteArchive() {

  const { allMarkdownRemark } = useStaticQuery(query);
  const websitesById: WebsiteMap = keyBy(allMarkdownRemark.nodes, 'fields.name');
  // A list of the websites to feature in the archive (this is mostly to
  // dictate the order)
  const websiteIds = websiteMetadata.websites;

  return (
    <div className="entry-list website-list">
      {websiteIds.map((websiteId) => {
        const website = websitesById[websiteId];
        const websiteImage = getImage(website.image);
        return (
          <article className="entry website" key={websiteId}>
            <div className="entry-image website-image">
              <a href={website.frontmatter.direct_url}>
                <GatsbyImage image={websiteImage} alt="" />
              </a>
            </div>
            <div className="entry-main website-main">

              <h4 className="entry-title website-title">
                <a href={website.frontmatter.direct_url}>
                  {website.frontmatter.title}
                </a>
              </h4>

              <div className="website-details">
                <div className="website-years">{website.frontmatter.start_year} &ndash; {website.frontmatter.end_year || 'present'}</div>
                <div className="website-technologies">{website.frontmatter.technologies}</div>
              </div>

            </div>
          </article>
        );
      })}
    </div>
  );
}
export default WebsiteArchive;

const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { collection: { eq: "websites" } } }) {
      nodes {
        fields {
          name
          collection
        }
        frontmatter {
          title
          direct_url
          technologies
          start_year
          end_year
        }
        image {
          childImageSharp {
            gatsbyImageData(
              width: 256
              formats: [JPG]
            )
          }
        }
      }
    }
  }
`;
