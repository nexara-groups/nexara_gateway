# Audit Fix Handoff

Date: 2026-06-10
Branch: `neo-visual-refresh`

## Scope Fixed

This pass addresses the audit items around claim integrity, hidden-content fragility, templated copy, Trust contrast, and layout regressions. Validation is intentionally deferred for AGY as requested.

## Content Integrity

- Reframed the Neo ROI Estimator into a scenario sandbox.
- Removed claim-like labels such as `Projected Impact (Monthly)`, `CONVERTED GROW-VALUE`, and `RECOMMENDED PLAN`.
- Added visible disclaimer copy stating the calculator is illustrative and based only on user inputs.
- Aligned recommendation copy to existing package names: Brand Launch, Website Growth, and Demand System.
- Removed the hard SLA promise `within one business day` from Trust CTA copy.
- Replaced placeholder footer copy `Incorporated company` with a neutral rights statement.
- Removed placeholder modal fallback copy such as `Details coming soon`.

## Editorial Cleanup

- Reduced repeated or templated phrases in `src/data.js`.
- Replaced fake fourth stats such as `Partner, All Areas` and `portfolio-first model` with concrete service/package stats.
- Reduced repeated package pricing/duration language across Academy, Digital Marketing, and Labs.
- Softened over-absolute AI claims around hallucinations, governance, and verified outcomes.
- Removed remaining recycled Neo guide phrases tied to the old ROI promise.

## Trust Experience

- Made Trust reveal animations progressive-enhancement safe.
- Trust content now remains visible unless JS has explicitly armed reveal states.
- Added a timed fallback that reveals Trust content if IntersectionObserver stalls.
- Expanded the Trust footer module links to use all data-driven subpages, including AI & Automation links.
- Updated Trust visual language away from mostly white SaaS styling:
  - Deep navy hero.
  - Off-white and blue-gray section bands.
  - Amber enterprise CTA accents.
  - Stronger card borders and quieter editorial depth.
  - Dark contrast band for enterprise stacks.
- Added mobile Trust hero constraints to prevent headline/card overflow.

## Neo Experience

- Added WebGL failure fallback classes for Neo and Trust hero runways so unavailable WebGL does not leave long blank scroll sections.
- Re-applied module grid normalization so four-card module grids do not render as a `3 + 1` orphan layout on desktop.
- Removed dead NeoGuide selector and interaction branches for removed UI elements.
- Set the before/after slider default state to centered instead of an extreme edge.

## Files Changed

- `index.html`
- `src/data.js`
- `src/neo.jsx`
- `src/trust.jsx`
- `styles/base.css`
- `styles/neo.css`
- `styles/trust.css`
- `docs/AUDIT_FIX_HANDOFF.md`

## Validation For AGY

Please validate after pulling:

- Gateway route renders.
- Neo home and Neo section/subpage routes render.
- Trust home and all Trust section/subpage routes render.
- 404 fallback still works.
- Trust content remains visible with JS disabled or IntersectionObserver failure.
- Trust mobile hero has no horizontal overflow at narrow widths.
- Neo ROI copy does not contain old projection/recommendation labels.
- Trust CTA copy does not contain the old one-business-day SLA.
- Trust footer includes all modules, including AI & Automation.
- Module grids no longer produce a desktop `3 + 1` orphan layout.

## Note

I started local validation but stopped it before completion per request. No final validation result is claimed in this handoff.
