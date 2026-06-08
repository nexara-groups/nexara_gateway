# Trust Theme — Editorial Light Visual Upgrade

**Date:** 2026-06-08  
**Scope:** Full Trust experience — home page + all section pages  
**Direction:** Editorial Light (Option B) — authoritative, serif-anchored, structured. Distinct from Neo (dark/techy). No glassmorphism, no dashboard panels.

---

## Context

Neo already owns the dark/data-dense/energy-forward register. Trust must read as the opposite: light, structured, corporate — like a consulting firm's digital presence. The current Trust theme is functional but collapses into a long vertical stack of plain text, tables, and list elements with no visual rhythm or hierarchy. This upgrade introduces component-level structure without changing content or routing.

---

## Design Language

- **Typography anchor:** Libre Baskerville serif for large numbers and section headings (already loaded). Poppins/Plus Jakarta Sans for body, labels, nav.
- **Colour register:** White/light-slate backgrounds. `#0F4C81` (trust navy) as the only accent. `#0f172a` (near-black) for heading text. No dark sections except the existing hero and CTA band.
- **Structural device:** Left-border accent (`3px solid #0F4C81`) on any block with an editorial label above it — signals authority without decoration.
- **Number treatment:** Large serif numerals (`font-family: Georgia/Libre Baskerville; opacity: 0.25–0.35`) as decorative anchors on cards and step indicators.
- **Module chips:** Deliverable tags and area badges use `background: #f8fafc; border: 1px solid #e2e8f0` (neutral) or `background: #eff6ff; color: #0F4C81; border: 1px solid rgba(15,76,129,.2)` (accent). No rounded pill shapes — use `border-radius: 4px` (squared).

---

## Home Page Changes

### 1. Proof Strip → Anchor Stats Band (`TrustProofStrip`)

Replace the label + chip row with a 4-column stat row. Each cell: large bold number/word + small uppercase label below. Separated by `1px` vertical dividers.

| Stat | Label |
|------|-------|
| 3 | Solution Lines |
| 9 | Capability Modules |
| Brief | Driven Delivery |
| 1 | Partner, All Areas |

Implementation: replace `.tsx-proof-inner` content. No new component needed — restyle in place.

### 2. Feature Strip → Numbered Governance Cards (`TrustFeatureStrip`)

Replace icon + text blocks with 4-column card grid. Each card has:
- **Header strip** (dark navy `#0F4C81` or near-black `#0f172a`, alternating): large muted serif number (01/02/03/04) + small uppercase category label in white
- **Body**: bold title + body text, white background

Remove SVG icons entirely — the numbered header replaces them. Map existing `DATA.company.standards` content unchanged.

### 3. Enterprise Stacks → Capability Matrix (`TrustEnterpriseStacks`)

Replace 5-column card grid with a single bordered accordion-table. Each row:
- `32px` wide left cell: large muted serif number
- Centre: stack title + short description  
- Right: section tag pills (Academy / Marketing / Labs)
- First row renders expanded: shows module chips below the main row in a `#fafbff` tinted sub-row
- Remaining rows collapsed by default (visual only — no JS accordion needed; just show one row expanded in the layout)

### 4. Market Context (`TrustMarketContext`)

Minor upgrade only:
- Add `border-left: 3px solid #0F4C81` + eyebrow label "OPERATING REGION" above the heading
- City pills: first city uses `background: #0f172a; color: #fff` (primary city emphasis). Others stay `#f1f5f9` neutral.

---

## Section Page Changes (`TrustSectionOverview`)

Applied to all three sections: Academy, Marketing, Labs.

### 5. Deliverables Table → Card Rows

Replace `<table class="tsx-del-table">` with a bordered card-row list. Each row:
- 3-column grid: `120px` area column | `1fr` deliverable chips | `auto` outcome badge
- Alternating row tint: `#fff` / `#fafbff`
- Deliverables rendered as individual chips (`border-radius: 4px`, `#f8fafc` background) not dot-separated text
- Outcome rendered as a filled accent badge (`background: #eff6ff; color: #0F4C81; border: 1px solid rgba(15,76,129,.2)`)

New component: `TrustDeliverableRows` (replaces the `<table>` block inside `TrustSectionOverview`).

### 6. Process List → Connector Timeline

Replace `<ol class="tsx-process-list">` with a vertical timeline. Each step:
- Left column (40px): numbered square badge (`border-radius: 6px`, step 1 = `#0F4C81` navy, step 2+ = `#0f172a` near-black, white serif number) + vertical connector line (`1px solid #e2e8f0`) below, omitted on final step
- Right column: bold title + body text

New component: `TrustProcessTimeline` (replaces the `<ol>` block).

### 7. Packages → Tiered Pricing Cards (`TrustPackageCards`)

Replace `.tsx-packages-grid` cards with 3-column tier layout. Middle card (index 1) is featured:
- Featured card: `border: 2px solid #0F4C81`, "Most Common" label badge pinned top-center (`position: absolute`, navy background)
- All cards: structured header (fit label + name + duration) / body (includes list with `—` dashes) / footer (CTA text)
- Non-featured: `border: 1px solid #e2e8f0`

Replace `.tsx-package-card` in place; no routing changes.

### 8. Proof Table → Case Study Strips

Replace second `<table class="tsx-del-table">` (proof section) with horizontal case study strips. Each strip:
- `border-left: 3px solid #0F4C81` accent
- 3-column grid: engagement name (bold, large) | delivery description | area pill

New component: `TrustProofStrips` (replaces the proof `<table>` block).

### 9. FAQ → Numbered Accordion

Replace `.tsx-faq-list details` with styled FAQ items. Each item:
- **Closed state:** white background, `border: 1px solid #e2e8f0`, serif counter (01/02) in muted slate, bold question, `+` indicator right
- **Open state:** `border: 1px solid rgba(15,76,129,.25)`, header tint `#fafbff`, answer in indented panel, `−` indicator
- Toggle via React `useState` — one open at a time (no native `<details>`)

Replace `.tsx-faq-list` block in `TrustSectionOverview`.

---

## What Does NOT Change

- Hero (`TrustHeroFlat` / `TrustParticleCanvas`) — already strong
- Nav (`TrustNav`) — already clean
- CTA band (`TrustCTABand`) — already works
- Section header + spec panel (`TrustSectionHeader`) — keep as-is
- Sub-nav tabs (`TrustSubNav`) — keep as-is
- Subpage cards (`TrustSubpageDetail`) — keep as-is
- Contact page — out of scope
- Customers page — out of scope
- Company page — out of scope
- Routing, data model, theme switching — untouched

---

## Files Modified

| File | Changes |
|------|---------|
| `src/trust.jsx` | Restyle `TrustProofStrip`, `TrustFeatureStrip`, `TrustEnterpriseStacks`, `TrustMarketContext`; add `TrustDeliverableRows`, `TrustProcessTimeline`, `TrustPackageCards`, `TrustProofStrips`; refactor FAQ in `TrustSectionOverview` |
| `styles/trust.css` | New `.tsx-` utility classes for stat band, governance cards, matrix rows, timeline steps, tier cards, case study strips, FAQ items |

No changes to `src/data.js`, `src/app.jsx`, `src/shared.jsx`, `src/neo.jsx`, `index.html`.
