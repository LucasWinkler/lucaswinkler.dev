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

## Cursor Cloud specific instructions

Static Astro (SSG) portfolio, no backend/DB/env vars. Standard scripts live in `package.json` (`dev`, `build`, `check`, `fix`); `pnpm dev` serves on `http://localhost:4321`.

- Node must be **24.x** (`.nvmrc` / engines). The VM's default `node` on `PATH` is v22; `~/.bashrc` is configured to prepend nvm's Node 24 so interactive shells and the update script use it. If `node -v` ever shows v22, run `nvm use` (reads `.nvmrc`) first.
- Package manager is **pnpm 10.33.3** via corepack (the lockfile is pnpm v9.0 format). Running `pnpm` may print an "update available → 11.x" notice; ignore it and stay on 10.33.3 to keep the lockfile stable.
- `pnpm build` runs `astro check` then builds; image optimization (sharp) of the hero image makes the build take ~50s. This is normal, not a hang.
