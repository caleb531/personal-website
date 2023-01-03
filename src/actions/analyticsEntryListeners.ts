import { ga } from '@beyonk/svelte-google-analytics';

// Because Google Analytics uses the native navigator.sendBeacon API to fire
// events, our custom entry click event doesn't fire until a few seconds after
// the user interaction took place, and by that point, the user has left the
// page and we can't send the event; therefore, we must disable the Beacon API
// in the user's browser for this page (see
// <https://support.google.com/analytics/answer/9322688?hl=en#batching>)
function disableBeaconApi() {
  if (navigator.sendBeacon) {
    try {
      // @ts-expect-error See comment above
      navigator.sendBeacon = null;
    } catch (error) {
      // noop
    }
  }
}

// The analyticsEntryListeners() hook provides a single listener to listen for
// all link clicks within a target element, and fires the appropriate GA event
// when that link is clicked
export function analyticsEntryListeners(node: HTMLElement, entryType: string) {
  if (!import.meta.env.PROD) {
    return;
  }
  disableBeaconApi();
  function onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target?.closest('a')?.nodeName === 'A') {
      ga.addEvent('click', {
        event_category: entryType,
        event_action: 'click',
        event_label: target?.closest('[data-entry-id]')?.getAttribute('data-entry-id') || undefined
      });
    }
  }

  node.addEventListener('click', onClick);

  return {
    destroy: () => {
      node.removeEventListener('click', onClick);
    }
  };
}
