import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Sun } from "@/components/illustrations/HeroScene";

export default function NotFound() {
  const { d } = useI18n();
  return (
    <>
      <Seo title={d.seo.notFound.title} description={d.seo.notFound.description} path="/404" noindex />
      <section className="bg-sky">
        <div className="container flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20">
          <svg viewBox="0 0 120 120" className="w-24" aria-hidden="true">
            <Sun cx={60} cy={60} r={24} />
          </svg>
          <p className="eyebrow">{d.notFound.eyebrow}</p>
          <h1 className="text-h1">{d.notFound.title}</h1>
          <p className="lede max-w-xl">{d.notFound.body}</p>
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              {d.common.backHome}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
