# Trust Theme — Codex Implementation Plan
**Status:** Implemented — ready for Claude review  
**Reviewer:** Claude (reviews only, flags issues, does not implement)  
**Implementer:** Codex  
**Site:** `/Users/naveengalla/Documents/Claude/nexara-gateway/`  
**Run server:** `python3 -m http.server 8090` → `http://localhost:8090`

---

## Architecture Constraints — Read Before Touching Anything

- Browser Babel, no bundler, no `import`/`export`. The active React files are loaded directly from `index.html`: `src/shared.jsx`, `src/neo.jsx`, `src/trust.jsx`, then `src/app.jsx`.
- All CSS scoped under `.trust` prefix. New Trust components use `tsx-` class prefix.
- `DATA` = `window.NEXARA` loaded from `src/data.js`.
- Routing via `routeTo(theme, page, detail)`. Trust routes: `#trust`, `#trust/labs`, etc.
- `useMemo` and `useState` are globally destructured at line 1: `const { useMemo, useState } = React;`
- `useEffect` and `useRef` must be accessed via `React.useEffect`, `React.useRef`.
- After every implementation round, bump `?v=` cache string in `index.html` for all active CSS and JSX/data script references.
- **Do NOT touch** any `function Site`, `NeoSite`, Neo components, `SectionPage`, `AcademyHero`, `NeoGuide`, or any component above line 1830 in `app.jsx` unless explicitly instructed.

---

## What Is Already Built — Do Not Rebuild

| Route | Component | Status |
|---|---|---|
| `#trust` | `TrustHome` | ✅ Done |
| `#trust/labs` | `TrustSectionPage` | ✅ Done |
| `#trust/academy` | `TrustSectionPage` | ✅ Done |
| `#trust/marketing` | `TrustSectionPage` | ✅ Done |
| `#trust/labs/products` etc. | `TrustSubpageDetail` | ✅ Done |
| Nav | `TrustNav` | ✅ Done |
| Footer | `TrustFooter` | ✅ Done |

## What Needs To Be Built

| Route | Component | Priority |
|---|---|---|
| `#trust/customers` | `TrustCustomers` | ✅ Implemented |
| `#trust/company` | `TrustCompany` | ✅ Implemented |
| `#trust/contact` | `TrustContact` | ✅ Implemented |

---

## Design System Reference

All new components must use these CSS tokens and class patterns. Never use Neo class names (`.module-card`, `.fact-strip`, `.hero-banner`, `.module-grid`, `.section-card`, `.orb`, `.scanlines`).

**Fonts:** `font-family:'Poppins','Plus Jakarta Sans',sans-serif` for headings, `font-family:'Inter','Plus Jakarta Sans',sans-serif` for body.

**Colors (CSS vars, already defined under `.trust`):**
- `var(--tsx-accent)` = `#0F4C81`
- `var(--tsx-accent-mid)` = `#1A5F9B`
- `var(--tsx-accent-fg)` = `#EFF6FF`
- `var(--tsx-hero-bg)` = `#0A0F1E`
- `var(--text)` = `#0F172A`
- `var(--muted)` = `#475569`
- `var(--line)` = `#E2E8F0`
- `var(--soft)` = `#F1F5F9`

**Layout containers (already in trust.css):**
- `.tsx-section-inner` — `max-width:1200px; margin-inline:auto; padding-inline:clamp(20px,5vw,80px)`
- `.tsx-section-heading` — Poppins 700, `clamp(1.75rem,3vw,2.5rem)`, `color:var(--text)`
- `.tsx-section-eyebrow` — 11px, uppercase, `color:var(--tsx-accent)`
- `.tsx-del-table` — enterprise data table
- `.tsx-capability-list` + `.tsx-capability-item` — numbered spec rows
- `.tsx-intake-band` — bottom CTA band
- `.tsx-btn-cta` — filled accent button
- `.tsx-fade` + `.tsx-fade-d1..d4` — scroll-triggered fade-in (already wired in TrustSite useEffect)

**Section header pattern (already in trust.css):**
- `.tsx-sec-header` > `.tsx-sec-header-inner` (2-col grid: content + spec panel)
- `.tsx-sec-h1`, `.tsx-sec-eyebrow`, `.tsx-sec-body`, `.tsx-sec-actions`
- `.tsx-spec-panel` > `.tsx-spec-panel-label` + `.tsx-spec-row` (`.tsx-spec-label` + `.tsx-spec-value`)

---

## Task 1 — `TrustCustomers`

### Insert location
Trust components now live in `src/trust.jsx`. Insert Trust-only pages immediately before `function TrustSite({`.

