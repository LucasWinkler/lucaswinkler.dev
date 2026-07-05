## Structure

Single-page portfolio. Component tiers: `ui` → `widgets` → `sections` + `common`.
Static assets: `public/`. Optimized images: `src/assets/images` via `astro:assets`.
Content: `src/data/`. Tokens: `src/styles/global.css`.

## Dev

```sh
astro dev --background
astro dev stop | status | logs
```

## Where to look

| Topic               | File                                               |
| ------------------- | -------------------------------------------------- |
| Breakpoints         | `src/lib/breakpoints.ts`, `@theme` in `global.css` |
| Motion timing       | `src/lib/motion.ts`                                |
| Copy, nav, projects | `src/data/`                                        |
| Fonts               | `astro.config.mjs`                                 |
| Header              | `src/components/common/header/`                    |
| Hero                | `src/components/sections/hero/`                    |
| Section shell       | `src/components/sections/Experience.astro`         |
| Work carousel       | `src/components/widgets/MotionWorkList/`           |
| Footer              | `src/components/sections/Footer.astro`             |
