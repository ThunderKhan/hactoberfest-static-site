import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { EVENT, FAQS, PATHS, SCHEDULE, TICKER, TOOLKIT } from "./event";

const LazyLocationMap = lazy(async () => {
  const module = await import("./components/LocationMap");
  return { default: module.LocationMap };
});

const TERMINAL_SCRIPT = `# before you arrive

$ git --version
$ github-account: ready
$ laptop-charge: 100%
$ curiosity: required

# during the day
- ask questions early
- commit often
- document decisions
- help somebody else
- ship before polishing

> open source is a conversation.`;

function Spark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="spark-svg">
      <path d="M12 1.5c.8 6.2 4.3 9.7 10.5 10.5C16.3 12.8 12.8 16.3 12 22.5 11.2 16.3 7.7 12.8 1.5 12 7.7 11.2 11.2 7.7 12 1.5Z" />
    </svg>
  );
}

function Arrow({ direction = "right" }: { direction?: "right" | "down" | "up-right" }) {
  const d = direction === "down" ? "M12 4v16m0 0 6-6m-6 6-6-6" : direction === "up-right" ? "M5 19 19 5m0 0H8m11 0v11" : "M4 12h16m0 0-6-6m6 6-6 6";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="arrow-icon">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>{"{"}</span>
      <i />
      <span>{"}"}</span>
    </span>
  );
}

function Button({ children, href, variant = "yellow", disabled = false }: { children: ReactNode; href: string; variant?: "yellow" | "ghost" | "cream"; disabled?: boolean }) {
  const className = `button button-${variant}${disabled ? " disabled" : ""}`;
  if (disabled) return <span className={className}>{children}</span>;
  return (
    <a className={className} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}

function RegistrationButton({ nav = false, status = false }: { nav?: boolean; status?: boolean }) {
  const enabled = Boolean(EVENT.registrationUrl);
  if (status && !enabled) return <p className="registration-status">Registration coming soon</p>;
  return (
    <Button href={enabled ? EVENT.registrationUrl : "#register"} variant={enabled ? "yellow" : "ghost"}>
      {enabled ? "Register now" : nav ? "Registration details" : "See registration status"}
      <span className="button-icon"><Arrow /></span>
    </Button>
  );
}

function HeroLandscape() {
  return <div className="hero-landscape" aria-hidden="true" />;
}

function SectionHead({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`section-head reveal${light ? " light" : ""}`}>
      <div className="eyebrow"><Spark size={13} /> {eyebrow}</div>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

function TypewriterTerminal({ text, speed = 18, startDelay = 280 }: { text: string; speed?: number; startDelay?: number }) {
  const preRef = useRef<HTMLPreElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const [started, setStarted] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (reducedMotion) {
      setStarted(true);
      setDisplayed(text);
      return;
    }

    if (!preRef.current || started) return;
    const node = preRef.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, started, text]);

  useEffect(() => {
    if (!started || reducedMotion) return;
    let cancelled = false;
    let index = 0;
    let timer = 0;

    const step = () => {
      if (cancelled) return;
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index < text.length) {
        const previousChar = text[index - 1];
        const extraDelay = previousChar === "\n" ? 135 : previousChar === "$" || previousChar === ">" ? 72 : 0;
        timer = window.setTimeout(step, speed + extraDelay);
      }
    };

    timer = window.setTimeout(step, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reducedMotion, speed, startDelay, started, text]);

  return (
    <div className="terminal-output">
      <pre ref={preRef} className={`terminal-typewriter${started ? " started" : ""}`} aria-hidden="true">
        {displayed}
        <span className="terminal-cursor" aria-hidden="true" />
      </pre>
      <span className="sr-only">{text}</span>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div className="map-placeholder" aria-hidden="true">
      <span className="map-placeholder-road road-one" />
      <span className="map-placeholder-road road-two" />
      <span className="map-placeholder-road road-three" />
      <span className="map-placeholder-pin" />
    </div>
  );
}

