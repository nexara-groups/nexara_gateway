/* ==========================================================================
   ADVANCED HYBRID PARALLAX & COSMETIC MODULES - BACKPORT FROM DUO-THEME
   ========================================================================== */

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

/* Deleted — replaced by RAF loop inside NexaraUnbox (no React state on scroll) */

/* ── Neo avatar SVG — shared by hero and guide ──────────────────── */
function NeoAvatarSVG({ id = "neo-avatar", className = "" }) {
  return (
    <svg id={id} className={`neo-avatar-svg ${className}`} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Signal rings */}
      <circle className="neo-sig-ring-3" cx="50" cy="38" r="46" stroke="#ccff00" strokeWidth="0.4"/>
      <circle className="neo-sig-ring-2" cx="50" cy="38" r="37" stroke="#00f0ff" strokeWidth="0.4"/>
      <circle className="neo-sig-ring-1" cx="50" cy="38" r="28" stroke="#ccff00" strokeWidth="0.5"/>
      {/* Core glow */}
      <polygon className="neo-core-glow" points="50,8 76,23 76,53 50,68 24,53 24,23" fill="rgba(0,240,255,0.04)"/>
      {/* Face plate */}
      <polygon id={`${id}-hex`} points="50,8 76,23 76,53 50,68 24,53 24,23" fill="rgba(0,4,2,0.97)" stroke="#ccff00" strokeWidth="1.4"/>
      {/* Inner ring */}
      <polygon points="50,16 69,27 69,49 50,60 31,49 31,27" fill="none" stroke="#00f0ff" strokeWidth="0.4" strokeOpacity="0.32"/>
      {/* Circuit traces */}
      <path d="M 24 38 L 33 38 L 33 29" stroke="#ccff00" strokeWidth="0.4" strokeOpacity="0.48" fill="none"/>
      <path d="M 76 38 L 67 38 L 67 29" stroke="#ccff00" strokeWidth="0.4" strokeOpacity="0.48" fill="none"/>
      <line x1="38" y1="21" x2="62" y2="21" stroke="#ccff00" strokeWidth="0.3" strokeOpacity="0.22"/>
      {/* Left eye */}
      <g id={`${id}-eye-l`} className="neo-eye-l">
        <circle cx="38" cy="36" r="5.5" fill="#001616"/>
        <circle cx="38" cy="36" r="4"   fill="#00f0ff"/>
        <circle cx="38" cy="36" r="6.5" fill="#00f0ff" fillOpacity="0.1"/>
        <circle cx="39.2" cy="34.8" r="1.4" fill="rgba(255,255,255,0.88)"/>
        <circle cx="37"   cy="37.5" r="0.7" fill="rgba(255,255,255,0.4)"/>
      </g>
      {/* Right eye */}
      <g id={`${id}-eye-r`} className="neo-eye-r">
        <circle cx="62" cy="36" r="5.5" fill="#001616"/>
        <circle cx="62" cy="36" r="4"   fill="#00f0ff"/>
        <circle cx="62" cy="36" r="6.5" fill="#00f0ff" fillOpacity="0.1"/>
        <circle cx="63.2" cy="34.8" r="1.4" fill="rgba(255,255,255,0.88)"/>
        <circle cx="61"   cy="37.5" r="0.7" fill="rgba(255,255,255,0.4)"/>
      </g>
      {/* Mouth */}
      <path id={`${id}-mouth`} d="M 37 54 Q 50 60 63 54" stroke="#ccff00" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      {/* Antenna */}
      <line x1="50" y1="8" x2="50" y2="1" stroke="#ccff00" strokeWidth="1"/>
      <circle cx="50" cy="0" r="2.2" fill="#ccff00" className="neo-led-inner"/>
      <circle cx="50" cy="0" r="4.5" fill="#ccff00" fillOpacity="0.18" className="neo-led-outer"/>
      {/* Body stem */}
      <line x1="50" y1="68" x2="50" y2="81" stroke="#ccff00" strokeWidth="0.9" strokeOpacity="0.7"/>
      <circle cx="50" cy="84" r="3.8" fill="#ccff00" fillOpacity="0.88"/>
      <circle cx="50" cy="84" r="6.5" fill="#ccff00" fillOpacity="0.12"/>
      {/* Left arm */}
      <g id={`${id}-arm-l`}>
        <line id={`${id}-arm-l-line`} x1="24" y1="38" x2="13" y2="31" stroke="#00f0ff" strokeWidth="0.7" strokeOpacity="0.6"/>
        <circle id={`${id}-arm-l-node`} cx="11" cy="30" r="2.8" fill="#00f0ff" fillOpacity="0.72"/>
        <circle cx="11" cy="30" r="5" fill="#00f0ff" fillOpacity="0.11"/>
      </g>
      {/* Right arm */}
      <g id={`${id}-arm-r`}>
        <line id={`${id}-arm-r-line`} x1="76" y1="38" x2="87" y2="31" stroke="#00f0ff" strokeWidth="0.7" strokeOpacity="0.6"/>
        <circle id={`${id}-arm-r-node`} cx="89" cy="30" r="2.8" fill="#00f0ff" fillOpacity="0.72"/>
        <circle cx="89" cy="30" r="5" fill="#00f0ff" fillOpacity="0.11"/>
      </g>
      {/* Bottom float nodes */}
      <line x1="50" y1="84" x2="35" y2="97" stroke="#ccff00" strokeWidth="0.5" strokeOpacity="0.4"/>
      <circle cx="33" cy="99" r="2.2" fill="#ccff00" fillOpacity="0.55"/>
      <line x1="50" y1="84" x2="65" y2="97" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.4"/>
      <circle cx="67" cy="99" r="2.2" fill="#00f0ff" fillOpacity="0.55"/>
    </svg>
  );
}


