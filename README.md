# Hacktoberfest Hack Day × DDUGU

A Vite + React + TypeScript landing page for the DDUGU Hacktoberfest Hack Day.

## Requirements

- Node.js 22 recommended (`.nvmrc` is included)
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

## Check before shipping

```bash
npm run check
```

`npm run check` runs the TypeScript project build and the Vite production build. The production bundle is written to `dist/`.

To inspect the production bundle locally:

```bash
npm run preview
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.

No backend or environment variables are required.

## Edit event details

Open `src/event.ts`.

The most important field is:

```ts
registrationUrl: "",
```

When the official registration URL is available, change it to:

```ts
registrationUrl: "https://...",
```

All registration CTAs will then point to it. The same file also contains the date, venue, schedule, build paths, FAQ, and starter-kit copy.

## Design source of truth

- `DESIGN.md` documents the current **Midnight Commons** visual system and its guardrails.
- `.impeccable/design.json` contains machine-readable extensions for motion, breakpoints, depth, and narrative rules.
- `src/styles/14-production-system.css` is the final production layer for responsive behavior, accessibility, typography, and motion hierarchy.

When changing the UI, preserve the core design rule: **hero = spectacle, content = calm, real interactions = tactile**.

## Main visual files

- `src/styles.css` — stylesheet entry point.
- `src/styles/` — layout, colors, hero, section, interaction, and responsive styles.
- `public/hero-background.webp` — canonical high-resolution flower-valley hero banner. Replace this file to change the hero artwork.
- `public/hero-landscape.svg` — lightweight illustrated fallback/reference artwork.
- `public/favicon.svg` — site favicon.
- `public/og.svg` — social preview artwork.

The hero uses `public/hero-background.webp` directly and preloads it from `index.html`. Do not re-encode or inline a compressed hero copy into JavaScript/CSS; the WebP file in `public/` is the source of truth.

## Accessibility and motion

- A skip link and visible keyboard focus states are included.
- The campus map supports mouse, touch, Enter, and Space.
- `prefers-reduced-motion` removes spatial tilt/drawing effects while preserving meaningful state feedback.
- The terminal typewriter is visual-only for assistive technology; screen readers receive the complete static terminal text once.

## Continuous integration

GitHub Actions runs the same production check on pushes and pull requests to `main`.
