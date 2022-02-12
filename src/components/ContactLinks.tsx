import classNames from 'classnames';
import { keyBy } from 'lodash-es';
import React from 'react';
import contactLinkMetadata from '../data/contact-links.json';
import ContactLink from './ContactLink';
import { ContactLinkEntry, ContactLinkMap } from './types';

type Props = { contactLinks: ContactLinkEntry[], isCompact?: boolean };

function ContactLinks({ contactLinks, isCompact = false }: Props) {

  const contactLinksByName: ContactLinkMap = keyBy(contactLinks, 'id');

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
            key={contactLink.id}
            contactLink={contactLink}
            isCompact={isCompact} />
        );
      })}
    </div>
  );
}
export default ContactLinks;