### Wire-up in TrustSite
Find this line in `TrustSite`:
```jsx
{page === 'customers' && <Customers theme="trust" detail={detail} />}
```
Replace with:
```jsx
{page === 'customers' && <TrustCustomers detail={detail} />}
```

### Data
```
DATA.customers → array of { id, section, company, neo, trust }
DATA.sections[id].name → section display name
```

### Layout spec

```
TrustCustomers({ detail })
  ├── Page header (.tsx-sec-header > .tsx-sec-header-inner)
  │     Left:
  │       eyebrow: detail ? `${DATA.sections[detail].name} — Proof` : "Operating Proof"
  │       h1: "Readiness proof across all three sections."  (no em, no gradient)
  │       body: DATA copy → "Each proof card is framed as a delivery model,
  │             not an invented customer claim."
  │     Right: spec panel (.tsx-spec-panel)
  │       label: "Coverage"
  │       rows: [["3", "sections covered"], ["3", "proof records"], ["0", "invented claims"]]
  │
  ├── Proof table (.tsx-section-inner, padding-top 48px)
  │     heading (.tsx-section-heading): "Delivery model proof"
  │     table (.tsx-del-table, same class as deliverables table):
  │       thead: Section | Engagement type | What was produced
  │       tbody: map DATA.customers → one row each
  │         td[0]: customer.section
  │         td[1]: customer.company
  │         td[2]: customer.trust
  │     If detail is set, filter DATA.customers to only that section.id
  │
  └── Intake band (.tsx-intake-band, margin-top 48px)
        heading: "Start a scoped engagement"
        sub: "Submit a brief. Nexara maps the appropriate next step."
        button .tsx-btn-cta: "Submit a brief" → routeTo('trust','contact')
```

### CSS to add to trust.css
No new classes needed — reuse `.tsx-del-table`, `.tsx-sec-header`, `.tsx-section-inner`, `.tsx-intake-band`.

---

## Task 2 — `TrustCompany`

### Insert location
Immediately after `TrustCustomers` in `src/trust.jsx`, before `function TrustSite({`.

### Wire-up in TrustSite
Find:
```jsx
{page === 'company'   && <Company theme="trust" />}
```
Replace with:
```jsx
{page === 'company'   && <TrustCompany />}
```

### Data
```
DATA.company.facts    → [["Status","Incorporated company"], ...]
DATA.company.trust    → { manifesto, principles: [{ title, body }] }
DATA.company.standards → [{ title, body }]
```

### Layout spec

```
TrustCompany()
  ├── Page header (.tsx-sec-header > .tsx-sec-header-inner)
  │     Left:
  │       eyebrow: "About Nexara"
  │       h1: "The operating idea is simple."  (no em, no gradient)
  │       body: DATA.company.trust.manifesto
  │     Right: spec panel
  │       label: "Company facts"
  │       rows: map DATA.company.facts → { label: fact[0], value: fact[1] }
  │             (.tsx-spec-label for label, but value is text not a number —
  │              render as font-size:13px color:var(--text) font-weight:600
  │              instead of .tsx-spec-value which is oversized for text)
  │
  ├── Principles section (.tsx-section-inner, padding-top 48px)
  │     heading: "Operating principles"
  │     capability list (.tsx-capability-list):
  │       map DATA.company.trust.principles → .tsx-capability-item
  │         .tsx-cap-index: zero-padded index (01, 02...)
  │         .tsx-cap-body > strong: principle.title
  │         .tsx-cap-body > p: principle.body
  │
  ├── Standards section (.tsx-section-inner)
  │     heading: "Delivery governance"
  │     table (.tsx-del-table):
  │       thead: Standard | Commitment
  │       tbody: map DATA.company.standards
  │         td[0]: <strong>{item.title}</strong>
  │         td[1]: {item.body}
  │
  └── Intake band (.tsx-intake-band)
        heading: "Work with Nexara"
        sub: "Start with a scoped brief for any of the three sections."
        button: "Submit a brief" → routeTo('trust','contact')
```

### CSS additions to trust.css
Add one rule — the fact panel value needs a text variant of tsx-spec-value:
```css
.trust .tsx-spec-value-text{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:var(--text);text-align:right}
```
Use `.tsx-spec-value-text` for company facts (text values like "Incorporated company"), keep `.tsx-spec-value` for numeric values only.

---

## Task 3 — `TrustContact`

### Insert location
Immediately after `TrustCompany` in `src/trust.jsx`, before `function TrustSite({`.

### Wire-up in TrustSite
Find:
```jsx
{page === 'contact'   && <Contact theme="trust" detail={detail} />}
```
Replace with:
```jsx
{page === 'contact'   && <TrustContact detail={detail} />}
```

