/**
 * Serves dist/ the way a static host does: /path → /path/index.html, unknown paths → 404.html (status 404).
 *   node scripts/serve-dist.mjs [port=4173]
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve("dist");
const port = Number(process.argv[2] ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const candidates = [url, path.join(url, "index.html")];
    let file = candidates.map((c) => path.join(root, c)).find((f) => f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile());
    let status = 200;
    if (!file) {
      file = path.join(root, "404.html");
      status = 404;
    }
    const ext = path.extname(file);
    const headers = { "Content-Type": types[ext] ?? "application/octet-stream" };
    if (file.includes(`${path.sep}assets${path.sep}`)) headers["Cache-Control"] = "public, max-age=31536000, immutable";
    let body = fs.readFileSync(file);
    if (/gzip/.test(req.headers["accept-encoding"] ?? "") && /html|javascript|css|svg|json|xml/.test(headers["Content-Type"])) {
      body = zlib.gzipSync(body);
      headers["Content-Encoding"] = "gzip";
    }
    res.writeHead(status, headers).end(body);
  })
  .listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));
