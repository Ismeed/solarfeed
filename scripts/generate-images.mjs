/**
 * Renders the 1200×630 share image and the PNG icons from public/brand/solarfeed-mark.svg.
 *   npm run assets
 * Re-run whenever the logo files are replaced. Uses the locally installed Chrome or Edge.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";

const exe = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const mark = fs.readFileSync("public/brand/solarfeed-mark.svg", "utf8").replace(/<!--[\s\S]*?-->/g, "");
const markUri = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage();

// Share image: navy background, the mark, the H1.
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  body { margin:0; width:1200px; height:630px; background:#021B2F; font-family:Sora, sans-serif; position:relative; overflow:hidden; }
  .glow { position:absolute; right:-160px; top:-200px; width:720px; height:720px; border-radius:50%; background:radial-gradient(circle, rgba(232,163,61,.38), transparent 62%); }
  .grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size:48px 48px; }
  .wrap { position:absolute; left:88px; top:84px; right:88px; }
  .tile { width:120px; height:120px; border-radius:30px; background:#F6F7F3; display:grid; place-items:center; box-shadow:0 20px 40px -20px rgba(0,0,0,.5); }
  img { width:88px; height:88px; }
  .eyebrow { margin-top:40px; font-family:'JetBrains Mono', monospace; font-size:22px; letter-spacing:.16em; color:#E8A33D; text-transform:uppercase; }
  h1 { margin:18px 0 0; font-size:74px; line-height:1.06; letter-spacing:-2.6px; color:#fff; }
  h1 span { color:#5FA6E6; }
</style>
<div class="glow"></div><div class="grid"></div>
<div class="wrap">
  <div class="tile"><img src="${markUri}" alt=""></div>
  <div class="eyebrow">SolarFeed Hubs · Katsina State, Nigeria</div>
  <h1>Feed milled by the sun.<br><span>Priced for the smallholder.</span></h1>
</div>`);
await page.waitForLoadState("networkidle");
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-image.png" });

// Icons from the mark, on a transparent background (apple-touch gets the cream page colour).
for (const [file, size, bg] of [["favicon-32.png", 32, "transparent"], ["apple-touch-icon.png", 180, "#F6F7F3"], ["icon-192.png", 192, "transparent"], ["icon-512.png", 512, "transparent"]]) {
  await page.setViewportSize({ width: size, height: size });
  const pad = bg === "transparent" ? 0 : Math.round(size * 0.12);
  await page.setContent(`<body style="margin:0;background:${bg}"><img src="${markUri}" style="display:block;width:${size - pad * 2}px;height:${size - pad * 2}px;margin:${pad}px"></body>`);
  await page.screenshot({ path: `public/${file}`, omitBackground: bg === "transparent" });
}

await browser.close();
console.log("og-image.png and icons written to public/");
