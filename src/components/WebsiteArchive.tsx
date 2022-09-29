import { keyBy } from 'lodash-es';
import React from 'react';
import websiteMetadata from '../data/websites.json';
import { WebsiteEntry, WebsiteMap } from './types';
import useEntryLinkListeners from './useEntryLinkListeners';
import Website from './Website';

type Props = { websites: WebsiteEntry[] };

function WebsiteArchive({ websites }: Props) {
  const websitesById: WebsiteMap = keyBy(websites, 'id');
  // A list of the websites to feature in the archive (this is mostly to
  // dictate the order)
  const websiteNames = websiteMetadata.websites;

  const gaEventListenerProps = useEntryLinkListeners('websites');

  return (
    <div className="entry-list website-list" {...gaEventListenerProps}>
      {websiteNames.map((websiteName) => {
        const website = websitesById[websiteName];
        return <Website key={website.id} website={website} />;
      })}
    </div>
  );
}
export default WebsiteArchive;
