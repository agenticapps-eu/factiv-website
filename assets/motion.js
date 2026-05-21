/* ============================================================
   Factiv motion layer — Session 3 (21 May 2026)
   WebGL mesh · scramble · magnetic CTAs · section-label digit flip.
   Pure DOM/WebGL, no libraries. ~250 lines.
   Respects prefers-reduced-motion at every entry point.
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. WebGL gold-coral mesh ---------------------- */
  function startMesh() {
    if (REDUCED) return;
    var host = document.getElementById('bg-canvas');
    if (!host) return;
    var cv = document.createElement('canvas');
    cv.id = 'bg-gl';
    cv.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cv, host);

    var gl = cv.getContext('webgl') || cv.getContext('experimental-webgl');
    if (!gl) { cv.remove(); return; } // fallback: existing canvas particles only

    var VS = [
      'attribute vec2 a;',
      'void main(){ gl_Position = vec4(a,0.0,1.0); }'
    ].join('\n');

    var FS = [
      'precision mediump float;',
      'uniform vec2 uRes;',
      'uniform vec2 uMouse;',
      'uniform float uTime;',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
      'float noise(vec2 p){',
      '  vec2 i=floor(p), f=fract(p);',
      '  vec2 u=f*f*(3.0-2.0*f);',
      '  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),',
      '             mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y);',
      '}',
      'float fbm(vec2 p){',
      '  float v=0.0, a=0.55;',
      '  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }',
      '  return v;',
      '}',
      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / uRes;',
      '  vec2 mouse = uMouse / uRes;',
      '  vec2 q = uv * 1.6 + vec2(uTime*0.022, uTime*-0.014);',
      '  q += (mouse - 0.5) * 0.35;',
      '  float n = fbm(q);',
      '  n += 0.12 * fbm(q*3.2 + vec2(uTime*0.04, 0.0));',
      '  vec3 cBg    = vec3(0.067,0.067,0.067);',
      '  vec3 cDark  = vec3(0.722,0.576,0.333);',
      '  vec3 cGold  = vec3(0.949,0.686,0.298);',
      '  vec3 cCoral = vec3(0.941,0.482,0.286);',
      '  vec3 col;',
      '  if(n < 0.45)      col = mix(cBg,   cDark,  smoothstep(0.05, 0.45, n));',
      '  else if(n < 0.72) col = mix(cDark, cGold,  smoothstep(0.45, 0.72, n));',
      '  else              col = mix(cGold, cCoral, smoothstep(0.72, 1.00, n));',
      '  float vig = smoothstep(1.10, 0.30, length(uv-0.5));',
      '  col *= mix(0.55, 1.0, vig);',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('factiv mesh shader compile failed:', gl.getShaderInfoLog(s));
        gl.deleteShader(s); return null;
      }
      return s;
    }
    var vs = compile(gl.VERTEX_SHADER, VS);
    var fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) { cv.remove(); return; }

    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { cv.remove(); return; }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes   = gl.getUniformLocation(prog, 'uRes');
    var uMouse = gl.getUniformLocation(prog, 'uMouse');
    var uTime  = gl.getUniformLocation(prog, 'uTime');

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width  = Math.floor(window.innerWidth  * dpr);
      cv.height = Math.floor(window.innerHeight * dpr);
      cv.style.width  = window.innerWidth  + 'px';
      cv.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    }
    resize();
    window.addEventListener('resize', resize);

    var mx = 0, my = 0;
    window.addEventListener('mousemove', function (e) {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      mx = e.clientX * dpr;
      my = (window.innerHeight - e.clientY) * dpr; // flip for GL coords
    }, { passive: true });

    var t0 = performance.now();
    (function frame() {
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uMouse, mx || cv.width / 2, my || cv.height / 2);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(frame);
    })();
  }

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

  /* ---------- 3. Magnetic hero CTAs -------------------------- */
  function startMagnetic() {
    if (REDUCED) return;
    var ctas = document.querySelectorAll('#hero .btn-primary, #hero .btn-ghost');
    var MAX = 10; // px
    Array.prototype.forEach.call(ctas, function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2));
        var dy = (e.clientY - (r.top  + r.height / 2));
        // Clamp displacement so the button only drifts ~MAX px in either direction.
        var tx = Math.max(-MAX, Math.min(MAX, dx * 0.28));
        var ty = Math.max(-MAX, Math.min(MAX,  dy * 0.28));
        btn.classList.add('magnet-active');
        btn.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.classList.remove('magnet-active');
        btn.style.transform = '';
      });
    });
  }

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

  /* ---------- boot ------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  function boot() {
    try { startMesh();      } catch (e) { console.warn('factiv mesh failed', e); }
    try { startScramble();  } catch (e) { console.warn('factiv scramble failed', e); }
    try { startMagnetic();  } catch (e) { console.warn('factiv magnetic failed', e); }
    try { startDigitFlip(); } catch (e) { console.warn('factiv digit-flip failed', e); }
  }
})();
