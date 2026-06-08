/* ═══════════════════════════════════════════════════════════════════
   TRUSTSITE — DEDICATED CORPORATE COMPONENT TREE
   ═══════════════════════════════════════════════════════════════════ */

function setupTsxFade() {
  const els = document.querySelectorAll('.tsx-fade:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return () => {};
  }
  const obs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  els.forEach(el => obs.observe(el));
  return () => obs.disconnect();
}

function TrustParticleCanvas() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const BG = '#0A0F1E', LINE = 'rgba(15,76,129,', DOT = 'rgba(15,76,129,1)';
    const MAX_DIST = 160, N = 320;
    let W, H, particles, raf;
    function Particle() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.28; this.vy = (Math.random() - 0.5) * 0.28;
      this.r = Math.random() * 1.4 + 0.4;
    }
    Particle.prototype.update = function() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -4) this.x = W + 4; if (this.x > W + 4) this.x = -4;
      if (this.y < -4) this.y = H + 4; if (this.y > H + 4) this.y = -4;
    };
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    function init() { resize(); particles = Array.from({ length: N }, () => new Particle()); }
    function draw() {
      ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx*dx + dy*dy;
          if (d2 > MAX_DIST * MAX_DIST) continue;
          const alpha = (1 - Math.sqrt(d2) / MAX_DIST) * 0.28;
          ctx.strokeStyle = LINE + alpha + ')'; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = DOT;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]; p.update();
        ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    init(); draw();
    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { cancelAnimationFrame(raf); init(); draw(); }, 120); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); clearTimeout(rt); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} className="tsx-hero-canvas" aria-hidden="true" />;
}

function getTrustNavLabel(item) {
  return item.trustLabel || item.label;
}

function getTrustSectionLabel(section) {
  const navItem = DATA.nav.find(item => item.page === section.id);
  return navItem ? getTrustNavLabel(navItem) : section.name;
}

function getTrustSubpageLabel(section, page) {
  const labels = {
    academy: {
      tracks: "Role Tracks",
      internships: "Internship Operations",
      placements: "Placement Operations",
    },
    marketing: {
      brand: "Brand Systems",
      web: "Web Platforms",
      growth: "Growth Operations",
    },
    labs: {
      products: "System Patterns",
      "ai-builds": "Custom AI Builds",
      security: "Governance & Security",
    },
  };
  return labels[section.id]?.[page.slug] || page.title;
}

