import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { FooterQuery } from '../../graphql-types';
import ContactLinks from './ContactLinks';

type Props = { pageSlug: string };

const donateBaseUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations';

function Footer({ pageSlug }: Props) {

  const queryResults: FooterQuery = useStaticQuery(query);
  const { siteEmail } = queryResults.site.siteMetadata;

  return (
    <footer className="site-footer">

      {pageSlug !== '/contact/' ?
        <ContactLinks isCompact />
      : null}

      <div className="site-footer-content">

        <p>&copy; 2013-{new Date().getFullYear()} Caleb Evans | <a href="/privacy-policy/">Privacy Policy</a></p>

        <p>Like what I&apos;ve made? Please <a href={`${donateBaseUrl}&business=${siteEmail}`}>donate</a>!</p>

      </div>

    </footer>
  );
}
export default Footer;

export const query = graphql`
  query Footer {
    site {
      siteMetadata {
        siteEmail
      }
    }
  }
`;

