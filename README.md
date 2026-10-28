# Boutique Chantal

Website repository for **Boutique Chantal** (Esslingen), a static landing page for evening and cocktail fashion.

## Tech stack

- HTML
- Vanilla JavaScript
- Tailwind CSS v4 (via `@tailwindcss/cli`)

## Prerequisites

- Node.js (LTS recommended)
- npm

## Getting started

```bash
npm install
```

## Development

Build Tailwind in watch mode:

```bash
npm run dev
```

This compiles:

- input: `styles.css`
- output: `assets/styles.css`

## Production build

```bash
npm run build
```

## Project structure

- `index.html` – main page
- `styles.css` – Tailwind source stylesheet
- `assets/styles.css` – generated stylesheet
- `script.js` – client-side interactions
- `impressum.html` / `datenschutz.html` – legal pages
- `tailwind.config.js` – Tailwind configuration

## Notes

- This is a static site repository (no backend service).
- Do not edit `assets/styles.css` manually; regenerate it from `styles.css`.
