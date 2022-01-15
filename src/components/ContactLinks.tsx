import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import { ContactLinksQuery } from '../../graphql-types';
import contactLinkMetadata from '../data/contact-links.json';
import ContactLink from './ContactLink';
import { ContactLinkMap } from './types';

type Props = { isCompact?: boolean };

function ContactLinks({ isCompact = false }: Props) {

  const queryResults: ContactLinksQuery = useStaticQuery(query);
  const { allMarkdownRemark } = queryResults;
  const contactLinksById: ContactLinkMap = keyBy(allMarkdownRemark.nodes, 'fields.name');
  // A list of the contactLinks to feature in the archive (this is mostly to
  // dictate the order)
  const contactLinkIds = contactLinkMetadata.contactLinks;

  return (
    <div className={`entry-list contact-link-list ${isCompact ? 'entry-list-compact contact-link-list-compact' : ''}`}>
      {contactLinkIds.map((contactLinkId) => {
        const contactLink = contactLinksById[contactLinkId];
        return (
          <ContactLink
            key={contactLink.fields.name}
            contactLink={contactLink}
            isCompact={isCompact} />
        );
      })}
    </div>
  );
}
export default ContactLinks;

export const query = graphql`
  query ContactLinks {
    allMarkdownRemark(filter: { fields: { collection: { eq: "contact-links" } } }) {
      nodes {
        fields {
          name
          collection
        }
        frontmatter {
          title
          direct_url
          description
        }
        icon {
          fields {
            svgContents
          }
        }
      }
    }
  }
`;
