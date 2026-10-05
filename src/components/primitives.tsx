import type { ReactNode } from "react";
import { ImageIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, lede, id, align = "left", className, as: H = "h2" }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <H id={id} className={cn("mt-4", H === "h1" ? "text-h1" : "text-h2")}>
        {title}
      </H>
      {lede && <p className="lede mt-5">{lede}</p>}
    </Reveal>
  );
}

/** Small mono tag: "Planning estimate", "Illustrative", "Sample data". Text, never colour alone. */
export function Tag({ children, tone = "amber", className }: { children: ReactNode; tone?: "amber" | "blue" | "dark" | "alert"; className?: string }) {
  const tones = {
    amber: "border-amber/60 bg-white text-amber-text",
    blue: "border-hub/30 bg-hub/5 text-hub",
    dark: "border-amber/40 bg-amber/10 text-amber",
    alert: "border-alert/40 bg-alert/5 text-alert",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase leading-none tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SourceNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-start gap-1.5 font-mono text-[0.72rem] leading-relaxed tracking-wide text-muted-2", className)}>
      <Info className="mt-[0.15em] size-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function PhotoSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("photo-slot", className)} role="img" aria-label={label}>
      <ImageIcon className="size-7 text-muted-2" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/** Page-level hero used by every page except home. */
export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-sky">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(232_163_61/0.28),transparent_65%)]" />
      {/* CSS entrance (not a scroll reveal) so the heading is visible in the pre-rendered HTML. */}
      <div className="container relative pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="max-w-4xl">
          <p className="eyebrow sf-rise">{eyebrow}</p>
          <h1 className="sf-rise mt-4 text-h1" style={{ animationDelay: "0.08s" }}>
            {title}
          </h1>
          <p className="lede sf-rise mt-5" style={{ animationDelay: "0.16s" }}>
            {lede}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
