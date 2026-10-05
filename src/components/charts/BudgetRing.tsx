import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n";
import { euro } from "@/lib/format";
import { cn } from "@/lib/utils";
import { IN_KIND, REQUESTED, useBudgetItems } from "@/lib/budget";

function ActiveShape(props: PieSectorDataItem) {
  const { cx, cy, innerRadius = 0, outerRadius = 0, startAngle, endAngle, fill, cornerRadius } = props;
  return (
    <Sector cx={cx} cy={cy} innerRadius={innerRadius - 2} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} cornerRadius={cornerRadius} />
  );
}

export default function BudgetRing() {
  const { d } = useI18n();
  const b = d.home.numbers.budget;
  const reduce = useReducedMotion();
  const items = useBudgetItems();
  const [active, setActive] = useState<number | undefined>(undefined);

  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
      <div className="relative mx-auto aspect-square w-full max-w-[300px]">
        <p className="sr-only">{b.chartLabel}</p>
        <div className="absolute inset-0" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius="68%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={1.2}
              rootTabIndex={-1}
              cornerRadius={4}
              stroke="#FFFFFF"
              strokeWidth={2}
              activeIndex={active}
              activeShape={ActiveShape}
              onMouseEnter={(_, i) => setActive(i)}
              onMouseLeave={() => setActive(undefined)}
              isAnimationActive={!reduce}
              animationDuration={1200}
            >
              {items.map((it) => (
                <Cell key={it.key} fill={it.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
          {active === undefined ? (
            <>
              <span className="font-display text-[1.9rem] font-bold tracking-[-0.03em] text-navy">{euro(REQUESTED)}</span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-2">{b.requested}</span>
            </>
          ) : (
            <>
              <span className="font-display text-[1.7rem] font-bold tracking-[-0.03em] text-navy">{euro(items[active].value)}</span>
              <span className="max-w-[9rem] text-[0.8rem] leading-tight text-muted">{items[active].label}</span>
            </>
          )}
        </div>
      </div>

      <div>
        <table className="w-full text-left">
          <caption className="sr-only">{b.title}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{d.pilot.budget.colLine}</th>
              <th scope="col">{d.pilot.budget.colAmount}</th>
              <th scope="col" className="hidden sm:table-cell">%</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr
                key={it.key}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(undefined)}
                className={cn("border-b border-line transition-colors duration-300", active === i && "bg-sky/70")}
              >
                <th scope="row" className="py-3 pr-3 font-normal">
                  <span className="flex items-center gap-3">
                    <span className="size-3 shrink-0 rounded-[3px]" style={{ backgroundColor: it.color }} aria-hidden="true" />
                    <span className="text-ink">{it.label}</span>
                  </span>
                </th>
                <td className="tabular whitespace-nowrap py-3 pr-3 text-right font-semibold text-navy">{euro(it.value)}</td>
                <td className="tabular hidden w-14 py-3 text-right font-mono text-[0.8rem] text-muted-2 sm:table-cell">{Math.round(it.share * 100)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="pt-4 text-left font-semibold text-navy">{b.requested}</th>
              <td className="tabular pr-3 pt-4 text-right font-semibold text-navy">{euro(REQUESTED)}</td>
              <td className="hidden sm:table-cell" />
            </tr>
            <tr>
              <th scope="row" className="pt-1.5 text-left font-normal text-muted">{b.inKind}</th>
              <td className="tabular pr-3 pt-1.5 text-right text-muted">+ {euro(IN_KIND)}</td>
              <td className="hidden sm:table-cell" />
            </tr>
            <tr>
              <th scope="row" className="pt-1.5 text-left font-display font-semibold text-navy">{b.total}</th>
              <td className="tabular pr-3 pt-1.5 text-right font-display text-lg font-bold text-navy">{euro(REQUESTED + IN_KIND)}</td>
              <td className="hidden sm:table-cell" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
