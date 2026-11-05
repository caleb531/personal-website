import {
  test,
  expect,
  openPage,
  waitForPageReady,
  assertNavigationDestination,
  getPageSnapshot
} from './helpers/page';
import { navigation, routes } from './helpers/data';
import { assertCompleteProjectArchive, searchProjects } from './helpers/archive';
import { projects } from './helpers/data';

// Read destination baselines in a separate page within this test's fresh context
async function baselines(context: import('@playwright/test').BrowserContext) {
  // A comparison page is never shared between tests
  const comparison = await context.newPage();
  // Snapshots keyed by route for this journey only
  const result: Record<string, Awaited<ReturnType<typeof getPageSnapshot>>> = {};
  for (const route of ['/', ...navigation.map((entry) => entry.url)]) {
    await openPage(comparison, route);
    result[route] = await getPageSnapshot(comparison);
  }
  await comparison.close();
  return result;
}

test.describe('Navigation', () => {
  for (const entry of navigation) {
    test(`should navigate to header destination ${entry.url}`, async ({ page }) => {
      await openPage(page, '/');
      await page
        .getByRole('navigation')
        .getByRole('link', { name: entry.title, exact: true })
        .click();
      await assertNavigationDestination(page, entry.url);
    });
  }

  test('should update pages through consecutive client navigations and preserve the document', async ({
    page,
    context
  }) => {
    // Independent direct-load content catches stale titles and outgoing content
    const expected = await baselines(context);
    await openPage(page, '/');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-test-document', 'preserved');
    });
    for (const entry of navigation) {
      await page
        .getByRole('navigation')
        .getByRole('link', { name: entry.title, exact: true })
        .click();
      await assertNavigationDestination(page, entry.url, expected[entry.url]);
      await expect(page.locator('html')).toHaveAttribute('data-test-document', 'preserved');
    }
    await page.locator('a[rel="home"]').click();
    await assertNavigationDestination(page, '/', expected['/']);
    await expect(page.locator('html')).toHaveAttribute('data-test-document', 'preserved');
  });

  test('should return home through the site-title link', async ({ page }) => {
    await openPage(page, '/about/');
    await page.locator('a[rel="home"]').click();
    await assertNavigationDestination(page, '/');
    await expect(page.locator('.home-intro')).toBeVisible();
    await assertCompleteProjectArchive(page);
  });

  test('should support browser Back and Forward', async ({ page, context }) => {
    // Both destinations come from the configured navigation
    const [first, second] = navigation;
    // Direct-load baselines ensure history restores completed page content
    const expected = await baselines(context);
    await openPage(page, first.url);
    await page
      .getByRole('navigation')
      .getByRole('link', { name: second.title, exact: true })
      .click();
    await assertNavigationDestination(page, second.url, expected[second.url]);
    await page.goBack();
    await assertNavigationDestination(page, first.url, expected[first.url]);
    await page.goForward();
    await assertNavigationDestination(page, second.url, expected[second.url]);
  });

  test('should reload a nested page successfully', async ({ page }) => {
    await openPage(page, '/projects/');
    // Reload must also return a successful document response
    const response = await page.reload();
    expect(response?.ok()).toBe(true);
    await waitForPageReady(page);
    await assertCompleteProjectArchive(page);
    expect(await searchProjects(page, projects[0].title)).toContain(projects[0].id);
  });

  test('should open Privacy Policy from the footer', async ({ page }) => {
    await openPage(page, '/projects/');
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
    await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' }).click();
    await expect(page).toHaveURL('/privacy-policy/');
    await waitForPageReady(page);
    await expect(page.locator('.page-content > h2')).toBeInViewport();
    await expect(page.locator('main')).toContainText(/\S/);
  });

  test('should let keyboard users skip to main content', async ({ page }) => {
    await openPage(page, '/projects/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/projects/#page');
    await expect(page.locator('#page')).toBeInViewport();
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const entry of navigation) {
    test(`should open the menu and navigate to ${entry.url}`, async ({ page }) => {
      await openPage(page, '/');
      await page.getByRole('button', { name: 'Toggle Navigation' }).click();
      await expect(page.getByRole('button', { name: 'Toggle Navigation' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      await expect(page.locator('#site-header-nav-list')).toHaveCSS('opacity', '1');
      await page
        .getByRole('navigation')
        .getByRole('link', { name: entry.title, exact: true })
        .click();
      await assertNavigationDestination(page, entry.url);
    });
  }

  test('should close the menu when focus leaves it', async ({ page }) => {
    await openPage(page, '/');
    await page.getByRole('button', { name: 'Toggle Navigation' }).click();
    await expect(page.locator('#site-header-nav-list')).toHaveCSS('opacity', '1');
    await page.locator('a[rel="home"]').focus();
    await expect(page.getByRole('button', { name: 'Toggle Navigation' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    await expect(page.locator('#site-header-nav-list')).toHaveCSS('opacity', '0');
  });

  test('should navigate using the keyboard', async ({ page }) => {
    await openPage(page, '/');
    await page.getByRole('button', { name: 'Toggle Navigation' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#site-header-nav-list')).toHaveCSS('opacity', '1');
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('navigation').getByRole('link', { name: navigation[0].title, exact: true })
    ).toBeFocused();
    await page.keyboard.press('Enter');
    await assertNavigationDestination(page, navigation[0].url);
  });

  for (const route of routes) {
    test(`should render usable mobile page ${route}`, async ({ page }) => {
      await openPage(page, route);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main')).toContainText(/\S/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await expect(page.getByRole('button', { name: 'Toggle Navigation' })).toBeInViewport();
      await page.getByRole('button', { name: 'Toggle Navigation' }).click();
      await expect(page.locator('#site-header-nav-list')).toHaveCSS('opacity', '1');
      if (route === '/' || route === '/projects/') {
        await page.getByRole('searchbox').fill(projects[0].title);
        await expect(page.getByRole('searchbox')).toHaveValue(projects[0].title);
        await page.getByRole('button', { name: 'Clear Search Query' }).click();
        await assertCompleteProjectArchive(page);
      }
    });
  }
});
