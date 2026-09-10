---
name: Hacktoberfest Hack Day × DDUGU
description: A cinematic editorial event site for a campus open-source build day.
colors:
  night: "#07080d"
  panel: "#0d1018"
  panel-raised: "#111622"
  ink: "#101526"
  cream: "#fff7e6"
  cream-muted: "rgba(255, 247, 230, .66)"
  gold: "#f0c641"
  hacktober-yellow: "#ffd529"
  navy: "#1017aa"
  navy-deep: "#080d2e"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.5rem, 7.2vw, 6.5rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 5vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(15px, 1.02vw, 17px)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.10em"
rounded:
  control: "10px"
  glass-nav: "24px"
  map: "26px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "28px"
  xl: "48px"
  section: "110px"
components:
  button-primary:
    backgroundColor: "{colors.hacktober-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  button-ghost:
    backgroundColor: "rgba(7, 9, 18, .64)"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  event-pill:
    backgroundColor: "rgba(6, 8, 19, .52)"
    textColor: "{colors.hacktober-yellow}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Hacktoberfest Hack Day × DDUGU

## Overview

**Creative North Star: “Midnight Commons”**

The site should feel like an open-source gathering discovered after dark on a university campus: cinematic enough to create anticipation, editorial enough to feel authored, and technical enough to belong to builders. The flower-valley hero is the emotional anchor. Everything after it should become calmer and more legible rather than trying to out-perform the first viewport.

The system combines warm cream typography, restrained Hacktoberfest gold, near-black navy surfaces, Fraunces editorial display type, and small monospace labels. The visual world is premium but not corporate. It should feel made by a student developer community with unusually strong taste, not by a generic conference template.

**Key Characteristics:**
- Cinematic photographic hero; quiet dark surfaces below it.
- Fraunces carries identity; DM Sans carries reading; DM Mono is reserved for technical metadata.
- Gold is an accent, not a background default.
- Motion has hierarchy: hero and map may be expressive; informational content remains stable.
- Strong open-source and campus-specific copy; no invented sponsor, prize, or swag claims.
- Editorial layouts are preferred over repeating card grids.

## Colors

The palette is a warm night scene: near-black navy provides atmosphere, cream provides readable contrast, and gold provides scarce emphasis.

### Primary
- **Hacktober Gold** (`#f0c641`): section labels, location cues, focus rings, key typographic emphasis, and small moments of delight.
- **Hacktober Yellow** (`#ffd529`): primary registration CTA and high-confidence action emphasis.

### Neutral
- **Midnight** (`#07080d`): primary page background.
- **Night Panel** (`#0d1018`): elevated dark surfaces.
- **Raised Night** (`#111622`): hover/state variation, never a default card factory.
- **Warm Cream** (`#fff7e6`): primary text and selected light controls.
- **Muted Cream** (`rgba(255, 247, 230, .66)`): secondary body copy on dark surfaces.
- **Ink** (`#101526`): dark text on yellow/cream controls.

### Named Rules

**The Gold Rarity Rule.** Gold identifies importance. Do not turn entire ordinary sections into yellow surfaces merely because yellow is the brand accent.

**The Hero Owns Saturation Rule.** The photographic hero may contain the richest color and texture. Content sections below it become progressively quieter.

## Typography

**Display Font:** Fraunces (Georgia fallback)  
**Body Font:** DM Sans (system fallback)
**Label/Mono Font:** DM Mono (system monospace fallback)

**Character:** Fraunces gives the event a literary/editorial confidence that contrasts deliberately with small technical monospace labels. DM Sans keeps long copy contemporary and easy to scan.

### Hierarchy
- **Display** (500, fluid up to the hero scale, ~0.9 line-height): hero title and final registration statement only.
- **Headline** (500, fluid, ~0.98 line-height): section-leading editorial statements.
- **Card/Item Title** (500, 23–34px depending on context): build paths, schedule items, FAQ questions.
- **Body** (400, 15–18px, 1.55–1.7 line-height): explanatory copy, ideally kept near 65–75 characters per line.
- **Label** (500–600, 10–13px, tracked uppercase): times, categories, metadata, terminal chrome, map districts.

### Named Rules

**The Mono Means Metadata Rule.** DM Mono is for code, timestamps, route labels, status, and compact metadata. Do not use monospace as a generic “developer aesthetic” costume for paragraphs.

**The Display Is Earned Rule.** Oversized Fraunces is reserved for the few statements that define a section. Routine content should not compete with the hero.

## Layout

The desktop system uses a centered container around `1240px` with generous horizontal margins. Large sections commonly use asymmetric two-column editorial layouts; grids are used where the content is genuinely parallel, such as build lanes and event facts.

Spacing should create groups, not uniform gaps. Section headings receive more space above their next content block than labels receive above headings. Desktop sections can breathe around `110px` vertically; tablet and mobile reduce this substantially.

