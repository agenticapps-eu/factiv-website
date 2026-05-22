// Shared waveform mark — 5 vertical bars, the Factiv brand glyph.

function Wavemark({ width = 40, height = 28, fill }) {
  if (fill) {
    return (
      <svg width={width} height={height} viewBox="0 0 50 32" fill="none" aria-label="Factiv">
        <rect x="0"  y="10" width="7" height="12" rx="3.5" fill={fill} />
        <rect x="10" y="4"  width="7" height="24" rx="3.5" fill={fill} />
        <rect x="20" y="7"  width="7" height="18" rx="3.5" fill={fill} />
        <rect x="30" y="0"  width="7" height="32" rx="3.5" fill={fill} />
        <rect x="40" y="7"  width="7" height="18" rx="3.5" fill={fill} />
      </svg>
    );
  }
  return (
    <svg width={width} height={height} viewBox="0 0 50 32" fill="none" aria-label="Factiv">
      <rect x="0"  y="10" width="7" height="12" rx="3.5" fill="#B89355" />
      <rect x="10" y="4"  width="7" height="24" rx="3.5" fill="#C7AA79" />
      <rect x="20" y="7"  width="7" height="18" rx="3.5" fill="#F2AF4C" />
      <rect x="30" y="0"  width="7" height="32" rx="3.5" fill="#F07B49" />
      <rect x="40" y="7"  width="7" height="18" rx="3.5" fill="#F2AF4C" />
    </svg>
  );
}

function WavemarkWatermark({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 400 240" fill="none" aria-hidden="true">
      <rect x="0"   y="80"  width="50" height="80"  rx="25" fill="currentColor" />
      <rect x="65"  y="40"  width="50" height="160" rx="25" fill="currentColor" />
      <rect x="130" y="55"  width="50" height="130" rx="25" fill="currentColor" />
      <rect x="195" y="10"  width="50" height="220" rx="25" fill="currentColor" />
      <rect x="260" y="55"  width="50" height="130" rx="25" fill="currentColor" />
      <rect x="325" y="40"  width="50" height="160" rx="25" fill="currentColor" />
    </svg>
  );
}

// Common copy data used across variants so wording stays consistent.
const FACTIV_SERVICES = [
  {
    n: '01',
    h: 'Agentic workflow automation',
    p: "End-to-end autonomous processes that replace manual work — voice intake, document extraction, multi-step decision flows, compliance checks.",
  },
  {
    n: '02',
    h: 'Agent architecture & integration',
    p: 'Connecting LLMs, vector stores, tools, and APIs into coherent systems that sit inside your existing infrastructure. DSGVO- and EU-AI-Act-aware by default.',
  },
  {
    n: '03',
    h: 'Custom agent development',
    p: "Bespoke agents with memory, tool use, and reasoning — built to your domain, your data, your audit trail.",
  },
  {
    n: '04',
    h: 'Strategy & enablement',
    p: "For teams who know they need agentic AI but don't know where to start. Scoped discovery, architecture sketching, small-team enablement. One to three weeks.",
  },
];

Object.assign(window, { Wavemark, WavemarkWatermark, FACTIV_SERVICES });
