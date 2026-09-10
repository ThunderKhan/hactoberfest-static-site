# High-end visual design audit

Reviewed 10 September 2026. Baseline: `d293b58d74d62e7fa2773e97d70cca935cd0f40e`.

## Verdict

The site has a recognizable identity: an atmospheric flower-valley hero, warm gold, editorial display type, and campus-specific copy. It does not need a replacement theme. The main weaknesses are accumulated CSS overrides, excessive ambient motion, and incomplete interaction states. Repeated glows and animated shadows make an otherwise distinctive composition feel overprocessed.

This is a review against the requested high-end-visual-design skill and the repository's Midnight Commons brief. The installed audit skill's required `/impeccable` dependency was unavailable; its complete workflow was not run. Its report categories are used here as a practical rubric, not a certification. The explicitly selected skill takes priority where its control styling differs from the existing brief. The editorial reading layouts remain intact; this pass does not wrap every paragraph or schedule row in nested cards.

## Health score

Scores are reviewer judgments, not Lighthouse scores or a WCAG conformance claim. Baseline scores come from the pinned source; revised scores include local Chromium checks.

| Dimension | Baseline /4 | Revised /4 | Finding |
| --- | --- | --- | --- |
| Accessibility | 2 | 3 | FAQ state, hidden control focus, menu behavior, motion controls improved; full assistive-technology review remains |
| Performance | 2 | 3 | Removed map dimension animation and repeated shadow animation; deferred map still carries a sizable motion chunk |
| Responsive design | 3 | 4 | Six viewport widths checked; mobile overlay, touch controls, fluid headings |
| Theming | 2 | 2 | Useful tokens exist, but many literal colors and historical overrides remain |
| Visual anti-patterns | 2 | 3 | Quieter glow, consistent pill controls, inset arrow circles, restrained surface depth |
| **Total** | **11/20** | **15/20** | **Significant work needed → Good, with remaining weaknesses** |

The site intentionally offers one dark theme. Absence of a light-mode toggle is not a defect.

## Findings and resolution

Original line numbers below refer to the baseline commit, not the amended branch.

### P1 — Collapsed FAQ answers remain exposed

- Location: `src/App.tsx:447`; `src/styles/03-schedule-venue.css:86`.
- Category: Accessibility.
- Impact: CSS grid clipping hides text visually but leaves the answer available to screen-reader navigation, contradicting the disclosure state.
- Standard: WCAG 1.3.1 / 4.1.2 state consistency.
- Resolution: Native `hidden` state follows the expanded question. The visible answer uses a short opacity/transform entrance instead of animated grid tracks.
- Suggested action: `/harden`.

### P1 — Invisible back-to-top button remains keyboard-focusable

- Location: `src/App.tsx:475`; `src/styles/04-faq-responsive.css` `.top-button`.
- Category: Accessibility.
- Impact: Keyboard users can focus a control whose opacity is zero. The click handler also explicitly requests smooth scrolling under reduced motion.
- Standard: WCAG 2.4.7; reduced-motion behavior is an additional usability requirement.
- Resolution: Hidden state removes the control from sequential focus and accessibility exposure. Activation returns focus to main content and respects reduced motion. An intersection sentinel replaces the scroll listener.
- Suggested action: `/harden`.

### P1 — Auto-running marquee has no persistent keyboard/touch pause

- Location: `src/styles/06-premium-ticker.css:54,84`; `src/App.tsx:250`.
- Category: Accessibility.
- Impact: Hover-only pausing does not let keyboard or touch users independently stop the moving content.
- Standard: WCAG 2.2.2.
- Resolution: Retained the bottom marquee, added a persistent toggle with `aria-pressed`, and made reduced-motion highlights static and wrapping. Moved the ticker DOM after main content to match its visual reading order.
- Suggested action: `/harden`.

### P2 — Mobile navigation lacks an Escape dismissal path

- Location: `src/App.tsx:276–287`; `src/styles/06-navbar-glass.css` mobile menu rules.
- Category: Accessibility / Responsive design.
- Impact: Users must find the toggle again to dismiss the old menu. The requested larger menu requires robust focus containment and scroll handling.
- Resolution: Native modal dialog supplies focus containment, Escape, and opener focus restoration. Section selection moves focus to the destination; resizing to desktop closes the menu and releases body scrolling.
- Suggested action: `/adapt`.

### P2 — Decorative map is presented as navigational geography

- Location: `src/components/LocationMap.tsx:175,210`.
- Category: Content clarity.
- Impact: Synthetic roads labelled “CAMPUS ROUTE” can be mistaken for real entry directions.
- Resolution: Explicit “Campus illustration” and “Illustrative route” labels, accessible explanation, persistent details hint. The existing external Maps action remains the source for directions.
- Suggested action: `/clarify`.

### P2 — Map animation triggers layout and paint

