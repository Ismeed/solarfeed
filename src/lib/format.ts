const ngn = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });
const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** ₦ with en-NG grouping, e.g. ₦2,266,650. Written out rather than Intl currency style so the sign is always ₦. */
export const naira = (n: number) => `₦${ngn.format(Math.round(n))}`;

/** ₦2.27m style for chart labels. */
export const nairaMillions = (n: number) => `₦${(n / 1_000_000).toFixed(2)}m`;

export const euro = (n: number) => eur.format(n);

export const number = (n: number) => ngn.format(Math.round(n));
