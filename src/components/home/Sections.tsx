import { Link } from "react-router-dom";
import { ArrowRight, Code2, FlaskConical, Landmark, Mail, Phone } from "lucide-react";
import { useI18n } from "@/i18n";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeader } from "@/components/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AvatarCooperative, AvatarFarmer, AvatarMinistry } from "@/components/illustrations/Avatars";
import { Sun } from "@/components/illustrations/HeroScene";
import { MAILTO, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ---------------------------------- 05 · Who it's for ---------------------------------- */

const AVATARS = [AvatarFarmer, AvatarCooperative, AvatarMinistry];

export function AudienceSection() {
  const { d } = useI18n();
  const a = d.home.audience;
  return (
    <section aria-labelledby="audience-title" className="section bg-sky">
      <div className="container">
        <SectionHeader id="audience-title" eyebrow={a.eyebrow} title={a.title} />
        <Reveal staggerChildren={0.12} className="mt-14 grid gap-5 md:grid-cols-3">
          {a.cards.map((card, i) => {
            const Avatar = AVATARS[i];
            return (
              <RevealItem as="article" key={card.title} className="card p-7 sm:p-8">
                <div className="size-24 overflow-hidden rounded-full ring-4 ring-white shadow-soft">
                  <Avatar />
                </div>
                <h3 className="mt-6 text-h3">{card.title}</h3>
                <p className="mt-3 text-muted">{card.body}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- 06 · The pilot ---------------------------------- */

export function PilotTimeline() {
  const { d } = useI18n();
  const phases = d.home.pilot.phases;
  return (
    <Reveal as="ol" staggerChildren={0.12} className="relative grid gap-0 md:grid-cols-4 md:gap-6">
      <span aria-hidden="true" className="absolute left-[1.15rem] top-3 h-[calc(100%-1.5rem)] w-px bg-line md:left-0 md:top-[1.15rem] md:h-px md:w-full" />
      {phases.map((p, i) => (
        <RevealItem as="li" key={p.title} className="relative pb-10 pl-14 last:pb-0 md:pb-0 md:pl-0 md:pt-14">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-0 grid size-[2.3rem] place-items-center rounded-full border-4 border-cream font-mono text-xs font-medium",
              i === 0 ? "bg-amber text-navy" : "bg-navy text-white",
            )}
          >
            {i + 1}
          </span>
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-hub">{p.when}</p>
          <h3 className="mt-2 text-h3">{p.title}</h3>
          <p className="mt-2 text-muted">{p.body}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}

export function TargetTiles({ dark = false }: { dark?: boolean }) {
  const { d } = useI18n();
  return (
    <Reveal as="ul" staggerChildren={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {d.home.pilot.targets.map((t) => (
        <RevealItem
          as="li"
          key={t.label}
          className={cn("rounded-card border p-6", dark ? "border-white/10 bg-white/5" : "border-line bg-white shadow-soft")}
        >
          <p className={cn("font-display text-[2rem] font-bold leading-none tracking-[-0.03em]", dark ? "text-amber" : "text-navy")}>{t.value}</p>
          <p className={cn("mt-3", dark ? "text-white/75" : "text-muted")}>{t.label}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}

export function PilotSection() {
  const { d } = useI18n();
  const p = d.home.pilot;
  return (
    <section aria-labelledby="pilot-title" className="section bg-cream">
      <div className="container">
        <SectionHeader id="pilot-title" eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
        <div className="mt-14">
          <PilotTimeline />
        </div>
        <h3 className="mt-20 font-display text-xl font-semibold tracking-[-0.015em]">{p.targetsTitle}</h3>
        <div className="mt-6">
          <TargetTiles />
        </div>
        <Reveal className="mt-10">
          <Link to="/pilot" className="link inline-flex min-h-[44px] items-center gap-2">
            {p.link}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- 07 · Who is behind it ---------------------------------- */

const PARTNER_ICONS = [Code2, FlaskConical, Landmark];

export function PartnerCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const { d } = useI18n();
  const H = headingLevel;
  return (
    <Reveal staggerChildren={0.12} className="grid gap-5 md:grid-cols-3">
      {d.home.team.cards.map((card, i) => {
        const Icon = PARTNER_ICONS[i];
        return (
          <RevealItem as="article" key={card.name} className="card flex flex-col p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-sky text-hub">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-navy px-3 py-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white">{card.role}</span>
            </div>
            <H className="mt-7 text-h3">{card.name}</H>
            <p className="mt-3 text-muted">{card.body}</p>
          </RevealItem>
        );
      })}
    </Reveal>
  );
}

export function TeamSection() {
  const { d } = useI18n();
  const t = d.home.team;
  return (
    <section id="partners" aria-labelledby="partners-title" className="section bg-sky">
      <div className="container">
        <SectionHeader id="partners-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-14">
          <PartnerCards />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

export function FaqSection() {
  const { d } = useI18n();
  const f = d.home.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-cream">
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" eyebrow={f.eyebrow} title={f.title} />
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion type="single" collapsible className="card px-6 sm:px-8">
            {f.items.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Call to action ---------------------------------- */

export function CtaPanel() {
  const { d } = useI18n();
  const c = d.home.cta;
  return (
    <section aria-labelledby="cta-title" className="bg-cream pb-20 md:pb-28">
      <div className="container">
        <Reveal className="on-dark relative overflow-hidden rounded-panel bg-hub px-6 py-14 text-white shadow-lift sm:px-12 md:py-20 lg:px-16">
          <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-14 -top-14 w-40 opacity-70 sm:w-56 md:-right-10 md:-top-10 md:w-80 md:opacity-90">
            <g className="sf-spin-slow">
              <Sun cx={100} cy={100} r={44} spin={false} glow={false} />
            </g>
          </svg>
          <div aria-hidden="true" className="absolute -bottom-32 -left-20 size-80 rounded-full bg-[radial-gradient(circle,rgb(2_27_47/0.35),transparent_65%)]" />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="text-h2 text-white">{c.title}</h2>
            <p className="mt-5 text-[1.125rem] leading-relaxed text-white">{c.body}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" variant="light">
                <a href={MAILTO}>
                  <Mail aria-hidden="true" className="text-hub" />
                  {d.common.emailUs}
                </a>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <a href={PHONE_HREF} aria-label={`${d.common.callUs}: ${PHONE_DISPLAY}`}>
                  <Phone aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
              <Button asChild size="lg" variant="navy">
                <Link to="/contact">
                  {d.common.partnerCta}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
