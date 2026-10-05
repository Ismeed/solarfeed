import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeader } from "@/components/primitives";
import { SpotQualityGate, SpotSolarCurve, SpotSolarMill } from "@/components/illustrations/Spots";
import { cn } from "@/lib/utils";

const SPOTS = [SpotSolarMill, SpotQualityGate, SpotSolarCurve];

export function StepsStrip({ steps, className }: { steps: { title: string; body: string }[]; className?: string }) {
  return (
    <Reveal as="ol" staggerChildren={0.08} className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6", className)}>
      {steps.map((s, i) => (
        <RevealItem as="li" key={s.title} className="relative rounded-card border border-line bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy font-mono text-sm font-medium text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="hidden h-px flex-1 bg-[repeating-linear-gradient(90deg,rgb(var(--hub))_0_6px,transparent_6px_12px)] xl:block" />
            )}
          </div>
          <h4 className="mt-4 font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-navy">{s.title}</h4>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}

export function HowSection() {
  const { d } = useI18n();
  const h = d.home.how;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section bg-sky">
      <div className="container">
        <SectionHeader id="how-title" eyebrow={h.eyebrow} title={h.title} lede={h.lede} />

        <Reveal staggerChildren={0.12} className="mt-14 grid gap-5 lg:grid-cols-3">
          {h.parts.map((part, i) => {
            const Spot = SPOTS[i];
            return (
              <RevealItem as="article" key={part.title} className="card group overflow-hidden p-3 transition-shadow duration-500 ease-brand hover:shadow-lift">
                <div className="overflow-hidden rounded-[1.1rem]">
                  <Spot />
                </div>
                <div className="px-4 pb-5 pt-6">
                  <p className="eyebrow">{part.tag}</p>
                  <h3 className="mt-2 text-h3">{part.title}</h3>
                  <p className="mt-3 text-muted">{part.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>

        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold tracking-[-0.015em]">{h.stepsTitle}</h3>
          <StepsStrip steps={h.steps} className="mt-6" />
        </div>

        <Reveal className="mt-10">
          <Link to="/how-it-works" className="link inline-flex min-h-[44px] items-center gap-2">
            {h.link}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
