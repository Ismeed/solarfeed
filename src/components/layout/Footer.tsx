import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/i18n";
import { fmt } from "@/lib/utils";
import { EMAIL, MAILTO, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export function Footer() {
  const { d } = useI18n();
  const links = [
    { to: "/", label: d.nav.homeLink },
    { to: "/how-it-works", label: d.nav.how },
    { to: "/pilot", label: d.nav.pilot },
    { to: "/impact", label: d.nav.impact },
    { to: "/about", label: d.nav.about },
    { to: "/contact", label: d.nav.contact },
  ];

  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white/80">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(14_110_197/0.28),transparent_65%)]" />
      <div className="container relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link to="/" className="inline-flex min-h-[44px] items-center rounded-lg" aria-label={d.nav.home}>
            <img src="/brand/solarfeed-logo-dark.svg" alt="SolarFeed Hubs" width={190} height={43} className="h-10 w-auto" loading="lazy" />
          </Link>
          <p className="mt-5 max-w-sm text-white/75">{d.footer.description}</p>
          <p className="mt-6 font-mono text-xs tracking-wide text-white/60">{d.footer.projectOf}</p>
        </div>

        <nav aria-label={d.footer.site} className="md:col-span-3">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amber">{d.footer.site}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-[44px] items-center text-white/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amber">{d.footer.contact}</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={MAILTO} className="inline-flex min-h-[44px] items-center gap-3 break-all text-white/80 transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-amber" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={PHONE_HREF} className="inline-flex min-h-[44px] items-center gap-3 text-white/80 transition-colors hover:text-white">
                <Phone className="size-4 shrink-0 text-amber" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-3 pt-2.5 text-white/80">
              <MapPin className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />
              <address className="not-italic">{d.common.address}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{d.footer.disclaimer}</p>
          <div className="flex shrink-0 items-center gap-5">
            <Link to="/privacy" className="inline-flex min-h-[44px] items-center text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
              {d.footer.privacy}
            </Link>
            <span suppressHydrationWarning>{fmt(d.footer.copyright, { year: new Date().getFullYear() })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
