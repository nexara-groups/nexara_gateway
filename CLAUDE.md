# CLAUDE.md

This file provides guidance when working in this repository.

## Active Site

The active site is the server-reviewed multi-file static React/Babel prototype:

- `index.html` loads the app shell.
- `src/data.js` is the single content model.
- `src/shared.jsx` contains routing helpers, theme copy helpers and neutral interaction logic such as the brief-form hook.
- `src/neo.jsx` contains the gateway, Neo presentation system and legacy shared/Neo-styled views.
- `src/trust.jsx` contains the dedicated Trust presentation system.
- `src/app.jsx` is intentionally small and only handles hash routing plus root render.
- `styles/base.css`, `styles/gateway.css`, `styles/neo.css`, and `styles/trust.css` contain the active styling.

Root files such as `app.jsx`, `data.jsx`, `neo.jsx`, `trust.jsx`, `harness.css`, `neo.css`, and `trust.css` are legacy source notes. Do not treat them as production files unless explicitly asked.

## Running The Site

Run from the repository root:

```bash
python3 -m http.server 8090
```

Open `http://localhost:8090`.

External JSX is loaded by Babel, so use a local server. Do not rely on `file://`.

## Routing

The site uses hash routes:

- Gateway: `/`
- Theme home: `/#neo` or `/#trust`
- Sections: `/#neo/academy`, `/#trust/marketing`, `/#neo/labs`
- Subpages: `/#neo/academy/tracks`, `/#trust/marketing/web`, `/#trust/labs/security`
- Proof: `/#trust/customers`
- Company: `/#neo/company`
- Contact brief: `/#trust/contact/academy`, `/#neo/contact/labs`

Unknown pages should show the route-check fallback rather than silently masking broken links.

## Architecture

Nexara has one content model and two presentation systems:

- Neo: high-energy builder language and visual treatment.
- Trust: structured enterprise language and visual treatment.

Maintain this separation:

- Keep company facts, sections, proof records, contact channels and theme-aware copy in `src/data.js`.
- Keep Trust route coverage aligned with Neo by using `DATA.nav` and the same `DATA.sections` routes. Trust may use corporate labels through fields such as `trustLabel`, but it should not hide or fork Neo's route map.
- Keep cross-theme mechanics in `src/shared.jsx`; do not duplicate brief-form state, mailto generation, route parsing or generic copy helpers inside theme files.
- Put Neo/Gateway UI in `src/neo.jsx`.
- Put Trust UI in `src/trust.jsx`.
- Keep `src/app.jsx` as the router entry only. Do not add page components there.
- Because this is browser Babel without a bundler, do not use `import` or `export`. Add new JSX files as ordered `<script type="text/babel">` tags in `index.html`.

Preserve the three equal sections:

- Academy / Talent Programmes
- Digital Marketing / Digital Solutions
- Labs / AI & Automation

Do not add corporate, legal, or contact pages inside `DATA.sections`; keep them as top-level content.

## Content Rules

Nexara is now positioned as an incorporated company, but public copy must not invent legal identifiers, customer names, placement numbers, ROAS, uptime, accuracy, guarantees, or other measurable claims.

Until verified proof is approved, use delivery-model proof: cohorts, workflows, brief types, standards, and operating readiness.

If real incorporation details are provided later, add them to `DATA.company.facts` rather than hardcoding them in JSX.

## 3D Scroll Animations & Layout Pinning

- **Hero Scroll Runway**: The 3D scroll animations (`NeoHero` and `TrustHero` WebGL canvases) rely on GSAP ScrollTrigger tracking the `.neo-hero-wrap` and `.trust-hero-wrap` containers.
- **Scroll Height & Sticky CSS**: The wrappers MUST maintain `height: 300vh` on desktop viewports. The internal `.neo-hero-sticky` and `.trust-hero-sticky` panels use CSS `position: sticky; top: 0; height: 100vh; overflow: hidden;` to perform pinning natively.
- **No GSAP Pinning**: Do NOT use GSAP ScrollTrigger `pin: true` or `pinSpacing: true` on the hero wrappers. This causes structural collisions, collapses the height to viewport height, freezes WebGL animations, and creates large blank layout blocks beneath them.
- **Responsive Reset**: On mobile viewports (`max-width: 760px`), the wrapper height must fall back to `auto`, and the inner sticky panels must reset to `position: relative` and `height: auto`.
- **No Overflow-x Hidden on Site Wrapper**: Do NOT use `overflow-x: hidden` (or any style that alters `overflow-y` behavior) on the main `.site` container. This silently breaks child CSS `position: sticky` elements. Use `overflow-x: clip` to contain horizontal layout spillages safely.
- **Cache Busting**: When modifying stylesheets, update the `?v=...` query parameters in `index.html` `<link>` tags to prevent the browser from loading cached, outdated styles that override layout heights.
