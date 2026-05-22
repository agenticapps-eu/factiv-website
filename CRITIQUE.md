# V4 · Interactive / playful — Critique & merge plan

*Subject:* `design-exploration/V4-Interactive.jsx` + `Wavemark.jsx` + `shared.css`
*Compared against:* `index.html`, `assets/motion.js`, `assets/motion.css`, `de/index.html` on `feat/v4-interactive-merge` (parent: `babf28f`).
*Status:* Critique only. No code merged. Approval gate before any implementation work.

---

## TL;DR

V4 has **one great idea, one good idea, and one regression**. Worth merging, not worth swallowing whole.

- **Great:** the reactive waveform. The live site already owns the 5-bar wavemark — but ships it as a `opacity:.04` decoration behind the hero (`index.html:193-200`). V4 promotes it from wallpaper to instrument. That's the single biggest upgrade in this variant.
- **Good:** the cycling hero word — `THAT SHIPS / RUNS / PAYS`. Three specific claims layered into one sentence, controlled live. Stronger than the current static `agentic software that ships`.
- **Regression:** V4 replaces the scroll-driven outline-fill manifesto with hover-fill. Scroll-driven runs for every visitor unconditionally; hover-fill needs discovery, fires on hover-capable devices only, and is fundamentally less cinematic. Keep the current behaviour.

The recommended merge is a **graft**, not a swap: import the waveform + cycling word + a couple of microcopy moves on top of the existing structure. Everything else V4 strips out (mesh, particles, scramble, magnetic CTAs, ticker, metrics band, /de/ parallel) stays.

---

## 1 · Engaging vs gimmick

### Reactive waveform — engaging
Verdict: **ship it, but redesign it.**

Why it works:
- The bar gradient (bronze → amber → coral → amber, `V4-Interactive.jsx:154-156`) is the **canonical brand glyph colour-mapped** across more bars. The bars literally *are* the logo, spread wide enough to interact with. That's a rare alignment of brand mark + UI.
- The cursor-driven peak — `peak = max(0, 1 - d * 6)` falloff (line 137) plus a coloured `box-shadow` on bars within 8% of the cursor (line 152) — feels like an audio meter or a touched string. Not random jitter.
- Tying the three modes (`ship/runs/pays`) to **buttons inside the waveform card** (lines 196-200) makes the card a control surface, not a decoration. The waveform card is doing two jobs: visual signature *and* nav.

Where it gets gimmicky:
- **24 bars is too many.** The brand glyph is 5 bars (`Wavemark.jsx:18-24`). 24 reads as a generic audio visualizer; 5–7 reads as "we promoted the logo." Match the glyph count or 2× it (10 bars max). Otherwise it stops being the wavemark and becomes a stock equaliser.
- **No motion on idle.** Without cursor input the bars sit in their rest envelope and do nothing. The current site's `floatY` watermark (motion at index.html:79, keyframe at 141) at least *breathes*. Idle bars look broken until you discover the hover. Solution: a slow base-envelope drift, ~6 second loop, very low amplitude — gated behind `prefers-reduced-motion`.
- **`transition: height 180ms cubic-bezier(.34,1.56,.64,1)`** on every bar means every cursor move springs 24 elements. On a low-end device this will jank. A `requestAnimationFrame` loop with direct style mutation is cheaper and gives finer control.

### Cycling word — engaging
Verdict: **ship it.**

Why it works:
- Three claims in one slot: *agentic software that **SHIPS** / **RUNS** / **PAYS***. The current hero settles for the weakest of these ("that ships"). V4 doesn't pick — it lets the visitor cycle through all three.
- The sub-paragraph swaps in sync (`V4-Interactive.jsx:171-175`): "AI that actually **ships** / **runs in your stack** / **gets paid for**". This makes the cycling word feel load-bearing, not decorative.
- Two affordances: click the blank in the H1, or click one of the three pills under the waveform. The pills teach the interaction; the blank lets a returning visitor cycle without scanning down.

Where it gets gimmicky:
- The dashed `2px dashed` border on the blank (line 50) screams "fill-in-the-blank" school worksheet. Brand is bronze/amber, restrained. The dash treatment fights it. A solid hair-line or no border + amber underline reads more grown-up.
- The `transform: rotate(-1.5deg)` on hover (line 60) is **too much**. Tilt this severe on a 132px Bebas heading is jokey. Drop to -0.4° or remove the rotate; the colour change + background fade is enough.
- No keyboard handler. The blank is a `<span onClick>` — not focusable, not enterable. Same for the pills (`<button>` is fine, but the click target on the blank needs `role="button" tabindex="0"` plus an Enter/Space handler in the vanilla port).

