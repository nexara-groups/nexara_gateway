# Repository Guidelines

## Project Structure & Module Organization

This repository contains a static React/Babel prototype for the Nexara gateway site. The entry point is `index.html`, which loads shared data from `src/data.js`, neutral helpers from `src/shared.jsx`, the Neo/Gateway presentation from `src/neo.jsx`, the Trust presentation from `src/trust.jsx`, and the small router entry from `src/app.jsx`.

Maintain one content model and two presentation systems:

- `src/data.js`: company facts, sections, proof records, contact channels and theme-aware copy.
- `src/shared.jsx`: route helpers, theme copy helpers and cross-theme interaction logic such as the brief-form hook.
- `src/neo.jsx`: Gateway and Neo UI.
- `src/trust.jsx`: Trust UI.
- `src/app.jsx`: hash routing and root render only.

This is browser Babel without a bundler, so do not use `import` or `export`. Add any new JSX file through an ordered `<script type="text/babel">` tag in `index.html`.

Legacy prototype files remain at the repository root: `app.jsx`, `data.jsx`, `neo.jsx`, `trust.jsx`, `harness.css`, `neo.css`, and `trust.css`. Treat them as source notes. Design rationale and specs are under `docs/superpowers/specs/`.

## Build, Test, and Development Commands

- Run locally: `python3 -m http.server 8090`, then visit `http://localhost:8090`.
- Open routes: `/#neo/academy/tracks`, `/#trust/labs/security`, or `/#trust/marketing/web`.
- Search code: `rg "Gateway" src/neo.jsx styles` or `rg "sections" src/data.js`.

There is no `package.json`, dependency install, bundler, or formal build step. External JSX requires a local server; do not rely on `file://`.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JSX blocks. Keep JavaScript components in PascalCase and state variables in camelCase. Put shared layout rules in `styles/base.css`, gateway rules in `styles/gateway.css`, and theme-specific rules in `styles/neo.css` or `styles/trust.css`.

The site intentionally maintains one content model with two visual systems. Keep content in `src/data.js`; use `src/neo.jsx` and `styles/neo.css` to make Neo bold/high-energy, and `src/trust.jsx` and `styles/trust.css` to make Trust subtle/enterprise. Preserve the same route coverage for both themes through `DATA.nav` and `DATA.sections`; Trust can use corporate labels such as Talent Programmes, Digital Solutions, and AI & Automation, but it should not fork or hide the Neo route map.

## Testing Guidelines

No automated test framework is configured. Verify changes manually in the browser across Gateway, Neo, and Trust modes. Check section routes and subpage routes at desktop and mobile widths, especially text wrapping, sticky nav, hero animations, and hash routing.

## Commit & Pull Request Guidelines

This checkout is not a Git repository, so no local commit history is available to infer message conventions. Use concise imperative commit subjects if this is later placed under Git, for example `Update gateway mobile layout`.

Pull requests should include a short summary, screenshots for visual changes, the browsers or viewport sizes tested, and links to any relevant design spec in `docs/superpowers/specs/`.

## Agent-Specific Instructions

- Read `CLAUDE.md` before significant edits, but note the active site has intentionally moved to a server-reviewed multi-file structure with separate `shared`, `neo`, `trust`, and router entry files. Keep the gateway as the launch entry.
- **Maintain Hero 3D Scroll Alignment**: The 3D scroll animations in `NeoHero` and `TrustHero` require a `300vh` height runway container (`.neo-hero-wrap`/`.trust-hero-wrap`) and CSS `position: sticky; top: 0; height: 100vh;` for pinning. Never use ScrollTrigger `pin: true` or `pinSpacing` on these wraps, as it collapses wrapper height to `100vh` or `auto`, breaks animations, and leaks blank blocks below.
- **Prevent Overflow-x from Breaking Sticky**: Never use `overflow-x: hidden` on parent elements like `.site` container, as it forces `overflow-y` to evaluate to `auto` and breaks child `position: sticky` pinning. Use `overflow-x: clip` instead to contain horizontal spillages.
- **Cache Busting**: Always increment stylesheet version query strings in `index.html` (e.g. `styles/neo.css?v=...`) to bypass browser caching of layout styles when editing CSS.
