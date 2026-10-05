import { Link } from "react-router-dom";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/illustrations/HeroScene";

export function Hero() {
  const { d } = useI18n();
  const h = d.home.hero;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-sky">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(232_163_61/0.22),transparent_62%)]" />
        <div className="absolute -left-40 top-20 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.9),transparent_65%)]" />
      </div>

      <div className="container relative pt-10 sm:pt-14 md:pt-16">
          <p className="sf-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-white/85 py-2 pl-3 pr-4 text-[0.9rem] font-medium text-navy shadow-soft"
          >
            <span className="size-2.5 rounded-full bg-amber animate-pulse-dot" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 style={{ animationDelay: "0.1s" }} id="hero-title" className="sf-rise mt-6 text-h1 font-bold">
            {h.title1}
            <br />
            <span className="text-hub">{h.title2}</span>
          </h1>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p style={{ animationDelay: "0.2s" }} className="sf-rise lede mt-6 max-w-2xl text-[1.125rem] md:text-[1.25rem]">
            {d.common.oneLiner}
          </p>
          <div style={{ animationDelay: "0.3s" }} className="sf-rise mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/how-it-works">
                {h.ctaPrimary}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#numbers">
                <BarChart3 aria-hidden="true" className="text-hub" />
                {h.ctaSecondary}
              </a>
            </Button>
          </div>
        </div>

        <aside
          aria-labelledby="hero-targets"
          style={{ animationDelay: "0.45s" }}
          className="sf-rise relative z-10 lg:col-span-5 lg:mt-6 lg:flex lg:items-start lg:justify-end"
        >
          <div className="w-full max-w-sm rounded-panel border border-white bg-white/90 p-6 shadow-float backdrop-blur-sm sm:p-7">
            <h2 id="hero-targets" className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-hub">
              {h.cardLabel}
            </h2>
            <dl className="mt-4 divide-y divide-line">
              {h.cardItems.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-muted">{item.label}</dt>
                  <dd className="font-display text-[1.875rem] font-bold leading-none tracking-[-0.03em] text-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-2">
              <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
              {h.cardNote}
            </p>
          </div>
        </aside>
        </div>
      </div>

      <div
        style={{ animationDelay: "0.2s" }}
        className="sf-fade relative -mt-2 h-[250px] lg:-mt-24 sm:h-[300px] md:h-[360px] lg:h-[420px] 2xl:h-[460px]"
      >
        <HeroScene title={h.illustrationAlt} />
      </div>
    </section>
  );
}
