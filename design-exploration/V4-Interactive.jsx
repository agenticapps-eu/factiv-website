// V4 — Interactive / playful. Reactive waveform, draggable chips, poke-able type.

const v4css = `
.v4 { background: #0f0d0a; color: #f4ede0; height: 100%; font-family: var(--f-font-body);
  position: relative; overflow: hidden;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(242,175,76,0.06), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(240,123,73,0.05), transparent 50%);
}
.v4 .dots { position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
  background-image: radial-gradient(rgba(244,237,224,0.08) 1px, transparent 1px);
  background-size: 24px 24px; }

.v4 .topbar { position: absolute; top: 0; left: 0; right: 0; padding: 22px 40px;
  display: flex; justify-content: space-between; align-items: center; z-index: 10; }
.v4 .topbar .logo { font-family: var(--f-font-display); font-size: 22px; letter-spacing: 0.28em;
  color: var(--f-gold); display: flex; align-items: center; gap: 12px; }
.v4 .topbar .right { display: flex; gap: 12px; align-items: center; }
.v4 .topbar .right .pill { padding: 8px 16px; border: 1px solid rgba(244,237,224,0.2);
  border-radius: 999px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(244,237,224,0.7); display: inline-flex; align-items: center; gap: 8px; }
.v4 .topbar .right .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: #8fb15a; }
.v4 .topbar .right .pill.cta { background: var(--f-gold); color: #0f0d0a; border-color: var(--f-gold);
  font-weight: 700; }

/* HERO */
.v4 .hero { position: relative; padding: 110px 60px 0; }
.v4 .hint { font-family: var(--f-font-mono); font-size: 11px; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--f-gold); margin-bottom: 18px; display: flex; gap: 14px; align-items: center; }
.v4 .hint .cursor { width: 14px; height: 14px; border: 2px solid var(--f-gold); border-radius: 50%;
  position: relative; }
.v4 .hint .cursor::after { content: ''; position: absolute; left: 50%; top: 50%; width: 4px; height: 4px;
  background: var(--f-gold); border-radius: 50%; transform: translate(-50%,-50%); }

.v4 .hero h1 { font-family: var(--f-font-display); font-size: 132px; line-height: 0.92;
  letter-spacing: 0.005em; max-width: 800px; }
.v4 .hero h1 .word { color: #f4ede0; display: block; }
.v4 .hero h1 .row { display: flex; align-items: center; gap: 18px; }
.v4 .hero h1 .blank {
  display: inline-flex; align-items: center; justify-content: center;
  height: 116px; padding: 0 26px;
  background: rgba(244,237,224,0.06);
  border: 2px dashed rgba(242,175,76,0.6); border-radius: 22px;
  color: var(--f-gold); font-family: var(--f-font-display); cursor: pointer;
  transition: background 200ms, transform 200ms;
  user-select: none;
}
.v4 .hero h1 .blank:hover { background: rgba(242,175,76,0.16); transform: rotate(-1.5deg); }

.v4 .hero .sub { font-size: 18px; line-height: 1.7; color: rgba(244,237,224,0.75);
  max-width: 640px; margin-top: 36px; }
.v4 .hero .sub .em { color: var(--f-gold); }

/* The reactive waveform */
.v4 .wavebox { position: absolute; top: 130px; right: 60px; width: 480px; height: 420px;
  background: rgba(244,237,224,0.03); border: 1px solid rgba(244,237,224,0.1); border-radius: 22px;
  padding: 22px 24px 70px; }
.v4 .wavebox .lbl { font-family: var(--f-font-mono); font-size: 10px; letter-spacing: 0.28em;
  text-transform: uppercase; color: rgba(244,237,224,0.5); display: flex; justify-content: space-between; }
.v4 .wavebox .lbl .live { color: #8fb15a; display: inline-flex; align-items: center; gap: 6px; }
.v4 .wavebox .lbl .live .dot { width: 7px; height: 7px; border-radius: 50%; background: #8fb15a;
  animation: v4pulse 1.4s ease-in-out infinite; }
@keyframes v4pulse { 50% { opacity: 0.3; } }

.v4 .wavebars { position: absolute; left: 26px; right: 26px; top: 56px; bottom: 60px;
  display: flex; align-items: flex-end; gap: 6px; cursor: crosshair; }
.v4 .wavebar { flex: 1; border-radius: 6px 6px 2px 2px; transition: height 180ms cubic-bezier(.34,1.56,.64,1);
  min-height: 12px; }

.v4 .wavebox .ctrl { position: absolute; left: 26px; right: 26px; bottom: 22px;
  display: flex; gap: 8px; }
.v4 .wavebox .ctrl button { flex: 1; padding: 8px 10px; border-radius: 8px;
  background: rgba(244,237,224,0.05); border: 1px solid rgba(244,237,224,0.12);
  font-family: var(--f-font-mono); font-size: 10px; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(244,237,224,0.78); }
.v4 .wavebox .ctrl button:hover { background: rgba(242,175,76,0.12); color: var(--f-gold);
  border-color: rgba(242,175,76,0.3); }
.v4 .wavebox .ctrl button.active { background: rgba(242,175,76,0.18); color: var(--f-gold);
  border-color: var(--f-gold); }

.v4 .hero .actions { display: flex; gap: 14px; margin-top: 44px; }
.v4 .hero .actions a { padding: 16px 32px; border-radius: 999px; font-size: 12px;
  letter-spacing: 0.24em; text-transform: uppercase; font-weight: 700; transition: transform 150ms; }
.v4 .hero .actions a:hover { transform: translateY(-2px); }
.v4 .hero .actions .primary { background: var(--f-gold); color: #0f0d0a;
  box-shadow: 0 8px 24px -4px rgba(242,175,76,0.4); }
.v4 .hero .actions .ghost { border: 1px solid rgba(244,237,224,0.3); color: rgba(244,237,224,0.9); }

/* WHAT — poke-able chips */
.v4 .what { padding: 100px 60px; position: relative; }
.v4 .what .lbl { font-family: var(--f-font-mono); font-size: 11px; letter-spacing: 0.28em;
  text-transform: uppercase; color: var(--f-gold); margin-bottom: 14px; }
.v4 .what h2 { font-family: var(--f-font-display); font-size: 110px; line-height: 0.94;
  letter-spacing: 0.005em; color: #f4ede0; max-width: 14ch; }
.v4 .what h2 .gold { color: var(--f-gold); }
.v4 .what .intro { font-size: 16px; line-height: 1.7; color: rgba(244,237,224,0.7);
  max-width: 540px; margin-top: 28px; }

.v4 .chips { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 56px; }
.v4 .chip { padding: 30px 32px; background: rgba(244,237,224,0.04);
  border: 1px solid rgba(244,237,224,0.12); border-radius: 22px; cursor: pointer;
  transition: transform 250ms cubic-bezier(.34,1.56,.64,1), background 200ms, border-color 200ms;
  position: relative; overflow: hidden; }
.v4 .chip:hover { transform: translateY(-4px) rotate(-0.6deg);
  background: rgba(242,175,76,0.07); border-color: rgba(242,175,76,0.4); }
.v4 .chip:nth-child(2):hover { transform: translateY(-4px) rotate(0.6deg); }
.v4 .chip:nth-child(3):hover { transform: translateY(-4px) rotate(0.4deg); }
.v4 .chip:nth-child(4):hover { transform: translateY(-4px) rotate(-0.4deg); }
.v4 .chip .num { font-family: var(--f-font-display); font-size: 56px; letter-spacing: 0.025em;
  color: var(--f-gold); line-height: 1; }
.v4 .chip h3 { font-family: var(--f-font-display); font-size: 28px; letter-spacing: 0.04em;
  color: #f4ede0; text-transform: uppercase; margin: 10px 0 12px; }
.v4 .chip p { font-size: 13px; line-height: 1.7; color: rgba(244,237,224,0.7); }
.v4 .chip .blob { position: absolute; right: -40px; top: -40px; width: 120px; height: 120px;
  border-radius: 50%; background: radial-gradient(circle, rgba(242,175,76,0.18), transparent 70%);
  pointer-events: none; opacity: 0; transition: opacity 300ms; }
.v4 .chip:hover .blob { opacity: 1; }

/* MANIFESTO — hover-fill type */
.v4 .manifesto { padding: 100px 60px 120px; position: relative; }
.v4 .manifesto .lbl { font-family: var(--f-font-mono); font-size: 11px; letter-spacing: 0.28em;
  text-transform: uppercase; color: var(--f-gold); margin-bottom: 22px; }
.v4 .manifesto p.big { font-family: var(--f-font-display); font-size: 130px; line-height: 1.0;
  letter-spacing: 0.01em; color: #f4ede0; max-width: 18ch; }
.v4 .manifesto .swap { display: inline-block; position: relative; cursor: pointer;
  color: transparent; -webkit-text-stroke: 1.5px var(--f-gold); transition: -webkit-text-stroke 200ms, color 300ms; }
.v4 .manifesto .swap:hover { color: var(--f-gold); -webkit-text-stroke: 1.5px transparent; }
.v4 .manifesto .swap::after { content: '↩'; position: absolute; top: -10px; right: -40px;
  font-family: var(--f-font-mono); font-size: 20px; color: var(--f-gold); opacity: 0;
  transition: opacity 200ms, transform 200ms; }
.v4 .manifesto .swap:hover::after { opacity: 1; transform: translateY(-4px); }
.v4 .manifesto p.sub { font-size: 15px; line-height: 1.85; color: rgba(244,237,224,0.65);
  max-width: 520px; margin-top: 40px; }
`;

