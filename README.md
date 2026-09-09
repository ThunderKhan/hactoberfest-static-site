# Hacktoberfest Hack Day × DDUGU

A Vite + React + TypeScript landing page for the DDUGU Hacktoberfest Hack Day.

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`.

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

## Main visual files

- `src/styles.css` — stylesheet entry point.
- `src/styles/` — layout, colors, hero, section, and responsive styles.
- `public/hero-bg/` — the optimized flower-valley hero image stored as base64 payload chunks.
- `public/hero-landscape.svg` — lightweight illustrated fallback while the hero image loads.
- `public/favicon.svg` — site favicon.
- `public/og.svg` — social preview artwork.

The hero payload is assembled by `src/main.tsx` in the browser and assigned to the `--hero-bg-image` CSS variable. This keeps the image self-contained in the repository while preserving the exact visual reference used for the hero.

## Design direction

The site combines event-site utility — ticker, cream navigation, outlined/offset buttons, pills, schedule, FAQ, venue, and registration CTAs — with the darker editorial flower-field aesthetic used in the hero.
