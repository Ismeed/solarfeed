/**
 * Faceless, flat figures for the illustrations. Every figure is drawn standing on (x, ground)
 * and is about 74 units tall, so scenes can place them with a single translate.
 */

const SKIN = { a: "#8A5634", b: "#6B4128", c: "#A06A43" };

/** A farmer in a babban riga and hula cap, carrying a feed sack on the shoulder. */
export function FarmerWithSack({ x, ground, flip = false }: { x: number; ground: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${ground}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="1" rx="20" ry="3.2" fill="#021B2F" opacity="0.12" />
      {/* legs + sandals */}
      <path d="M-6 -20 L-8 -1 M5 -20 L8 -1" stroke="#2C3E50" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M-12 0h8M5 0h8" stroke="#3A2A1F" strokeWidth="2.6" strokeLinecap="round" />
      {/* robe */}
      <path d="M-11 -56 C-16 -46 -21 -32 -22 -18 L22 -18 C21 -32 16 -46 11 -56 Z" fill="#F7F3E8" />
      <path d="M-22 -18 L22 -18" stroke="#E3DAC4" strokeWidth="1.4" />
      {/* embroidery on the chest */}
      <path d="M-4 -55 C-6 -48 -4 -42 0 -38 C4 -42 6 -48 4 -55" fill="none" stroke="#0E6EC5" strokeWidth="1.6" />
      <circle cx="0" cy="-44" r="1.6" fill="#0E6EC5" />
      {/* arms: one raised to steady the sack */}
      <path d="M10 -54 C16 -58 18 -64 14 -70" stroke="#F7F3E8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M-10 -54 C-15 -44 -15 -36 -13 -30" stroke="#EFE8D6" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      <circle cx="-13" cy="-28" r="2.8" fill={SKIN.a} />
      {/* head + cap */}
      <rect x="-2.6" y="-62" width="5.2" height="6" rx="2" fill={SKIN.a} />
      <circle cx="0" cy="-67" r="7.4" fill={SKIN.a} />
      <path d="M-7.6 -69 C-7.6 -77 7.6 -77 7.6 -69 Z" fill="#0A5297" />
      <path d="M-7 -70.5 h14" stroke="#E8A33D" strokeWidth="1.2" strokeDasharray="2 1.6" />
      {/* sack on the shoulder */}
      <g transform="rotate(-14 16 -74)">
        <rect x="2" y="-86" width="30" height="20" rx="7" fill="#FBF7EC" stroke="#DCCFB2" strokeWidth="1.2" />
        <rect x="2" y="-79" width="30" height="5" fill="#0E6EC5" />
        <path d="M5 -86 l2 -3 M29 -86 l-2 -3" stroke="#DCCFB2" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <circle cx="14" cy="-71" r="2.8" fill={SKIN.a} />
    </g>
  );
}

/** A farmer in a headwrap and wrapper, holding a phone (orders come by WhatsApp or USSD). */
export function FarmerWithPhone({ x, ground }: { x: number; ground: number }) {
  return (
    <g transform={`translate(${x} ${ground})`}>
      <ellipse cx="0" cy="1" rx="18" ry="3" fill="#021B2F" opacity="0.12" />
      <path d="M-5 -6 L-6 -1 M5 -6 L6 -1" stroke={SKIN.b} strokeWidth="4" strokeLinecap="round" />
      <path d="M-10 0h7M3 0h7" stroke="#3A2A1F" strokeWidth="2.4" strokeLinecap="round" />
      {/* wrapper skirt with pattern */}
      <path d="M-15 -34 C-17 -22 -16 -12 -13 -5 L13 -5 C16 -12 17 -22 15 -34 Z" fill="#E8A33D" />
      <path d="M-15 -26 h30 M-16 -16 h32" stroke="#9A5B00" strokeWidth="1.4" opacity="0.7" />
      <g fill="#021B2F" opacity="0.55">
        <circle cx="-8" cy="-21" r="1.4" /><circle cx="0" cy="-21" r="1.4" /><circle cx="8" cy="-21" r="1.4" />
        <circle cx="-4" cy="-11" r="1.4" /><circle cx="4" cy="-11" r="1.4" />
      </g>
      {/* blouse */}
      <path d="M-10 -55 C-14 -48 -15 -40 -15 -34 L15 -34 C15 -40 14 -48 10 -55 Z" fill="#0E6EC5" />
      {/* arm holding phone */}
      <path d="M9 -52 C14 -46 14 -40 9 -38" stroke="#0E6EC5" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="8" cy="-38" r="2.6" fill={SKIN.b} />
      <rect x="4" y="-46" width="6" height="9.5" rx="1.6" fill="#021B2F" />
      <rect x="5.1" y="-44.8" width="3.8" height="6.4" rx="0.8" fill="#9BD0FF" className="sf-glow" />
      <path d="M-9 -52 C-13 -44 -13 -38 -12 -33" stroke="#0A5297" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      {/* head + headwrap (kallabi) */}
      <rect x="-2.4" y="-61" width="4.8" height="6" rx="2" fill={SKIN.b} />
      <circle cx="0" cy="-66" r="7" fill={SKIN.b} />
      <path d="M-8.5 -66 C-10 -78 -2 -82 4 -80 C11 -78 12 -70 8.5 -66 C4 -71 -4 -71 -8.5 -66 Z" fill="#9A5B00" />
      <path d="M6 -79 C12 -83 14 -77 10 -74" fill="#E8A33D" />
      {/* veil over the shoulders */}
      <path d="M-8 -60 C-14 -58 -16 -50 -15 -44 L-10 -46 C-11 -52 -9 -56 -6 -58 Z" fill="#9A5B00" opacity="0.85" />
    </g>
  );
}

