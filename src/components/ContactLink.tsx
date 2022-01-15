import React from 'react';
import SvgIcon from './SvgIcon';
import { ContactLinkData } from './types';

type Props = { contactLink: ContactLinkData, isCompact?: boolean }

function ContactLink({ contactLink, isCompact = false }: Props) {
  return (
    <article className="entry contact-link">
      {!isCompact ?
        <>
          <div className="entry-image contact-link-image">
            <a
              href={contactLink.frontmatter.direct_url}
              aria-labelledby={`contact-link-${contactLink.fields.name}`}>
              <SvgIcon content={contactLink.icon.fields.svgContents} />
            </a>
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
        </> : <>
          <div className="entry-image contact-link-image">
            <a
              href={contactLink.frontmatter.direct_url}
              aria-label={contactLink.frontmatter.title}>
              <SvgIcon content={contactLink.icon.fields.svgContents} />
            </a>
          </div>
        </>}
    </article>
  );
}
export default ContactLink;