### Per-chip tilt — borderline
- Each chip rotates -0.6° / +0.6° / +0.4° / -0.4° on hover (lines 100-103). Per-card alternation reads intentional, not bug. Keep it — but the current site's "indent on hover" (`.svc:hover{padding-left:14px}`, `index.html:92`) is *also* the right move and they're not the same gesture.
- Decision: tilt fits the playful variant tone; on the merged page, the current indent is more grown-up. **Keep current indent, skip the tilt.** If we want a touch of V4 playfulness here, swap to a per-chip amber accent stripe on the left that animates in on hover.

### Hover-fill manifesto — gimmick *(regression)*
- V4: hover `demos.` and `software.` to fill from gold-outline to gold-solid, with a `↩` indicator (lines 119-126).
- Current site: `animation-timeline: view()` scroll-driven outline → gold fill, fires automatically as the manifesto enters viewport (`motion.css:42-47`).
- The scroll-driven version is **strictly better**: it runs for every visitor (mouse, touch, keyboard, screen-reader-with-reduce-motion-off, anyone scrolling), it's silent until it triggers, and the moment of fill lands as a payoff for reading the line — not as a hover reward for poking the page. Hover-fill on a manifesto is also a strange affordance ("hover to commit" reads as instruction, not delight).
- **Reject the V4 manifesto treatment. Keep current behaviour.** Optionally borrow the `↩` glyph as a subtle visual after the fill completes, but I'd skip it — it draws attention to the mechanic rather than the words.

---

## 2 · What V4 loses vs the current site

Marked **(load-bearing)** = the merge must not drop this. **(optional)** = could go either way.

| Asset | Status | Notes |
|---|---|---|
| WebGL fbm-noise mesh (`bg-gl`, `motion.js:13-123`) | **load-bearing** | The plasma gold/coral mesh is the most distinctive visual moment on the live site. V4 replaces with two soft radial glows + a dot grid. That's a downgrade from "studio with a signature" to "Linear template." Keep the mesh. |
| Particle/connected-dots canvas (`bg-canvas`, `index.html:308-353`) | **load-bearing** | Pairs with the mesh — 55 floating particles with proximity-line connections + 5 drifting ghost waveforms. Together they're the visual *fingerprint*. V4 has nothing like it. |
| Scramble wordmark (`motion.js:126-180`) | **load-bearing** | The FACTIV title decoding from random glyphs is the first thing a visitor sees move. V4 has no FACTIV hero wordmark at all — just "AGENTIC SOFTWARE THAT __". The scramble carries the brand name. Keep it. |
| Scroll-driven manifesto fill (`motion.css:42-47`) | **load-bearing** | Covered above. The merge keeps this; V4's hover-fill is a regression. |
| Magnetic CTAs (`motion.js:183-203`) | **load-bearing** | The hero buttons drift ~10px toward the cursor. V4 has `transform: translateY(-2px)` on hover — same idea, dumber. Keep magnetic. |
| Section-label digit-flip (`motion.js:206-236`) | optional | Labels animate `-05 → 01` as they enter view. V4 just has `01 — What we build · poke any`. Honestly the flip is more clever than necessary. Could drop without loss; recommend keeping since it ties to the motion vocabulary. |
| Section alternation `--bg` ↔ `--bg-mid` (`index.html:86,96,106,113,122`) | **load-bearing** | The current page has a six-section rhythm with alternating dark/mid backgrounds. V4 is one flat `#0f0d0a` end to end. The alternation is what makes the page feel built; without it the variant reads as a one-pager prototype. Keep. |
| Ticker band (`index.html:211-216`) | **load-bearing** | Gold-gradient band between hero and #what with "Agentic Apps · AI Automation · Process Intelligence · EU Data Plane · A Studio of Two · Germany". This is also the EN/DE keyword indexable surface (each token shows in DOM, scrolling). V4 has no equivalent. Keep. |
| Metrics band with counters (`index.html:239-247`) | **flag — see below** | Bronze→amber→coral gradient full-bleed with 3 animating counters. V4 drops it entirely. **This is the only full-bleed warm-palette moment on the page** — losing it leaves the merged page on a cool palette throughout. Open question for you. See §6. |
| Custom cursor (dot + ring, `index.html:294-299`) | optional | Disabled on mobile + reduced motion. V4 just shows `cursor: crosshair` on the wavebars. The custom cursor adds polish but isn't critical; keep unless we need to cut bytes. |
| Hero wavemark watermark (`index.html:193-200`) | drop | At `opacity:.04` it's invisible. V4 promotes the wavemark into the active waveform. With the V4 waveform in place, the watermark is redundant; the waveform IS the brand mark, no need to also have it behind. **Drop the hero watermark.** |
| Process section (`#process`) | **load-bearing** | V4 doesn't include it. Studio sites need a "how we work" answer — discovery / architecture / build / deploy. Keep. |
| About section (`#about`) | **load-bearing** | Two founders, named, with roles. V4 has a tiny "2 BUILDERS · ACCEPTING" pill in the top bar but no founder copy. Keep. |
| Contact section + footer | **load-bearing** | V4 ends after the manifesto. Page needs `hello@factiv.eu`, imprint, privacy. Keep. |
| `/de/` parallel build | **load-bearing** | V4 is single-language. The DE port (`de/index.html`, `de/impressum.html`, `de/datenschutz.html`) is the studio's positioning ("Germany-based, DSGVO-first"). Cannot drop. Both V4 additions (waveform copy, cycling word) need DE translations — see §5. |

