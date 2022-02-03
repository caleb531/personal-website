import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import { WebsiteArchiveQuery } from '../../graphql-types';
import websiteMetadata from '../data/websites.json';
import { WebsiteMap } from './types';
import Website from './Website';

function WebsiteArchive() {

  const queryResults: WebsiteArchiveQuery = useStaticQuery(query);
  const { allMarkdownRemark } = queryResults;
  const websitesByName: WebsiteMap = keyBy(allMarkdownRemark.nodes, 'fields.name');
  // A list of the websites to feature in the archive (this is mostly to
  // dictate the order)
  const websiteNames = websiteMetadata.websites;

  return (
    <div className="entry-list website-list allow-animations">
      {websiteNames.map((websiteName) => {
        const website = websitesByName[websiteName];
        return (
          <Website
            key={website.fields.name}
            website={website} />
        );
      })}
    </div>
  );
}
export default WebsiteArchive;

export const query = graphql`
  query WebsiteArchive {
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
