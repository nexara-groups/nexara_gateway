# Neo Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Neo home hero as a scroll-scrubbed "Nexara Core" product unveil, normalize module alignment on home + Academy/Marketing/Labs pages, and fix animation jank + mobile breaks.

**Architecture:** The hero is real-time Three.js (r128, already loaded) — three box modules that split and re-dock, driven by a paused GSAP timeline whose progress is set from ScrollTrigger scroll progress (no GSAP pin; CSS sticky + 300vh runway per CLAUDE.md). Module/visual fixes are CSS-first in `styles/neo.css`, applied to components in `src/neo.jsx`. No bundler: browser Babel, no `import`/`export`.

**Tech Stack:** React 18 UMD, Babel standalone, GSAP 3.12.5 + ScrollTrigger, Three.js r128, static server (`python3 -m http.server 8090`).

**Spec:** `docs/superpowers/specs/2026-06-10-neo-visual-refresh-design.md`

**Verification note:** No unit-test framework exists (browser Babel prototype). Verification = headless browser (browse skill or any headless Chrome) screenshots + console-error check at 1440 / 760 / 390px. Treat the "verify" steps as the tests: they must pass before commit.

**Accent mapping (binding, used across tasks):** Academy `#ccff00` (Neo `--accent` lime), Marketing `#00f0ff` (Neo cyan), Labs `#ff5c8a` (coral). This keeps Neo's existing lime/cyan identity and adds coral for Labs.

---

### Task 1: Audit pass — findings doc

**Files:**
- Create: `docs/superpowers/plans/2026-06-10-neo-audit-findings.md`

- [ ] **Step 1: Start server**

Run: `python3 -m http.server 8090` (background). Expected: serves on :8090.

- [ ] **Step 2: Screenshot 4 pages × 3 widths**

Use the browse skill (or headless Chrome) on:
`http://localhost:8090/#neo`, `#neo/academy`, `#neo/marketing`, `#neo/labs`
at viewport widths 1440, 760, 390. Capture full-page screenshots and browser console errors.

- [ ] **Step 3: Record findings**

Write `docs/superpowers/plans/2026-06-10-neo-audit-findings.md` with three lists:
1. **Misaligned modules** — per page: component name (e.g., `SectionCards`, `SuperSkills`, `NexaraUnbox`, `ModuleCard` grids), CSS class of its container, what's wrong (uneven heights / inconsistent gutters / ragged edges).
2. **Mobile breaks** — per page at 760/390: overflowing or overlapping elements with their CSS class.
3. **Jank notes** — animations that stutter (marquee, sparkles, reveals) and any console errors.

