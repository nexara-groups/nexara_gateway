# Trust Editorial Light Visual Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Trust theme from a plain text/table stack into an editorial corporate UI with 9 distinct visual component upgrades across both the home page and all section pages.

**Architecture:** Each task touches one component at a time — CSS classes added to `styles/trust.css`, then JSX rewritten in `src/trust.jsx`. No new files, no routing changes, no data changes. Each task leaves the site in a working state. Browser verification at `http://localhost:8090/#trust` replaces test runner.

**Tech Stack:** Static browser Babel (no bundler), React 18, plain CSS, Python HTTP server. No TypeScript, no test runner. Cache-bust by updating the `?v=` param on `styles/trust.css` in `index.html` after every CSS edit.

---

## Before you start

Run the server:
```bash
cd /Users/naveengalla/Documents/Claude/nexara-gateway
python3 -m http.server 8090
```

Open `http://localhost:8090/#trust` in a browser. Keep it open throughout. Hard-refresh (`Cmd+Shift+R` / `Ctrl+Shift+F5`) after each task to bust cache.

Current cache-bust token in `index.html`: `?v=20260608-trust-enterprise-v5`

---

## Task 1: Anchor Stats Band (home — proof strip)

**Files:**
- Modify: `styles/trust.css` — append new classes
- Modify: `src/trust.jsx` — rewrite `TrustProofStrip`
- Modify: `index.html` — bump `?v=` on `trust.css`

### What this replaces
`TrustProofStrip` currently renders a label + 3 pill chips. Replace with a 4-column stat row with bold numbers.

- [ ] **Step 1: Add CSS to trust.css** — append at end of file:

```css
/* ── Anchor Stats Band ───────────────────────────────────────────── */
.trust .tsx-stat-band{background:#fff;border-bottom:1px solid var(--line);padding-block:0}
.trust .tsx-stat-band-inner{max-width:1200px;margin-inline:auto;padding-inline:clamp(20px,5vw,80px);display:grid;grid-template-columns:repeat(4,1fr)}
.trust .tsx-stat-cell{padding:28px 0;text-align:center;border-right:1px solid var(--line);position:relative}
.trust .tsx-stat-cell:last-child{border-right:none}
.trust .tsx-stat-num{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:800;color:var(--text);letter-spacing:-.025em;display:block;line-height:1}
.trust .tsx-stat-num.accent{color:var(--tsx-accent)}
.trust .tsx-stat-sublabel{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-top:6px;display:block}
@media(max-width:640px){.trust .tsx-stat-band-inner{grid-template-columns:repeat(2,1fr)}.trust .tsx-stat-cell:nth-child(2){border-right:none}.trust .tsx-stat-cell:nth-child(3){border-right:1px solid var(--line)}}
```

- [ ] **Step 2: Rewrite `TrustProofStrip` in trust.jsx**

Replace the entire `TrustProofStrip` function (lines ~187–201) with:

```jsx
function TrustProofStrip() {
  const stats = [
    { num: '3',     label: 'Solution Lines',     accent: false },
    { num: '9',     label: 'Capability Modules',  accent: false },
    { num: 'Brief', label: 'Driven Delivery',     accent: true  },
    { num: '1',     label: 'Partner, All Areas',  accent: false },
  ];
  return (
    <div className="tsx-stat-band" aria-label="Key figures">
      <div className="tsx-stat-band-inner">
        {stats.map(({ num, label, accent }) => (
          <div className="tsx-stat-cell" key={label}>
            <span className={`tsx-stat-num${accent ? ' accent' : ''}`}>{num}</span>
            <span className="tsx-stat-sublabel">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Bump cache-bust token in index.html**

Change line 14:
```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t1" />
```

- [ ] **Step 4: Browser verify**

Open `http://localhost:8090/#trust`. Hard-refresh. The proof strip should now show 4 stat cells: `3 / SOLUTION LINES`, `9 / CAPABILITY MODULES`, `Brief / DRIVEN DELIVERY` (navy), `1 / PARTNER, ALL AREAS`. No pill chips.

