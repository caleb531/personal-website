import classNames from 'classnames';
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
  const contactLinksByName: ContactLinkMap = keyBy(allMarkdownRemark.nodes, 'fields.name');

  return (
    <div className={classNames(
      'entry-list',
      'contact-link-list',
      { 'entry-list-compact': isCompact },
      { 'contact-link-list-compact': isCompact }
    )}>
      {contactLinkMetadata.contactLinks.map((contactLinkName) => {
        const contactLink = contactLinksByName[contactLinkName];
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
