import { Check, Cpu, Clock, Sun, Wheat, Banknote, Smartphone, WifiOff, ShieldCheck, Users } from "lucide-react";
import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { PageHero, SectionHeader } from "@/components/primitives";
import { Reveal, RevealItem } from "@/components/motion";
import { SpotQualityGate, SpotSolarCurve, SpotSolarMill } from "@/components/illustrations/Spots";
import { HubCutaway } from "@/components/illustrations/Cutaway";
import { DayAtTheHub } from "@/components/DayAtTheHub";
import { CtaPanel } from "@/components/home/Sections";
import { cn } from "@/lib/utils";

const SPOTS = [SpotSolarMill, SpotQualityGate, SpotSolarCurve];
const MODEL_ICONS = [Wheat, Banknote, Smartphone, WifiOff, ShieldCheck, Users];

export default function HowItWorks() {
  const { d } = useI18n();
  const h = d.how;
  return (
    <>
      <Seo title={d.seo.how.title} description={d.seo.how.description} path="/how-it-works" />
      <PageHero eyebrow={h.hero.eyebrow} title={h.hero.title} lede={h.hero.lede} />

      {/* The three parts, expanded */}
      <section aria-label={d.home.how.title} className="section bg-cream">
        <div className="container space-y-6">
          {h.parts.map((part, i) => {
            const Spot = SPOTS[i];
            const Icon = [Sun, Cpu, Clock][i];
            return (
              <Reveal key={part.title} className="card grid items-center gap-8 overflow-hidden p-4 sm:p-6 lg:grid-cols-2 lg:gap-14 lg:p-8">
                <div className={cn("overflow-hidden rounded-[1.1rem]", i % 2 === 1 && "lg:order-2")}>
                  <Spot />
                </div>
                <div className="px-2 pb-2 sm:px-0">
                  <p className="eyebrow flex items-center gap-2">
                    <Icon className="size-4" aria-hidden="true" />
                    {part.tag}
                  </p>
                  <h2 className="mt-3 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] leading-tight tracking-[-0.025em]">{part.title}</h2>
                  <p className="mt-4 text-muted">{part.body}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {part.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-[0.95rem] text-ink">
                        <Check className="mt-1 size-4 shrink-0 text-hub" strokeWidth={3} aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Cutaway */}
      <section aria-labelledby="cutaway-h" className="section bg-sky">
        <div className="container">
          <SectionHeader id="cutaway-h" eyebrow={h.cutaway.eyebrow} title={h.cutaway.title} lede={h.cutaway.lede} />
          <div className="mt-12 grid gap-6">
            <Reveal className="card overflow-hidden p-2 sm:p-3">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={h.cutaway.alt}>
                <div className="min-w-[640px]">
                  <HubCutaway title={h.cutaway.alt} />
                </div>
              </div>
              <p className="px-2 pb-1 pt-2 text-center font-mono text-[0.7rem] text-muted-2 md:hidden">{h.cutaway.swipe}</p>
            </Reveal>
            <Reveal as="ol" staggerChildren={0.06} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {h.cutaway.labels.map((l, i) => (
                <RevealItem as="li" key={l.title} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy font-mono text-sm font-medium text-white ring-2 ring-amber/80">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-[-0.01em]">{l.title}</h3>
                    <p className="mt-0.5 text-[0.92rem] leading-relaxed text-muted">{l.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Six steps */}
      <section aria-labelledby="steps-h" className="section bg-cream">
        <div className="container">
          <SectionHeader id="steps-h" eyebrow={h.steps.eyebrow} title={h.steps.title} />
          <Reveal as="ol" staggerChildren={0.08} className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {h.steps.items.map((s, i) => (
              <RevealItem as="li" key={s.title} className="bg-white p-7 sm:p-8">
                <span aria-hidden="true" className="font-display text-[2.75rem] font-bold leading-none tracking-[-0.04em] text-hub/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-h3">{s.title}</h3>
                <p className="mt-2.5 text-muted">{s.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Day at the hub */}
      <section aria-labelledby="day-h" className="section bg-sky">
        <div className="container">
          <SectionHeader id="day-h" eyebrow={h.day.eyebrow} title={h.day.title} lede={h.day.lede} />
          <Reveal className="mt-12">
            <DayAtTheHub />
          </Reveal>
        </div>
      </section>

      {/* Operating model */}
      <section aria-labelledby="model-h" className="section bg-cream">
        <div className="container">
          <SectionHeader id="model-h" eyebrow={h.model.eyebrow} title={h.model.title} />
          <Reveal staggerChildren={0.07} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {h.model.items.map((m, i) => {
              const Icon = MODEL_ICONS[i];
              return (
                <RevealItem as="article" key={m.title} className="card p-6">
                  <span className="grid size-11 place-items-center rounded-2xl bg-sky text-hub">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em]">{m.title}</h3>
                  <p className="mt-2 text-muted">{m.body}</p>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
