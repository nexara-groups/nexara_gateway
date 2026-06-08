# Themed Hero Scroll Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `HeroBanner` on the Home page with two scroll-driven hero sections — NeoHero (chamfered warp rings open like an iris) and TrustHero (constellation nodes orbit outward to label sections) — using GSAP ScrollTrigger.

**Architecture:** A tall wrapper div (`height: 300vh`) contains a sticky inner section (`position: sticky; top: 0; height: 100vh`). GSAP ScrollTrigger scrubs a paused timeline as scroll progress moves 0→1 through the wrapper. After the wrapper is scrolled past, the hero unpins naturally and the rest of the Home page content scrolls in normally.

**Tech Stack:** GSAP 3.12.5 + ScrollTrigger (CDN, SRI-locked), React 18 (Babel), vanilla CSS in existing theme files.

---

## File Map

| File | Change |
|---|---|
| `index.html` | Add 2 GSAP CDN script tags with SRI hashes before `src/data.js` |
| `src/app.jsx` | Register plugin at module level; add `NeoHero` and `TrustHero` components; update `Home` |
| `styles/neo.css` | Append NeoHero layout + ring + HUD styles |
| `styles/trust.css` | Append TrustHero layout + orbit + node + line styles |

---

## Task 1: Generate SRI hashes and add GSAP to index.html

**Files:**
- Modify: `index.html:19` (before the React script tag)

- [ ] **Step 1: Generate SRI hash for gsap.min.js**

```bash
curl -sL https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

Copy the output — you will use it in the next step prefixed with `sha384-`.

- [ ] **Step 2: Generate SRI hash for ScrollTrigger.min.js**

```bash
curl -sL https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

Copy the output — prefix with `sha384-`.

- [ ] **Step 3: Insert GSAP script tags into index.html**

Add these two lines immediately before `<script src="src/data.js"></script>`, replacing `HASH_A` and `HASH_B` with the values from steps 1 and 2:

```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" integrity="sha384-HASH_A" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" integrity="sha384-HASH_B" crossorigin="anonymous"></script>
  <script src="src/data.js"></script>
```

- [ ] **Step 4: Verify GSAP loads**

```bash
python3 -m http.server 8090
```

Open `http://localhost:8090`. Open DevTools console. Run:

```js
console.log(typeof gsap, typeof ScrollTrigger)
```

Expected output: `function function`

