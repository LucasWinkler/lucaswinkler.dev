# lucaswinkler.dev

Personal portfolio rebuild — Astro, React, TypeScript, Tailwind CSS v4, and Motion.

## Setup

```sh
pnpm install
```

Requires Node.js 24.x (see `package.json` engines).

## Development

```sh
pnpm dev
```

Runs the dev server at `http://localhost:4321`.

For Cursor background mode:

```sh
astro dev --background
```

## Build

```sh
pnpm build
```

Runs `astro check` and outputs a static site to `dist/`.

## Preview

```sh
pnpm preview
```

Serves the production build locally.

## Quality checks

```sh
pnpm check
```

Runs Astro type checking, ESLint, and Prettier.

```sh
pnpm fix
```

Auto-fixes lint and format issues.

## Deployment

Pushes to the default branch deploy via Vercel (`pnpm run build`, output `dist/`). See `vercel.json` for project settings.

## Project layout

See [AGENTS.md](./AGENTS.md) for folder conventions and contributor guidance.
