import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

const srcDirectory = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  base: "/EquilibrioCoClub/",
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "./src/server.ts",
      },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
      },
      spa: { enabled: false },
    }),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": srcDirectory,
    },
  },
  server: {
    port: 3000,
    strictPort: false,
  },
});
