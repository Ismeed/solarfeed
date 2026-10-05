import { Hen } from "./people";

/** Faceless illustrated portraits for the three audiences. Decorative: the card text names them. */

function Bust({ x, y, s = 1, skin, robe, trim, head }: { x: number; y: number; s?: number; skin: string; robe: string; trim: string; head: "cap" | "wrap" | "capAmber" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 40 C-38 12 -20 2 0 2 C20 2 38 12 40 40 Z" fill={robe} />
      <path d="M-8 3 C-9 14 -4 22 0 26 C4 22 9 14 8 3" fill="none" stroke={trim} strokeWidth="2.6" />
      <rect x="-6" y="-12" width="12" height="16" rx="5" fill={skin} />
      <circle cx="0" cy="-24" r="17" fill={skin} />
      {head === "cap" && (
        <>
          <path d="M-17 -27 C-17 -46 17 -46 17 -27 Z" fill="#0A5297" />
          <path d="M-16 -30 H16" stroke="#E8A33D" strokeWidth="2" strokeDasharray="3.5 2.6" />
        </>
      )}
      {head === "capAmber" && (
        <>
          <path d="M-17 -27 C-17 -46 17 -46 17 -27 Z" fill="#E8A33D" />
          <path d="M-16 -30 H16" stroke="#9A5B00" strokeWidth="2" />
        </>
      )}
      {head === "wrap" && (
        <>
          <path d="M-20 -24 C-24 -50 -4 -56 8 -52 C24 -48 26 -32 20 -24 C10 -34 -10 -34 -20 -24 Z" fill="#9A5B00" />
          <path d="M14 -50 C26 -58 30 -44 22 -40" fill="#E8A33D" />
        </>
      )}
    </g>
  );
}

export function AvatarFarmer() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full">
      <circle cx="60" cy="60" r="60" fill="#FBEBD0" />
      <clipPath id="av-farmer"><circle cx="60" cy="60" r="60" /></clipPath>
      <g clipPath="url(#av-farmer)">
        <Bust x={54} y={82} skin="#8A5634" robe="#F7F3E8" trim="#0E6EC5" head="cap" />
        <g transform="translate(96 112) scale(1.25)"><Hen x={0} ground={0} delay={-1} /></g>
      </g>
    </svg>
  );
}

export function AvatarCooperative() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full">
      <circle cx="60" cy="60" r="60" fill="#DCEAF6" />
      <clipPath id="av-coop"><circle cx="60" cy="60" r="60" /></clipPath>
      <g clipPath="url(#av-coop)">
        <Bust x={28} y={86} s={0.78} skin="#6B4128" robe="#E8A33D" trim="#9A5B00" head="wrap" />
        <Bust x={92} y={86} s={0.78} skin="#A06A43" robe="#0A5297" trim="#5FA6E6" head="capAmber" />
        <Bust x={60} y={96} s={0.9} skin="#8A5634" robe="#F7F3E8" trim="#0E6EC5" head="cap" />
      </g>
    </svg>
  );
}

export function AvatarMinistry() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full">
      <circle cx="60" cy="60" r="60" fill="#E4EAEF" />
      <clipPath id="av-min"><circle cx="60" cy="60" r="60" /></clipPath>
      <g clipPath="url(#av-min)">
        {/* a state building behind */}
        <g stroke="#9FB3C3" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M14 46 L60 22 L106 46 Z" />
          <path d="M22 50 V86 M38 50 V86 M82 50 V86 M98 50 V86 M14 88 H106" />
        </g>
        <Bust x={60} y={84} skin="#6B4128" robe="#021B2F" trim="#E8A33D" head="capAmber" />
        {/* clipboard */}
        <g transform="rotate(-8 84 104)">
          <rect x="72" y="92" width="24" height="30" rx="3" fill="#F6F7F3" stroke="#0A5297" strokeWidth="1.6" />
          <rect x="79" y="89" width="10" height="5" rx="1.6" fill="#0A5297" />
          <path d="M77 101 h14 M77 107 h14 M77 113 h9" stroke="#0E6EC5" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
