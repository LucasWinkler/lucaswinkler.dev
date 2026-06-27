## Project structure

Single-page portfolio. Put new code in the folder that matches its role:

| Path | Purpose |
| --- | --- |
| `public/fonts`, `public/images` | Static assets copied as-is (no build processing) |
| `src/assets/images` | Images optimized via `astro:assets` |
| `src/components/ui` | Primitives — Button, Badge, Card shell |
| `src/components/widgets` | Composed blocks reused inside sections — ProjectCard, SocialLinks |
| `src/components/sections` | Full scroll sections on the homepage — Hero, About, Contact |
| `src/components/common` | Site chrome — Header, Footer, Nav, SEO |
| `src/data` | Typed site content — bio, links, projects list, nav anchors |
| `src/layouts` | Page shells — BaseLayout |
| `src/lib` | Shared helpers and utilities |
| `src/pages` | Routes. This site is one page: `index.astro` |
| `src/styles` | Global CSS and design tokens |
| `src/types` | Shared TypeScript types |

## Project structure

Single-page portfolio. Put new code in the folder that matches its role:

| Path | Purpose |
| --- | --- |
| `public/fonts`, `public/images` | Static assets copied as-is (no build processing) |
| `src/assets/images` | Images optimized via `astro:assets` |
| `src/components/ui` | Primitives — Button, Badge, Card shell |
| `src/components/widgets` | Composed blocks reused inside sections — ProjectCard, SocialLinks |
| `src/components/sections` | Full scroll sections on the homepage — Hero, About, Contact |
| `src/components/common` | Site chrome — Header, Footer, Nav, SEO |
| `src/data` | Typed site content — bio, links, projects list, nav anchors |
| `src/layouts` | Page shells — BaseLayout |
| `src/lib` | Shared helpers and utilities |
| `src/pages` | Routes. This site is one page: `index.astro` |
| `src/styles` | Global CSS and design tokens |
| `src/types` | Shared TypeScript types |

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