Also record: the wrapper class each section page sets (run `grep -n "section-\|className=\`" src/neo.jsx | grep -i "SectionPage\|section-page"` and inspect `SectionPage` near `src/neo.jsx:3259`) — Task 6 needs it.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/plans/2026-06-10-neo-audit-findings.md
git commit -m "docs: Neo refresh audit findings"
```

---

### Task 2: Nexara Core hero — scene + scroll timeline

**Files:**
- Modify: `src/neo.jsx` — replace the body of `NeoHero` (currently `src/neo.jsx:1200-1445`, torus-knot particle scene)

Keep the function name `NeoHero({ copy, theme })` and the outer JSX shell contract (`.neo-hero-wrap` > `.neo-hero-sticky`) — `Home` at `src/neo.jsx:1854` and the CSS depend on them. The `!HAS_SCROLL_ANIMATION` fallback to `HeroBanner` in `Home` stays untouched.

- [ ] **Step 1: Replace `NeoHero` with the implementation below**

```jsx
function NeoHero({ copy, theme }) {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const actionsRef = React.useRef(null);
  const labelsRef = React.useRef(null);

  React.useEffect(() => {
    if (!HAS_SCROLL_ANIMATION) return;
    if (!canvasRef.current || !wrapRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 760;
    const staticMode = prefersReducedMotion || isMobile;

    const THREE = window.THREE;
    if (!THREE) { console.error("Three.js not loaded."); return; }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    } catch (err) {
      console.warn("WebGL unavailable — 3D hero skipped, page renders without it.", err);
      return;
    }
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 8);

    scene.add(new THREE.AmbientLight(0x202636, 1.4));
    const keyLight = new THREE.PointLight(0x00f0ff, 0.9, 40);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xccff00, 0.5, 40);
    rimLight.position.set(-7, -3, 5);
    scene.add(rimLight);

    const group = new THREE.Group();
    group.rotation.set(0.14, 0.52, 0);
    // Desktop: core sits in the right grid column; copy occupies the left.
    group.position.x = isMobile ? 0 : 1.6;
    scene.add(group);

    const MODULES = [
      { color: 0xccff00, dock: -0.85, split: { x: -2.5, y: 0,   ry: -0.85 } }, // Academy
      { color: 0x00f0ff, dock: 0,     split: { x: 0,    y: 1.35, ry: 0.55 } }, // Marketing
      { color: 0xff5c8a, dock: 0.85,  split: { x: 2.5,  y: 0,   ry: 0.85 } },  // Labs
    ];

    const disposables = [];
    const meshes = MODULES.map((def) => {
      const geom = new THREE.BoxGeometry(0.8, 2.4, 0.9);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0b0d14, metalness: 0.6, roughness: 0.35,
        emissive: new THREE.Color(def.color), emissiveIntensity: 0.1,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.x = def.dock;
      const edgeGeom = new THREE.EdgesGeometry(geom);
      const edgeMat = new THREE.LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.55 });
      mesh.add(new THREE.LineSegments(edgeGeom, edgeMat));
      group.add(mesh);
      disposables.push(geom, mat, edgeGeom, edgeMat);
      return mesh;
    });

    // Seam planes between docked modules — breathe in stage 1, flash on re-dock.
    const seamGeom = new THREE.PlaneGeometry(0.03, 2.3);
    const seamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    disposables.push(seamGeom, seamMat);
    const seams = [-0.425, 0.425].map((x) => {
      const p = new THREE.Mesh(seamGeom, seamMat);
      p.position.set(x, 0, 0.46);
      group.add(p);
      return p;
    });

    // Animation state driven by the timeline; consumed by the render loop.
    const fx = { seam: 0, glow: 0, flash: 0, spin: 0 };

    const setAssembledState = () => {
      fx.seam = 0; fx.glow = 1; fx.flash = 0; fx.spin = 1;
      meshes.forEach((m, i) => {
        m.position.set(MODULES[i].dock, 0, 0);
        m.rotation.set(0, 0, 0);
      });
    };

    let tl = null;
    let st = null;
    if (!staticMode) {
      if (actionsRef.current) gsap.set(actionsRef.current, { opacity: 0, y: 18 });
      tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
      // Stage 1 (0–0.15): seam breathes.
      tl.to(fx, { seam: 1, duration: 0.15, ease: "none" }, 0);
      // Stage 2 (0.15–0.45): split open + labels in.
      meshes.forEach((m, i) => {
        tl.to(m.position, { x: MODULES[i].split.x, y: MODULES[i].split.y, duration: 0.3 }, 0.15);
        tl.to(m.rotation, { y: MODULES[i].split.ry, duration: 0.3 }, 0.15);
      });
      tl.to(fx, { seam: 0, duration: 0.1, ease: "none" }, 0.15);
      if (labelsRef.current) {
        tl.to(labelsRef.current.children, { opacity: 1, y: 0, stagger: 0.03, duration: 0.12 }, 0.22);
      }
      // Stage 3 (0.5–0.8): re-dock + labels out + lock flash.
      meshes.forEach((m, i) => {
        tl.to(m.position, { x: MODULES[i].dock, y: 0, duration: 0.28, ease: "back.out(1.3)" }, 0.5);
        tl.to(m.rotation, { y: 0, duration: 0.28 }, 0.5);
      });
      if (labelsRef.current) {
        tl.to(labelsRef.current.children, { opacity: 0, y: -8, duration: 0.08 }, 0.52);
      }
      tl.to(fx, { flash: 1, duration: 0.02, ease: "none" }, 0.78)
        .to(fx, { flash: 0, duration: 0.06, ease: "none" }, 0.8);
      // Stage 4 (0.8–1): power up + CTA reveal + idle spin ramps.
      tl.to(fx, { glow: 1, spin: 1, duration: 0.2, ease: "none" }, 0.8);
      if (actionsRef.current) {
        tl.to(actionsRef.current, { opacity: 1, y: 0, duration: 0.15 }, 0.83);
      }

      st = window.ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => tl.progress(self.progress),
      });
    } else {
      setAssembledState();
    }

    const clock = new THREE.Clock();
    let heroVisible = true;
    const visObs = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }, { threshold: 0 });
    visObs.observe(wrapRef.current);

    let animId = 0;
    const renderFrame = () => {
      const t = clock.getElapsedTime();
      seamMat.opacity = Math.max(fx.seam * (0.3 + 0.35 * Math.sin(t * 2.2)), fx.flash);
      meshes.forEach((m) => { m.material.emissiveIntensity = 0.1 + fx.glow * 0.9; });
      group.rotation.y = 0.52 + Math.sin(t * 0.22) * 0.06 + fx.spin * t * 0.05;
      group.position.y = Math.sin(t * 0.5) * 0.05;
      renderer.render(scene, camera);
    };
    if (staticMode) {
      renderFrame(); // single static frame per CLAUDE.md mobile rule
    } else {
      const tick = () => {
        if (heroVisible) renderFrame();
        animId = requestAnimationFrame(tick);
      };
      tick();
    }

    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (staticMode) renderFrame();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      visObs.disconnect();
      window.removeEventListener("resize", handleResize);
      if (st) st.kill();
      if (tl) tl.kill();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="neo-hero-wrap">
      <section className="neo-hero-sticky">
        <div className="neo-hero-bg">
          <div className="neo-hero-grid"></div>
          <canvas ref={canvasRef} className="hero-3d-canvas" />
          <div className="scanlines"></div>
        </div>
        <div className="neo-hud-br neo-hud-tl"></div>
        <div className="neo-hud-br neo-hud-tr"></div>
        <div className="neo-hud-br neo-hud-bl"></div>
        <div className="neo-hud-br neo-hud-brr"></div>
        <div className="neo-hero-copy hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title} <em className="neo-gradient-text">{copy.accent}</em></h1>
          <p className="hero-body">{copy.body}</p>
          <div className="hero-actions" ref={actionsRef}>
            <button onClick={() => routeTo(theme, "academy")}>Start with Academy</button>
            <button className="secondary" onClick={() => routeTo(theme, "customers")}>View proof</button>
          </div>
        </div>
        <div className="neo-core-labels" ref={labelsRef} aria-hidden="true">
          <span className="neo-core-label" style={{ "--label-accent": "#ccff00" }}>01 // ACADEMY</span>
          <span className="neo-core-label" style={{ "--label-accent": "#00f0ff" }}>02 // MARKETING</span>
          <span className="neo-core-label" style={{ "--label-accent": "#ff5c8a" }}>03 // LABS</span>
        </div>
      </section>
    </div>
  );
}
```

Notes for the implementer:
- This **replaces** the entire old `NeoHero` (torus-knot scene). Delete the old body including `Sparkles` usage inside the hero — sparkle layers in the hero are a jank source (Task 7 handles other usages).
- `routeTo`, `HAS_SCROLL_ANIMATION` come from `src/shared.jsx` globals; `gsap`, `ScrollTrigger`, `THREE` are window globals. No imports.

- [ ] **Step 2: Verify desktop scrub**

Server running; load `http://localhost:8090/#neo` at 1440px (headless or real browser). Check: monolith renders right of copy; scroll forward = split → labels → re-dock → flash → glow + CTA fade-in; scroll backward reverses cleanly; no blank band below hero; zero console errors.

