import classNames from 'classnames';
import React from 'react';
import SvgIcon from './SvgIcon';
import { ContactLinkEntry } from './types';

type Props = { contactLink: ContactLinkEntry, isCompact?: boolean }

function ContactLink({ contactLink, isCompact = false }: Props) {
  return (
    <article className={classNames(
      'entry',
      'contact-link',
      { 'entry-compact': isCompact },
      { 'contact-link-compact': isCompact }
    )}>
      {!isCompact ?
        <>
          <div className="entry-image contact-link-image">
            <a
              href={contactLink.direct_url}
              aria-labelledby={`contact-link-${contactLink.id}`}>
              <SvgIcon content={contactLink.iconContents} />
            </a>
          </div>

          <div className="entry-main contact-link-main">

            <h3 className="entry-title contact-link-title">
              <a
                href={contactLink.direct_url}
                id={`contact-link-${contactLink.id}`}>
                { contactLink.title}
              </a>
            </h3>

            <div className="entry-desc contact-link-desc">
              {contactLink.description}
            </div>

          </div>
        </> : <>
          <div className="entry-image contact-link-image">
            <a
              href={contactLink.direct_url}
              aria-label={contactLink.title}>
              <SvgIcon content={contactLink.iconContents} />
            </a>
          </div>
        </>}
    </article>
  );
}
export default ContactLink;