function TrustNav({ page, detail }) {
  const navRef = React.useRef(null);
  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="tsx-nav" ref={navRef} role="banner">
      <div className="tsx-nav-inner">
        <button className="tsx-logo" onClick={() => routeTo('trust', 'home')} aria-label="Nexara home">
          <div className="tsx-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 3L8 8M8 8L13 3M8 8V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Nexara
        </button>
        <nav aria-label="Primary">
          <ul className="tsx-nav-links">
            {DATA.nav.map(item => (
              <li key={item.page}>
                <button className={page === item.page ? 'active' : ''} onClick={() => routeTo('trust', item.page)}>
                  {getTrustNavLabel(item)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="tsx-nav-right">
          <button className="tsx-nav-switch" onClick={() => routeTo('neo', page, detail)}>Neo ↗</button>
          <button className="tsx-nav-cta" onClick={() => routeTo('trust', 'contact')}>Submit Brief</button>
        </div>
      </div>
      <nav className="tsx-mobile-nav-scroll" aria-label="Primary mobile">
        {DATA.nav.map(item => (
          <button key={item.page} className={page === item.page ? 'active' : ''} onClick={() => routeTo('trust', item.page)}>
            {getTrustNavLabel(item)}
          </button>
        ))}
      </nav>
    </header>
  );
}

function TrustHeroFlat() {
  const copy = DATA.home.trust;
  return (
    <section className="tsx-hero" aria-label="Hero">
      <TrustParticleCanvas />
      <div className="tsx-hero-rule" aria-hidden="true" />
      <div className="tsx-hero-copy">
        <p className="tsx-eyebrow">{copy.eyebrow}</p>
        <h1 className="tsx-h1">{copy.title}<br /><span>{copy.accent}</span></h1>
        <p className="tsx-hero-sub">{copy.body}</p>
        <div className="tsx-hero-actions">
          <button className="tsx-btn-primary" onClick={() => routeTo('trust', 'contact')}>Submit Enterprise Brief</button>
          <button className="tsx-btn-ghost" onClick={() => routeTo('trust', 'academy')}>Review Solution Lines</button>
        </div>
      </div>
      <div className="tsx-hero-card" role="complementary" aria-label="Nexara at a glance">
        <div className="tsx-hero-card-header">
          <p>Nexara / Enterprise</p>
          <p>Route parity</p>
        </div>
        <div>
          {Object.values(DATA.sections).map((section, index) => (
            <div className="tsx-stat" key={section.id}>
              <div className="tsx-stat-label">{getTrustSectionLabel(section)}</div>
              <div className="tsx-stat-value">{section.index}<span>{section.stackDetails.length} modules</span></div>
              <div className={`tsx-stat-dot${index < 2 ? ' green' : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

const TSX_SOLUTIONS = [
  {
    index: '01 — Labs', name: 'Labs', page: 'labs', linkLabel: 'Explore Labs',
    desc: 'Operational systems and AI infrastructure — from workflow discovery to governed rollout. Built for teams that need measurable automation, not demos.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  },
  {
    index: '02 — Marketing', name: 'Digital Marketing', page: 'marketing', linkLabel: 'Explore Marketing',
    desc: 'Strategy and campaigns that compound — positioning, websites, content operations, and performance systems with clear deliverables at every stage.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    index: '03 — Academy', name: 'Academy', page: 'academy', linkLabel: 'Explore Academy',
    desc: 'Talent tracks for the next generation — cohort-based training, portfolio development, and placement readiness for students, colleges, and employers.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
];

const TSX_GOV_CATEGORIES = ['Integrity', 'Scoping', 'Governance', 'Reporting'];

const TSX_FEATURES = [
  {
    title: 'Brief-driven delivery',
    desc: 'Every engagement starts with a scoped brief. No open-ended retainers without defined deliverables and success criteria.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  },
  {
    title: 'Cohort-based execution',
    desc: 'Academy programmes run in structured cohorts — visible cadence, weekly checkpoints, and measurable completion at every stage.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    title: 'Stack-specific builds',
    desc: 'Labs systems are scoped to your actual workflow, data sources, and operational constraints — not generic AI templates.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  {
    title: 'Integrated across services',
    desc: 'Academy, Marketing, and Labs share one operating model — one accountable partner for talent, presence, and systems.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
];

function TrustSolutionsGrid() {
  const sections = Object.values(DATA.sections);
  return (
    <section className="tsx-solutions" aria-labelledby="tsx-sol-h">
      <div className="tsx-section-inner">
        <p className="tsx-section-eyebrow tsx-fade">Enterprise solution lines</p>
        <h2 className="tsx-section-heading tsx-fade" id="tsx-sol-h">{DATA.home.trust.calloutTitle}</h2>
        <p className="tsx-section-lede tsx-fade">{DATA.home.trust.calloutBody}</p>
        <div className="tsx-solutions-grid">
          {sections.map((section, i) => (
            <article className={`tsx-sol-card tsx-fade tsx-fade-d${i + 1}`} key={section.id} onClick={() => routeTo('trust', section.id)}>
              <div className="tsx-sol-icon" aria-hidden="true">{TSX_SOLUTIONS.find(item => item.page === section.id)?.icon}</div>
              <p className="tsx-sol-index">{section.index} / {section.name}</p>
              <h3 className="tsx-sol-name">{getTrustSectionLabel(section)}</h3>
              <p className="tsx-sol-desc">{section.short.trust}</p>
              <ul className="tsx-module-list">
                {section.modules.map(module => <li key={module.title}>{module.title}</li>)}
              </ul>
              <span className="tsx-sol-link">
                Open {getTrustSectionLabel(section)}
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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

function TrustEnterpriseStacks() {
  return (
    <section className="tsx-enterprise-stacks" aria-labelledby="tsx-stack-h">
      <div className="tsx-section-inner">
        <p className="tsx-section-eyebrow">Stacked enterprise modules</p>
        <h2 className="tsx-section-heading" id="tsx-stack-h">Integrated stacks built from the same Nexara capabilities.</h2>
        <div className="tsx-stack-grid">
          {DATA.superSkills.map((item, index) => (
            <article className="tsx-stack-card" key={item.title}>
              <span className="tsx-stack-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.trust}</p>
              <div className="tsx-stack-tags">
                {item.sections.map(section => <span key={section}>{section}</span>)}
              </div>
              <ul>
                {item.stack.map(module => <li key={module}>{module}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustMarketContext() {
  return (
    <section className="tsx-market-context" aria-labelledby="tsx-market-h">
      <div className="tsx-section-inner tsx-market-grid">
        <div>
          <p className="tsx-section-eyebrow">Operating region</p>
          <h2 className="tsx-section-heading" id="tsx-market-h">{DATA.market.title.trust}</h2>
          <p className="tsx-section-lede">{DATA.market.body.trust}</p>
          <div className="tsx-city-grid">
            {DATA.market.cities.map(city => <span key={city}>{city}</span>)}
          </div>
        </div>
        <div className="tsx-assumption-panel">
          <span className="tsx-panel-title">Planning assumptions</span>
          {DATA.market.assumptions.map((assumption, index) => (
            <p key={assumption}><strong>{String(index + 1).padStart(2, "0")}</strong>{assumption}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCTABand() {
  return (
    <section className="tsx-cta-band" aria-labelledby="tsx-cta-h">
      <div className="tsx-section-inner">
        <div className="tsx-cta-inner tsx-fade">
          <p className="tsx-cta-eyebrow">Enterprise intake</p>
          <h2 className="tsx-cta-heading" id="tsx-cta-h">Start with a scoped Nexara brief.</h2>
          <p className="tsx-cta-sub">Select the same capability area visible on Neo, then submit the corporate brief format for Trust.</p>
          <button className="tsx-btn-cta" onClick={() => routeTo('trust', 'contact')}>Submit Enterprise Brief</button>
        </div>
      </div>
    </section>
  );
}

function TrustFooter() {
  const solutionLinks = DATA.nav.slice(0, 3).map(item => ({ text: getTrustNavLabel(item), page: item.page }));
  const moduleLinks = Object.values(DATA.sections).flatMap(section =>
    section.subpages.map(sp => ({ text: `${getTrustSectionLabel(section)} / ${getTrustSubpageLabel(section, sp)}`, page: section.id, detail: sp.slug }))
  );
  const cols = [
    { label: 'Solutions', links: solutionLinks },
    { label: 'Modules', links: moduleLinks.slice(0, 5) },
    { label: 'Company', links: [{ text: 'Delivery Proof', page: 'customers' }, { text: 'About Nexara', page: 'company' }, { text: 'Enterprise Enquiry', page: 'contact' }] },
  ];
  return (
    <footer className="tsx-footer" role="contentinfo">
      <div className="tsx-footer-top">
        <div>
          <button className="tsx-logo" onClick={() => routeTo('trust', 'home')} aria-label="Nexara home">
            <div className="tsx-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 3L8 8M8 8L13 3M8 8V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            Nexara
          </button>
          <p className="tsx-footer-brand-desc">Enterprise IT capability programmes for talent, digital growth and applied automation.</p>
        </div>
        {cols.map(col => (
          <div key={col.label}>
            <span className="tsx-footer-col-label">{col.label}</span>
            <ul className="tsx-footer-links">
              {col.links.map(l => (
                <li key={l.text}><button onClick={() => routeTo('trust', l.page, l.detail)}>{l.text}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="tsx-footer-bottom">
        <p className="tsx-footer-copyright">© 2026 Nexara. Incorporated company. All rights reserved.</p>
      </div>
    </footer>
  );
}

function TrustHome() {
  return (
    <main>
      <TrustHeroFlat />
      <TrustProofStrip />
      <TrustSolutionsGrid />
      <TrustFeatureStrip />
      <TrustEnterpriseStacks />
      <TrustMarketContext />
      <TrustCTABand />
    </main>
  );
}

/* ─── TrustSectionPage — enterprise IT layout ──────────────────── */

function TrustSectionHeader({ section }) {
  const copy = section.hero.trust;
  return (
    <div className="tsx-sec-header">
      <div className="tsx-sec-header-inner">
        <div>
          <span className="tsx-sec-eyebrow">{copy.eyebrow}</span>
          <h1 className="tsx-sec-h1">{copy.title}</h1>
          <p className="tsx-sec-body">{copy.body}</p>
          <div className="tsx-sec-actions">
            <button className="tsx-sec-btn-primary" onClick={() => routeTo('trust', 'contact')}>{copy.primary}</button>
            <button className="tsx-sec-btn-ghost" onClick={() => routeTo('trust', section.id, section.subpages[0].slug)}>{copy.secondary}</button>
          </div>
        </div>
        <div className="tsx-spec-panel">
          <span className="tsx-spec-panel-label">At a glance</span>
          {section.stats.map(([value, label]) => (
            <div className="tsx-spec-row" key={label}>
              <span className="tsx-spec-label">{label}</span>
              <span className="tsx-spec-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustSubNav({ section, activeSlug }) {
  return (
    <nav className="tsx-subnav" aria-label="Section navigation">
      <button className={!activeSlug ? 'tsx-tab active' : 'tsx-tab'} onClick={() => routeTo('trust', section.id)}>Overview</button>
          {section.subpages.map(sp => (
        <button key={sp.slug} className={activeSlug === sp.slug ? 'tsx-tab active' : 'tsx-tab'} onClick={() => routeTo('trust', section.id, sp.slug)}>{getTrustSubpageLabel(section, sp)}</button>
      ))}
    </nav>
  );
}

function TrustSectionOverview({ section }) {
  return (
    <div className="tsx-overview">
      <div className="tsx-section-inner">
        <div className="tsx-overview-grid">
          <div>
            <span className="tsx-overview-label">Capabilities</span>
            <ul className="tsx-capability-list">
              {section.modules.map((m, i) => (
                <li className="tsx-capability-item" key={m.title}>
                  <span className="tsx-cap-index">0{i + 1}</span>
                  <div className="tsx-cap-body">
                    <strong>{m.title}</strong>
                    <p>{m.trust}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="tsx-audience-panel">
              <span className="tsx-panel-title">Who this serves</span>
              {section.audiences.map(a => (
                <div className="tsx-audience-row" key={a.title}>
                  <strong>{a.title}</strong>
                  <p>{a.trust}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

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

        <div className="tsx-intake-band">
          <div>
            <p className="tsx-intake-heading">{section.intake.primary}</p>
            <p className="tsx-intake-sub">{section.intake.secondary}</p>
          </div>
          <button className="tsx-btn-cta" onClick={() => routeTo('trust', 'contact')}>Start with a brief</button>
        </div>
      </div>
    </div>
  );
}

function TrustSubpageDetail({ section, page }) {
  return (
    <div className="tsx-subpage">
      <div className="tsx-section-inner">
        <div className="tsx-subpage-header">
          <h2 className="tsx-subpage-h2">{page.callout.trust}</h2>
        </div>
        <div className="tsx-subpage-cards">
          {page.cards.map(card => (
            <div className="tsx-subpage-card" key={card.title}>
              <h3 className="tsx-subpage-card-title">{card.title}</h3>
              <p className="tsx-subpage-card-body">{card.trust}</p>
            </div>
          ))}
        </div>
        <div className="tsx-intake-band">
          <div>
            <p className="tsx-intake-heading">{section.intake.primary}</p>
            <p className="tsx-intake-sub">{section.intake.secondary}</p>
          </div>
          <button className="tsx-btn-cta" onClick={() => routeTo('trust', 'contact')}>Start with a brief</button>
        </div>
      </div>
    </div>
  );
}

function TrustSectionPage({ section, detail }) {
  const active = useMemo(() => detail ? section.subpages.find(p => p.slug === detail) : null, [section, detail]);
  if (detail && !active) return <NotFound theme="trust" page={`${section.id}/${detail}`} />;
  return (
    <main className="tsx-section-page">
      <TrustSectionHeader section={section} />
      <TrustSubNav section={section} activeSlug={detail} />
      <div key={detail || 'overview'}>
        {active
          ? <TrustSubpageDetail section={section} page={active} />
          : <TrustSectionOverview section={section} />}
      </div>
    </main>
  );
}

function TrustCustomers({ detail }) {
  const activeSection = detail ? DATA.sections[detail] : null;
  if (detail && !activeSection) return <NotFound theme="trust" page={`customers/${detail}`} />;
  const proofItems = activeSection ? DATA.customers.filter(customer => customer.id === detail) : DATA.customers;
  return (
    <main className="tsx-customers-page">
      <div className="tsx-sec-header">
        <div className="tsx-sec-header-inner">
          <div>
            <span className="tsx-sec-eyebrow">{activeSection ? `${activeSection.name} — Proof` : "Operating Proof"}</span>
            <h1 className="tsx-sec-h1">Delivery proof across the same Nexara capability map.</h1>
            <p className="tsx-sec-body">Trust presents the same work areas as Neo, but frames proof as delivery models, scope evidence and operating readiness.</p>
          </div>
          <div className="tsx-spec-panel">
            <span className="tsx-spec-panel-label">Coverage</span>
            {[
              ["3", "sections covered"],
              ["3", "proof records"],
              ["0", "invented claims"],
            ].map(([value, label]) => (
              <div className="tsx-spec-row" key={label}>
                <span className="tsx-spec-label">{label}</span>
                <span className="tsx-spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="tsx-section-inner tsx-proof-table-section">
        <h2 className="tsx-section-heading" style={{marginBottom: "24px"}}>Delivery model proof</h2>
        <table className="tsx-del-table">
          <thead>
            <tr><th>Section</th><th>Engagement type</th><th>What was produced</th></tr>
          </thead>
          <tbody>
            {proofItems.map(customer => (
              <tr key={customer.id}>
                <td><strong>{customer.section}</strong></td>
                <td>{customer.company}</td>
                <td>{customer.trust}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tsx-intake-band" style={{marginTop: "48px"}}>
          <div>
            <p className="tsx-intake-heading">Start a scoped engagement</p>
            <p className="tsx-intake-sub">Submit a brief. Nexara maps the appropriate next step.</p>
          </div>
          <button className="tsx-btn-cta" onClick={() => routeTo("trust", "contact")}>Submit a brief</button>
        </div>
      </section>
    </main>
  );
}

function TrustCompany() {
  const company = DATA.company.trust;
  return (
    <main className="tsx-company-page">
      <div className="tsx-sec-header">
        <div className="tsx-sec-header-inner">
          <div>
            <span className="tsx-sec-eyebrow">About Nexara</span>
            <h1 className="tsx-sec-h1">The operating idea is simple.</h1>
            <p className="tsx-sec-body">{company.manifesto}</p>
          </div>
          <div className="tsx-spec-panel">
            <span className="tsx-spec-panel-label">Company facts</span>
            {DATA.company.facts.map(([label, value]) => (
              <div className="tsx-spec-row" key={label}>
                <span className="tsx-spec-label">{label}</span>
                <span className="tsx-spec-value-text">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="tsx-section-inner tsx-principles-section">
        <h2 className="tsx-section-heading" style={{marginBottom: "24px"}}>Operating principles</h2>
        <ul className="tsx-capability-list">
          {company.principles.map((principle, index) => (
            <li className="tsx-capability-item" key={principle.title}>
              <span className="tsx-cap-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="tsx-cap-body">
                <strong>{principle.title}</strong>
                <p>{principle.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="tsx-section-inner tsx-standards-section">
        <h2 className="tsx-section-heading" style={{marginBottom: "24px"}}>Delivery governance</h2>
        <table className="tsx-del-table">
          <thead>
            <tr><th>Standard</th><th>Commitment</th></tr>
          </thead>
          <tbody>
            {DATA.company.standards.map(item => (
              <tr key={item.title}>
                <td><strong>{item.title}</strong></td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tsx-intake-band" style={{marginTop: "48px"}}>
          <div>
            <p className="tsx-intake-heading">Work with Nexara</p>
            <p className="tsx-intake-sub">Start with a scoped brief for any of the three sections.</p>
          </div>
          <button className="tsx-btn-cta" onClick={() => routeTo("trust", "contact")}>Submit a brief</button>
        </div>
      </section>
    </main>
  );
}

function TrustContact({ detail }) {
  const copy = DATA.contact.trust;
  const {
    formData,
    handleChange,
    handleLaneSelect,
    handleSubmit,
    showSuccess,
  } = useBriefForm(detail, { scrollSelector: ".tsx-brief-section" });

  return (
    <main className="tsx-contact-page">
      <section className="tsx-contact-hero">
        <div className="tsx-section-inner">
          <p className="tsx-cta-eyebrow">{copy.eyebrow}</p>
          <h1 className="tsx-contact-h1">{copy.title}</h1>
          <p className="tsx-contact-body">{copy.body}</p>
          <a className="tsx-email-pill" href={`mailto:${copy.accent}`}>{copy.accent}</a>
        </div>
      </section>

      <section className="tsx-section-inner tsx-channel-section">
        <h2 className="tsx-section-heading" style={{marginBottom: "0"}}>Select a section</h2>
        <div className="tsx-channel-grid">
          {DATA.contact.channels.map(channel => (
            <button
              key={channel.title}
              type="button"
              className={formData.section === channel.section ? "tsx-channel-card active" : "tsx-channel-card"}
              onClick={() => handleLaneSelect(channel.section)}
            >
              <h3>{channel.title}</h3>
              <p>{channel.body}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="tsx-section-inner tsx-brief-section">
        <h2 className="tsx-section-heading" style={{marginBottom: "0"}}>{DATA.contact.enquiry.title}</h2>
        <p className="tsx-brief-intro">{DATA.contact.enquiry.body}</p>
        {showSuccess ? (
          <div className="tsx-intake-band">
            <div>
              <p className="tsx-intake-heading">Brief prepared. Your mail client will open shortly.</p>
              <p className="tsx-intake-sub">If it does not open, use the email link on this page and include the brief details manually.</p>
            </div>
          </div>
        ) : (
          <div className="tsx-brief-grid">
            <form className="tsx-brief-form" onSubmit={handleSubmit}>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-city">City</label>
                <input id="trust-city" className="tsx-field-input" type="text" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
              </div>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-audience">Audience / user group</label>
                <input id="trust-audience" className="tsx-field-input" type="text" placeholder="e.g. engineering students, local shoppers" value={formData.audience} onChange={(e) => handleChange("audience", e.target.value)} />
              </div>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-timeline">Timeline</label>
                <select id="trust-timeline" className="tsx-field-input" value={formData.timeline} onChange={(e) => handleChange("timeline", e.target.value)}>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-context">Context / current state</label>
                <textarea id="trust-context" className="tsx-field-input" placeholder="Existing website, tools, platforms, repositories, or current workflow" value={formData.context} onChange={(e) => handleChange("context", e.target.value)} />
              </div>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-success">Success metric</label>
                <input id="trust-success" className="tsx-field-input" type="text" placeholder="e.g. improve enquiry conversion, launch a cohort dashboard" value={formData.successMetric} onChange={(e) => handleChange("successMetric", e.target.value)} />
              </div>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-name">Your name</label>
                <input id="trust-name" className="tsx-field-input" type="text" placeholder="Decision-maker name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
              </div>
              <div className="tsx-field">
                <label className="tsx-field-label" htmlFor="trust-email">Email</label>
                <input id="trust-email" className="tsx-field-input" type="email" placeholder="name@company.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
              </div>
              <button className="tsx-btn-cta tsx-brief-submit" type="submit">{DATA.contact.enquiry.label}</button>
            </form>
            <aside className="tsx-checklist-panel">
              <span>Your brief should include</span>
              <ul>
                {DATA.contact.checklist.map(item => <li key={item}>{item}</li>)}
              </ul>
              <a href={DATA.contact.enquiry.href}>{copy.accent}</a>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function TrustSite({ page, detail }) {
  const section = DATA.sections[page];
  React.useEffect(() => { window.scrollTo(0, 0); }, [page]);
  React.useEffect(() => setupTsxFade(), [page]);
  const validPage = section || STATIC_PAGES.includes(page);
  return (
    <div className="site trust tsx-site">
      <a className="skip-link" href="#main">Skip to content</a>
      <TrustNav page={page} detail={detail} />
      <div id="main" className={page !== 'home' ? 'tsx-main-offset' : ''}>
        {page === 'home'      && <TrustHome />}
        {section              && <TrustSectionPage section={section} detail={detail} />}
        {page === 'customers' && <TrustCustomers detail={detail} />}
        {page === 'company'   && <TrustCompany />}
        {page === 'contact'   && <TrustContact detail={detail} />}
        {!validPage           && <NotFound theme="trust" page={page} />}
      </div>
      <TrustFooter />
    </div>
  );
}
