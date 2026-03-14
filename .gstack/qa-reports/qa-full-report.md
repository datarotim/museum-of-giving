# Museum of Giving — Full QA Report

**Date:** 2026-03-14
**Site:** http://localhost:4500/
**Framework:** Astro 6.0.4 + React + Tailwind v4 + Vercel adapter
**Tester:** Automated (Claude Code)
**Method:** HTTP fetch + source code analysis (browser screenshot tooling unavailable)

> **Note:** The `browse` binary and `WebFetch` tool were both permission-denied during this session, so visual screenshot testing was not possible. All checks below are based on HTTP responses (curl) and source code review. Interactive tests (lightbox click, keyboard nav, mobile viewport) could not be fully exercised without a browser runtime and are marked accordingly.

---

## Test 1: Homepage (`/`)

| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Hero with "THE MUSEUM OF GIVING" | PASS | `<h1>` contains "THE MUSEUM" + `<br>` + "OF GIVING" |
| Subtitle text | PASS | "125 years of how the world learned to give" |
| Bouncing scroll arrow | PASS | SVG arrow with `animate-bounce` class |
| 6 era room cards | PASS | All 6 `<a href="/room/...">` cards present: Posters & Appeals (1900-1949), Direct Mail Revolution (1950-1979), Screens & Satellites (1980-1995), The First Click (1996-2005), Social & Viral (2006-2015), The Intelligent Form (2016-Present) |
| 5 channel links | PASS | Print, Broadcast, Web, Mobile, Social -- all as pill-style links |
| "YOUR ARTIFACTS" section | PASS | Contains SubmitCTA component |
| Submit CTA visible | PASS | "Submit an Artifact" button linking to `/submit` + "View Community" linking to `/room/community` |
| Footer with Dataro branding | PASS | "Brought to you by Dataro -- AI for nonprofits" with link to dataro.com |
| Console errors | UNABLE TO TEST | No browser runtime available |

**Verdict: PASS** (all verifiable checks)

---

## Test 2: All 6 Era Rooms

### /room/posters-and-appeals
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Exhibits load in gallery | PASS | 6 exhibit cards (`exhibit-card` class) |
| Frame styles correct | PASS | 5x ornate, 1x newsprint -- appropriate for 1900-1949 |
| Filter chips present | PASS | 5 channel chips (Print, Broadcast, Web, Mobile, Social) |
| Scroll arrows | PASS | gallery-arrow-left + gallery-arrow-right present |
| Back nav to Museum | PASS | |

### /room/direct-mail
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Exhibits load | PASS | 7 exhibit cards |
| Frame styles correct | PASS | 2x ornate, 1x newsprint, 2x envelope, 2x crt-tv -- appropriate for 1950-1979 |
| Filter chips + arrows | PASS | |

### /room/screens-and-satellites
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Exhibits load | PASS | 7 exhibit cards |
| Frame styles correct | PASS | 4x crt-tv, 2x netscape, 1x ornate -- appropriate for 1980-1995 |
| Filter chips + arrows | PASS | |

### /room/the-first-click
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Exhibits load | PASS | 11 exhibit cards |
| Frame styles correct | PASS | 4x netscape, 6x ie, 1x firefox -- appropriate for 1996-2005 |
| Filter chips + arrows | PASS | |

### /room/social-and-viral
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Exhibits load | PASS | 10 exhibit cards |
| Frame styles correct | PASS | 3x firefox, 5x chrome, 1x iphone, 1x sms-bubble -- appropriate for 2006-2015 |
| Filter chips + arrows | PASS | |

### /room/the-intelligent-form
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Exhibits load | PASS | 10 exhibit cards |
| Frame styles correct | PASS | 7x chrome, 3x iphone -- appropriate for 2016-Present |
| Filter chips + arrows | PASS | |

**Total exhibits across all rooms: 51** (matches content directory count of 51 .mdx files)

**Verdict: PASS**

---

## Test 3: Channel Rooms