function ReactiveWaveform() {
  const N = 24;
  const baseHeights = React.useMemo(() =>
    Array.from({length:N}, (_,i) => {
      const t = i/(N-1);
      const v = Math.sin(t*Math.PI) * 0.7 + 0.3 + Math.sin(t*Math.PI*4)*0.08;
      return Math.max(0.15, Math.min(1, v));
    }), []);
  const [hover, setHover] = React.useState(null);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    setHover({x, y});
  };
  const onLeave = () => setHover(null);

  return (
    <div className="wavebars" onMouseMove={onMove} onMouseLeave={onLeave}>
      {baseHeights.map((h, i) => {
        const t = i/(N-1);
        let scale = h;
        if (hover) {
          const d = Math.abs(t - hover.x);
          const peak = Math.max(0, 1 - d * 6);
          scale = h * 0.5 + peak * hover.y * 1.1;
        }
        scale = Math.max(0.06, Math.min(1, scale));
        const hue = i < N*0.2 ? '#B89355' : i < N*0.4 ? '#C7AA79' : i < N*0.6 ? '#F2AF4C' :
                    i < N*0.8 ? '#F07B49' : '#F2AF4C';
        return (
          <div className="wavebar" key={i}
               style={{height: `${scale*100}%`, background: hue,
                       boxShadow: hover && Math.abs(t-hover.x)<0.08 ? `0 0 24px ${hue}` : 'none'}}/>
        );
      })}
    </div>
  );
}

