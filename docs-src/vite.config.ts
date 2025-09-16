import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname),
  base: "/nano-string-utils/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "nano-string-utils": resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
