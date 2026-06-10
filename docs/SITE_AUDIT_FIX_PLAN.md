# Nexara Gateway — Full Site Audit & Fix Plan

Audited 2026-06-10 on branch `neo-visual-refresh` (post hero-revert `690be93`, gateway motion `db8380c`).
Method: full content-model read (`src/data.js`), hardcoded-copy grep (`src/neo.jsx`, `src/trust.jsx`),
headless browser sweep of all 18 routes (console errors, DOM text, computed styles), full-page
screenshots of Neo home, Trust home, Neo marketing, Trust customers.

Route health: all routes render, 404 fallback works, zero console errors except the known
WebGL-unavailable fallback on `#neo` in headless environments.

---

## P1 — Trust / correctness issues (fix first)

### 1. ROI Estimator publishes invented money projections
`src/neo.jsx:3613` (`RoiEstimator`, rendered on marketing section, both themes).
Shows "Projected Impact (Monthly): $54,000"-style figures, a hardcoded ₹83 FX rate, and
"RECOMMENDED PLAN" tiers keyed to dollar thresholds. CLAUDE.md content rules forbid invented
ROAS/measurable claims. It also names packages that don't match `data.js`
("Brand Launch Package", "Website Growth Platform", "Full-Stack Demand System" vs
"Brand Launch", "Website Growth", "Demand System").
**Fix:** reframe as an explicit hypothetical scenario tool — rename to "Scenario sandbox",
add a visible "illustrative inputs, not a Nexara projection" disclaimer line, align package
names with `DATA.sections.marketing.packages`, or remove the component until verified
benchmarks exist.

### 2. "Within one business day" response promise
`src/trust.jsx:421` and `:885` — "Nexara confirms fit and next steps within one business day."
An operational SLA commitment published without verification.
**Fix:** soften to "Nexara responds with fit and next steps after review" or move the SLA to
`DATA.company.facts` once it's a real, owned commitment.

### 3. Scroll-reveal hides content when observers fail
`.tsx-fade` elements (Trust pages) are `opacity: 0` by default and only revealed by
IntersectionObserver. Full-page render shows the entire Trust home below the hero as gray
voids; any observer failure, print, or crawler sees blank sections.
**Fix:** progressive enhancement — keep elements visible by default in CSS, add a
`js-reveal-ready` class on the root from JS before arming animations, scope `opacity: 0`
under that class. Same pattern check for Neo's reveal classes.

### 4. Neo home dead scroll space without WebGL
The hero/unbox scroll runways keep their 300vh height when the WebGL canvas fails, leaving
huge black scroll-through-nothing zones (visible in headless full-page capture).
**Fix:** when the WebGL guard triggers, also collapse the wrap to `height: auto` / single
viewport and show the existing static fallback content. Keep CLAUDE.md pinning rules intact.

---

## P2 — Placeholder & dead-code cleanup

### 5. "Details coming soon." fallback copy
`src/neo.jsx:3166` — modal fallback for module details. `MODULE_DETAILS` covers all 12 module
titles, so it's dead defensive code, but the string ships in the bundle.
**Fix:** either delete the fallback (all keys covered) or write real generic copy
("Scope notes are prepared per enquiry.").

### 6. Seven dead NeoGuide selectors and their copy blocks
`src/neo.jsx:500–537` classifier list includes classes with no rendered component:
`.sandbox-action-btn`, `.toggle-deck`, `.checkbox-deck`, `.telemetry-card`,
`.blueprint-spec-box`, `.proof-rail`, `.stack-matrix` (plus `.sandbox-card`, `.sandbox`
wrappers). Their response-line blocks are unreachable.
**Fix:** delete the selectors and their `rotateLine` blocks.

### 7. Footer "Modules" column incomplete
Trust footer lists 5 of 9 modules: 3 Talent + 2 Digital, zero AI & Automation links, and the
Digital list is missing the growth subpage.
**Fix:** generate footer module links from `DATA.sections[*].subpages` instead of a
hardcoded list, so all three sections get equal coverage (per the equal-sections rule).

### 8. "© 2026 Nexara. Incorporated company."
Reads as placeholder legal identity in the Trust footer.
**Fix:** shorten to "© 2026 Nexara. All rights reserved." until the real registered entity
name is supplied; then add it via `DATA.company.facts`.

---

## P3 — AI-sounding copy (de-template the voice)

### 9. Duplicate signature phrase on the gateway
`data.js:11` kicker and `:13` body both end "…moves like the deadline is always tomorrow"
on the same panel. Classic generated-copy duplication.
**Fix:** rewrite the body's closing clause (e.g. "…from one team that ships before the
brief gets cold.").

### 10. Fake "1 of something" stats
`data.js` stats arrays each end with a padded unit stat: "1 portfolio-first model",
"1 measurable growth system", "1 workflow-first method"; Trust home adds "1 Partner,
All Areas". These read as AI filler dressed as metrics.
**Fix:** replace the fourth stat with a real countable (e.g. review cadence, number of
delivery stages already counted elsewhere) or drop to three stats per section.

### 11. Repeated scaffold strings across all packages
"Scoped after enquiry" ×9 and "Timeline confirmed in scope" ×8 — honest, but verbatim
repetition reads robotic on adjacent cards.
**Fix:** keep one canonical phrasing per section but vary the second line per package
("Priced per cohort size", "Priced per role pipeline", etc.) while staying claim-free.

### 12. Recycled Gen Z phrases
"no cap" (3×), "hits different" (2×), "screenshot" framing (2×), heavy em-dash density
across Neo copy. Voice is right; recycling is the tell.
**Fix:** one pass through `data.js` Neo strings swapping repeats for fresh equivalents;
cap each catchphrase at one use site-wide.

### 13. Trust boilerplate density
"clearly governed solution lines", "governance-ready reporting", "operating readiness"
cluster in adjacent sentences (home + unbox + sections).
**Fix:** editorial pass to vary the governance vocabulary; keep one governance term per
paragraph.

---

## P4 — Layout & visual polish

### 14. Module grid orphan rows (regression from hero revert)
4-card module grids render 3+1 on desktop (visible on `#neo/marketing`). The count-aware
grid fix (`37b2c4b`) was rolled back with the hero revert because it shared files.
**Fix:** re-apply just the CSS from `37b2c4b` (count-aware columns, single gutter, equal
heights) — it was independent of the hero.

### 15. Before/after "Slide to reveal" band renders mostly empty
On `#neo/marketing` the comparison band is a large dark area with sparse text until
interaction. Verify the legacy/standard panels have visible default states.

### 16. Orphaned CSS audit
After the revert + earlier dead-component cycles, `styles/neo.css` likely carries unused
classes again. Sweep for selectors with no JSX references once P2 lands (one pass, after
code deletions, not before).

---

## Suggested execution order

| Phase | Items | Effort |
|-------|-------|--------|
| 1 | #1 ROI reframe, #2 SLA soften, #9 dup phrase | small, copy + one component |
| 2 | #3 reveal robustness, #4 WebGL collapse | medium, CSS + guard logic |
| 3 | #5–#8 placeholder/dead-code/footer | small, mechanical |
| 4 | #10–#13 copy de-templating pass on `data.js` | medium, editorial |
| 5 | #14–#16 grid re-fix, band check, CSS sweep | small |

All fixes stay within the existing architecture rules: copy lives in `src/data.js`,
mechanics in `src/shared.jsx`, theme UI in `src/neo.jsx` / `src/trust.jsx`, cache-bust
`?v=` on any stylesheet change.
