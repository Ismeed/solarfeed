import { useState } from "react";
import { useI18n } from "@/i18n";
import { Slider } from "@/components/ui/form-controls";
import { cn } from "@/lib/utils";

const START = 6;
const END = 18;
const pct = (h: number) => ((h - START) / (END - START)) * 100;
/** Illustrative clear-day output, 0–1 of peak. */
export const solarOutput = (h: number) => Math.max(0, Math.sin(((h - START) / (END - START)) * Math.PI)) ** 1.5;
const clock = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

const COLORS: Record<string, string> = {
  intake: "bg-muted-2",
  testing: "bg-amber",
  grinding: "bg-hub",
  mixing: "bg-hub-dark",
  bagging: "bg-navy",
};

export function DayAtTheHub() {
  const { d } = useI18n();
  const day = d.how.day;
  const [time, setTime] = useState(12);
  const running = day.activities.filter((a) => time >= a.start && time < a.end);
  const output = Math.round(solarOutput(time) * 100);

  const curve = Array.from({ length: 49 }, (_, i) => START + i * 0.25)
    .map((h, i) => `${i ? "L" : "M"}${pct(h).toFixed(2)} ${(100 - solarOutput(h) * 92).toFixed(2)}`)
    .join(" ");

  return (
    <div className="card p-5 sm:p-8">
      <div className="grid gap-x-4 [grid-template-columns:5.5rem_1fr] sm:[grid-template-columns:7rem_1fr]">
        {/* solar curve */}
        <p className="self-end pb-1 font-mono text-[0.66rem] uppercase leading-tight tracking-[0.1em] text-muted-2">{day.output}</p>
        <div className="relative h-28">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect x={pct(10.5)} y="0" width={pct(14.5) - pct(10.5)} height="100" fill="rgb(14 110 197 / 0.08)" />
            <path d={`${curve} L100 100 L0 100 Z`} fill="rgb(232 163 61 / 0.22)" />
            <path d={curve} fill="none" stroke="#E8A33D" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="sr-only">{day.curveLabel}</span>
          <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-navy transition-[left] duration-200" style={{ left: `${pct(time)}%` }} aria-hidden="true">
            <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-navy" />
          </div>
        </div>

        {/* activity rows */}
        {day.activities.map((a) => {
          const on = time >= a.start && time < a.end;
          return (
            <div key={a.key} className="contents">
              <p className={cn("flex items-center py-2 text-[0.85rem] font-medium transition-colors sm:text-[0.95rem]", on ? "text-navy" : "text-muted-2")}>{a.label}</p>
              <div className="relative flex items-center border-t border-line py-2">
                <div
                  className={cn("h-5 rounded transition-opacity duration-300", COLORS[a.key], on ? "opacity-100" : "opacity-35")}
                  style={{ marginLeft: `${pct(a.start)}%`, width: `${pct(a.end) - pct(a.start)}%` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-navy/80 transition-[left] duration-200" style={{ left: `${pct(time)}%` }} aria-hidden="true" />
              </div>
            </div>
          );
        })}

        {/* hour ticks */}
        <span />
        <div className="relative mt-2 h-5 border-t border-muted-2/50 font-mono text-[0.68rem] text-muted-2">
          {[6, 9, 12, 15, 18].map((h) => (
            <span key={h} className={cn("absolute top-1 -translate-x-1/2 first:translate-x-0 last:-translate-x-full", (h === 9 || h === 15) && "hidden sm:inline")} style={{ left: `${pct(h)}%` }}>
              {clock(h)}
            </span>
          ))}
        </div>

        <span />
        <Slider
          className="mt-4"
          min={START}
          max={END}
          step={0.5}
          value={[time]}
          onValueChange={([v]) => setTime(v)}
          thumbLabel={day.timeLabel}
          valueText={clock(time)}
        />
      </div>

      <div aria-live="polite" className="mt-6 grid gap-4 rounded-2xl bg-sky p-5 sm:grid-cols-[auto_auto_1fr] sm:items-start sm:gap-8">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-2">{day.timeLabel}</p>
          <p className="tabular font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-navy">{clock(time)}</p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-2">{day.output}</p>
          <p className="tabular font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-navy">
            {output}% <span className="text-base font-medium text-muted">{day.ofPeak}</span>
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-2">{day.running}</p>
          {running.length ? (
            <ul className="mt-1.5 space-y-1.5">
              {running.map((a) => (
                <li key={a.key} className="flex items-start gap-2 text-[0.95rem] text-ink">
                  <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-sm", COLORS[a.key])} aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-navy">{a.label}.</strong> {a.body}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1.5 text-muted">{day.nothing}</p>
          )}
        </div>
      </div>
      <p className="mt-4 font-mono text-[0.72rem] leading-relaxed text-muted-2">{day.note}</p>
    </div>
  );
}
