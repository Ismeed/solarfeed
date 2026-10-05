import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
// Self-hosted Google Fonts (Latin + Latin Extended, which carries ₦), font-display: swap.
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-ext-400.css";
import "@fontsource/figtree/latin-500.css";
import "@fontsource/figtree/latin-ext-500.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-ext-600.css";
import "@fontsource/figtree/latin-700.css";
import "@fontsource/figtree/latin-ext-700.css";
import "@fontsource/sora/latin-600.css";
import "@fontsource/sora/latin-ext-600.css";
import "@fontsource/sora/latin-700.css";
import "@fontsource/sora/latin-ext-700.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-ext-500.css";
import "./styles/globals.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are pre-rendered at build time; hydrate them. The dev server serves an empty shell, so render.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
