# Themed Hero Scroll Animation — Design Spec
**Date:** 2026-06-01
**Status:** Approved for implementation

---

## Summary

Replace the existing `HeroBanner` on the Home page with two theme-specific, scroll-driven hero sections:

- **Neo** — Morphic Warp: chamfered polygon rings expand as an iris as you scroll
- **Trust** — Constellation Map: orbital nodes spread outward and label as Academy / Marketing / Labs

Both use GSAP ScrollTrigger for scroll-driven animation. The hero is pinned to the viewport while the user scrolls through a tall wrapper. Animations are intentionally placeholder-grade — the infrastructure is what matters; visual content will be replaced later.

---

## Placement

```
Gateway (unchanged)
  ↓ click Neo / Trust
/#neo  → NeoHero   (replaces HeroBanner on Home page)
/#trust → TrustHero (replaces HeroBanner on Home page)
  ↓ hero unpins after scroll completes
MarketContext, SuperSkills … rest of Home page
```

The animated hero only appears on the **Home page** (`page === "home"`). All other pages (Academy, Marketing, Labs, Customers, Company, Contact) keep the existing `HeroBanner` unchanged.

---

## GSAP Setup

Add via CDN in `index.html` (before the app script tag). Pin to an exact version and include SRI hashes to guard against CDN compromise:

```html
<script
  src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
  integrity="sha384-REPLACE_WITH_REAL_HASH"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
  integrity="sha384-REPLACE_WITH_REAL_HASH"
  crossorigin="anonymous"></script>
```

**Implementation step — generate real hashes before inserting:**
```bash
curl -sL https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A

curl -sL https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```
Prefix each output with `sha384-` and put it in the `integrity` attribute. Do not use a floating tag like `gsap@3` — the hash would change whenever the CDN bumps the version, breaking the page.

Register plugin in app code once at module level:
```js
gsap.registerPlugin(ScrollTrigger);
```

---

## Scroll Mechanism

Both heroes use the same structural pattern:

```
<div class="hero-scroll-wrap">        ← height: 300vh, position: relative
  <section class="hero-sticky">       ← position: sticky, top: 0, height: 100vh
    [animation elements]
    [copy]
    [CTA]
  </section>
</div>
```

GSAP ScrollTrigger is attached to `.hero-scroll-wrap` with `pin: false` (the CSS sticky handles pinning). ScrollTrigger reads scroll progress (0→1) and drives a GSAP timeline `scrub: true`.

`prefers-reduced-motion`: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, skip ScrollTrigger entirely and show the Stage 3 (fully revealed) state statically.

Cleanup: `ScrollTrigger.kill()` and GSAP tweens killed on React unmount.

---

## NeoHero Component

**File:** `src/app.jsx` (new component, replaces `<HeroBanner>` in `<Home>` for neo theme only)

### Visual layers (back to front)

1. `neo-hero-grid` — CSS animated grid (existing pattern from `neo.css`)
2. `neo-hero-rings` — 3 chamfered polygon divs, centered right-of-copy
3. `neo-hero-core` — small chamfered square glowing at ring center
4. `neo-hero-scanline` — existing scanline animation
5. `neo-hero-hud` — 4 corner bracket divs (existing HUD pattern)
6. `neo-hero-copy` — eyebrow, h1, body, actions (same content as current HeroBanner)

### GSAP timeline (scroll 0→1)

| Progress | What changes |
|---|---|
| 0 | Rings at 60% of final size, copy opacity 0.15 |
| 0→0.6 | Rings scale to 100%, rotate ±15°, copy opacity 0.15→1 |
| 0.6→1 | Core glow intensifies, CTA fades in (opacity 0→1) |
| 1 | All at rest — hero unpins naturally via sticky scroll |

All animated properties: `scale`, `rotate`, `opacity` only.

### Placeholder ring shapes (CSS)

```css
.neo-ring {
  position: absolute;
  border: 1px solid rgba(204, 255, 0, 0.5);
  clip-path: polygon(8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%, 0 8%);
}
```

Three rings: 80px, 140px, 200px square. Centered at 62% left, 45% top within the sticky section.

