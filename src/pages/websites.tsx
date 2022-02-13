import React from 'react';
import { WebsiteEntry } from '../components/types';
import WebsiteArchive from '../components/WebsiteArchive';
import { getWebsiteEntries } from '../lib/entries';
import { withGlobalStaticProps } from '../lib/page';

type Props = { websites: WebsiteEntry[] };

function Websites({ websites }: Props) {
  return (
    <div className="page-websites">
      <p>This is a collection of websites I've developed in my spare time including one-pager web apps, Python programs, and JavaScript libraries.</p>
      <WebsiteArchive websites={websites} />
    </div>
  );
}

export async function getStaticProps() {
  return withGlobalStaticProps({
    props: {
      title: 'Websites',
      description: 'Professional websites built by Caleb Evans, coder for Christ',
      websites: getWebsiteEntries()
    }
  });
}

export default Websites;
