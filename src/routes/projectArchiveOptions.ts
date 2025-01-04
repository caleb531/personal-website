import { getContext, setContext } from 'svelte';
import type { TransitionType } from './transitions';

// The options for the project archive to store as context so they can be
// accessible from any descendant component
export type ProjectOptions = { transition: TransitionType };

// The key to use for the context entry that stores the project-wide options
export const PROJECT_ARCHIVE_OPTIONS_KEY = 'projectOptions';

// Persist the project archive options using context, so the descendants of the
// current component will have access to the options
export function setProjectArchiveOptions(projectOptions: ProjectOptions) {
  setContext(PROJECT_ARCHIVE_OPTIONS_KEY, projectOptions);
}
// Retrieve the current project archive options from the context
export function getProjectArchiveOptions(): ProjectOptions {
  return getContext<ProjectOptions>(PROJECT_ARCHIVE_OPTIONS_KEY);
}
