# Factiv Website — Claude Design Brief

**Project:** Factiv one-page marketing website  
**Domain:** factiv.eu  
**Date:** April 2026  
**Prepared for:** Claude Design / Figma handoff

---

## Brand Identity

**Company name:** Factiv  
**Tagline:** Agentic software for serious business  
**Industry:** B2B AI / Software Consultancy  
**Target clients:** German enterprise — insurance, finance, regulated industries  
**Founded:** Germany, 2026  
**Tone:** Precise, confident, no-bullshit. Think Linear meets a German engineering firm.

### Colours
| Role | Hex | Usage |
|---|---|---|
| Primary gold | `#C8882A` | CTAs, accents, hover states, logo wordmark |
| Gold light | `#E8A840` | Hover highlights |
| Charcoal dark | `#181818` | Primary background |
| Charcoal mid | `#222222` | Section alternating backgrounds |
| Charcoal light | `#2E2E2E` | Borders, dividers |
| White | `#F5F5F0` | Primary text |
| White dim | `rgba(245,245,240,0.55)` | Secondary text, subtext |

### Typography
| Role | Font | Weight | Style |
|---|---|---|---|
| Display / headings | Bebas Neue | 400 | All-caps, wide letter-spacing |
| Body | Open Sans | 300 / 400 / 600 | Clean, legible |

### Logo
- Hexagon mark with concentric rings and inner geometry
- Gold mark on dark charcoal background
- FACTIV all-caps wordmark in gold
- Tagline: "AGENTIC SOFTWARE FOR SERIOUS BUSINESS" in small caps below wordmark
- Available: SVG, PNG (transparent), PNG (dark background)

---

## Design Direction

### Aesthetic
**Industrial luxury.** The aesthetic should feel like a premium German engineering consultancy that also happens to understand modern tech design. Think: dark surfaces, precise typography, gold details used sparingly but confidently. Reference companies: Linear, Resend, Railway — but with more gravitas and less Silicon Valley.

### Motion Philosophy
This site should have **significant, purposeful movement**. Not decorative animation for its own sake — movement that communicates precision, intelligence, and activity.

**Required motion elements:**
1. **Particle network background** — slow-moving gold particles connected by faint lines, with drifting hexagonal wireframes. Runs continuously behind all content.
2. **Hero entrance sequence** — staggered fade-up reveals: eyebrow → headline → body → buttons → scroll indicator. Total duration ~1.5s.
3. **Scroll reveals** — elements reveal as they enter viewport: translateY(-28px) → 0, opacity 0 → 1, 750ms ease. Stagger children by 100ms.
4. **Ticker bar** — continuous horizontal scroll of text in gold bar between hero and content.
5. **Counter animation** — numbers count up when metrics section enters viewport.
6. **Hover states** — service items slide right on hover; about cards translate X; nav CTA fills with gold.
7. **Custom cursor** — gold dot with lagging ring on desktop.
8. **Hero hexmark** — SVG hexagon floats gently (translateY loop, subtle rotation), very low opacity.

### Layout Principles
- Left-heavy composition — most headlines align left
- Generous whitespace between sections (120px padding)
- Alternating dark charcoal / charcoal-mid backgrounds for section depth
- Full-bleed gold ticker bar as strong visual separator
- Gold used as single accent colour — never two competing accent colours

---

## Page Structure

### 1. Navigation (fixed)
- Logo left: `FACTIV` in Bebas Neue gold
- Links centre: Services · Process · About · Contact (all-caps, small, tracking)
- CTA right: "Start a Project" ghost button (border gold, fills on hover)
- Transparent → opaque on scroll

### 2. Hero
- Eyebrow: `Germany · Est. 2026`
- Headline: `FACTIV` in massive Bebas Neue — `I` in gold, rest white
- Subheadline: one-sentence pitch in Open Sans Light
- Two CTAs: primary (gold fill) + ghost
- Scroll indicator bottom-left
- Hexagon watermark SVG right side, very low opacity, floating

### 3. Ticker Bar (gold background)
- Continuous scroll: Agentic Apps · AI Automation · Process Intelligence · Enterprise AI · Serious Business · Germany

### 4. What We Do
- Section label: `01 — What We Do`
- Headline: `We Build Agents That Work.`
- Two-column: intro paragraph left, numbered service list right
- Services: Agentic Workflow Automation / AI Integration & Architecture / Custom Agent Development / AI Strategy & Enablement

### 5. Manifesto
- Full-width dark section
- Large Bebas Neue quote in mixed filled/outlined type:
  `Most AI projects produce demos. We produce software.`
- Supporting paragraph

### 6. Metrics (gold background)
- Three counters: `100%` focus on agentic AI / `2` regulated industries / `1` country: Germany

### 7. Process (4 columns)
- Section: `03 — How We Work` / `Focused. Fast. Honest.`
- Four steps with top border lines: Discovery · Architecture · Build & Test · Deploy & Handover

### 8. About
- Section: `04 — About Factiv` / `Built in Germany. Built for Scale.`
- Two-column: copy left, three detail cards right
- Cards: Privacy-First / German Engineering Standards / Domain-Specific Expertise

### 9. Contact
- Centred layout
- Large headline: `LET'S BUILD SOMETHING REAL.`
- Email link: `hello@factiv.eu`
- Footer: copyright + nav links + Impressum / Datenschutz

---

## Technical Constraints

- Single HTML file (all CSS + JS inline) for initial version
- Google Fonts (Bebas Neue + Open Sans) via CDN
- Canvas API for particle background (no external libraries)
- IntersectionObserver for scroll reveals
- No frameworks — vanilla JS + CSS only
- Mobile responsive: single-column below 768px
- German legal requirements: Impressum + Datenschutz links in footer

---

## Copy Reference

**Hero subheadline:**  
"Agentic software for serious business. We build autonomous AI systems that work inside the world's most demanding industries — insurance, finance, and regulated enterprise."

**Manifesto:**  
"Most AI projects produce demos. We produce software. The agentic revolution is real — but it requires engineering discipline, domain knowledge, and a deep understanding of what enterprise systems actually need."

**About paragraph 1:**  
"Factiv was founded in 2026 by developers who spent years building AI products inside fast-moving organisations — and grew frustrated with how slowly the technology was actually reaching the industries that needed it most."

**CTA section:**  
"Have a project in mind? An AI initiative that needs proper engineering behind it? Let's talk — no pitch decks, no NDAs on the first call."

---

## Assets Needed from Looka

Download these from your Looka brand kit and place in `/assets/`:
- `factiv-logo-primary.svg` — full colour on dark
- `factiv-logo-white.svg` — white version
- `factiv-logo-black.svg` — black version  
- `factiv-mark.svg` — hexagon mark only (for favicon)
- `factiv-favicon.png` — 32×32 and 64×64

---

## Future Pages (V2 scope)
- `/case-studies` — project showcases
- `/insights` — technical articles
- `/careers` — when hiring
- `/impressum` + `/datenschutz` — German legal requirements (needed before launch)
