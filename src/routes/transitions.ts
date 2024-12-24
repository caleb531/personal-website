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
export const projectFadeDuration = 350;
export function projectFadeSlide(node: Element, options?: SlideParams): TransitionConfig {
  return fadeSlide(node, {
    duration: projectFadeDuration,
    easing: cubicInOut,
    axis: 'y',
    ...options
  });
}

// Specify the transition parameters for page changes
export const pageFadeDuration = 250;
export function pageFade(node: Element, options?: FadeParams): TransitionConfig {
  return fade(node, { duration: pageFadeDuration, easing: cubicInOut, ...options });
}

// Specify a transition with zero-duration to effectively achieve the effect of
// no transition; this is because Svelte's `transition:` directive cannot be
// conditionally applied
export function noopTransition(node: Element): TransitionConfig {
  return fade(node, { duration: 0 });
}