- Location: `src/components/LocationMap.tsx:85–86,196`.
- Category: Performance.
- Impact: Animating dimensions repeatedly recalculates layout; filter and SVG stroke drawing also require painting. This is a code-level risk, not a measured frame-rate claim.
- Resolution: Stable responsive map dimensions; detail reveal uses opacity/transform, roads fade in, animated icon filter removed. Tilt is restricted to fine pointers with hover.
- Suggested action: `/optimize`.

### P2 — Hero layers repeatedly animate shadows and blur

- Location: `src/styles/15-hero-gold-glow.css:21–47`; `src/styles/16-opening-sequence.css` title keyframes; `src/styles/07-cinematic-theme.css:22,315`.
- Category: Performance / Visual anti-patterns.
- Impact: Multiple competing pulses reduce text stability and increase paint work. Scrolling badges also use backdrop blur.
- Resolution: Hero ambience runs briefly and settles; animated text/box shadows and title clipping removed. Blur is reserved for navigation and its modal overlay. Reduced motion disables decorative CSS animation and transitions.
- Suggested action: `/quieter`, `/optimize`.

### P2 — Registration section links back to itself

- Location: `src/App.tsx:62–69,461`.
- Category: Interaction clarity.
- Impact: The final registration control looks actionable but points to its own section while the registration URL is empty.
- Resolution: The final section displays a status until a real URL exists. Hero/nav links still take users to that explanation. Existing event dates, venue and unconfirmed rewards were preserved.
- Suggested action: `/clarify`.

### P2 — Theme decisions are spread across many override layers

- Location: `src/styles.css`; `src/styles/07-cinematic-theme.css`; `src/styles/14-production-system.css`.
- Category: Theming.
- Impact: Multiple rules for the same components make future changes difficult to predict. Numerous literal colors remain alongside tokens.
- Resolution: Partially addressed with shared motion and layer tokens and edits in owning files. Full cascade/token consolidation remains future work; doing it here would broaden regression risk substantially.
- Suggested action: `/normalize`.

### P3 — Controls and surface treatment diverge from the selected skill

- Location: `src/styles/01-base.css` buttons; `src/styles/06-navbar-glass.css` nav CTA; `src/App.tsx` arrow placements.
- Category: Visual anti-patterns.
- Impact: Rectangular CTAs and uncontained arrows do not meet the selected skill's tactile control vocabulary.
- Resolution: Pill buttons, inset icon circles, press feedback, lighter arrow strokes, floating pill nav, custom easing, and quieter inset surface highlights. Existing Fraunces / DM Sans / DM Mono identity retained; Inter fallback removed.
- Suggested action: `/polish`.

### P2 — Rewards heading is clipped on narrow screens

- Location: `src/styles/04-faq-responsive.css`, mobile `.rewards-word` rule.
- Category: Responsive design.
- Impact: The fixed 70px heading exceeds the reading width; global overflow clipping hides the end of “REWARDS” without creating a document scrollbar.
- Resolution: Responsive heading sizing and a wrapping guard. Discovered in the below-fold screenshot review, beyond the document-overflow check.
- Suggested action: `/adapt`.

Counts: **0 P0, 3 P1, 7 P2, 1 P3**. Ten findings addressed; theme consolidation remains partially addressed.

## Positive findings

- Strong, documented visual identity and a canonical WebP hero with preload.
- Deferred map loading already separates the motion library from the initial bundle.
- Useful semantic sections, skip link, FAQ relationships and visible focus rules already exist.
- Animated terminal output already has a complete static assistive-technology alternative.
- Event facts correctly distinguish draft timings and unconfirmed registration/rewards.
- Editorial asymmetry gives the lower page a better rhythm than repeated equal-sized feature grids.

## Verification

- `npm run check`: TypeScript and production Vite build.
- Local Chromium widths: 320, 390, 768, 860, 1024 and 1440 CSS pixels. No document or navigation horizontal overflow in those checks.
- Browser interaction checks: mobile menu open, Escape dismissal and opener focus; menu destination focus; FAQ opening and closing; reduced-motion back-to-top behavior; persistent ticker pause; modal background focus exclusion and closing on desktop resize.
- Viewport screenshots reviewed for desktop hero, mobile hero, mobile menu and below-fold sections.
- No application page errors during the interaction checks.
- Axe-core with WCAG 2 A/AA and 2.1 AA tags reported no violations in the tested desktop state. Automated results do not establish full conformance.
- Google-hosted fonts were not available in the initial screenshot environment, so those screenshots verify the fallback typography. Production font loading and a physical iOS/Android check remain release checks.
- This is not an exhaustive contrast audit, screen-reader certification, real-device frame-rate measurement, or a full review of event logistics.

## Remaining actions

1. `/normalize` — Consolidate historical theme overrides and replace remaining repeated colors with semantic tokens.
2. `/audit` — Recheck the production deployment with its actual fonts and assistive technology; the complete audit workflow requires its missing dependency.
3. `/polish` — Final visual check with loaded production fonts and real mobile devices.

These remaining passes can run individually or together. Re-run the audit after them to update the score.
