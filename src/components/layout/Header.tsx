import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useI18n, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function useNavItems() {
  const { d } = useI18n();
  return [
    { to: "/#problem", label: d.nav.problem },
    { to: "/how-it-works", label: d.nav.how },
    { to: "/#numbers", label: d.nav.numbers },
    { to: "/pilot", label: d.nav.pilot },
    { to: "/#partners", label: d.nav.partners },
    { to: "/about", label: d.nav.about },
  ];
}

function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, d } = useI18n();
  const options: { value: Locale; label: string; name: string }[] = [
    { value: "en", label: "EN", name: "English" },
    { value: "ha", label: "HA", name: "Hausa" },
  ];
  return (
    <div role="group" aria-label={d.nav.language} className={cn("inline-flex rounded-full border border-line bg-white p-1", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={locale === o.value}
          onClick={() => setLocale(o.value)}
          className={cn(
            "h-9 min-w-[44px] rounded-full px-3 font-mono text-xs font-medium tracking-wider transition-colors duration-300",
            locale === o.value ? "bg-navy text-white" : "text-muted hover:text-navy",
          )}
        >
          {o.label}
          <span className="sr-only"> {o.name}</span>
        </button>
      ))}
    </div>
  );
}

function isActive(to: string, pathname: string, hash: string) {
  if (to.startsWith("/#")) return pathname === "/" && hash === to.slice(1);
  return pathname.startsWith(to);
}

export function Header() {
  const { d } = useI18n();
  const items = useNavItems();
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-brand",
        scrolled ? "border-line/80 bg-cream/80 shadow-[0_8px_24px_-18px_rgb(2_27_47/0.35)] backdrop-blur-xl" : "border-transparent bg-sky/70 backdrop-blur-md",
      )}
    >
      <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link to="/" className="-ml-1 flex min-h-[44px] items-center rounded-lg px-1" aria-label={d.nav.home}>
          <img src="/brand/solarfeed-logo.svg" alt="SolarFeed Hubs" width={170} height={38} className="h-9 w-auto md:h-10" />
        </Link>

        <nav aria-label={d.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const active = isActive(item.to, pathname, hash);
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium transition-colors duration-300",
                      active ? "text-navy" : "text-muted hover:text-navy",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="absolute inset-x-3.5 bottom-1.5 h-0.5 rounded-full bg-amber" />}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/contact">{d.common.partnerCta}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden" aria-label={d.nav.openMenu}>
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent aria-describedby="mobile-menu-desc">
              <div className="flex h-[var(--header-h)] items-center justify-between border-b border-line px-5">
                <SheetTitle className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">{d.nav.menu}</SheetTitle>
                <SheetDescription id="mobile-menu-desc" className="sr-only">
                  {d.nav.primary}
                </SheetDescription>
                <SheetClose asChild>
                  <Button variant="secondary" size="icon" aria-label={d.nav.closeMenu}>
                    <X aria-hidden="true" />
                  </Button>
                </SheetClose>
              </div>
              <nav aria-label={d.nav.primary} className="flex-1 px-3 py-4">
                <ul>
                  {[...items, { to: "/impact", label: d.nav.impact }, { to: "/contact", label: d.nav.contact }].map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[52px] items-center justify-between rounded-2xl px-4 font-display text-xl font-semibold tracking-[-0.01em] text-navy transition-colors hover:bg-white"
                      >
                        {item.label}
                        <ArrowRight className="size-5 text-hub" aria-hidden="true" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-4 border-t border-line p-5">
                <LanguageToggle />
                <Button asChild size="lg" className="w-full">
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    {d.common.partnerCta}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
