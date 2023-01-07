import { quintInOut } from 'svelte/easing';
import type { SlideParams, TransitionConfig } from 'svelte/transition';
import { slide } from 'svelte/transition';

// A transition which combines the slide and fade transitions provided by Svelte
export function fadeSlide(node: HTMLElement, options: SlideParams): TransitionConfig {
  const slideTrans = slide(node, options);
  return {
    duration: options.duration,
    css: (t, u) => `
        ${slideTrans.css ? slideTrans.css(t, u) : ''};
        opacity: ${t};
      `
  };
}

// Supply the transition parameters for projects
export function projectFadeSlide(node: HTMLElement): TransitionConfig {
  return fadeSlide(node, { duration: 100, easing: quintInOut });
}