If you see `undefined`, check the script tags are before `src/data.js` and the SRI hashes are correct.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add GSAP 3.12.5 + ScrollTrigger via CDN with SRI"
```

---

## Task 2: Add NeoHero CSS

**Files:**
- Modify: `styles/neo.css` (append to end of file)

- [ ] **Step 1: Append NeoHero styles to styles/neo.css**

```css
.neo .neo-hero-wrap{position:relative;height:300vh}
@media(max-width:760px){.neo .neo-hero-wrap{height:200vh}}
.neo .neo-hero-sticky{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:clamp(28px,5vw,78px);align-items:center;padding:clamp(70px,9vw,126px) clamp(20px,4vw,56px);background:radial-gradient(circle at 78% 20%,rgba(0,240,255,.16),transparent 26%),#000;border-bottom:1px solid var(--line)}
.neo .neo-hero-bg{position:absolute;inset:0;pointer-events:none;z-index:0}
.neo .neo-hero-grid{position:absolute;inset:0;background:linear-gradient(rgba(204,255,0,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(204,255,0,.05) 1px,transparent 1px);background-size:36px 36px}
.neo .neo-hero-copy{position:relative;z-index:2}
.neo .neo-hero-rings{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;height:100%}
.neo .neo-ring{position:absolute;border:1px solid rgba(204,255,0,.55);clip-path:polygon(8% 0,92% 0,100% 8%,100% 92%,92% 100%,8% 100%,0 92%,0 8%)}
.neo .neo-ring-1{width:100px;height:100px;border-color:rgba(204,255,0,.8)}
.neo .neo-ring-2{width:180px;height:180px;border-color:rgba(0,240,255,.5)}
.neo .neo-ring-3{width:260px;height:260px;border-color:rgba(204,255,0,.25)}
.neo .neo-hero-core{position:absolute;width:14px;height:14px;clip-path:polygon(25% 0,75% 0,100% 25%,100% 75%,75% 100%,25% 100%,0 75%,0 25%);background:#ccff00;box-shadow:0 0 16px #ccff00,0 0 32px rgba(204,255,0,.4);z-index:3}
.neo .neo-hud-br{position:absolute;width:16px;height:16px;border-color:rgba(204,255,0,.5);border-style:solid;z-index:4;pointer-events:none}
.neo .neo-hud-tl{top:14px;left:14px;border-width:1.5px 0 0 1.5px}
.neo .neo-hud-tr{top:14px;right:14px;border-width:1.5px 1.5px 0 0}
.neo .neo-hud-bl{bottom:14px;left:14px;border-width:0 0 1.5px 1.5px}
.neo .neo-hud-brr{bottom:14px;right:14px;border-width:0 1.5px 1.5px 0}
@media(max-width:980px){.neo .neo-hero-sticky{grid-template-columns:1fr;align-items:start}.neo .neo-hero-rings{height:220px}}
```

- [ ] **Step 2: Verify CSS file is valid**

```bash
python3 -m http.server 8090
```

Open `http://localhost:8090/#neo`. No console CSS errors. Page looks normal (NeoHero component doesn't exist yet so nothing changes visually).

- [ ] **Step 3: Commit**

```bash
git add styles/neo.css
git commit -m "feat: add NeoHero scroll + ring CSS"
```

---

## Task 3: Add TrustHero CSS

**Files:**
- Modify: `styles/trust.css` (append to end of file)

- [ ] **Step 1: Append TrustHero styles to styles/trust.css**

```css
.trust .trust-hero-wrap{position:relative;height:300vh}
@media(max-width:760px){.trust .trust-hero-wrap{height:200vh}}
.trust .trust-hero-sticky{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:clamp(28px,5vw,78px);align-items:center;padding:clamp(70px,9vw,126px) clamp(20px,4vw,56px);background:linear-gradient(180deg,#fff,var(--bg));border-bottom:1px solid var(--line)}
.trust .trust-hero-copy{position:relative;z-index:2}
.trust .trust-constellation{position:relative;display:flex;align-items:center;justify-content:center;height:100%;z-index:1}
.trust .trust-orbit-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
.trust .trust-orbit-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;border-radius:50%;border:1px solid rgba(14,165,233,.2);pointer-events:none}
.trust .trust-node{position:absolute;top:0;left:0}
.trust .trust-node-dot{width:10px;height:10px;border-radius:50%;background:#0ea5e9;box-shadow:0 0 8px rgba(14,165,233,.6);position:relative;z-index:2}
.trust .trust-node-label{position:absolute;top:-28px;left:14px;background:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.95);border-radius:8px;padding:5px 10px;box-shadow:0 4px 14px rgba(3,105,161,.08);white-space:nowrap}
.trust .trust-node-index{display:block;font-size:8px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#0369a1}
.trust .trust-node-name{display:block;font-size:13px;font-weight:900;color:#0f172a}
.trust .trust-connect-line{position:absolute;top:50%;left:50%;height:1px;background:linear-gradient(90deg,rgba(14,165,233,.6),transparent);transform-origin:left center;pointer-events:none}
.trust .trust-line-1{width:92px;transform:rotate(-130.6deg)}
.trust .trust-line-2{width:76px;transform:rotate(-23.2deg)}
.trust .trust-line-3{width:78px;transform:rotate(75.1deg)}
@media(max-width:980px){.trust .trust-hero-sticky{grid-template-columns:1fr;align-items:start}.trust .trust-constellation{height:220px}}
```

- [ ] **Step 2: Verify no CSS errors**

```bash
# server already running — open http://localhost:8090/#trust
# DevTools console should show no CSS parse errors
```

- [ ] **Step 3: Commit**

```bash
git add styles/trust.css
git commit -m "feat: add TrustHero scroll + constellation CSS"
```

---

## Task 4: Implement NeoHero component

**Files:**
- Modify: `src/app.jsx` — add after the `voice()` function (line 10), before `parseRoute()`

- [ ] **Step 1: Register GSAP plugin at module level**

In `src/app.jsx`, add this line immediately after `const STATIC_PAGES = ["home", "customers", "company", "contact"];` (line 3):

```js
gsap.registerPlugin(ScrollTrigger);
```

- [ ] **Step 2: Add NeoHero component**

Add the following function immediately before the `Gateway` function (before line 26):

```jsx
function NeoHero({ copy, theme }) {
  const wrapRef = React.useRef(null);
  const ring1Ref = React.useRef(null);
  const ring2Ref = React.useRef(null);
  const ring3Ref = React.useRef(null);
  const copyRef = React.useRef(null);
  const ctaRef = React.useRef(null);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 2, rotation: 15 });
      gsap.set([copyRef.current, ctaRef.current], { opacity: 1 });
      return;
    }

    gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 0.4, rotation: 0 });
    gsap.set(copyRef.current, { opacity: 0.15 });
    gsap.set(ctaRef.current, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(ring1Ref.current, { scale: 2, rotation: 12, duration: 0.6, ease: "power2.out" }, 0)
      .to(ring2Ref.current, { scale: 2, rotation: -18, duration: 0.6, ease: "power2.out" }, 0)
      .to(ring3Ref.current, { scale: 2, rotation: 8, duration: 0.6, ease: "power2.out" }, 0)
      .to(copyRef.current, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.1)
      .to(ctaRef.current, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.7);

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      animation: tl,
    });

    ScrollTrigger.refresh();

    return () => { st.kill(); tl.kill(); };
  }, []);

  return (
    <div ref={wrapRef} className="neo-hero-wrap">
      <section className="neo-hero-sticky">
        <div className="neo-hero-bg">
          <div className="neo-hero-grid"></div>
          <div className="scanlines"></div>
        </div>
        <div className="neo-hud-br neo-hud-tl"></div>
        <div className="neo-hud-br neo-hud-tr"></div>
        <div className="neo-hud-br neo-hud-bl"></div>
        <div className="neo-hud-br neo-hud-brr"></div>
        <div ref={copyRef} className="neo-hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title} <em>{copy.accent}</em></h1>
          <p className="hero-body">{copy.body}</p>
          <div ref={ctaRef} className="hero-actions">
            <button onClick={() => routeTo(theme, "academy")}>Start with Academy</button>
            <button className="secondary" onClick={() => routeTo(theme, "customers")}>View proof</button>
          </div>
        </div>
        <div className="neo-hero-rings">
          <div ref={ring1Ref} className="neo-ring neo-ring-1"></div>
          <div ref={ring2Ref} className="neo-ring neo-ring-2"></div>
          <div ref={ring3Ref} className="neo-ring neo-ring-3"></div>
          <div className="neo-hero-core"></div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify component parses**

Reload `http://localhost:8090/#neo`. No Babel/console errors. Page still shows old HeroBanner (Home not wired yet — that's Task 6).

- [ ] **Step 4: Commit**

```bash
git add src/app.jsx
git commit -m "feat: add NeoHero scroll-driven component"
```

---

## Task 5: Implement TrustHero component

**Files:**
- Modify: `src/app.jsx` — add immediately after the closing `}` of `NeoHero`

- [ ] **Step 1: Add TrustHero component**

```jsx
function TrustHero({ copy, theme }) {
  const wrapRef = React.useRef(null);
  const orbitRef = React.useRef(null);
  const node1Ref = React.useRef(null);
  const node2Ref = React.useRef(null);
  const node3Ref = React.useRef(null);
  const label1Ref = React.useRef(null);
  const label2Ref = React.useRef(null);
  const label3Ref = React.useRef(null);
  const line1Ref = React.useRef(null);
  const line2Ref = React.useRef(null);
  const line3Ref = React.useRef(null);
  const copyRef = React.useRef(null);
  const ctaRef = React.useRef(null);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(node1Ref.current, { x: -60, y: -70 });
      gsap.set(node2Ref.current, { x: 70, y: -30 });
      gsap.set(node3Ref.current, { x: 20, y: 75 });
      gsap.set([label1Ref.current, label2Ref.current, label3Ref.current], { opacity: 1 });
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { scaleX: 1 });
      gsap.set(orbitRef.current, { scale: 1, opacity: 1 });
      gsap.set([copyRef.current, ctaRef.current], { opacity: 1 });
      return;
    }

    gsap.set([node1Ref.current, node2Ref.current, node3Ref.current], { x: 0, y: 0 });
    gsap.set([label1Ref.current, label2Ref.current, label3Ref.current], { opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { scaleX: 0 });
    gsap.set(orbitRef.current, { scale: 0.3, opacity: 0 });
    gsap.set(copyRef.current, { opacity: 0.2 });
    gsap.set(ctaRef.current, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(node1Ref.current, { x: -60, y: -70, duration: 0.5, ease: "power2.out" }, 0)
      .to(node2Ref.current, { x: 70, y: -30, duration: 0.5, ease: "power2.out" }, 0)
      .to(node3Ref.current, { x: 20, y: 75, duration: 0.5, ease: "power2.out" }, 0)
      .to(orbitRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      .to([line1Ref.current, line2Ref.current, line3Ref.current],
          { scaleX: 1, duration: 0.3, ease: "power1.out", stagger: 0.05 }, 0.2)
      .to(copyRef.current, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.3)
      .to([label1Ref.current, label2Ref.current, label3Ref.current],
          { opacity: 1, duration: 0.2, ease: "power1.out", stagger: 0.05 }, 0.65)
      .to(ctaRef.current, { opacity: 1, duration: 0.2, ease: "power1.out" }, 0.85);

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      animation: tl,
    });

    ScrollTrigger.refresh();

    return () => { st.kill(); tl.kill(); };
  }, []);

  return (
    <div ref={wrapRef} className="trust-hero-wrap">
      <section className="trust-hero-sticky">
        <div className="trust-hero-bg">
          <div className="orb one"></div>
          <div className="orb two"></div>
        </div>
        <div ref={copyRef} className="trust-hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title} <em>{copy.accent}</em></h1>
          <p className="hero-body">{copy.body}</p>
          <div ref={ctaRef} className="hero-actions">
            <button onClick={() => routeTo(theme, "academy")}>Start with Academy</button>
            <button className="secondary" onClick={() => routeTo(theme, "customers")}>View proof</button>
          </div>
        </div>
        <div className="trust-constellation">
          <div ref={orbitRef} className="trust-orbit-ring"></div>
          <div className="trust-orbit-center">
            <div ref={node1Ref} className="trust-node">
              <div className="trust-node-dot"></div>
              <div ref={label1Ref} className="trust-node-label">
                <span className="trust-node-index">01</span>
                <span className="trust-node-name">Academy</span>
              </div>
            </div>
            <div ref={node2Ref} className="trust-node">
              <div className="trust-node-dot"></div>
              <div ref={label2Ref} className="trust-node-label">
                <span className="trust-node-index">02</span>
                <span className="trust-node-name">Marketing</span>
              </div>
            </div>
            <div ref={node3Ref} className="trust-node">
              <div className="trust-node-dot"></div>
              <div ref={label3Ref} className="trust-node-label">
                <span className="trust-node-index">03</span>
                <span className="trust-node-name">Labs</span>
              </div>
            </div>
          </div>
          <div ref={line1Ref} className="trust-connect-line trust-line-1"></div>
          <div ref={line2Ref} className="trust-connect-line trust-line-2"></div>
          <div ref={line3Ref} className="trust-connect-line trust-line-3"></div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify no errors**

Reload `http://localhost:8090/#trust`. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app.jsx
git commit -m "feat: add TrustHero scroll-driven component"
```

---

## Task 6: Wire themed heroes into Home

**Files:**
- Modify: `src/app.jsx` — the `Home` function (currently around line 130)

- [ ] **Step 1: Replace HeroBanner in Home**

Find the current `Home` function:

```jsx
function Home({ theme }) {
  const sections = Object.values(DATA.sections);
  const copy = DATA.home[theme];
  return (
    <main>
      <HeroBanner theme={theme} eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} body={copy.body} />
      <MarketContext theme={theme} />
```

Replace it with:

```jsx
function Home({ theme }) {
  const sections = Object.values(DATA.sections);
  const copy = DATA.home[theme];
  return (
    <main>
      {theme === "neo"
        ? <NeoHero copy={copy} theme={theme} />
        : <TrustHero copy={copy} theme={theme} />}
      <MarketContext theme={theme} />
      <SuperSkills theme={theme} />
      <SectionCards theme={theme} sections={sections} />
      <Callout title={copy.calloutTitle} body={copy.calloutBody} />
      <StackMatrix sections={sections} />
      <ProofRail theme={theme} />
    </main>
  );
}
```

- [ ] **Step 2: Smoke test Neo**

Open `http://localhost:8090/#neo`. You should see:
- The sticky hero fills the viewport
- Three chamfered rings visible at center-right (small, at scale 0.4)
- Copy faint (opacity 0.15)
- Scroll down — rings expand and rotate, copy fades in
- Continue scrolling — CTA button appears
- Scroll past the hero — MarketContext section slides up normally

- [ ] **Step 3: Smoke test Trust**

Open `http://localhost:8090/#trust`. You should see:
- The sticky hero fills the viewport
- Orbit ring barely visible (scale 0.3), three nodes clustered at center
- Copy faint (opacity 0.2)
- Scroll down — nodes orbit outward to Academy / Marketing / Labs positions, connection lines draw, labels appear
- Scroll past the hero — MarketContext section slides up normally

- [ ] **Step 4: Test reduced-motion**

In DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce".

Reload `http://localhost:8090/#neo` — hero should show Stage 3 (fully revealed) statically, no animation.
Reload `http://localhost:8090/#trust` — same, nodes at final positions, all labels visible.

- [ ] **Step 5: Test section pages are unaffected**

Open `http://localhost:8090/#neo/academy` — should show the original `HeroBanner` unchanged.
Open `http://localhost:8090/#trust/marketing` — same.

- [ ] **Step 6: Commit**

```bash
git add src/app.jsx
git commit -m "feat: wire NeoHero and TrustHero into Home page"
```

---

## Task 7: Mobile check and cleanup

**Files:**
- Possibly modify: `styles/neo.css`, `styles/trust.css` if layout breaks on narrow viewport

- [ ] **Step 1: Test at 375px**

In DevTools → set viewport to 375px width.

Open `http://localhost:8090/#neo`. Expected:
- Single-column layout (grid collapses to 1fr per Task 2 media query)
- Rings still visible in a 220px-height area below the copy
- Scrolling still drives the animation (wrapper is 200vh on mobile)

Open `http://localhost:8090/#trust`. Expected:
- Same single-column collapse
- Constellation visible in 220px area

- [ ] **Step 2: Fix any overflow issues**

If content overflows horizontally on mobile, add to the bottom of `styles/neo.css`:

```css
@media(max-width:760px){.neo .neo-hero-sticky{overflow:hidden;padding:80px 20px 32px}}
```

And in `styles/trust.css`:

```css
@media(max-width:760px){.trust .trust-hero-sticky{overflow:hidden;padding:80px 20px 32px}}
```

- [ ] **Step 3: Final commit**

```bash
git add styles/neo.css styles/trust.css
git commit -m "fix: mobile overflow on themed hero sections"
```

---

## Self-Review

**Spec coverage:**
- ✅ GSAP + ScrollTrigger via CDN with SRI hashes — Task 1
- ✅ NeoHero: chamfered rings expand like iris — Task 4
- ✅ TrustHero: constellation nodes orbit outward — Task 5
- ✅ Scroll-driven via pinned sticky + ScrollTrigger scrub — Tasks 4/5
- ✅ Home page only, section pages untouched — Task 6 step 5
- ✅ `prefers-reduced-motion` — Tasks 4/5 step 1 in each
- ✅ React cleanup (st.kill + tl.kill) — Tasks 4/5
- ✅ Mobile 200vh wrapper + single-column — Tasks 2/3/7
- ✅ Copy content unchanged from `DATA.home[theme]` — Tasks 4/5 JSX
- ✅ Gateway untouched — not in any task (correct)

**No placeholders found.**

**Type consistency:** `NeoHero` and `TrustHero` are named consistently in Home wiring (Task 6) and component definitions (Tasks 4/5). `routeTo` is already a global in app.jsx. `ScrollTrigger` and `gsap` are window globals from CDN. All refs referenced in JSX match the `useRef` declarations.
