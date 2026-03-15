# Museum of Giving

A digital museum tracing 125 years of how the world learned to give — from 1900s charity posters to modern mobile donation forms.

Built with Astro 6 + React + Tailwind v4, deployed on Vercel.

---

## What It Is

The Museum of Giving presents 51 curated exhibits across six era-based rooms and five channel-based rooms. Each exhibit is displayed inside a period-accurate frame component that matches its medium — ornate gold frames for early print, CRT TV shells for broadcast-era campaigns, Netscape/IE browser chrome for the first wave of online giving, and iPhone/SMS frames for mobile.

**Live rooms:**

| Era | Room | Period |
|-----|------|--------|
| Posters & Appeals | `/room/posters-and-appeals` | 1900–1949 |
| Direct Mail Revolution | `/room/direct-mail` | 1950–1979 |
| Screens & Satellites | `/room/screens-and-satellites` | 1980–1995 |
| The First Click | `/room/the-first-click` | 1996–2005 |
| Social & Viral | `/room/social-and-viral` | 2006–2015 |
| The Intelligent Form | `/room/the-intelligent-form` | 2016–Present |

**Channel rooms:** Print · Broadcast · Web · Mobile · Social

---

## Project Structure

```
/
├── public/
│   └── artifacts/          # Exhibit images (SVGs)
├── src/
│   ├── components/
│   │   ├── frames/         # Period-accurate frame components
│   │   │   ├── OrnateFrame.astro
│   │   │   ├── NewsprintFrame.astro
│   │   │   ├── EnvelopeFrame.astro
│   │   │   ├── CrtFrame.astro
│   │   │   ├── NetscapeFrame.astro
│   │   │   ├── IeFrame.astro
│   │   │   ├── FirefoxFrame.astro
│   │   │   ├── ChromeFrame.astro
│   │   │   ├── IphoneFrame.astro
│   │   │   └── SmsBubbleFrame.astro
│   │   ├── ExhibitCard.astro
│   │   ├── HorizontalGallery.astro
│   │   ├── Lightbox.tsx
│   │   ├── SubmitForm.tsx
│   │   └── ...
│   ├── content/
│   │   └── exhibits/       # 51 MDX exhibit files
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── submit.astro
│   │   ├── room/[slug].astro
│   │   ├── exhibit/[slug].astro
│   │   └── api/submit.ts
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json
```

---

## Design Spec

**MoMA-clean aesthetic:** white `#fff` background, `#1a1a1a` text, Playfair Display headings, Inter body. Minimal accent. Museum-grade whitespace.

| Token | Value |
|-------|-------|
| Background | `#ffffff` |
| Text | `#1a1a1a` |
| Muted | `#6b7280` |
| Border | `#e5e5e5` |
| Gold accent | `#b8860b` |
| Cream | `#faf8f5` |

**Fonts:** Playfair Display (headings/display) · Inter (body) · JetBrains Mono (era labels) — all via Google Fonts.

---

## Frame Components

Each exhibit is wrapped in a CSS-only frame that matches its era and medium:

| Frame | Used for |
|-------|----------|
| `OrnateFrame` | Print campaigns, posters (1900s–1940s) |
| `NewsprintFrame` | Newspaper ads |
| `EnvelopeFrame` | Direct mail (1950s–1970s) |
| `CrtFrame` | Broadcast/TV telethons (1980s–1990s) |
| `NetscapeFrame` | Early web donation pages (1996–2001) |
| `IeFrame` | IE-era online giving (2000s) |
| `FirefoxFrame` | Mid-2000s web |
| `ChromeFrame` | Modern web (2008–present) |
| `IphoneFrame` | Mobile donation forms |
| `SmsBubbleFrame` | SMS giving campaigns |

---

## Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |

Requires Node >= 22.12.0.

---

## Adding Exhibits

Exhibits live in `src/content/exhibits/` as MDX files. Each file follows the schema defined in `src/content.config.ts`:

```yaml
---
title: "Exhibit Title"
org: "Organization Name"
year: 1985
country: "USA"
channel: ["Print"]          # Print | Broadcast | Web | Mobile | Social
frame: "ornate"             # ornate | newsprint | envelope | crt-tv | netscape | ie | firefox | chrome | iphone | sms-bubble
room: "posters-and-appeals" # era room slug
image: "/artifacts/my-exhibit.svg"
notable: "The quote or fact that makes this notable."
sourceAttribution: "Source Name"
sourceUrl: "https://..."
---

Body text in MDX...
```

---

## Submit Page

Visitors can submit their own artifacts at `/submit`. The form collects organization, year, image URL, a notable description, and submitter contact details. Submissions are validated client- and server-side and saved to `submissions.json`.

> **Note for production:** The submit API writes to the local filesystem. Replace with a database or external storage (e.g. Vercel KV, Supabase) before deploying to production.

---

## Brought to you by

[Dataro](https://dataro.com) — AI for nonprofits.
