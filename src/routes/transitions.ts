import { getContext, setContext } from 'svelte';
import { cubicInOut } from 'svelte/easing';
import type { FadeParams, SlideParams, TransitionConfig } from 'svelte/transition';
import { fade, slide } from 'svelte/transition';

// A type representing a valid Svelte transition function
export type TransitionType = (node: Element) => TransitionConfig;

// A transition which combines the slide and fade transitions provided by Svelte
export function fadeSlide(node: Element, options: SlideParams): TransitionConfig {
  const slideTrans = slide(node, options);
  return {
    ...options,
    css: (t, u) => {
      return `
        ${slideTrans.css ? slideTrans.css(t, u) : ''}
        opacity: ${t};
      `;
    }
  };
}

// Supply the transition parameters for projects (/ and /projects/)
export function projectFadeSlide(node: Element, options?: SlideParams): TransitionConfig {
  return fadeSlide(node, { duration: 350, easing: cubicInOut, axis: 'y', ...options });
}

// Specify the transition parameters for website entries (/websites/)
export function websiteFade(node: Element, options?: FadeParams): TransitionConfig {
  return fade(node, { delay: 125, duration: 250, easing: cubicInOut, ...options });
}

// Specify the transition parameters for page changes
export function pageFade(node: Element, options?: FadeParams): TransitionConfig {
  return fade(node, { duration: 250, easing: cubicInOut, ...options });
}

// Specify a transition with zero-duration to effectively achieve the effect of
// no transition; this is because Svelte's `transition:` directive cannot be
// conditionally applied; note that in conjunction with the use of this noop
// transition function, the animation must also be conditionally disabled with
// CSS to prevent the element from immediately disappearing on DOM removal (see
// the .no-transition class in src/styles/_containers.scss)
export function noopTransition(node: Element): TransitionConfig {
  return fade(node, { duration: 0 });
}

// The options for the project archive to store as context so they can be
// accessible from any descendant component
export type ProjectOptions = { transition: TransitionType };

// The key to use for the context entry that stores the project-wide options
export const PROJECT_WIDE_OPTIONS_KEY = 'projectOptions';

// Persist the project-wide options using context, so the descendants of the
// current component will have access to the options
export function setProjectWideOptions(projectOptions: ProjectOptions) {
  setContext(PROJECT_WIDE_OPTIONS_KEY, projectOptions);
}

// Retrieve the current project-wide options from the context
export function getProjectWideOptions(): ProjectOptions {
  return getContext<ProjectOptions>(PROJECT_WIDE_OPTIONS_KEY);
}
