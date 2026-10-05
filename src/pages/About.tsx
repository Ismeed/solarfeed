import { Award, BadgeCheck, Eye, FileCheck2, Handshake, UserRound } from "lucide-react";
import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { PageHero, PhotoSlot, SectionHeader } from "@/components/primitives";
import { Reveal, RevealItem } from "@/components/motion";
import { CtaPanel, PartnerCards } from "@/components/home/Sections";

const PRINCIPLE_ICONS = [FileCheck2, Eye, Handshake];

export default function About() {
  const { d } = useI18n();
  const a = d.about;
  return (
    <>
      <Seo title={d.seo.about.title} description={d.seo.about.description} path="/about" />
      <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} lede={a.hero.lede} />

      <section aria-labelledby="company-h" className="section bg-cream">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader id="company-h" eyebrow={a.company.eyebrow} title={a.company.title} />
            <Reveal className="mt-6 space-y-4 text-[1.125rem] leading-relaxed text-muted">
              {a.company.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5">
            <dl className="card divide-y divide-line">
              {a.company.facts.map((f) => (
                <div key={f.label} className="p-6">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">{f.label}</dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold tracking-[-0.01em] text-navy">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="founder-h" className="section bg-sky">
        <div className="container">
          <Reveal className="card grid gap-8 overflow-hidden p-5 sm:p-8 md:grid-cols-[minmax(0,18rem)_1fr] md:items-center md:gap-12">
            <div className="photo-slot aspect-[4/5]" role="img" aria-label={a.founder.slot}>
              <UserRound className="size-10 text-muted-2" aria-hidden="true" />
              <span>{a.founder.slot}</span>
            </div>
            <div>
              <p className="eyebrow">{a.founder.eyebrow}</p>
              <h2 id="founder-h" className="mt-3 text-h2">{a.founder.name}</h2>
              <p className="mt-2 text-lg font-medium text-muted">{a.founder.role}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-hub/25 bg-hub/5 px-4 py-2 text-[0.95rem] font-semibold text-hub-dark">
                <BadgeCheck className="size-5" aria-hidden="true" />
                {a.founder.badge}
              </p>
              <p className="mt-5 max-w-xl text-muted">{a.founder.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="about-partners-h" className="section bg-cream">
        <div className="container">
          <SectionHeader id="about-partners-h" eyebrow={a.partners.eyebrow} title={a.partners.title} />
          <div className="mt-12">
            <PartnerCards />
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-h" className="section bg-sky">
        <div className="container">
          <SectionHeader id="principles-h" eyebrow={a.principles.eyebrow} title={a.principles.title} />
          <Reveal staggerChildren={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
            {a.principles.items.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              return (
                <RevealItem as="article" key={p.title} className="card p-6 sm:p-7">
                  <Icon className="size-6 text-hub" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="team-h" className="section bg-cream">
        <div className="container">
          <Reveal className="flex items-center gap-3">
            <Award className="size-6 text-hub" aria-hidden="true" />
            <h2 id="team-h" className="text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] tracking-[-0.025em]">{a.team.title}</h2>
          </Reveal>
          <p className="mt-3 text-muted">{a.team.body}</p>
          <Reveal staggerChildren={0.08} className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <RevealItem key={i}>
                <PhotoSlot label={d.common.photoSoon} className="aspect-square" />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
