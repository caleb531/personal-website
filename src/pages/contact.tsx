import React from 'react';
import ContactLinks from '../components/ContactLinks';
import { ContactLinkEntry } from '../components/types';
import { getGlobalStaticProps } from '../lib/api';

type Props = { contactLinks: ContactLinkEntry[] };

function Contact({ contactLinks }: Props) {
  return (
    <div className="page-contact">
      <p>Please note that I'm not accepting new work opportunities at this time.</p>
      <ContactLinks contactLinks={contactLinks} />
    </div>
  );
}

export default Contact;

export async function getStaticProps() {
  return {
    props: {
      ...(await getGlobalStaticProps()).props,
      title: 'Contact',
      description: 'Contact details (including email, Github, and Twitter) for Caleb Evans, coder for Christ'
    }
  };
}
