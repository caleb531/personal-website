import assert from 'node:assert/strict';
import {
  test,
  expect,
  openPage,
  assertVisibleContent,
  assertImagesLoaded,
  assertEntryIcon,
  convertHtmlToText,
  waitForPageReady,
  assertNavigationDestination
} from './helpers/page';
import { projects, columns, navigation } from './helpers/data';
import {
  getProjectSearchInput,
  getRenderedProjectIds,
  searchProjects,
  assertProjectResultCount,
  assertCompleteProjectArchive
} from './helpers/archive';

for (const route of ['/', '/projects/']) {
  test.describe(`${route} project archive`, () => {
    test.beforeEach(async ({ page }) => {
      await openPage(page, route);
    });

    test('should render every project exactly once', async ({ page }) => {
      await assertCompleteProjectArchive(page);
    });

    test('should render every project’s text, destination, and icon', async ({ page }) => {
      test.setTimeout(60_000);
      for (const project of projects) {
        // Entry IDs distinguish cards whose editable titles happen to match
        const card = page.locator(`.project[data-entry-id="${project.id}"]`);
        await expect(card.locator('.entry-title')).toHaveText(project.title);
        if (project.description) {
          await assertVisibleContent(page, card.locator('.entry-desc'), project.description);
        }
        await expect(card.locator('.entry-title a')).toHaveAttribute('href', project.direct_url);
        await expect(card.locator('.entry-image')).toHaveAttribute('href', project.direct_url);
        await assertEntryIcon(card, project.id);
      }
    });

    test('should render projects under their configured categories', async ({ page }) => {
      // Only categories with source projects should have a heading
      const populated = columns
        .flat()
        .filter((category) => projects.some((project) => project.category === category.id));
      await expect(page.locator('.project-category')).toHaveCount(populated.length);
      for (const category of populated) {
        // Match categories through their rendered heading rather than relying on their position
        const group = page
          .locator('.project-category')
          .filter({ has: page.getByRole('heading', { name: category.title, exact: true }) });
        await expect(group).toHaveCount(1);
        expect(
          (
            await group
              .locator('[data-entry-id]')
              .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-entry-id')))
          ).sort()
        ).toEqual(
          projects
            .filter((project) => project.category === category.id)
            .map((project) => project.id)
            .sort()
        );
      }
    });

    test('should respect configured category and featured-project ordering', async ({ page }) => {
      for (const [index, column] of columns.entries()) {
        // The configured column and populated categories determine heading order
        const renderedColumn = page.locator('.project-category-column').nth(index);
        // Ignore categories with no entries, as the application does
        const populated = column.filter((category) =>
          projects.some((project) => project.category === category.id)
        );
        await expect(renderedColumn.locator('h3')).toHaveText(
          populated.map((category) => category.title)
        );
        for (const category of populated) {
          // Read the actual order and check only promotion/demotion constraints
          const group = renderedColumn
            .locator('.project-category')
            .filter({ has: page.getByRole('heading', { name: category.title, exact: true }) });
          // IDs preserve ordering here, unlike the completeness helper
          const actual = await group
            .locator('[data-entry-id]')
            .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-entry-id')));
          // Only configured projects belonging to this category impose a constraint
          const top = (category.topProjects ?? []).filter((id) =>
            projects.some((project) => project.id === id && project.category === category.id)
          );
          // Demoted entries must form the configured suffix
          const bottom = (category.bottomProjects ?? []).filter((id) =>
            projects.some((project) => project.id === id && project.category === category.id)
          );
          expect(actual.slice(0, top.length)).toEqual(top);
          if (bottom.length) {
            expect(actual.slice(-bottom.length)).toEqual(bottom);
          }
        }
      }
    });

    // Current source-derived examples shared as immutable values within each test
    test('should find projects by title', async ({ page }) => {
      // The first source entry supplies a deterministic title without requiring uniqueness
      const project = projects[0];
      expect(await searchProjects(page, project.title)).toContain(project.id);
    });

    test('should search without regard to capitalization', async ({ page }) => {
      // Use a title containing letters so the alternate query changes case
      const title = projects.find((project) => /[a-z]/i.test(project.title))?.title;
      assert.ok(title, 'Expected a source project title containing a letter');
      // Swap case without assuming the original capitalization
      const alternate = [...title]
        .map((letter) =>
          letter === letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase()
        )
        .join('');
      // Compare results from the same source query
      const original = await searchProjects(page, title);
      expect(original.length).toBeGreaterThan(0);
      expect(await searchProjects(page, alternate)).toEqual(original);
    });

    test('should ignore surrounding whitespace', async ({ page }) => {
      // A source title provides a successful query
      const title = projects[0].title;
      // Save the original IDs before adding spaces
      const original = await searchProjects(page, title);
      expect(await searchProjects(page, `  ${title}  `)).toEqual(original);
    });

    test('should find projects by description', async ({ page }) => {
      // Pick a rendered description word rather than searching Markdown markup
      const project = projects.find((entry) => entry.description);
      assert.ok(project, 'Expected a source project with a non-empty description');
      // Use a whole word with enough letters to exercise text matching
      const word = (await convertHtmlToText(page, project.description)).match(
        /[\p{L}\p{N}]{3,}/u
      )?.[0];
      assert.ok(word, `Expected a searchable description word for project: ${project.id}`);
      expect(await searchProjects(page, word)).toContain(project.id);
    });

    test('should find projects by category name', async ({ page }) => {
      // Select the first populated configured category, allowing matches from other fields too
      const category = columns
        .flat()
        .find((entry) => projects.some((project) => project.category === entry.id));
      assert.ok(category, 'Expected a configured category with source projects');
      // Results need to include every member without assuming an exclusive match
      const result = await searchProjects(page, category.title);
      for (const project of projects.filter((entry) => entry.category === category.id)) {
        expect(result).toContain(project.id);
      }
    });

    test('should match partial words', async ({ page }) => {
      // Find a title word that can be shortened without relying on a specific title
      const project = projects.find((entry) => /[\p{L}\p{N}]{4,}/u.test(entry.title));
      assert.ok(project, 'Expected a project title with a word of at least four characters');
      // The full title word from which to build a partial-word query
      const word = project.title.match(/[\p{L}\p{N}]{4,}/u)?.[0];
      assert.ok(word, `Expected a title word to shorten for project: ${project.id}`);
      // Remove the final character to test a partial word
      const partial = word.slice(0, -1);
      expect(await searchProjects(page, partial)).toContain(project.id);
    });

    // Return a token absent from all authored searchable fields
    async function unmatched(page: import('@playwright/test').Page) {
      // Normalize HTML before checking the token against source text
      const bank = (
        await convertHtmlToText(
          page,
          projects.map((project) => `${project.title} ${project.description}`).join(' ') +
            columns
              .flat()
              .map((category) => category.title)
              .join(' ')
        )
      ).toLowerCase();
      // Extend the deterministic token if an author has used it in content
      let token = 'zzunmatchedqueryzz';
      while (bank.includes(token)) {
        token += 'z';
      }
      return token;
    }

    test('should require every search word to match', async ({ page }) => {
      expect((await searchProjects(page, projects[0].title)).length).toBeGreaterThan(0);
      expect(await searchProjects(page, `${projects[0].title} ${await unmatched(page)}`)).toEqual(
        []
      );
    });

    test('should show the empty state for an unmatched query', async ({ page }) => {
      expect(await searchProjects(page, await unmatched(page))).toEqual([]);
      await expect(page.locator('.project-category h3')).toHaveCount(0);
    });

    test('should restore all projects for whitespace-only input', async ({ page }) => {
      await searchProjects(page, await unmatched(page));
      await searchProjects(page, '   ');
      await assertCompleteProjectArchive(page);
    });

    test('should clear search with the clear button', async ({ page }) => {
      await searchProjects(page, projects[0].title);
      // The clear control image is only displayed when there is a query
      const clear = page.getByRole('button', { name: 'Clear Search Query' });
      await assertImagesLoaded(clear);
      await clear.click();
      await expect(getProjectSearchInput(page)).toHaveValue('');
      await assertCompleteProjectArchive(page);
      await expect(clear).toBeHidden();
      await expect(getProjectSearchInput(page)).toBeFocused();
    });

    test('should clear search using the keyboard', async ({ page }) => {
      await searchProjects(page, projects[0].title);
      await page.getByRole('button', { name: 'Clear Search Query' }).focus();
      await page.keyboard.press('Enter');
      await expect(getProjectSearchInput(page)).toHaveValue('');
      await assertCompleteProjectArchive(page);
    });

    test('should keep search on the page when Enter is pressed', async ({ page }) => {
      // Keep the actual filtered IDs to detect accidental form navigation or resetting
      const filtered = await searchProjects(page, projects[0].title);
      await getProjectSearchInput(page).press('Enter');
      await waitForPageReady(page);
      await expect(page).toHaveURL(route);
      await expect(getProjectSearchInput(page)).toHaveValue(projects[0].title);
      expect(await getRenderedProjectIds(page)).toEqual(filtered);
    });

    test('should settle on the latest query during rapid changes', async ({ page, context }) => {
      // A separate page provides expected results without duplicating the filtering algorithm
      const comparison = await context.newPage();
      await openPage(comparison, route);
      // The final query comes from a different source entry when available
      const final = projects.at(-1)?.title;
      assert.ok(final, 'Expected a source project title for the final search query');
      // Save independently observed final results
      const expected = await searchProjects(comparison, final);
      await getProjectSearchInput(page).fill(projects[0].title);
      await getProjectSearchInput(page).fill('');
      await getProjectSearchInput(page).fill(final);
      await expect.poll(() => getRenderedProjectIds(page)).toEqual(expected);
      await assertProjectResultCount(page);
      await comparison.close();
    });

    test('should reset search after leaving and returning', async ({ page }) => {
      await searchProjects(page, projects[0].title);
      // Pick a normal header link outside either archive route
      const away = navigation.find((entry) => entry.url !== '/projects/');
      assert.ok(away, 'Expected a header destination outside the project archive');
      await page
        .getByRole('navigation')
        .getByRole('link', { name: away.title, exact: true })
        .click();
      await assertNavigationDestination(page, away.url);
      if (route === '/') {
        await page.locator('a[rel="home"]').click();
      } else {
        await page.locator(`nav a[href="${route}"]`).click();
      }
      await assertNavigationDestination(page, route);
      await expect(getProjectSearchInput(page)).toHaveValue('');
      await assertCompleteProjectArchive(page);
    });
  });
}