### ⚠️ FLAG — Critical constraint
The existing `Contact` component contains a full brief-builder form with `useState` form state, field validation, `handleChange`, `handleLaneSelect`, `handleSubmit`, and `mailto:` generation logic (approximately lines 4496–4740 in app.jsx). **Do NOT rewrite this logic.**

Strategy: Extract the form logic into a shared `useBriefForm(detail)` hook or keep the inline form state. Build `TrustContact` as a new component that reimplements the same form state and handlers but uses Trust-styled JSX. Copy the state initialization and handler functions verbatim — only the JSX and className attributes change.

### Data
```
DATA.contact.trust    → { eyebrow, title, accent, body, primary }
DATA.contact.channels → [{ title, section, body }]
DATA.contact.enquiry  → { title, body, label, href }
DATA.contact.checklist → [string]
```

### Layout spec

```
TrustContact({ detail })
  State: same as existing Contact — formData, handleChange, handleLaneSelect,
         handleSubmit, showSuccess (copy verbatim from Contact component)

  ├── Page header (dark navy band — .tsx-contact-hero)
  │     Full-width, background: var(--tsx-hero-bg)
  │     padding-block: clamp(64px,8vw,96px)
  │     .tsx-section-inner inside
  │     eyebrow (.tsx-cta-eyebrow): DATA.contact.trust.eyebrow
  │     h1 (.tsx-contact-h1): DATA.contact.trust.title  — Poppins 700, color:#F0F6FF
  │     p: DATA.contact.trust.body — color:rgba(240,246,255,.6)
  │     email pill (.tsx-email-pill): DATA.contact.trust.accent
  │       → <a href="mailto:..."> styled as pill button
  │
  ├── Channel selector (.tsx-section-inner, padding-top 48px)
  │     heading: "Select a section"
  │     4 cards (.tsx-channel-grid — 2x2 grid on desktop, 1-col on mobile)
  │       each card (.tsx-channel-card, active state .tsx-channel-card.active):
  │         title: channel.title
  │         body: channel.body
  │         onClick: handleLaneSelect(channel.section)
  │         active when formData.section === channel.section
  │
  ├── Brief form (.tsx-section-inner — only visible once a channel is selected)
  │     heading: DATA.contact.enquiry.title
  │     2-column grid: left = form fields, right = checklist panel
  │
  │     Left — form fields (.tsx-brief-form):
  │       Each field group (.tsx-field):
  │         label (.tsx-field-label)
  │         input or select (.tsx-field-input)
  │       Fields (same as existing Contact form):
  │         City → text input, value: formData.city
  │         Audience / User group → text input, value: formData.audience
  │         Timeline → select [1-3 months, 3-6 months, 6-12 months, Ongoing]
  │         Context / current state → textarea, value: formData.context
  │         Success metric → text input, value: formData.successMetric
  │         Your name → text input, value: formData.name
  │         Email → email input, value: formData.email
  │       Submit button (.tsx-btn-cta full-width): DATA.contact.enquiry.label
  │         onClick: handleSubmit (same logic as Contact — opens mailto:)
  │
  │     Right — checklist panel (.tsx-checklist-panel):
  │       label: "Your brief should include"
  │       ul: map DATA.contact.checklist → <li> with checkmark icon
  │       below: email address as plain text link
  │
  └── Success state: when showSuccess === true, replace form with
        a simple confirmation band (.tsx-intake-band):
        "Brief prepared. Your mail client will open shortly."
```

### CSS additions to trust.css

