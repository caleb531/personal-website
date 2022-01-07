import { graphql, useStaticQuery } from 'gatsby';
import { keyBy } from 'lodash-es';
import React from 'react';
import contactLinkMetadata from '../data/contact-links.json';
import { ContactLinkMap } from './types';

type Props = { compact: boolean };

function ContactLinks({ compact }: Props) {

  const { allMarkdownRemark } = useStaticQuery(query);
  const contactLinksById: ContactLinkMap = keyBy(allMarkdownRemark.nodes, 'fields.name');
  // A list of the contactLinks to feature in the archive (this is mostly to
  // dictate the order)
  const contactLinkIds = contactLinkMetadata.contactLinks;

  return (
    <div className={`entry-list contact-link-list ${compact ? 'entry-list-compact contact-link-list-compact' : ''}`}>
      {contactLinkIds.map((contactLinkId) => {
        const contactLink = contactLinksById[contactLinkId];
        return (
          <article className="entry contact-link" key={contactLinkId}>
            <div className="entry-image contact-link-image">
              <a
                href={contactLink.frontmatter.direct_url}
                aria-labelledby={`contact-link-${contactLink.fields.name}`}
                dangerouslySetInnerHTML={{ __html: contactLink.icon.fields.svgContents }} />
            </div>

            <div className="entry-main contact-link-main">

              <h3 className="entry-title contact-link-title">
                <a
                  href={contactLink.frontmatter.direct_url}
                  id={`contact-link-${contactLink.fields.name}`}>
                  { contactLink.frontmatter.title}
                </a>
              </h3>

              <div className="entry-desc contact-link-desc">
                {contactLink.frontmatter.description}
              </div>

            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ContactLinks;

const query = graphql`
  query {
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
