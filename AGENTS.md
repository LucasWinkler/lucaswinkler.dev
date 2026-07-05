## Project structure

Single-page portfolio. Put new code in the folder that matches its role:

| Path                            | Purpose                                |
| ------------------------------- | -------------------------------------- |
| `public/fonts`, `public/images` | Static assets (no build processing)    |
| `src/assets/images`             | Images via `astro:assets`              |
| `src/components/ui`             | Primitives — Button, Badge, Card shell |
| `src/components/widgets`        | Composed blocks reused in sections     |
| `src/components/sections`       | Homepage scroll sections               |
| `src/components/common`         | Header, Footer, Nav, SEO               |
| `src/data`                      | Typed site content                     |
| `src/layouts`                   | Page shells — `BaseLayout`             |
| `src/lib`                       | Shared helpers                         |
| `src/pages`                     | Routes — one page: `index.astro`       |
| `src/styles`                    | Global CSS and design tokens           |
| `src/types`                     | Shared TypeScript types                |

## Development

```sh
astro dev --background
```

Manage with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Glossary

Look up the source — don't guess conventions.

| Topic                                               | Where                                               |
| --------------------------------------------------- | --------------------------------------------------- |
| Design tokens, typography presets, global utilities | `src/styles/global.css`                             |
| Breakpoints (`sm`, `md`, `work`, `lg`)              | `src/lib/breakpoints.ts` + `@theme` in `global.css` |
| React scroll-reveal timing                          | `src/lib/motion.ts`                                 |
| Site copy, nav, projects                            | `src/data/`                                         |
| Fonts                                               | `astro.config.mjs`                                  |
| Header (sticky morph, dropdown)                     | `src/components/common/header/`                     |
| Hero panel + enter animation                        | `src/components/sections/hero/`                     |
| Standard section shell                              | `src/components/sections/Experience.astro`          |
| Full-bleed work carousel                            | `src/components/widgets/MotionWorkList/`            |
| Footer layout                                       | `src/components/sections/footer.css`                |

[Astro docs](https://docs.astro.build)
