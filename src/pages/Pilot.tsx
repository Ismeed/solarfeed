import { useEffect, useState } from "react";
import { Database, FileText, Languages, NotebookPen } from "lucide-react";
import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { PageHero, PhotoSlot, SectionHeader } from "@/components/primitives";
import { Reveal, RevealItem } from "@/components/motion";
import { CtaPanel, PilotTimeline, TargetTiles } from "@/components/home/Sections";
import { IN_KIND, REQUESTED, useBudgetItems } from "@/lib/budget";
import { euro } from "@/lib/format";
import { fmt } from "@/lib/utils";
import { getSupabase, type PilotPost } from "@/lib/supabase";

function TrialDiagram() {
  const { d } = useI18n();
  const t = d.pilot.trial;
  // Schematic alternating layout; the real allocation is randomised by FUDMA.
  const pens = Array.from({ length: 12 }, (_, i) => ({ n: i + 1, hub: i % 2 === 0 }));
  return (
    <figure className="card p-6 sm:p-8">
      <p className="font-mono text-xs font-medium text-hub">05</p>
      <h3 className="mt-3 text-h3">{t.title}</h3>
      <p className="mt-2 max-w-3xl text-muted">{d.pilot.method.items[4].body}</p>
      <p className="mt-2 font-mono text-[0.8rem] text-navy">{t.lede}</p>
      <div role="img" aria-label={t.alt} className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {pens.map((p) => (
          <div key={p.n} className={p.hub ? "rounded-2xl border-2 border-hub bg-hub/5 p-3" : "rounded-2xl border-2 border-dashed border-muted-2/60 bg-cream p-3"}>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">{fmt(t.pen, { n: p.n })}</p>
            <div className="mt-2 grid grid-cols-5 gap-1" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={p.hub ? "aspect-square rounded-full bg-hub" : "aspect-square rounded-full bg-muted-2/70"} />
              ))}
            </div>
            <p className="mt-2 text-[0.72rem] font-semibold leading-tight text-navy">{p.hub ? t.hub : t.commercial}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-hub" aria-hidden="true" /> {t.hub} · 6 × 10
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-muted-2/70" aria-hidden="true" /> {t.commercial} · 6 × 10
        </span>
        <span className="font-mono text-[0.72rem] text-muted-2">{t.note}</span>
      </figcaption>
    </figure>
  );
}

