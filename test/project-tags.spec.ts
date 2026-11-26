import { expect, test } from '@playwright/test';
import { parseEntryDataFromString } from '../src/lib/utilities.server.ts';
import { filterProjects, getProjectTagLabels } from '../src/routes/projects/projectSearch.ts';
import type { ProjectEntry } from '../src/routes/types.ts';

test('should match a configured tag label from YAML frontmatter', () => {
  // A test entry keeps the tag unassigned in the production catalog
  const tagged = {
    id: 'tagged-fixture',
    ...parseEntryDataFromString(
      'tagged-fixture.md',
      [
        '---',
        'title: Sample Project',
        'direct_url: https://example.com',
        'description: A project for testing',
        'category: tools',
        'tags: [built-with-codex]',
        '---'
      ].join('\n')
    )
  } as ProjectEntry;

  // A second entry has the same searchable fields except for its tags
  const untagged = { ...tagged, id: 'untagged-fixture', tags: undefined };

  expect(getProjectTagLabels(tagged)).toEqual(['Built with Codex']);
  expect(getProjectTagLabels(untagged)).toEqual([]);
  expect(filterProjects([untagged, tagged], 'built with code')).toEqual([tagged]);
});
