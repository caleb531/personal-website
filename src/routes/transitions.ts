import { cubicInOut } from 'svelte/easing';
import type { FadeParams, SlideParams, TransitionConfig } from 'svelte/transition';
import { fade, slide } from 'svelte/transition';

// A transition which combines the slide and fade transitions provided by Svelte
export function fadeSlide(node: Element, options: SlideParams): TransitionConfig {
  const slideTrans = slide(node, options);
  return {
    delay: options.delay,
    duration: options.duration,
    easing: options.easing,
    css: (t, u) => `
        ${slideTrans.css ? slideTrans.css(t, u) : ''};
        opacity: ${t};
      `
  };
}

// Supply the transition parameters for projects (/ and /projects/)
export function projectFadeSlide(node: Element, options?: SlideParams): TransitionConfig {
  return fadeSlide(node, { duration: 350, easing: cubicInOut, ...options });
}

// Specify the transition parameters for website entries (/websites/)
export function websiteFade(node: Element, options?: FadeParams): TransitionConfig {
  return fade(node, { duration: 250, easing: cubicInOut, ...options });
}