function V4Interactive() {
  const [mode, setMode] = React.useState('ship');
  const blankLabels = {
    ship: 'SHIPS',
    runs: 'RUNS',
    pays: 'PAYS',
  };
  return (
    <div className="fv v4">
      <style>{v4css}</style>
      <div className="dots"></div>

      <div className="topbar">
        <div className="logo"><Wavemark width={28} height={20} /> FACTIV</div>
        <div className="right">
          <div className="pill"><span className="dot"></span>2 BUILDERS · ACCEPTING</div>
          <div className="pill cta">Start a project</div>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hint"><span className="cursor"></span>Hover the waveform. Tap a word. Try it.</div>
        <h1>
          <span className="word">AGENTIC</span>
          <span className="word">SOFTWARE</span>
          <div className="row">
            <span className="word">THAT</span>
            <span className="blank" onClick={() =>
              setMode(m => m === 'ship' ? 'runs' : m === 'runs' ? 'pays' : 'ship')}>
              {blankLabels[mode]}
            </span>
          </div>
        </h1>
        <p className="sub">
          A Germany-based studio of two builders. We build AI that actually
          <span className="em"> {mode === 'ship' ? 'ships' : mode === 'runs' ? 'runs in your stack' : 'gets paid for'}</span>
          {' '}— across regulated SMB, institutional due-diligence and consumer fintech.
        </p>

        <div className="wavebox">
          <div className="lbl">
            <span>FACTIV / WAVEMARK · LIVE</span>
            <span className="live"><span className="dot"></span>REACTIVE</span>
          </div>
          <ReactiveWaveform />
          <div className="ctrl">
            <button className={mode==='ship'?'active':''} onClick={() => setMode('ship')}>Ships</button>
            <button className={mode==='runs'?'active':''} onClick={() => setMode('runs')}>Runs</button>
            <button className={mode==='pays'?'active':''} onClick={() => setMode('pays')}>Pays</button>
          </div>
        </div>

        <div className="actions">
          <a className="primary">How we work</a>
          <a className="ghost">Start a project</a>
        </div>
      </section>

      {/* WHAT */}
      <section className="what">
        <div className="lbl">01 — What we build · poke any</div>
        <h2>Four shapes,<br />all <span className="gold">shipping.</span></h2>
        <p className="intro">
          Each chip is a service in production right now. Hover them. Each represents
          weeks-to-months of real engineering — DSGVO- and EU-AI-Act-aware by default.
        </p>
        <div className="chips">
          {FACTIV_SERVICES.map(s => (
            <div className="chip" key={s.n}>
              <div className="blob"></div>
              <div className="num">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="lbl">02 — Our belief · hover to commit</div>
        <p className="big">
          Most AI projects<br />
          produce <span className="swap">demos.</span><br />
          We produce<br />
          <span className="swap">software.</span>
        </p>
        <p className="sub">
          The agentic revolution is real. The engineering reality hasn't caught up.
          We've spent the last few years building the systems most teams are still pitching —
          production-grade, auditable, monitored, paid-for.
        </p>
      </section>
    </div>
  );
}

Object.assign(window, { V4Interactive });
