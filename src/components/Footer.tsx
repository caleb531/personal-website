import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ContactLinks from './ContactLinks';

type Props = { pageSlug: string };

const donateBaseUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations';

function Footer({ pageSlug }: Props) {

  const email = useStaticQuery(query).site.siteMetadata.email;

  return (
    <footer className="site-footer">

      {pageSlug !== '/contact/' ?
        <ContactLinks isCompact />
      : null}

      <div className="site-footer-content">

        <p>&copy; 2013-{new Date().getFullYear()} Caleb Evans | <a href="/privacy-policy/">Privacy Policy</a></p>

        <p>Like what I&apos;ve made? Please <a href={`${donateBaseUrl}&business=${email}`}>donate</a>!</p>

      </div>

    </footer>
  );
}
export default Footer;

const query = graphql`
  query {
    site {
      siteMetadata {
        email
      }
    }
  }
`;

