# Nexara Dual-Engine — Restructure Design

_Date: 2026-05-29_

> Historical note: this spec records an earlier restructuring direction. The current active implementation is the server-served multi-file site documented in `CLAUDE.md`: `index.html` loads `src/data.js`, `src/app.jsx`, and `styles/*`; routing uses `#neo/...` and `#trust/...`; root JSX/CSS files are legacy source notes.

---

## What we're building

Restructure the existing single-file Nexara prototype into a multi-page hub+spoke site. The gateway remains the entry point. After choosing a theme, users land on a hub that routes them into one of three dedicated service pages — Academy, Digital Marketing, and AI Labs — each rendered fully in the chosen theme.

---

## Site architecture

```
Gateway (entry)
  ├── → Neo-Vibe
  │     └── Hub (asymmetric bento)
  │           ├── → Academy page
  │           ├── → Digital Marketing page
  │           └── → AI Labs page
  └── → Trust-Grid
        └── Hub (asymmetric bento)
              ├── → Academy page
              ├── → Digital Marketing page
              └── → AI Labs page
```

Theme state persists in `localStorage`. Switching theme on any page re-renders the same page in the other theme — users don't get kicked back to the gateway or hub.

---

## Pages

### 1. Gateway (`page = "gateway"`)

Unchanged from current implementation. Full-viewport diagonal split. Left = Neo-Vibe (black, lime), right = Trust-Grid (slate white, corporate blue). Click either half → set theme → go to Hub.

### 2. Hub (`page = "hub"`)

Landing page after gateway. Shows all three services as an **asymmetric bento**:

```
[ Academy ]  [ Digital Marketing ]
[        AI Labs (full width)    ]
```

- Neo-Vibe: dark bento tiles with sharp borders, lime accents, index numbers (`01 /`, `02 /`, `03 /`), 1-line kicker per card
- Trust-Grid: white rounded shadow-cards with blue accents, same 2+1 layout

Each card is clickable → navigates to that service page.

### 3. Service pages (`page = "academy" | "marketing" | "ailabs"`)

Each service page contains these 6 sections in order:

1. **Hero** — large headline, sub-copy, primary + secondary CTA buttons
2. **Stats strip** — 3–4 proof numbers specific to that service
3. **Features / What you get** — checklist (Trust) or bento chip grid (Neo)
4. **Social proof** — placement ticker/feed (Academy), client logos + metrics (Marketing), product cards Atlas/Pulse/Forge/Vault (AI Labs)
5. **How it works** — 3-step process journey specific to each service
6. **Bottom CTA band** — closing conversion section

Process steps per service:
- **Academy**: Apply → Join cohort → Ship a project → Get placed
- **Marketing**: Brief → Strategy & identity → Build & launch → Measure & iterate
- **AI Labs**: Scope → Design & build → Eval & harden → Deploy to production

---

## Navigation

### Nav bar (both themes, all pages)

**Neo-Vibe nav:**
```
[■] NEXARA    Academy  Marketing  AI Labs    [NEO ⇄ TRUST]  [Start_a_project →]
```

**Trust-Grid nav:**
```
[N] Nexara    Academy  Marketing  AI Labs              [Get started]
─────────────────────────────────────────────────────────────────────
              ( Neo-Vibe  ·  Trust-Grid )   ← pill toggle, centered
```

Rules:
- Logo click → navigates to Hub (not gateway)
- Current page link is highlighted (lime underline in Neo, blue underline in Trust)
- All 3 service links always visible — users jump directly between services
- Nav is sticky on scroll

### Theme toggle

| Theme | Toggle style | Location |
|---|---|---|
| Neo-Vibe | Rectangular white button, `NEO ⇄ TRUST` | Right side of nav bar |
| Trust-Grid | Pill toggle (`Neo-Vibe · Trust-Grid`) | Centered, just below nav bar |

Switching theme: re-renders current page in new theme, updates `localStorage("nexara-theme")`. Does not navigate away.

### Back to hub

Logo click on any service page → Hub. No separate back button.

---

## State management

```js
{
  theme: "neo" | "trust",   // persists in localStorage
  page: "gateway" | "hub" | "academy" | "marketing" | "ailabs"
}
```

The harness bar (debug mode selector) is **removed** from the production build. It was prototype chrome only.

---

## Data

`NEXARA` data object is unchanged — single source of truth for all content. The "How it works" process steps are new additions to the data object.

---

## What's NOT changing

- All Neo-Vibe CSS tokens (colors, fonts, spacing)
- All Trust-Grid CSS tokens
- Gateway visual design
- Shared content data (`NEXARA` object)
- All existing component logic and styling within each band

---

## File structure (target)

Single `index.html` — all CSS inlined, all JSX in one `<script type="text/babel">` block (preserves the no-build-step approach that works from `file://`).

Component additions:
- `Hub` — new component, asymmetric bento, both theme variants
- `NeoProcessSteps` — new "How it works" band for Neo
- `TrustProcessSteps` — new "How it works" band for Trust
- Router logic — `page` state drives which component tree renders

Component removals:
- `SplitView` — prototype chrome, not needed in production
- `FloatToggle` (bottom-right floating button) — replaced by per-theme toggle in nav
- Harness bar — prototype chrome, removed