function BudgetTable() {
  const { d } = useI18n();
  const b = d.pilot.budget;
  const items = useBudgetItems();
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-left">
        <caption className="sr-only">{b.title}</caption>
        <thead className="bg-sky/70">
          <tr className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            <th scope="col" className="px-5 py-3.5 font-medium sm:px-7">{b.colLine}</th>
            <th scope="col" className="px-5 py-3.5 text-right font-medium sm:px-7">{b.colAmount}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.key} className="border-t border-line">
              <th scope="row" className="px-5 py-3.5 font-normal sm:px-7">
                <span className="flex items-center gap-3">
                  <span className="size-3 shrink-0 rounded-[3px]" style={{ backgroundColor: it.color }} aria-hidden="true" />
                  {it.label}
                </span>
              </th>
              <td className="tabular px-5 py-3.5 text-right font-semibold text-navy sm:px-7">{euro(it.value)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-cream">
          <tr className="border-t-2 border-navy/10">
            <th scope="row" className="px-5 pt-4 font-semibold text-navy sm:px-7">{b.requested}</th>
            <td className="tabular px-5 pt-4 text-right font-semibold text-navy sm:px-7">{euro(REQUESTED)}</td>
          </tr>
          <tr>
            <th scope="row" className="px-5 pt-1.5 font-normal text-muted sm:px-7">{b.inKind}</th>
            <td className="tabular px-5 pt-1.5 text-right text-muted sm:px-7">+ {euro(IN_KIND)}</td>
          </tr>
          <tr>
            <th scope="row" className="px-5 pb-5 pt-2 font-display text-lg font-semibold text-navy sm:px-7">{b.total}</th>
            <td className="tabular px-5 pb-5 pt-2 text-right font-display text-xl font-bold text-navy sm:px-7">{euro(REQUESTED + IN_KIND)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

type JournalState = { status: "loading" } | { status: "ready"; posts: PilotPost[] } | { status: "error" };

function Journal() {
  const { d, locale } = useI18n();
  const j = d.pilot.journal;
  const [state, setState] = useState<JournalState>({ status: "loading" });

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setState({ status: "ready", posts: [] });
      return;
    }
    let cancelled = false;
    client
      .then((sb) => sb.from("pilot_posts").select("id, published_at, title, body").order("published_at", { ascending: false }).limit(20))
      .then(({ data, error }) => {
        if (cancelled) return;
        setState(error ? { status: "error" } : { status: "ready", posts: (data ?? []) as PilotPost[] });
      })
      .catch(() => !cancelled && setState({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, []);

  const dateFmt = new Intl.DateTimeFormat(locale === "ha" ? "ha-NG" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div aria-live="polite" aria-busy={state.status === "loading"}>
      {state.status === "loading" && <p className="text-muted">{j.loading}</p>}
      {state.status === "error" && <p className="text-muted">{j.error}</p>}
      {state.status === "ready" && state.posts.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-card border-2 border-dashed border-line bg-white/60 px-6 py-14 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-sky text-hub">
            <NotebookPen className="size-6" aria-hidden="true" />
          </span>
          <p className="font-display text-xl font-semibold tracking-[-0.01em] text-navy">{j.empty}</p>
        </div>
      )}
      {state.status === "ready" && state.posts.length > 0 && (
        <ol className="space-y-5">
          {state.posts.map((post) => (
            <li key={post.id} className="card p-6 sm:p-8">
              <article>
                <time dateTime={post.published_at} className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-hub">
                  {dateFmt.format(new Date(post.published_at))}
                </time>
                <h3 className="mt-2 text-h3">{post.title}</h3>
                {/* Plain text only: paragraphs split on blank lines, never injected as HTML. */}
                <div className="mt-3 space-y-3 text-muted">
                  {post.body.split(/\n\s*\n/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const OUTPUT_ICONS = [FileText, Database, Languages];

export default function Pilot() {
  const { d } = useI18n();
  const p = d.pilot;
  return (
    <>
      <Seo title={d.seo.pilot.title} description={d.seo.pilot.description} path="/pilot" />
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} lede={p.hero.lede} />

      <section aria-labelledby="plan-h" className="section bg-cream">
        <div className="container">
          <Reveal>
            <h2 id="plan-h" className="text-h2">{p.planTitle}</h2>
          </Reveal>
          <div className="mt-12">
            <PilotTimeline />
          </div>
          <h2 className="mt-20 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] tracking-[-0.025em]">{p.targetsTitle}</h2>
          <div className="mt-8">
            <TargetTiles />
          </div>
        </div>
      </section>

      <section aria-labelledby="method-h" className="section bg-sky">
        <div className="container">
          <SectionHeader id="method-h" eyebrow={p.method.eyebrow} title={p.method.title} />
          <Reveal as="ol" staggerChildren={0.07} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {p.method.items.slice(0, 4).map((m, i) => (
              <RevealItem as="li" key={m.title} className="card p-6 sm:p-7">
                <span className="font-mono text-xs font-medium text-hub">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-[-0.01em]">{m.title}</h3>
                <p className="mt-2 text-muted">{m.body}</p>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal className="mt-8">
            <TrialDiagram />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="budget-h" className="section bg-cream">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="budget-h" eyebrow={p.budget.eyebrow} title={p.budget.title} lede={d.home.numbers.budget.lede} />
          </div>
          <Reveal className="lg:col-span-7">
            <BudgetTable />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="outputs-h" className="section bg-sky">
        <div className="container">
          <Reveal>
            <h2 id="outputs-h" className="text-h2">{p.outputs.title}</h2>
          </Reveal>
          <Reveal staggerChildren={0.1} className="mt-10 grid gap-4 md:grid-cols-3">
            {p.outputs.items.map((o, i) => {
              const Icon = OUTPUT_ICONS[i];
              return (
                <RevealItem as="article" key={o.title} className="card p-6 sm:p-7">
                  <Icon className="size-6 text-hub" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.01em]">{o.title}</h3>
                  <p className="mt-2 text-muted">{o.body}</p>
                </RevealItem>
              );
            })}
          </Reveal>
          <Reveal className="mt-14 grid items-center gap-8 md:grid-cols-2">
            <PhotoSlot label={d.common.photoSoon} className="aspect-[16/10]" />
            <div>
              <h3 className="text-h3">{p.site.title}</h3>
              <p className="mt-3 text-muted">{p.site.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="journal" aria-labelledby="journal-h" className="section bg-cream">
        <div className="container max-w-4xl">
          <SectionHeader id="journal-h" eyebrow={p.journal.eyebrow} title={p.journal.title} lede={p.journal.lede} />
          <div className="mt-10">
            <Journal />
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