- [ ] **Step 5: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): anchor stats band replaces proof chip strip"
```

---

## Task 2: Numbered Governance Cards (home — feature strip)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — rewrite `TrustFeatureStrip`
- Modify: `index.html` — bump `?v=`

### What this replaces
`TrustFeatureStrip` shows 4 icon-centric feature blocks from `DATA.company.standards`. Replace with numbered cards that have a dark header strip + body.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Numbered Governance Cards ───────────────────────────────────── */
.trust .tsx-gov-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-top:40px;box-shadow:0 4px 16px rgba(15,23,42,.06)}
.trust .tsx-gov-card{background:#fff;display:flex;flex-direction:column;transition:background .2s}
.trust .tsx-gov-card:hover{background:#fafbff}
.trust .tsx-gov-header{padding:18px 22px 14px;display:flex;align-items:baseline;gap:10px}
.trust .tsx-gov-header.navy{background:var(--tsx-accent)}
.trust .tsx-gov-header.dark{background:#0f172a}
.trust .tsx-gov-num{font-family:'Libre Baskerville',Georgia,serif;font-size:28px;font-weight:700;color:rgba(255,255,255,.22);line-height:1;flex-shrink:0}
.trust .tsx-gov-cat{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.65)}
.trust .tsx-gov-body{padding:16px 22px 22px;flex:1}
.trust .tsx-gov-title{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:var(--text);margin:0 0 8px;letter-spacing:-.01em}
.trust .tsx-gov-desc{font-size:13px;color:var(--muted);line-height:1.65;margin:0}
@media(max-width:900px){.trust .tsx-gov-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:540px){.trust .tsx-gov-grid{grid-template-columns:1fr}}
```

- [ ] **Step 2: Rewrite `TrustFeatureStrip` in trust.jsx**

Replace the entire `TrustFeatureStrip` function with:

```jsx
const TSX_GOV_CATEGORIES = ['Integrity', 'Scoping', 'Governance', 'Reporting'];

function TrustFeatureStrip() {
  return (
    <section className="tsx-features" aria-labelledby="tsx-feat-h">
      <div className="tsx-section-inner">
        <p className="tsx-section-eyebrow tsx-fade">Governance model</p>
        <h2 className="tsx-section-heading tsx-fade" id="tsx-feat-h">Four delivery standards, no exceptions.</h2>
        <div className="tsx-gov-grid">
          {DATA.company.standards.map((standard, i) => (
            <div className={`tsx-gov-card tsx-fade tsx-fade-d${i + 1}`} key={standard.title}>
              <div className={`tsx-gov-header ${i % 2 === 0 ? 'navy' : 'dark'}`}>
                <span className="tsx-gov-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="tsx-gov-cat">{TSX_GOV_CATEGORIES[i]}</span>
              </div>
              <div className="tsx-gov-body">
                <h3 className="tsx-gov-title">{standard.title}</h3>
                <p className="tsx-gov-desc">{standard.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t2" />
```

- [ ] **Step 4: Browser verify**

Go to `http://localhost:8090/#trust`. Hard-refresh. Governance section should show 4 cards in a bordered 4-column grid. Cards 1 and 3 have a navy header, cards 2 and 4 have a near-black header. Each shows a large muted number + category label in header, then title + body below. No icons.

