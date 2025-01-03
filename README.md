# Personal Website

_Copyright 2013-2025, Caleb Evans_  
_Code released under the MIT license_

This is a [SvelteKit](https://kit.svelte.dev/)-based personal website I created
for myself. The theme is built from SvelteKit's default scaffolding, with all of
the styling migrated from my previous NextJS and Gatsby iterations of the site.

Live Site: https://calebevans.me/

## Setup

### Installing

This project uses [pnpm][pnpm] (instead of npm) for package installation and
management.

[pnpm]: https://pnpm.io/

```bash
npm install -g pnpm
pnpm install
```

### Serving the site

```bash
pnpm dev
```

The site will then be viewable in your browser at http://localhost:5173.

## About this website

### Not the first rewrite.. and probably not the last 😅

This site has gone through a handful of iterations over the years. I built the original site in 2010 using vanilla PHP, which aesthetically looked quite different from the site today.

In 2013, I rewrote the site in Jekyll as part of a larger effort to redesign my website/apps to have a more consistent branding and aesthetic. Many elements of this 2013 site have lived on the various iterations, and can still be seen today —the blue/green color scheme, the projects by category, and the overall page organization.

Since that Jekyll incarnation, I've rewritten the site in Gatsby, then in NextJS, then finally in Svelte+SvelteKit, which is the current iteration of the site. Although I occasionally joke with my web dev friends about anticipating "yet another rewrite of Caleb's personal website", SvelteKit is serving the needs of the site extremely well. More on this in the next section!

### Made with Svelte+SvelteKit ❤️

The latest iteration of the site is statically generated with [Svelte][svelte] and [SvelteKit][sveltekit]. I actually used to server-side render the site—as is the default rendering mode in SvelteKit. However, statically generating the site enables me to use Node packages I might not be able to use otherwise in an SSR context due to performance constraints (for example, parsing Markdown with `gray-matter`). It also allows my site to be more portable—I'm not locked into a particular server runtime.

As a UI library, Svelte also proves to be a fantastic foundation for the site. The animation capabilities provide a versatile mechanism for facilitating page transitions and project search animations.

[svelte]: https://svelte.dev/
[sveltekit]: https://kit.svelte.dev/
