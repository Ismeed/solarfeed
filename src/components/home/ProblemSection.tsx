import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useI18n } from "@/i18n";
import { cn, EASE } from "@/lib/utils";
import { Reveal, RevealItem, useSeen } from "@/components/motion";
import { SectionHeader, SourceNote } from "@/components/primitives";

function StatCard({ viz, children, source, className }: { viz: ReactNode; children: ReactNode; source: string; className?: string }) {
  return (
    <RevealItem as="article" className={cn("card flex flex-col p-6 sm:p-7", className)}>
      <div className="flex h-[168px] items-center">{viz}</div>
      <div className="mt-6 flex-1">{children}</div>
      <SourceNote className="mt-6 border-t border-line pt-4">{source}</SourceNote>
    </RevealItem>
  );
}

/** Ring showing 65% solid plus the 65–70% range as a lighter band, so the range stays honest. */
function FeedRing({ label }: { label: string }) {
  const { ref, seen } = useSeen<SVGSVGElement>(0.5);
  const r = 58;
  const c = 2 * Math.PI * r;
  const arc = (from: number, to: number) => ({ strokeDasharray: `${c * (to - from)} ${c}`, strokeDashoffset: -c * from });
  return (
    <svg ref={ref} viewBox="0 0 160 160" className="h-[160px] w-[160px]" role="img" aria-label={label}>
      <g transform="rotate(-90 80 80)" fill="none" strokeWidth="18">
        <circle cx="80" cy="80" r={r} stroke="#E9F1F7" />
        <m.circle
          cx="80" cy="80" r={r} stroke="#9CC5EC" strokeLinecap="butt"
          style={arc(0.65, 0.7)}
          initial={{ opacity: 0 }} animate={{ opacity: seen ? 1 : 0 }} transition={{ delay: 1.1, duration: 0.5 }}
        />
        <m.circle
          cx="80" cy="80" r={r} stroke="#0E6EC5" strokeLinecap="butt"
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: seen ? `${c * 0.65 - 2} ${c}` : `0 ${c}` }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </g>
      <text x="80" y="87" textAnchor="middle" className="fill-navy font-display text-[21px] font-bold" letterSpacing="-0.8">
        65–70%
      </text>
    </svg>
  );
}

function DieselBars({ d }: { d: ReturnType<typeof useI18n>["d"]["home"]["problem"]["diesel"] }) {
  const { ref, seen } = useSeen<HTMLDivElement>(0.5);
  const bars = [
    { label: d.fromLabel, value: d.fromValue, pct: 1758 / 3277, color: "bg-muted-2/70" },
    { label: d.toLabel, value: d.toValue, pct: 1, color: "bg-navy" },
  ];
  return (
    <div ref={ref} role="img" aria-label={d.chartLabel} className="flex h-full w-full items-end justify-center gap-14">
      {bars.map((b, i) => (
        <div key={b.label} className="flex h-full flex-col items-center justify-end">
          <span className="tabular mb-2 font-display text-base font-bold text-navy">{b.value}</span>
          <div className="relative flex h-[100px] w-7 items-end">
            <m.div
              className={cn("w-full rounded-t", b.color)}
              initial={{ height: 0 }}
              animate={{ height: seen ? `${b.pct * 100}%` : 0 }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.2 }}
            />
          </div>
          <span className="mt-2 border-t border-line pt-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-2">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function AflatoxinGrid({ d }: { d: ReturnType<typeof useI18n>["d"]["home"]["problem"]["aflatoxin"] }) {
  const { ref, seen, reduce } = useSeen<HTMLDivElement>(0.5);
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div ref={ref} role="img" aria-label={d.chartLabel} className="grid w-[136px] shrink-0 grid-cols-10 gap-[3px]">
        {Array.from({ length: 100 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-[2px] transition-[background-color,transform] duration-500 ease-brand",
              seen && i < 83 ? "bg-alert" : "bg-line",
              seen ? "scale-100" : "scale-75",
            )}
            style={{ transitionDelay: reduce ? "0ms" : `${i * 9}ms` }}
          />
        ))}
      </div>
      <ul className="flex gap-4 text-[0.8rem] leading-tight text-muted">
        <li className="flex items-center gap-2">
          <span className="size-3 shrink-0 rounded-[2px] bg-alert" aria-hidden="true" />
          {d.legendAffected}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 shrink-0 rounded-[2px] bg-line" aria-hidden="true" />
          {d.legendClear}
        </li>
      </ul>
    </div>
  );
}

function ScaleBars({ d }: { d: ReturnType<typeof useI18n>["d"]["home"]["problem"]["scale"] }) {
  const { ref, seen } = useSeen<HTMLDivElement>(0.5);
  const rows = [
    { label: d.breakEvenLabel, value: d.breakEvenValue, pct: 1, color: "bg-navy" },
    { label: d.flockLabel, value: d.flockValue, pct: 300 / 8000, color: "bg-amber" },
  ];
  return (
    <div ref={ref} role="img" aria-label={d.chartLabel} className="w-full space-y-5">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-3 text-[0.85rem]">
            <span className="text-muted">{r.label}</span>
            <span className="tabular whitespace-nowrap font-display font-bold text-navy">{r.value}</span>
          </div>
          <div className="mt-2 h-6 rounded bg-sky">
            <m.div
              className={cn("h-full rounded-r", r.color)}
              style={{ minWidth: seen ? 6 : 0 }}
              initial={{ width: 0 }}
              animate={{ width: seen ? `${r.pct * 100}%` : 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.25 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProblemSection() {
  const { d } = useI18n();
  const p = d.home.problem;
  return (
    <section id="problem" aria-labelledby="problem-title" className="section bg-cream">
      <div className="container">
        <SectionHeader id="problem-title" eyebrow={p.eyebrow} title={p.title} lede={p.lede} />

        <Reveal staggerChildren={0.1} className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard viz={<FeedRing label={p.feedShare.chartLabel} />} source={p.feedShare.source}>
            <h3 className="text-h3">
              <span className="sr-only">{p.feedShare.value} </span>
              {p.feedShare.title}
            </h3>
            <p className="mt-2 text-muted">{p.feedShare.body}</p>
          </StatCard>

          <StatCard viz={<DieselBars d={p.diesel} />} source={p.diesel.source}>
            <h3 className="text-h3">
              {p.diesel.title}: <span className="text-alert">{p.diesel.callout}</span>
            </h3>
            <p className="mt-2 text-muted">{p.diesel.body}</p>
          </StatCard>

          <StatCard viz={<AflatoxinGrid d={p.aflatoxin} />} source={p.aflatoxin.source}>
            <h3 className="text-h3">
              <span className="font-bold text-alert">{p.aflatoxin.value}</span> {p.aflatoxin.title}
            </h3>
            <p className="mt-2 text-muted">{p.aflatoxin.body}</p>
          </StatCard>

          <StatCard viz={<ScaleBars d={p.scale} />} source={p.scale.source}>
            <h3 className="text-h3">{p.scale.caption}</h3>
            <p className="mt-2 text-muted">{p.scale.body}</p>
          </StatCard>
        </Reveal>
      </div>

      <div className="container mt-16 md:mt-20">
        <Reveal className="on-dark relative overflow-hidden rounded-panel bg-navy px-6 py-12 sm:px-12 md:py-16">
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,rgb(232_163_61/0.35),transparent_65%)]" />
          <p className="relative max-w-4xl font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-white">
            {p.statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
