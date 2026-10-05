import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Languages } from "lucide-react";
import { useI18n } from "@/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Scrolls to #hash targets (which may render late on lazy pages) or to the top on navigation. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    let tries = 0;
    let timer: number;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: "start" });
        // Off-screen sections use content-visibility and may change height once rendered; settle again.
        timer = window.setTimeout(() => el.scrollIntoView({ block: "start" }), 350);
        // Move focus for keyboard and screen-reader users without a second scroll jump.
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      } else if (tries++ < 20) {
        timer = window.setTimeout(seek, 50);
      }
    };
    seek();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

function LanguageNotice() {
  const { isFallback, d } = useI18n();
  if (!isFallback) return null;
  return (
    <div role="status" className="border-b border-amber/40 bg-amber/15">
      <p className="container flex items-start gap-2 py-2.5 text-sm text-navy">
        <Languages className="mt-0.5 size-4 shrink-0 text-amber-text" aria-hidden="true" />
        <span>{d.nav.langNotice}</span>
      </p>
    </div>
  );
}

function PageFallback() {
  return <div className="min-h-[70vh]" aria-busy="true" />;
}

export function Layout() {
  const { d } = useI18n();
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-full bg-navy px-5 py-3 font-semibold text-white shadow-lift transition-transform focus:translate-y-0"
      >
        {d.common.skip}
      </a>
      <ScrollManager />
      <Header />
      <LanguageNotice />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
