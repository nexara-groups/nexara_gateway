# Neo Audit Findings — 2026-06-10

Audited `#neo`, `#neo/academy`, `#neo/marketing`, `#neo/labs` at 1440 / 760 / 390 (headless Chromium; WebGL unavailable there, hero canvas gracefully skipped).

## 1. Misaligned modules

- **"Inside X" grids** (`SectionOverview`, `.module-grid` at `src/neo.jsx:3735`): fixed `repeat(3,1fr)` (`styles/base.css:49`) with 4 cards on every section page → 4th card orphaned on row 2 (Campus Programmes / Performance Growth / Vault). Fix: count-aware columns.
- **Audience trios** (`AudienceFit`, `.module-grid.compact` at `src/neo.jsx:3875`): fixed `repeat(4,1fr)` (`styles/base.css:563`) with 3 cards → permanent dead 4th column, section reads narrow/unbalanced. Other `.compact` usages: `src/neo.jsx:3851` (SubpageDetail), `:3993`, `:4009` (Company). Fix: `auto-fit` columns so card count fills the row.
- Card heights within rows vary slightly where body text differs — needs equal-height flex column cards.

## 2. Mobile breaks (760 / 390)

- **None found**: `scrollWidth == innerWidth` on all four pages at both widths; single-column stacking correct. No overlap observed.

## 3. Jank / robustness notes

- Headless capture shows `.section-reveal` content invisible until IntersectionObserver fires — if observers fail (old browser, JS error mid-load), home sections (`SectionCards`, `SuperSkills`, `MarketContext`, `HomeProof`) stay invisible. Harden: CSS-only fallback so content is visible without JS observers (e.g., reveal class defaults visible when `HAS_SCROLL_ANIMATION` is false — verify path exists).
- Console: clean on all pages except expected Babel dev warning. Hero WebGL guard works (graceful skip).
- Sparkles observer targets `.neo-hero-sticky` (`src/neo.jsx:51`) — after hero rebuild removes Sparkles from hero, observer must repoint to its own container.

## 4. Section wrapper (for Task 6)

`SectionPage` (`src/neo.jsx:3259`) returns bare `<main>` with no per-section class → add `data-section={section.id}` to `<main>`.