- [ ] **Step 5: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): numbered governance cards replace icon feature strip"
```

---

## Task 3: Capability Matrix (home — enterprise stacks)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — rewrite `TrustEnterpriseStacks`
- Modify: `index.html` — bump `?v=`

### What this replaces
`TrustEnterpriseStacks` renders 5 column cards from `DATA.superSkills`. Replace with accordion-table rows; first row shows an expanded chip sub-row.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Capability Matrix ───────────────────────────────────────────── */
.trust .tsx-matrix{border:1px solid var(--line);border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(15,23,42,.06)}
.trust .tsx-matrix-row{border-bottom:1px solid var(--line);background:#fff;transition:background .15s}
.trust .tsx-matrix-row:last-child{border-bottom:none}
.trust .tsx-matrix-row:hover{background:#fafbff}
.trust .tsx-matrix-main{padding:16px 20px;display:grid;grid-template-columns:44px 1fr auto;gap:16px;align-items:center}
.trust .tsx-matrix-num{font-family:'Libre Baskerville',Georgia,serif;font-size:20px;font-weight:700;color:#e2e8f0;line-height:1;flex-shrink:0}
.trust .tsx-matrix-title{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:var(--text);margin:0 0 3px;letter-spacing:-.01em}
.trust .tsx-matrix-desc{font-size:12px;color:var(--muted);margin:0;line-height:1.4}
.trust .tsx-matrix-tags{display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0}
.trust .tsx-matrix-tag{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tsx-accent);background:var(--tsx-accent-fg);border:1px solid rgba(15,76,129,.18);border-radius:4px;padding:3px 8px;white-space:nowrap}
.trust .tsx-matrix-detail{padding:10px 20px 14px 80px;background:#fafbff;border-top:1px solid #f1f5f9;display:flex;gap:6px;flex-wrap:wrap}
.trust .tsx-matrix-chip{font-size:11px;color:#334155;background:#fff;border:1px solid var(--line);border-radius:4px;padding:4px 10px}
@media(max-width:640px){.trust .tsx-matrix-main{grid-template-columns:32px 1fr}.trust .tsx-matrix-tags{display:none}.trust .tsx-matrix-detail{padding-left:48px}}
```

- [ ] **Step 2: Rewrite `TrustEnterpriseStacks` in trust.jsx**

Replace the entire `TrustEnterpriseStacks` function with:

```jsx
function TrustEnterpriseStacks() {
  return (
    <section className="tsx-enterprise-stacks" aria-labelledby="tsx-stack-h">
      <div className="tsx-section-inner">
        <p className="tsx-section-eyebrow">Capability stacks</p>
        <h2 className="tsx-section-heading" id="tsx-stack-h">Integrated stacks built from the same Nexara capabilities.</h2>
        <div className="tsx-matrix">
          {DATA.superSkills.map((item, index) => (
            <div className="tsx-matrix-row" key={item.title}>
              <div className="tsx-matrix-main">
                <span className="tsx-matrix-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="tsx-matrix-title">{item.title}</p>
                  <p className="tsx-matrix-desc">{item.trust}</p>
                </div>
                <div className="tsx-matrix-tags">
                  {item.sections.map(s => (
                    <span className="tsx-matrix-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              {index === 0 && (
                <div className="tsx-matrix-detail">
                  {item.stack.map(module => (
                    <span className="tsx-matrix-chip" key={module}>{module}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t3" />
```

- [ ] **Step 4: Browser verify**

Hard-refresh `/#trust`. Stacks section should show a bordered single-column list. Each row: large muted serif number left, title + description centre, section tag pills right. Row 1 ("City Launch Stack") has a sub-row showing 4 module chips on a tinted background. Rows 2–5 are clean.

- [ ] **Step 5: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): capability matrix accordion replaces 5-column stack grid"
```

---

## Task 4: Market Context upgrade (home)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — rewrite `TrustMarketContext`
- Modify: `index.html` — bump `?v=`

### What this changes
Add a left-border accent and eyebrow to the copy panel. Make the first city pill dark (primary city emphasis). Everything else stays.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Market Context upgrade ──────────────────────────────────────── */
.trust .tsx-market-left-rule{border-left:3px solid var(--tsx-accent);padding-left:18px}
.trust .tsx-city-primary{background:#0f172a !important;color:#fff !important;border-color:#0f172a !important}
```

- [ ] **Step 2: Rewrite `TrustMarketContext` in trust.jsx**

Replace the entire `TrustMarketContext` function with:

