import { test as base, expect, type Page, type Locator } from '@playwright/test';

// Collect browser diagnostics for every page, including comparison pages in the same test
export const test = base.extend<{ diagnostics: void }>({
  diagnostics: [
    async ({ context }, use) => {
      // Errors observed during this test only
      const errors: string[] = [];
      context.on('page', (page) => {
        page.on('pageerror', (error) =>
          errors.push(`${page.url()}: ${error.stack ?? error.message}`)
        );
        page.on('console', (message) => {
          if (['warning', 'error'].includes(message.type())) {
            errors.push(`${page.url()} ${message.type()}: ${message.text()}`);
          }
        });
      });
      await use();
      expect(errors, 'Uncaught page errors and console warnings/errors').toEqual([]);
    },
    { auto: true }
  ]
});
export { expect };

// Wait for hydration and for outgoing and incoming content animations to finish naturally
export async function waitForPageReady(page: Page) {
  await expect(page.locator('body[data-page-id]')).toBeAttached();
  await expect(page.locator('.page-content')).toHaveCount(1);
  // Svelte replaces zero-duration delay animations in their finish callbacks; let
  // paint callbacks run before checking so that this gap can't look like completion
  await expect
    .poll(() =>
      page.evaluate(async () => {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
        return document
          .getAnimations()
          .filter((animation) => animation.playState === 'running' || animation.pending).length;
      })
    )
    .toBe(0);
}

// Open a route directly and wait until its controls can be used
export async function openPage(page: Page, route: string) {
  // The document response must succeed even for directly opened nested routes
  const response = await page.goto(route);
  expect(response?.ok()).toBe(true);
  await waitForPageReady(page);
}

// Convert expected HTML using a detached template; never insert source content into the live document
export async function convertHtmlToText(page: Page, html: string) {
  return page.evaluate((markup) => {
    // A detached template keeps expected content inert
    const template = document.createElement('template');
    template.innerHTML = markup;
    return (template.content.textContent ?? '').replace(/\s+/g, ' ').trim();
  }, html);
}

// Compare normalized textContent independently from visibility
export async function assertVisibleContent(page: Page, locator: Locator, html: string) {
  await expect(locator).toBeVisible();
  await expect
    .poll(async () => ((await locator.textContent()) ?? '').replace(/\s+/g, ' ').trim())
    .toBe(await convertHtmlToText(page, html));
}

// Scroll each displayed image into view and report its source and entry when decoding fails
export async function assertImagesLoaded(scope: Locator) {
  // Include decorative images; only controls currently hidden are excluded
  const displayed = scope.locator('img:visible');
  expect(await displayed.count(), 'Expected displayed images').toBeGreaterThan(0);
  for (const image of await displayed.all()) {
    await image.scrollIntoViewIfNeeded();
    // The source and owning entry make failures actionable in CI
    const details = await image.evaluate(
      (node) =>
        `${node.getAttribute('src')} (entry ${node.closest('[data-entry-id]')?.getAttribute('data-entry-id') ?? 'page'})`
    );
    await expect
      .poll(
        () =>
          image.evaluate(
            (node) =>
              (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0
          ),
        details
      )
      .toBe(true);
    await image.evaluate((node) => (node as HTMLImageElement).decode());
  }
}

// Check the built SVG belongs to the source entry as well as decoding successfully
export async function assertEntryIcon(scope: Locator, entryId: string) {
  await assertImagesLoaded(scope);
  // Vite keeps source basenames and adds a content hash to emitted asset filenames
  const filename = await scope.locator('img').evaluate((node) => {
    // The image URL path without its origin or query string
    const pathname = new URL((node as HTMLImageElement).src).pathname;
    return pathname.slice(pathname.lastIndexOf('/') + 1);
  });
  expect(
    filename.startsWith(`${entryId}.`) && filename.endsWith('.svg'),
    `Expected the icon for ${entryId}; received ${filename}`
  ).toBe(true);
}

// Read settled main content and title for comparison across navigation paths
export async function getPageSnapshot(page: Page) {
  await waitForPageReady(page);
  return {
    main: ((await page.locator('main').textContent()) ?? '').replace(/\s+/g, ' ').trim(),
    title: await page.title()
  };
}

// Verify a completed navigation and its current-page marker
export async function assertNavigationDestination(
  page: Page,
  route: string,
  baseline?: Awaited<ReturnType<typeof getPageSnapshot>>
) {
  await expect(page).toHaveURL(route);
  await waitForPageReady(page);
  await expect(page.locator('main')).toBeVisible();
  expect((await getPageSnapshot(page)).main).not.toBe('');
  await expect(page).toHaveTitle(/\S/);
  if (route !== '/') {
    await expect(page.locator('nav [aria-current="page"] a')).toHaveAttribute('href', route);
  }
  if (baseline) {
    await expect.poll(() => getPageSnapshot(page)).toEqual(baseline);
  }
}
