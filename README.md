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

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

No backend or environment variables are required.

## Edit event details

Open `src/event.ts`.

The most important field is:

```ts
registrationUrl: "",
```

When your official registration URL is available, change it to:

```ts
registrationUrl: "https://...",
```

All registration CTAs will then point to it.

You can also edit the date, venue, schedule, build paths, FAQ, and toolkit content from the same file.

## Main visual files

- `src/styles.css` — all layout, colors, responsive behavior, and animations.
- `public/hero-background.webp` — hero background image used by the landing page.
- `public/hero-landscape.svg` — previous editable illustrated landscape asset.
- `public/favicon.svg` — site favicon.
- `public/og.png` — social preview card.

## Design direction

The site deliberately combines two visual ideas:

- event-site utility: ticker, cream nav, outlined/offset buttons, pills, schedule, FAQ, clear registration CTAs;
- editorial/cinematic atmosphere: deep cobalt sky, serif display typography, halftone texture, surreal flower field, and restrained yellow accents.

The result is original rather than a literal copy of the reference site.

## Hero background

The hero uses `public/hero-background.webp`. Replace that file with any 16:9-ish image while keeping the same filename, or change the URL in `src/styles.css` under `.hero-landscape`.
