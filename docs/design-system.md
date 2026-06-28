# Design System

Single source of truth for visual consistency across lucaswinkler.dev. Tokens live in `src/styles/global.css` via Tailwind v4 `@theme inline`.

## Token Architecture

Three layers — never skip straight to raw values in components.

```
Primitive  →  Semantic  →  Component preset
(raw OKLCH)   (purpose)     (type-hero, --header-*)
```

| Layer     | Example                       | Use in components?             |
| --------- | ----------------------------- | ------------------------------ |
| Primitive | `--color-neutral-950`         | No — reference only            |
| Semantic  | `--color-text`, `--text-sm`   | Yes — via Tailwind or `var()`  |
| Preset    | `.type-hero`, `.type-caption` | Yes — preferred for typography |

## Styling Layers

Four layers — pick the right one, don't mix unnecessarily.

| Layer            | Where                                  | Use for                                      |
| ---------------- | -------------------------------------- | -------------------------------------------- |
| Tokens + presets | `src/styles/global.css`                | Design tokens, `.type-*`, base styles        |
| Tailwind         | Markup in `.astro` / `.tsx`            | Static layout, spacing, semantic colors      |
| Component CSS    | Co-located `*.css` next to a component | Scroll/state selectors, keyframes            |
| Inline `style`   | React components only                  | Runtime values (`flexGrow`, `scale`, delays) |

No `@apply`. Scroll-driven `calc()` in component CSS (e.g. hero shadow opacity tied to `--hero-progress`) is allowed — those values can't be expressed as static utilities.

Complex components use co-located subfolders: markup in the main file, styles in `*.css`, client logic in `*.ts`.

## Typography

Five sizes only. Do not add arbitrary `text-[…]` or one-off `clamp()` values.

| Token         | Size             | Preset class                                        | When to use                                       |
| ------------- | ---------------- | --------------------------------------------------- | ------------------------------------------------- |
| `--text-sm`   | 13px / 0.8125rem | `.type-caption`, `.type-nav`, `.type-eyebrow-label` | Nav, dates, captions, eyebrows, tech chips, links |
| `--text-base` | 17px / 1.0625rem | _(body default)_                                    | Body copy, long-form text                         |
| `--text-md`   | 16–18px fluid    | `.type-list-title`                                  | Experience row titles (company, school)           |
| `--text-lg`   | 18–26px fluid    | `.type-section-lead`, `.type-card-title`            | Section intros, work card headings                |
| `--text-hero` | 44–72px fluid    | `.type-hero`                                        | Page/section hero headings (h1, h2)               |

### Typography presets

Prefer a preset over composing size + weight + tracking manually.

| Class                 | Role                                               |
| --------------------- | -------------------------------------------------- |
| `.type-hero`          | Section/page hero headings                         |
| `.type-section-lead`  | Intro paragraph under a hero heading               |
| `.type-card-title`    | Work card brand name                               |
| `.type-list-title`    | Experience/education row title                     |
| `.type-eyebrow-label` | Uppercase section label above a heading            |
| `.type-caption`       | Secondary UI text — dates, subtitles, descriptions |
| `.type-nav`           | Header brand + nav links                           |

