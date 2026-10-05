/**
 * Writes public/sitemap.xml and public/robots.txt from VITE_SITE_URL (.env or environment).
 * Runs automatically before `npm run build`.
 */
import fs from "node:fs";

function readEnv() {
  const env = { ...process.env };
  for (const file of [".env", ".env.production", ".env.local"]) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

const site = (readEnv().VITE_SITE_URL || "https://solarfeedhubs.com").replace(/\/$/, "");
const routes = [
  { path: "/", priority: "1.0" },
  { path: "/how-it-works", priority: "0.9" },
  { path: "/pilot", priority: "0.9" },
  { path: "/impact", priority: "0.8" },
  { path: "/about", priority: "0.7" },
  { path: "/contact", priority: "0.8" },
  { path: "/privacy", priority: "0.3" },
];
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${site}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", sitemap);
fs.writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`sitemap.xml and robots.txt written for ${site}`);