- [ ] **Step 3: Commit**

```bash
git add src/neo.jsx
git commit -m "feat: rebuild Neo hero as Nexara Core scroll unveil"
```

---

### Task 3: Hero CSS — labels, CTA reveal, cache bust

**Files:**
- Modify: `styles/neo.css` (hero block, around lines 80–139)
- Modify: `index.html` (`<link>` `?v=` params)

- [ ] **Step 1: Add label styles to `styles/neo.css`** (append after the `.neo .neo-hero-rings` block; `.neo-hero-rings` rules may be deleted if no other component uses the class — check with `grep -n "neo-hero-rings\|neo-hero-core" src/neo.jsx styles/neo.css`; remove orphaned `.neo-hero-core*` rules from the old hero too)

```css
.neo .neo-core-labels{position:absolute;z-index:2;right:clamp(24px,6vw,90px);top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:18px;pointer-events:none}
.neo .neo-core-label{font-family:"JetBrains Mono",monospace;font-size:.72rem;letter-spacing:.14em;color:var(--label-accent,#fff);border:1px solid color-mix(in srgb,var(--label-accent,#fff) 45%,transparent);padding:6px 10px;background:rgba(8,9,12,.72);opacity:0;transform:translateY(10px)}
@media(max-width:760px){.neo .neo-core-labels{display:none}}
```

