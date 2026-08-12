import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/woertersee/",
  plugins: [react()],
  build: {
    outDir: "github-pages",
    emptyOutDir: true,
  },
});
