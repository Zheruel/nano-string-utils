import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs", "iife"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  globalName: "nanoStringUtils",
  outExtension({ format }) {
    if (format === "iife") {
      return {
        js: ".iife.js",
      };
    }
    return {
      js: format === "esm" ? ".js" : ".cjs",
      dts: format === "esm" ? ".d.ts" : ".d.cts",
    };
  },
  esbuildOptions(options) {
    options.pure = ["console.log"];
  },
});
