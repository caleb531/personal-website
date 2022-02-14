import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
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
              <Image
                src={`/icons/contact-links/${contactLink.id}.svg`}
                alt=""
                width={64}
                height={64}
                priority={true} />
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
              <Image
                src={`/icons/contact-links/${contactLink.id}.svg`}
                alt=""
                width={40}
                height={40} />
            </a>
          </div>
        </>}
    </article>
  );
}
export default ContactLink;
