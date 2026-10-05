import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./en.json";

export type Dict = typeof en;
export type Locale = "en" | "ha";

const STORAGE_KEY = "sf-locale";

/** Deep-merge a partial translation over English. Empty strings mean "not translated yet" and fall back. */
function withFallback<T>(base: T, over: unknown): T {
  if (Array.isArray(base)) {
    const arr = Array.isArray(over) ? over : [];
    return base.map((v, i) => withFallback(v, arr[i])) as T;
  }
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(base)) out[k] = withFallback(v, (over as Record<string, unknown> | undefined)?.[k]);
    return out as T;
  }
  if (typeof base === "string") return (typeof over === "string" && over.trim() ? over : base) as T;
  return base;
}

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  d: Dict;
  /** True when the selected locale is only partly translated and English is showing through. */
  isFallback: boolean;
};

const I18nContext = createContext<Ctx | null>(null);

function readStored(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ha" ? "ha" : "en";
  } catch {
    return "en";
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start in English so the first render matches the pre-rendered HTML; then apply the stored choice.
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => {
    const stored = readStored();
    if (stored !== "en") setLocaleState(stored);
  }, []);
  const [ha, setHa] = useState<Dict | null>(null);

  useEffect(() => {
    if (locale !== "ha" || ha) return;
    // Hausa is loaded on demand so English visitors never download it.
    import("./ha.json").then((m) => setHa(withFallback(en, m.default)));
  }, [locale, ha]);

  const d = locale === "ha" && ha ? ha : en;
  const isFallback = locale === "ha" && (ha?.meta.translationStatus ?? "needs-human-translation") !== "complete";

  useEffect(() => {
    // Only declare Hausa to assistive tech once the text actually is Hausa.
    document.documentElement.lang = locale === "ha" && !isFallback ? "ha" : "en-GB";
  }, [locale, isFallback]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable: preference lasts for this visit only */
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale, d, isFallback }), [locale, setLocale, d, isFallback]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
