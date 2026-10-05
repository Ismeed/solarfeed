import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    target: "es2020",
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              react: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
              motion: ["framer-motion"],
            },
          },
        },
  },
  ssr: {
    // Bundle these into the pre-render build so Node does not trip over their CommonJS/ESM packaging.
    noExternal: ["react-helmet-async", "lucide-react", /^@radix-ui\//, "framer-motion", "recharts"],
  },
  test: {
    environment: "node",
  },
}));
