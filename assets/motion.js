/* ============================================================
   Factiv motion layer — Session 3 (21 May 2026)
   WebGL mesh · scramble · magnetic CTAs · section-label digit flip.
   Pure DOM/WebGL, no libraries. ~250 lines.
   Respects prefers-reduced-motion at every entry point.
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. (removed) WebGL gold-coral mesh ------------- */
  // Dropped with V4 second-pass: dot-grid + radial glows replace mesh+particles.

  /* ---------- 2. Scramble-decode wordmark ------------------- */
  function startScramble() {
    var title = document.querySelector('.hero-title');
    if (!title) return;
    if (REDUCED) return;
    var spans = {
      t1: title.querySelector('.t1'),
      t2: title.querySelector('.t2'),
      t3: title.querySelector('.t3')
    };
    if (!spans.t1 || !spans.t2 || !spans.t3) return;
    var FINAL = { t1: spans.t1.textContent, t2: spans.t2.textContent, t3: spans.t3.textContent };
    var POOL  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function rand() { return POOL[Math.floor(Math.random() * POOL.length)]; }

    function run() {
      title.classList.add('scrambling');
      var start = performance.now();
      var DUR_MAIN = 700;   // t1 + t3 resolve in 700 ms
      var DUR_I    = 1100;  // t2 (the I) flickers longer
      function step(now) {
        var dt = now - start;
        var pMain = Math.min(1, dt / DUR_MAIN);
        var pI    = Math.min(1, dt / DUR_I);
        // t1 — "FACT"
        var s1 = '';
        for (var i = 0; i < FINAL.t1.length; i++) {
          s1 += (i / FINAL.t1.length) < pMain ? FINAL.t1[i] : rand();
        }
        spans.t1.textContent = s1;
        // t3 — "V"
        var s3 = '';
        for (var k = 0; k < FINAL.t3.length; k++) {
          s3 += (k / FINAL.t3.length) < pMain ? FINAL.t3[k] : rand();
        }
        spans.t3.textContent = s3;
        // t2 — "I" flickers
        spans.t2.textContent = pI < 1 ? rand() : FINAL.t2;
        if (pI < 1) requestAnimationFrame(step);
        else {
          spans.t1.textContent = FINAL.t1;
          spans.t2.textContent = FINAL.t2;
          spans.t3.textContent = FINAL.t3;
          title.classList.remove('scrambling');
        }
      }
      requestAnimationFrame(step);
    }

    // Run after the existing fadeUp completes (~1.4s into page load).
    setTimeout(run, 1400);
    // Replay on click for fun.
    title.style.cursor = 'pointer';
    title.addEventListener('click', run);
  }

  /* ---------- 3. (removed) Magnetic hero CTAs ---------------- */
  // Dropped with V4 second-pass: V4 buttons use only translateY(-2px) on hover.

  /* ---------- 4. Section-label digit flip ------------------- */
  function startDigitFlip() {
    if (REDUCED) return;
    var labels = document.querySelectorAll('.section-label');
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var m = el.textContent.match(/^\s*(\d{1,2})\s*[—\-]\s*(.+)$/);
        if (!m) { obs.unobserve(el); return; }
        var target = parseInt(m[1], 10);
        var tail   = m[2];
        var n = Math.max(0, target - 6);
        el.innerHTML = '<span class="digit">' + String(n).padStart(2, '0') + '</span> — ' + tail;
        var dEl = el.querySelector('.digit');
        var start = performance.now();
        var DUR = 460;
        function step(now) {
          var p = Math.min(1, (now - start) / DUR);
          // Ease-out cubic
          var eased = 1 - Math.pow(1 - p, 3);
          var v = Math.round(n + (target - n) * eased);
          dEl.textContent = String(v).padStart(2, '0');
          if (p < 1) requestAnimationFrame(step);
          else dEl.textContent = String(target).padStart(2, '0');
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(labels, function (l) { obs.observe(l); });
  }

  /* ---------- 5. Interactive 24-bar wavemark (V4 port) ------ */
  // Container is a #wavebars div. JS populates 24 children. Each bar gets
  // style.height (not --scale + transform); CSS transition: height 180ms
  // cubic-bezier(.34,1.56,.64,1) handles the spring. Hover peak with sharp
  // (1 - d*6) falloff. Coloured box-shadow glow on bars within 8% of cursor.
  function startWaveform() {
    var host = document.getElementById('wavebars');
    if (!host) return;
    var N = 24;
    // Sin-pi base envelope with harmonic — same as V4-Interactive.jsx.
    var base = [];
    for (var i = 0; i < N; i++) {
      var t = i / (N - 1);
      var v = Math.sin(t * Math.PI) * 0.7 + 0.3 + Math.sin(t * Math.PI * 4) * 0.08;
      base.push(Math.max(0.15, Math.min(1, v)));
    }
    // Brand gradient across the 5 wavemark colours, spread across 24 bars.
    function hueFor(i) {
      if (i < N * 0.2)  return '#B89355';
      if (i < N * 0.4)  return '#C7AA79';
      if (i < N * 0.6)  return '#F2AF4C';
      if (i < N * 0.8)  return '#F07B49';
      return '#F2AF4C';
    }
    var els = [];
    for (var k = 0; k < N; k++) {
      var d = document.createElement('div');
      d.className = 'hero-wave-bar';
      d.dataset.hue = hueFor(k);
      d.style.background = d.dataset.hue;
      d.style.height = (base[k] * 100) + '%';
      host.appendChild(d);
      els.push(d);
    }
    if (REDUCED) return; // bars rest at base envelope, no interaction

    var hover = null;
    function paint() {
      for (var i = 0; i < N; i++) {
        var ti = i / (N - 1);
        var scale = base[i];
        var glow = false;
        if (hover) {
          var dx = Math.abs(ti - hover.x);
          var peak = Math.max(0, 1 - dx * 6);
          scale = base[i] * 0.5 + peak * hover.y * 1.1;
          glow = dx < 0.08;
        }
        scale = Math.max(0.06, Math.min(1, scale));
        els[i].style.height = (scale * 100) + '%';
        els[i].style.boxShadow = glow ? '0 0 24px ' + els[i].dataset.hue : 'none';
      }
    }
    function setHover(clientX, clientY) {
      var r = host.getBoundingClientRect();
      if (r.width <= 0) return;
      hover = {
        x: Math.max(0, Math.min(1, (clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, 1 - (clientY - r.top) / r.height))
      };
      paint();
    }
    host.addEventListener('mousemove',  function (e) { setHover(e.clientX, e.clientY); }, { passive: true });
    host.addEventListener('mouseleave', function ()  { hover = null; paint(); });
    host.addEventListener('touchstart', function (e) { if (e.touches[0]) setHover(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    host.addEventListener('touchmove',  function (e) { if (e.touches[0]) setHover(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    host.addEventListener('touchend',   function ()  { hover = null; paint(); });
  }

  /* ---------- 6. Cycling hero pivot (ships → runs → pays) --- */
  // Single source of truth for the cycling claim. Per-locale labels live on each
  // element as data-label-{mode} so EN and DE share this JS unchanged.
  var pivotState = { i: 0, modes: ['ships', 'runs', 'pays'], listeners: [] };

  function setPivotMode(mode) {
    var idx = pivotState.modes.indexOf(mode);
    if (idx < 0) return;
    pivotState.i = idx;
    pivotState.listeners.forEach(function (fn) { fn(mode); });
  }

  function labelFor(el, mode) {
    return el.getAttribute('data-label-' + mode) || el.textContent;
  }

  function startCyclingPivot() {
    var pivot = document.querySelector('.hero-pivot');
    var subPivot = document.querySelector('.hero-sub-pivot');
    if (!pivot) return;

    pivotState.listeners.push(function (mode) {
      pivot.textContent = labelFor(pivot, mode);
      pivot.setAttribute('data-mode', mode);
      if (subPivot) subPivot.textContent = labelFor(subPivot, mode);
    });

    pivot.addEventListener('click', function () {
      setPivotMode(pivotState.modes[(pivotState.i + 1) % pivotState.modes.length]);
    });
  }

  /* ---------- 7. Wavemark pills + touch auto-cycle ---------- */
  // Pills are a second control surface for the same pivotState. On touch devices
  // (no hover), the mode auto-cycles every 4 s and pauses for 8 s after any user
  // interaction.
  function startPillsAndAutoCycle() {
    var pills = document.querySelectorAll('.wave-pill');
    if (!pills.length) return;

    // Click → set mode, pause any pending auto-cycle.
    Array.prototype.forEach.call(pills, function (p) {
      p.addEventListener('click', function () {
        setPivotMode(p.getAttribute('data-mode'));
        pauseAutoCycle();
      });
    });

    // State subscriber: keep aria-pressed honest.
    pivotState.listeners.push(function (mode) {
      Array.prototype.forEach.call(pills, function (p) {
        p.setAttribute('aria-pressed', p.getAttribute('data-mode') === mode ? 'true' : 'false');
      });
    });

    if (REDUCED) return;
    var hoverless = window.matchMedia && window.matchMedia('(hover: none)').matches;
    if (!hoverless) return;

    var pauseUntil = 0;
    function tick() {
      var now = performance.now();
      if (now < pauseUntil) {
        setTimeout(tick, pauseUntil - now + 100);
        return;
      }
      setPivotMode(pivotState.modes[(pivotState.i + 1) % pivotState.modes.length]);
      setTimeout(tick, 4000);
    }
    function pauseAutoCycle() {
      pauseUntil = performance.now() + 8000;
    }

    // Any tap or click anywhere on the page pauses the auto-cycle for 8 s.
    document.addEventListener('touchstart', pauseAutoCycle, { passive: true, capture: true });
    document.addEventListener('click',      pauseAutoCycle, { capture: true });

    setTimeout(tick, 4000);
  }

  /* ---------- boot ------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  function boot() {
    try { startScramble();     } catch (e) { console.warn('factiv scramble failed', e); }
    try { startDigitFlip();    } catch (e) { console.warn('factiv digit-flip failed', e); }
    try { startWaveform();     } catch (e) { console.warn('factiv waveform failed', e); }
    try { startCyclingPivot();      } catch (e) { console.warn('factiv pivot failed', e); }
    try { startPillsAndAutoCycle(); } catch (e) { console.warn('factiv pills failed', e); }
  }
})();