```css
/* Contact page */
.trust .tsx-contact-hero{background:var(--tsx-hero-bg);padding-block:clamp(64px,8vw,96px)}
.trust .tsx-contact-h1{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;line-height:1.1;letter-spacing:-.025em;color:#F0F6FF;margin-bottom:16px}
.trust .tsx-email-pill{display:inline-flex;align-items:center;padding:9px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.15);color:rgba(240,246,255,.75);font-size:14px;font-weight:500;text-decoration:none;margin-block:24px;transition:border-color .15s,color .15s}
.trust .tsx-email-pill:hover{border-color:rgba(255,255,255,.3);color:#F0F6FF}

/* Channel selector */
.trust .tsx-channel-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-top:24px}
.trust .tsx-channel-card{background:#fff;padding:24px 28px;cursor:pointer;transition:background .15s;border-bottom:2px solid transparent}
.trust .tsx-channel-card:hover{background:#FAFBFF}
.trust .tsx-channel-card.active{background:var(--tsx-accent-fg);border-bottom-color:var(--tsx-accent)}
.trust .tsx-channel-card h3{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px}
.trust .tsx-channel-card p{font-size:13px;color:var(--muted);margin:0;line-height:1.55}
.trust .tsx-channel-card.active h3{color:var(--tsx-accent)}

/* Brief form */
.trust .tsx-brief-grid{display:grid;grid-template-columns:1fr 280px;gap:48px;margin-top:40px}
.trust .tsx-brief-form{display:flex;flex-direction:column;gap:20px}
.trust .tsx-field{display:flex;flex-direction:column;gap:6px}
.trust .tsx-field-label{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.trust .tsx-field-input{padding:11px 14px;border:1px solid var(--line);border-radius:8px;font-size:14px;font-family:inherit;color:var(--text);background:#fff;transition:border-color .15s,box-shadow .15s;outline:none}
.trust .tsx-field-input:focus{border-color:var(--tsx-accent);box-shadow:0 0 0 3px rgba(15,76,129,.1)}
.trust textarea.tsx-field-input{resize:vertical;min-height:96px}
select.trust .tsx-field-input,select.tsx-field-input{appearance:none}

/* Checklist panel */
.trust .tsx-checklist-panel{border:1px solid var(--line);border-radius:12px;padding:24px;background:var(--soft);height:fit-content}
.trust .tsx-checklist-panel>span{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#94A3B8;display:block;margin-bottom:16px}
.trust .tsx-checklist-panel ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.trust .tsx-checklist-panel li{font-size:13px;color:var(--muted);display:flex;align-items:flex-start;gap:8px}
.trust .tsx-checklist-panel li::before{content:"✓";color:var(--tsx-accent);font-weight:700;flex-shrink:0}

/* Responsive */
@media(max-width:1024px){
  .trust .tsx-channel-grid{grid-template-columns:1fr}
  .trust .tsx-brief-grid{grid-template-columns:1fr}
}
```

---

## Task 4 — Version Bump

After all three components are implemented and verified, update `index.html`:

Find active stylesheet and script version query strings and replace them with the current implementation version.

Current active version: `20260608-trust-enterprise-v5`.

---

## Verification Steps (run after each task)

For each new page, use Playwright:
```bash
npx playwright screenshot --browser chromium "http://localhost:8090/#trust/customers" /tmp/verify-customers.png
npx playwright screenshot --browser chromium "http://localhost:8090/#trust/company" /tmp/verify-company.png
npx playwright screenshot --browser chromium "http://localhost:8090/#trust/contact" /tmp/verify-contact.png
```

**Pass criteria for each page:**
1. Nav renders from `DATA.nav` with Trust labels visible, "Submit Brief" CTA present
2. No shared Neo class names visible in rendered output (no `.module-card`, `.fact-strip`, `.hero-banner` DOM nodes)
3. Section header shows 2-column layout: copy left, spec panel right
4. Page is white/slate background — NOT dark neon green
5. Typography is Poppins/Inter — NOT Syne or Space Grotesk (Neo fonts)
6. Neo is unaffected — `http://localhost:8090/#neo` still renders the original theme

**Contact-specific pass criteria:**
7. Selecting a channel card highlights it with accent border
8. Form fields are visible below the channel selector
9. Submit button triggers mailto: with form contents (verify by clicking)

---

## Risks and Flags

⚠️ **Contact form complexity** — The existing `Contact` function (line 4496) has ~250 lines of form logic including `handleSubmit` that builds a `mailto:` URL string. Copy ALL state and handler logic verbatim. Only change JSX structure and class names. Any deviation in `handleSubmit` will break the email generation.

⚠️ **select element styling** — CSS `appearance:none` on `select` requires a vendor-prefixed wrapper or SVG arrow icon for cross-browser consistency. If the select dropdown arrow looks broken, add a wrapper `div` with `position:relative` and an SVG caret positioned absolutely.

⚠️ **TrustCompany spec panel** — `DATA.company.facts` values are text strings (e.g. "Incorporated company"), not numbers. Do NOT use `.tsx-spec-value` (Poppins 20px bold) for these. Use `.tsx-spec-value-text` (13px 600 weight) defined in Task 2 CSS.

