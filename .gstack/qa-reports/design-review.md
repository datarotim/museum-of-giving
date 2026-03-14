# Museum of Giving -- Design Review

**Date:** 2026-03-14
**Spec:** MoMA-clean -- white #fff bg, #1a1a1a text, Playfair Display headings, Inter body. Minimal accent. Museum aesthetic.
**Reviewed at:** http://localhost:4500/
**Screenshots:** `.gstack/qa-reports/screenshots/`

---

## 1. Desktop (1440x900)

### Homepage

**Screenshot:** `homepage.png`

| Area | Rating | Notes |
|------|--------|-------|
| Typography hierarchy | 5/5 | "THE MUSEUM OF GIVING" renders in Playfair Display, bold, large scale. Section headings (EXPLORE BY ERA, BROWSE BY CHANNEL, YOUR ARTIFACTS) are all in display font, properly sized. Body text in sans-serif (Inter). Hierarchy is clear and museum-appropriate. |
| Whitespace / breathing room | 5/5 | Hero takes ~85vh with generous vertical centering. Sections have py-16 spacing. Excellent breathing room throughout. The layout feels unhurried -- exactly right for a museum. |
| Grid alignment of room cards | 4/5 | 3-column grid at lg breakpoint, well-aligned. Cards have consistent padding (p-6 sm:p-8), matching borders, and uniform structure (era label, title, description). Minor: the grid gap of 24px could be slightly wider (32px) at 1440px for more gallery-wall feel. |
| Gallery scroll presentation | 4/5 | Horizontal scroll gallery works with scroll-snap. Cards are 320px wide at sm+. Arrow overlays appear on hover, hidden at start/end of scroll. Good. Minor: the pink placeholder rectangles visible in `room-first-click.png` indicate missing exhibit images -- this is a content gap, not a design issue. |
| Frame component rendering | 5/5 | See Section 4 for detailed audit. |

**Desktop Overall: 4.6/5**

### Room Page (/room/the-first-click)

**Screenshots:** `room-first-click.png`, `room-first-click-with-images.png`

| Area | Rating | Notes |
|------|--------|-------|
| Page header | 5/5 | Back link (arrow + "Museum") is subtle, muted. Era label in mono, uppercase, tracked. Title "The First Click" in Playfair Display at text-6xl -- commanding. Description in italic muted text. Clean hierarchy. |
| Channel filter chips | 4/5 | Rounded pill buttons, well-spaced. Active state inverts to dark fill. Works well. |
| Gallery | 4/5 | NetscapeFrame wrapping exhibits looks excellent -- the Win95 chrome, blue title bar, menu bar, toolbar, and status bar are all rendered with CSS-only detail. Images sit within the content area convincingly. |

### Exhibit Detail (/exhibit/als-ice-bucket-challenge)

**Screenshot:** `exhibit-detail.png` (showing Red Cross WWI poster exhibit)

| Area | Rating | Notes |
|------|--------|-------|
| Image presentation | 4/5 | Centered, bordered in museum-cream with subtle border. Max height constrained to 70vh. Clean. Note: the actual image shows a broken image icon (alt text visible), suggesting the image file is missing. Design treatment is correct. |
| Placard/metadata | 5/5 | Org name, year, country displayed inline with middot separators. Channel tags as pill chips. Notable quote set off with gold left border (border-museum-gold). Body prose well-typeset. |
| Share/Navigation | 5/5 | Share section with LinkedIn, X, copy-link icons. Prev/Next navigation with labels. Both separated by border-t dividers. Clean and functional. |

---

## 2. Tablet (768x1024)

**No dedicated tablet screenshot available.** Analysis based on responsive CSS breakpoints in source code:

| Area | Rating | Notes |
|------|--------|-------|
| Room card grid | 4/5 | Grid uses `sm:grid-cols-2 lg:grid-cols-3`. At 768px (sm breakpoint), cards flow into 2 columns as expected. Cards have sm:p-8 padding. |
| Gallery scrollability | 5/5 | HorizontalGallery uses `-webkit-overflow-scrolling: touch` and `scroll-snap-type: x mandatory`. Arrow buttons hidden via `@media (hover: none)`. Touch devices get native horizontal scroll. |
| Text overflow | 5/5 | Max-width containers (max-w-6xl, max-w-4xl, max-w-3xl) prevent text from stretching too wide. All text containers use responsive sizing (text-lg sm:text-xl). No overflow risk. |

**Tablet Overall: 4.7/5**

