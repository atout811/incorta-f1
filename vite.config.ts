import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/incorta-f1/", // GitHub Pages base path (repository name)
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  build: {
    outDir: "dist", // Standard Vite output directory
  },
});
