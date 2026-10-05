import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { I18nProvider } from "@/i18n";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";

const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Pilot = lazy(() => import("@/pages/Pilot"));
const Impact = lazy(() => import("@/pages/Impact"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Every route that is pre-rendered to static HTML at build time. */
export const PRERENDER_ROUTES = ["/", "/how-it-works", "/pilot", "/impact", "/about", "/contact", "/privacy"];

/** Providers and routes shared by the browser entry (main.tsx) and the pre-render entry (entry-server.tsx). */
export function AppShell() {
  return (
    <I18nProvider>
      {/* reducedMotion="user" turns off transform animations for visitors who ask for less motion. */}
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
        <LazyMotion features={domAnimation} strict>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="pilot" element={<Pilot />} />
              <Route path="impact" element={<Impact />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </LazyMotion>
      </MotionConfig>
    </I18nProvider>
  );
}