```jsx
function TrustMarketContext() {
  return (
    <section className="tsx-market-context" aria-labelledby="tsx-market-h">
      <div className="tsx-section-inner tsx-market-grid">
        <div className="tsx-market-left-rule">
          <p className="tsx-section-eyebrow">Operating region</p>
          <h2 className="tsx-section-heading" id="tsx-market-h">{DATA.market.title.trust}</h2>
          <p className="tsx-section-lede">{DATA.market.body.trust}</p>
          <div className="tsx-city-grid">
            {DATA.market.cities.map((city, i) => (
              <span key={city} className={i === 0 ? 'tsx-city-primary' : ''}>{city}</span>
            ))}
          </div>
        </div>
        <div className="tsx-assumption-panel">
          <span className="tsx-panel-title">Planning assumptions</span>
          {DATA.market.assumptions.map((assumption, index) => (
            <p key={assumption}><strong>{String(index + 1).padStart(2, '0')}</strong>{assumption}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t4" />
```

- [ ] **Step 4: Browser verify**

Hard-refresh `/#trust`. Market section copy panel should now have a left navy border. First city pill ("Visakhapatnam") should be dark/white instead of light grey. All other cities remain light.

- [ ] **Step 5: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): market context left-rule accent and primary city pill"
```

---

## Task 5: Deliverable Card Rows (section pages)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — add `TrustDeliverableRows`, use in `TrustSectionOverview`
- Modify: `index.html` — bump `?v=`

### What this replaces
The first `<table class="tsx-del-table">` block inside `TrustSectionOverview` (the "What we deliver" table). Replace with card rows.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Deliverable Card Rows ───────────────────────────────────────── */
.trust .tsx-del-rows{border:1px solid var(--line);border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(15,23,42,.05)}
.trust .tsx-del-row{padding:14px 18px;display:grid;grid-template-columns:130px 1fr auto;gap:16px;align-items:center;border-bottom:1px solid var(--line);background:#fff;transition:background .15s}
.trust .tsx-del-row:last-child{border-bottom:none}
.trust .tsx-del-row:nth-child(even){background:#fafbff}
.trust .tsx-del-row:hover{background:#f0f7ff}
.trust .tsx-del-area-label{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tsx-accent);margin-bottom:3px}
.trust .tsx-del-area-name{font-size:13px;font-weight:700;color:var(--text)}
.trust .tsx-del-chips{display:flex;gap:5px;flex-wrap:wrap}
.trust .tsx-del-chip{font-size:11px;color:#334155;background:#f8fafc;border:1px solid var(--line);border-radius:4px;padding:3px 9px}
.trust .tsx-del-outcome{font-size:11px;font-weight:700;color:var(--tsx-accent);background:var(--tsx-accent-fg);border:1px solid rgba(15,76,129,.2);border-radius:4px;padding:4px 10px;white-space:nowrap;flex-shrink:0}
@media(max-width:700px){.trust .tsx-del-row{grid-template-columns:1fr;gap:8px}.trust .tsx-del-outcome{align-self:flex-start}}
```

- [ ] **Step 2: Add `TrustDeliverableRows` component to trust.jsx** — insert as a new function before `TrustSectionOverview`:

