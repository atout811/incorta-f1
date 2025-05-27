/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    typecheck: {
      tsconfig: "./tsconfig.json",
    },
  },
});