---

## 3 · A11y, motion, performance

V4 has zero `prefers-reduced-motion` handling. That's the biggest single issue.

### Reduced motion
- The wavebar transition (`transition: height 180ms cubic-bezier(.34,1.56,.64,1)`, line 78) fires on every cursor move. Under reduced motion, snap directly to height without spring.
- The dot pulse animation (`@keyframes v4pulse`, line 75) loops 24/7. Under reduced motion, kill the animation; keep the colour.
- Chip tilt (`transform: rotate(-0.6deg)`, line 100): drop the rotate under reduced motion, keep the colour/border change.
- The current site gates everything behind `REDUCED` at the top of `motion.js` and a media query at the bottom of `motion.css`. The port must follow the same pattern.

### Screen readers
- The hero blank cycles between `SHIPS / RUNS / PAYS` and the sub-paragraph swaps in sync. Without `aria-live="polite"` on (at least) the blank, a screen reader user clicking it hears nothing change. Add `aria-live="polite"` to the blank wrapper and to the sub-paragraph's swappable span. The three pills should be `<button>` with `aria-pressed` on the active state.
- The waveform card should be `aria-hidden="true"` — it's a decorative visualization. Anything semantically meaningful (the mode change) belongs on the pills, not on the bars.
- "Hover the waveform. Tap a word. Try it." is **instructional copy aimed at sighted mouse users**. A screen reader reads it and is confused — there's nothing to "hover" or "tap" semantically. Either drop the hint copy, or scope it to `aria-hidden="true"` and rewrite the actual accessible affordance via button labels.

### Keyboard
- The blank in the H1 needs `role="button" tabindex="0"` + Enter/Space handler. Otherwise the only way to cycle from the hero is mouse.
- The three pills as `<button>` is correct (the variant has them as `<button>` already, line 197). Make sure focus rings survive the port — the V4 CSS hides borders by default; we'll need a `:focus-visible` style.
- The chips (`.chip`) are `<div onClick>` in V4 (line 213). If we keep them clickable in the merge, they become `<button>` or `<a>`. If they're decorative (just hover-tilt), keep as `<div>` and don't add the click handler.

### Touch
- Reactive waveform is mousemove-driven. On touch, no cursor exists — the bars sit at rest. Acceptable, but the hint copy ("Hover the waveform") lies on touch. Either:
  - (a) hide the hint on touch via `@media (hover: none)`,
  - (b) wire `touchmove` / `pointermove` so a drag across the bars does the same thing as a hover.
  - Recommend (b) for the merge; it's ~5 lines of vanilla.
- The cycling word's primary affordance — clicking the blank or a pill — works on touch already. Confirm pill `min-height: 44px` after the port for tap-target compliance.

### Performance
- 24 bars × `transition: height 180ms` on every `mousemove` = 24 layout-shifting CSS transitions per frame. **Use `transform: scaleY()` with `transform-origin: bottom` instead.** Same visual, no layout, GPU-composited. Same lesson applies to the box-shadow glow — `will-change: transform, box-shadow` on the bars, applied only while the wavebox has `:hover`, removed on leave.
- The mesh + particle canvas already runs every frame. Adding a 24-bar `requestAnimationFrame` (if we go the JS-driven route) needs to coexist; gate the wave RAF on `wavebox` being in viewport (IntersectionObserver) to skip work when scrolled past.
- Budget check: bundle stays inline-CSS + `assets/motion.js` (~10 KB) + `assets/motion.css` (~3 KB). V4 port should add ~80 lines JS + ~60 lines CSS. Keep under 1 KB additional.