⚠️ **TrustContact dark hero band** — This uses `var(--tsx-hero-bg)` (#0A0F1E). The TrustNav is white with backdrop blur and is `position:fixed`. The contact hero sits behind the nav — add `padding-top: 64px` to `.tsx-contact-hero` to prevent the heading from being hidden behind the fixed nav.

⚠️ **Do not add BreadcrumbBar** — `TrustSite` does not render `BreadcrumbBar`. Do not add it. The TrustNav + section eyebrow serve as the location indicator.

⚠️ **Do not import or reference** `HeroBanner`, `AcademyHero`, `NeoHero`, `TrustHero`, `SuperSkills`, `NexaraUnbox`, `ModuleCard`, or any function that does not have a `tsx-` prefix in its output JSX. These are Neo-only components.

---

## File Edit Summary

| File | Change |
|---|---|
| `src/trust.jsx` | Add `TrustCustomers`, `TrustCompany`, `TrustContact` before `function TrustSite({` |
| `src/trust.jsx` | Update 3 lines in `TrustSite` body to route to new components |
| `styles/trust.css` | Append CSS for tasks 2 and 3 (`.tsx-spec-value-text`, contact/channel/form classes) |
| `index.html` | Bump `?v=` on active assets and load split JSX files in order |

Total new JSX: ~200 lines. Total new CSS: ~60 lines.

---

## Codex Implementation Notes — 2026-06-08

**Completed files**

| File | Status |
|---|---|
| `src/trust.jsx` | Added `TrustCustomers`, `TrustCompany`, `TrustContact`; wired Trust routes to the new components |
| `styles/trust.css` | Added `.tsx-spec-value-text`, static-page spacing, contact/channel/form/checklist styles, and focused `tsx-` font overrides so legacy Trust serif rules do not override the new pages |
| `index.html` | Bumped active asset query strings and added ordered `shared`, `neo`, `trust`, `app` JSX scripts |

**Implementation notes**

- `TrustContact` preserves the existing brief state shape and mailto brief generation fields. The existing shared `Contact` component did not contain `showSuccess` or a standalone `handleSubmit`; the Trust version adds both to satisfy this plan while preserving the same generated email contents.
- Contact channel selection updates `formData.section`, scrolls to `.tsx-brief-section`, and applies `.tsx-channel-card.active`.
- Company fact values use `.tsx-spec-value-text`; numeric proof values continue to use `.tsx-spec-value`.

**Verification run**

```bash
python3 -m http.server 8090
npx playwright screenshot --browser chromium 'http://localhost:8090/#trust/customers' /private/tmp/verify-customers.png
npx playwright screenshot --browser chromium 'http://localhost:8090/#trust/company' /private/tmp/verify-company.png
npx playwright screenshot --browser chromium 'http://localhost:8090/#trust/contact' /private/tmp/verify-contact.png
npx playwright screenshot --browser chromium 'http://localhost:8090/#neo' /private/tmp/verify-neo.png
```

**Observed results**

- Trust Customers, Company, and Contact render with `TrustNav`, `Submit Brief`, white/slate layout, `tsx-` page structures, and no visible Neo card/banner patterns.
- Customers and Company show the required header/spec-panel layouts.
- Contact shows the dark navy hero, channel cards, active combined-play state, and the form/checklist DOM below the selector.
- Neo home still renders the original neon theme in `/private/tmp/verify-neo.png`.

---

## Architecture Follow-up — 2026-06-08

The prototype has been modularized after implementation:

| File | Ownership |
|---|---|
| `src/shared.jsx` | Shared routing helpers, theme copy helper, brief-form state, brief text generation and mailto generation |
| `src/neo.jsx` | Gateway, Neo presentation and legacy shared/Neo-styled components |
| `src/trust.jsx` | Dedicated Trust presentation components |
| `src/app.jsx` | Hash router and root render only |
| `index.html` | Ordered browser-Babel script loading: data, shared, neo, trust, app |

The content model remains single-source in `src/data.js`. Neo and Trust still read from the same data object, but their layouts and theme-specific copy live in separate presentation files. The brief-form logic is no longer duplicated between the Neo/shared contact page and the Trust contact page.

## Trust Enterprise Parity Follow-up — 2026-06-08

Trust now mirrors the Neo route/data map while translating the public language into an enterprise IT voice:

| Area | Rule |
|---|---|
| Navigation | Trust renders from `DATA.nav`, using `trustLabel` for corporate labels while keeping the same page targets as Neo |
| Sections | Trust reads the same `DATA.sections` objects and presents them as Talent Programmes, Digital Solutions, and AI & Automation |
| Home page | Trust uses `DATA.home.trust`, `DATA.superSkills`, `DATA.market`, company standards, and section modules instead of hardcoded placeholder firms |
| Section pages | Trust keeps the same overview/subpage coverage as Neo, but uses stacked modules, deliverable tables, process blocks, packages, proof and FAQs |
| Mobile | Trust exposes a horizontal mobile route rail so route parity remains visible below the fixed header |

Active asset version after this update: `20260608-trust-enterprise-v5`.
