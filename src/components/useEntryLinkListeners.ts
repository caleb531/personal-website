import React from 'react';
import ReactGA from 'react-ga';
import ReactGA4 from 'react-ga4';

// The useEntryLinkListeners() hook provides a single listener to listen for
// all link clicks within a target element, and fires the appropriate GA event
// when that link is clicked
function useEntryLinkListeners(entryType: string) {
  function onClick(event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (target?.closest('a')?.nodeName === 'A') {
      ReactGA.event({
        category: entryType,
        action: 'click',
        label:
          target?.closest('[data-entry-id]')?.getAttribute('data-entry-id') ||
          undefined
      });
      ReactGA4.event({
        category: entryType,
        action: 'click',
        label:
          target?.closest('[data-entry-id]')?.getAttribute('data-entry-id') ||
          undefined
      });
    }
  }
  return { onClick };
}
export default useEntryLinkListeners;
