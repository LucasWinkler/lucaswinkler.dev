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

No `@apply`. State-driven `calc()` in component CSS is allowed when those values can't be expressed as static utilities.

Complex components use co-located subfolders: markup in the main file, styles in `*.css`, client logic in `*.ts`. Astro scoped `<style>` blocks are fine for small, component-local rules (e.g. `ContactCta.astro`).

## Fonts

Loaded in `astro.config.mjs`:

| Font              | CSS variable               | Use                                        |
| ----------------- | -------------------------- | ------------------------------------------ |
| Inter (variable)  | `--font-inter`             | All UI and display text                    |
| Libre Baskerville | `--font-libre-baskerville` | Hero headline accent (`.type-hero-accent`) |

Mapped in `@theme inline` as `--font-inter-text`, `--font-inter-display`, and `--font-hero-accent`.

## Responsive design

**Mobile-first.** Base styles target the smallest viewport. Layer enhancements upward with `min-width` queries — not desktop defaults with max-width overrides.

### Breakpoints

Shared values live in `src/lib/breakpoints.ts`. Use these — don't introduce one-off pixel breakpoints.

| Key    | Value    | Typical use                    |
| ------ | -------- | ------------------------------ |
| `xs`   | 30rem    | Footer layout shifts           |
| `sm`   | 40rem    | Header, hero layout            |
| `md`   | 48rem    | Hero two-column, work carousel |
| `work` | 56.25rem | Work list panel sizing         |
| `lg`   | 64rem    | Work panel logo size           |

### Prefer min over max

Default to **min-width** (`width >= …`) in CSS, Tailwind, and JS:

| Layer         | Preferred                                 | Avoid when possible             |
| ------------- | ----------------------------------------- | ------------------------------- |
| Component CSS | `@media (width >= 40rem) { … }`           | `@media (width < 40rem)`        |
| Tailwind      | `sm:*`, `md:*` (min-width variants)       | `max-sm:*`, `max-[640px]:*`     |
| TS / JS       | `minWidth('sm')` from `@/lib/breakpoints` | ad-hoc `(max-width: …)` strings |

Min-width matches mobile-first cascade: base rules apply everywhere; larger viewports add or override.

### When max-width is fine

Use max-width only when min-width would fight the default or duplicate large-screen rules:

- **Compound queries** — narrow viewport bands, e.g. `@media (width < 40rem) and (min-height: 36rem)` in hero layout
- **Feature toggles in JS** — `matchMedia('(width < …)')` to disable desktop-only behavior on small screens

When both approaches work, choose min-width.

## Typography

Six sizes on the scale. Do not add arbitrary `text-[…]` or one-off `clamp()` values in components.

| Token                  | Size             | Preset class                                        | When to use                                       |
| ---------------------- | ---------------- | --------------------------------------------------- | ------------------------------------------------- |
| `--text-sm`            | 13px / 0.8125rem | `.type-caption`, `.type-nav`, `.type-eyebrow-label` | Nav, dates, captions, eyebrows, tech chips, links |
| `--text-base`          | 17px / 1.0625rem | _(body default)_                                    | Body copy, long-form text                         |
| `--text-md`            | 16–18px fluid    | `.type-list-title`                                  | Experience row titles (company, school)           |
| `--text-lg`            | 18–26px fluid    | `.type-section-lead`, `.type-card-title`            | Section intros, work card headings                |
| `--text-hero`          | 40–72px fluid    | `.type-hero`                                        | Page hero heading (h1)                            |
| `--text-section-title` | 44–80px fluid    | `.type-section-title`                               | Section headings (h2)                             |

### Typography presets

Prefer a preset over composing size + weight + tracking manually.