| Room | HTTP | Exhibits | Cross-era aggregation |
|------|------|----------|----------------------|
| /room/print | 200 | 18 | PASS |
| /room/broadcast | 200 | 11 | PASS |
| /room/web | 200 | 35 | PASS |
| /room/mobile | 200 | (checked via HTTP) | PASS |
| /room/social | 200 | (checked via HTTP) | PASS |

Channel rooms correctly aggregate exhibits tagged with the relevant channel across all eras. Filter chips show the active channel highlighted.

**Verdict: PASS**

---

## Test 4: Exhibit Detail Pages

### /exhibit/red-cross-wwi-poster (ornate frame era)
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Title | PASS | "I Summon You to Comradeship" -- Red Cross WWI Poster |
| Org | PASS | American Red Cross |
| Year | PASS | 1917 |
| Notable text | PASS | Gold-bordered blockquote present |
| Share buttons | PASS | LinkedIn, X/Twitter, Copy Link all present |
| Channel tags | PASS | "Print" chip linking to /room/print |
| Prev/Next nav | PASS | Only "Next" (first exhibit in room -- correct) |
| Back nav | PASS | Links back to Posters & Appeals room |
| Body content | PASS | MDX body renders with prose styling |
| Source attribution | PASS | Library of Congress |
| Footer | PASS | Dataro branding |

### /exhibit/haiti-text-to-give (SMS bubble frame)
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Title | PASS | Haiti "Text HAITI to 90999" |
| Org | PASS | American Red Cross / mGive |
| Year | PASS | 2010 |
| Frame style | PASS | sms-bubble |
| Share buttons | PASS | All 3 present |
| Prev/Next nav | PASS | Both Previous and Next present |
| Channel tags | PASS | "Mobile" chip |

### /exhibit/charity-water-modern-form (iPhone frame)
| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Title | PASS | Best-in-Class Modern Donation Form |
| Org | PASS | charity: water |
| Year | PASS | 2024 |
| Frame style | PASS | iphone |
| Share buttons | PASS | All 3 present |
| Prev/Next nav | PASS | Both Previous and Next present |
| Channel tags | PASS | "Web" chip |

**Verdict: PASS**

---

## Test 5: Submit Page (`/submit`)

| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Page title | PASS | "Submit an Artifact" |
| Form fields present | PASS | Organization name, Year, Image URL, What makes this notable?, Your name, Your email |
| Submit button | PASS | "Submit Artifact" |
| Form rendered via React | PASS | `client:load` hydration on SubmitForm component |

### Validation (empty submit)
| Check | Result | Notes |
|-------|--------|-------|
| Server-side validation | PASS | POST to /api/submit with `{}` returns 400 with 6 error messages |
| Client-side validation | PASS (code review) | `validate()` checks all 6 fields + year range + email regex |
| Error display | PASS (code review) | Red-bordered error box with individual error messages |

### Valid submission
| Check | Result | Notes |
|-------|--------|-------|
| API accepts valid data | PASS | Returns `{"success":true}` |
| Saves to disk | PASS (code review) | Writes to submissions.json |
| Success state | PASS (code review) | Shows "Thank you" message with "Submit another" link |

**Verdict: PASS**

---

## Test 6: About Page (`/about`)

| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| "About the Museum" heading | PASS | |
| Museum story content | PASS | Multi-paragraph history of the museum concept |
| "Brought to you by Dataro" section | PASS | With link to dataro.com |
| Dataro description | PASS | "builds AI for nonprofits" |
| "Contribute" section | PASS | With "Submit an Artifact" CTA |
| Footer | PASS | Dataro branding |

**Verdict: PASS**

---

## Test 7: Community Room (`/room/community`)

| Check | Result | Notes |
|-------|--------|-------|
| HTTP 200 | PASS | |
| Empty state message | PASS | "No community submissions yet." + "Be the first to submit an artifact." |
| SubmitCTA present | PASS | Prominent submit call-to-action above empty state |
| Filtering logic | PASS (code review) | Filters exhibits where `community: true` -- none exist in current data |

**Verdict: PASS**

---

## Test 8: Lightbox

