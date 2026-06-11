# HD Visual Feast — Design Spec (2026-06-11)

Approved direction: **Full cinematic** — design-system depth pass plus signature showpiece
moments across Gateway, Neo, and Trust. Branch `neo-visual-refresh`.

## Goals

- Visibly higher-definition surfaces: texture, depth, light, typographic rhythm.
- Three showpiece moments: Gateway portal, Neo home atmosphere, Trust premium editorial.
- Zero regressions to hero scroll pinning, routing, or content rules.

## Shared foundation (`styles/base.css`)

- Elevation tokens: `--elev-1/2/3` layered shadow stacks (theme-tintable via `--elev-tint`).
- Radius tokens: `--r-sm/md/lg`.
- Film-grain: reusable `.grain-layer` using inline SVG `feTurbulence` data-URI,
  low opacity, `pointer-events:none`.
- Scroll reveal, progressive enhancement: elements visible by default. JS adds
  `js-reveal-ready` to the theme root before arming IntersectionObserver; only under
  that class do `.tsx-fade`-style elements start at `opacity:0`. Observer failure,
  print, crawlers always see content (closes audit #3 pattern).
- `prefers-reduced-motion: reduce` disables all new animation.

## Gateway (`styles/gateway.css`, gateway component in `src/neo.jsx`)

- Aurora backdrops: Neo panel gets drifting lime/cyan plasma (layered radial gradients,
  slow `transform` animation); Trust panel gets soft sky/indigo light veil.
- Grain layer on both panels.
- Glowing center seam where the clip-paths meet (gradient rule, subtle pulse).
- Mouse parallax: pointer position drives `--mx/--my` CSS vars on the gateway root;
  panel content translates a few px. rAF-throttled, disabled on touch/reduced-motion.
- Brand mark shimmer (background-clip gradient sweep) and hover bloom behind the
  route-preview list.
- Existing entrance/exit choreography preserved.

## Neo (`styles/neo.css`, `src/neo.jsx`)

- Atmosphere system: grain + 2–3 drifting aurora blobs (lime/cyan/magenta) behind home
  and section heroes; angled glow seams between major bands.
- Hero: chromatic double-glow on the core, CSS particle specks layer, richer ring
  shading (gradient borders / conic masks).
- Cards: gradient-border glass treatment (padding-box/border-box double background);
  spotlight hover extended to all card families.
- Gradient-ink display treatment on key section H2s.
- Audit #14: re-apply count-aware module grid so 4-card grids never orphan 3+1.
- Audit #15: before/after band gets a visible default state.

## Trust (`styles/trust.css`, `src/trust.jsx`)

- Premium editorial: layered soft shadow system, tinted-surface + hairline hierarchy.
- Libre Baskerville serif italics for pull-quote/eyebrow accent moments (font already
  loaded, currently unused).
- Richer hero light veil; glass nav (saturated backdrop-blur).
- Dark bands (callout, play-sequence) → deep navy gradient + faint grid texture.
- Reveal animations migrate behind the `js-reveal-ready` guard.

## Hard constraints

- Hero pinning rules untouched: 300vh wrappers, CSS sticky panels, no GSAP pin,
  mobile resets to `auto`/`relative`.
- `.site` keeps `overflow-x: clip`; never `hidden`.
- No new copy, claims, or data; presentation only. Content stays in `src/data.js`.
- No `import`/`export` — browser Babel; code stays in existing files.
- Cache-bust `?v=` on every touched stylesheet in `index.html`.

## Implementation order

1. base.css foundation (tokens, grain, reveal guard).
2. Gateway showpiece.
3. Neo atmosphere + cards + audit #14/#15.
4. Trust editorial pass.
5. Cache-bust, headless route sweep + screenshots to verify.

## Verification

- All 18 hash routes render with zero new console errors.
- Content visible with JS observers disabled (reveal guard).
- Reduced-motion media query silences new animation.
- Mobile (≤760px) keeps existing resets; no horizontal scroll.
