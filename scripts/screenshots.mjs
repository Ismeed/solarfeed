/**
 * Responsive screenshots for review.
 *   node scripts/screenshots.mjs [path=/] [widths=360,768,1280,1440] [--full] [--base=http://localhost:5173]
 * Uses the locally installed Chrome (or Edge) through playwright-core; nothing is downloaded.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}`));
const positional = args.filter((a) => !a.startsWith("--"));
const path = positional[0] ?? "/";
const widths = (positional[1] ?? "360,768,1280,1440").split(",").map(Number);
const full = !!flag("full");
const base = flag("base")?.split("=")[1] ?? "http://localhost:5173";
const reduced = !!flag("reduced");
const outDir = new URL("../screenshots/", import.meta.url);
fs.mkdirSync(outDir, { recursive: true });

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = candidates.find((p) => fs.existsSync(p));
const browser = await chromium.launch({ executablePath });

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: reduced ? "reduce" : "no-preference" });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + path, { waitUntil: "networkidle" });
  if (full) {
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
    // Scroll through so in-view animations and lazy charts fire, then settle.
    for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 500) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
  } else {
    await page.waitForTimeout(1500);
  }
  const slug = path === "/" ? "home" : path.replace(/[^a-z0-9]+/gi, "_").replace(/^_/, "");
  const name = `${slug}-${width}${full ? "-full" : ""}.png`;
  if (flag("segments")) {
    const h = await page.evaluate(() => document.body.scrollHeight);
    const segH = width < 500 ? 760 : Math.round(width * 0.75);
    for (let i = 0, y = 0; y < h; i++, y += segH) {
      await page.screenshot({ path: fileURLToPath(new URL(name.replace(".png", `-${String(i).padStart(2, "0")}.png`), outDir)), fullPage: true, clip: { x: 0, y, width, height: Math.min(segH, h - y) } });
    }
  } else {
    await page.screenshot({ path: fileURLToPath(new URL(name, outDir)), fullPage: full });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${name}  horizontal-overflow=${overflow}px${errors.length ? `  ERRORS: ${errors.join(" | ")}` : ""}`);
  await page.close();
}
await browser.close();
