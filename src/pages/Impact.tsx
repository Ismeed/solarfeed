import { ExternalLink, Fuel, Gauge, Route, ShieldCheck, Users, Wheat, Wrench } from "lucide-react";
import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { PageHero, SectionHeader, SourceNote, Tag } from "@/components/primitives";
import { Reveal, RevealItem } from "@/components/motion";
import { CtaPanel } from "@/components/home/Sections";

const ENV_ICONS = [Fuel, Route, Gauge];
const JOB_ICONS = [Users, Wheat, Wrench];

export default function Impact() {
  const { d } = useI18n();
  const im = d.impact;
  return (
    <>
      <Seo title={d.seo.impact.title} description={d.seo.impact.description} path="/impact" />
      <PageHero eyebrow={im.hero.eyebrow} title={im.hero.title} lede={im.hero.lede} />

      <section aria-labelledby="impact-problem" className="section bg-cream">
        <div className="container">
          <SectionHeader id="impact-problem" eyebrow={im.problem.eyebrow} title={im.problem.title} />
          <Reveal as="ul" staggerChildren={0.07} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {im.problem.items.map((it) => (
              <RevealItem as="li" key={it.value} className="card flex flex-col p-6 sm:p-7">
                <p className="font-display text-stat font-bold text-navy">{it.value}</p>
                <p className="mt-3 flex-1 text-ink">{it.body}</p>
                <SourceNote className="mt-5 border-t border-line pt-4">{it.source}</SourceNote>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="impact-env" className="section on-dark bg-navy">
        <div className="container">
          <SectionHeader id="impact-env" eyebrow={im.environment.eyebrow} title={<span className="text-white">{im.environment.title}</span>} />
          <Reveal className="mt-5 max-w-3xl">
            <p className="text-[1.125rem] leading-relaxed text-white/75">{im.environment.body}</p>
          </Reveal>
          <Reveal staggerChildren={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
            {im.environment.points.map((p, i) => {
              const Icon = ENV_ICONS[i];
              return (
                <RevealItem as="article" key={p.title} className="rounded-card border border-white/10 bg-white/5 p-6 sm:p-7">
                  <Icon className="size-6 text-amber" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.01em] text-white">{p.title}</h3>
                  <p className="mt-2 text-white/70">{p.body}</p>
                </RevealItem>
              );
            })}
          </Reveal>
          <Reveal className="mt-8 rounded-card border border-amber/30 bg-amber/10 p-6 sm:p-7">
            <p className="text-white/85">{im.environment.evidence}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="impact-safety" className="section bg-sky">
        <div className="container grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader id="impact-safety" eyebrow={im.safety.eyebrow} title={im.safety.title} lede={im.safety.body} />
          </div>
          <Reveal as="ul" staggerChildren={0.08} className="space-y-3">
            {im.safety.points.map((p) => (
              <RevealItem as="li" key={p} className="card flex items-start gap-4 p-5">
                <ShieldCheck className="mt-0.5 size-6 shrink-0 text-hub" aria-hidden="true" />
                <span className="text-ink">{p}</span>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="impact-jobs" className="section bg-cream">
        <div className="container">
          <SectionHeader id="impact-jobs" eyebrow={im.jobs.eyebrow} title={im.jobs.title} />
          <Reveal staggerChildren={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
            {im.jobs.points.map((p, i) => {
              const Icon = JOB_ICONS[i];
              return (
                <RevealItem as="article" key={p.title} className="card p-6 sm:p-7">
                  <span className="grid size-11 place-items-center rounded-2xl bg-sky text-hub">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="impact-data" className="section bg-sky">
        <div className="container">
          <Reveal className="card grid gap-8 p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12">
            <span className="grid size-16 place-items-center rounded-3xl bg-navy text-amber">
              <ShieldCheck className="size-8" aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">{im.data.eyebrow}</p>
              <h2 id="impact-data" className="mt-3 text-h2">{im.data.title}</h2>
              <p className="lede mt-5 max-w-3xl">{im.data.body}</p>
              <p className="mt-5 text-sm text-muted-2">{im.data.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sources" aria-labelledby="impact-sources" className="section bg-cream">
        <div className="container max-w-4xl">
          <SectionHeader id="impact-sources" eyebrow={im.sources.eyebrow} title={im.sources.title} />
          <Reveal className="mt-8 flex items-start gap-3 rounded-2xl border border-amber/40 bg-amber/10 p-5">
            <Tag className="mt-0.5 shrink-0">{d.common.estimate}</Tag>
            <p className="text-[0.95rem] text-ink">{im.sources.estimatesNote}</p>
          </Reveal>
          <ol className="mt-8 space-y-0 divide-y divide-line border-y border-line">
            {im.sources.items.map((s, i) => (
              <li key={s.cite} className="grid gap-1 py-5 sm:grid-cols-[2.5rem_1fr]">
                <span className="font-mono text-sm text-muted-2">[{i + 1}]</span>
                <div>
                  <p className="font-semibold text-navy">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-start gap-1.5 font-semibold">
                        <span>{s.cite}</span>
                        <ExternalLink className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
                        <span className="sr-only">{d.common.opensNewTab}</span>
                      </a>
                    ) : (
                      s.cite
                    )}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
