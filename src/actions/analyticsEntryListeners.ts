// The analyticsEntryListeners() hook provides a single listener to listen for
// all link clicks within a target element, and fires the appropriate Plausible
// Analytics event when that link is clicked
export function analyticsEntryListeners(node: HTMLElement, eventName: string) {
  if (!(import.meta.env.PROD && typeof plausible !== 'undefined')) {
    return;
  }
  function onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target?.closest('a')?.nodeName === 'A') {
      const entryId = target?.closest('[data-entry-id]')?.getAttribute('data-entry-id');
      plausible(eventName, { props: { entryId } });
    }
  }

  node.addEventListener('click', onClick);

  return {
    destroy: () => {
      node.removeEventListener('click', onClick);
    }
  };
}
