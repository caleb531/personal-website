import assert from 'node:assert/strict';
import { websites } from './helpers/data';
import { assertImagesLoaded, assertVisibleContent, expect, openPage, test } from './helpers/page';

test.describe('Websites', () => {
  test('should render every configured website exactly once and in order', async ({ page }) => {
    await openPage(page, '/websites/');
    expect(
      await page
        .locator('.website[data-entry-id]')
        .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-entry-id')))
    ).toEqual(websites.map((website) => website.id));
  });

  test('should render source content for every website', async ({ page }) => {
    await openPage(page, '/websites/');
    for (const website of websites) {
      // Each configured entry supplies all editable content expectations
      const card = page.locator(`.website[data-entry-id="${website.id}"]`);
      await expect(card.locator('.entry-title')).toHaveText(website.title);
      await expect(card.locator('.entry-title a')).toHaveAttribute('href', website.direct_url);
      await expect(card.locator('.entry-image')).toHaveAttribute('href', website.direct_url);
      await expect(card.locator('.website-years')).toHaveText(
        `${website.start_year} – ${website.end_year || 'present'}`
      );
      await expect(card.locator('.website-technologies')).toHaveText(website.technologies);
      await assertVisibleContent(page, card.locator('.entry-content'), website.content ?? '');
    }
  });

  test.describe('High-resolution thumbnails', () => {
    test.use({ deviceScaleFactor: 2 });
    test('should load high-resolution thumbnails', async ({ page }) => {
      test.setTimeout(60_000);
      await openPage(page, '/websites/');
      await expect(page.locator('.website img')).toHaveCount(websites.length);
      await assertImagesLoaded(page.locator('.website-list'));
      for (const image of await page.locator('.website img').all()) {
        // The declared 2x URL is authoritative; do not reproduce image URL generation
        const candidate = (await image.getAttribute('srcset'))?.match(/^(\S+) 2x$/)?.[1];
        assert.ok(candidate, 'Expected a website thumbnail with a declared 2x candidate');
        await expect
          .poll(() => image.evaluate((node) => (node as HTMLImageElement).currentSrc))
          .toBe(new URL(candidate, page.url()).href);
      }
    });
  });
});
