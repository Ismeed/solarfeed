import { FarmerWithPhone, FarmerWithSack, Hen, Operator } from "./people";

type PanelProps = { x: number; y: number; w: number; h: number; ground: number };

/** One row of solar panels, seen from the front-left, on two legs and a rear strut. */
export function PanelRow({ x, y, w, h, ground }: PanelProps) {
  const s = 16; // skew of the top edge
  const cols = 6;
  return (
    <g>
      <path d={`M${x + 22} ${y + h} V${ground} M${x + w - 18} ${y + h} V${ground}`} stroke="#0B2235" strokeWidth="3.2" strokeLinecap="round" />
      <path d={`M${x + w / 2 + s} ${y + 6} L${x + w / 2 + s + 6} ${ground - 2}`} stroke="#0B2235" strokeWidth="2.4" opacity="0.6" />
      <ellipse cx={x + w / 2} cy={ground + 1} rx={w / 2} ry="3" fill="#021B2F" opacity="0.08" />
      <path d={`M${x + s} ${y} H${x + w + s} L${x + w} ${y + h} H${x} Z`} fill="#0E6EC5" stroke="#0A5297" strokeWidth="2" strokeLinejoin="round" />
      <g stroke="#7DB8EC" strokeWidth="1.1" opacity="0.6">
        {Array.from({ length: cols - 1 }, (_, i) => {
          const t = (i + 1) / cols;
          return <path key={i} d={`M${x + s + w * t} ${y} L${x + w * t} ${y + h}`} />;
        })}
        <path d={`M${x + s / 2} ${y + h / 2} H${x + w + s / 2}`} />
      </g>
      <path d={`M${x + s + w * 0.12} ${y} H${x + s + w * 0.3} L${x + w * 0.18} ${y + h} H${x + w * 0.02} Z`} fill="#FFFFFF" opacity="0.16" />
    </g>
  );
}