function DeferredLocationMap({ location, coordinates }: { location: string; coordinates: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !hostRef.current) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={hostRef} className="deferred-map-shell">
      {shouldLoad ? (
        <Suspense fallback={<MapPlaceholder />}>
          <LazyLocationMap location={location} coordinates={coordinates} />
        </Suspense>
      ) : (
        <MapPlaceholder />
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTop, setShowTop] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const menuRef = useRef<HTMLDialogElement>(null);
  const topSentinelRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();

  function navigateFromMenu(id: string) {
    menuRef.current?.close();
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const focusTarget = target.querySelector<HTMLElement>("h1, h2, h3") ?? target;
      focusTarget.tabIndex = -1;
      target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
      focusTarget.focus({ preventScroll: true });
      focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
      window.history.replaceState(null, "", `#${id}`);
    });
  }

  useEffect(() => {
    const dialog = menuRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px" },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = topSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowTop(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-112px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <span ref={topSentinelRef} className="top-sentinel" aria-hidden="true" />

      <nav className={`navbar${heroVisible ? "" : " navbar-content"}`} aria-label="Primary navigation">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Hacktoberfest DDUGU home">
            <BrandMark />
            <span className="brand-text"><strong>Hacktoberfest</strong><small>DDUGU</small></span>
          </a>

          <div className="desktop-links">
            <a href="#about">About</a>
            <a href="#paths">Build paths</a>
            <a href="#schedule">Schedule</a>
            <a href="#venue">Venue</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <div className="desktop-register"><RegistrationButton nav /></div>
            <button className={`menu-button${menuOpen ? " active" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
              <span /><span />
            </button>
          </div>
        </div>
        <dialog ref={menuRef} id="mobile-navigation" className="mobile-menu" aria-label="Site navigation" onCancel={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)}>
          <div className="mobile-menu-heading"><span>EXPLORE THE HACK DAY</span><button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu" autoFocus>×</button></div>
          {["about", "paths", "schedule", "venue", "faq", "register"].map((id, i) => (
            <a key={id} style={{ "--delay": `${i * 45}ms` } as CSSProperties} href={`#${id}`} onClick={e => { e.preventDefault(); navigateFromMenu(id); }}>{id === "paths" ? "Build paths" : id === "faq" ? "FAQ" : id[0].toUpperCase() + id.slice(1)}</a>
          ))}
        </dialog>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <section ref={heroRef} className="hero" id="top">
          <HeroLandscape />
          <div className="hero-content container">
            <div className="hero-pills reveal visible">
              <span>IN PERSON</span><span>DDUGU</span><span>OCTOBER 2026</span>
            </div>
            <p className="hero-kicker reveal visible">Open source starts here</p>
            <h1 className="hero-title reveal visible">
              <span>Hacktoberfest</span>
              <em>Hack Day × DDUGU</em>
            </h1>
            <p className="hero-copy reveal visible">
              A campus day for building, learning, and contributing together. Meet fellow builders, work on real projects, and leave with something you can keep shipping.
            </p>
            <div className="hero-actions reveal visible">
              <RegistrationButton />
              <Button href="#schedule" variant={EVENT.registrationUrl ? "ghost" : "yellow"}>Explore schedule <span className="button-icon"><Arrow direction="down" /></span></Button>
            </div>
          </div>
        </section>

        <section className="fact-strip" aria-label="Event facts">
          <div className="container fact-grid reveal">
            <div className="fact-cell"><small>FORMAT</small><strong>IN PERSON</strong><span>Campus build day</span></div>
            <div className="fact-cell"><small>WHEN</small><strong>OCT 2026</strong><span>Exact date TBA</span></div>
            <div className="fact-cell"><small>WHO</small><strong>ALL LEVELS</strong><span>First-timers welcome</span></div>
            <div className="fact-cell"><small>WHERE</small><strong>DDUGU</strong><span>Gorakhpur, UP</span></div>
          </div>
        </section>

        <section className="section cream-section" id="about">
          <div className="container editorial-grid">
            <div className="editorial-copy reveal">
              <div className="eyebrow"><Spark size={13} /> HACKTOBERFEST, BUT ON CAMPUS</div>
              <h2>One room.<br /><em>One day.</em><br />A lot of open source.</h2>
            </div>
            <div className="editorial-body reveal">
              <p className="lead">The internet makes open source look like a wall of repositories. The Hack Day makes it human.</p>
              <p>Bring a laptop and a little curiosity. We will turn Git workflows, issues, models, deployment, and collaboration into something you can touch, break, fix, and understand with people sitting next to you.</p>
              <div className="inline-note"><span>NO PERFECT IDEA REQUIRED</span><i /> Start small. Make it useful. Explain what you learned.</div>
            </div>
          </div>

          <div className="container reveal manifesto-wrap">
            <div className="manifesto">
              <div className="manifesto-text">
                <small>THE BRIEF</small>
                <p>Build something <em>open enough to learn from</em> and useful enough that somebody else would want to try it.</p>
              </div>
              <div className="manifesto-badge">BUILD<br />IN PUBLIC</div>
            </div>
          </div>
        </section>

        <section className="section blue-section" id="paths">
          <div className="container">
            <SectionHead light eyebrow="CHOOSE YOUR LANE" title="Four ways to have a good Hack Day." copy="You do not have to fit a single hackathon stereotype. Pick the lane that gives you the most learning per hour." />
            <div className="path-grid">
              {PATHS.map(path => (
                <article className="path-card" key={path.index}>
                  <div className="path-top"><span>{path.index}</span><b>{path.tag}</b></div>
                  <h3>{path.title}</h3>
                  <p>{path.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section schedule-section" id="schedule">
          <div className="container schedule-layout">
            <div className="schedule-intro reveal">
              <div className="eyebrow"><Spark size={13} /> THE DAY, AT A GLANCE</div>
              <h2>Enough structure to move. Enough space to build.</h2>
              <p>Times below are a planning draft until the final event date is locked. The rhythm is intentional: short talks, long build blocks.</p>
            </div>
            <div className="timeline">
              {SCHEDULE.map((item, i) => (
                <article className="timeline-row reveal" style={{ "--delay": `${i * 55}ms` } as CSSProperties} key={item.time + item.title}>
                  <time>{item.time}</time>
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-card">
                    <small>{item.eyebrow}</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section toolkit-section" id="toolkit">
          <div className="container toolkit-layout">
            <div className="reveal">
              <div className="toolkit-console" aria-label="Open source starter checklist">
                <div className="console-bar"><span /><span /><span /><b>starter-kit.md</b></div>
                <TypewriterTerminal text={TERMINAL_SCRIPT} />
              </div>
            </div>
            <div className="toolkit-copy reveal">
              <div className="eyebrow"><Spark size={13} /> STARTER KIT</div>
              <h2>You bring the laptop. We bring the map.</h2>
              <p>We are designing the day so a beginner can enter without feeling like everyone else received a secret handbook.</p>
              <div className="tool-list">
                {TOOLKIT.map(([title, copy], i) => (
                  <div className="tool-row" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section rewards-section" id="swag">
          <div className="container rewards-grid">
            <h2 className="rewards-word reveal"><span>SWAG</span><em>&</em><span>REWARDS</span></h2>
            <div className="reveal rewards-copy rewards-panel">
              <p className="lead">Fun stuff, without fake promises.</p>
              <p>Official Hacktoberfest event swag and partner rewards may be available, but quantities depend on the allocation received. The website will only promise what is actually locked.</p>
              <div className="reward-chips"><span>EVENT SWAG*</span><span>PROJECT RECOGNITION</span><span>COMMUNITY</span><span>REAL DEMO</span></div>
              <small>*Subject to organizer allocation and on-site availability.</small>
            </div>
          </div>
        </section>

        <section className="section venue-section" id="venue">
          <div className="container venue-grid">
            <div className="venue-map-wrap reveal">
              <DeferredLocationMap location="IET · DDUGU" coordinates="Civil Lines · Gorakhpur · Uttar Pradesh" />
            </div>
            <div className="venue-copy reveal">
              <div className="eyebrow"><Spark size={13} /> WHERE WE BUILD</div>
              <h2>The campus becomes the hackspace.</h2>
              <h3>{EVENT.venue}</h3>
              <p>{EVENT.address}</p>
              <p className="venue-fine">Final room, reporting time, entry-gate instructions, and capacity will appear here before registration opens.</p>
              <Button href={EVENT.mapsUrl} variant="cream">Open in Maps <span className="button-icon"><Arrow direction="up-right" /></span></Button>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-heading reveal">
              <div className="eyebrow"><Spark size={13} /> BEFORE YOU DM THE ORGANIZER</div>
              <h2>Questions,<br />answered.</h2>
              <p>If something important is missing here, that probably means we have not locked it yet.</p>
            </div>
            <div className="faq-list reveal">
              {FAQS.map(([q, a], i) => {
                const questionId = `faq-question-${i}`;
                const answerId = `faq-answer-${i}`;
                return (
                  <div className={`faq-item interactive-accordion${openFaq === i ? " open" : ""}`} key={q}>
                    <button id={questionId} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={answerId}>
                      <span>{String(i + 1).padStart(2, "0")}</span><strong>{q}</strong><i aria-hidden="true">{openFaq === i ? "−" : "+"}</i>
                    </button>
                    <div id={answerId} className="faq-answer" hidden={openFaq !== i} role="region" aria-labelledby={questionId}><p>{a}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section register-section" id="register">
          <div className="register-stars" aria-hidden="true"><Spark size={28} /><Spark size={15} /><Spark size={20} /></div>
          <div className="container register-inner reveal">
            <p className="hero-kicker">Your first contribution can start here</p>
            <h2>Hacktoberfest<br /><em>Hack Day × DDUGU</em></h2>
            <p>{EVENT.date} · {EVENT.dateDetail}<br />{EVENT.venue}</p>
            <RegistrationButton status />
            {!EVENT.registrationUrl && <small>The host/registration link will be added here as soon as it is confirmed.</small>}
          </div>
        </section>
      </main>

      <div className="ticker" role="region" aria-label="Event highlights" data-paused={tickerPaused}>
        <span className="sr-only">{TICKER.join(" · ")}</span>
        <div className="ticker-track" aria-hidden="true">{[...TICKER, ...TICKER].map((item, i) => <span key={`${item}-${i}`} data-copy={i >= TICKER.length}>{item}<Spark size={11} /></span>)}</div>
        <button className="ticker-control" onClick={() => setTickerPaused(value => !value)} aria-pressed={tickerPaused}>{tickerPaused ? "Resume highlights" : "Pause highlights"}</button>
      </div>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand"><BrandMark /><div><strong>Hacktoberfest × DDUGU</strong><span>Build open. Learn together. Ship something real.</span></div></div>
          <div className="footer-links"><a href="#about">About</a><a href="#schedule">Schedule</a><a href="#venue">Venue</a><a href="#faq">FAQ</a></div>
          <p>Organized locally by {EVENT.organizer}. Hacktoberfest is a registered trademark of DigitalOcean. Event details remain subject to official confirmation and applicable organizer guidelines.</p>
        </div>
      </footer>

      <button className={`top-button${showTop ? " show" : ""}`} tabIndex={showTop ? 0 : -1} aria-hidden={!showTop} onClick={() => { document.getElementById("main-content")?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" }); }} aria-label="Back to top"><Arrow direction="down" /></button>
    </div>
  );
}

export default App;