Responsive behavior is content-driven:
- Large desktop: full editorial two-column compositions.
- Tablet: two-column build lanes; editorial/schedule/toolkit/venue layouts progressively collapse.
- Mobile: primary layouts become single-column; event facts may become two columns, then one column on very narrow screens.
- Hero title is fluid and must never require horizontal clipping to fit.
- Touch targets are at least 44px on coarse pointers.

## Elevation & Depth

Depth is atmospheric rather than card-heavy. The floating navigation uses a restrained navy glass material because it literally sits over changing hero/background content. The campus map earns stronger depth because it is an interactive signature object. Ordinary reading surfaces should stay mostly flat.

### Shadow Vocabulary
- **Nav Ambient:** soft black shadow plus subtle inner highlight; supports the glass material without becoming a glowing pill.
- **Map Depth:** wide soft shadow around the interactive map; it is the main tactile object below the hero.
- **Control Lift:** short, soft shadow only for primary actions where physicality improves affordance.

**The Flat-By-Default Rule.** Informational panels do not lift merely because the pointer passes over them. Motion and depth indicate action or meaningful state.

## Shapes

Controls use compact 10px corners. The floating nav and campus map are allowed larger radii because they are signature surfaces. Pills are reserved for metadata chips and compact statuses, not general containers.

Borders are thin and low-contrast on dark surfaces. Dashed circular borders may appear as an editorial stamp, but they should remain rare. Avoid thick side-accent borders and generic nested rounded cards.

## Components

### Buttons
- **Shape:** compact rounded rectangle (`10px`).
- **Primary:** Hacktober yellow with dark ink text; strongest CTA in a region.
- **Ghost:** dark translucent surface with cream border/text when placed on the photographic hero.
- **Hover / Focus:** small arrow movement or color/border response; no large bounce. Keyboard focus uses a visible gold outline.
- **Touch:** minimum 44px target.

### Event Pills
- Dark translucent navy, thin gold border, uppercase DM Mono.
- Pills communicate event metadata only; they are not decorative tags to sprinkle across every section.

### Build Lanes
- Four parallel informational lanes inside one shared grid.
- Stable reading plane. Hover may gently change border/surface tone, but no 3D tilt or button-like press state.

### Schedule
- Time + timeline + content composition.
- Timeline geometry must align precisely through each marker.
- Schedule cards remain still; the timeline is information, not a collection of clickable tiles.

### Terminal
- Real typewriter animation may run once as the section enters view.
- The animated stream is hidden from assistive technology; screen readers receive the complete static text once.
- Reduced-motion users receive the complete text immediately.

### Navigation
- Fixed floating navy glass capsule.
- It should visually recede into the hero rather than compete with it.
- Desktop uses inline links; mobile uses a menu control with explicit expanded state.

### Campus Map
- Signature interactive component.
- Mouse movement may create restrained 3D tilt on fine pointers.
- Click/Enter/Space expands the map.
- Reduced-motion mode removes spatial tilt and line-drawing choreography while preserving expansion state and visual feedback.

## Do's and Don'ts

### Do:
- **Do** let the photographic hero be the strongest visual moment.
- **Do** use gold sparingly to guide attention and focus.
- **Do** use editorial asymmetry and whitespace instead of inventing more cards.
- **Do** keep factual event information sourced from confirmed organizer details.
- **Do** preserve strong keyboard focus and reduced-motion alternatives.
- **Do** keep below-fold interaction purposeful: controls and the map are tactile; reading surfaces are calm.
- **Do** test the hero and schedule at narrow widths instead of masking overflow globally.

### Don't:
- **Don't** reintroduce a top marquee; the ticker belongs near the end of the experience.
- **Don't** add decorative corner slogans to the hero.
- **Don't** imply this is a 24-hour event; the schedule is a campus working-day event.
- **Don't** promise guaranteed swag, prizes, approval, or registration before they are confirmed.
- **Don't** wrap every section in a card or apply the same tilt interaction everywhere.
- **Don't** use hard offset shadows as the default depth language.
- **Don't** let the floating navigation become more visually dominant than the hero.
- **Don't** use gray text on saturated surfaces; use tinted cream or transparency derived from the foreground.


## September 2026 high-end control refinement

The high-end audit pass updates controls to rounded pills with a separate trailing icon circle, a small press response and a shared custom timing curve. Floating navigation uses the same pill geometry; mobile navigation expands into a native modal dialog with focus containment and Escape dismissal. Signature surfaces use quiet inset highlights, while the editorial reading layouts remain stable.

Hero ambience now settles after a short entrance. The bottom marquee keeps its motion with a persistent pause toggle and a static reduced-motion layout. The campus illustration reveals detail within fixed responsive dimensions and is explicitly labelled as illustrative rather than geographic guidance. The final registration section shows a status when no registration URL is configured.

This refinement supersedes the earlier 10px CTA rule. Further token/cascade consolidation is tracked in `docs/visual-audit.md`.
