import { m, animate, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (gap = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "header";
  delay?: number;
  /** Stagger direct <RevealItem> children instead of fading the block as one. */
  staggerChildren?: number;
  amount?: number;
};

/** Fade + 24px rise when scrolled into view, once. MotionConfig handles reduced motion globally. */
export function Reveal({ children, className, as = "div", delay = 0, staggerChildren, amount = 0.15 }: RevealProps) {
  const Comp = m[as];
  const variants: Variants =
    staggerChildren !== undefined
      ? stagger(staggerChildren, delay)
      : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } } };
  return (
    <Comp className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}

/** False during the server render and the first client render, so markup matches the pre-rendered HTML. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** True once the element has entered the viewport (or immediately under reduced motion). */
export function useSeen<T extends Element>(amount = 0.35) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const hydrated = useHydrated();
  const prefersReduced = useReducedMotion();
  const reduce = hydrated && !!prefersReduced;
  return { ref, seen: inView || reduce, reduce };
}

type CountUpProps = {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
};

/**
 * Counts up once when visible. Screen readers get the final value straight away;
 * the moving number is hidden from them.
 */
export function CountUp({ to, format = (n) => Math.round(n).toString(), duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(value)}</span>
      <span className="sr-only">{format(to)}</span>
    </span>
  );
}
