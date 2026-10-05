import { PanelRow, Sun, FeedSack } from "./HeroScene";
import { Operator } from "./people";

/** Numbered callout marker with a leader line down to the item it labels. */
function Marker({ n, x, y, toY }: { n: number; x: number; y: number; toY: number }) {
  return (
    <g>
      <path d={`M${x} ${y + 15} V${toY}`} stroke="#021B2F" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx={x} cy={toY} r="3.5" fill="#021B2F" />
      <circle cx={x} cy={y} r="15" fill="#021B2F" />
      <circle cx={x} cy={y} r="15" fill="none" stroke="#E8A33D" strokeWidth="2" opacity="0.9" />
      <text x={x} y={y + 5} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="14" fontWeight="500" fill="#FFFFFF">
        {n}
      </text>
    </g>
  );
}

/**
 * Cutaway of a hub, process running left to right:
 * 1 array → 2 motor drives → 3 quality station → 4 hammer mill → 5 mixer → 6 bagging.
 * The numbered legend sits beside the figure in HTML so it stays readable and translatable.
 */
export function HubCutaway({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 1000 470" role="img" aria-labelledby="cutaway-title" className="h-auto w-full">
      <title id="cutaway-title">{title}</title>
      <rect width="1000" height="470" rx="24" fill="#E9F1F7" />
      <Sun cx={110} cy={86} r={24} />
      {/* ground */}
      <path d="M0 392 H1000 V446 a24 24 0 0 1 -24 24 H24 a24 24 0 0 1 -24 -24 Z" fill="#EBD7AC" />

      {/* 1 · solar array */}
      <PanelRow x={40} y={256} w={196} h={34} ground={330} />
      <PanelRow x={28} y={296} w={210} h={36} ground={392} />

      {/* building shell, front wall cut away */}
      <path d="M300 392 V176 H972 V392 Z" fill="#F2E3C8" />
      <path d="M300 176 L320 160 H992 L972 176 Z" fill="#C98A50" />
      <path d="M972 176 L992 160 V378 L972 392 Z" fill="#B57843" />
      <path d="M300 176 V392" stroke="#B57843" strokeWidth="12" />
      <path d="M300 164 V150 C301 142 309 142 311 150 L314 164 Z M960 160 L963 144 C965 136 973 136 974 144 V160 Z" fill="#C98A50" />
      {/* floor */}
      <path d="M300 372 H972 V392 H300 Z" fill="#D9BF94" />
      <path d="M306 186 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6" stroke="#E2C394" strokeWidth="2" fill="none" />
      {/* power cable along the ceiling */}
      <path d="M238 300 C270 300 286 240 330 232 H352" stroke="#E8A33D" strokeWidth="3" fill="none" strokeDasharray="7 7" className="sf-flow" />
      <path d="M372 222 V204 H760 V240 M600 204 V250" stroke="#E8A33D" strokeWidth="2.4" fill="none" opacity="0.8" />

      {/* 2 · motor drives */}
      <rect x="342" y="214" width="40" height="56" rx="5" fill="#FFFFFF" stroke="#0A5297" strokeWidth="2" />
      <rect x="350" y="222" width="24" height="12" rx="2" fill="#0B2235" />
      <path d="M356 226 h12" stroke="#5FD38D" strokeWidth="2" />
      <path d="M362 240 l-6 10 h5 l-2 9 l7 -12 h-5 z" fill="#E8A33D" />

      {/* 3 · quality station */}
      <rect x="402" y="300" width="132" height="10" rx="3" fill="#8A5634" />
      <path d="M412 310 V372 M524 310 V372" stroke="#6E4126" strokeWidth="5" />
      <rect x="414" y="268" width="38" height="32" rx="5" fill="#0E6EC5" />
      <rect x="420" y="274" width="26" height="12" rx="2" fill="#E9F1F7" />
      <text x="433" y="284" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#0A5297">12.1%</text>
      <rect x="462" y="280" width="30" height="20" rx="3" fill="#FFFFFF" stroke="#DCE3E8" />
      <path d="M468 284 v12 M474 284 v12 M480 284 v12 M486 284 v12" stroke="#C2410C" strokeWidth="2" />
      <path d="M500 300 c0 -18 26 -18 26 0 z" fill="#F4C76A" />
      <rect x="426" y="350" width="34" height="22" rx="6" fill="#FBF7EC" stroke="#D8CBB0" />
      <rect x="466" y="350" width="34" height="22" rx="6" fill="#FBF7EC" stroke="#C2410C" strokeWidth="1.6" />
      <path d="M476 356 l14 10 M490 356 l-14 10" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />

      {/* 4 · hammer mill */}
      <path d="M566 250 h64 l-16 34 h-32 z" fill="#5FA6E6" />
      <rect x="574" y="284" width="48" height="62" rx="8" fill="#0E6EC5" />
      <circle cx="598" cy="314" r="13" fill="none" stroke="#9BD0FF" strokeWidth="3" className="sf-spin" />
      <rect x="622" y="300" width="28" height="30" rx="6" fill="#0A5297" />
      <path d="M582 346 l-6 26 M614 346 l6 26" stroke="#0B2235" strokeWidth="4" strokeLinecap="round" />

      {/* 5 · vertical mixer */}
      <rect x="704" y="230" width="62" height="96" rx="10" fill="#0A5297" />
      <path d="M704 318 L735 356 L766 318 Z" fill="#0A5297" />
      <rect x="712" y="242" width="8" height="70" rx="4" fill="#5FA6E6" opacity="0.6" />
      <path d="M690 230 V372 M684 250 h12 M684 272 h12 M684 294 h12 M684 316 h12 M684 338 h12 M684 360 h12" stroke="#0B2235" strokeWidth="2.4" />
      <path d="M735 356 V372" stroke="#0B2235" strokeWidth="5" />
      <path d="M714 372 h42" stroke="#0B2235" strokeWidth="5" strokeLinecap="round" />

      {/* 6 · bagging area */}
      <rect x="806" y="356" width="70" height="16" rx="4" fill="#5B6F80" />
      <rect x="814" y="318" width="54" height="38" rx="10" fill="#FBF7EC" stroke="#D8CBB0" />
      <rect x="814" y="331" width="54" height="10" fill="#0E6EC5" />
      <rect x="878" y="326" width="26" height="30" rx="4" fill="#0B2235" />
      <rect x="882" y="330" width="18" height="8" rx="1.5" fill="#9BD0FF" />
      <FeedSack x={906} y={350} w={30} h={22} />
      <FeedSack x={936} y={350} w={30} h={22} />
      <FeedSack x={921} y={328} w={30} h={22} />

      <Operator x={548} ground={384} />

      {/* markers */}
      <Marker n={1} x={136} y={222} toY={262} />
      <Marker n={2} x={362} y={130} toY={212} />
      <Marker n={3} x={468} y={226} toY={266} />
      <Marker n={4} x={598} y={130} toY={248} />
      <Marker n={5} x={735} y={130} toY={228} />
      <Marker n={6} x={860} y={226} toY={314} />
    </svg>
  );
}
