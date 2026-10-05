import { m } from "framer-motion";
import { Check, CircleCheck, Clock, OctagonX, Sun, Wheat } from "lucide-react";
import { useI18n } from "@/i18n";
import { Reveal, RevealItem, useSeen } from "@/components/motion";
import { cn, EASE } from "@/lib/utils";

function HubConsole() {
  const { d } = useI18n();
  const c = d.home.software.console;
  const { ref, seen, reduce } = useSeen<HTMLDivElement>(0.3);
  const rowDelay = 0.28;
  const tiles = [
    { icon: Sun, label: c.tileSolar, value: c.tileSolarValue },
    { icon: Clock, label: c.tileWindow, value: c.tileWindowValue },
    { icon: Wheat, label: c.tileBatch, value: c.tileBatchValue },
  ];

  return (
    <figure ref={ref} className="relative">
      <div className="rounded-[1.75rem] border border-white/10 bg-[#0B2A44] p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-3">
        <div className="overflow-hidden rounded-[1.25rem] bg-white text-ink">
          {/* app bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-cream px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-3">
              <img src="/brand/solarfeed-mark.svg" alt="" width={28} height={28} className="size-7" loading="lazy" />
              <div>
                <p className="font-display text-[0.95rem] font-semibold leading-tight text-navy">{c.title}</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted-2">{c.subtitle}</p>
              </div>
            </div>
            <span className="rounded-full border border-amber/60 bg-amber/15 px-2.5 py-1 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-amber-text">
              {c.badge}
            </span>
          </div>

          {/* intake table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[0.85rem] sm:text-[0.9rem]">
              <caption className="sr-only">{c.caption}</caption>
              <thead>
                <tr className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted-2">
                  <th scope="col" className="py-3 pl-4 pr-2 font-medium sm:pl-5">{c.colIngredient}</th>
                  <th scope="col" className="hidden px-2 py-3 font-medium sm:table-cell">{c.colMoisture}</th>
                  <th scope="col" className="hidden px-2 py-3 font-medium sm:table-cell">{c.colAflatoxin}</th>
                  <th scope="col" className="py-3 pl-2 pr-4 text-right font-medium sm:pr-5">{c.colStatus}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row, i) => {
                  const blocked = row.status === "blocked";
                  return (
                    <m.tr
                      key={row.id}
                      className={cn("border-t border-line align-top", blocked && "bg-alert/[0.06]")}
                      initial={{ opacity: 0, y: 12 }}
                      animate={
                        seen
                          ? blocked && !reduce
                            ? { opacity: 1, y: 0, backgroundColor: ["rgba(194,65,12,0.06)", "rgba(194,65,12,0.06)", "rgba(194,65,12,0.24)", "rgba(194,65,12,0.06)"] }
                            : { opacity: 1, y: 0 }
                          : { opacity: 0, y: 12 }
                      }
                      transition={{
                        delay: 0.2 + i * rowDelay,
                        duration: 0.55,
                        ease: EASE,
                        backgroundColor: { delay: 0.2 + c.rows.length * rowDelay + 0.2, duration: 1.4, times: [0, 0.1, 0.45, 1] },
                      }}
                    >
                      <td className={cn("py-3.5 pl-4 pr-2 sm:pl-5", blocked && "shadow-[inset_3px_0_0_rgb(var(--alert))]")}>
                        <p className="font-semibold text-navy">{row.ingredient}</p>
                        <p className="font-mono text-[0.72rem] text-muted-2">
                          <span className="sr-only">{c.colLot} </span>
                          {row.id}
                        </p>
                        <p className="tabular mt-1 font-mono text-[0.72rem] text-ink sm:hidden">
                          {row.moisture} · <span className={blocked ? "font-semibold text-alert" : undefined}>{row.aflatoxin}</span>
                        </p>
                        {blocked && <p className="mt-1.5 text-[0.78rem] leading-snug text-alert">{c.blockedReason}</p>}
                      </td>
                      <td className="tabular hidden px-2 py-3.5 font-mono text-[0.8rem] text-ink sm:table-cell">{row.moisture}</td>
                      <td className={cn("tabular hidden px-2 py-3.5 font-mono text-[0.8rem] sm:table-cell", blocked ? "font-semibold text-alert" : "text-ink")}>{row.aflatoxin}</td>
                      <td className="py-3.5 pl-2 pr-4 text-right sm:pr-5">
                        {blocked ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-alert px-2.5 py-1 text-[0.78rem] font-semibold text-white">
                            <OctagonX className="size-3.5" aria-hidden="true" />
                            {c.blocked}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-hub/10 px-2.5 py-1 text-[0.78rem] font-semibold text-hub-dark">
                            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                            {c.pass}
                          </span>
                        )}
                      </td>
                    </m.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="border-t border-line px-4 py-2.5 font-mono text-[0.68rem] tracking-wide text-muted-2 sm:px-5">{c.limits}</p>

          {/* footer tiles */}
          <dl className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
            {tiles.map((t) => (
              <div key={t.label} className="flex items-center gap-3 bg-sky/60 px-4 py-3.5 sm:block sm:px-5">
                <dt className="flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
                  <t.icon className="size-3.5 text-hub" aria-hidden="true" />
                  {t.label}
                </dt>
                <dd className="ml-auto font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-navy sm:ml-0 sm:mt-1">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[0.72rem] tracking-wide text-white/60">{c.caption}</figcaption>
    </figure>
  );
}

export function SoftwareSection() {
  const { d } = useI18n();
  const s = d.home.software;
  return (
    <section aria-labelledby="software-title" className="section on-dark relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/3 size-[32rem] rounded-full bg-[radial-gradient(circle,rgb(14_110_197/0.35),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>
      <div className="container relative grid items-center gap-14 lg:grid-cols-12">
        <Reveal staggerChildren={0.1} className="min-w-0 lg:col-span-5">
          <RevealItem>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="software-title" className="mt-4 text-h2 text-white">{s.title}</h2>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-white/75">{s.body}</p>
          </RevealItem>
          <ul className="mt-8 space-y-3">
            {s.bullets.map((b) => (
              <RevealItem as="li" key={b} className="flex items-start gap-3 text-white/85">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden="true" />
                <span>{b}</span>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
        <div className="min-w-0 lg:col-span-7">
          <HubConsole />
        </div>
      </div>
    </section>
  );
}
