import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/primitives";
import { EMAIL, MAILTO } from "@/lib/site";

/** Renders the contact email inside a paragraph as a mailto link. */
function withEmailLink(text: string) {
  const i = text.indexOf(EMAIL);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a href={MAILTO} className="link">
        {EMAIL}
      </a>
      {text.slice(i + EMAIL.length)}
    </>
  );
}

export default function Privacy() {
  const { d } = useI18n();
  const p = d.privacy;
  return (
    <>
      <Seo title={d.seo.privacy.title} description={d.seo.privacy.description} path="/privacy" />
      <PageHero eyebrow={p.eyebrow} title={p.title} lede={p.intro} />
      <section className="section bg-cream">
        <div className="container grid gap-12 lg:grid-cols-12">
          <nav aria-label={p.title} className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 rounded-card border border-line bg-white p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">{p.updated}</p>
              <ol className="mt-4 space-y-1">
                {p.sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#privacy-${i}`} className="flex min-h-[40px] items-center gap-3 rounded-lg text-[0.95rem] text-muted transition-colors hover:text-navy">
                      <span className="font-mono text-xs text-hub">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-2xl lg:col-span-8">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-2 lg:hidden">{p.updated}</p>
            {p.sections.map((s, i) => (
              <section key={s.title} id={`privacy-${i}`} aria-labelledby={`privacy-h-${i}`} className="border-b border-line py-8 first:pt-0 last:border-0 lg:first:pt-0">
                <h2 id={`privacy-h-${i}`} className="text-h3">
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-ink/90">
                  {s.paragraphs.map((para) => (
                    <p key={para}>{withEmailLink(para)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
