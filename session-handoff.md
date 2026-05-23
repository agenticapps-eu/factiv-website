# Session Handoff — 2026-05-23

## Accomplished
- User came back saying the V4 merge that landed (PR #3, commits
  `8faf0bd`…`6f218c7` on `main`) "neglected most of V4 and still looks
  like the original." Diagnosed: the merge was additive-only (cycling
  word + interactive waveform + status pill + hint line) bolted on top
  of the unchanged bones. None of V4's actual *aesthetic* — demoted
  FACTIV wordmark, 3-line stacked headline, card-based waveform, 2×2
  chip grid, dropped section alternation, dot-grid bg, pill buttons,
  hover-fill manifesto — had landed.
- Built four browseable HTML prototypes under `design-exploration/`:
  - `v4-preview.html` — faithful vanilla render of V4-Interactive.jsx.
  - `alt-a.html` — Hero takeover only. Drops FACTIV scramble, adds
    stacked 3-line headline + waveform card. Rest unchanged.
  - `alt-b.html` — Alt A + 2×2 chip grid for services, pill buttons,
    rounded about cards, V4 mono section labels.
  - `alt-c.html` — V4 becomes the page. Drops mesh+particles+ticker
    +metrics+section alternation. Dot-grid bg + radial glows. Hover-fill
    manifesto. Rounded process cards. Now also: pills inside the
    wavemark card use the same animation + selected-fill as the hero
    CTAs (pill-shape 999 px, `transition:transform 150ms`,
    `translateY(-2px)` lift on hover, solid gold + dark text + drop
    shadow when `aria-pressed=true`).
  - `index.html` (hub) — card grid linking to the four.
- Served from `python3 -m http.server 8910` (still running at PID 81688;
  kill with `lsof -ti :8910 | xargs kill`).
- Spent ~5 iterations refining Alt C against direct screenshot
  feedback: drop the radial custom cursor, port V4's 24-bar height-
  transition waveform (was running the older 7-bar scaleY approach
  from `motion.css`), fill the entire card with the bars (was 30 % of
  card because `motion.css` `.hero-wave-bar{transform:scaleY(.4)}` was
  shrinking everything — fixed with `!important` override), strip the
  scrolling ticker band, make the hero CTAs strictly V4 (no hover bg
  flash, no magnetic pull), then make the wavemark pills match the
  CTA system for cross-control consistency.

## Decisions
- User picked **Alt C** as the direction. Most aggressive of the three.
  Page after this lands at ~80 % V4 aesthetic, 20 % studio. The mesh +
  particle canvas that the original CRITIQUE.md called load-bearing
  *is* being dropped — superseded by user judgement that the dot-grid
  + radial-glow language is more coherent with the V4 waveform card
  and chip grid.
- Pills (SHIPS/RUNS/PAYS) and hero CTAs (HOW WE WORK / START A
  PROJECT) share **one button system** — pill-shape, 150 ms transform
  transition, 2 px lift on hover, solid gold + drop shadow when
  primary/active, ghost-bordered when secondary/inactive. This is a
  deliberate departure from V4 (whose pills inside the wavebox were
  8 px-rounded flat rectangles) for sake of internal consistency.
- The metrics band (`#metrics` with the bronze→amber→coral gradient
  and 3 counters) is gone entirely. User called the replacement
  "instrument cards" version AI slop; we just deleted the section.
  Section labels re-numbered 01→02→03→04→05.
- The ticker band ("Agentic Apps · AI Automation · …") is also gone.
  User called it AI slop too. Removed HTML + CSS + keyframes.
- The custom cursor (`#cur`/`#cur-ring` dot+ring) is gone in Alt C.
  V4 uses the OS default cursor with `cursor:crosshair` only on the
  wavebars. Same here.

## Files modified
- `design-exploration/v4-preview.html` — created.
- `design-exploration/alt-a.html` — created.
- `design-exploration/alt-b.html` — created.
- `design-exploration/alt-c.html` — created and iterated through
  multiple refinement passes to reach the approved state.
- `design-exploration/index.html` — created hub for the four prototypes.
- `.gstack/v4-preview.png`, `alt-a.png`, `alt-b*.png`, `alt-c*.png`
  — QA screenshots from each iteration.
- No changes to `index.html`, `de/index.html`, `assets/motion.js`,
  `assets/motion.css` yet — implementation pass not started.

## Next session: start here
Alt C is approved. **Implement it on a fresh feature branch
`feat/v4-second-pass-aggressive`** (do NOT push to main directly;
cf. global CLAUDE.md "Always use feature branches + PRs to main").