/* ── Scrollytelling guide (phases 2 & 3) ───────────────────────── */
function NeoGuide() {
  const guideRef    = React.useRef(null);
  const charWrapRef = React.useRef(null);
  const bubbleRef   = React.useRef(null);
  const tagRef      = React.useRef(null);
  const beaconRef   = React.useRef(null);
  const spotlightRef= React.useRef(null);
  const burstRef    = React.useRef(null);

  React.useEffect(() => {
    if (!HAS_SCROLL_ANIMATION) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const guide     = guideRef.current;
    const charWrap  = charWrapRef.current;
    const bubble    = bubbleRef.current;
    const tag       = tagRef.current;
    const beacon    = beaconRef.current;
    const spotlight = spotlightRef.current;
    const burst     = burstRef.current;
    const triggers  = [];
    const guideState = {
      sandboxCompiled: false,
    };
    const guideHomeHero = document.querySelector(".neo-scrolly-hero-wrap");
    const isDesktopFollower = window.matchMedia("(pointer: fine) and (min-width: 761px)").matches;

    guide.classList.toggle("is-cursor-guide", isDesktopFollower);
    guide.classList.toggle("is-scroll-guide", !isDesktopFollower);
    gsap.set(guide,     { autoAlpha: 0 });
    gsap.set(charWrap,  { y: "58vh", x: 0 });
    gsap.set(bubble,    { autoAlpha: 0, y: 10 });
    gsap.set(tag,       { autoAlpha: 0, x: 14 });
    gsap.set(beacon,    { width: 0 });
    gsap.set(spotlight, { autoAlpha: 0, top: "58vh" });
    if (burst) gsap.set(burst, { autoAlpha: 0, scale: 0.2 });

    if (isDesktopFollower) {
      const clean = (text) => (text || "").replace(/\s+/g, " ").trim();
      const textFrom = (node, selector) => clean(node?.querySelector(selector)?.textContent);
      const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
      let followerLive = false;
      let lastKey = "";
      let activeInfo = null;
      const lineCounts = {};
      const rotateLine = (bucket, lines, targetKey = bucket) => {
        if (targetKey === lastKey && activeInfo?.line) return activeInfo.line;
        const index = lineCounts[bucket] || 0;
        lineCounts[bucket] = index + 1;
        return lines[index % lines.length];
      };
      const classifyTarget = (node) => {
        const target = node?.closest?.([
          ".currency-btn",
          ".roi-slider-group",
          ".roi-metric-big",
          ".timeline-node",
          ".slider-handle",
          ".before-after-band",
          ".faq-band details",
          ".intake-cta button",
          ".sandbox-action-btn",
          ".toggle-deck button",
          ".checkbox-deck button",
          ".form-group",
          ".telemetry-card",
          ".blueprint-spec-box",
          ".unbox-word-play button",
          ".unbox-route-card",
          ".unbox-quick-actions button",
          ".unbox-system-panel",
          ".unbox-wrap",
          ".market-cities span",
          ".super-play-feature",
          ".play-sequence",
          ".super-skill-card",
          ".section-card",
          ".module-card",
          ".stack-detail-card",
          ".package-card",
          ".process-grid article",
          ".detail-hero",
          ".market-context",
          ".sandbox-card",
          ".super-skills",
          ".section-grid-wrap",
          ".callout",
          ".stack-matrix",
          ".proof-rail"
        ].join(","));

        if (!target) {
          return {
            key: "idle",
            label: "nap mode",
            line: rotateLine("idle", [
              "hover something.",
              "bored ngl.",
              "i see you lurking.",
              "pick something. anything."
            ], "idle")
          };
        }

        if (target.matches(".currency-btn")) {
          const mode = clean(target.textContent).toLowerCase();
          const key = `currency-${mode}`;
          return {
            key,
            label: "currency toggle",
            line: rotateLine("currency", [
              `swapping coins to ${mode}. respect.`,
              `maths is mathing in any currency.`,
              `${mode} mode hits different.`,
              `counting in ${mode}. let's go.`
            ], key)
          };
        }

        if (target.matches(".roi-slider-group")) {
          const label = clean(target.querySelector("span")?.textContent || "slider").toLowerCase();
          const key = `roi-slider-${label}`;
          return {
            key,
            label: `roi target: ${label}`,
            line: rotateLine("roi-slider", [
              `tweak the ${label}. watch the money build.`,
              `cranking the ${label}. high IQ adjustments.`,
              `moving ${label} up. numbers go brrr.`,
              `modulating ${label}. details count.`
            ], key)
          };
        }

        if (target.matches(".roi-metric-big")) {
          return {
            key: "roi-payout",
            label: "grow payout",
            line: rotateLine("roi-payout", [
              "that's the payout. no cap.",
              "big numbers. big wins.",
              "optimized traffic results look like this.",
              "compounding metrics."
            ], "roi-payout")
          };
        }

        if (target.matches(".timeline-node")) {
          const stepNum = clean(target.querySelector(".node-circle")?.textContent || "01");
          const key = `timeline-${stepNum}`;
          return {
            key,
            label: `process stage ${stepNum}`,
            line: rotateLine("timeline", [
              `stage ${stepNum} unlocked. we follow rules.`,
              `on step ${stepNum}. details compounding.`,
              `that's stage ${stepNum}. check it.`,
              `moving step by step. no shortcuts.`
            ], key)
          };
        }

        if (target.matches(".slider-handle")) {
          return {
            key: "slider-handle",
            label: "design slider",
            line: rotateLine("slider-handle", [
              "drag it. slide it. reveal it.",
              "legacy vs nexara standard. slide it.",
              "interactive revealing. no brainer.",
              "reveal the premium standard."
            ], "slider-handle")
          };
        }

        if (target.matches(".before-after-band")) {
          return {
            key: "before-after",
            label: "design comparison",
            line: rotateLine("before-after", [
              "slide the handle to reveal standard styling.",
              "boring legacy vs nexara standard.",
              "spot the difference. it's night and day.",
              "visual systems check."
            ], "before-after")
          };
        }

        if (target.matches(".faq-band details")) {
          const summary = clean(target.querySelector("summary")?.textContent || "faq").toLowerCase();
          const key = `faq-${summary}`;
          return {
            key,
            label: "faq details",
            line: rotateLine("faq", [
              "got questions? click to reveal response.",
              "accordion drop. check the details.",
              "the fine print is all nominal.",
              "deep lore drop."
            ], key)
          };
        }

        if (target.matches(".intake-cta button")) {
          return {
            key: "intake-btn",
            label: "intake action",
            line: rotateLine("intake-btn", [
              "click it. launch sequence.",
              "project incoming. start building.",
              "stop talking. let's build.",
              "push the button. deploy."
            ], "intake-btn")
          };
        }

        if (target.matches(".unbox-word-play button, .unbox-route-card")) {
          const label = clean(target.querySelector("strong")?.textContent || target.textContent).toLowerCase();
          const key = `unbox-${label}`;
          return {
            key,
            label: "unbox route",
            line: rotateLine("unbox-card", [
              `${label}. click it.`,
              `${label} is a door bestie.`,
              `that's ${label}. tap.`,
              `${label} goes somewhere. go find out.`
            ], key)
          };
        }

        if (target.matches(".unbox-quick-actions button")) {
          const action = clean(target.textContent).toLowerCase();
          const key = `unbox-action-${action}`;
          return {
            key,
            label: "quick move",
            line: rotateLine("unbox-action", [
              `${action}. fast.`,
              `${action}. no detours.`,
              `${action}. why are you still reading this.`,
              `${action}. we go now.`
            ], key)
          };
        }

        if (target.matches(".unbox-system-panel, .unbox-wrap")) {
          return {
            key: "unbox-system",
            label: "core reveal",
            line: rotateLine("unbox-system", [
              "the whole company in a cube. relax.",
              "scroll. it opens.",
              "three sections. one weird little box.",
              "lore dropping."
            ], "unbox-system")
          };
        }

        if (target.matches(".market-cities span")) {
          const city = clean(target.textContent);
          const key = `city-${city}`;
          return { key, label: "city tea", line: rotateLine("city", [
            `${city.toLowerCase()}. that's the market.`,
            `${city.toLowerCase()} said hi.`,
            `we know ${city.toLowerCase()}.`,
            `${city.toLowerCase()} is in the recipe.`
          ], key) };
        }

        if (target.matches(".sandbox-action-btn")) {
          return { key: "compile", label: "send it", line: rotateLine("compile", [
            "press it.",
            "bro just press it.",
            "one click. chaos ends.",
            "do it."
          ], "compile") };
        }

        if (target.matches(".toggle-deck button, .checkbox-deck button")) {
          const control = clean(target.textContent).toLowerCase();
          const key = `control-${control}`;
          return { key, label: "vibe dial", line: rotateLine("control", [
            `${control}. changed.`,
            `${control}. i felt that.`,
            `tweaked ${control}. plan moved.`,
            `${control} selected. interesting.`
          ], key) };
        }

        if (target.matches(".form-group")) {
          const key = `field-${textFrom(target, "label")}`;
          return {
            key,
            label: (textFrom(target, "label") || "input").toLowerCase(),
            line: rotateLine("field", [
              "move this. stuff happens.",
              "small tweak. big consequences.",
              "go on.",
              "that's a setting btw."
            ], key)
          };
        }

        if (target.matches(".telemetry-card")) {
          const key = `metric-${textFrom(target, "span")}`;
          return {
            key,
            label: (textFrom(target, "span") || "telemetry").toLowerCase(),
            line: rotateLine("metric", [
              "numbers. real ones.",
              "data showed up.",
              "look at that number go.",
              "receipts."
            ], key)
          };
        }

        if (target.matches(".blueprint-spec-box")) {
          return {
            key: "blueprint",
            label: (textFrom(target, "h4") || "blueprint").toLowerCase(),
            line: rotateLine("blueprint", [
              "plan spawned.",
              "cooked.",
              "idea has a shape now.",
              "there's your blueprint."
            ], "blueprint")
          };
        }

        if (target.matches(".super-play-feature")) {
          return {
            key: "lead-play",
            label: (textFrom(target, "h3") || "lead play").toLowerCase(),
            line: rotateLine("lead-play", [
              "all three. at once.",
              "the full squad.",
              "combo move unlocked.",
              "academy + marketing + labs. bold."
            ], "lead-play")
          };
        }

        if (target.matches(".play-sequence")) {
          return {
            key: "sequence",
            label: "combo logic",
            line: rotateLine("sequence", [
              "order matters. who knew.",
              "step by step. groundbreaking.",
              "this is the order. trust.",
              "choreographed chaos."
            ], "sequence")
          };
        }

        if (target.matches(".super-skill-card, .section-card, .module-card, .stack-detail-card, .package-card, .process-grid article")) {
          const key = `card-${textFrom(target, "h3")}`;
          return {
            key,
            label: (textFrom(target, "h3") || "card").toLowerCase(),
            line: rotateLine("card", [
              "click it.",
              "there's more inside.",
              "door.",
              "a whole thing in here."
            ], key)
          };
        }

        if (target.matches(".detail-hero")) {
          return {
            key: "detail-hero",
            label: (textFrom(target, ".eyebrow") || "inside page").toLowerCase(),
            line: rotateLine("detail-hero", [
              "deeper now.",
              "lore unlocked.",
              "inside the engine.",
              "more detail, same energy."
            ], "detail-hero")
          };
        }

        if (target.matches(".market-context")) {
          return {
            key: "market",
            label: (textFrom(target, "h2") || "operating context").toLowerCase(),
            line: rotateLine("market", [
              "city check.",
              "the where matters.",
              "local context loaded.",
              "geography entered the chat."
            ], "market")
          };
        }

        if (target.matches(".sandbox-card")) {
          return { key: "sandbox", label: "sandbox", line: rotateLine("sandbox", [
            "touch stuff.",
            "it responds.",
            "mess with it.",
            "interactive. go."
          ], "sandbox") };
        }

        if (target.matches(".super-skills")) {
          return {
            key: "super-skills",
            label: (textFrom(target, "h2") || "super skills").toLowerCase(),
            line: rotateLine("super", [
              "all three sections at once.",
              "the combo play.",
              "squad move.",
              "three engines. one team."
            ], "super-skills")
          };
        }

        if (target.matches(".section-grid-wrap")) {
          return { key: "sections", label: "engines", line: rotateLine("sections", [
            "three doors.",
            "pick one.",
            "academy. marketing. labs. go.",
            "choose."
          ], "sections") };
        }

        if (target.matches(".callout")) {
          return { key: "callout", label: (textFrom(target, "h2") || "callout").toLowerCase(), line: rotateLine("callout", [
            "act.",
            "the page is nudging you.",
            "read. then click.",
            "this one matters."
          ], "callout") };
        }

        if (target.matches(".stack-matrix")) {
          return { key: "matrix", label: (textFrom(target, "h2") || "stack matrix").toLowerCase(), line: rotateLine("matrix", [
            "side by side.",
            "compare without crying.",
            "three columns. clean.",
            "no spreadsheet needed."
          ], "matrix") };
        }

        return { key: "proof", label: "proof rail", line: rotateLine("proof", [
          "receipts.",
          "proof dropped.",
          "documented.",
          "it happened."
        ], "proof") };
      };

      const setInfo = (info) => {
        if (!bubble || !tag) return;
        tag.textContent = info.label;
        bubble.textContent = info.line;
      };
      const boomAt = (x, y) => {
        if (!burst) return;
        gsap.killTweensOf(burst);
        gsap.fromTo(burst,
          { x, y, scale: 0.18, autoAlpha: 0.95, rotate: 0 },
          { scale: 2.7, autoAlpha: 0, rotate: 24, duration: 0.42, ease: "power3.out" }
        );
      };
      const onMove = (event) => {
        if (!followerLive) return;
        const offsetRight = event.clientX > window.innerWidth - 180;
        const x = clamp(event.clientX + (offsetRight ? -340 : 24), 12, window.innerWidth - 340);
        const y = clamp(event.clientY + 18, 84, window.innerHeight - 108);
        gsap.to(charWrap, { x, y, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        gsap.to(spotlight, { autoAlpha: 1, top: y + 38, duration: 0.24, overwrite: "auto" });

        const info = classifyTarget(document.elementFromPoint(event.clientX, event.clientY));
        if (info.key !== lastKey) {
          lastKey = info.key;
          activeInfo = info;
          setInfo(info);
          boomAt(event.clientX, event.clientY);
          gsap.fromTo([bubble, tag], { autoAlpha: 0.55, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.18, overwrite: "auto" });
        }
      };
      const onLeave = () => {
        setInfo({ label: "nap mode", line: "hover something." });
      };
      const showFollower = () => {
        followerLive = true;
        guide.classList.remove("is-offscreen");
        gsap.to(guide, { autoAlpha: 1, duration: 0.28, ease: "power2.out", overwrite: true });
        gsap.to(spotlight, { autoAlpha: 1, duration: 0.28, overwrite: true });
      };
      const hideFollower = () => {
        followerLive = false;
        guide.classList.add("is-offscreen");
        gsap.to(guide, { autoAlpha: 0, duration: 0.22, ease: "power2.in", overwrite: true });
        gsap.to(spotlight, { autoAlpha: 0, duration: 0.22, overwrite: true });
      };

      const homeHero = guideHomeHero;
      if (homeHero) {
        triggers.push(ScrollTrigger.create({
          trigger: homeHero,
          start: "bottom top+=80",
          onEnter: showFollower,
          onEnterBack: showFollower,
          onLeaveBack: hideFollower,
        }));
      }
      if (!homeHero || window.scrollY > homeHero.offsetHeight - window.innerHeight + 80) {
        showFollower();
      }
      gsap.set(charWrap, { x: window.innerWidth - 360, y: 150 });
      gsap.set([bubble, tag], { autoAlpha: 1, x: 0, y: 0 });
      gsap.set(beacon, { width: 0 });
      gsap.set(spotlight, { autoAlpha: 0, top: 188 });
      setInfo({ label: "nap mode", line: "hover something. i'll yap usefully." });
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf([charWrap, bubble, tag, spotlight, burst]);
        triggers.forEach(t => t.kill());
        guide.classList.remove("is-cursor-guide", "is-scroll-guide");
      };
    }

    /* Phase 2: breakout — guide fades in as hero-wrap scrolls out */
    const homeHero = guideHomeHero;
    const showScrollGuide = () => {
      gsap.timeline()
        .to(guide,     { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0)
        .to(charWrap,  { y: "44vh", duration: 1.2, ease: "power3.out" }, 0)
        .to(spotlight, { autoAlpha: 1, top: "44vh", duration: 1 }, 0.3);
    };
    const hideScrollGuide = () => {
      gsap.killTweensOf([charWrap, bubble, tag, beacon, spotlight]);
      gsap.to(guide, { autoAlpha: 0, duration: 0.35 });
      gsap.to(spotlight, { autoAlpha: 0, duration: 0.35 });
      gsap.set(beacon, { width: 0 });
      gsap.set(charWrap, { x: 0 });
      const armLine = guide.querySelector('#neo-guide-avatar-arm-l-line');
      const armNode = guide.querySelector('#neo-guide-avatar-arm-l-node');
      if (armLine) gsap.set(armLine, { attr: { x1: 24, y1: 38, x2: 13, y2: 31 } });
      if (armNode) gsap.set(armNode, { attr: { cx: 11, cy: 30 } });
    };
    if (homeHero) {
      triggers.push(ScrollTrigger.create({
        trigger: homeHero,
        start: "bottom top+=80",
        onEnter: showScrollGuide,
        onLeaveBack: hideScrollGuide,
      }));
    } else {
      showScrollGuide();
    }

    /* Section defs — each has a dock Y, announcement text, and a
       section-specific interact() that fires after Neo travels in    */
    const sectionDefs = [
      {
        sel: ".detail-hero",
        yPos: "30vh",
        label: "Inside page",
        line: "we're inside now.",
        interact: (tl) => {
          const hero = document.querySelector('.detail-hero h2');
          if (!hero) return;
          tl.to(hero, { color: "#ccff00", textShadow: "0 0 24px rgba(204,255,0,0.35)", duration: 0.24, ease: "power2.out" }, "+=0.12")
            .to(hero, { color: "", textShadow: "", duration: 0.5, ease: "power2.inOut" }, "+=0.35");
        },
      },
      {
        sel: ".module-grid.compact",
        yPos: "42vh",
        label: "Options",
        line: "pick one.",
        interact: (tl) => {
          const cards = Array.from(document.querySelectorAll('.module-grid.compact .module-card'));
          if (!cards.length) return;
          tl.to(cards, { y: -8, borderColor: "rgba(204,255,0,0.65)", boxShadow: "0 0 30px rgba(204,255,0,0.16)", duration: 0.22, stagger: 0.06, ease: "power2.out" }, "+=0.1")
            .to(cards, { y: 0, borderColor: "", boxShadow: "", duration: 0.36, stagger: 0.05, ease: "power2.inOut" }, "+=0.18");
        },
      },
      {
        sel: ".stack-detail",
        yPos: "54vh",
        label: "Stack",
        line: "details loading.",
        interact: (tl) => {
          const cards = Array.from(document.querySelectorAll('.stack-detail-card'));
          if (!cards.length) return;
          tl.to(cards, { scale: 1.025, borderColor: "rgba(0,240,255,0.58)", duration: 0.2, stagger: 0.045, ease: "power2.out" }, "+=0.1")
            .to(cards, { scale: 1, borderColor: "", duration: 0.32, stagger: 0.045, ease: "power2.inOut" }, "+=0.14");
        },
      },
      {
        sel: ".market-context",
        yPos: "28vh",
        label: "Academy",
        line: "talent time.",
        interact: (tl) => {
          const cities = Array.from(document.querySelectorAll('.market-cities span'));
          if (!cities.length) return;
          const city = cities.find((item) => /visakhapatnam|vizag|vzag/i.test(item.textContent || "")) || cities[0];
          tl.to(city, {
            color: "#ccff00",
            borderColor: "rgba(204,255,0,0.85)",
            backgroundColor: "rgba(204,255,0,0.14)",
            boxShadow: "0 0 26px rgba(204,255,0,0.36)",
            textShadow: "0 0 20px rgba(204,255,0,0.9)",
            scale: 1.24,
            duration: 0.3,
            ease: "power2.out"
          }, "+=0.12")
            .to(city, { scale: 1, duration: 0.55, ease: "elastic.out(1,0.5)" }, "+=0.5")
            .set(city, { clearProps: "color,borderColor,backgroundColor,boxShadow,textShadow,scale" });
        },
      },
      {
        sel: ".sandbox-section",
        yPos: "44vh",
        label: "Marketing",
        line: "get loud.",
        interact: (tl) => {
          const btn = document.querySelector('.sandbox-action-btn');
          if (!btn) return;
          tl.to(btn, { scale: 0.87, duration: 0.07, ease: "power3.in" }, "+=0.12")
            .to(btn, { scale: 1.07, filter: "brightness(1.9)", duration: 0.14, ease: "power2.out" })
            .to(btn, { scale: 1, filter: "none", duration: 0.38, ease: "elastic.out(1.5,0.5)" })
            .call(() => {
              if (guideState.sandboxCompiled) return;
              guideState.sandboxCompiled = true;
              try { btn.click(); } catch (e) {}
            });
        },
      },
      {
        sel: ".super-skills",
        yPos: "60vh",
        label: "Labs",
        line: "ship it.",
        interact: (tl) => {
          const cards = Array.from(document.querySelectorAll('.super-skill-card'));
          if (!cards.length) return;
          tl.to(cards, { scale: 1.04, borderColor: "rgba(204,255,0,0.75)", boxShadow: "0 0 32px rgba(204,255,0,0.22)", duration: 0.22, stagger: 0.09, ease: "power2.out", overwrite: "auto" }, "+=0.1")
            .to(cards, { scale: 1, borderColor: "", boxShadow: "", duration: 0.4, stagger: 0.09, ease: "elastic.out(1,0.5)" }, "+=0.15");
        },
      },
    ];

    /* dock: vertical align → announce → arm extends + travel → interact → return */
    const dock = (sec) => {
      gsap.killTweensOf([charWrap, bubble, tag, beacon, spotlight]);

      const travelX = -(window.innerWidth * 0.58);
      const tl = gsap.timeline();

      const armLine = guide.querySelector('#neo-guide-avatar-arm-l-line');
      const armNode = guide.querySelector('#neo-guide-avatar-arm-l-node');

      // 1. Snap vertically to section level
      tl.to(charWrap,  { y: sec.yPos, duration: 0.65, ease: "power2.inOut" }, 0)
        .to(spotlight, { top: sec.yPos, duration: 0.65, ease: "power2.inOut" }, 0)
        .to(beacon,    { width: "8vw", duration: 0.4, ease: "power2.out" }, 0.2);

      // 2. Announce section
      tl.call(() => {
        if (bubble) bubble.textContent = sec.line;
        if (tag)    tag.textContent    = sec.label;
      })
      .to(bubble, { autoAlpha: 1, y: 0, duration: 0.35 }, "+=0.05")
      .to(tag,    { autoAlpha: 1, x: 0, duration: 0.35 }, "<0.1");

      // 3. Travel left — arm extends INTO content as Neo moves
      tl.to(charWrap, { x: travelX, duration: 1.05, ease: "power3.out" }, "+=0.45");
      if (armLine) tl.to(armLine, { attr: { x1: 12, y1: 40, x2: -9, y2: 21 }, duration: 0.42, ease: "power2.out" }, "-=0.72");
      if (armNode) tl.to(armNode, { attr: { cx: -12, cy: 19 }, duration: 0.42, ease: "power2.out" }, "<");

      // 4. Section-specific interaction
      if (sec.interact) sec.interact(tl);

      // 5. Return to right edge + retract arm
      tl.to(charWrap, { x: 0, duration: 1.0, ease: "power3.in" }, "+=0.7");
      if (armLine) tl.to(armLine, { attr: { x1: 24, y1: 38, x2: 13, y2: 31 }, duration: 0.48, ease: "power2.inOut" }, "<0.18");
      if (armNode) tl.to(armNode, { attr: { cx: 11, cy: 30 }, duration: 0.48, ease: "power2.inOut" }, "<");
    };

    const undock = () => {
      gsap.killTweensOf([charWrap, bubble, tag, beacon]);
      gsap.killTweensOf(Array.from(document.querySelectorAll('.super-skill-card, .market-cities span, .sandbox-action-btn')));
      gsap.to(Array.from(document.querySelectorAll('.super-skill-card')), { scale: 1, borderColor: "", boxShadow: "", duration: 0.3, overwrite: true });
      gsap.to(charWrap,  { x: 0, y: "44vh", duration: 0.55, ease: "power2.inOut", overwrite: true });
      gsap.to(spotlight, { top: "44vh", duration: 0.55, overwrite: true });
      gsap.to(bubble,    { autoAlpha: 0, y: 10, duration: 0.25, overwrite: true });
      gsap.to(tag,       { autoAlpha: 0, x: 14, duration: 0.25, overwrite: true });
      gsap.to(beacon,    { width: 0, duration: 0.2, overwrite: true });
      const armLine = guide.querySelector('#neo-guide-avatar-arm-l-line');
      const armNode = guide.querySelector('#neo-guide-avatar-arm-l-node');
      if (armLine) gsap.to(armLine, { attr: { x1: 24, y1: 38, x2: 13, y2: 31 }, duration: 0.4, overwrite: true });
      if (armNode) gsap.to(armNode, { attr: { cx: 11, cy: 30 }, duration: 0.4, overwrite: true });

      const cities = Array.from(document.querySelectorAll('.market-cities span'));
      const cards = Array.from(document.querySelectorAll('.super-skill-card'));
      const btn = document.querySelector('.sandbox-action-btn');
      gsap.set(cities, { clearProps: "color,borderColor,backgroundColor,boxShadow,textShadow,scale" });
      gsap.set(cards, { clearProps: "scale,borderColor,boxShadow" });
      if (btn) gsap.set(btn, { clearProps: "scale,filter,boxShadow" });
    };

    sectionDefs.forEach((sec) => {
      const el = document.querySelector(sec.sel);
      if (!el) return;
      triggers.push(ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 30%",
        onEnter:     () => dock(sec),
        onLeave:     undock,
        onEnterBack: () => dock(sec),
        onLeaveBack: undock,
      }));
    });

    return () => {
      undock();
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} className="neo-guide-spotlight" aria-hidden="true"/>
      <div ref={guideRef} className="neo-guide-overlay" aria-hidden="true">
        <div ref={burstRef} className="neo-guide-burst"/>
        <div ref={charWrapRef} className="neo-guide-char-wrap">
          <div ref={bubbleRef} className="neo-guide-bubble"/>
          <div style={{ position: "relative" }}>
            <div ref={beaconRef} className="neo-guide-beacon"/>
            <NeoAvatarSVG id="neo-guide-avatar" className="neo-guide-char-svg"/>
            <div ref={tagRef} className="neo-guide-tag"/>
          </div>
        </div>
      </div>
    </>
  );
}

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
    if (!THREE) {
      console.error("Three.js not loaded.");
      return;
    }

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
      { color: 0xccff00, dock: -0.85, split: { x: -2.5, y: 0, ry: -0.85 } },
      { color: 0x00f0ff, dock: 0, split: { x: 0, y: 1.35, ry: 0.55 } },
      { color: 0xff5c8a, dock: 0.85, split: { x: 2.5, y: 0, ry: 0.85 } },
    ];

    const disposables = [];
    const meshes = MODULES.map((def) => {
      const geom = new THREE.BoxGeometry(0.8, 2.4, 0.9);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0b0d14,
        metalness: 0.6,
        roughness: 0.35,
        emissive: new THREE.Color(def.color),
        emissiveIntensity: 0.1,
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
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(seamGeom, seamMat);
    [-0.425, 0.425].forEach((x) => {
      const p = new THREE.Mesh(seamGeom, seamMat);
      p.position.set(x, 0, 0.46);
      group.add(p);
    });

    // Animation state driven by the timeline; consumed by the render loop.
    const fx = { seam: 0, glow: 0, flash: 0, spin: 0 };

    const setAssembledState = () => {
      fx.seam = 0;
      fx.glow = 1;
      fx.flash = 0;
      fx.spin = 1;
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
      tl.to(fx, { seam: 1, duration: 0.15, ease: "none" }, 0);
      meshes.forEach((m, i) => {
        tl.to(m.position, { x: MODULES[i].split.x, y: MODULES[i].split.y, duration: 0.3 }, 0.15);
        tl.to(m.rotation, { y: MODULES[i].split.ry, duration: 0.3 }, 0.15);
      });
      tl.to(fx, { seam: 0, duration: 0.1, ease: "none" }, 0.15);
      if (labelsRef.current) {
        tl.to(labelsRef.current.children, { opacity: 1, y: 0, stagger: 0.03, duration: 0.12 }, 0.22);
      }
      meshes.forEach((m, i) => {
        tl.to(m.position, { x: MODULES[i].dock, y: 0, duration: 0.28, ease: "back.out(1.3)" }, 0.5);
        tl.to(m.rotation, { y: 0, duration: 0.28 }, 0.5);
      });
      if (labelsRef.current) {
        tl.to(labelsRef.current.children, { opacity: 0, y: -8, duration: 0.08 }, 0.52);
      }
      tl.to(fx, { flash: 1, duration: 0.02, ease: "none" }, 0.78)
        .to(fx, { flash: 0, duration: 0.06, ease: "none" }, 0.8);
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
    const visObs = new IntersectionObserver(([e]) => {
      heroVisible = e.isIntersecting;
    }, { threshold: 0 });
    visObs.observe(wrapRef.current);

    let animId = 0;
    const renderFrame = () => {
      const t = clock.getElapsedTime();
      seamMat.opacity = Math.max(fx.seam * (0.3 + 0.35 * Math.sin(t * 2.2)), fx.flash);
      meshes.forEach((m) => {
        m.material.emissiveIntensity = 0.1 + fx.glow * 0.9;
      });
      group.rotation.y = 0.52 + Math.sin(t * 0.22) * 0.06 + fx.spin * t * 0.05;
      group.position.y = Math.sin(t * 0.5) * 0.05;
      renderer.render(scene, camera);
    };
    if (staticMode) {
      renderFrame(); // single static frame per mobile/reduced-motion rules
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

function TrustHero({ copy, theme }) {
  const wrapRef = React.useRef(null);
  const pinRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const copyRef = React.useRef(null);

  React.useEffect(() => {
    if (!HAS_SCROLL_ANIMATION) return;
    if (!canvasRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const THREE = window.THREE;
    if (!THREE) {
      console.error("Three.js not loaded.");
      return;
    }

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    } catch (err) {
      console.warn("WebGL unavailable — 3D hero skipped, page renders without it.", err);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.5;

    const isMobile = window.innerWidth <= 980;

    // Create a 3D Group to hold all globe elements
    const globeGroup = new THREE.Group();
    globeGroup.position.set(isMobile ? 0 : 1.25, isMobile ? -1.0 : 0, 0);
    scene.add(globeGroup);

    // 1. Globe Sphere Particles
    const r = 1.7;
    const globeGeom = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    globeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const globeMaterial = new THREE.PointsMaterial({
      color: 0x0ea5e9, // Corporate blue
      size: 0.03,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const globePoints = new THREE.Points(globeGeom, globeMaterial);
    globeGroup.add(globePoints);

    // 2. Orbital Rings
    const ringGeom = new THREE.RingGeometry(1.95, 2.0, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    ring.rotation.y = Math.PI / 8;
    globeGroup.add(ring);

    // 3. City Hubs (glowing dots)
    const cities = [
      { name: "Visakhapatnam", lat: 17.7, lon: 83.3 },
      { name: "Vijayawada",    lat: 16.5, lon: 80.6 },
      { name: "Coimbatore",    lat: 11.0, lon: 77.0 },
      { name: "Kochi",         lat: 9.9,  lon: 76.3 },
      { name: "Madurai",       lat: 9.9,  lon: 78.1 },
      { name: "Mangalore",     lat: 12.9, lon: 74.8 }
    ];

    const convertCoords = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.sin(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta)
      );
    };

    const cityNodes = [];
    const nodeGeom = new THREE.SphereGeometry(0.05, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Electric cyan
      transparent: true,
      opacity: 0.85
    });

    cities.forEach(city => {
      const pos = convertCoords(city.lat, city.lon, r);
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.copy(pos);
      globeGroup.add(nodeMesh);
      cityNodes.push(nodeMesh);
    });

    // 4. Connection Arcs
    const linesGroup = new THREE.Group();
    globeGroup.add(linesGroup);

    const connections = [];
    for (let i = 0; i < cities.length; i++) {
      const p1 = convertCoords(cities[i].lat, cities[i].lon, r);
      const p2 = convertCoords(cities[(i + 1) % cities.length].lat, cities[(i + 1) % cities.length].lon, r);
      
      const curve = new THREE.QuadraticBezierCurve3(
        p1,
        p1.clone().add(p2).multiplyScalar(0.5).multiplyScalar(1.2), // Pull arc outwards
        p2
      );
      
      const curvePoints = curve.getPoints(25);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.15
      });
      
      const line = new THREE.Line(lineGeom, lineMat);
      linesGroup.add(line);
      connections.push(line);
    }

    // Scroll state object to animate with GSAP
    const state = {
      progress: 0,
      zoom: 6.5,
      rotateY: 0,
      lineOpacity: 0.15,
      globeRotateSpeed: 1.0,
      posOffset: isMobile ? -1.0 : 0
    };

    // GSAP ScrollTrigger
    const tl = window.gsap.timeline({ paused: true });
    tl.to(state, {
      progress: 1,
      zoom: 4.8,
      rotateY: Math.PI / 1.5,
      lineOpacity: 0.85,
      globeRotateSpeed: 0.25,
      posOffset: isMobile ? 1.0 : 0,
      duration: 1,
      ease: "none"
    });

    const shouldPin = window.innerWidth > 760;
    const st = shouldPin ? window.ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      animation: tl
    }) : null;
    if (!shouldPin) tl.progress(0.32);

    // Fade in text copy on load
    const els = copyRef.current ? [...copyRef.current.children] : [];
    if (els.length) {
      window.gsap.from(els, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15
      });
    }

    // Mouse movement interactive tilt
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      targetMouse.x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      targetMouse.y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Base globe spin + scroll rotation
      globeGroup.rotation.y = elapsedTime * 0.08 * state.globeRotateSpeed + state.rotateY + mouse.x * 0.35;
      globeGroup.rotation.x = elapsedTime * 0.04 * state.globeRotateSpeed + mouse.y * 0.35;

      camera.position.z = state.zoom;

      // Position update for mobile stacked layouts
      const isMob = window.innerWidth <= 980;
      globeGroup.position.set(isMob ? 0 : 1.25, isMob ? state.posOffset : 0, 0);

      // Animate line opacity and node pulsing
      connections.forEach(line => {
        line.material.opacity = state.lineOpacity + Math.sin(elapsedTime * 4) * 0.06;
      });

      cityNodes.forEach((node, idx) => {
        const pulse = 1.0 + Math.sin(elapsedTime * 5 + idx) * 0.15;
        node.scale.setScalar(pulse);
      });

      if (trustVisible) renderer.render(scene, camera);
      if (!prefersReducedMotion) animId = requestAnimationFrame(tick);
    };

    let trustVisible = true;
    const visObs = new IntersectionObserver(([e]) => {
      trustVisible = e.isIntersecting;
    }, { threshold: 0 });
    visObs.observe(wrapRef.current);
    tick();

    // Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const isMob = window.innerWidth <= 980;
      state.posOffset = isMob ? (state.progress * 2 - 1.0) : 0;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      animId = 0;
      visObs.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (st) st.kill();
      tl.kill();
      globeGeom.dispose();
      ringGeom.dispose();
      nodeGeom.dispose();
      globeMaterial.dispose();
      ringMat.dispose();
      nodeMat.dispose();
      connections.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="trust-hero-wrap">
      <section ref={pinRef} className="trust-hero-sticky">
        <div className="trust-video-layer" aria-hidden="true">
          <div className="trust-video-fallback"></div>
          <canvas ref={canvasRef} className="hero-3d-canvas" />
          <div className="trust-video-overlay"></div>
        </div>
        <div className="trust-cinematic-copy hero-copy" ref={copyRef}>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title} <em>{copy.accent}</em></h1>
          <p className="hero-body">{copy.body}</p>
          <div className="hero-actions">
            <button onClick={() => routeTo(theme, "academy")}>Start with Academy</button>
            <button className="secondary" onClick={() => routeTo(theme, "customers")}>View proof</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Gateway() {
  const [hover, setHover] = useState(null);
  const neo = DATA.gateway.neo;
  const trust = DATA.gateway.trust;
  return (
    <main className={"gateway " + (hover ? "is-" + hover : "")}>
      <section 
        className="gate-panel gate-neo" 
        onMouseEnter={() => setHover("neo")} 
        onMouseLeave={() => setHover(null)} 
        onClick={() => routeTo("neo")}
      >
        <div className="gate-motion-grid"></div>
        <div className="gate-content">
          <p className="gate-kicker">{neo.kicker}</p>
          <h1>{neo.title}</h1>
          <p>{neo.body}</p>
          <div className="gate-mini-stats">
            {neo.chips.map(chip => <span key={chip}>{chip}</span>)}
          </div>
          <button onClick={(e) => { e.stopPropagation(); routeTo("neo"); }}>
            {neo.cta}
          </button>
        </div>
      </section>
      <section 
        className="gate-panel gate-trust" 
        onMouseEnter={() => setHover("trust")} 
        onMouseLeave={() => setHover(null)} 
        onClick={() => routeTo("trust")}
      >
        <div className="gate-content">
          <p className="gate-kicker">{trust.kicker}</p>
          <h1>{trust.title}</h1>
          <p>{trust.body}</p>
          <div className="gate-mini-stats">
            {trust.chips.map(chip => <span key={chip}>{chip}</span>)}
          </div>
          <button onClick={(e) => { e.stopPropagation(); routeTo("trust"); }}>
            {trust.cta}
          </button>
        </div>
      </section>
      <div className="gate-brand">
        <strong>NEXARA</strong>
        <span>one company / two presentations</span>
      </div>
    </main>
  );
}


function Site({ theme, page, detail }) {
  const isNeo = theme === "neo";
  const section = DATA.sections[page];
  React.useEffect(() => { window.scrollTo(0, 0); }, [theme, page]);
  const validPage = section || STATIC_PAGES.includes(page);
  const className = isNeo ? "site neo" : "site trust";
  return (
    <div className={className}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav theme={theme} page={page} detail={detail} />
      <BreadcrumbBar page={page} detail={detail} />
      <div id="main">
        {page === "home" && <Home theme={theme} />}
        {section && <SectionPage theme={theme} section={section} detail={detail} />}
        {page === "customers" && <Customers theme={theme} detail={detail} />}
        {page === "company" && <Company theme={theme} />}
        {page === "contact" && <Contact theme={theme} detail={detail} />}
        {!validPage && <NotFound theme={theme} page={page} />}
      </div>
      {isNeo && HAS_SCROLL_ANIMATION && <NeoGuide key={`${page}-${detail || "root"}`} />}
      <Footer theme={theme} />
    </div>
  );
}

function Nav({ theme, page, detail }) {
  return (
    <header className="nav">
      <button className="logo" onClick={() => { window.location.hash = ""; }}>Nexara</button>
      <nav>
        {DATA.nav.map((item) => (
          <button key={item.page} className={page === item.page ? "active" : ""} onClick={() => routeTo(theme, item.page)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="theme-pill">
        <button className={theme === "neo" ? "active" : ""} onClick={() => routeTo("neo", page, detail)}>Neo</button>
        <button className={theme === "trust" ? "active" : ""} onClick={() => routeTo("trust", page, detail)}>Trust</button>
      </div>
    </header>
  );
}


function BreadcrumbBar({ page, detail }) {
  const section = DATA.sections[page];
  const labels = { customers: "Proof", company: "Company", contact: "Contact" };
  const current = section ? section.name : labels[page];
  const subpage = detail ? section?.subpages.find((item) => item.slug === detail)?.title : null;
  return (
    <div className="breadcrumb-bar" aria-label="Current location">
      <span>Nexara</span>
      {current && <><span className="breadcrumb-sep">/</span><span>{current}</span></>}
      {subpage && <><span className="breadcrumb-sep">/</span><span>{subpage}</span></>}
    </div>
  );
}


function Home({ theme }) {
  const sections = Object.values(DATA.sections);
  const copy = DATA.home[theme];
  const isNeo = theme === "neo";
  return (
    <main>
      {!HAS_SCROLL_ANIMATION
        ? <HeroBanner theme={theme} eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} body={copy.body} />
        : isNeo
        ? <NeoHero copy={copy} theme={theme} />
        : <TrustHero copy={copy} theme={theme} />}
      <NexaraUnbox theme={theme} />
      <div className="home-group section-reveal">
        <SectionCards theme={theme} sections={sections} />
        <SuperSkills theme={theme} />
      </div>
      <div className="home-evidence section-reveal">
        <MarketContext theme={theme} />
        <HomeProof theme={theme} />
      </div>
      <HomeIntakeCTA theme={theme} />
    </main>
  );
}

function AcademyHero({ theme, section }) {
  const wrapRef = React.useRef(null);
  const pinRef = React.useRef(null);
  const cubeRef = React.useRef(null);
  const faceRefs = React.useRef([]);
  const contentRefs = React.useRef([]);
  const cardRefs = React.useRef([]);
  const stageBaseRef = React.useRef(null);
  const captionTitleRef = React.useRef(null);
  const captionDescRef = React.useRef(null);
  const deckRef = React.useRef(null);
  const applyFrameRef = React.useRef(null);

  const copy = section.hero[theme];

  const pillars = [
    {
      id: "books",
      label: theme === "neo" ? "01 / Skilling" : "1. Structured skilling",
      title: "Books & Tracks",
      desc: theme === "neo" ? "Full-stack, AI, UX sprint-based builds." : "Role-aligned skilling across modern engineering & design.",
      color: "var(--unbox-academy)",
      sub: "6 options",
      details: ["React & Node", "Applied AI", "UI/UX Systems", "DevOps basics"]
    },
    {
      id: "trainings",
      label: theme === "neo" ? "02 / Cohorts" : "2. Cohort training",
      title: "Cohorts & Mentoring",
      desc: theme === "neo" ? "Live checkpoints, review boards, visible rhythm." : "Structured training schedules with weekly review checkpoints.",
      color: "var(--unbox-standards)",
      sub: "3 groups",
      details: ["Weekly sprints", "Industry mentors", "Live reviews", "Progress logs"]
    },
    {
      id: "internships",
      label: theme === "neo" ? "03 / Projects" : "3. Managed internships",
      title: "Internships & Projects",
      desc: theme === "neo" ? "Real projects, mentor pressure, actual ship cycles." : "Project scoping, task delivery, and portfolio creation.",
      color: "var(--unbox-marketing)",
      sub: "4 stages",
      details: ["Real client projects", "Sprint delivery", "Junior workflows", "Deliverables code"]
    },
    {
      id: "placements",
      label: theme === "neo" ? "04 / Outcomes" : "4. Placements desk",
      title: "Placements Desk",
      desc: theme === "neo" ? "No placement theater. Real portfolio matching." : "Employer-aligned hiring Desk & screening paths.",
      color: "var(--unbox-labs)",
      sub: "1 outcome",
      details: ["Portfolio matching", "Mock interviews", "Employer desks", "Offer tracking"]
    }
  ];

  const handleExplore = () => {
    const target = document.querySelector(".subnav");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCardClick = (index) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const runway = Number(wrap.dataset.scrollRunway || 0);
    const isStickyMode = runway > 0;

    if (isStickyMode) {
      const top = rect.top + window.scrollY;
      const targetP = 0.125 + index * 0.25;
      window.scrollTo({
        top: top + targetP * runway,
        behavior: "smooth"
      });
    } else {
      if (applyFrameRef.current) {
        applyFrameRef.current(0.125 + index * 0.25);
      }
    }
  };

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const layout = { top: 0, height: 0, innerHeight: 0 };
    const measureLayout = () => {
      const rect = wrap.getBoundingClientRect();
      layout.top = rect.top + window.scrollY;
      layout.height = rect.height;
      layout.innerHeight = window.innerHeight;
    };

    measureLayout();
    const measureTimer = setTimeout(measureLayout, 200);

    const applyFrame = (p) => {
      const activeIndex = Math.min(3, Math.floor(p * 4));
      const openProgress = clamp01(p / 0.12);

      // Rotate box based on scroll
      if (cubeRef.current) {
        const rotY = -45 + p * 360;
        const scale = 0.8 + p * 0.15;
        const rotX = 58 - Math.sin(p * Math.PI * 3) * 5;
        cubeRef.current.style.transform = `rotateX(${rotX}deg) rotateY(0deg) rotateZ(${rotY}deg) scale(${scale})`;
      }

      // Unbox cube faces
      faceRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) { // bottom
          el.style.transform = "translate3d(0, 0, -40px)";
        } else if (i === 1) { // back
          const ty = -40 - openProgress * 40;
          const tz = -40 * (1 - openProgress);
          const rx = 90 - openProgress * 90;
          el.style.transform = `translate3d(0, ${ty}px, ${tz}px) rotateX(${rx}deg)`;
          el.style.opacity = 1 - openProgress * 0.4;
        } else if (i === 2) { // left
          const tx = -40 - openProgress * 40;
          const tz = -40 * (1 - openProgress);
          const ry = -90 + openProgress * 90;
          el.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg)`;
          el.style.opacity = 1 - openProgress * 0.4;
        } else if (i === 3) { // right
          const tx = 40 + openProgress * 40;
          const tz = -40 * (1 - openProgress);
          const ry = 90 - openProgress * 90;
          el.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg)`;
          el.style.opacity = 1 - openProgress * 0.4;
        } else if (i === 4) { // front
          const ty = 40 + openProgress * 40;
          const tz = -40 * (1 - openProgress);
          const rx = -90 + openProgress * 90;
          el.style.transform = `translate3d(0, ${ty}px, ${tz}px) rotateX(${rx}deg)`;
          el.style.opacity = 1 - openProgress * 0.4;
        } else if (i === 5) { // top
          const ty = -40 - openProgress * 40;
          const tz = 40;
          const rx = 0 - openProgress * 125;
          el.style.transform = `translate3d(0, ${ty}px, ${tz}px) rotateX(${rx}deg)`;
          el.style.opacity = 1 - openProgress * 0.5;
        }
      });

      // Update emerging visual content
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        const isActive = i === activeIndex;
        el.style.opacity = isActive ? 1 : 0;
        el.style.visibility = isActive ? "visible" : "hidden";
        el.style.transform = isActive ? "translate3d(0, 0, 0)" : "translate3d(0, 0, -20px)";
      });

      // Update card positioning (fan-out layout driven by scroll)
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const isActive = i === activeIndex;
        el.classList.toggle("is-active", isActive);

        // Calculate positioning: fanned relative to the activeIndex
        const yOffset = (i - activeIndex) * 62;
        const zOffset = isActive ? 30 : 0;
        const rotZ = (i - 1.5) * 4;

        el.style.transform = `translate3d(0px, ${yOffset}px, ${zOffset}px) rotateZ(${rotZ}deg)`;
        el.style.zIndex = isActive ? 50 : 20 - i;
      });

      // Update deck container custom property for styling support
      if (deckRef.current) {
        deckRef.current.style.setProperty("--active-pillar", activeIndex);
      }

      // Update caption texts
      if (captionTitleRef.current) captionTitleRef.current.textContent = pillars[activeIndex].title;
      if (captionDescRef.current) captionDescRef.current.textContent = pillars[activeIndex].desc;

      // Update grid base color theme
      if (stageBaseRef.current) {
        stageBaseRef.current.style.background = `radial-gradient(circle, ${pillars[activeIndex].color} 0%, transparent 70%)`;
      }
    };

    applyFrameRef.current = applyFrame;

    const shouldPin = HAS_SCROLL_ANIMATION && window.ScrollTrigger && window.innerWidth > 980;
    if (shouldPin && pinRef.current) {
      const runway = Math.round(Math.min(760, Math.max(420, window.innerHeight * 0.7)));
      wrap.dataset.scrollRunway = String(runway);
      applyFrame(0);
      const st = window.ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top 68px",
        end: `+=${runway}`,
        scrub: 0.35,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => applyFrame(self.progress)
      });
      return () => {
        clearTimeout(measureTimer);
        delete wrap.dataset.scrollRunway;
        st.kill();
      };
    }

    let lastP = -1;
    let scrollY = window.scrollY;
    let ticked = false;

    const update = () => {
      ticked = false;
      const isStickyMode = layout.height > layout.innerHeight * 1.1;
      if (!isStickyMode) return;
      const total = Math.max(1, layout.height - layout.innerHeight);
      const p = clamp01((scrollY - layout.top) / total);
      if (Math.abs(p - lastP) > 0.0003) {
        lastP = p;
        applyFrame(p);
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      if (!ticked) {
        requestAnimationFrame(update);
        ticked = true;
      }
    };

    const handleResize = () => {
      measureLayout();
      const isStickyMode = layout.height > layout.innerHeight * 1.1;
      if (!isStickyMode) {
        applyFrame(0.125);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial paint
    measureLayout();
    const isStickyMode = layout.height > layout.innerHeight * 1.1;
    if (isStickyMode) {
      handleScroll();
    } else {
      applyFrame(0.125);
    }

    return () => {
      clearTimeout(measureTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <div ref={wrapRef} className="academy-hero-scroll-wrap">
      <section ref={pinRef} className="academy-hero hero-banner compact">
        <div className="hero-bg">
          <div className="orb one"></div>
          <div className="orb two"></div>
          <div className="scanlines"></div>
        </div>
        
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.title}{" "}
            <em>{copy.accent}</em>
          </h1>
          <p className="hero-body">{copy.body}</p>
          <div className="hero-actions">
            <button onClick={handleExplore}>{copy.primary}</button>
            <button className="secondary" onClick={() => routeTo(theme, "customers", "academy")}>{copy.secondary}</button>
          </div>
        </div>

        <div className="academy-reactor-panel">
          <span className="reactor-eyebrow">{theme === "neo" ? "// ACADEMY REACTOR" : "Academy Capability Deck"}</span>
          <div className="academy-reactor">
            
            {/* Holographic 3D Unboxing Stage */}
            <div className="reactor-unbox-stage">
              <div ref={stageBaseRef} className="stage-grid-base"></div>
              <div ref={cubeRef} className="unbox-box-3d">
                {/* 3D Cube faces that fold open */}
                {["bottom", "back", "left", "right", "front", "top"].map((faceName, i) => (
                  <div
                    key={faceName}
                    ref={el => { faceRefs.current[i] = el; }}
                    className={`box-3d-face ${faceName}`}
                    style={{ "--face-color": pillars[0].color }}
                  ></div>
                ))}
                
                {/* Emerging 3D visuals representing the current pillar */}
                <div className="stage-content-container">
                  
                  {/* Visual 1: Books (Structured Skilling) */}
                  <div ref={el => { contentRefs.current[0] = el; }} className="stage-graphics books-graphics is-active" style={{ "--face-color": pillars[0].color }}>
                    <div className="floating-book book-1"><span>RE</span></div>
                    <div className="floating-book book-2"><span>AI</span></div>
                    <div className="floating-book book-3"><span>UX</span></div>
                  </div>

                  {/* Visual 2: Trainings (Cohorts & Mentoring) */}
                  <div ref={el => { contentRefs.current[1] = el; }} className="stage-graphics trainings-graphics" style={{ "--face-color": pillars[1].color }}>
                    <div className="orbital-ring ring-1"></div>
                    <div className="orbital-ring ring-2"></div>
                    <div className="cohort-node node-1"></div>
                    <div className="cohort-node node-2"></div>
                    <div className="cohort-node node-3"></div>
                    <div className="central-glow"></div>
                  </div>

                  {/* Visual 3: Internships (Briefs & Internships) */}
                  <div ref={el => { contentRefs.current[2] = el; }} className="stage-graphics internships-graphics" style={{ "--face-color": pillars[2].color }}>
                    <div className="brief-card sheet-1">
                      <span>PROJECT #29</span>
                      <small>STATUS: ACTIVE</small>
                    </div>
                    <div className="brief-sheet sheet-2">
                      <span>PROJECT #34</span>
                      <small>STATUS: SHIPPED</small>
                    </div>
                  </div>

                  {/* Visual 4: Placements (Outcomes) */}
                  <div ref={el => { contentRefs.current[3] = el; }} className="stage-graphics placements-graphics" style={{ "--face-color": pillars[3].color }}>
                    <div className="scanner-line"></div>
                    <div className="hud-brackets">
                      <span className="b-tl"></span>
                      <span className="b-tr"></span>
                      <span className="b-bl"></span>
                      <span className="b-br"></span>
                    </div>
                    <div className="target-lock">
                      <span>MATCHED</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div ref={deckRef} className="reactor-deck">
              {pillars.map((pillar, index) => {
                return (
                  <div
                    key={pillar.id}
                    ref={el => { cardRefs.current[index] = el; }}
                    className={`reactor-card ${pillar.id} ${index === 0 ? "is-active" : ""}`}
                    style={{
                      "--pillar-color": pillar.color,
                      "--card-index": index,
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="card-top">
                      <span>{pillar.label}</span>
                      <small>{pillar.sub}</small>
                    </div>
                    <h3>{pillar.title}</h3>
                    <div className="card-details">
                      {pillar.details.map(d => <span key={d}>{d}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="reactor-caption">
            <strong ref={captionTitleRef}>{pillars[0].title}</strong>
            <p ref={captionDescRef}>{pillars[0].desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroBanner({ theme, eyebrow, title, accent, body, section, compact = false }) {
  const stats = section ? section.stats : [["3", "equal sections"], ["2", "presentations"], ["1", "incorporated company"], ["4", "intake routes"]];
  return (
    <section className={"hero-banner" + (compact ? " compact" : "")}>
      <div className="hero-bg">
        <div className="orb one"></div>
        <div className="orb two"></div>
        <div className="scanlines"></div>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          {title}{" "}
          <em>
            {accent && accent.includes("@") ? (
              <a href={`mailto:${accent}`} style={{ color: "inherit", textDecoration: "underline" }}>
                {accent}
              </a>
            ) : (
              accent
            )}
          </em>
        </h1>
        <p className="hero-body">{body}</p>
        <div className="hero-actions">
          <button onClick={() => routeTo(theme, section ? section.id : "academy")}>{section ? section.hero[theme].primary : "Start with Academy"}</button>
          <button className="secondary" onClick={() => routeTo(theme, "customers", section ? section.id : null)}>{section ? section.hero[theme].secondary : "View proof"}</button>
        </div>
      </div>
      <div className="hero-dashboard">
        {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  );
}

function NeoSectionHero({ theme, section, variant, children }) {
  const copy = section.hero[theme];
  return (
    <section className={`hero-banner compact neo-sig-hero neo-sig-${variant}`}>
      <div className="hero-bg">
        <div className="orb one"></div>
        <div className="orb two"></div>
        <div className="scanlines"></div>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title} <em>{copy.accent}</em></h1>
        <p className="hero-body">{copy.body}</p>
        <div className="hero-actions">
          <button onClick={() => routeTo(theme, section.id, section.subpages[0].slug)}>{copy.primary}</button>
          <button className="secondary" onClick={() => routeTo(theme, "customers", section.id)}>{copy.secondary}</button>
        </div>
      </div>
      <div className="neo-sig-visual">{children}</div>
    </section>
  );
}

function BroadcastVisual() {
  const channels = ["Social", "Search", "Ads", "Content"];
  return (
    <div className="neo-bcast" aria-hidden="true">
      <span className="neo-bcast-ring"></span>
      <span className="neo-bcast-ring"></span>
      <span className="neo-bcast-ring"></span>
      <div className="neo-bcast-core"><span>SIGNAL</span></div>
      {channels.map((c, i) => (
        <span key={c} className={`neo-bcast-chip chip-${i + 1}`}>{c}</span>
      ))}
    </div>
  );
}

function PipelineVisual() {
  const nodes = [["01", "Ingest"], ["02", "Reason"], ["03", "Evaluate"], ["04", "Ship"]];
  return (
    <div className="neo-pipe" aria-hidden="true">
      <span className="neo-pipe-pulse"></span>
      {nodes.map(([n, label]) => (
        <div className="neo-pipe-node" key={n}>
          <span className="neo-pipe-dot"></span>
          <span className="neo-pipe-num">{n}</span>
          <span className="neo-pipe-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function MarketingHero({ theme, section }) {
  return (
    <NeoSectionHero theme={theme} section={section} variant="mkt">
      <BroadcastVisual />
    </NeoSectionHero>
  );
}

function LabsHero({ theme, section }) {
  return (
    <NeoSectionHero theme={theme} section={section} variant="labs">
      <PipelineVisual />
    </NeoSectionHero>
  );
}

const FACE_BASE_TRANSFORMS = [
  "translateZ(150px)", "rotateY(90deg) translateZ(150px)",
  "rotateY(180deg) translateZ(150px)", "rotateY(-90deg) translateZ(150px)",
  "rotateX(90deg) translateZ(150px)", "rotateX(-90deg) translateZ(150px)",
];
const FACE_MOTIONS = [
  { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 0, z: -1 },
  { x: -1, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 1, z: 0 },
];

function NexaraUnbox({ theme }) {
  const wrapRef      = React.useRef(null);
  const pinRef       = React.useRef(null);
  const cubeRef      = React.useRef(null);
  const faceRefs     = React.useRef([]);
  const coreRef      = React.useRef(null);
  const signalRingRef = React.useRef(null);
  const signalCardRefs = React.useRef([]);
  const wordRefs     = React.useRef([]);
  const wordPlayRefs = React.useRef([]);
  const routeCardRefs = React.useRef([]);
  const routeCardSmallRefs = React.useRef([]);
  const stageLabelRef = React.useRef(null);
  const activeLabelRef = React.useRef(null);
  const progressBarRef = React.useRef(null);
  const progressPctRef = React.useRef(null);

  const reducedMotion = React.useMemo(() =>
    typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const copy  = DATA.unbox[theme];
  const faces = DATA.unbox.faces;
  const stageLabels = theme === "neo"
    ? ["Prime", "Spin", "Split", "Wire", "Stack", "Ship"]
    : ["Frame", "Map", "Open", "Connect", "Govern", "Launch"];

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Cache layout dimensions to avoid getBoundingClientRect layout thrashing during scroll ticks
    const layout = {
      top: 0,
      height: 0,
      innerHeight: 0
    };

    const measureLayout = () => {
      const rect = wrap.getBoundingClientRect();
      layout.top = rect.top + window.scrollY;
      layout.height = rect.height;
      layout.innerHeight = window.innerHeight;
    };

    measureLayout();
    
    // Fallback measurement in case resources/content shift layout size on load
    const initialMeasureTimeout = setTimeout(measureLayout, 150);

    const applyFrame = (p) => {
      const explode      = clamp01((p - 0.42) / 0.42);
      const coreOpacity  = clamp01((p - 0.56) / 0.22);
      const signalOpacity= clamp01((p - 0.68) / 0.22);
      const activeIndex  = Math.min(faces.length - 1, Math.floor(clamp01(p) * faces.length));

      if (cubeRef.current)
        cubeRef.current.style.transform = `translateY(${110 - p * 175}px) rotateX(${58 - p * 92}deg) rotateY(${-170 + p * 520}deg) scale(${0.55 + p * 0.42})`;

      faceRefs.current.forEach((el, i) => {
        if (!el) return;
        const m = FACE_MOTIONS[i];
        const drift = explode * 230;
        const lift  = i === 5 ? clamp01((p - 0.36) / 0.24) * 72 : 0;
        el.style.transform = `translate3d(${m.x * drift}px,${m.y * drift - lift}px,${m.z * drift}px)`;
        el.style.opacity   = 1 - explode * 0.32;
      });

      if (coreRef.current) {
        coreRef.current.style.opacity   = coreOpacity;
        coreRef.current.style.transform = `translate(-50%,-50%) scale(${0.5 + coreOpacity * 0.58}) rotateY(${p * 360}deg)`;
      }

      if (signalRingRef.current) signalRingRef.current.style.opacity = signalOpacity;
      signalCardRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `rotateY(${i * 90}deg) translateZ(${280 + signalOpacity * 80}px)`;
      });

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const wp = clamp01((p * 1.9) - i * 0.12);
        el.style.opacity   = 0.42 + wp * 0.58;
        el.style.transform = `translateY(${(1 - wp) * 26}px)`;
      });

      wordPlayRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.setProperty("--word-fill", `${clamp01((p * faces.length) - i) * 100}%`);
        el.classList.toggle("is-active", i === activeIndex);
      });

      routeCardRefs.current.forEach((el, i) => {
        if (!el) return;
        const cp = clamp01((p * faces.length) - i);
        el.style.setProperty("--card-fill", `${cp * 100}%`);
        el.style.transform = `translateX(${(1 - Math.min(cp + 0.1, 1)) * 22}px)`;
        el.classList.toggle("is-active", i === activeIndex);
        el.classList.toggle("is-complete", i < activeIndex);
        
        const sm = routeCardSmallRefs.current[i];
        if (sm) sm.textContent = i < activeIndex ? "connected" : i === activeIndex ? "active now" : "queued";
      });

      if (stageLabelRef.current)  stageLabelRef.current.textContent  = `${stageLabels[activeIndex]} stage`;
      if (activeLabelRef.current) activeLabelRef.current.textContent = faces[activeIndex].label;
      if (progressPctRef.current) progressPctRef.current.textContent = `${Math.round(p * 100).toString().padStart(3, "0")}%`;
      if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`;
    };

    if (reducedMotion) { applyFrame(0.62); return; }

    const shouldPin = HAS_SCROLL_ANIMATION && window.ScrollTrigger && window.innerWidth > 760;
    if (shouldPin) {
      const runway = Math.round(Math.min(1120, Math.max(680, window.innerHeight * 0.95)));
      applyFrame(0);
      const st = window.ScrollTrigger.create({
        trigger: pinRef.current || wrap,
        start: "top top",
        end: `+=${runway}`,
        scrub: 0.45,
        pin: pinRef.current || true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => applyFrame(self.progress)
      });
      return () => {
        clearTimeout(initialMeasureTimeout);
        st.kill();
      };
    }

    let lastP = -1;
    let scrollY = window.scrollY;
    let ticked = false;

    const update = () => {
      ticked = false;
      const total = Math.max(1, layout.height - layout.innerHeight);
      const p = clamp01((scrollY - layout.top) / total);
      if (Math.abs(p - lastP) > 0.0003) {
        lastP = p;
        applyFrame(p);
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      if (!ticked) {
        requestAnimationFrame(update);
        ticked = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureLayout, { passive: true });

    // Initial positioning
    handleScroll();

    return () => {
      clearTimeout(initialMeasureTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureLayout);
    };
  }, [theme, reducedMotion]);

  return (
    <section ref={wrapRef} className="unbox-wrap" aria-label="Nexara operating model unboxing">
      <div ref={pinRef} className="unbox-sticky">
        <div className="unbox-bg" aria-hidden="true" />
        <div className="unbox-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="unbox-title" aria-label={copy.title}>
            {copy.title.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} ref={el => { wordRefs.current[i] = el; }}
                style={{ opacity: 0.42, transform: "translateY(26px)" }}>{word}</span>
            ))}
          </h2>
          <div className="unbox-word-play" aria-label="Current unboxing stage">
            {faces.map((face, i) => (
              <button key={face.label} ref={el => { wordPlayRefs.current[i] = el; }}
                style={{ "--face-color": face.color, "--word-fill": "0%" }}
                onClick={() => routeTo(theme, face.section)}>
                <span>{face.label}</span>
              </button>
            ))}
          </div>
          <p>{copy.body}</p>
          <div className="unbox-quick-actions">
            <button onClick={() => routeTo(theme, "academy")}>{theme === "neo" ? "Open academy" : "View Academy"}</button>
            <button onClick={() => routeTo(theme, "contact")}>{theme === "neo" ? "Build a play" : "Scope a play"}</button>
          </div>
        </div>
        <div className="unbox-stage" aria-hidden="true">
          <div className="unbox-axis" />
          <div className="unbox-cube" ref={cubeRef}
            style={{ transform: "translateY(110px) rotateX(58deg) rotateY(-170deg) scale(0.55)" }}>
            {faces.map((face, i) => (
              <div className="unbox-face-shell" key={face.label} style={{ transform: FACE_BASE_TRANSFORMS[i] }}>
                <div className="unbox-face" ref={el => { faceRefs.current[i] = el; }}
                  style={{ "--face-color": face.color }}>
                  <span>{face.sub}</span>
                  <strong>{face.label}</strong>
                </div>
              </div>
            ))}
            <div className="unbox-core" ref={coreRef}
              style={{ opacity: 0, transform: "translate(-50%,-50%) scale(0.5) rotateY(0deg)" }}>
              <span>{copy.sequence}</span>
            </div>
            <div className="unbox-signal-ring" ref={signalRingRef} style={{ opacity: 0 }}>
              {DATA.unbox.signals.map(([label, value], i) => (
                <div key={label} ref={el => { signalCardRefs.current[i] = el; }}
                  className="unbox-signal-card"
                  style={{ transform: `rotateY(${i * 90}deg) translateZ(280px)` }}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="unbox-system-panel" aria-label="Unboxed Nexara system routes">
          <div className="unbox-panel-head">
            <span ref={stageLabelRef}>{stageLabels[0]} stage</span>
            <strong ref={activeLabelRef}>{faces[0].label}</strong>
          </div>
          <div className="unbox-card-rail">
            {faces.map((face, i) => (
              <button key={face.label} ref={el => { 
                routeCardRefs.current[i] = el;
                if (el) {
                  routeCardSmallRefs.current[i] = el.querySelector("small");
                }
              }}
                className="unbox-route-card"
                style={{ "--face-color": face.color, "--card-fill": "0%", transform: "translateX(22px)" }}
                onClick={() => routeTo(theme, face.section)}>
                <span>{face.sub}</span>
                <strong>{face.label}</strong>
                <small>queued</small>
              </button>
            ))}
          </div>
        </aside>
        <div className="unbox-progress" aria-hidden="true">
          <span ref={progressPctRef}>000%</span>
          <div><i ref={progressBarRef} style={{ width: "0%" }} /></div>
        </div>
      </div>
    </section>
  );
}

function SuperSkills({ theme }) {
  const calloutBody = DATA.home[theme].calloutBody;
  const [featured, ...supporting] = DATA.superSkills;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="super-skills">
      <div className="super-skills-shell">
        <div className="super-skills-intro">
          <div>
            <p className="eyebrow">{theme === "neo" ? "Super skills" : "Integrated capability plays"}</p>
            <h2>{theme === "neo" ? "Stack the engines into plays that ship." : "Integrated growth plays across talent, digital and AI."}</h2>
          </div>
          <p>{calloutBody}</p>
        </div>

        <div className="super-playbook">
          <article 
            className="super-play-feature spotlight-card" 
            onMouseMove={handleMouseMove}
          >
            <div className="spotlight-glow" />
            <div className="card-content-wrapper">
              <div className="super-skill-topline">
                {featured.sections.map((section) => <span key={section}>{section}</span>)}
              </div>
              <span className="play-label">{theme === "neo" ? "Lead combo" : "Primary integrated play"}</span>
              <h3>{featured.title}</h3>
              <p>{voice(theme, featured)}</p>
              <div className="play-stack">
                {featured.stack.map((chip, index) => (
                  <div key={chip} className="play-stack-item">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{chip}</strong>
                  </div>
                ))}
              </div>
              <button onClick={() => routeTo(theme, "contact")}>
                <span>{theme === "neo" ? "Build this play" : "Scope this play"}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </article>

          <aside className="play-sequence" aria-label="How Nexara combines sections">
            <span>{theme === "neo" ? "Combo logic" : "Delivery sequence"}</span>
            <div className="timeline-flow">
              <div className="timeline-line"></div>
              <div className="timeline-step">
                <div className="timeline-dot">1</div>
                <div className="timeline-text">
                  <strong>Academy</strong>
                  <small>{theme === "neo" ? "creates the crew" : "builds capability"}</small>
                </div>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot">2</div>
                <div className="timeline-text">
                  <strong>Marketing</strong>
                  <small>{theme === "neo" ? "launches the signal" : "creates market presence"}</small>
                </div>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot">3</div>
                <div className="timeline-text">
                  <strong>Labs</strong>
                  <small>{theme === "neo" ? "wires the system" : "adds automation readiness"}</small>
                </div>
              </div>
            </div>
          </aside>

          <div className="super-play-list">
            {supporting.map((item) => (
              <article 
                className="super-skill-card spotlight-card" 
                key={item.title}
                onMouseMove={handleMouseMove}
              >
                <div className="spotlight-glow" />
                <div className="card-content-wrapper">
                  <div className="super-skill-topline">
                    {item.sections.map((section) => <span key={section}>{section}</span>)}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{voice(theme, item)}</p>
                  <div className="chip-stack">
                    {item.stack.map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardVisual({ title, theme }) {
  const normTitle = title.toLowerCase();

  if (normTitle.includes("brand") || normTitle.includes("visual identity") || normTitle.includes("positioning") || normTitle.includes("branding")) {
    return (
      <div className="card-visual visual-brand">
        <div className="brand-specimen">Aa</div>
        <div className="brand-circle-grid">
          <div className="brand-circle circle-1"></div>
          <div className="brand-circle circle-2"></div>
        </div>
        <div className="brand-swatches">
          <div className="swatch swatch-1"></div>
          <div className="swatch swatch-2"></div>
          <div className="swatch swatch-3"></div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("web") || normTitle.includes("landing") || normTitle.includes("corporate") || normTitle.includes("product page")) {
    return (
      <div className="card-visual visual-web">
        <div className="browser-header">
          <div className="browser-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="browser-address"></div>
        </div>
        <div className="browser-content">
          <div className="browser-hero"></div>
          <div className="browser-cols">
            <div className="browser-col"></div>
            <div className="browser-col"></div>
            <div className="browser-col"></div>
          </div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("social") || normTitle.includes("content studio")) {
    return (
      <div className="card-visual visual-social">
        <div className="social-header">
          <div className="social-avatar"></div>
          <div className="social-meta">
            <div className="social-line short"></div>
            <div className="social-line tiny"></div>
          </div>
        </div>
        <div className="social-body">
          <div className="social-line"></div>
          <div className="social-line"></div>
          <div className="social-image-mock"></div>
        </div>
        <div className="social-footer">
          <div className="social-icon"></div>
          <div className="social-icon"></div>
          <div className="social-icon"></div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("performance") || normTitle.includes("growth") || normTitle.includes("ads") || normTitle.includes("paid acquisition") || normTitle.includes("reporting")) {
    return (
      <div className="card-visual visual-performance">
        <div className="chart-grid">
          <div className="chart-grid-line"></div>
          <div className="chart-grid-line"></div>
          <div className="chart-grid-line"></div>
        </div>
        <svg className="chart-svg" viewBox="0 0 100 40">
          <path className="chart-path" d="M0,35 C20,32 40,25 60,18 C70,14 85,5 95,2" fill="none" strokeWidth="2.5" />
          <circle className="chart-node" cx="95" cy="2" r="3" />
        </svg>
        <div className="chart-label">+240%</div>
      </div>
    );
  }

  if (normTitle.includes("tracks") || normTitle.includes("full-stack") || normTitle.includes("ai/data") || normTitle.includes("cloud") || normTitle.includes("design studio")) {
    return (
      <div className="card-visual visual-code">
        <div className="code-header">
          <div className="code-dots">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="code-title">index.js</div>
        </div>
        <div className="code-body">
          <div className="code-line"><span className="code-keyword">const</span> nexara = <span className="code-string">"growth"</span>;</div>
          <div className="code-line indent"><span className="code-keyword">function</span> ship() {"{"}</div>
          <div className="code-line indent-2">runSystem(); <span className="cursor-blink">|</span></div>
          <div className="code-line indent">{"}"}</div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("internship") || normTitle.includes("mentor") || normTitle.includes("review") || normTitle.includes("kanban") || normTitle.includes("briefs") || normTitle.includes("projects")) {
    return (
      <div className="card-visual visual-kanban">
        <div className="kanban-col">
          <div className="kanban-header">TODO</div>
          <div className="kanban-card"></div>
          <div className="kanban-card"></div>
        </div>
        <div className="kanban-col">
          <div className="kanban-header">DOING</div>
          <div className="kanban-card active"></div>
        </div>
        <div className="kanban-col">
          <div className="kanban-header">DONE</div>
          <div className="kanban-card done"></div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("placement") || normTitle.includes("matching") || normTitle.includes("partner") || normTitle.includes("nodes") || normTitle.includes("alumni")) {
    return (
      <div className="card-visual visual-nodes">
        <div className="node-center"></div>
        <div className="node-satellite sat-1"></div>
        <div className="node-satellite sat-2"></div>
        <div className="node-satellite sat-3"></div>
        <div className="node-satellite sat-4"></div>
        <svg className="node-lines" viewBox="0 0 100 60">
          <line x1="50" y1="30" x2="20" y2="15" stroke="var(--line)" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="50" y1="30" x2="80" y2="15" stroke="var(--line)" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="50" y1="30" x2="30" y2="45" stroke="var(--line)" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="50" y1="30" x2="70" y2="45" stroke="var(--line)" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </div>
    );
  }

  if (normTitle.includes("atlas") || normTitle.includes("search") || normTitle.includes("knowledge")) {
    return (
      <div className="card-visual visual-search">
        <div className="search-bar">
          <div className="search-icon"></div>
          <div className="search-text">Query knowledgeBase...</div>
        </div>
        <div className="search-results">
          <div className="search-result-row">
            <span className="search-result-bullet"></span>
            <div className="search-result-line"></div>
          </div>
          <div className="search-result-row">
            <span className="search-result-bullet"></span>
            <div className="search-result-line short"></div>
          </div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("pulse") || normTitle.includes("analytics") || normTitle.includes("metrics")) {
    return (
      <div className="card-visual visual-pulse">
        <div className="pulse-gauge">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" className="percentage">85%</text>
          </svg>
        </div>
        <div className="pulse-bars">
          <div className="pulse-bar-row"><div className="pulse-bar-fill" style={{ width: "70%" }}></div></div>
          <div className="pulse-bar-row"><div className="pulse-bar-fill" style={{ width: "90%" }}></div></div>
          <div className="pulse-bar-row"><div className="pulse-bar-fill" style={{ width: "40%" }}></div></div>
        </div>
      </div>
    );
  }

  if (normTitle.includes("forge") || normTitle.includes("agent") || normTitle.includes("pipeline")) {
    return (
      <div className="card-visual visual-forge">
        <div className="forge-step step-in">IN</div>
        <div className="forge-arrow arrow-1">&rarr;</div>
        <div className="forge-step step-proc">MODEL</div>
        <div className="forge-arrow arrow-2">&rarr;</div>
        <div className="forge-step step-out">OUT</div>
        <div className="forge-pulse-dot"></div>
      </div>
    );
  }

  if (normTitle.includes("vault") || normTitle.includes("extraction") || normTitle.includes("document") || normTitle.includes("ocr")) {
    return (
      <div className="card-visual visual-vault">
        <div className="vault-page">
          <div className="vault-scan-bar"></div>
          <div className="vault-text-block block-1"></div>
          <div className="vault-text-block block-2"></div>
          <div className="vault-text-block block-3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-visual visual-fallback">
      <div className="fallback-grid">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>
    </div>
  );
}

function ModuleCard({ theme, eyebrow, title, children, visualTitle = null, className = "module-card", onClick = null }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const isClickable = onClick !== null;

  return (
    <article 
      className={`${className} spotlight-card ${isClickable ? 'clickable-card' : ''}`} 
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={isClickable ? { cursor: "pointer" } : undefined}
    >
      <div className="spotlight-glow" />
      <div className="card-content-wrapper">
        <span>{eyebrow}</span>
        {visualTitle && <CardVisual title={visualTitle} theme={theme} />}
        <h3>{title}</h3>
        <p>{children}</p>
        {isClickable && (
          <div className="card-click-prompt" style={{ marginTop: "16px", fontSize: "0.75rem", fontFamily: "var(--font-mono)", opacity: 0.7, textTransform: "uppercase" }}>
            {theme === "neo" ? "[ CLICK TO SPEC // ]" : "View specifications →"}
          </div>
        )}
      </div>
    </article>
  );
}

const MODULE_DETAILS = {
  // Digital Marketing
  "Brand Identity": {
    neo: {
      offer: "Dynamic visual assets, custom typography systems, naming campaigns, and visual guidelines built for code and screen.",
      better: "We do not use Canva templates or pre-made layouts. Every asset is built from scratch with custom styling to give your brand a unique attitude."
    },
    trust: {
      offer: "Naming systems, corporate design manuals, vector branding kits, messaging frameworks, launch kits, and brand governance.",
      better: "We provide tokenized style guidelines that integrate directly with enterprise frontend codebases, ensuring absolute brand consistency across divisions."
    }
  },
  "Web Experience": {
    neo: {
      offer: "WebGL layouts, interactive scroll animations, cursor spotlights, reactive grid containers, and custom typography.",
      better: "Our sites act as digital closers. They hook visitor attention in under three seconds and keep it with responsive micro-actions."
    },
    trust: {
      offer: "Enterprise websites, landing page systems, product sheets, SEO-friendly markup, and responsive structural layouts.",
      better: "We deliver audited, standard-compliant frontend components that achieve 100/100 Lighthouse performance scores and WCAG AA accessibility compliance."
    }
  },
  "Social Studio": {
    neo: {
      offer: "Viral shorts production, custom graphics, punchy writing, and automated scheduling systems to keep up with daily feed speed.",
      better: "No generic AI spam or standard agency templates. We maintain high aesthetic quality and publishing rhythm customized to your brand's voice."
    },
    trust: {
      offer: "Thought leadership programs, corporate LinkedIn setups, research paper summaries, and scheduling compliance pipelines.",
      better: "A disciplined, research-led publication schedule managed under strict brand guidelines to build executive credibility and protect reputation."
    }
  },
  "Performance Growth": {
    neo: {
      offer: "Programmatic ad campaigns, custom analytics setups, programmatic landing pages, and rapid creative testing loops.",
      better: "No vanity metrics. We focus on real-time attribution and direct acquisition models to translate every dollar of ad spend into revenue."
    },
    trust: {
      offer: "Audited paid media campaigns, SEO site hierarchy structures, live dashboards, and weekly performance reviews.",
      better: "An evidence-led growth funnel built around high-intent search query indexing, landing page audits, and transparent attribution reporting."
    }
  },

  // Academy
  "Career Tracks": {
    neo: {
      offer: "Intense, portfolio-driven tracks in Full-Stack development, Applied AI engineering, UX design, and Growth operations.",
      better: "No boring PDF slides or passive video tutorials. Students build deployable codebases and interactive portfolios that prove capability."
    },
    trust: {
      offer: "Role-aligned skilling tracks mapped directly to regional hiring criteria across software engineering, DevOps, design, and analytics.",
      better: "Industry-reviewed curricula with verified credentials and structured project reviews that guarantee employer readiness."
    }
  },
  "Internship Engine": {
    neo: {
      offer: "Live development projects, mentor-driven code reviews, and fast-paced delivery schedules that simulate startup engineering.",
      better: "Real tickets and production codebases. Candidates learn how to ship features, read telemetry, and operate under pressure from week one."
    },
    trust: {
      offer: "Structured internship workflows featuring mentor reviews, progress checkpoints, and portfolio review documentation.",
      better: "An audited, compliance-friendly internship program providing clear metrics, candidate logs, and verified project outcomes."
    }
  },
  "Placement Desk": {
    neo: {
      offer: "Resume re-writes, Github portfolio polish, intensive technical mock interviews, and direct matching with fast-growing tech squads.",
      better: "We connect candidates directly with engineering leads who care about shipped code, cutting out generic HR filters entirely."
    },
    trust: {
      offer: "Employer partnership requirements, pre-screened talent shortlists, interview readiness prep, and comprehensive hiring support.",
      better: "An evidence-based screening process that reduces candidate evaluation time by presenting audited project histories."
    }
  },
  "Campus Programmes": {
    neo: {
      offer: "Classroom-to-production frameworks, university-wide hackathons, and real-time student cohort progress trackers.",
      better: "Tools students actually enjoy using. We align university classrooms with current industry dev toolchains."
    },
    trust: {
      offer: "Institution-aligned skilling programs, administration dashboards, progress analytics, and curriculum alignment support.",
      better: "Governance-first academic integration providing robust telemetry, student performance tracking, and direct outcomes accountability."
    }
  },

  // Labs
  "Atlas": {
    neo: {
      offer: "Smart vector indexing, semantic search interfaces, and RAG systems with transparent citation trails.",
      better: "Absolute truth. Zero AI hallucinations, instant retrieval, and traceable citations back to your source documents."
    },
    trust: {
      offer: "Document intelligence retrieval patterns for policies, contracts, documentation, and internal wikis.",
      better: "Strict access control integration, SOC2-aligned data handling, and grounded retrieval validation protocols."
    }
  },
  "Pulse": {
    neo: {
      offer: "Natural language query interface for product events, SQL database connections, and instant charting.",
      better: "Get answers in seconds, not sprint cycles. Ask plain questions and get accurate data visualizations instantly."
    },
    trust: {
      offer: "Structured analytics patterns translating business query intent to auditable data models.",
      better: "Auditable SQL translation queries with safety limits and compliance locks on customer data schemas."
    }
  },
  "Forge": {
    neo: {
      offer: "Multi-agent workflows, state-machine orchestrations, and visual step-by-step telemetry logs.",
      better: "Dynamic execution with safety bounds. Build systems that handle complex multi-step reasoning reliably."
    },
    trust: {
      offer: "Agentic workflow patterns with governance frameworks, detailed traces, and performance evaluations.",
      better: "Isolated agent sandboxes with auditable trace logs and compliance boundaries for transactional tasks."
    }
  },
  "Vault": {
    neo: {
      offer: "Unstructured document parsers, layout-aware OCR engines, and automated validation rules.",
      better: "Convert dense PDFs, invoices, and hand-written forms into clean JSON payloads with high-speed accuracy."
    },
    trust: {
      offer: "Document processing patterns for high-volume invoices, compliance forms, and operational files.",
      better: "Layout-aware parsers with human-in-the-loop audit paths, verified extraction metrics, and secure exports."
    }
  }
};

function ModuleModal({ theme, module, eyebrow, onClose }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const detail = MODULE_DETAILS[module.title] || {
    neo: { offer: "Details coming soon.", better: "Advanced capability design." },
    trust: { offer: "Details pending documentation.", better: "Standardized integration approach." }
  };

  const isNeo = theme === "neo";
  const content = isNeo ? detail.neo : detail.trust;

  return ReactDOM.createPortal(
    <div className={theme === "neo" ? "site neo" : "site trust"} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "transparent", minHeight: "0", width: "auto", pointerEvents: "none" }}>
      <div className="module-modal-backdrop" onClick={onClose} style={{ pointerEvents: "auto" }}>
        <div className="module-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="module-modal-header">
            <div>
              <span className="module-modal-subtitle">{eyebrow}</span>
              <h3 className="module-modal-title">{module.title}</h3>
            </div>
            <button className="module-modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
          </div>
          <div className="module-modal-body">
            <div className="module-modal-section">
              <h4>{isNeo ? "// what we offer" : "Services & Deliverables"}</h4>
              <p>{content.offer}</p>
            </div>
            <div className="module-modal-section">
              <h4>{isNeo ? "// how we do it better" : "Operational Advantage"}</h4>
              <p>{content.better}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function SectionCards({ theme, sections }) {
  if (theme === "trust") {
    return (
      <section className="section-grid-wrap">
        <div className="section-head">
          <p className="eyebrow">Core sections</p>
          <h2>Structured practices across three sections.</h2>
        </div>
        <div className="tabular-border-grid">
          {sections.map((section) => (
            <div
              className="tabular-border-cell"
              key={section.id}
              style={{ cursor: "pointer" }}
              onClick={() => routeTo(theme, section.id)}
            >
              <div className="card-header">
                <span className="card-description">{section.index} — Practice</span>
                <h3>{section.name}</h3>
              </div>
              <div className="card-content">
                <p>{voice(theme, section.short)}</p>
                <ul>
                  {section.stack.slice(0, 4).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <button
                  className="secondary"
                  onClick={(e) => { e.stopPropagation(); routeTo(theme, section.id); }}
                  style={{
                    background: "transparent",
                    color: "var(--accent)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "800",
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: "uppercase",
                    padding: 0,
                    minHeight: "auto"
                  }}
                >
                  Explore {section.name} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section-grid-wrap">
      <div className="section-head">
        <p className="eyebrow">Core sections</p>
        <h2>Three engines. All loaded.</h2>
      </div>
      <div className="section-cards">
        {sections.map((section) => (
          <article className="section-card" key={section.id} id={`neo-guide-${section.id}`} onClick={() => routeTo(theme, section.id)}>
            <span>{section.index}</span>
            <h3>{section.name}</h3>
            <p>{voice(theme, section.short)}</p>
            <div>{section.stack.slice(0, 4).map((x) => <small key={x}>{x}</small>)}</div>
            <button onClick={() => routeTo(theme, section.id)}>Enter {section.name}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionPage({ theme, section, detail }) {
  const active = useMemo(() => section.subpages.find((p) => p.slug === detail), [section, detail]);
  if (detail && !active) return <NotFound theme={theme} page={`${section.id}/${detail}`} />;
  return (
    <main data-section={section.id}>
      {section.id === "academy" ? (
        <AcademyHero theme={theme} section={section} />
      ) : section.id === "marketing" ? (
        <MarketingHero theme={theme} section={section} />
      ) : section.id === "labs" ? (
        <LabsHero theme={theme} section={section} />
      ) : (
        <HeroBanner compact theme={theme} section={section} eyebrow={section.hero[theme].eyebrow} title={section.hero[theme].title} accent={section.hero[theme].accent} body={section.hero[theme].body} />
      )}
      <SubNav theme={theme} section={section} active={active} />
      <div key={active?.slug || "overview"} className="section-content-enter">
        {active ? <SubpageDetail theme={theme} section={section} page={active} /> : <SectionOverview theme={theme} section={section} />}
      </div>
    </main>
  );
}

function MarketContext({ theme, compact = false }) {
  const market = DATA.market;
  return (
    <section className={"market-context" + (compact ? " compact" : "")}>
      <div>
        <p className="eyebrow">Operating context</p>
        <h2>{voice(theme, market.title)}</h2>
        <p>{voice(theme, market.body)}</p>
      </div>
      <div className="market-cities">
        {market.cities.map((city) => <span key={city}>{city}</span>)}
      </div>
      {!compact && (
        <div className="market-assumptions">
          {market.assumptions.map((item) => <p key={item}>{item}</p>)}
        </div>
      )}
    </section>
  );
}

function SubNav({ theme, section, active }) {
  return (
    <nav className="subnav" aria-label="Section navigation">
      <button className={!active ? "active" : ""} onClick={() => routeTo(theme, section.id)}>Overview</button>
      {section.subpages.map((item) => (
        <button key={item.slug} className={active?.slug === item.slug ? "active" : ""} onClick={() => routeTo(theme, section.id, item.slug)}>
          {item.title}
        </button>
      ))}
    </nav>
  );
}

function BeforeAfterSlider({ theme }) {
  const [sliderPos, setSliderPos] = useState(0); // Starts at extreme left (boring default centered)
  const containerRef = React.useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Set CSS variables directly on the element to avoid React state re-renders (no flashing!)
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('slider-handle') || e.target.closest('.slider-handle')) return;
    e.preventDefault(); // Prevents selection
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const isNeo = theme === "neo";

  const copy = {
    before: {
      title: isNeo ? "The Legacy Template." : "Conventional Web Presentation.",
      desc: isNeo 
        ? "Rigid grids, static blocks, and zero-retention layouts. Flat content sheets that fail to hook user interest."
        : "Manual asset guides and static layout grids. Core business value propositions get buried under heavy text formatting.",
      label1: isNeo ? "Visual Polish" : "Logo & Guidelines",
      val1: isNeo ? "Generic style assets, flat fonts, and standard layouts." : "Static branding documents and unlinked PDF style guidelines.",
      label2: isNeo ? "User Experience" : "Web Presence",
      val2: isNeo ? "Heavy scroll structures that get immediately ignored." : "Fixed responsive grid layouts with standard text flow constraints."
    },
    after: {
      title: isNeo ? "The Nexara Interface." : "Nexara Enterprise Standard.",
      desc: isNeo
        ? "High-octane viewports, dynamic spotlights, and live vectors. Visual systems built to engage before users scroll."
        : "Lightweight structured guidelines, tokenized parameters, and verified UX blueprints built for modular conversion.",
      label1: isNeo ? "Cyber Specimen" : "Corporate Specimen",
      val1: isNeo ? "Interactive blueprint guide with dynamic variables and token styling." : "Exportable layout parameters, verified CSS variables, and structured style tokens.",
      label2: isNeo ? "UX Interactive Blueprint" : "Performance Engine",
      val2: isNeo ? "Spotlight cards responding to cursor coordinates in real-time." : "Audited components optimized for sub-second load times and high lighthouse scores."
    }
  };

  return (
    <section className="before-after-band">
      <div className="section-head">
        <div>
          <p className="eyebrow">{isNeo ? "Design standard" : "Visual quality"}</p>
          <h2>{isNeo ? "Slide to reveal the Nexara standard." : "Interactive standard vs. generic layouts."}</h2>
        </div>
      </div>
      <div className="comparison-wrapper" style={{ position: "relative" }}>
        <div 
          className="comparison-container" 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
        >
          <div 
            className="comp-panel comp-before"
          >
            {/* Boring default - Swapped to the bottom layer so it is centered on load (sliderPos = 0) */}
            <div className="before-content-wrapper" style={{ minWidth: "320px" }}>
              <div className="before-headline">{copy.before.title}</div>
              <p style={{ marginBottom: "16px" }}>{copy.before.desc}</p>
              <div className="before-stack-box">
                <strong>{copy.before.label1}:</strong> {copy.before.val1}
              </div>
              <div className="before-stack-box">
                <strong>{copy.before.label2}:</strong> {copy.before.val2}
              </div>
            </div>
          </div>

          <div 
            className="comp-panel comp-after" 
            style={{ 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            {/* Our content (Nexara standard) - Swapped to the top layer so it is revealed on the left */}
            <div className="after-content-wrapper" style={{ minWidth: "320px" }}>
              <div className="before-headline">{copy.after.title}</div>
              <p style={{ marginBottom: "16px" }}>{copy.after.desc}</p>
              <div className="after-grid">
                <div className="after-glass-card">
                  <div className="glow-dot-mock"></div>
                  <h4>{copy.after.label1}</h4>
                  <p>{copy.after.val1}</p>
                </div>
                <div className="after-glass-card">
                  <div className="glow-dot-mock"></div>
                  <h4>{copy.after.label2}</h4>
                  <p>{copy.after.val2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="slider-handle" 
          style={{ left: `${sliderPos}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault(); // Prevents selection
            const onMouseMove = (moveEvent) => {
              moveEvent.preventDefault(); // Prevents selection
              handleMove(moveEvent.clientX);
            };
            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            const onTouchMove = (moveEvent) => {
              if (moveEvent.touches.length > 0) {
                handleMove(moveEvent.touches[0].clientX);
              }
            };
            const onTouchEnd = () => {
              window.removeEventListener("touchmove", onTouchMove);
              window.removeEventListener("touchend", onTouchEnd);
            };
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("touchend", onTouchEnd);
          }}
        />
      </div>
      <div className="slider-indicator-labels">
        <span>{isNeo ? "→ DRAG RIGHT FOR NEXARA STYLE" : "→ DRAG RIGHT FOR NEXARA FORMAT"}</span>
        <span>{isNeo ? "← DRAG LEFT FOR DEFAULT" : "← DRAG LEFT FOR GENERIC LAYOUT"}</span>
      </div>
    </section>
  );
}

function InteractiveTimeline({ theme, section }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = section.process;
  const isNeo = theme === "neo";

  // Scoped copy to match brand tone and auto populate based on section
  const timelineCopy = React.useMemo(() => {
    if (section.id === "marketing") {
      return isNeo ? [
        { title: "Position", tag: "STAGE 01 // AUDIENCE FIT", desc: "Nailing down who you are talking to, how you win, and making the offer make sense before touch-up begins." },
        { title: "Build Assets", tag: "STAGE 02 // CODE & DESIGN", desc: "Custom visual guidings, websites that act as closeers, and content formats that get shared." },
        { title: "Launch", tag: "STAGE 03 // DEPLOY SYSTEM", desc: "Flipping the switch, pushing clean code to production, and setting active campaign layers live." },
        { title: "Optimize", tag: "STAGE 04 // compounding WINNERS", desc: "Auditing data logs, testing ad variant creatives, and compounding what works." }
      ] : [
        { title: "Audience Alignment", tag: "Phase 01: Audit & Discovery", desc: "Establishing market category context, analyzing demographic constraints, and structuring primary brand pillars." },
        { title: "Asset Development", tag: "Phase 02: Platform Architecture", desc: "Creating visual guidelines, high-conversion web presence layouts, and initial social campaigns." },
        { title: "Deployment", tag: "Phase 03: System Integration", desc: "Publishing responsive web platforms, starting organic content schedules, and activating paid acquisition lines." },
        { title: "Performance Tuning", tag: "Phase 04: Analytics & A/B testing", desc: "Conducting regular funnel audits, testing ad copy variations, and generating weekly performance reports." }
      ];
    } else if (section.id === "academy") {
      return isNeo ? [
        { title: "Map the learner", tag: "STAGE 01 // AUDIENCE FIT", desc: "Target roles, portfolio gaps, no generic tracks." },
        { title: "Run the cohort", tag: "STAGE 02 // CODE & DESIGN", desc: "Sprints, peer code reviews, shipping production lines." },
        { title: "Build proof", tag: "STAGE 03 // DEPLOY SYSTEM", desc: "Case study refinement, interactive portfolio sites." },
        { title: "Place or partner", tag: "STAGE 04 // compounding WINNERS", desc: "Fast-tracked interview loops, direct hiring pipes." }
      ] : [
        { title: "Audience Alignment", tag: "Phase 01: Audit & Discovery", desc: "Identifying career targets, benchmarking technical baselines, and mapping skills." },
        { title: "Asset Development", tag: "Phase 02: Platform Architecture", desc: "Immersive technical instruction, sprint-based deliveries, and code-review structures." },
        { title: "Deployment", tag: "Phase 03: System Integration", desc: "Documented project case studies, system deployments, and portfolio audits." },
        { title: "Performance Tuning", tag: "Phase 04: Analytics & A/B testing", desc: "Partner matches, cohort reports, and coordinated hiring workflows." }
      ];
    } else { // labs
      return isNeo ? [
        { title: "Find the workflow", tag: "STAGE 01 // AUDIENCE FIT", desc: "Spotting the knowledge bottlenecks where AI destroys friction." },
        { title: "Design the system", tag: "STAGE 02 // CODE & DESIGN", desc: "Data models, vector pipelines, prompt specs mapped out." },
        { title: "Build and test", tag: "STAGE 03 // DEPLOY SYSTEM", desc: "Iterative evals, guardrail hardening, private sandboxing." },
        { title: "Deploy and observe", tag: "STAGE 04 // compounding WINNERS", desc: "Real-time telemetry, trace logs, compounding AI efficiency." }
      ] : [
        { title: "Audience Alignment", tag: "Phase 01: Audit & Discovery", desc: "Identifying high-value, process-intensive operational bottlenecks." },
        { title: "Asset Development", tag: "Phase 02: Platform Architecture", desc: "System architecture design, security reviews, and model selections." },
        { title: "Deployment", tag: "Phase 03: System Integration", desc: "Prototype integration, evaluation benchmarking, and model safety runs." },
        { title: "Performance Tuning", tag: "Phase 04: Analytics & A/B testing", desc: "Monitored deployment, production trace analysis, and latency optimization." }
      ];
    }
  }, [section.id, isNeo]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeStep, steps.length]);

  const handleStepClick = (idx) => {
    setActiveStep(idx);
  };

  const percentage = (activeStep / (steps.length - 1)) * 100;

  return (
    <section className="interactive-timeline-band">
      <div className="section-head" style={{ marginBottom: "32px" }}>
        <div>
          <p className="eyebrow">{isNeo ? "How it works" : "Delivery model"}</p>
          <h2>{isNeo ? "The process and the packages." : "Process and engagement options."}</h2>
        </div>
      </div>

      <div className="timeline-steps-container">
        <div className="timeline-bulb" />
        <div className="timeline-track-filled" style={{ width: `calc(${percentage}% + 12px)` }} />
        {steps.map((item, idx) => (
          <div 
            key={item.step} 
            className={`timeline-node ${activeStep === idx ? "active" : ""}`}
            onClick={() => handleStepClick(idx)}
          >
            <div className="node-circle">{item.step}</div>
            <div className="node-label">{timelineCopy[idx].title}</div>
          </div>
        ))}
      </div>

      <div className="timeline-active-content-pane">
        <div className="timeline-step-eyebrow">
          {timelineCopy[activeStep].tag}
        </div>
        <div className="timeline-step-title">{timelineCopy[activeStep].title}</div>
        <p className="timeline-step-desc">
          {timelineCopy[activeStep].desc}
        </p>
      </div>

      <div className="package-grid" style={{ marginTop: "48px" }}>
        {section.packages.map((pkg) => (
          <article 
            className="package-card" 
            key={pkg.name}
            style={{ cursor: "pointer" }}
            onClick={() => routeTo(theme, "contact", section.id)}
          >
            <span>{pkg.fit}</span>
            <h3>{pkg.name}</h3>
            <div className="package-meta">
              <strong>{pkg.price}</strong>
              <small>{pkg.duration}</small>
            </div>
            <ul>{pkg.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoiEstimator({ theme }) {
  const [visitors, setVisitors] = useState(15000);
  const [val, setVal] = useState(150);
  const [conversion, setConversion] = useState(2.4);
  const [currency, setCurrency] = useState("USD");

  const rate = 83;
  const isINR = currency === "INR";
  const leads = Math.round(visitors * (conversion / 100));
  const valueGained = leads * val;
  const isNeo = theme === "neo";

  let recommendation = "";
  if (valueGained < 5000) {
    recommendation = isNeo
      ? "RECOMMENDED PLAN: Brand Launch Package. Prioritize visual identity & core messaging baseline."
      : "Recommended engagement: Brand Launch. Focus on branding guidelines and positioning before active spend.";
  } else if (valueGained < 30000) {
    recommendation = isNeo
      ? "RECOMMENDED PLAN: Website Growth Platform. Upgrade conversion mechanics to capture leakages."
      : "Recommended engagement: Website Growth. Focus on UX structure, high-converting copy, and basic SEO.";
  } else {
    recommendation = isNeo
      ? "RECOMMENDED PLAN: Full-Stack Demand System. Paid performance layers and weekly dashboards loop."
      : "Recommended engagement: Demand System. Focus on paid ads optimization, analytics reporting, and active content rhythms.";
  }

  return (
    <section className="roi-estimator-band">
      <div className="section-head">
        <div>
          <p className="eyebrow">{isNeo ? "ROI Estimator" : "Conversion calculator"}</p>
          <h2>{isNeo ? "Project optimized traffic conversions." : "Calculate the impact of a high-conversion funnel."}</h2>
        </div>
      </div>

      <div className="roi-container">
        <div className="roi-controls">
          <div className="currency-selector-group">
            <span className="currency-label">{isNeo ? "SELECT CURRENCY" : "Currency selector"}</span>
            <div className="currency-options">
              <button 
                type="button" 
                className={`currency-btn ${currency === "USD" ? "active" : ""}`}
                onClick={() => setCurrency("USD")}
              >
                USD ($)
              </button>
              <button 
                type="button" 
                className={`currency-btn ${currency === "INR" ? "active" : ""}`}
                onClick={() => setCurrency("INR")}
              >
                INR (₹)
              </button>
            </div>
          </div>

          <div className="roi-slider-group">
            <div className="roi-slider-label">
              <span>{isNeo ? "Monthly Traffic Stream" : "Monthly Visitors Base"}</span>
              <span className="roi-slider-val">{visitors.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="1000" 
              value={visitors} 
              onChange={(e) => setVisitors(parseInt(e.target.value))} 
            />
          </div>

          <div className="roi-slider-group">
            <div className="roi-slider-label">
              <span>{isNeo ? "Conversion Target" : "Target Funnel Conversion"}</span>
              <span className="roi-slider-val">{conversion.toFixed(1)}%</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="8.0" 
              step="0.1" 
              value={conversion} 
              onChange={(e) => setConversion(parseFloat(e.target.value))} 
            />
          </div>

          <div className="roi-slider-group">
            <div className="roi-slider-label">
              <span>{isNeo ? "Average Deal Size" : "Average Contract Value"}</span>
              <span className="roi-slider-val">
                {isINR ? `₹${(val * rate).toLocaleString()}` : `$${val}`}
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              step="10" 
              value={val} 
              onChange={(e) => setVal(parseInt(e.target.value))} 
            />
          </div>
        </div>

        <div className="roi-results-pane">
          <span className="eyebrow">{isNeo ? "CONVERTED GROW-VALUE" : "Projected Impact (Monthly)"}</span>
          <div className="roi-metric-big">
            {isINR ? `₹${(valueGained * rate).toLocaleString()}` : `$${valueGained.toLocaleString()}`}
          </div>
          <p style={{ fontSize: "0.85rem", opacity: 0.75, marginBottom: "16px" }}>
            {isNeo 
              ? `Based on ${leads.toLocaleString()} projected monthly conversions` 
              : `Derived from ${leads.toLocaleString()} conversions per month`}
          </p>
          <div className="roi-recommendation-box">
            {recommendation}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionOverview({ theme, section }) {
  const isMarketing = section.id === "marketing";
  const [activeModule, setActiveModule] = useState(null);

  return (
    <>
      {/* 1 — What it does: the offer, framed */}
      <section className="modules-band">
        <div className="section-head">
          <div>
            <p className="eyebrow">{theme === "neo" ? "What we run" : "Capabilities"}</p>
            <h2>{theme === "neo" ? `Inside ${section.name}.` : `What ${section.name} delivers.`}</h2>
          </div>
          <p>{theme === "neo" ? "Four engines doing the actual work. Tap any one for the full breakdown." : "Core capability modules that make up this solution line."}</p>
        </div>
        <div className="module-grid">
          {section.modules.map((module, i) => (
            <ModuleCard
              key={module.title}
              theme={theme}
              eyebrow={theme === "neo" ? `Module 0${i + 1}` : section.name}
              title={module.title}
              visualTitle={module.title}
              onClick={() => setActiveModule(module)}
            >
              {voice(theme, module)}
            </ModuleCard>
          ))}
        </div>
      </section>

      {activeModule && (
        <ModuleModal
          theme={theme}
          module={activeModule}
          eyebrow={section.name}
          onClose={() => setActiveModule(null)}
        />
      )}

      {/* 2 — Who it's for */}
      <AudienceFit theme={theme} section={section} />

      {/* 3 — How it works */}
      <InteractiveTimeline theme={theme} section={section} />

      {/* 4 — What you get */}
      <StackDetails theme={theme} section={section} />

      {/* 5 — Quality proof (marketing-specific signature moments) */}
      {isMarketing && <BeforeAfterSlider theme={theme} />}
      {isMarketing && <RoiEstimator theme={theme} />}

      {/* 6-8 — Receipts, FAQ, CTA */}
      <TerminalZone theme={theme} section={section} />
    </>
  );
}

function TerminalZone({ theme, section }) {
  return (
    <div className="terminal-zone">
      <ProofCards theme={theme} section={section} />
      <FAQ section={section} />
      <IntakeCTA theme={theme} section={section} />
    </div>
  );
}

function HomeProof({ theme, category }) {
  const filtered = DATA.customers.filter(customer => {
    if (!category) return true;
    if (category === "learner") return customer.id === "academy";
    if (category === "business") return customer.id === "marketing" || customer.id === "labs";
    return true;
  });

  return (
    <section className="home-proof">
      <div className="section-head">
        <div>
          <p className="eyebrow">{theme === "neo" ? "Proof" : "Delivery proof"}</p>
          <h2>{theme === "neo" ? "Receipts from each engine." : "Delivery-model proof."}</h2>
        </div>
      </div>
      <div className="proof-receipts">
        {filtered.map((customer, i) => (
          <article className="proof-receipt" key={customer.company}>
            <div className="receipt-head">
              <span className="receipt-tag">{theme === "neo" ? "Receipt" : "Record"}</span>
              <span className="receipt-index">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="receipt-engine">{customer.section}</h3>
            <p className="receipt-context">{customer.company}</p>
            <p className="receipt-result">{customer[theme]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeIntakeCTA({ theme, type }) {
  const isLearner = type === "learner";
  const title = isLearner 
    ? (theme === "neo" ? "Ready to start? Let's go." : "Begin your learning path.")
    : (theme === "neo" ? "Ready to ship? Let's build." : "Schedule a business consultation.");
  const body = isLearner
    ? (theme === "neo" ? "Our tracks accept direct intakes. Start your journey today." : "Register for an upcoming cohort or placement screening.")
    : (theme === "neo" ? "Labs and Marketing sections are live. Come build with us." : "Connect with a partner to scope your web platform or AI system.");
  const buttonText = theme === "neo" ? "Get in" : "Begin enquiry";

  return (
    <section className="intake-cta">
      <div>
        <p className="eyebrow">{theme === "neo" ? "Next move" : "Recommended next step"}</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <button onClick={() => routeTo(theme, "contact")}>{buttonText}</button>
    </section>
  );
}

function SubpageDetail({ theme, section, page }) {
  return (
    <>
      <section className="detail-hero">
        <p className="eyebrow">{section.name} / {page.title}</p>
        <h2>{voice(theme, page.callout)}</h2>
      </section>
      <section className="module-grid compact">
        {page.cards.map((card) => (
          <ModuleCard key={card.title} theme={theme} eyebrow={page.title} title={card.title} visualTitle={card.title}>
            {voice(theme, card)}
          </ModuleCard>
        ))}
      </section>
      <StackDetails theme={theme} section={section} />
      <ProofCards theme={theme} section={section} />
      <FAQ section={section} />
      <IntakeCTA theme={theme} section={section} />
    </>
  );
}

function AudienceFit({ theme, section }) {
  return (
    <section className="content-band">
      <div className="section-head">
        <div>
          <p className="eyebrow">{theme === "neo" ? "Who's this for" : "Audience fit"}</p>
          <h2>{theme === "neo" ? `${section.name} for the learner, the founder, and the team hiring both.` : `Who ${section.name} is designed to support.`}</h2>
        </div>
      </div>
      <div className="module-grid compact">
        {section.audiences.map((item) => (
          <ModuleCard key={item.title} theme={theme} eyebrow={section.name} title={item.title}>
            {voice(theme, item)}
          </ModuleCard>
        ))}
      </div>
    </section>
  );
}

function StackDetails({ theme, section }) {
  return (
    <section className="content-band stack-detail">
      <div className="section-head">
        <div>
          <p className="eyebrow">{theme === "neo" ? "Stack receipts" : "Delivery stack"}</p>
          <h2>{theme === "neo" ? `${section.name} stack with the details turned on.` : `${section.name} capabilities, outcomes and deliverables.`}</h2>
        </div>
      </div>
      <div className="stack-detail-grid">
        {section.stackDetails.map((item, i) => (
          <article className="stack-detail-card" key={item.title}>
            <div className="stack-card-head">
              <span className="stack-outcome">{item.outcome}</span>
              <span className="stack-index">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3>{item.title}</h3>
            <ul>{item.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ({ section }) {
  return (
    <section className="faq-band">
      <p className="eyebrow">FAQ</p>
      {section.faqs.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}

function IntakeCTA({ theme, section }) {
  return (
    <section className="intake-cta">
      <div>
        <p className="eyebrow">{theme === "neo" ? "Next move" : "Recommended next step"}</p>
        <h2>{section.intake.primary}</h2>
        <p>{section.intake.secondary}</p>
      </div>
      <button onClick={() => routeTo(theme, "contact", section.id)}>{theme === "neo" ? "Let's build" : "Request a consultation"}</button>
    </section>
  );
}

function ProofCards({ theme, section }) {
  return (
    <section className="proof-cards">
      {section.proof.map((item) => (
        <ModuleCard 
          key={item.name} 
          theme={theme}
          eyebrow={item.org}
          title={item.name}
          className="proof-card"
        >
          {voice(theme, item.result)}
        </ModuleCard>
      ))}
    </section>
  );
}


function Customers({ theme, detail }) {
  const activeSection = detail ? DATA.sections[detail] : null;
  if (detail && !activeSection) return <NotFound theme={theme} page={`customers/${detail}`} />;
  const proofItems = activeSection ? DATA.customers.filter((customer) => customer.id === detail) : DATA.customers;
  const copy = theme === "neo"
    ? { title: "Proof without fake trophies.", accent: "Readiness stays visible.", body: "Until public client stories are approved, Nexara shows the operating proof each section is built to produce." }
    : { title: "Readiness proof across all three sections.", accent: "Clear outcomes by section.", body: "Each proof card is framed as a delivery model, not an invented customer claim." };
  return (
    <main>
      <HeroBanner compact theme={theme} eyebrow={activeSection ? `${activeSection.name} proof` : "Proof"} title={copy.title} accent={copy.accent} body={copy.body} />
      <section className="module-grid">
        {proofItems.map((customer) => (
          <article className="module-card" key={customer.company}>
            <span>{customer.section}</span>
            <h3>{customer.company}</h3>
            <p>{customer[theme]}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function Company({ theme }) {
  const company = DATA.company[theme];
  return (
    <main>
      <HeroBanner compact theme={theme} eyebrow="Company" title={theme === "neo" ? "Incorporated, then built to move." : "The operating idea is simple."} accent="Capability compounds." body={company.manifesto} />
      <section className="fact-strip">
        {DATA.company.facts.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
      <section className="module-grid compact">
        {company.principles.map((principle) => (
          <article className="module-card" key={principle.title}>
            <span>Principle</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>
      <section className="content-band">
        <div className="section-head">
          <div>
            <p className="eyebrow">{theme === "neo" ? "Operating standards" : "Delivery governance"}</p>
            <h2>{theme === "neo" ? "The standards that keep the site honest." : "Public claims and delivery promises stay evidence-led."}</h2>
          </div>
        </div>
        <div className="module-grid compact">
          {DATA.company.standards.map((item) => (
            <article className="module-card" key={item.title}>
              <span>Standard</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ContactHero({ theme, onStartBrief }) {
  const copy = DATA.contact[theme];
  const isNeo = theme === "neo";
  return (
    <section className={`contact-hero contact-hero--${theme}`}>
      <div className="contact-hero__bg" aria-hidden="true">
        <div className="orb one"/>
        <div className="orb two"/>
        <div className="scanlines"/>
      </div>
      <div className="contact-hero__body">
        <p className="contact-hero__eyebrow eyebrow">{copy.eyebrow}</p>
        <h1 className="contact-hero__heading">{copy.title}</h1>
        <p className="contact-hero__subtext">{copy.body}</p>
        <a className="contact-hero__email-pill" href={`mailto:${copy.accent}`}>{copy.accent}</a>
        <button className="contact-hero__cta" onClick={onStartBrief}>{copy.primary}</button>
      </div>
    </section>
  );
}

function Contact({ theme, detail }) {
  const copy = DATA.contact[theme];
  const {
    sections,
    formData,
    handleChange,
    handleLaneSelect,
    briefText,
    mailtoUrl,
  } = useBriefForm(detail, { scrollSelector: ".brief-planner-grid" });

  return (
    <main>
      <ContactHero theme={theme} onStartBrief={() => {
        document.querySelector(".brief-planner-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }} />

      <section className="contact-layout brief-planner-grid">
        {/* Left Column: The Form */}
        <div className="brief-form-panel">
          <p className="eyebrow">{theme === "neo" ? "01 / YOUR PROJECT" : "Step 1: Project Parameters"}</p>
          <h2 className="planner-title">{theme === "neo" ? "Tell us what you're building." : "Define the engagement scope."}</h2>
          <p className="planner-subtitle">
            {theme === "neo"
              ? "Six fields. One email. We read every one."
              : "Complete each field below. Your responses generate a formatted message sent directly to our intake team."}
          </p>

          <div className="brief-form-group">
            <label>
              <span>Engagement Area</span>
              <small>{theme === "neo" ? "// which section owns this" : "Select the Nexara section that best fits your need"}</small>
            </label>
            <div className="brief-selector-grid">
              {sections.map(s => (
                <button
                  key={s.id}
                  type="button"
                  className={formData.section === s.id ? "brief-select-btn is-active" : "brief-select-btn"}
                  onClick={() => handleChange("section", s.id)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="brief-form-row">
            <div className="brief-form-group">
              <label>
                <span>Target City</span>
                <small>{theme === "neo" ? "// where this runs" : "Primary city of operation or delivery"}</small>
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                {DATA.market.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="brief-form-group">
              <label>
                <span>Timeline</span>
                <small>{theme === "neo" ? "// how fast" : "Expected start-to-completion window"}</small>
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleChange("timeline", e.target.value)}
              >
                <option value="Under 1 month">Under 1 month</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="Ongoing">Ongoing support</option>
              </select>
            </div>
          </div>

          <div className="brief-form-group">
            <label>
              <span>Target Audience</span>
              <small>{theme === "neo" ? "// who you're building for" : "End users, learners, or customer segment"}</small>
            </label>
            <input
              type="text"
              placeholder="e.g. engineering students, local shoppers"
              value={formData.audience}
              onChange={(e) => handleChange("audience", e.target.value)}
            />
          </div>

          <div className="brief-form-group">
            <label>
              <span>Current Assets & Stack</span>
              <small>{theme === "neo" ? "// what you're starting with" : "Existing website, tools, platforms, or repositories"}</small>
            </label>
            <input
              type="text"
              placeholder="e.g. React website, legacy CRM, none"
              value={formData.context}
              onChange={(e) => handleChange("context", e.target.value)}
            />
          </div>

          <div className="brief-form-group">
            <label>
              <span>Primary Success Metric</span>
              <small>{theme === "neo" ? "// what winning looks like" : "The measurable outcome this engagement should move"}</small>
            </label>
            <input
              type="text"
              placeholder="e.g. 90% placement rate, 2x sales conversion"
              value={formData.successMetric}
              onChange={(e) => handleChange("successMetric", e.target.value)}
            />
          </div>

          <div className="brief-form-row">
            <div className="brief-form-group">
              <label>
                <span>Contact Name</span>
                <small>Decision-maker name</small>
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="brief-form-group">
              <label>
                <span>Contact Email</span>
                <small>Intake routing path</small>
              </label>
              <input
                type="email"
                placeholder="e.g. jane@company.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Brief Preview */}
        <div className="brief-preview-panel glass-panel">
          <p className="eyebrow">{theme === "neo" ? "02 / YOUR SCOPE" : "Step 2: Project Summary"}</p>
          <div className="brief-preview-container">
            <pre className="brief-preview-text">{briefText}</pre>
          </div>
          <div className="brief-preview-actions">
            <a href={mailtoUrl} className="brief-submit-btn">
              {theme === "neo" ? "Send it →" : "Submit via email"}
            </a>
            <p className="brief-disclaimer">
              {theme === "neo"
                ? "Opens your email client with your project details sent to info@nexaragroups.com."
                : "Selecting this opens your email application with your project scope addressed to info@nexaragroups.com."}
            </p>
          </div>
        </div>
      </section>

      {/* The bottom lane selector */}
      <section className="contact-action-explained">
        <p className="eyebrow">{theme === "neo" ? "PICK YOUR LANE" : "Engagement Lanes"}</p>
        <h2>{theme === "neo" ? "Not sure where to start?" : "Select the section that matches your project."}</h2>
        <p>{theme === "neo"
          ? "Each card pre-fills the form for that section. Pick the one that fits."
          : "Choosing a lane pre-populates the form fields for the relevant section scope."}</p>
      </section>

      <section className="module-grid compact">
        {DATA.contact.channels.map((channel) => (
          <article className={"module-card " + (formData.section === channel.section ? "is-active" : "")} key={channel.title}>
            <span>{channel.section === "home" ? "Combined" : DATA.sections[channel.section]?.name}</span>
            <h3>{channel.title}</h3>
            <p>{channel.body}</p>
            <button onClick={() => handleLaneSelect(channel.section)}>{theme === "neo" ? "Set this lane" : "Select lane"}</button>
          </article>
        ))}
      </section>
    </main>
  );
}

function NotFound({ theme, page }) {
  const sections = Object.values(DATA.sections);
  return (
    <main>
      <section className="detail-hero">
        <p className="eyebrow">Route check</p>
        <h2>{page ? `No page is configured for "${page}".` : "No page is configured for this route."}</h2>
      </section>
      <section className="module-grid compact">
        <article className="module-card">
          <span>Start</span>
          <h3>Home</h3>
          <p>Return to the Nexara gateway experience inside the selected presentation mode.</p>
          <button onClick={() => routeTo(theme)}>Open Home</button>
        </article>
        {sections.map((section) => (
          <article className="module-card" key={section.id}>
            <span>{section.index}</span>
            <h3>{section.name}</h3>
            <p>{voice(theme, section.short)}</p>
            <button onClick={() => routeTo(theme, section.id)}>Open {section.name}</button>
          </article>
        ))}
      </section>
    </main>
  );
}

function Footer({ theme }) {
  return (
    <footer className="footer">
      <div>
        <strong>Nexara</strong>
        <p>Academy, Digital Marketing and Labs. One company, two presentations.</p>
      </div>
      <div>
        {Object.values(DATA.sections).map((s) => <button key={s.id} onClick={() => routeTo(theme, s.id)}>{s.name}</button>)}
        <button onClick={() => routeTo(theme, "company")}>Company</button>
        <button onClick={() => routeTo(theme, "contact")}>Contact</button>
      </div>
    </footer>
  );
}

