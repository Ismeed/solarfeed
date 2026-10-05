import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipProps } from "recharts";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n";
import { FLOCK_EXAMPLES, savingPerYear } from "@/lib/savings";
import { naira, nairaMillions, number } from "@/lib/format";
import { fmt } from "@/lib/utils";

const PRICE = 18000;

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  const { d } = useI18n();
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as { hens: number; saving: number };
  return (
    <div className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm shadow-lift">
      <p className="font-semibold text-navy">{fmt(d.home.numbers.yearly.hens, { count: number(row.hens) })}</p>
      <p className="tabular text-muted">
        {d.home.numbers.yearly.valueLabel}: <span className="font-semibold text-navy">{naira(row.saving)}</span>
      </p>
    </div>
  );
}

export default function YearlySavingsChart() {
  const { d } = useI18n();
  const reduce = useReducedMotion();
  const y = d.home.numbers.yearly;
  const data = FLOCK_EXAMPLES.map((hens) => ({ hens, label: number(hens), saving: savingPerYear(hens, PRICE) }));

  return (
    <>
      <div className="h-[280px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 4, bottom: 8, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#DCE3E8" strokeWidth={1} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: "#5B6F80", strokeWidth: 1 }}
              tick={{ fill: "#3D5466", fontSize: 13, fontFamily: "Figtree" }}
              label={{ value: y.axis, position: "insideBottom", offset: -6, fill: "#5B6F80", fontSize: 12, fontFamily: "JetBrains Mono" }}
              height={44}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              ticks={[0, 2_500_000, 5_000_000, 7_500_000, 10_000_000]}
              domain={[0, 10_000_000]}
              tickFormatter={(v: number) => (v === 0 ? "₦0" : `₦${v / 1_000_000}m`)}
              tick={{ fill: "#5B6F80", fontSize: 12, fontFamily: "JetBrains Mono" }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgb(14 110 197 / 0.06)" }} />
            <Bar dataKey="saving" fill="#0E6EC5" barSize={24} radius={[4, 4, 0, 0]} isAnimationActive={!reduce} animationDuration={1100} animationEasing="ease-out">
              <LabelList
                dataKey="saving"
                position="top"
                offset={8}
                formatter={(v: number) => nairaMillions(v)}
                style={{ fill: "#021B2F", fontSize: 13, fontWeight: 700, fontFamily: "Sora" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="sr-only">
      <table>
        <caption>{y.tableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">{y.axis}</th>
            <th scope="col">{y.valueLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.hens}>
              <td>{r.label}</td>
              <td>{nairaMillions(r.saving)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
