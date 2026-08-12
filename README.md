# Wörtersee

Wörtersee is a German–English vocabulary flashcard game built with React and TypeScript.

Live site: [woertersee.cankatesuren.chatgpt.site](https://woertersee.cankatesuren.chatgpt.site)

## Features

- German → English and English → German study modes
- Random and alphabetical card order
- New, review, and learned pools
- Kapitel 1–14 as separate decks
- Grammar-focused decks for verbs, nouns, adjectives, and prepositions
- Balanced custom games with a chosen card count and selected categories
- Personal vocabulary cards stored locally in the browser
- Responsive desktop and mobile layout

## Tech stack

- React 19
- TypeScript
- vinext / Vite
- CSS
- Browser local storage for personal cards and progress
- Cloudflare-compatible deployment output

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run build
```

## Main files

- `app/page.tsx` — game interface and state
- `app/vocabulary.ts` — vocabulary decks and chapter data
- `app/globals.css` — responsive visual design
- `app/layout.tsx` — page metadata and layout

Personal words and learning progress are device-local. Clearing browser storage removes them.
