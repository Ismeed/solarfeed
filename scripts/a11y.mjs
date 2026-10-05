/**
 * Runs axe-core (WCAG 2.2 A/AA rules) against every page.
 *   node scripts/a11y.mjs [--base=http://localhost:5173]
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const base = process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:5173";
const exe = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find((p) => fs.existsSync(p));
const browser = await chromium.launch({ executablePath: exe });
let total = 0;
for (const path of ["/", "/how-it-works", "/pilot", "/impact", "/about", "/contact", "/privacy", "/does-not-exist"]) {
  for (const width of [1280, 360]) {
    // Reduced motion so every reveal is visible and contrast is measured on final colours.
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
    for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 600) {
      await page.evaluate((yy) => scrollTo(0, yy), y);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(800);
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(() => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
    const v = res.violations;
    total += v.length;
    console.log(`${path} @${width}: ${v.length ? v.length + " issue type(s)" : "clean"}`);
    for (const x of v) console.log(`  [${x.impact}] ${x.id}: ${x.help}\n    ${x.nodes.slice(0, 4).map((n) => n.target.join(" ") + (n.failureSummary ? " — " + n.failureSummary.split("\n")[1]?.trim() : "")).join("\n    ")}`);
    await page.close();
  }
}
await browser.close();
process.exit(total ? 1 : 0);