/** Hub operator in a blue work shirt and cap, holding the offline-first tablet. */
export function Operator({ x, ground }: { x: number; ground: number }) {
  return (
    <g transform={`translate(${x} ${ground})`}>
      <ellipse cx="0" cy="1" rx="18" ry="3" fill="#021B2F" opacity="0.12" />
      <path d="M-5 -22 L-6 -1 M5 -22 L6 -1" stroke="#1E2F40" strokeWidth="6" strokeLinecap="round" />
      <path d="M-11 0h8M3 0h8" stroke="#1A1A1A" strokeWidth="2.6" strokeLinecap="round" />
      {/* tunic */}
      <path d="M-11 -56 C-15 -46 -16 -34 -15 -20 L15 -20 C16 -34 15 -46 11 -56 Z" fill="#0A5297" />
      <path d="M0 -56 V-22" stroke="#083F75" strokeWidth="1.2" />
      {/* lanyard + badge */}
      <path d="M-5 -56 L0 -44 L5 -56" stroke="#E8A33D" strokeWidth="1.4" fill="none" />
      <rect x="-3" y="-44" width="6" height="7" rx="1.2" fill="#F6F7F3" />
      {/* arms holding the tablet */}
      <path d="M-10 -53 C-14 -46 -12 -40 -6 -38 M10 -53 C14 -46 12 -40 6 -38" stroke="#0A5297" strokeWidth="6" strokeLinecap="round" fill="none" />
      <rect x="-11" y="-48" width="22" height="15" rx="2.6" fill="#021B2F" transform="rotate(-8 0 -40)" />
      <g transform="rotate(-8 0 -40)">
        <rect x="-9" y="-46" width="18" height="11" rx="1.4" fill="#E9F1F7" />
        <rect x="-7" y="-44" width="9" height="1.8" rx="0.9" fill="#0E6EC5" />
        <rect x="-7" y="-41" width="12" height="1.8" rx="0.9" fill="#0E6EC5" opacity="0.5" />
        <rect x="-7" y="-38" width="6" height="1.8" rx="0.9" fill="#C2410C" />
      </g>
      <circle cx="-6" cy="-37" r="2.6" fill={SKIN.c} />
      <circle cx="6" cy="-37" r="2.6" fill={SKIN.c} />
      {/* head + cap */}
      <rect x="-2.6" y="-62" width="5.2" height="6" rx="2" fill={SKIN.c} />
      <circle cx="0" cy="-67" r="7.2" fill={SKIN.c} />
      <path d="M-7.6 -68 C-7.6 -77 7.6 -77 7.6 -68 Z" fill="#E8A33D" />
      <path d="M2 -69 h10" stroke="#E8A33D" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  );
}

/** A laying hen. The head group pecks on a slow loop (CSS, disabled under reduced motion). */
export function Hen({ x, ground, delay = 0, flip = false, tone = "brown" }: { x: number; ground: number; delay?: number; flip?: boolean; tone?: "brown" | "white" }) {
  const body = tone === "brown" ? "#B5683A" : "#FBF8F1";
  const wing = tone === "brown" ? "#8E4E2A" : "#E5DDCB";
  return (
    <g transform={`translate(${x} ${ground}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="0.5" rx="11" ry="2" fill="#021B2F" opacity="0.12" />
      <path d="M-2 -6 l-1 6 M3 -6 l1 6" stroke="#D99A2B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M-14 -18 C-20 -24 -19 -30 -14 -28 C-12 -22 -10 -20 -8 -18 Z" fill={wing} />
      <ellipse cx="-1" cy="-13" rx="12" ry="8" fill={body} />
      <path d="M-6 -15 C-2 -10 4 -10 6 -14" stroke={wing} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <g className="sf-peck" style={{ animationDelay: `${delay}s` }}>
        <path d="M6 -16 C8 -22 9 -25 10 -27" stroke={body} strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="11" cy="-28" r="4.4" fill={body} />
        <path d="M9 -32 c1 -2 2 -2 3 0 c1 -2 2 -2 3 0 c0 2 -3 2 -6 1z" fill="#C2410C" />
        <path d="M14.5 -29 l4 1.2 l-4 1.2 z" fill="#E8A33D" />
        <path d="M13 -25 c1 2 0 3 -1 3" stroke="#C2410C" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="12.2" cy="-29" r="0.9" fill="#021B2F" />
      </g>
    </g>
  );
}
