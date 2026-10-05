/**
 * Pre-renders every route to static HTML after `vite build`, so text and images paint before
 * JavaScript loads (important on slow mobile data). The browser bundle then hydrates the page.
 *
 *   vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, PRERENDER_ROUTES } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

// Inline the stylesheet (about 11 kB gzipped): it saves a render-blocking round trip on slow mobile
// networks, and the browser discovers the font files straight away.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
const inlineCss = cssLink ? `<style>${fs.readFileSync(path.join(dist, cssLink[1]), "utf8")}</style>` : "";

async function write(url, file) {
  const { html, head } = await render(url);
  let page = template.replace("<!--font-preloads-->", "").replace("<!--app-->", html);
  if (cssLink) page = page.replace(cssLink[0], inlineCss);
  // Swap the default SEO block for this page's own tags from react-helmet-async.
  page = page.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head);
  page = page.replace(/<!--seo-og-->[\s\S]*?<!--\/seo-og-->/, "");
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log(`  ${url.padEnd(16)} → dist/${file}  (${Math.round(page.length / 1024)} kB)`);
}

console.log("Pre-rendering:");
for (const route of PRERENDER_ROUTES) {
  await write(route, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
}
await write("/404", "404.html");
fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