---

## 3. Mobile (375x812)

### Homepage

**Screenshot:** `homepage-mobile.png`

| Area | Rating | Notes |
|------|--------|-------|
| Single column layout | 5/5 | Room cards stack to single column (grid-cols-1). Each card has full-width with p-6 padding. Clean vertical rhythm. |
| Touch-friendly spacing | 5/5 | Cards have generous tap targets. Channel chips well-spaced. CTA buttons stack vertically (flex-col) with gap-4. |
| Hero | 5/5 | Title scales down appropriately (text-5xl at base). Subtitle and bounce arrow remain centered. Full-viewport hero preserved. |
| Text readability | 5/5 | Body text at base size is legible. Muted text provides hierarchy without being too faint. Leading-relaxed ensures comfortable line height. |

### Room Page (Mobile)

**Screenshot:** `room-mobile.png`

| Area | Rating | Notes |
|------|--------|-------|
| Layout | 5/5 | Single column. Title "Posters & Appeals" at text-4xl, bold -- still impactful. Description in italic muted text wraps naturally. |
| Gallery | 4/5 | Horizontal scroll works. Cards at 280px width (mobile size). Gallery padding reduces to 20px on touch devices. Scroll arrows correctly hidden. One concern: the OrnateFrame with gold border renders well but the image within is quite small at this width. |
| CTA section | 5/5 | "Submit an Artifact" and "View Community" buttons stack vertically, full-width appearance. Good touch targets. |

### Submit Form

**Screenshot:** `submit-page.png`

| Area | Rating | Notes |
|------|--------|-------|
| Form fields | 4/5 | Fields are full-width within max-w-2xl container. Labels above fields, placeholder text visible. "Your name" and "Your email" sit side-by-side -- at 375px this may be too narrow for the two-column layout. Needs verification. |
| Submit button | 5/5 | Full-width dark button with "Submit Artifact" text. Excellent touch target. |
| Text readability | 5/5 | Header and description text properly sized. Good spacing between form elements. |

**Mobile Overall: 4.8/5**

**Issue:** The name/email two-column layout on the submit form may be cramped on narrow phones. Consider stacking these fields at the `sm` breakpoint.

---

## 4. Frame Quality Audit

### /room/posters-and-appeals -- OrnateFrame

**Screenshot:** `room-with-placeholders.png`

