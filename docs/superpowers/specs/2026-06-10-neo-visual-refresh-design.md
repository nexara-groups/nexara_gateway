# Neo Visual Refresh — Design Spec

Date: 2026-06-10
Status: Approved by user (brainstorm session)
Scope: Neo theme — home + section pages (Academy, Marketing, Labs). Subpages receive bug fixes only.

## Goals

1. Rebuild the Neo home hero as a scroll-driven product unveil ("Nexara Core").
2. Realign and visually unify modules on home and the three section pages.
3. Fix animation jank and mobile layout breaks.

Out of scope: Trust theme, gateway, subpage redesign, content/copy changes, new routes.

## 1. Hero: «Nexara Core» product unveil

Replaces the current `NeoHero` torus-knot particle hero in `src/neo.jsx`.

### Concept

An abstract product — a dark monolith that splits into three modules (one per Nexara section) and reassembles into a glowing core — scrubbed frame-by-frame by scroll. The assembly is the company story: three engines, one company.

### Scroll timeline (GSAP timeline scrubbed by ScrollTrigger progress)

| Progress | Beat | Visual |
|---|---|---|
| 0% | Tease | Dark monolith silhouette, single breathing light seam, headline beside it |
| ~35% | Split open | Monolith splits into 3 floating modules with accent edge light + small labels: Academy (violet), Marketing (mint), Labs (coral) |
| ~70% | Assemble | Modules rotate, slide, dock; seam lines flash white on lock |
| 100% | Reveal | Assembled core powers up (full glow, slow idle rotation); wordmark + CTAs fade in; page continues |

### Visual dressing

Deep-void radial backdrop (the approved earlier treatment): dark navy radial gradient, restrained glow. Accent palette: violet `#7c5cff` (Academy), mint `#00e5a0` (Marketing), coral `#ff5c8a` (Labs).

### Engineering constraints (binding — from CLAUDE.md)

- Three.js r128 (already loaded). Beveled-box module geometry + emissive edge highlights. Real-time render; no image-sequence frames.
- GSAP timeline + ScrollTrigger `scrub`; **no `pin: true` / `pinSpacing`** — pinning is CSS `position: sticky` inside a `300vh` `.neo-hero-wrap` runway.
- Mobile ≤760px: runway height `auto`, sticky panel resets to `position: relative; height: auto`; static assembled-core frame, no scrub.
- `prefers-reduced-motion`: skip scrub, render final assembled stage (beat 4) statically.
- WebGL failure: catch and skip — page renders without hero canvas (existing pattern preserved).
- Renderer DPR capped at 2. No postprocessing passes.
- Bump `?v=` cache-busting params in `index.html` for touched stylesheets.

## 2. Module realignment — home + section pages

Pages: `/#neo`, `/#neo/academy`, `/#neo/marketing`, `/#neo/labs`.

- Audit first: headless-browser screenshots at 1440 / 760 / 390px widths; list misaligned modules before editing.
- Normalize to one grid system: consistent gutters, equal card heights within a row, one spacing scale.
- Unify hierarchy: one eyebrow / heading / body rhythm across `ModuleCard`, `SectionCards`, `SuperSkills`, `NexaraUnbox`.
- Section accent colors mirror the hero mapping (Academy violet, Marketing mint, Labs coral) so the hero story carries into page modules.
- Replace modules that cannot be realigned cleanly; keep content sourced from `DATA` in `src/data.js` — no copy invention, no measurable-claim copy (project content rules).

## 3. Animation fixes

- All section reveals route through the existing `useNeoSectionReveal` hook — single system, no scattered animation code.
- Animations use transform/opacity only; no layout-triggering properties.
- Marquee and sparkles: throttle, reduce layers to kill jank.
- Mobile ≤760px: fix overflow/overlap breaks; honor hero runway reset rules.
- `prefers-reduced-motion` respected in every animated component.
- No `overflow-x: hidden` on `.site` (breaks sticky); use `overflow-x: clip` if containment needed.

## Architecture / file boundaries

- Hero + Neo UI changes live in `src/neo.jsx`.
- Styling in `styles/neo.css` (+ `styles/base.css` only if a shared token must change).
- No changes to `src/app.jsx` routing, `src/shared.jsx` mechanics, or `src/data.js` structure beyond reading existing fields.
- No `import`/`export` — browser Babel constraint stands.

## Verification

- Run `python3 -m http.server 8090`; headless-browser pass on all four pages at 1440 / 760 / 390px.
- Hero: scrub forward + backward smoothly; no blank space below hero; mobile static fallback renders; reduced-motion shows final stage.
- Modules: aligned grids at all three widths; no horizontal overflow.
- Unknown routes still show route-check fallback.
