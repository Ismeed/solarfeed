/**
 * Keeps src/i18n/ha.json in step with src/i18n/en.json.
 *
 *   npm run i18n:sync   add any new English keys to ha.json as "" (untranslated), keep existing Hausa text
 *   npm run i18n:check  report coverage; exits 1 if any key is missing entirely
 *
 * An empty string means "not yet translated by a human". The site falls back to English for it.
 * Never fill these with machine translation.
 */
import fs from "node:fs";

const EN = new URL("../src/i18n/en.json", import.meta.url);
const HA = new URL("../src/i18n/ha.json", import.meta.url);
const check = process.argv.includes("--check");

// Values that are identical in every language (contact details, IDs, numbers) are copied, not translated.
const VERBATIM = /^(common\.(email|phone|phoneHref|address)|.*\.(id|value|key|url|start|end|moisture|aflatoxin|status|fromValue|toValue|dieselValue|solarValue|tileSolarValue|tileWindowValue|callout|flockValue)|home\.partners\.names\..*|about\.founder\.name)$/;

const en = JSON.parse(fs.readFileSync(EN, "utf8"));
const ha = fs.existsSync(HA) ? JSON.parse(fs.readFileSync(HA, "utf8")) : {};

let total = 0, translated = 0, missing = 0;

function sync(src, dst, path) {
  if (Array.isArray(src)) {
    const out = Array.isArray(dst) ? dst : [];
    return src.map((v, i) => sync(v, out[i], `${path}.${i}`));
  }
  if (src && typeof src === "object") {
    const out = {};
    for (const k of Object.keys(src)) out[k] = sync(src[k], dst?.[k], path ? `${path}.${k}` : k);
    return out;
  }
  if (path === "meta.langName") return "Hausa";
  if (path === "meta.translationStatus") return dst ?? "needs-human-translation";
  if (typeof src !== "string" || VERBATIM.test(path)) return src;
  total++;
  if (dst === undefined) missing++;
  if (typeof dst === "string" && dst.trim()) { translated++; return dst; }
  return "";
}

const next = sync(en, ha, "");
const pct = total ? Math.round((translated / total) * 100) : 100;
next.meta.translationStatus = translated === total ? "complete" : "needs-human-translation";

if (check) {
  console.log(`Hausa: ${translated}/${total} strings translated (${pct}%). ${missing} key(s) missing from ha.json.`);
  process.exit(missing ? 1 : 0);
}
fs.writeFileSync(HA, JSON.stringify(next, null, 2) + "\n");
console.log(`ha.json synced. ${translated}/${total} strings translated (${pct}%).`);