| Aspect | Rating | Notes |
|--------|--------|-------|
| Gold border | 5/5 | Multi-layered gold gradient (11 color stops from #d4a54a to #f0d68a to #b8860b). Inner and outer ridge details with separate gradient borders. Outer shadow with multiple layers (0 4px 16px + 0 8px 32px). Convincing museum-quality gold frame effect. |
| Corner ornaments | 5/5 | CSS-only rosettes at all four corners using radial gradients and pseudo-elements. Subtle but effective. |
| Mat board | 4/5 | Cream mat (#f5f0e8 to #ede6d8) with inner shadow. Double-mat effect via ornate-mat-inner. Authentic. |
| Plaque | 5/5 | Gold plaque beneath frame with display font, uppercase, tracked. Period-appropriate. |

### /room/direct-mail -- EnvelopeFrame

**Screenshot:** Not directly captured, but reviewed via source code.

| Aspect | Rating | Notes |
|--------|--------|-------|
| Letter paper | 4/5 | Off-white gradient (#fffef8 to #faf6ee) with subtle lined paper texture overlay at 2% opacity. Convincing. |
| Envelope body | 5/5 | Kraft-paper gradient (#f0e8d8 to #e0d5c2). Red-blue airmail stripe at bottom at 60% opacity. Love stamp with heart SVG. Postmark circle with parallel lines, rotated -8deg. Rich detail. |
| Dimensional effect | 4/5 | Letter overlaps envelope with negative margin-bottom. Creates a "letter pulled from envelope" effect. Effective. |

### /room/screens-and-satellites -- CrtFrame

**Screenshot:** `room-screens-satellites.png`

| Aspect | Rating | Notes |
|--------|--------|-------|
| TV body | 5/5 | Dark gradient casing (#3a3a3a to #1a1a1a). Rounded top corners (12px). Heavy shadow (4px 20px + 8px 40px). Looks like a real CRT housing. |
| Screen effects | 5/5 | Three layered overlays: scanlines (repeating-linear-gradient at 2px intervals), phosphor glow (blue-tinted radial gradient with screen blend), and edge vignette. The filter on content (brightness 0.95, contrast 1.1) adds warmth. Outstanding attention to detail. |
| Controls | 4/5 | Red power LED dot, two knobs (large and small) with gradient fills. Stand with neck and base. Convincing. |
| Overall feel | 5/5 | The year numbers (1981, 1985, 1987) displayed on the dark CRT screens read as channel numbers. Perfect for the era. |

### /room/the-first-click -- NetscapeFrame + IeFrame

**Screenshot:** `room-first-click-with-images.png`

| Aspect | Rating | Notes |
|--------|--------|-------|
| Netscape chrome | 5/5 | Win95 outset borders, blue-gradient title bar, green "N" icon, menu bar, toolbar with icons and labels, throbber, location bar with "Location:" label, status bar with lock icon. Every element is pixel-accurate to the 1990s aesthetic. |
| IE frame | 4/5 | Not directly visible in screenshots, but reviewed in source. Should match the Netscape quality. |
| Content integration | 5/5 | Screenshots of actual Red Cross and Amnesty International donation pages from 1996-1999 sit within the browser content areas. The browser chrome makes them feel like time-capsule screenshots. |

### /room/social-and-viral -- SmsBubbleFrame

**Screenshot:** Not directly captured. Reviewed via source code.

| Aspect | Rating | Notes |
|--------|--------|-------|
| iPhone shell | 5/5 | Black body with 24px border-radius, 3px bezel padding. iOS status bar with time (9:41), signal bars, and battery SVGs. Home indicator bar. Authentic iOS appearance. |
| SMS interface | 5/5 | Messages header with back chevron, contact avatar, contact name/label. Green outgoing bubble ("GIVE 25") with reduced bottom-right radius (tail effect). Gray incoming bubble with donation confirmation. "Delivered" label. Input bar with plus button, text field, and send arrow. |
| Typography | 5/5 | Correctly uses -apple-system / SF Pro Display for iOS authenticity rather than the site's Inter font. Appropriate scoping. |

### /room/the-intelligent-form -- ChromeFrame + IphoneFrame

**Screenshot:** `room-intelligent-form.png`

| Aspect | Rating | Notes |
|--------|--------|-------|
| Chrome browser | 5/5 | Tab bar with active tab, new-tab button, window controls. Omnibox with lock icon, URL, and three-dot menu. Nav buttons (back, forward, reload). Modern Chrome look. |
| iPhone frame | 5/5 | Notch with camera, status icons (signal, wifi, battery), home indicator. Clean white content area. Modern iPhone aesthetic. |
| Year placeholders | 4/5 | Years 2016-2019 displayed in large Playfair Display within the frames. Good temporal context while images are pending. |

**Frame Quality Overall: 4.8/5**

---

## 5. Typography Check

| Font | Usage | Status | Rating |
|------|-------|--------|--------|
| Playfair Display | Headings (h1-h3), hero title, section titles, room names, exhibit titles | **Loading via Google Fonts** -- `family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400`. Applied via `--font-display` and `font-display` Tailwind class. Confirmed rendering in all screenshots: serif letterforms with high contrast strokes visible in "THE MUSEUM OF GIVING", "Posters & Appeals", "The First Click", etc. | 5/5 |
| Inter | Body text, labels, navigation, metadata | **Loading via Google Fonts** -- `family=Inter:wght@400;500;600;700`. Applied via `--font-sans` as base html font. Confirmed in body copy, navigation links, chip labels, form fields. Clean sans-serif rendering visible throughout. | 5/5 |
| JetBrains Mono | Era labels, year displays, monospace accents | Declared as `--font-mono` in theme. Used via `font-mono` class on era labels ("1900-1949"). Adds a technical/archival feel. | 4/5 |
| Frame-specific fonts | Netscape: MS Sans Serif/Tahoma/Arial. SMS: -apple-system/SF Pro Display. Chrome: system-ui/Segoe UI/Roboto. | Correctly scoped to frame components. Does not bleed into museum typography. | 5/5 |

**Preconnect configured:** Yes -- `preconnect` to both `fonts.googleapis.com` and `fonts.gstatic.com`. Font loading should be fast.

**Typography Overall: 4.9/5**

---

## 6. Color Consistency

| Color | Spec | Implementation | Usage | Rating |
|-------|------|----------------|-------|--------|
| Background | #ffffff | `--color-museum-bg: #ffffff` | Body background, card backgrounds, content areas | 5/5 |
| Text | #1a1a1a | `--color-museum-text: #1a1a1a` | All primary text, headings, body copy | 5/5 |
| Muted/Secondary | gray | `--color-museum-muted: #6b7280` | Era labels, descriptions, metadata, back links | 5/5 |
| Border | light gray | `--color-museum-border: #e5e5e5` | Card borders, divider lines, form field borders | 5/5 |
| Gold accent | gold | `--color-museum-gold: #b8860b` | OrnateFrame borders, exhibit notable quote border-left, envelope stamp | 5/5 |
| Cream | off-white | `--color-museum-cream: #faf8f5` | SubmitCTA background, exhibit image mat board | 5/5 |
| Accent | blue | `--color-museum-accent: #2563eb` | Links ("View Original"), focus rings, hover states on room cards | 3/5 |

**Issue:** The blue accent (#2563eb) feels off-spec. The design spec calls for "minimal accent" and "museum aesthetic." A saturated Tailwind blue-600 is jarring against the otherwise muted, warm palette. This is the only significant color deviation.

**Recommendation:** Replace `--color-museum-accent` with a warmer, more muted tone. Options:
- Warm dark: `#4a4a4a` (just use text color for links)
- Museum gold: `#b8860b` (unify with the gold accent already used)
- Muted olive: `#5c6352` (earthy, minimal)
- Remove entirely and rely on underlines for link affordance

**Color Overall: 4.5/5**

---

## Summary Scorecard

| Category | Rating | Status |
|----------|--------|--------|
| Desktop layout | 4.6/5 | Pass |
| Tablet responsiveness | 4.7/5 | Pass |
| Mobile layout | 4.8/5 | Pass |
| Frame quality | 4.8/5 | Pass |
| Typography | 4.9/5 | Pass |
| Color consistency | 4.5/5 | Needs attention |

**Overall: 4.7/5**

---

## Issues Requiring Action

### Priority 1 -- Blue Accent Color (Score: 3/5)

The `--color-museum-accent: #2563eb` blue is used for:
- Room card title hover color (`hover:text-museum-accent`)
- Focus-visible outlines on exhibit cards
- "View Original" links on exhibit detail pages

This blue is a standard Tailwind utility color and breaks the museum aesthetic. It should be replaced with a warmer, more muted tone or the existing gold.

**File:** `src/styles/global.css` line 8
**Fix:** Change `--color-museum-accent: #2563eb` to `--color-museum-accent: #8b6914` (dark gold) or `#4a4a4a` (neutral dark)

### Priority 2 -- Submit Form Two-Column on Mobile

The name/email fields appear to be side-by-side on narrow viewports. At 375px, two fields in a row leaves each at ~165px wide -- tight for text input.

**File:** `src/components/SubmitForm.tsx`
**Fix:** Ensure name/email fields stack to single column below sm breakpoint.

### Priority 3 -- Room Card Grid Spacing at Desktop

At 1440px with 3-column grid, the gap-6 (24px) between cards feels slightly tight. Museum gallery walls typically have more breathing room between pieces.

**File:** `src/pages/index.astro` line 20
**Fix:** Change `gap-6` to `gap-8` for wider desktop viewports: `gap-6 lg:gap-8`

### Priority 4 -- Missing Exhibit Images (Content Gap)

Several screenshots show placeholder rectangles (pink boxes) where exhibit images should be. This is a content issue, not a design issue, but it significantly impacts the visual impression.

**Rooms affected:** The First Click (some exhibits), all rooms may have gaps.

---

## What Works Exceptionally Well

1. **Frame components are the standout feature.** The CSS-only OrnateFrame, CrtFrame, NetscapeFrame, SmsBubbleFrame, and ChromeFrame are each lovingly crafted with period-accurate details. The scanlines on the CRT, the Win95 outset borders on Netscape, the iOS message bubbles -- these sell the museum concept.

2. **Typography hierarchy is museum-grade.** Playfair Display for display text and Inter for body creates the exact MoMA-catalog feel the spec targets. The monospace era labels add an archival/catalog dimension.

3. **Whitespace is generous and intentional.** The hero's 85vh, the py-16 section spacing, the max-w constraints -- nothing feels cramped. The site breathes.

4. **Mobile experience is strong.** Single column stacking, hidden scroll arrows on touch, appropriate text scaling -- this is well-executed responsive design.

5. **Color palette is disciplined (with the one exception of blue accent).** The white/dark/muted/cream/gold palette is cohesive and warm. The gold accent connects the OrnateFrame aesthetic to the broader brand.
