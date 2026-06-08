# Neo Scrollytelling — Interaction Requirements

## Project

- Repo: `/Users/naveengalla/Documents/Claude/nexara-gateway`
- Stack: Static React + Babel (browser, no build step). GSAP 3 + ScrollTrigger loaded from CDN.
- Main file to edit: `src/app.jsx`
- Run locally: `python3 -m http.server 8090` → open `http://localhost:8090/#neo`

## Context

Two GSAP components live in `src/app.jsx`:

**`NeoScrollyHero`** — A 300vh sticky scroll wrapper. A GSAP timeline (`heroTl`) scrubs through 6 beats as the user scrolls: Neo's left arm reaches the code panel, propels it away, right arm hits the server rack, rack ricochets, Neo glides to the octahedron and spins it, then breaks out. Currently only positional transforms — no collision responses, no content changes, no fast-scroll logic.

**`NeoGuide`** — A fixed right-edge character overlay. After the hero scrolls out, the guide docks to three sections (`.market-context`, `.sandbox-section`, `.super-skills`) with a speech bubble and beacon line. Currently uses a generic scale + brightness flash on a single target element per section.

## What to implement

### 1. Fast scroll skips the hero

If the user scrolls fast through the hero (velocity above a reasonable threshold while mid-timeline), complete the hero timeline instantly so the guide phase begins without forcing the full 300vh scroll.

### 2. Code panel reacts on touch

When Neo's left arm reaches the code panel (early in the timeline), a new line of code visibly appears in the panel — as if Neo injected it.

### 3. Server rack collision

When Neo's right arm hits the server rack, the rack shakes violently and all server LEDs flash red before settling back to their normal colors.

### 4. Octahedron breaks apart and reforms

When Neo reaches the octahedron, it explodes outward, disappears, then materializes back from nothing — break-apart and reassemble effect.

### 5. Arm extends into content (guide phase)

As Neo travels left toward each section, the character's left arm visibly stretches out toward the content. The arm extends as the body moves — not just the body translating.

### 6. Market Context — city highlight

When Neo docks to the market context section, it points at and highlights a specific city name tag with a bright yellow glow pulse, then the city returns to normal.

### 7. Sandbox — Neo presses the compile button

When Neo docks to the sandbox section, Neo physically presses the compile button: a visible press animation on the button, and it actually triggers the compilation (call `.click()` on the button element).

### 8. SuperSkills — conductor sweep

When Neo docks to the super skills section, Neo sweeps across all cards in sequence like a conductor — each card lights up one after the other with a glow, not just the first card.

### 9. Cleanup on section exit

When Neo leaves a section (undock), all highlighted or animated elements return to their resting state cleanly. Kill any in-progress tweens on interactive elements.

## Energy level

7–8 out of 10. Interactions should feel impactful and theatrical. Not subtle, not chaos.

## Constraints

- Do not use `innerHTML` — use `document.createElement`, `textContent`, and `appendChild`
- Wrap all GSAP code in the existing `HAS_SCROLL_ANIMATION` guard
- No new dependencies — GSAP and ScrollTrigger are already on the CDN
- Do not break existing scroll behavior or the Trust theme (`/#trust`)
