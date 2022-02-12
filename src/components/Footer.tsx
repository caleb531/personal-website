import React from 'react';
import site from '../data/site.json';
import ContactLinks from './ContactLinks';
import { ContactLinkEntry } from './types';

type Props = { contactLinks: ContactLinkEntry[], pagePath: string };

const donateBaseUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations';

function Footer({ contactLinks, pagePath }: Props) {

  return (
    <footer className="site-footer">

      {pagePath !== '/contact/' ?
        <ContactLinks contactLinks={contactLinks} isCompact />
      : null}

      <div className="site-footer-content">

        <p>&copy; 2013-{new Date().getFullYear()} Caleb Evans | <a href="/privacy-policy/">Privacy Policy</a></p>

        <p>Like what I&apos;ve made? Please <a href={`${donateBaseUrl}&business=${site.email}`}>donate</a>!</p>

      </div>

    </footer>
  );
}
export default Footer;