```jsx
function TrustDeliverableRows({ rows }) {
  return (
    <div className="tsx-del-rows">
      {rows.map(row => (
        <div className="tsx-del-row" key={row.title}>
          <div>
            <p className="tsx-del-area-label">Area</p>
            <p className="tsx-del-area-name">{row.title}</p>
          </div>
          <div className="tsx-del-chips">
            {row.deliverables.map(d => (
              <span className="tsx-del-chip" key={d}>{d}</span>
            ))}
          </div>
          <span className="tsx-del-outcome">{row.outcome}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Replace the first deliverables table in `TrustSectionOverview`**

Find this block inside `TrustSectionOverview` (around lines 487–502):

```jsx
        <div className="tsx-deliverables">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>What we deliver</h2>
          <table className="tsx-del-table">
            <thead>
              <tr><th>Area</th><th>Deliverables</th><th>Outcome</th></tr>
            </thead>
            <tbody>
              {section.stackDetails.map(row => (
                <tr key={row.title}>
                  <td><strong>{row.title}</strong></td>
                  <td>{row.deliverables.join(' · ')}</td>
                  <td><span className="tsx-outcome">{row.outcome}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
```

Replace with:

```jsx
        <div className="tsx-deliverables">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>What we deliver</h2>
          <TrustDeliverableRows rows={section.stackDetails} />
        </div>
```

- [ ] **Step 4: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t5" />
```

- [ ] **Step 5: Browser verify**

Go to `http://localhost:8090/#trust/academy`. Hard-refresh. Click the "Overview" tab. The "What we deliver" section should now show bordered card rows instead of a plain table. Each row: area label + name left, deliverable chips centre, outcome badge right. Even rows have a subtle tint.

- [ ] **Step 6: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): deliverable card rows replace plain table in section overview"
```

---

## Task 6: Connector Timeline (section pages — process)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — add `TrustProcessTimeline`, use in `TrustSectionOverview`
- Modify: `index.html` — bump `?v=`

### What this replaces
The `<ol class="tsx-process-list">` block inside `TrustSectionOverview`. Replace with a vertical timeline with numbered square badges and connector lines.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Connector Timeline ──────────────────────────────────────────── */
.trust .tsx-timeline{display:flex;flex-direction:column;gap:0}
.trust .tsx-tl-step{display:grid;grid-template-columns:48px 1fr;gap:0}
.trust .tsx-tl-left{display:flex;flex-direction:column;align-items:center}
.trust .tsx-tl-badge{width:36px;height:36px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Libre Baskerville',Georgia,serif;font-size:14px;font-weight:700;color:#fff;flex-shrink:0}
.trust .tsx-tl-badge.first{background:var(--tsx-accent)}
.trust .tsx-tl-badge.rest{background:#0f172a}
.trust .tsx-tl-line{width:1px;flex:1;background:var(--line);margin:5px 0;min-height:18px}
.trust .tsx-tl-content{padding:0 0 22px 14px}
.trust .tsx-tl-title{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:var(--text);margin:6px 0 4px;letter-spacing:-.01em}
.trust .tsx-tl-body{font-size:13px;color:var(--muted);line-height:1.6;margin:0}
```

- [ ] **Step 2: Add `TrustProcessTimeline` component to trust.jsx** — insert before `TrustSectionOverview`:

```jsx
function TrustProcessTimeline({ steps }) {
  return (
    <div className="tsx-timeline">
      {steps.map((step, i) => (
        <div className="tsx-tl-step" key={step.step}>
          <div className="tsx-tl-left">
            <div className={`tsx-tl-badge ${i === 0 ? 'first' : 'rest'}`}>{step.step}</div>
            {i < steps.length - 1 && <div className="tsx-tl-line" />}
          </div>
          <div className="tsx-tl-content">
            <p className="tsx-tl-title">{step.title}</p>
            <p className="tsx-tl-body">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Replace the process list in `TrustSectionOverview`**

Find this block (around lines 505–514):

```jsx
        <div className="tsx-process">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>How it works</h2>
          <ol className="tsx-process-list">
            {section.process.map(step => (
              <li className="tsx-process-item" key={step.step}>
                <span className="tsx-process-num">{step.step}</span>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
```

Replace with:

```jsx
        <div className="tsx-process">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>How it works</h2>
          <TrustProcessTimeline steps={section.process} />
        </div>
```

- [ ] **Step 4: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t6" />
```

- [ ] **Step 5: Browser verify**

Go to `http://localhost:8090/#trust/academy`. Hard-refresh → Overview tab. "How it works" section should now show a vertical timeline: step 01 has a navy badge, steps 02–04 have near-black badges. A thin grey line connects each step to the next. No bullet/number list.

- [ ] **Step 6: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): connector timeline replaces process ordered list"
```

---

## Task 7: Tiered Package Cards (section pages)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — add `TrustPackageCards`, use in `TrustSectionOverview`
- Modify: `index.html` — bump `?v=`

### What this replaces
The `.tsx-packages-grid` block inside `TrustSectionOverview`. Replace with tier cards where the middle card (index 1) is featured with a "Most Common" badge.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Tiered Package Cards ────────────────────────────────────────── */
.trust .tsx-tier-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:start}
.trust .tsx-tier-card{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;position:relative}
.trust .tsx-tier-card.featured{border:2px solid var(--tsx-accent);box-shadow:0 8px 28px rgba(15,76,129,.12)}
.trust .tsx-tier-badge{position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:var(--tsx-accent);color:#fff;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 12px;border-radius:0 0 6px 6px;white-space:nowrap}
.trust .tsx-tier-head{padding:16px 18px 12px;border-bottom:1px solid var(--line)}
.trust .tsx-tier-head.featured-head{border-bottom-color:rgba(15,76,129,.18);padding-top:24px}
.trust .tsx-tier-fit{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;display:block;margin-bottom:5px}
.trust .tsx-tier-name{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:var(--text);margin:0 0 3px;letter-spacing:-.015em}
.trust .tsx-tier-duration{font-size:12px;color:var(--muted)}
.trust .tsx-tier-body{padding:14px 18px}
.trust .tsx-tier-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
.trust .tsx-tier-list li{font-size:12px;color:#334155;display:flex;gap:7px;align-items:flex-start;line-height:1.45}
.trust .tsx-tier-list li::before{content:"—";color:var(--tsx-accent);font-weight:700;flex-shrink:0}
.trust .tsx-tier-foot{padding:12px 18px 16px;border-top:1px solid var(--line)}
.trust .tsx-tier-foot.featured-foot{border-top-color:rgba(15,76,129,.18)}
.trust .tsx-tier-cta{font-size:12px;color:var(--muted)}
.trust .tsx-tier-cta.featured-cta{font-size:12px;font-weight:700;color:var(--tsx-accent)}
@media(max-width:700px){.trust .tsx-tier-grid{grid-template-columns:1fr}}
```

- [ ] **Step 2: Add `TrustPackageCards` component to trust.jsx** — insert before `TrustSectionOverview`:

```jsx
function TrustPackageCards({ packages }) {
  return (
    <div className="tsx-tier-grid">
      {packages.map((pkg, i) => {
        const featured = i === 1;
        return (
          <div className={`tsx-tier-card${featured ? ' featured' : ''}`} key={pkg.name}>
            {featured && <span className="tsx-tier-badge">Most Common</span>}
            <div className={`tsx-tier-head${featured ? ' featured-head' : ''}`}>
              <span className="tsx-tier-fit">{pkg.fit}</span>
              <p className="tsx-tier-name">{pkg.name}</p>
              <span className="tsx-tier-duration">{pkg.duration}</span>
            </div>
            <div className="tsx-tier-body">
              <ul className="tsx-tier-list">
                {pkg.includes.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className={`tsx-tier-foot${featured ? ' featured-foot' : ''}`}>
              <p className={`tsx-tier-cta${featured ? ' featured-cta' : ''}`}>
                {featured ? 'Submit a brief →' : 'Submit a brief to enquire'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Replace the packages grid in `TrustSectionOverview`**

Find this block (around lines 518–534):

```jsx
        <div className="tsx-packages">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>Engagement packages</h2>
          <div className="tsx-packages-grid">
            {section.packages.map(pkg => (
              <div className="tsx-package-card" key={pkg.name}>
                <span className="tsx-package-fit">{pkg.fit}</span>
                <h3 className="tsx-package-name">{pkg.name}</h3>
                <ul className="tsx-package-includes">
                  {pkg.includes.map(item => <li key={item}>{item}</li>)}
                </ul>
                <div className="tsx-package-meta">
                  <span>{pkg.price}</span>
                  <span>{pkg.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
```

Replace with:

```jsx
        <div className="tsx-packages">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>Engagement packages</h2>
          <TrustPackageCards packages={section.packages} />
        </div>
```

- [ ] **Step 4: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t7" />
```

- [ ] **Step 5: Browser verify**

Go to `http://localhost:8090/#trust/academy` → Overview. "Engagement packages" should show 3 tier cards. The middle card ("Internship Batch") has a `2px` navy border, a "Most Common" badge pinned top-centre, and a navy "Submit a brief →" CTA. Left and right cards are plain bordered.

- [ ] **Step 6: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): tiered pricing cards with featured middle tier"
```

---

## Task 8: Case Study Strips (section pages — proof)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — add `TrustProofStrips`, use in `TrustSectionOverview`
- Modify: `index.html` — bump `?v=`

### What this replaces
The second `<table class="tsx-del-table">` inside `TrustSectionOverview` (the "Delivery proof" table). Replace with case study horizontal strips.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Case Study Strips ───────────────────────────────────────────── */
.trust .tsx-proof-strips{display:flex;flex-direction:column;gap:10px}
.trust .tsx-proof-strip{border-left:3px solid var(--tsx-accent);border:1px solid var(--line);border-left-width:3px;border-left-color:var(--tsx-accent);border-radius:0 8px 8px 0;padding:14px 18px;display:grid;grid-template-columns:160px 1fr auto;gap:18px;align-items:center;background:#fff;transition:background .15s}
.trust .tsx-proof-strip:hover{background:#fafbff}
.trust .tsx-proof-eng-label{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tsx-accent);display:block;margin-bottom:4px}
.trust .tsx-proof-eng-name{font-family:'Poppins','Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;color:var(--text);margin:0;letter-spacing:-.01em}
.trust .tsx-proof-result-label{font-size:9px;font-weight:600;color:#94a3b8;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px;display:block}
.trust .tsx-proof-result-text{font-size:12px;color:#334155;line-height:1.55;margin:0}
.trust .tsx-proof-org{font-size:10px;font-weight:700;color:var(--tsx-accent);background:var(--tsx-accent-fg);border:1px solid rgba(15,76,129,.2);border-radius:4px;padding:4px 10px;white-space:nowrap;flex-shrink:0}
@media(max-width:700px){.trust .tsx-proof-strip{grid-template-columns:1fr;gap:8px}.trust .tsx-proof-org{align-self:flex-start}}
```

- [ ] **Step 2: Add `TrustProofStrips` component to trust.jsx** — insert before `TrustSectionOverview`:

```jsx
function TrustProofStrips({ items }) {
  return (
    <div className="tsx-proof-strips">
      {items.map(p => (
        <div className="tsx-proof-strip" key={p.name}>
          <div>
            <span className="tsx-proof-eng-label">Engagement</span>
            <p className="tsx-proof-eng-name">{p.name}</p>
          </div>
          <div>
            <span className="tsx-proof-result-label">What was delivered</span>
            <p className="tsx-proof-result-text">{p.result.trust}</p>
          </div>
          <span className="tsx-proof-org">{p.org}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Replace the proof table in `TrustSectionOverview`**

Find this block (around lines 537–553):

```jsx
        <div className="tsx-deliverables">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>Delivery proof</h2>
          <table className="tsx-del-table">
            <thead>
              <tr><th>Engagement</th><th>What was delivered</th><th>Area</th></tr>
            </thead>
            <tbody>
              {section.proof.map(p => (
                <tr key={p.name}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.result.trust}</td>
                  <td><span className="tsx-outcome">{p.org}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
```

Replace with:

```jsx
        <div className="tsx-deliverables">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>Delivery proof</h2>
          <TrustProofStrips items={section.proof} />
        </div>
```

- [ ] **Step 4: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t8" />
```

- [ ] **Step 5: Browser verify**

Go to `http://localhost:8090/#trust/academy` → Overview. "Delivery proof" section should now show horizontal strips. Each strip has a left navy border, bold engagement name left, delivery description centre, area badge right. No HTML table.

- [ ] **Step 6: Commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): case study strips replace proof delivery table"
```

---

## Task 9: Numbered FAQ Accordion (section pages)

**Files:**
- Modify: `styles/trust.css` — append
- Modify: `src/trust.jsx` — add `TrustFaqAccordion`, use in `TrustSectionOverview`
- Modify: `index.html` — bump `?v=`

### What this replaces
The `.tsx-faq-list details` block inside `TrustSectionOverview`. Replace with a React-controlled accordion using `useState`. One item open at a time.

- [ ] **Step 1: Add CSS to trust.css** — append:

```css
/* ── Numbered FAQ Accordion ──────────────────────────────────────── */
.trust .tsx-faq-acc{display:flex;flex-direction:column;gap:8px}
.trust .tsx-faq-item{border:1px solid var(--line);border-radius:8px;overflow:hidden;transition:border-color .2s}
.trust .tsx-faq-item.open{border-color:rgba(15,76,129,.28)}
.trust .tsx-faq-trigger{width:100%;padding:14px 18px;display:flex;align-items:center;gap:12px;background:#fff;border:none;cursor:pointer;font-family:inherit;text-align:left;transition:background .15s}
.trust .tsx-faq-item.open .tsx-faq-trigger{background:#fafbff}
.trust .tsx-faq-trigger:hover{background:#f8fafc}
.trust .tsx-faq-counter{font-family:'Libre Baskerville',Georgia,serif;font-size:13px;font-weight:700;color:#cbd5e1;flex-shrink:0;width:22px}
.trust .tsx-faq-item.open .tsx-faq-counter{color:var(--tsx-accent)}
.trust .tsx-faq-q{flex:1;font-size:13px;font-weight:700;color:var(--text);line-height:1.4}
.trust .tsx-faq-indicator{font-size:18px;color:#94a3b8;font-weight:300;flex-shrink:0;line-height:1;width:16px;text-align:center}
.trust .tsx-faq-item.open .tsx-faq-indicator{color:var(--tsx-accent)}
.trust .tsx-faq-panel{padding:0 18px 16px 52px;border-top:1px solid rgba(15,76,129,.1)}
.trust .tsx-faq-a{font-size:13px;color:var(--muted);line-height:1.7;margin:12px 0 0}
```

- [ ] **Step 2: Add `TrustFaqAccordion` component to trust.jsx** — insert before `TrustSectionOverview`:

```jsx
function TrustFaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = React.useState(null);
  return (
    <div className="tsx-faq-acc">
      {faqs.map(([q, a], i) => {
        const isOpen = openIndex === i;
        return (
          <div className={`tsx-faq-item${isOpen ? ' open' : ''}`} key={i}>
            <button
              className="tsx-faq-trigger"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="tsx-faq-counter">{String(i + 1).padStart(2, '0')}</span>
              <span className="tsx-faq-q">{q}</span>
              <span className="tsx-faq-indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="tsx-faq-panel">
                <p className="tsx-faq-a">{a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Replace the FAQ block in `TrustSectionOverview`**

Find this block (around lines 555–565):

```jsx
        <div className="tsx-faq">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>Common questions</h2>
          <div className="tsx-faq-list">
            {section.faqs.map(([q, a], i) => (
              <details className="tsx-faq-item" key={i}>
                <summary className="tsx-faq-q">{q}</summary>
                <p className="tsx-faq-a">{a}</p>
              </details>
            ))}
          </div>
        </div>
```

Replace with:

```jsx
        <div className="tsx-faq">
          <h2 className="tsx-section-heading" style={{marginBottom:'24px'}}>Common questions</h2>
          <TrustFaqAccordion faqs={section.faqs} />
        </div>
```

- [ ] **Step 4: Bump cache-bust token in index.html**

```html
<link rel="stylesheet" href="styles/trust.css?v=20260608-trust-v6-t9" />
```

- [ ] **Step 5: Browser verify**

Go to `http://localhost:8090/#trust/academy` → Overview. "Common questions" section should show styled FAQ items with `01`/`02` serif counters, a `+` indicator, and a plain closed state. Click any question — it opens with a navy border, tinted header, indented answer panel, and `−` indicator. Clicking again closes it. Only one open at a time.

- [ ] **Step 6: Full-page regression check**

Verify each Trust page still renders correctly:
- `/#trust` — home: stats band, governance cards, matrix, market context all intact
- `/#trust/academy` — section page: deliverable rows, timeline, tier cards, proof strips, FAQ accordion
- `/#trust/marketing` — same section page upgrades apply
- `/#trust/labs` — same section page upgrades apply
- `/#trust/customers`, `/#trust/company`, `/#trust/contact` — unchanged, render without errors

- [ ] **Step 7: Final commit**

```bash
git add styles/trust.css src/trust.jsx index.html
git commit -m "feat(trust): numbered FAQ accordion — editorial light upgrade complete"
```
