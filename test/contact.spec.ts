import { test, expect, openPage, assertVisibleContent, assertEntryIcon } from './helpers/page';
import { contacts, site } from './helpers/data';

test.describe('Contact page and footer', () => {
  test('should render every configured contact method in order', async ({ page }) => {
    await openPage(page, '/contact/');
    expect(
      await page
        .locator('main .contact-link')
        .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-entry-id')))
    ).toEqual(contacts.map((contact) => contact.id));
    for (const contact of contacts) {
      // Scope to main because compact footer entries share these IDs
      const card = page.locator(`main [data-entry-id="${contact.id}"]`);
      await expect(card.locator('.entry-title')).toHaveText(contact.title);
      await assertVisibleContent(page, card.locator('.entry-desc'), contact.description);
      await expect(card.locator('.entry-title a')).toHaveAttribute('href', contact.direct_url);
      await expect(card.locator('.entry-image')).toHaveAttribute('href', contact.direct_url);
      await assertEntryIcon(card, contact.id);
    }
  });

  test('should render configured mailto destinations correctly', async ({ page }) => {
    await openPage(page, '/contact/');
    for (const contact of contacts.filter((entry) => entry.direct_url.startsWith('mailto:'))) {
      await expect(
        page.locator(`main [data-entry-id="${contact.id}"] .entry-title a`)
      ).toHaveAttribute('href', contact.direct_url);
      expect(new URL(contact.direct_url).pathname).not.toBe('');
    }
  });

  test('should render configured footer contacts as text in order', async ({ page }) => {
    await openPage(page, '/');
    expect(
      await page
        .locator('footer [data-entry-id]')
        .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-entry-id')))
    ).toEqual(contacts.map((contact) => contact.id));
    for (const contact of contacts) {
      // Each compact link exposes its visible title
      const link = page
        .getByRole('contentinfo')
        .getByRole('link', { name: contact.title, exact: true });
      await expect(link).toHaveAttribute('href', contact.direct_url);
      await expect(link).toHaveText(contact.title);
      await expect(link.locator('img, svg')).toHaveCount(0);
    }
  });

  test('should provide policy and donation links', async ({ page }) => {
    await openPage(page, '/');
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' })
    ).toHaveAttribute('href', '/privacy-policy/');
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'donate', exact: true })
    ).toHaveAttribute('href', site.paypalDonateUrl);
  });
});