| Class                 | Role                                               |
| --------------------- | -------------------------------------------------- |
| `.type-hero`          | Page hero h1                                       |
| `.type-section-title` | Section h2 headings                                |
| `.type-hero-accent`   | Italic accent word inside a hero headline          |
| `.type-section-lead`  | Intro paragraph under a section heading            |
| `.type-card-title`    | Work card brand name                               |
| `.type-list-title`    | Experience/education row title                     |
| `.type-eyebrow-label` | Uppercase section label above content              |
| `.type-caption`       | Secondary UI text — dates, subtitles, descriptions |
| `.type-nav`           | Header brand + nav links                           |

Low-level font-family helpers (use when a preset doesn't fit):

| Class           | Font features                   |
| --------------- | ------------------------------- |
| `.type-display` | Inter display optical size (32) |
| `.type-ui`      | Inter text optical size (14)    |

The 404 display numeral uses `.type-display` plus a one-off size in `error-hero.css` — not part of the scale.

### Line height & tracking

| Token                | Value    | Paired with            |
| -------------------- | -------- | ---------------------- |
| `--leading-tight`    | 1.02     | hero, section titles   |
| `--leading-snug`     | 1.08     | card titles            |
| `--leading-title`    | 1.2      | list titles            |
| `--leading-ui`       | 1.45     | captions               |
| `--leading-body`     | 1.55     | body, section leads    |
| `--leading-relaxed`  | 1.625    | hero intro (mobile)    |
| `--tracking-tighter` | -0.035em | hero, section titles   |
| `--tracking-tight`   | -0.025em | card titles            |
| `--tracking-snug`    | -0.02em  | list titles, nav brand |
| `--tracking-nav`     | -0.01em  | nav links              |
| `--tracking-eyebrow` | 0.14em   | eyebrow labels         |
| `--tracking-chip`    | 0.06em   | tech stack chips       |

## Colors

### Primitives

| Token                 | Role               |
| --------------------- | ------------------ |
| `--color-neutral-950` | Near-black text    |
| `--color-neutral-500` | Muted text         |
| `--color-neutral-50`  | Warm off-white     |
| `--color-neutral-0`   | Pure white surface |

### Semantic (use these)

| Token                            | Role                                        |
| -------------------------------- | ------------------------------------------- |
| `--color-bg`                     | Page background                             |
| `--color-surface`                | Cards, panels                               |
| `--color-text`                   | Primary text                                |
| `--color-text-muted`             | Secondary text                              |
| `--color-border`                 | Dividers, borders                           |
| `--color-focus-ring`             | Focus outline (light surfaces)              |
| `--color-focus-ring-inverse`     | Focus outline (dark surfaces)               |
| `--color-selection-bg`           | Text selection (light surfaces)             |
| `--color-selection-text`         | Selected text (light surfaces)              |
| `--color-selection-bg-inverse`   | Text selection (dark surfaces)              |
| `--color-selection-text-inverse` | Selected text (dark surfaces)               |
| `--color-hero-text`              | Text on hero imagery                        |
| `--color-hero-text-muted`        | Lead text on hero                           |
| `--color-hero-media`             | Hero image background (#000, matches asset) |
| `--color-hero-image-outline`     | Hero image inset outline                    |

## Spacing

| Token                    | Value                         | Use                             |
| ------------------------ | ----------------------------- | ------------------------------- |
| `--space-section-y`      | clamp(4rem, 10vw, 7rem)       | Section vertical padding        |
| `--space-section-header` | clamp(2.5rem, 6vw, 4rem)      | Gap below section intro header  |
| `--space-section-gap`    | clamp(2rem, 5vw, 3rem)        | Gap between subsections         |
| `--space-row-y`          | clamp(1.25rem, 3vw, 1.75rem)  | Experience list row padding     |
| `--hero-content-inset`   | aliases `--section-padding-x` | Hero/error-hero content gutters |
| `--section-padding-x`    | clamp(1.25rem, 4vw, 3rem)     | Horizontal page gutter          |
| `--section-max`          | 72rem                         | Content max-width               |

`--space-hero-bottom` defaults to `--hero-content-inset` in `global.css` but is overridden locally in `hero.css` (smaller on mobile, scales up at `md+`). Don't treat the global default as the hero padding value.

Section vertical spacing: `py-(--space-section-y)`, `pt-(--space-section-header)`, etc.

## Page layout

Content width uses a **two-layer** pattern. Do not use Tailwind's built-in `container` — it uses breakpoint widths, not our tokens, and collapses padding + max-width into one box.

### Standard section

```astro
<section class='py-(--space-section-y) px-(--section-padding-x)' aria-labelledby='…'>
  <div class='section-inner'>
    <!-- constrained content -->
  </div>
</section>
```

| Layer | Class / token                                               | Role                                                      |
| ----- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Outer | `px-(--section-padding-x)` on `<section>`, `<footer>`, etc. | Full-width shell + horizontal gutters                     |
| Inner | `.section-inner`                                            | Centers content and caps width at `--section-max` (72rem) |

`.section-inner` is defined in `src/styles/global.css`:

```css
@utility section-inner {
  margin-inline: auto;
  width: 100%;
  max-width: var(--section-max);
}
```

Compose extra layout on the inner wrapper when needed, e.g. `class='section-inner flex flex-col gap-6'`.

### Hero / full-bleed panels

Hero and error hero use a full-bleed panel (background/media edge-to-edge) with padding on the content layer instead of the section:

- Outer panel: no horizontal padding — media fills the viewport
- Content layer: `padding-inline: var(--hero-content-inset)` in co-located `*.css`
- Inner column: `.section-inner` for the max-width cap

See `src/components/sections/hero/hero.css` and `src/components/sections/error-hero/error-hero.css`.

### Header

Header shells use `padding-inline: var(--section-padding-x)` in `header.css`. The sticky/hero bar caps at `--header-bar-max` (same as `--section-max`).

### Full-bleed inside a section

When one block needs to break out of the content column while the section keeps normal gutters:

1. Keep `px-(--section-padding-x)` on the outer `<section>`.
2. Put standard content in `.section-inner`.
3. Apply breakout on mobile by default; reset at a min-width breakpoint:

```html
<!-- mobile-first: breakout by default, contained from md up -->
<div
  class="w-screen [margin-inline:calc(50%-50vw)] [scroll-padding-inline:var(--section-padding-x)] md:w-full md:[margin-inline:0] md:[scroll-padding-inline:0]">
  <div class="ms-(--section-padding-x) md:ms-0">…first item…</div>
  …
  <div class="me-(--section-padding-x) md:me-0">…last item…</div>
</div>
```

Reference implementation: `src/components/widgets/MotionWorkList/styles.ts` (`listClass`, `panelInsetClass`, `panelEndInsetClass`).

Rules of thumb:

- **Gutters** → `--section-padding-x` on the outer semantic element (or `--hero-content-inset` in hero panels)
- **Max width** → `.section-inner` on the inner wrapper
- **Full bleed** → break out with `w-screen` + `margin-inline: calc(50% - 50vw)` on mobile; reset with `md:` (or equivalent min-width)
- **Never** duplicate `mx-auto w-full max-w-(--section-max)` — use `.section-inner`

## Layout & Shape

| Token                 | Value                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `--radius-panel`      | `calc(--space-work-panel-inset + --radius-work-logo-target)` (~1.875rem); inset shrinks on mobile via `work-list.css` |
| `--radius-hero`       | clamp(1.125rem, 2.4vw, 1.75rem)                                                                                       |
| `--shadow-panel`      | Layered subtle shadow                                                                                                 |
| `--shadow-header-bar` | Sticky header pill shadow                                                                                             |
| `--z-index-header`    | 50                                                                                                                    |
| `--z-index-overlay`   | 100                                                                                                                   |

## Global utilities

Defined in `src/styles/global.css` `@layer utilities`:

| Class                    | Use                                               |
| ------------------------ | ------------------------------------------------- |
| `.focus-ring`            | Focus outline on light surfaces                   |
| `.focus-ring-inverse`    | Focus outline on dark surfaces (hero, work panel) |
| `.scroll-anchor`         | Scroll-margin offset for sticky header            |
| `.texture-noise-overlay` | Noise texture overlay on hero/error panels        |
| `.sr-only`               | Visually hidden, screen-reader accessible         |
| `.skip-link`             | Skip-to-content link (visible on focus)           |

## Motion

CSS tokens live in `@theme inline` in `global.css`. Key groups:

| Group      | Examples                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Easing     | `--ease-out` (aliases `--ease-smooth-out`), `--ease-bounce`, `--hero-enter-ease`                                             |
| Duration   | `--duration-quick` (150ms) through `--duration-very-slow` (500ms), `--hero-enter-duration`, `--duration-work-panel`          |
| Hero enter | `--hero-enter-stagger`, `--hero-enter-intro-duration`, `--hero-media-duration`                                               |
| Header     | `--header-sticky-enter-duration`, `--dropdown-open-dur`, `--header-morph-ease`                                               |
| Transform  | `--scale-large` through `--scale-tiny`, `--distance-micro` through `--distance-large`, `--blur-small` through `--blur-large` |

React/Motion scroll-reveal timing uses constants in `src/lib/motion.ts` (`revealGridDuration`, `revealItemStagger`, etc.) — separate from CSS tokens, same easing curve.

Respect `prefers-reduced-motion` — already handled globally in `global.css`.

## Do / Don't

### Do

- Use `.type-*` presets for all text
- Use semantic color tokens (`text-text-muted`, `bg-surface`, `border-border`)
- Use spacing tokens for section layout
- Use `.section-inner` for constrained content width (see Page layout above)
- Add new tokens to `@theme inline` before using in components
- Write mobile-first styles and enhance with `min-width` / Tailwind `sm:`+ variants
- Use breakpoint values from `src/lib/breakpoints.ts`
- Use `.focus-ring` / `.focus-ring-inverse` for interactive focus states

### Don't

- `text-[0.8125rem]`, `text-[clamp(...)]`, or other arbitrary font sizes
- Raw hex/rgb/oklch in components
- New font sizes outside the 6-size scale — extend an existing token instead
- Duplicate tracking/leading inline when a preset or token exists
- Duplicate `mx-auto w-full max-w-(--section-max)` — use `.section-inner`
- Mix Tailwind default `text-sm` (14px) with `--text-sm` (13px) — always use tokens
- Use Tailwind `container` for page layout — use the two-layer pattern in Page layout above
- Default to desktop styles with `max-width` overrides — use mobile-first + min-width instead
- Introduce arbitrary breakpoint pixels outside `src/lib/breakpoints.ts`

## Adding New UI

1. Check if an existing preset covers the need
2. If not, pick the closest size token and lowest-level helper (`.type-ui` + `--text-sm`)
3. Only create a new preset if the pattern repeats 3+ times
4. Never introduce a 7th font size without updating this doc and the scale in `global.css`

## File Map

| File                                              | Purpose                                             |
| ------------------------------------------------- | --------------------------------------------------- |
| `src/styles/global.css`                           | All tokens + typography presets + global utilities  |
| `src/lib/breakpoints.ts`                          | Shared breakpoint values + `minWidth()` helper      |
| `src/lib/motion.ts`                               | React/Motion scroll-reveal timing constants         |
| `src/components/common/header/`                   | Header markup, `header.css`, sync/menu scripts      |
| `src/components/sections/hero/`                   | Hero markup, `hero.css`, `hero-image.ts`            |
| `src/components/sections/error-hero/`             | 404 hero markup + `error-hero.css`                  |
| `src/components/sections/footer.css`              | Footer layout styles                                |
| `src/components/widgets/MotionWorkList/`          | Work list, panel, constants, Tailwind class strings |
| `src/components/widgets/MotionFooterWordmark.tsx` | Footer wordmark stretch interaction                 |
| `docs/design-system.md`                           | This reference                                      |
| `astro.config.mjs`                                | Inter + Libre Baskerville font loading              |
