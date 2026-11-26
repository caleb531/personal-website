import { test, expect, openPage, assertImagesLoaded } from './helpers/page';
import { routes } from './helpers/data';

for (const route of routes) {
  test.describe(`${route} page`, () => {
    test('should render when opened directly', async ({ page }) => {
      await openPage(page, route);
      await expect(page).toHaveTitle(/\S/);
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
    });

    test('should render meaningful page content', async ({ page }) => {
      await openPage(page, route);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Caleb Evans');
      // The first main heading is the hero or the interior page title
      const heading = page.getByRole('main').getByRole('heading', { level: 2 }).first();
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/\S/);
      // Read visible content beyond the page heading without changing the document
      expect(
        await page.locator('.page-content > :not(h2)').evaluateAll((nodes) =>
          nodes
            .map((node) => (node as HTMLElement).innerText)
            .join(' ')
            .trim()
        )
      ).toMatch(/\S/);
      await expect(page.locator('.page-content > :not(h2)').first()).toBeVisible();
    });

    // The text-only About and Privacy Policy routes have no page images
    if (route !== '/about/' && route !== '/privacy-policy/') {
      test('should load all displayed images', async ({ page }) => {
        test.setTimeout(60_000);
        await openPage(page, route);
        await assertImagesLoaded(page.locator('body'));
      });
    }
  });
}

test.describe('Homepage', () => {
  test('should render its introduction', async ({ page }) => {
    await openPage(page, '/');
    await expect(page.locator('.home-intro p')).toBeVisible();
    await expect(page.locator('.home-intro p')).toHaveText(/\S/);
    await assertImagesLoaded(page.locator('.home-intro'));
  });
});
