import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/incorta-f1/", // GitHub Pages base path (repository name)
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    outDir: "dist", // Output directory for GitHub Pages
  },
});
