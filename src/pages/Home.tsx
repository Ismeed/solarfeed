import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { HowSection } from "@/components/home/HowSection";
import { SoftwareSection } from "@/components/home/SoftwareSection";
import { NumbersSection } from "@/components/home/NumbersSection";
import { AudienceSection, CtaPanel, FaqSection, PilotSection, TeamSection } from "@/components/home/Sections";

function PartnerStrip() {
  const { d } = useI18n();
  return (
    <section aria-label={d.home.partners.label} className="on-dark bg-navy">
      <div className="container flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.16em] text-amber">{d.home.partners.label}</p>
        <ul className="flex flex-col gap-2 font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-white sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          {d.home.partners.names.map((name, i) => (
            <li key={name} className="flex items-center gap-8">
              {i > 0 && <span aria-hidden="true" className="hidden size-1.5 rounded-full bg-white/30 sm:block" />}
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { d } = useI18n();
  return (
    <>
      <Seo title={d.seo.home.title} description={d.seo.home.description} path="/" />
      <Hero />
      <PartnerStrip />
      <ProblemSection />
      <HowSection />
      <SoftwareSection />
      <NumbersSection />
      <AudienceSection />
      <PilotSection />
      <TeamSection />
      <FaqSection />
      <CtaPanel />
    </>
  );
}
