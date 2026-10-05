import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useI18n, type Dict } from "@/i18n";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/primitives";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Checkbox, Input, Label, Select, Textarea } from "@/components/ui/form-controls";
import { EMAIL, MAILTO, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { getSupabase, type PartnerEnquiry } from "@/lib/supabase";
import { fmt } from "@/lib/utils";

const AUDIENCES = ["funder", "cooperative", "government", "supplier", "farmer", "researcher", "media", "other"] as const;

function makeSchema(e: Dict["contact"]["form"]["errors"]) {
  return z.object({
    fullName: z.string().trim().min(2, e.fullName).max(120, e.fullName),
    organisation: z.string().trim().min(2, e.organisation).max(160, e.organisation),
    role: z.string().trim().min(2, e.role).max(120, e.role),
    email: z.string().trim().email(e.email).max(254, e.email),
    phone: z
      .string()
      .trim()
      .max(40, e.phone)
      .refine((v) => v === "" || /^[+()\d\s-]{7,}$/.test(v), e.phone),
    audience: z.enum(AUDIENCES, { errorMap: () => ({ message: e.audience }) }),
    message: z.string().trim().min(20, e.message).max(4000, e.messageMax),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
    /** Honeypot: real people never see or fill this. */
    website: z.string().max(0).optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof makeSchema>>;
type FieldName = Exclude<keyof FormValues, "website">;

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted-2">({optional})</span>}
      </Label>
      <div className="mt-2">{children}</div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string; email: string } | { kind: "failed"; message: string };

function EnquiryForm() {
  const { d } = useI18n();
  const f = d.contact.form;
  const schema = useMemo(() => makeSchema(f.errors), [f.errors]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [submitErrors, setSubmitErrors] = useState<FieldErrors<FormValues> | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", organisation: "", role: "", email: "", phone: "", message: "", website: "" } as Partial<FormValues>,
    mode: "onTouched",
    // The error summary takes focus instead, and links to each field.
    shouldFocusError: false,
  });

  useEffect(() => {
    if (status.kind === "sent") successRef.current?.focus();
  }, [status.kind]);

  const describedBy = (name: FieldName, hint = false) =>
    [hint ? `${name}-hint` : "", errors[name] ? `${name}-error` : ""].filter(Boolean).join(" ") || undefined;

  const onInvalid = (errs: FieldErrors<FormValues>) => setSubmitErrors({ ...errs });

  useEffect(() => {
    if (!submitErrors) return;
    // Wait one tick: react-hook-form publishes its error state on the following render.
    const t = window.setTimeout(() => summaryRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [submitErrors]);

  const onSubmit = async (values: FormValues) => {
    setSubmitErrors(null);
    if (values.website) return; // bot
    const client = getSupabase();
    if (!client) {
      setStatus({ kind: "failed", message: f.notConfigured });
      return;
    }
    setStatus({ kind: "sending" });
    const row: PartnerEnquiry = {
      full_name: values.fullName,
      organisation: values.organisation,
      role: values.role,
      email: values.email,
      phone: values.phone || null,
      audience: values.audience,
      message: values.message,
      consent: values.consent,
    };
    try {
      const sb = await client;
      // Insert only: row-level security lets the public add enquiries but never read them back.
      const { error } = await sb.from("partner_enquiries").insert(row);
      if (error) throw error;
      setStatus({ kind: "sent", name: values.fullName.split(" ")[0], email: values.email });
      reset();
    } catch {
      setStatus({ kind: "failed", message: f.failed });
    }
  };

  if (status.kind === "sent") {
    return (
      <div className="flex flex-col items-start gap-5 py-6" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-hub/10 text-hub">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="text-h3 outline-none">
          {fmt(f.successTitle, { name: status.name })}
        </h2>
        <p className="text-muted">{fmt(f.successBody, { email: status.email })}</p>
        <Button variant="secondary" onClick={() => setStatus({ kind: "idle" })}>
          {f.sendAnother}
        </Button>
      </div>
    );
  }

  const errorList = submitErrors ? (Object.keys(submitErrors) as FieldName[]).filter((k) => errors[k]) : [];

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-6">
      <h2 className="text-h3">{f.title}</h2>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl border border-alert/40 bg-alert/5 p-4 outline-none">
          <p className="flex items-center gap-2 font-semibold text-alert">
            <AlertCircle className="size-5" aria-hidden="true" />
            {fmt(f.errorSummary, { count: errorList.length })}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-9 text-sm text-ink">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="underline underline-offset-2 hover:text-alert">
                  {errors[k]?.message as string}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label={f.fullName} error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} aria-required="true" aria-describedby={describedBy("fullName")} {...register("fullName")} />
        </Field>
        <Field id="email" label={f.email} error={errors.email?.message}>
          <Input id="email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} aria-required="true" aria-describedby={describedBy("email")} {...register("email")} />
        </Field>
        <Field id="organisation" label={f.organisation} hint={f.organisationHint} error={errors.organisation?.message}>
          <Input id="organisation" autoComplete="organization" aria-invalid={!!errors.organisation} aria-required="true" aria-describedby={describedBy("organisation", true)} {...register("organisation")} />
        </Field>
        <Field id="role" label={f.role} error={errors.role?.message}>
          <Input id="role" autoComplete="organization-title" aria-invalid={!!errors.role} aria-required="true" aria-describedby={describedBy("role")} {...register("role")} />
        </Field>
        <Field id="phone" label={f.phone} optional={f.optional} error={errors.phone?.message}>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} {...register("phone")} />
        </Field>
        <Field id="audience" label={f.audience} error={errors.audience?.message}>
          <Select id="audience" defaultValue="" aria-invalid={!!errors.audience} aria-required="true" aria-describedby={describedBy("audience")} {...register("audience")}>
            <option value="" disabled>
              {f.audiencePlaceholder}
            </option>
            {f.audiences.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field id="message" label={f.message} error={errors.message?.message}>
        <Textarea id="message" rows={6} aria-invalid={!!errors.message} aria-required="true" aria-describedby={describedBy("message")} {...register("message")} />
      </Field>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <Checkbox
                id="consent"
                ref={field.ref}
                checked={field.value === true}
                onCheckedChange={(v) => field.onChange(v === true ? true : undefined)}
                onBlur={field.onBlur}
                aria-invalid={!!errors.consent}
                aria-required="true"
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5"
              />
            )}
          />
          <Label htmlFor="consent" className="cursor-pointer font-normal leading-relaxed text-ink">
            {f.consent}{" "}
            <Link to="/privacy" className="link font-semibold">
              {f.privacyLink}
            </Link>
          </Label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="ml-9 mt-2 flex items-start gap-1.5 text-sm font-medium text-alert">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      {status.kind === "failed" && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-alert/40 bg-alert/5 p-4 text-ink">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-alert" aria-hidden="true" />
          <p>
            {status.message}{" "}
            <a href={MAILTO} className="link">
              {EMAIL}
            </a>
          </p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={status.kind === "sending"} className="w-full sm:w-auto">
        {status.kind === "sending" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            {f.sending}
          </>
        ) : (
          <>
            {f.submit}
            <Send aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}

function MapPlaceholder() {
  const { d } = useI18n();
  const m = d.contact.details;
  return (
    <figure className="overflow-hidden rounded-card border border-line bg-sky">
      <div className="relative aspect-[4/3]" role="img" aria-label={`${m.mapLabel}. ${m.mapNote}.`}>
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill="#E9F1F7" />
          <g fill="#DDE8F0">
            <path d="M0 210 C80 180 140 230 220 200 C300 170 340 210 400 190 V300 H0 Z" />
            <path d="M260 0 C250 60 300 90 360 80 C380 76 392 60 400 50 V0 Z" />
          </g>
          <g stroke="#FFFFFF" strokeWidth="10" fill="none" strokeLinecap="round">
            <circle cx="200" cy="150" r="78" />
            <path d="M0 120 H400 M190 0 V300 M60 300 L330 0" />
          </g>
          <g stroke="#DCE3E8" strokeWidth="3" fill="none">
            <path d="M40 60 H150 M250 240 H380 M120 230 V290 M300 40 V120" />
          </g>
          <text x="214" y="244" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#5B6F80" letterSpacing="1.5">RING ROAD</text>
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <div className="grid size-12 place-items-center rounded-full rounded-bl-none bg-hub text-white shadow-lift [transform:rotate(-45deg)]">
            <MapPin className="size-5 [transform:rotate(45deg)]" aria-hidden="true" />
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted shadow-soft">{m.mapNote}</span>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-white px-5 py-3 text-sm">
        <span className="font-semibold text-navy">{m.mapLabel}</span>
        <a
          href="https://www.openstreetmap.org/search?query=Katsina%2C%20Nigeria"
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex min-h-[44px] items-center gap-1.5 text-sm"
        >
          {m.mapLink}
          <ExternalLink className="size-3.5" aria-hidden="true" />
          <span className="sr-only">{d.common.opensNewTab}</span>
        </a>
      </figcaption>
    </figure>
  );
}

export default function Contact() {
  const { d } = useI18n();
  const c = d.contact;
  return (
    <>
      <Seo title={d.seo.contact.title} description={d.seo.contact.description} path="/contact" />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />
      <section className="section bg-cream">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal className="card relative p-6 sm:p-10 lg:col-span-7">
            <EnquiryForm />
          </Reveal>
          <Reveal className="space-y-6 lg:col-span-5" delay={0.1}>
            <div className="card p-6 sm:p-8">
              <h2 className="text-h3">{c.details.title}</h2>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">
                    <Mail className="size-4 shrink-0 text-hub" aria-hidden="true" />
                    {c.details.email}
                  </dt>
                  <dd className="pl-[1.625rem]">
                      <a href={MAILTO} className="link inline-flex min-h-[44px] items-center break-all">
                        {EMAIL}
                      </a>
                    </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">
                    <Phone className="size-4 shrink-0 text-hub" aria-hidden="true" />
                    {c.details.phone}
                  </dt>
                  <dd className="pl-[1.625rem]">
                      <a href={PHONE_HREF} className="link inline-flex min-h-[44px] items-center">
                        {PHONE_DISPLAY}
                      </a>
                    </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-2">
                    <MapPin className="size-4 shrink-0 text-hub" aria-hidden="true" />
                    {c.details.address}
                  </dt>
                  <dd className="pl-[1.625rem] mt-1.5">
                      <address className="not-italic text-ink">{d.common.address}</address>
                    </dd>
                </div>
              </dl>
            </div>
            <MapPlaceholder />
          </Reveal>
        </div>
      </section>
    </>
  );
}