Suggested commit sequence on the new branch:

1. `feat: drop FACTIV scramble from hero, add V4 stacked headline + waveform card`
   — restructure `#hero` in `index.html` per `alt-c.html`. New
   `.hero-grid` 2-col layout. `.hero-stack` h1 with AGENTIC / SOFTWARE
   / THAT [SHIPS.]. Move the waveform out of the floating right-side
   placement and into a card with mono label header + 24 bars filling
   the card middle + pills inside. Drop scramble JS path in motion.js
   (`startScramble` returns early if no `.hero-title`).
2. `feat: rebuild #what as V4 2×2 chip grid with tilt + blob hover`
   — replace the `.services-list` four-row list with `.chips` grid.
3. `feat: V4 hover-fill manifesto, drop scroll-driven outline-fill`
   — swap `.outline` for `.swap` spans on both `demos.` and `software.`.
   Remove the `@supports (animation-timeline: view())` manifesto block
   from `motion.css`.
4. `chore: drop #metrics section entirely, renumber section labels`
   — also remove `[data-target]` counter JS from `index.html`.
5. `chore: drop ticker band + mesh WebGL + particle canvas`
   — remove the `.ticker` div, `#bg-canvas` element, the canvas script
   block, the `startMesh()` function in `motion.js`. Keep
   `startMagnetic` (or drop, see open questions), `startCyclingPivot`,
   `startPillsAndAutoCycle`.
6. `feat: dot-grid background + section-anchored radial glows`
   — add `body::before` dot-grid + `.glow` helper class with
   `.gold-tr`/`.coral-bl`/`.bronze-c` variants. Drop section
   alternation (`background:var(--bg-mid)` on `#what`, `#process`).
   Whole page becomes one warm-dark canvas.
7. `feat: V4 pill button system for hero CTAs + wavemark pills`
   — rebuild `.btn-primary`/`.btn-ghost` as 999 px pills with
   `transition:transform 150ms` + `translateY(-2px)` hover. Style
   `.wave-pill` identically: ghost-bordered when inactive, solid
   gold + dark text + drop shadow when `aria-pressed=true`. Remove
   `motion.css` button override rules.
8. `feat: V4 24-bar waveform driver replaces 7-bar implementation`
   — port the V4 algorithm into `motion.js startWaveform()`:
   container becomes JS-populated (24 children), each bar gets
   `style.height` not `--scale`/`transform:scaleY`. `transition:
   height 180ms cubic-bezier(.34,1.56,.64,1)`. Hover peak with
   `1 - d*6` falloff. Coloured `box-shadow` glow on bars within 8 %
   of cursor. No idle drift (V4 has none). Update `.hero-wave-bar`
   rule in `motion.css` accordingly.
9. `i18n: port all eight changes to de/index.html`
   — same shape, DE strings. Existing DE labels still apply
   (LIEFERT / LÄUFT / ZAHLT SICH already in `data-label-{mode}` attrs).

Each commit should be small enough to revert independently. Open the
PR with a body referencing `CRITIQUE.md` plus this handoff for context.
Title: `Relaunch — V4 second-pass aggressive merge (Alt C)`.

Before opening the PR, sanity-check in a real browser at
`http://127.0.0.1:8910/design-exploration/alt-c.html` against the
new branch served at the same root: they should look identical,
modulo the inline `<style>` block bloat in `alt-c.html` becoming
proper rules in `assets/motion.css`.

## Open questions
- Do we keep the custom cursor (`#cur`/`#cur-ring`) on the live site?
  User dropped it in Alt C but never said anything global. Default
  assumption: drop it site-wide on the new branch (it doesn't fit the
  V4 aesthetic anyway). Confirm before commit 1.
- Magnetic CTA pull (`startMagnetic` in motion.js): user implicitly
  rejected it on Alt C ("animates differently than the original").
  Drop it entirely or keep it as a `prefers-reduced-motion:no-preference`
  enhancement? Default assumption: drop. Confirm before commit 7.
- `motion.css`'s scroll-driven `factiv-title-rise` and
  `factiv-label-slide` on section titles/labels — keep them
  (they're tasteful) or drop (consistency with the "less is more" V4
  direction)? Default: keep. Confirm before commit 5.
- The python http.server on :8910 keeps running across sessions until
  killed. Either leave it (handy for revisits) or kill it
  (`lsof -ti :8910 | xargs kill`).
