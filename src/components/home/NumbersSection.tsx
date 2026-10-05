import { Suspense, lazy, useId, useState } from "react";
import { m } from "framer-motion";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useI18n } from "@/i18n";
import { Reveal, RevealItem, useSeen } from "@/components/motion";
import { SectionHeader, SourceNote, Tag } from "@/components/primitives";
import { Slider } from "@/components/ui/form-controls";
import { BAG_PRICES, bagsPerYear, savingPerYear } from "@/lib/savings";
import { naira, number } from "@/lib/format";
import { cn, EASE } from "@/lib/utils";

const YearlySavingsChart = lazy(() => import("@/components/charts/YearlySavingsChart"));
const BudgetRing = lazy(() => import("@/components/charts/BudgetRing"));

function ChartSlot({ height, children }: { height: number; children: React.ReactNode }) {
  // Charts mount only once scrolled near, so they animate from zero in view and Recharts loads late.
  const { ref, seen } = useSeen<HTMLDivElement>(0.2);
  return (
    <div ref={ref} style={{ minHeight: height }}>
      {seen && <Suspense fallback={<div style={{ height }} className="animate-pulse rounded-2xl bg-sky/60" />}>{children}</Suspense>}
    </div>
  );
}

function EnergyBars() {
  const { d } = useI18n();
  const e = d.home.numbers.energy;
  const { ref, seen } = useSeen<HTMLDivElement>(0.4);
  const rows = [
    { label: e.diesel, value: e.dieselValue, pct: 1, bar: "bg-muted-2" },
    { label: e.solar, value: e.solarValue, pct: 80 / 1670, bar: "bg-hub" },
  ];
  return (
    <div ref={ref} role="img" aria-label={e.chartLabel} className="space-y-6">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-medium text-ink">{r.label}</span>
            <span className="tabular font-display text-[1.375rem] font-bold tracking-[-0.02em] text-navy">{r.value}</span>
          </div>
          <div className="mt-2.5 h-6 rounded bg-sky">
            <m.div
              className={cn("h-full rounded-r", r.bar)}
              style={{ minWidth: seen ? 8 : 0 }}
              initial={{ width: 0 }}
              animate={{ width: seen ? `${r.pct * 100}%` : 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.3 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Calculator() {
  const { d } = useI18n();
  const c = d.home.numbers.calc;
  const [hens, setHens] = useState(500);
  const [price, setPrice] = useState<number>(18000);
  const priceLabelId = useId();

  const bags = bagsPerYear(hens);
  const year = savingPerYear(hens, price);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[0.95rem] font-semibold text-navy">{c.hensLabel}</span>
          <output className="tabular font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-navy">
            {number(hens)}
          </output>
        </div>
        <Slider
          className="mt-4"
          min={100}
          max={3000}
          step={50}
          value={[hens]}
          onValueChange={([v]) => setHens(v)}
          thumbLabel={c.hensLabel}
          valueText={`${number(hens)}`}
        />
        <div className="mt-1 flex justify-between font-mono text-[0.72rem] text-muted-2">
          <span>100</span>
          <span>3,000</span>
        </div>

        <p id={priceLabelId} className="mt-8 text-[0.95rem] font-semibold text-navy">{c.priceLabel}</p>
        <RadioGroup.Root
          aria-labelledby={priceLabelId}
          value={String(price)}
          onValueChange={(v) => setPrice(Number(v))}
          className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-sky p-1.5"
        >
          {BAG_PRICES.map((p) => (
            <RadioGroup.Item
              key={p}
              value={String(p)}
              className="tabular h-12 rounded-xl text-[0.95rem] font-semibold text-muted transition-[background-color,color,box-shadow] duration-300 ease-brand hover:text-navy data-[state=checked]:bg-white data-[state=checked]:text-navy data-[state=checked]:shadow-soft"
            >
              {naira(p)}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>

        <p className="mt-6 font-mono text-[0.72rem] leading-relaxed text-muted-2">{c.formula}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-cream p-5">
          <p className="text-sm text-muted">{c.bagsPerYear}</p>
          <p className="tabular mt-1 font-display text-[1.75rem] font-bold tracking-[-0.03em] text-navy">{number(bags)}</p>
        </div>
        <div className="rounded-2xl border border-line bg-cream p-5">
          <p className="text-sm text-muted">{c.perMonth}</p>
          <p className="tabular mt-1 font-display text-[1.75rem] font-bold tracking-[-0.03em] text-navy">{naira(year / 12)}</p>
        </div>
        <div aria-live="polite" aria-atomic="true" className="relative overflow-hidden rounded-2xl bg-amber p-6 sm:col-span-2">
          <div aria-hidden="true" className="absolute -right-10 -top-10 size-40 rounded-full bg-white/25" />
          <p className="relative font-semibold text-navy">{c.perYear}</p>
          <p className="tabular relative mt-1 font-display text-[clamp(2.4rem,1.8rem+2.4vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-navy">
            {naira(year)}
          </p>
          <p className="relative mt-3 text-sm text-navy/80">{c.atDiscount}</p>
        </div>
        <p className="text-sm text-muted sm:col-span-2">{c.note}</p>
      </div>
    </div>
  );
}

export function NumbersSection() {
  const { d } = useI18n();
  const n = d.home.numbers;
  return (
    <section id="numbers" aria-labelledby="numbers-title" className="section bg-cream">
      <div className="container">
        <SectionHeader id="numbers-title" eyebrow={n.eyebrow} title={n.title} lede={n.lede} />

        <Reveal staggerChildren={0.12} className="mt-14 grid gap-5 lg:grid-cols-2">
          <RevealItem as="article" className="card flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-h3">{n.energy.title}</h3>
              <Tag>{n.energy.badge}</Tag>
            </div>
            <div className="mt-8">
              <EnergyBars />
            </div>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-amber/40 bg-amber/10 p-4">
              <p className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.04em] text-navy">{n.energy.callout}</p>
              <p className="text-sm font-medium text-amber-text">{n.energy.calloutLabel}</p>
            </div>
            <SourceNote className="mt-auto pt-6">{n.energy.footnote}</SourceNote>
          </RevealItem>

          <RevealItem as="article" className="card flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-h3">{n.yearly.title}</h3>
                <p className="mt-1 text-sm text-muted">{n.yearly.subtitle}</p>
              </div>
              <Tag>{n.yearly.badge}</Tag>
            </div>
            <div className="mt-6">
              <ChartSlot height={280}>
                <YearlySavingsChart />
              </ChartSlot>
            </div>
          </RevealItem>
        </Reveal>

        <Reveal className="card mt-5 p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-h3">{n.calc.title}</h3>
              <p className="mt-1 max-w-xl text-muted">{n.calc.lede}</p>
            </div>
            <Tag>{n.calc.badge}</Tag>
          </div>
          <Calculator />
        </Reveal>

        <Reveal className="card mt-5 p-6 sm:p-8 lg:p-10">
          <div className="mb-8 max-w-2xl">
            <h3 className="text-h3">{n.budget.title}</h3>
            <p className="mt-2 text-muted">{n.budget.lede}</p>
          </div>
          <ChartSlot height={300}>
            <BudgetRing />
          </ChartSlot>
        </Reveal>
      </div>
    </section>
  );
}