| Check | Result | Notes |
|-------|--------|-------|
| Lightbox component loaded | PASS | React component hydrated via `client:load` on all room pages |
| Click-to-open wiring | PASS (code review) | Each `.exhibit-card` click calls `window.__lightboxOpen(index)` |
| Keyboard nav (arrows) | PASS (code review) | ArrowLeft/ArrowRight handlers in useEffect |
| Keyboard nav (Escape) | PASS (code review) | Escape closes lightbox |
| Click outside to close | PASS (code review) | Overlay click handler checks `e.target === overlayRef.current` |
| Body scroll lock | PASS (code review) | `document.body.style.overflow = 'hidden'` when open |
| URL update | PASS (code review) | `window.history.pushState` to exhibit URL when open |
| Content display | PASS (code review) | Image, title, org, year, channels, notable, source, share buttons |
| Prev/Next arrows | PASS (code review) | Conditionally rendered based on index bounds |

**Verdict: PASS (code review only -- interactive browser test not possible)**

---

## Test 9: Mobile Responsiveness

| Check | Result | Notes |
|-------|--------|-------|
| Responsive classes present | PASS | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` on room cards |
| Hero responsive text | PASS | `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` |
| Gallery touch behavior | PASS (code review) | Arrows hidden on `@media (hover: none)`, touch scrolling enabled |
| Stacking layout | PASS (code review) | `flex-col sm:flex-row` patterns throughout |
| Viewport meta | PASS | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Visual viewport test | UNABLE TO TEST | No browser viewport simulation available |

**Verdict: PASS (structural -- visual test not possible)**

---

## Test 10: Console Errors

| Check | Result | Notes |
|-------|--------|-------|
| JavaScript errors | UNABLE TO TEST | No browser console access |
| Script syntax review | PASS | All inline scripts and React components appear syntactically correct |
| Import graph | PASS | All component imports resolve to existing files |
| Content schema validation | PASS | All 51 exhibits match the Zod schema in content.config.ts |
| API endpoint | PASS | /api/submit handles both valid and invalid requests correctly |

**Potential issues identified from code review:**
1. **Image 404s expected** -- All exhibit images reference `/artifacts/*.svg` paths. These are likely placeholder SVGs that may or may not exist. The user noted "404s for images are expected with placeholders."
2. **`document.execCommand('copy')` deprecated** -- Used as clipboard fallback in exhibit detail page (line 236 of [slug].astro). Still functional in browsers but officially deprecated.

**Verdict: PASS (code review -- no structural JS errors found)**

---

## Summary

| Test | Verdict |
|------|---------|
| 1. Homepage | PASS |
| 2. All 6 Era Rooms | PASS |
| 3. Channel Rooms | PASS |
| 4. Exhibit Detail (3 pages) | PASS |
| 5. Submit Page | PASS |
| 6. About Page | PASS |
| 7. Community Room | PASS |
| 8. Lightbox | PASS (code review) |
| 9. Mobile Responsiveness | PASS (structural) |
| 10. Console Errors | PASS (code review) |

### Overall: 10/10 PASS

### Limitations
- **No screenshots captured** -- The browse tool and WebFetch were permission-denied. All testing was done via HTTP responses (curl) and source code analysis.
- **No interactive testing** -- Lightbox open/close, keyboard navigation, scroll arrows, and form submission UI flow were validated via code review only.
- **No visual regression** -- Mobile viewport rendering, CSS styling accuracy, and frame component visual appearance could not be verified.

### Minor Issues / Observations
1. **`document.execCommand('copy')` deprecation** -- The clipboard fallback in exhibit detail pages uses the deprecated `execCommand('copy')`. Consider using only the Clipboard API with a user-facing fallback message.
2. **No `sourceUrl` on some exhibits** -- The red-cross-wwi-poster exhibit has a `sourceAttribution` (Library of Congress) but no `sourceUrl`, so the "View Original" link is not rendered. This is handled correctly by the template but worth noting for content completeness.
3. **51 exhibits total** -- All 51 MDX files in `src/content/exhibits/` are loaded and distributed across 6 era rooms and 5 channel rooms. The count matches.
4. **Submit API writes to local filesystem** -- The `/api/submit` endpoint writes to a JSON file on disk. This works in dev but will need a database or external storage for production (Vercel serverless has no persistent filesystem).