- [ ] **Step 2: Bump cache-bust param**

In `index.html`, update the `styles/neo.css` link `?v=` to `?v=20260610-neo-core-v1`.

- [ ] **Step 3: Verify**

Reload `#neo` at 1440px: labels appear mid-scroll on the right, styled mono with accent borders; at 390px labels absent. No console errors.

- [ ] **Step 4: Commit**

```bash
git add styles/neo.css index.html
git commit -m "feat: Nexara Core hero label styles + cache bust"
```

---

### Task 4: Hero mobile + reduced-motion verification

**Files:**
- Modify: `styles/neo.css` only if verification fails (mobile rules at lines 128–137 already reset runway/sticky per CLAUDE.md)

- [ ] **Step 1: Verify mobile static fallback**

Load `#neo` at 390px width. Expected: hero is single static frame of the assembled glowing core, page scrolls normally (no 300vh runway — `height:auto` media rule), CTAs visible (GSAP never hid them in static mode), no horizontal overflow.

- [ ] **Step 2: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce` at 1440px. Expected: static assembled core, no scrub, CTAs visible.

- [ ] **Step 3: Fix anything that failed, re-verify, commit**

```bash
git add -A
git commit -m "fix: Neo hero mobile/reduced-motion fallback adjustments"
```

(Skip commit if no changes were needed.)

---

### Task 5: Module grid normalization

**Files:**
- Modify: `styles/neo.css`
- Modify: `src/neo.jsx` only where audit flagged structural misalignment that CSS can't fix
- Read: `docs/superpowers/plans/2026-06-10-neo-audit-findings.md`

- [ ] **Step 1: Add the normalization layer to `styles/neo.css`**

```css
/* Module normalization — one gutter token, equal-height cards */
.neo{--module-gap:clamp(20px,2.5vw,32px)}
.neo .module-card{display:flex;flex-direction:column;height:100%}
.neo .module-card .card-content-wrapper{display:flex;flex-direction:column;flex:1}
.neo .module-card .card-content-wrapper p{flex:1}
.neo .section-card{display:flex;flex-direction:column;height:100%}
```

- [ ] **Step 2: Apply gutter token to flagged grid containers**

For each container class listed under "Misaligned modules" in the findings doc, set `gap:var(--module-gap)` (and `align-items:stretch` where rows have uneven heights) in `styles/neo.css`. Keep selectors scoped under `.neo `.

- [ ] **Step 3: Verify**

Re-screenshot `#neo`, `#neo/academy`, `#neo/marketing`, `#neo/labs` at 1440px. Card rows have equal heights and identical gutters. No regressions at 760/390.

- [ ] **Step 4: Bump `styles/neo.css` `?v=` to `?v=20260610-neo-core-v2` in `index.html`, commit**

```bash
git add styles/neo.css index.html src/neo.jsx
git commit -m "fix: normalize Neo module grids to single gutter/height system"
```

---

### Task 6: Section accent mapping

**Files:**
- Modify: `styles/neo.css`
- Modify: `src/neo.jsx` (`SectionPage` near line 3259) only if no per-section wrapper class exists

- [ ] **Step 1: Set per-section accent variables**

Using the section wrapper class recorded in the audit findings (Task 1 Step 3), add:

