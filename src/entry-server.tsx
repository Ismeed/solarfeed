import { renderToReadableStream } from "react-dom/server.browser";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppShell, PRERENDER_ROUTES } from "./AppShell";

export { PRERENDER_ROUTES };

/** Renders one route to HTML, waiting for lazy pages so the output is complete. */
export async function render(url: string): Promise<{ html: string; head: string }> {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const stream = await renderToReadableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>,
    { onError: (err) => console.error(err) },
  );
  await stream.allReady;
  const html = await new Response(stream).text();
  const h = helmetContext.helmet;
  const head = h ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n    ") : "";
  return { html, head };
}