export function Sun({ cx, cy, r = 32, spin = true, glow = true }: { cx: number; cy: number; r?: number; spin?: boolean; glow?: boolean }) {
  const rays = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <g>
      {glow && (
        <>
          <defs>
            <radialGradient id={`sun-glow-${cx}-${cy}`}>
              <stop offset="0.35" stopColor="#E8A33D" stopOpacity="0.35" />
              <stop offset="1" stopColor="#E8A33D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r * 2.6} fill={`url(#sun-glow-${cx}-${cy})`} className="sf-glow" />
        </>
      )}
      <g className={spin ? "sf-spin" : undefined}>
        {/* an invisible ring keeps the rotating group's box centred on the sun */}
        <circle cx={cx} cy={cy} r={r * 1.85} fill="none" />
        {rays.map((a) => (
          <path
            key={a}
            d={`M${cx} ${cy - r * 1.32} V${cy - r * 1.75}`}
            transform={`rotate(${a} ${cx} ${cy})`}
            stroke="#E8A33D"
            strokeWidth={r * 0.15}
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r} fill="#E8A33D" />
      <circle cx={cx - r * 0.18} cy={cy - r * 0.18} r={r * 0.62} fill="#F2BE6A" />
    </g>
  );
}

export function Acacia({ x, ground, scale = 1, opacity = 1 }: { x: number; ground: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${ground}) scale(${scale})`} opacity={opacity}>
      <path d="M-3 0 C-2 -20 -4 -34 -14 -52 M-1 -26 C4 -38 14 -46 26 -54 M-6 -40 C-18 -48 -30 -52 -44 -54" stroke="#0B2235" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M-3 0 C-2 -16 -2 -26 -1 -30" stroke="#0B2235" strokeWidth="8" strokeLinecap="round" />
      <path d="M-78 -56 C-70 -70 -40 -76 -10 -74 C20 -78 52 -74 66 -62 C70 -56 60 -52 40 -52 C10 -50 -30 -50 -60 -50 C-74 -50 -82 -52 -78 -56 Z" fill="#0B2235" />
      <path d="M-50 -66 C-30 -72 0 -72 30 -70" stroke="#1E3A50" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
    </g>
  );
}

export function FeedSack({ x, y, w = 32, h = 22 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill="#FBF7EC" stroke="#D8CBB0" strokeWidth="1.2" />
      <rect x={x} y={y + h * 0.36} width={w} height={h * 0.26} fill="#0E6EC5" />
      <path d={`M${x + 4} ${y + 2} q${w / 2 - 4} -3 ${w - 8} 0`} stroke="#D8CBB0" strokeWidth="1.2" fill="none" />
    </g>
  );
}

function HubBuilding() {
  const pinnacles = [746, 800, 854];
  return (
    <g>
      {/* side face for depth */}
      <path d="M910 202 L932 214 V330 L910 338 Z" fill="#B57843" />
      {/* corner horns (zanko) and parapet pinnacles of Hausa architecture */}
      <path d="M690 202 V184 C691 176 699 176 701 184 L704 202 Z M896 202 L899 184 C901 176 909 176 910 184 V202 Z" fill="#C98A50" />
      {pinnacles.map((x) => (
        <path key={x} d={`M${x - 6} 202 C${x - 5} 192 ${x + 5} 192 ${x + 6} 202 Z`} fill="#C98A50" />
      ))}
      {/* front wall */}
      <rect x="690" y="200" width="220" height="138" fill="#D69A5E" />
      <rect x="690" y="332" width="220" height="6" fill="#B57843" />
      <path d="M700 211 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5 l8 -5 l8 5" stroke="#EDBE84" strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* sign */}
      <rect x="738" y="218" width="124" height="28" rx="7" fill="#021B2F" />
      <circle cx="754" cy="232" r="5.5" fill="#E8A33D" />
      <text x="766" y="237.5" fill="#FFFFFF" fontFamily="Sora, 'Segoe UI', sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">
        SolarFeed
      </text>

      {/* solar motor-drive box — the energy line ends here */}
      <rect x="700" y="254" width="22" height="26" rx="3.5" fill="#F6F7F3" stroke="#0A5297" strokeWidth="1.6" />
      <path d="M713 258 l-5 9 h4 l-2 8 l6 -10 h-4 z" fill="#E8A33D" />

      {/* window */}
      <path d="M734 306 V288 C734 278 756 278 756 288 V306 Z" fill="#0B2235" />
      <path d="M745 281 V306 M734 294 H756" stroke="#C98A50" strokeWidth="1.6" />

      {/* open doorway with the hammer mill inside */}
      <path d="M768 340 V288 C768 262 834 262 834 288 V340" fill="none" stroke="#EDBE84" strokeWidth="2.4" />
      <clipPath id="hub-door">
        <path d="M774 338 V290 C774 270 828 270 828 290 V338 Z" />
      </clipPath>
      <path d="M774 338 V290 C774 270 828 270 828 290 V338 Z" fill="#0B2235" />
      <ellipse cx="800" cy="324" rx="30" ry="24" fill="#E8A33D" opacity="0.18" className="sf-glow" clipPath="url(#hub-door)" />
      <path d="M787 290 h24 l-7 13 h-10 z" fill="#5FA6E6" />
      <rect x="791" y="303" width="17" height="21" rx="3" fill="#0E6EC5" />
      <rect x="808" y="310" width="13" height="11" rx="3" fill="#0A5297" />
      <path d="M795 324 l-4 8" stroke="#5FA6E6" strokeWidth="3" strokeLinecap="round" />
      <rect x="780" y="328" width="16" height="10" rx="3" fill="#FBF7EC" />
      {/* door leaf swung open */}
      <path d="M828 288 L848 280 V344 L828 338 Z" fill="#8A5634" />
      <path d="M834 287 V340 M841 284 V342" stroke="#6E4126" strokeWidth="1.2" />
    </g>
  );
}

/**
 * Full-width hero landscape. Purely decorative motion (sun rays, energy flow, pecking hens)
 * is CSS-driven and switched off under prefers-reduced-motion.
 */
export function HeroScene({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" role="img" aria-labelledby="hero-scene-title" className="block h-full w-full">
      <title id="hero-scene-title">{title}</title>
      <defs>
        <linearGradient id="hs-hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE0EC" />
          <stop offset="1" stopColor="#DCE8F0" />
        </linearGradient>
        <linearGradient id="hs-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1E1BD" />
          <stop offset="1" stopColor="#EAD4A6" />
        </linearGradient>
      </defs>

      {/* faint clouds */}
      <g fill="#FFFFFF" opacity="0.75">
        <path d="M120 120 c10 -18 34 -18 42 -4 c14 -8 32 0 30 14 H112 c-6 0 -4 -10 8 -10z" className="sf-bob" />
        <path d="M1060 70 c8 -14 28 -14 34 -2 c12 -6 26 0 24 12 h-66 c-5 0 -3 -8 8 -10z" className="sf-bob" style={{ animationDelay: "-3s" }} />
      </g>

      <Sun cx={500} cy={118} r={26} />

      {/* far hills, mid savanna, ground */}
      <path d="M0 268 C160 214 300 236 430 252 C560 206 700 222 830 246 C980 206 1140 222 1270 240 C1350 226 1400 230 1440 236 V420 H0 Z" fill="url(#hs-hill-far)" />
      {/* distant village */}
      <g fill="#B9CFDF">
        <path d="M1188 250 h22 v-10 c0 -10 -22 -10 -22 0 z" />
        <path d="M1184 242 l15 -14 l15 14 z" />
        <path d="M1222 252 h18 v-8 c0 -8 -18 -8 -18 0 z" />
        <path d="M1219 246 l12 -11 l12 11 z" />
      </g>
      <Acacia x={1310} ground={272} scale={0.62} opacity={0.55} />
      <path d="M0 292 C180 266 360 280 520 286 C700 264 880 276 1040 272 C1200 260 1330 276 1440 268 V420 H0 Z" fill="#EBD7AC" />
      <Acacia x={196} ground={300} scale={1.05} />
      <path d="M0 318 C240 304 480 312 720 314 C960 316 1200 302 1440 312 V420 H0 Z" fill="url(#hs-ground)" />
      <path d="M520 420 C600 372 750 352 880 354 C1010 356 1120 380 1200 420 Z" fill="#F6EBD2" />

      {/* grass tufts */}
      <g stroke="#C9A361" strokeWidth="2" strokeLinecap="round" fill="none">
        {[[90, 340], [300, 330], [470, 372], [1000, 330], [1290, 346], [1380, 362], [140, 392], [1330, 400]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y} l-3 -9 M${x} ${y} l0 -12 M${x} ${y} l4 -9`} />
        ))}
      </g>

      {/* solar array, three rows */}
      <PanelRow x={420} y={226} w={206} h={34} ground={300} />
      <PanelRow x={400} y={254} w={226} h={36} ground={324} />
      <PanelRow x={380} y={284} w={246} h={38} ground={352} />

      {/* energy line: panels → motor drive */}
      <path d="M630 340 C664 338 672 318 686 300 C694 288 696 272 700 268" stroke="#E8A33D" strokeWidth="6" opacity="0.18" fill="none" strokeLinecap="round" />
      <path d="M630 340 C664 338 672 318 686 300 C694 288 696 272 700 268" stroke="#E8A33D" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="7 7" className="sf-flow" />
      <circle cx="630" cy="340" r="4" fill="#E8A33D" />

      <HubBuilding />

      {/* stacked feed sacks */}
      <FeedSack x={944} y={318} />
      <FeedSack x={978} y={318} />
      <FeedSack x={1012} y={318} />
      <FeedSack x={961} y={297} />
      <FeedSack x={995} y={297} />
      <FeedSack x={978} y={276} />

      {/* people */}
      <Operator x={872} ground={362} />
      <FarmerWithSack x={1052} ground={368} flip />
      <FarmerWithPhone x={1112} ground={372} />

      {/* hens */}
      <Hen x={560} ground={392} delay={0} />
      <Hen x={612} ground={400} delay={-1.6} flip tone="white" />
      <Hen x={668} ground={386} delay={-3.1} />
      <Hen x={1180} ground={396} delay={-2.2} flip />
      <Hen x={1236} ground={390} delay={-0.7} tone="white" />
    </svg>
  );
}