```css
.neo [data-section="academy"]{--section-accent:#ccff00}
.neo [data-section="marketing"]{--section-accent:#00f0ff}
.neo [data-section="labs"]{--section-accent:#ff5c8a}
```

If no wrapper exists, add `data-section={section.id}` to the root element returned by `SectionPage` in `src/neo.jsx`, then use the selectors above.

- [ ] **Step 2: Use the variable in section-page module chrome**

```css
.neo [data-section] .module-card span,
.neo [data-section] .section-head .eyebrow{color:var(--section-accent,var(--accent))}
.neo [data-section] .module-card.spotlight-card:hover{border-color:color-mix(in srgb,var(--section-accent,var(--accent)) 55%,transparent)}
```

- [ ] **Step 3: Verify**

`#neo/academy` modules read lime, `#neo/marketing` cyan, `#neo/labs` coral — matching hero label colors. Home unaffected.

- [ ] **Step 4: Bump `?v=` to `?v=20260610-neo-core-v3`, commit**

```bash
git add styles/neo.css index.html src/neo.jsx
git commit -m "feat: per-section accent mapping ties hero story to section pages"
```

---

### Task 7: Animation jank fixes

**Files:**
- Modify: `src/neo.jsx`, `styles/neo.css`
- Read: audit findings "Jank notes"

- [ ] **Step 1: Route stray reveals through `useNeoSectionReveal`**

Find ad-hoc reveal effects: `grep -n "IntersectionObserver\|section-reveal" src/neo.jsx`. Any component running its own reveal observer (outside `useNeoSectionReveal` and the hero visibility observer) switches to the hook.

- [ ] **Step 2: Transform/opacity only**

`grep -n "animation\|transition" styles/neo.css` — any keyframe or transition animating `width`, `height`, `top`, `left`, `margin`, or `box-shadow` on scroll-tied elements converts to `transform`/`opacity` equivalents. (Idle decorative loops like `neo-core-glow` may keep box-shadow if they showed no jank in the audit.)

- [ ] **Step 3: Marquee + sparkles throttle**

In `InfiniteMarquee` (`src/neo.jsx:64`) ensure the track animates via a single CSS `transform` keyframe (no per-frame JS). In `Sparkles` (`src/neo.jsx:40`) cap layer count per the audit's jank notes and ensure it pauses when offscreen (it already observes `.neo-hero-sticky` at line 51 — since the hero no longer renders Sparkles, repoint the observer to the component's own container).

- [ ] **Step 4: Verify**

Scroll all four pages at 1440px — no visible stutter; DevTools performance check optional. Zero console errors.

- [ ] **Step 5: Commit**

```bash
git add src/neo.jsx styles/neo.css
git commit -m "fix: unify Neo reveals, transform-only animations, marquee/sparkle jank"
```

---

### Task 8: Mobile break fixes

**Files:**
- Modify: `styles/neo.css` (mobile media queries), `src/neo.jsx` if structural
- Read: audit findings "Mobile breaks"

- [ ] **Step 1: Fix each recorded break**

For every entry in the findings doc at 760/390: fix overflow with `min-width:0` on grid children / `flex-wrap` / clamped font sizes — never `overflow-x:hidden` on `.site` (project rule; `overflow-x:clip` allowed for containment).

- [ ] **Step 2: Verify**

Re-screenshot all four pages at 760 and 390. No horizontal scrollbar, no overlap.

- [ ] **Step 3: Bump `?v=` to `?v=20260610-neo-core-v4`, commit**

```bash
git add styles/neo.css index.html src/neo.jsx
git commit -m "fix: Neo mobile overflow and overlap breaks"
```

---

### Task 9: Final verification sweep

- [ ] **Step 1: Full pass**

All four pages × 1440/760/390: screenshots clean, console clean. Hero: scrub forward/back, mobile static, reduced-motion static. Unknown route (e.g., `#neo/bogus`) still shows route-check fallback.

- [ ] **Step 2: Cross-theme smoke**

Load `/#trust` and gateway `/` — confirm untouched and rendering (shared files were edited: `src/neo.jsx` hosts gateway too).

- [ ] **Step 3: Commit any final fixes**

```bash
git add -A
git commit -m "chore: Neo visual refresh final verification fixes"
```