### Tokens / hex
- V4 introduces literal hex throughout (`#0f0d0a`, `#f4ede0`, `#8fb15a`, plus the brand hex `#B89355 / #C7AA79 / #F2AF4C / #F07B49`). The current site uses CSS custom properties (`--bg`, `--gold`, `--coral`, `--gold-dark`, `--gold-lt`) defined in `index.html:42-46`.
- **For touched values only** (the rule from the brief): replace V4's hex with the existing tokens. The five wavebar brand hex stay literal — they're inside the SVG and the bar JS, and the current site already uses them literally there (`index.html:168-172`, `BARS` array at `:323`).
- New colour: `#8fb15a` (the "live" green dot). This doesn't exist in the current palette. Two options: (a) add `--accent-live: #8fb15a` to `:root`, or (b) drop the green and use `--gold` for the live indicator. I'd add the token — the green-dot status idiom is well understood and the colour doesn't fight the palette.
- `tokens.css` / `colors_and_type.css` referenced by `shared.css` don't exist in the repo. The inline `:root` block in `index.html:42-46` is the authoritative source. No refactor needed; the V4 port writes to `index.html`'s `:root`, not external files.

---

## 4 · Two-to-three things V4 does that current doesn't

These are the moves worth borrowing even *separately* from the waveform.

1. **Microcopy that names the interaction.** "Hover the waveform. Tap a word. Try it." (line 167) and "Hover to commit" (line 226) tell visitors the page is interactive. The current site is full of motion that nobody is invited to. A single eyebrow line above the hero or above the manifesto — "the wavemark above is yours to play with" or similar — would surface motion that's currently hidden. Low cost, high payoff.

2. **Status pill in the top bar.** `[● 2 BUILDERS · ACCEPTING]` (line 165). The live green dot + capacity statement does in one chip what the metrics band does in three. Even keeping the metrics band, putting capacity status next to the nav CTA is a strong move — visitors learn within the first viewport that this is a two-person shop with bandwidth, before they scroll. Worth a port.

3. **The dashed amber blank as a control surface.** Even without the *cycling* word, treating one word in the headline as visibly interactive (subtle border, amber, hover state) telegraphs that the page does things. The current hero is type-perfect but silent. A single interactive word in the H1 changes that.

---

## 5 · Recommended merge — 8 bullets

These are **what to ship**, in order. Each bullet is a focused commit. Implementation lands on `feat/v4-interactive-merge` already cut.

1. **Promote the wavemark into a live waveform.** Replace the `opacity:.04` watermark SVG (`index.html:193-200`) with an interactive 7-bar canvas/SVG that defaults to the brand 5-bar shape but spreads with subtle idle drift. Bar colours: the 5-bar brand sequence, repeated/interpolated to 7. Mouse/touch drives a localized peak. Position: still hero-right, but visible (move from `opacity:.04` to `opacity:1`, scale down to ~30vw width). Performance: `transform: scaleY()` not `height`, RAF loop gated on viewport intersection.

2. **Add the cycling hero word.** Headline restructure: `AGENTIC SOFTWARE THAT [SHIPS / RUNS / PAYS]`. The blank is a `<button class="hero-pivot">` with `aria-live="polite"`. Click cycles. The hero sub-paragraph also swaps a single span in sync (`that actually ships / runs in your stack / gets paid for`). Visual treatment: amber underline (not dashed border) + amber colour. Drop the -1.5° rotate. Keep the existing scramble-decode FACTIV wordmark above the new headline — they don't fight.

3. **Wire the waveform card pills as a second affordance.** Three small pills under the waveform — `Ships / Runs / Pays` — with `aria-pressed` reflecting the current mode. Clicking a pill sets the mode; clicking the headline blank also updates the active pill. Single state, two surfaces. Keyboard: pills are real `<button>`s with `:focus-visible` outline in amber.

4. **Add the top-bar status pill.** `[● 2 BUILDERS · ACCEPTING]` between `.nav-links` and `.nav-cta`. Green dot uses a new `--accent-live: #8fb15a` token added to `:root`. Pulse animation gated behind reduced-motion. DE copy: `2 BUILDER · ANNAHMEBEREIT` or similar — needs your sign-off (see open questions).

5. **Add a single hint line above the hero.** Above the eyebrow, a mono-style line: `Hover the wavemark. Click a word. Try it.` (DE: `Über die Welle fahren. Auf ein Wort klicken. Ausprobieren.`) — small, amber, fades in 200ms after page load. Hide on `@media (hover: none)` for touch.

