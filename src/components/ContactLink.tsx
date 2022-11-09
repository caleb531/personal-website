import classNames from 'classnames';
import Image from 'next/future/image';
import { ContactLinkEntry } from './types';

type Props = { contactLink: ContactLinkEntry; isCompact?: boolean };

function ContactLink({ contactLink, isCompact = false }: Props) {
  return (
    <article
      data-entry-id={contactLink.id}
      className={classNames(
        'entry',
        'contact-link',
        { 'entry-compact': isCompact },
        { 'contact-link-compact': isCompact }
      )}
    >
      {!isCompact ? (
        <>
          <a
            className="entry-image contact-link-image"
            href={contactLink.direct_url}
            aria-labelledby={`contact-link-${contactLink.id}`}
          >
            <Image
              src={`/icons/contact-links/${contactLink.id}.svg`}
              alt=""
              width={64}
              height={64}
              priority={true}
            />
          </a>

          <div className="entry-main contact-link-main">
            <h3 className="entry-title contact-link-title">
              <a
                href={contactLink.direct_url}
                id={`contact-link-${contactLink.id}`}
              >
                {contactLink.title}
              </a>
            </h3>

            <div className="entry-desc contact-link-desc">
              {contactLink.description}
            </div>
          </div>
        </>
      ) : (
        <>
          <a
            className="entry-image contact-link-image"
            href={contactLink.direct_url}
            aria-label={contactLink.title}
            title={contactLink.title}
          >
            <Image
              src={`/icons/contact-links/${contactLink.id}.svg`}
              alt=""
              width={40}
              height={40}
            />
          </a>
        </>
      )}
    </article>
  );
}
export default ContactLink;
