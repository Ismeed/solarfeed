import { PanelRow, Sun } from "./HeroScene";

/** Spot 1: a solar array feeding a hammer mill. */
export function SpotSolarMill() {
  return (
    <svg viewBox="0 0 360 200" className="h-auto w-full" aria-hidden="true">
      <rect width="360" height="200" rx="20" fill="#E9F1F7" />
      <path d="M0 160 C90 150 200 156 360 148 V180 a20 20 0 0 1 -20 20 H20 a20 20 0 0 1 -20 -20 Z" fill="#EBD7AC" />
      <Sun cx={70} cy={50} r={18} />
      <PanelRow x={40} y={104} w={130} h={28} ground={160} />
      <path d="M176 140 C210 140 220 120 252 120" stroke="#E8A33D" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" className="sf-flow" />
      <circle cx="176" cy="140" r="4" fill="#E8A33D" />
      {/* drive box */}
      <rect x="244" y="104" width="24" height="30" rx="4" fill="#FFFFFF" stroke="#0A5297" strokeWidth="1.8" />
      <path d="M257 109 l-6 10 h5 l-2 9 l7 -12 h-5 z" fill="#E8A33D" />
      {/* hammer mill */}
      <path d="M276 70 h44 l-12 24 h-20 z" fill="#5FA6E6" />
      <rect x="282" y="94" width="32" height="44" rx="6" fill="#0E6EC5" />
      <rect x="314" y="106" width="20" height="20" rx="5" fill="#0A5297" />
      <path d="M290 138 l-6 18 M306 138 l6 18" stroke="#0B2235" strokeWidth="3" strokeLinecap="round" />
      <circle cx="298" cy="114" r="7" fill="none" stroke="#9BD0FF" strokeWidth="2" className="sf-spin" />
    </svg>
  );
}

/** Spot 2: a quality-gate list with one blocked row. */
export function SpotQualityGate() {
  const rows = [
    { y: 46, id: "K-0142", ok: true },
    { y: 82, id: "K-0143", ok: true },
    { y: 118, id: "K-0144", ok: false },
    { y: 154, id: "K-0145", ok: true },
  ];
  return (
    <svg viewBox="0 0 360 200" className="h-auto w-full" aria-hidden="true">
      <rect width="360" height="200" rx="20" fill="#E9F1F7" />
      <rect x="48" y="26" width="264" height="158" rx="14" fill="#FFFFFF" stroke="#DCE3E8" />
      {rows.map((r) => (
        <g key={r.id}>
          {!r.ok && <rect x="56" y={r.y - 14} width="248" height="30" rx="8" fill="#C2410C" opacity="0.08" />}
          <text x="72" y={r.y + 5} fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="500" fill={r.ok ? "#3D5466" : "#C2410C"}>
            {r.id}
          </text>
          <rect x="140" y={r.y - 3} width={r.ok ? 72 : 96} height="6" rx="3" fill={r.ok ? "#DCE3E8" : "#C2410C"} opacity={r.ok ? 1 : 0.35} />
          {r.ok ? (
            <g>
              <circle cx="284" cy={r.y} r="10" fill="#0E6EC5" />
              <path d={`M279 ${r.y} l3.5 3.5 l6.5 -7`} stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : (
            <g>
              <rect x="236" y={r.y - 10} width="58" height="20" rx="10" fill="#C2410C" />
              <text x="265" y={r.y + 4} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="500" fill="#fff" letterSpacing="0.8">
                BLOCK
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Spot 3: a clear-day solar output curve with the grinding window shaded. */
export function SpotSolarCurve() {
  // x: 06:00 → 18:00 mapped to 40 → 330
  const x = (h: number) => 40 + ((h - 6) / 12) * 290;
  const y = (h: number) => 160 - Math.max(0, Math.sin(((h - 6) / 12) * Math.PI)) ** 1.5 * 110;
  const pts = Array.from({ length: 49 }, (_, i) => 6 + i * 0.25);
  const line = pts.map((h, i) => `${i ? "L" : "M"}${x(h).toFixed(1)} ${y(h).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 360 200" className="h-auto w-full" aria-hidden="true">
      <rect width="360" height="200" rx="20" fill="#E9F1F7" />
      <rect x={x(10.5)} y="34" width={x(14.5) - x(10.5)} height="126" fill="#0E6EC5" opacity="0.12" />
      <path d={`M${x(10.5)} 34 V160 M${x(14.5)} 34 V160`} stroke="#0E6EC5" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x={(x(10.5) + x(14.5)) / 2} y="28" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" fontWeight="500" fill="#0A5297" letterSpacing="0.8">
        GRIND 10:30–14:30
      </text>
      <path d={`${line} L${x(18)} 160 L${x(6)} 160 Z`} fill="#E8A33D" opacity="0.22" />
      <path d={line} stroke="#E8A33D" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 160 H330" stroke="#5B6F80" strokeWidth="1" />
      {[6, 9, 12, 15, 18].map((h) => (
        <text key={h} x={x(h)} y="180" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" fill="#5B6F80">
          {String(h).padStart(2, "0")}:00
        </text>
      ))}
    </svg>
  );
}