---

## TrustHero Component

**File:** `src/app.jsx` (new component, replaces `<HeroBanner>` in `<Home>` for trust theme only)

### Visual layers (back to front)

1. `trust-hero-bg` — soft radial gradient (existing trust palette)
2. `trust-hero-orbit` — 2 concentric circle borders, centered right-of-copy
3. `trust-hero-nodes` — 3 node dots (Academy, Marketing, Labs)
4. `trust-hero-lines` — 3 SVG lines connecting center to each node
5. `trust-hero-labels` — 3 glass-style label cards (hidden until scroll > 0.7)
6. `trust-hero-copy` — eyebrow, h1, body, actions

### GSAP timeline (scroll 0→1)

| Progress | What changes |
|---|---|
| 0 | Nodes at center (translateX/Y: 0), labels opacity 0, copy opacity 0.2 |
| 0→0.5 | Nodes translate to final orbit positions, orbit ring scales 0.3→1 |
| 0.5→0.8 | Copy opacity 0.2→1, connection lines draw (scaleX 0→1) |
| 0.8→1 | Label cards fade in (opacity 0→1), CTA appears |

Node final positions (relative to orbit center):
- Academy: translateX(-60px) translateY(-70px)
- Marketing: translateX(70px) translateY(-30px)
- Labs: translateX(20px) translateY(75px)

All animated properties: `translateX`, `translateY`, `scaleX`, `opacity` only.

### SVG lines

Simple inline SVG with 3 `<line>` elements from center to each node final position. Animated via `drawSVG` plugin OR via `scaleX` on a `<div>` positioned along the vector (no extra plugin needed — use div approach).

---

## React Integration

```jsx
// In Home component — replace HeroBanner with themed hero
function Home({ theme }) {
  const sections = Object.values(DATA.sections);
  const copy = DATA.home[theme];
  return (
    <main>
      {theme === "neo"
        ? <NeoHero copy={copy} theme={theme} />
        : <TrustHero copy={copy} theme={theme} />}
      <MarketContext theme={theme} />
      <SuperSkills theme={theme} />
      ...
    </main>
  );
}
```

Each hero component:
- Accepts `copy` (eyebrow, title, accent, body) and `theme` props
- Uses `React.useRef` for the wrapper and sticky section
- Initializes GSAP in `React.useEffect` (runs after mount)
- Returns cleanup function from `useEffect` killing ScrollTrigger and tweens

---

## CSS

### `styles/neo.css` additions
- `.neo-hero-wrap` — `height: 300vh; position: relative`
- `.neo-hero-sticky` — `position: sticky; top: 0; height: calc(100vh - 68px - 46px); overflow: hidden`
- `.neo-ring` — chamfered clip-path, border, absolute positioning
- `.neo-hero-core` — small chamfered square, glow shadow
- `.neo-hero-hud-br` — corner bracket (reuse existing pattern)

### `styles/trust.css` additions
- `.trust-hero-wrap` — `height: 300vh; position: relative`
- `.trust-hero-sticky` — `position: sticky; top: 0; height: calc(100vh - 68px - 46px); overflow: hidden`
- `.trust-orbit-ring` — circle border, absolute positioned
- `.trust-node` — small circle, accent background, absolute
- `.trust-node-label` — glass card, border-radius, backdrop-filter light
- `.trust-connect-line` — thin div, rotated and scaled via GSAP

---

## What is NOT in scope

- Replacing the hero on section pages (Academy, Marketing, Labs) — those keep `HeroBanner`
- Particle systems, canvas, WebGL
- Mobile scroll-jacking (on mobile `max-width: 760px`, reduce wrapper to `200vh` and simplify)
- Any content changes — copy comes from `DATA.home[theme]` unchanged
- The Gateway split-screen — untouched

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Add 2 GSAP CDN script tags |
| `src/app.jsx` | Add `NeoHero`, `TrustHero` components; update `Home` to use them |
| `styles/neo.css` | Add hero scroll + ring styles |
| `styles/trust.css` | Add hero scroll + constellation styles |

No new files. No changes to `src/data.js`, gateway CSS, or any section pages.
