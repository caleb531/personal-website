import { cubicInOut } from 'svelte/easing';
import type { SlideParams, TransitionConfig } from 'svelte/transition';
import { fade, slide } from 'svelte/transition';

// A transition which combines the slide and fade transitions provided by Svelte
export function fadeSlide(node: HTMLElement, options: SlideParams): TransitionConfig {
  const slideTrans = slide(node, options);
  return {
    duration: options.duration,
    easing: options.easing,
    css: (t, u) => `
        ${slideTrans.css ? slideTrans.css(t, u) : ''};
        opacity: ${t};
      `
  };
}

// Supply the transition parameters for projects (/ and /projects/)
export function projectFadeSlide(node: HTMLElement): TransitionConfig {
  return fadeSlide(node, { duration: 250, easing: cubicInOut });
}

// Specify the transition parameters for website entries (/websites/)
export function websiteFade(node: HTMLElement): TransitionConfig {
  return fade(node, { duration: 250, easing: cubicInOut });
}
