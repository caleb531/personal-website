import React from 'react';
import ContactLinks from '../components/ContactLinks';
import { ContactLinkEntry } from '../components/types';
import { withGlobalStaticProps } from '../lib/page';

type Props = { contactLinks: ContactLinkEntry[] };

function Contact({ contactLinks }: Props) {
  return (
    <div className="page-contact">
      <ContactLinks contactLinks={contactLinks} />
    </div>
  );
}

export default Contact;

export async function getStaticProps() {
  return withGlobalStaticProps({
    props: {
      title: 'Contact',
      description:
        'Contact details (including email, Github, and Twitter) for Caleb Evans, coder for Christ'
    }
  });
}
