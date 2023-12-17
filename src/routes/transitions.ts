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
  return fade(node, { delay: 125, duration: 250, easing: cubicInOut, ...options });
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

// Specify the transition parameters for page changes
export function pageFade(node: Element, options?: FadeParams): TransitionConfig {
  return fade(node, { duration: 250, easing: cubicInOut, ...options });
}
