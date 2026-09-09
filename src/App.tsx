import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { EVENT, FAQS, PATHS, SCHEDULE, TICKER, TOOLKIT } from "./event";
import { LocationMap } from "./components/LocationMap";

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
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function RegistrationButton({ nav = false }: { nav?: boolean }) {
  const enabled = Boolean(EVENT.registrationUrl);
  return (
    <Button href={enabled ? EVENT.registrationUrl : "#register"} variant="yellow">
      {enabled ? "Register now" : nav ? "Register soon" : "Registration coming soon"}
      <Arrow />
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTop, setShowTop] = useState(false);

  const doubledTicker = useMemo(() => [...TICKER, ...TICKER], []);

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
    const onScroll = () => setShowTop(window.scrollY > 750);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-shell">
      <div className="ticker" aria-label="Event highlights">
        <div className="ticker-track">
          {doubledTicker.map((item, i) => (
            <span key={`${item}-${i}`}>{item}<Spark size={11} /></span>
          ))}
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Hacktoberfest DDUGU home">
            <BrandMark />
            <span className="brand-text"><strong>Hacktoberfest</strong><small>DDUGU</small></span>
          </a>

          <div className="desktop-links">
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#paths">Build paths</a>
            <a href="#venue">Venue</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <div className="desktop-register"><RegistrationButton nav /></div>
            <button className={`menu-button${menuOpen ? " active" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              <span /><span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {["about", "schedule", "paths", "venue", "faq", "register"].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{id === "paths" ? "Build paths" : id[0].toUpperCase() + id.slice(1)}</a>
          ))}
        </div>
      </nav>

      <main>
        <section className="hero" id="top">
          <HeroLandscape />
          <div className="hero-content container">
            <div className="hero-pills reveal visible">
              <span>IN PERSON</span><span>DDUGU</span><span>OCTOBER 2026</span>
            </div>
            <p className="hero-kicker reveal visible">Open source starts here <i /></p>
            <h1 className="hero-title reveal visible">
              <span>Hacktoberfest</span>
              <em>Hack Day × DDUGU</em>
            </h1>
            <p className="hero-copy reveal visible">
              A campus day for building, learning, and contributing together. Meet fellow builders, work on real projects, and leave with something you can keep shipping.
            </p>
            <div className="hero-actions reveal visible">
              <RegistrationButton />
              <Button href="#schedule" variant="ghost">Explore schedule <Arrow direction="down" /></Button>
            </div>
          </div>
          <div className="hero-bottom-note left-note" aria-hidden="true">OPEN<br />SOURCE<br />LIVES HERE</div>
          <div className="hero-bottom-note right-note" aria-hidden="true">DDUGU ×<br />GLOBAL<br />IMPACT →</div>
        </section>

        <section className="fact-strip">
          <div className="container fact-grid reveal">
            <div><small>FORMAT</small><strong>IN PERSON</strong><span>Campus build day</span></div>
            <div><small>WHEN</small><strong>OCT 2026</strong><span>Exact date TBA</span></div>
            <div><small>WHO</small><strong>ALL LEVELS</strong><span>First-timers welcome</span></div>
            <div><small>WHERE</small><strong>DDUGU</strong><span>Gorakhpur, UP</span></div>
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

          <div className="container manifesto reveal">
            <div className="manifesto-number">01</div>
            <div className="manifesto-text">
              <small>THE BRIEF</small>
              <p>Build something <em>open enough to learn from</em> and useful enough that somebody else would want to try it.</p>
            </div>
            <div className="manifesto-badge">BUILD<br />IN PUBLIC</div>
          </div>
        </section>

        <section className="section blue-section" id="paths">
          <div className="container">
            <SectionHead light eyebrow="CHOOSE YOUR LANE" title="Four ways to have a good Hack Day." copy="You do not have to fit a single hackathon stereotype. Pick the lane that gives you the most learning per hour." />
            <div className="path-grid">
              {PATHS.map((path, i) => (
                <article className="path-card reveal" style={{ "--delay": `${i * 70}ms` } as CSSProperties} key={path.index}>
                  <div className="path-top"><span>{path.index}</span><b>{path.tag}</b></div>
                  <h3>{path.title}</h3>
                  <p>{path.copy}</p>
                  <div className="path-arrow"><Arrow direction="up-right" /></div>
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
              <div className="schedule-stamp">24-ish<br /><span>HUMAN HOURS</span></div>
            </div>
            <div className="timeline">
              {SCHEDULE.map((item, i) => (
                <article className="timeline-row reveal" style={{ "--delay": `${i * 55}ms` } as CSSProperties} key={item.time + item.title}>
                  <time>{item.time}</time>
                  <div className="timeline-dot" />
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
            <div className="toolkit-console reveal" aria-label="Open source starter checklist">
              <div className="console-bar"><span /><span /><span /><b>starter-kit.md</b></div>
              <pre>{`# before you arrive\n\n$ git --version\n$ github-account: ready\n$ laptop-charge: 100%\n$ curiosity: required\n\n# during the day\n- ask questions early\n- commit often\n- document decisions\n- help somebody else\n- ship before polishing\n\n> open source is a conversation.`}</pre>
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
            <div className="rewards-word reveal"><span>SWAG</span><em>&</em><span>REWARDS</span></div>
            <div className="rewards-copy reveal">
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
              <LocationMap location="IET · DDUGU" coordinates="Civil Lines · Gorakhpur · Uttar Pradesh" />
            </div>
            <div className="venue-copy reveal">
              <div className="eyebrow"><Spark size={13} /> WHERE WE BUILD</div>
              <h2>The campus becomes the hackspace.</h2>
              <h3>{EVENT.venue}</h3>
              <p>{EVENT.address}</p>
              <p className="venue-fine">Final room, reporting time, entry-gate instructions, and capacity will appear here before registration opens.</p>
              <Button href={EVENT.mapsUrl} variant="cream">Open in Maps <Arrow direction="up-right" /></Button>
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
              {FAQS.map(([q, a], i) => (
                <div className={`faq-item${openFaq === i ? " open" : ""}`} key={q}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    <span>{String(i + 1).padStart(2, "0")}</span><strong>{q}</strong><i>{openFaq === i ? "−" : "+"}</i>
                  </button>
                  <div className="faq-answer"><p>{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section register-section" id="register">
          <div className="register-stars" aria-hidden="true"><Spark size={28} /><Spark size={15} /><Spark size={20} /></div>
          <div className="container register-inner reveal">
            <p className="hero-kicker">Your first contribution can start here <i /></p>
            <h2>Hacktoberfest<br /><em>Hack Day × DDUGU</em></h2>
            <p>{EVENT.date} · {EVENT.dateDetail}<br />{EVENT.venue}</p>
            <RegistrationButton />
            {!EVENT.registrationUrl && <small>The host/registration link will be added here as soon as it is confirmed.</small>}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand"><BrandMark /><div><strong>Hacktoberfest × DDUGU</strong><span>Build open. Learn together. Ship something real.</span></div></div>
          <div className="footer-links"><a href="#about">About</a><a href="#schedule">Schedule</a><a href="#venue">Venue</a><a href="#faq">FAQ</a></div>
          <p>Organized locally by {EVENT.organizer}. Hacktoberfest is a registered trademark of DigitalOcean. Event details remain subject to official confirmation and applicable organizer guidelines.</p>
        </div>
      </footer>

      <button className={`top-button${showTop ? " show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><Arrow direction="down" /></button>
    </div>
  );
}

export default App;
