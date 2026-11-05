import type { Page } from '@playwright/test';
import { projects } from './data';
import { expect, waitForPageReady } from './page';

// Return a locator for the archive's search input using its searchbox role
export function getProjectSearchInput(page: Page) {
  return page.getByRole('searchbox');
}

// Return the IDs of the project cards currently in the page, sorted
// alphabetically so tests can compare which projects appear without depending
// on their display order
export async function getRenderedProjectIds(page: Page) {
  return (
    await page
      .locator('.project[data-entry-id]')
      .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-entry-id')))
  ).sort();
}

// Wait for page and search animations to finish, then check that the displayed
// result count matches the cards and uses "project" or "projects" correctly; if
// there are no cards, check that the empty message appears and no categories
// remain
export async function assertProjectResultCount(page: Page) {
  await waitForPageReady(page);
  // The number of project cards in the page after animations have finished
  const total = (await getRenderedProjectIds(page)).length;
  if (total) {
    await expect(page.locator('.project-search-result-count')).toHaveText(
      `Showing ${total} ${total === 1 ? 'project' : 'projects'}`
    );
  } else {
    await expect(page.getByText('No Matching Projects', { exact: true })).toBeVisible();
    await expect(page.locator('.project-category')).toHaveCount(0);
  }
}

// Replace the search input's text, wait for animations, check the result count
// or empty state, and return the matching project IDs in alphabetical order
export async function searchProjects(page: Page, value: string) {
  await getProjectSearchInput(page).fill(value);
  await assertProjectResultCount(page);
  return getRenderedProjectIds(page);
}

// Check that the archive contains every project from the Markdown sources
// exactly once, with no extra cards, and shows the matching result count with
// correct wording
export async function assertCompleteProjectArchive(page: Page) {
  await expect
    .poll(() => getRenderedProjectIds(page))
    .toEqual(projects.map((project) => project.id).sort());
  await assertProjectResultCount(page);
}