6. **Keep — explicitly — everything V4 strips.** WebGL mesh, particle canvas, ticker, metrics band, scramble wordmark, magnetic CTAs, scroll-driven manifesto fill, section alternation, process/about/contact sections, /de/ parallel, custom cursor, section-label digit-flip. The merge is additive on the existing structure, not a replacement.

7. **Port both additions into `de/index.html`.** Cycling word: `LIEFERT / LÄUFT / ZAHLT SICH` (confirmed). Sub-paragraph swap: needs three short DE clauses to match `that actually ships / runs in your stack / gets paid for` — propose `die wirklich liefert / im Stack läuft / sich rechnet` (the third intentionally echoes the original idiom). Status pill copy: see bullet 4. Hint line: see bullet 5.

8. **Reduced-motion + a11y pass on the new code, end to end.** New CSS goes behind `@media (prefers-reduced-motion: reduce)` for any animation/transition. Waveform bars snap to rest under reduced motion (no spring, no idle drift). Pills are real `<button>`. The cycling blank is a real `<button>` with `aria-live="polite"`. Waveform container is `aria-hidden="true"`. Touch-drag on the bars mirrors hover behaviour. Confirm no regression in the existing reduced-motion paths (mesh hidden, scramble skipped, magnetic disabled, scroll-driven fill snapped).

Each bullet is small enough for an independent commit and small enough to revert if it doesn't land. Suggested commit titles:

```
feat: promote wavemark to interactive waveform in hero
feat: cycling hero pivot (SHIPS/RUNS/PAYS) with synced sub
feat: waveform mode pills as second affordance
feat: top-bar status pill (2 builders · accepting)
feat: hero hint line above eyebrow
i18n: DE port of waveform + cycling word + pill + hint
a11y: reduced-motion + aria-live + touch on new interactions
```

(Six commits; bullet 6 is a no-op — it's a guardrail for the implementer, not work.)

---

## 6 · Open questions for you before I cut commit 1

1. **Metrics band.** V4 drops it. The current band (bronze→amber→coral gradient with 3 counters: `2` founders, `3` verticals, `24/7` uptime) is the only full-bleed warm-palette moment on the page. Three options:
   - (a) Keep it as-is. Loses none of the current page; merge is purely additive.
   - (b) Drop it and re-anchor the warm palette elsewhere — e.g. behind the contact CTA, full-bleed.
   - (c) Drop and don't replace. Site stays cool-palette throughout, accepts the loss.
   My vote: **(a)**. The waveform brings warmth in the hero; the metrics band brings warmth lower down; the gradient diversity is part of the studio's brand vocabulary.

2. **Wavemark on touch devices.** The waveform card is the centrepiece of the merge. On touch (no hover), do we:
   - (a) Auto-cycle the modes every 4s with a paused-on-tap behaviour. The bars also do a slow idle drift.
   - (b) Show the rest envelope, no cycle, no drift. Visitor taps a pill to change mode.
   - My vote: **(a)**. The "Try it" hint says the page is alive; auto-cycling on touch keeps that promise. Pauses on user input.

3. **Hero hint line.** Above eyebrow or below the sub? Above eyebrow is more discoverable but adds another line before the H1. Below the sub is less prominent but keeps the headline as the first thing. My vote: **above eyebrow**.

4. **Status pill colour.** Add `--accent-live: #8fb15a` to the palette (new colour, brand-adjacent) or use `--gold` for the dot? The green more clearly signals "available." My vote: **add the token**, gate the pulse animation behind reduced-motion.

5. **Per-chip tilt on `#what`.** V4 tilts the service chips on hover; current site indents them. Keep the indent (more grown-up) or swap to tilt (more playful)? My vote: **keep the indent**, don't touch `#what`.

6. **DE sub-paragraph swap.** I proposed `die wirklich liefert / im Stack läuft / sich rechnet`. The third clause is two-words to preserve the "sich rechnet" idiom; the first two are single-word verbs. Acceptable? Alternatives: `die wirklich ausliefert / produktiv läuft / sich auszahlt`.

---

## STOP

That's the critique. No code touched beyond saving the three V4 source files into `./design-exploration/`. On `feat/v4-interactive-merge`, working tree shows:

```
A  CRITIQUE.md
A  design-exploration/V4-Interactive.jsx
A  design-exploration/Wavemark.jsx
A  design-exploration/shared.css
?? RELAUNCH-HANDOFF.md
?? RELAUNCH-PROPOSAL.md
?? session-handoff.md
```

Read this end to end and respond with:
- (a) approve the 8-bullet merge as written, or
- (b) approve with the answers to the 6 open questions in §6, or
- (c) edits to the plan / disagreements with the critique.

Then I start commit 1.