Low-level font-family helpers (use when a preset doesn't fit):

| Class           | Font features                   |
| --------------- | ------------------------------- |
| `.type-display` | Inter display optical size (32) |
| `.type-ui`      | Inter text optical size (14)    |
| `.type-eyebrow` | Inter text + case feature       |

### Line height & tracking

| Token                | Value    | Paired with            |
| -------------------- | -------- | ---------------------- |
| `--leading-tight`    | 1.02     | hero                   |
| `--leading-snug`     | 1.08     | card titles            |
| `--leading-title`    | 1.2      | list titles            |
| `--leading-ui`       | 1.45     | captions               |
| `--leading-body`     | 1.55     | body, section leads    |
| `--tracking-tighter` | -0.035em | hero                   |
| `--tracking-tight`   | -0.025em | card titles            |
| `--tracking-snug`    | -0.02em  | list titles, nav brand |
| `--tracking-nav`     | -0.01em  | nav links              |
| `--tracking-eyebrow` | 0.14em   | eyebrow labels         |
| `--tracking-chip`    | 0.06em   | tech stack chips       |

## Colors

### Primitives

| Token                 | Role                         |
| --------------------- | ---------------------------- |
| `--color-neutral-950` | Near-black text (light mode) |
| `--color-neutral-900` | Dark mode background         |
| `--color-neutral-800` | Dark mode surface            |
| `--color-neutral-500` | Muted text (light)           |
| `--color-neutral-400` | Muted text (dark)            |
| `--color-neutral-50`  | Warm off-white               |
| `--color-neutral-0`   | Pure white surface           |
| `--color-accent-600`  | Brand green accent           |

### Semantic (use these)

| Token                        | Role                              |
| ---------------------------- | --------------------------------- |
| `--color-bg`                 | Page background                   |
| `--color-surface`            | Cards, panels                     |
| `--color-text`               | Primary text                      |
| `--color-text-muted`         | Secondary text                    |
| `--color-accent`             | Links, focus rings, active states |
| `--color-border`             | Dividers, borders                 |
| `--color-dim`                | De-emphasized elements            |
| `--color-hover-subtle`       | Hover backgrounds                 |
| `--color-hover-muted`        | Lighter hover                     |
| `--color-chip-bg`            | Tag/chip backgrounds              |
| `--color-active-soft`        | Active/selected tint              |
| `--color-hero-text`          | Text on hero imagery              |
| `--color-hero-text-muted`    | Lead text on hero                 |
| `--color-hero-media`         | Hero image placeholder background |
| `--color-hero-image-outline` | Hero image inset outline          |

Dark mode: add `.theme-dark` on a parent — semantic tokens re-map automatically.

## Spacing

| Token                    | Value                        | Use                            |
| ------------------------ | ---------------------------- | ------------------------------ |
| `--space-section-y`      | clamp(4rem, 10vw, 7rem)      | Section vertical padding       |
| `--space-section-header` | clamp(2.5rem, 6vw, 4rem)     | Gap below section intro header |
| `--space-section-gap`    | clamp(2rem, 5vw, 3rem)       | Gap between subsections        |
| `--space-row-y`          | clamp(1.25rem, 3vw, 1.75rem) | Experience list row padding    |
| `--space-hero-bottom`    | clamp(2.5rem, 8vw, 5rem)     | Hero content bottom padding    |
| `--section-padding-x`    | clamp(1.25rem, 4vw, 3rem)    | Horizontal page gutter         |
| `--section-max`          | 72rem                        | Content max-width              |

Usage: `py-(--space-section-y)`, `px-(--section-padding-x)`, `max-w-(--section-max)`.

## Layout & Shape

| Token                 | Value                           |
| --------------------- | ------------------------------- |
| `--radius-panel`      | 1.25rem                         |
| `--radius-hero`       | clamp(1.125rem, 2.4vw, 1.75rem) |
| `--shadow-panel`      | Layered subtle shadow           |
| `--shadow-header-bar` | Sticky header pill shadow       |
| `--z-index-header`    | 50                              |
| `--z-index-overlay`   | 100                             |

## Motion

| Token                   | Value                           |
| ----------------------- | ------------------------------- |
| `--ease-out`            | cubic-bezier(0.23, 1, 0.32, 1)  |
| `--ease-in-out`         | cubic-bezier(0.77, 0, 0.175, 1) |
| `--hero-enter-ease`     | cubic-bezier(0.25, 1, 0.35, 1)  |
| `--hero-enter-duration` | 1520ms                          |
| `--hero-enter-stagger`  | 96ms                            |

Respect `prefers-reduced-motion` — already handled globally in `global.css`.

## Do / Don't

### Do

- Use `.type-*` presets for all text
- Use semantic color tokens (`text-text-muted`, `bg-surface`, `border-border`)
- Use spacing tokens for section layout
- Add new tokens to `@theme inline` before using in components

### Don't

- `text-[0.8125rem]`, `text-[clamp(...)]`, or other arbitrary font sizes
- Raw hex/rgb/oklch in components
- New font sizes outside the 5-size scale — extend an existing token instead
- Duplicate tracking/leading inline when a preset or token exists
- Mix Tailwind default `text-sm` (14px) with `--text-sm` (13px) — always use tokens

## Adding New UI

1. Check if an existing preset covers the need
2. If not, pick the closest size token and lowest-level helper (`.type-ui` + `text-sm`)
3. Only create a new preset if the pattern repeats 3+ times
4. Never introduce a 6th font size without updating this doc and the scale in `global.css`

## File Map

| File                                     | Purpose                                             |
| ---------------------------------------- | --------------------------------------------------- |
| `src/styles/global.css`                  | All tokens + typography presets                     |
| `src/components/common/header/`          | Header markup, `header.css`, `header-sync.ts`       |
| `src/components/sections/hero/`          | Hero markup, `hero.css`, `hero-scroll.ts`           |
| `src/components/widgets/MotionWorkList/` | Work list, panel, constants, Tailwind class strings |
| `docs/design-system.md`                  | This reference                                      |
| `astro.config.mjs`                       | Inter font loading (`--font-inter`)                 |
